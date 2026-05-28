import { GoogleGenAI } from '@google/genai';
import { TTSResponse } from '@/types/index.js';
import { serverConfig } from '@/utils/config.js';
import { logger } from '@/utils/logger.js';

export class GeminiTTSService {
  private client: GoogleGenAI;

  constructor() {
    this.client = new GoogleGenAI({ apiKey: serverConfig.geminiApiKey });
  }

  async generateSpeech(text: string, sessionId?: string): Promise<TTSResponse> {
    try {
      logger.info(`Generating speech with Gemini TTS: "${text.substring(0, 100)}..."`, { sessionId });

      const response = await this.client.models.generateContent({
        model: serverConfig.geminiTtsModel,
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Leia em voz alta, de forma natural e clara, mantendo o idioma e o tom do texto:\n\n${text}`,
              },
            ],
          },
        ],
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

      const inlineData = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData)?.inlineData;

      if (!inlineData?.data) {
        throw new Error('Empty audio response from Gemini TTS');
      }

      const pcmBuffer = Buffer.from(inlineData.data, 'base64');
      const sampleRate = this.getSampleRate(inlineData.mimeType);
      const wavBuffer = this.wrapPcmAsWav(pcmBuffer, sampleRate);

      const ttsResponse: TTSResponse = {
        audioData: wavBuffer.toString('base64'),
        text,
        timestamp: Date.now(),
        voiceId: serverConfig.geminiTtsVoice,
        format: 'wav',
      };

      logger.info('Speech generated successfully with Gemini TTS', {
        sessionId,
        textLength: text.length,
        audioSize: wavBuffer.length,
        voiceId: serverConfig.geminiTtsVoice,
        model: serverConfig.geminiTtsModel,
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

      const response = await this.client.models.generateContent({
        model: serverConfig.geminiTtsModel,
        contents: 'Diga apenas: ok',
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

      const hasAudio = !!response.candidates?.[0]?.content?.parts?.some(part => part.inlineData?.data);

      logger.info('Gemini TTS connection test', { successful: hasAudio });
      return hasAudio;
    } catch (error) {
      logger.error('Gemini TTS connection failed', {
        error: error instanceof Error ? error.message : error,
      });
      return false;
    }
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
