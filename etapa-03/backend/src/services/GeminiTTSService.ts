import { GoogleGenAI } from '@google/genai';
import { TTSResponse } from '@/types/index.js';
import { serverConfig } from '@/utils/config.js';
import { logger } from '@/utils/logger.js';

export class GeminiTTSService {
  private client: GoogleGenAI;
  private readonly maxRetries = 3;

  constructor() {
    this.client = new GoogleGenAI({ apiKey: serverConfig.geminiApiKey });
  }

  async generateSpeech(text: string, sessionId?: string): Promise<TTSResponse> {
    try {
      logger.info(`Generating speech with Gemini TTS: "${text.substring(0, 100)}..."`, { sessionId });

      const response = await this.generateContentWithRetry({
        model: serverConfig.geminiTtsModel,
        contents: [{ parts: [{ text: this.buildTtsPrompt(text) }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: serverConfig.geminiTtsVoice,
              },
            },
          },
        },
      });

      const inlineData = this.extractAudio(response);

      const pcmBuffer = this.decodeAudioData(inlineData.data);
      const sampleRate = this.getSampleRate(inlineData.mimeType);
      const isWav = inlineData.mimeType?.toLowerCase().includes('wav') || false;
      const audioBuffer = isWav ? pcmBuffer : this.wrapPcmAsWav(pcmBuffer, sampleRate);

      const ttsResponse: TTSResponse = {
        audioData: audioBuffer.toString('base64'),
        text,
        timestamp: Date.now(),
        voiceId: serverConfig.geminiTtsVoice,
        format: 'wav',
      };

      logger.info('Speech generated successfully with Gemini TTS', {
        sessionId,
        textLength: text.length,
        audioSize: audioBuffer.length,
        voiceId: serverConfig.geminiTtsVoice,
        model: serverConfig.geminiTtsModel,
        mimeType: inlineData.mimeType,
      });

      return ttsResponse;
    } catch (error) {
      logger.error('Failed to generate speech with Gemini TTS', {
        sessionId,
        error: error instanceof Error ? error.message : error,
        text: text.substring(0, 100),
      });
      throw new Error(`TTS generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      logger.info('Testing Gemini TTS connection...');

      const response = await this.generateContentWithRetry({
        model: serverConfig.geminiTtsModel,
        contents: [{ parts: [{ text: 'Say cheerfully: ok' }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: serverConfig.geminiTtsVoice,
              },
            },
          },
        },
      });

      const hasAudio = !!this.extractAudio(response).data;

      logger.info('Gemini TTS connection test', { successful: hasAudio });
      return hasAudio;
    } catch (error) {
      logger.error('Gemini TTS connection failed', {
        error: error instanceof Error ? error.message : error,
      });
      return false;
    }
  }

  private buildTtsPrompt(text: string): string {
    return `Leia em voz alta, de forma natural e clara, mantendo o idioma e o tom do texto:\n\n${text}`;
  }

  private async generateContentWithRetry(request: any): Promise<any> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= this.maxRetries; attempt += 1) {
      try {
        return await this.client.models.generateContent(request);
      } catch (error) {
        lastError = error;
        const retry = this.getRetryDecision(error, attempt);

        if (!retry.shouldRetry) {
          throw new Error(this.getFriendlyErrorMessage(error));
        }

        logger.warn('Retrying Gemini TTS after transient API error', {
          attempt,
          nextAttempt: attempt + 1,
          delayMs: retry.delayMs,
          reason: retry.reason,
          error: this.formatError(error),
        });
        await this.sleep(retry.delayMs);
      }
    }

    throw new Error(this.getFriendlyErrorMessage(lastError));
  }

  private getRetryDecision(error: unknown, attempt: number): { shouldRetry: boolean; delayMs: number; reason: string } {
    if (attempt >= this.maxRetries) {
      return { shouldRetry: false, delayMs: 0, reason: 'max retries reached' };
    }

    const status = this.getErrorStatus(error);
    const message = this.formatError(error);
    const payload = this.parseErrorPayload(message);
    const apiStatus = payload?.error?.status;
    const isQuotaError = status === 429 || apiStatus === 'RESOURCE_EXHAUSTED' || message.includes('RESOURCE_EXHAUSTED');

    if (isQuotaError) {
      if (this.isDailyQuotaExceeded(payload, message)) {
        return { shouldRetry: false, delayMs: 0, reason: 'daily quota exceeded' };
      }

      const delayMs = this.getRetryDelayFromError(payload, message) ?? this.getRetryDelay(attempt);
      return {
        shouldRetry: delayMs <= 30000,
        delayMs,
        reason: 'rate limit retry delay',
      };
    }

    const isTransientError = status === 500 || status === 502 || status === 503 || status === 504 ||
      message.includes('"status":"INTERNAL"') ||
      message.includes('Internal error encountered') ||
      message.includes('UNAVAILABLE');

    return {
      shouldRetry: isTransientError,
      delayMs: this.getRetryDelay(attempt),
      reason: isTransientError ? 'transient server error' : 'not retryable',
    };
  }

  private getErrorStatus(error: unknown): number | undefined {
    if (typeof error === 'object' && error !== null) {
      const maybeError = error as { status?: number; code?: number };
      return maybeError.status || maybeError.code;
    }

    return undefined;
  }

  private getRetryDelay(attempt: number): number {
    return Math.min(750 * 2 ** (attempt - 1), 3000);
  }

  private getRetryDelayFromError(payload: any, message: string): number | undefined {
    const retryInfo = payload?.error?.details?.find((detail: any) =>
      detail['@type'] === 'type.googleapis.com/google.rpc.RetryInfo'
    );
    const retryDelay = retryInfo?.retryDelay;

    if (typeof retryDelay === 'string') {
      return this.parseDurationMs(retryDelay);
    }

    const match = message.match(/Please retry in ([\d.]+)\s*(ms|s)/i);
    if (match) {
      const value = Number(match[1]);
      return match[2].toLowerCase() === 's' ? Math.ceil(value * 1000) : Math.ceil(value);
    }

    return undefined;
  }

  private parseDurationMs(duration: string): number | undefined {
    const match = duration.match(/^([\d.]+)\s*(ms|s)$/i);
    if (!match) {
      return undefined;
    }

    const value = Number(match[1]);
    return match[2].toLowerCase() === 's' ? Math.ceil(value * 1000) : Math.ceil(value);
  }

  private isDailyQuotaExceeded(payload: any, message: string): boolean {
    const violations = payload?.error?.details?.flatMap((detail: any) => detail.violations ?? []) ?? [];
    return violations.some((violation: any) => String(violation.quotaId || '').includes('PerDay')) ||
      message.includes('GenerateRequestsPerDay');
  }

  private getFriendlyErrorMessage(error: unknown): string {
    const message = this.formatError(error);
    const payload = this.parseErrorPayload(message);
    const apiStatus = payload?.error?.status;

    if (apiStatus === 'RESOURCE_EXHAUSTED' || message.includes('RESOURCE_EXHAUSTED')) {
      if (this.isDailyQuotaExceeded(payload, message)) {
        return 'Cota diária do Gemini TTS excedida para este projeto. Verifique billing/tiers no Google AI Studio ou aguarde o reset da cota.';
      }

      return 'Limite por minuto do Gemini TTS excedido. Aguarde alguns segundos e tente novamente.';
    }

    return message;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    try {
      return JSON.stringify(error);
    } catch {
      return 'Unknown error';
    }
  }

  private parseErrorPayload(message: string): any | undefined {
    try {
      return JSON.parse(message);
    } catch {
      return undefined;
    }
  }

  private extractAudio(response: any): { data: string | Uint8Array; mimeType?: string } {
    const part = response.candidates?.[0]?.content?.parts?.find((item: any) => item.inlineData?.data);
    const inlineData = part?.inlineData;

    if (!inlineData?.data) {
      const finishReason = response.candidates?.[0]?.finishReason;
      const promptFeedback = response.promptFeedback ? JSON.stringify(response.promptFeedback) : undefined;
      const details = [
        finishReason ? `finishReason=${finishReason}` : undefined,
        promptFeedback ? `promptFeedback=${promptFeedback}` : undefined,
      ].filter(Boolean).join('; ');

      throw new Error(`Gemini TTS did not return audio${details ? ` (${details})` : ''}`);
    }

    return inlineData;
  }

  private decodeAudioData(data: string | Uint8Array): Buffer {
    if (data instanceof Uint8Array) {
      return Buffer.from(data);
    }

    return Buffer.from(data, 'base64');
  }

  private getSampleRate(mimeType?: string): number {
    const match = mimeType?.match(/rate=(\d+)/);
    return match ? parseInt(match[1], 10) : 24000;
  }

  private wrapPcmAsWav(pcmData: Buffer, sampleRate: number): Buffer {
    const channels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * channels * bitsPerSample / 8;
    const blockAlign = channels * bitsPerSample / 8;
    const header = Buffer.alloc(44);

    header.write('RIFF', 0);
    header.writeUInt32LE(36 + pcmData.length, 4);
    header.write('WAVE', 8);
    header.write('fmt ', 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(channels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(byteRate, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);
    header.write('data', 36);
    header.writeUInt32LE(pcmData.length, 40);

    return Buffer.concat([header, pcmData]);
  }
}
