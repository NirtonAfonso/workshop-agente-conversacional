import { GoogleGenAI } from '@google/genai';
import { serverConfig } from '@/utils/config.js';
import { logger } from '@/utils/logger.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export interface AIResponse {
  text: string;
  timestamp: number;
  confidence?: number;
}

export interface ConversationContext {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
}

export class GeminiService {
  private client: GoogleGenAI;
  private modelId: string;
  private conversations: Map<string, ConversationContext> = new Map();
  private systemPrompt: string;

  constructor() {
    this.client = new GoogleGenAI({ apiKey: serverConfig.geminiApiKey });
    this.modelId = serverConfig.geminiModel;
    this.systemPrompt = this.loadSystemPrompt();
  }

  private loadSystemPrompt(): string {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const promptPath = join(__dirname, '..', 'prompts', 'system-prompt.txt');

      const prompt = readFileSync(promptPath, 'utf-8');
      logger.info('System prompt loaded successfully');
      return prompt.trim();
    } catch (error) {
      logger.error('Failed to load system prompt, using fallback', { error });
      return 'Você é um assistente conversacional inteligente em português brasileiro. Responda de forma natural, útil e concisa às mensagens do usuário. Mantenha um tom amigável e profissional.';
    }
  }

  async generateResponse(
    userMessage: string,
    sessionId: string = 'default'
  ): Promise<AIResponse> {
    try {
      let context = this.conversations.get(sessionId);
      if (!context) {
        context = { messages: [] };
        this.conversations.set(sessionId, context);
      }

      context.messages.push({
        role: 'user',
        content: userMessage,
        timestamp: Date.now(),
      });

      const contents = context.messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      logger.info(`Sending request to Gemini: "${userMessage}"`);

      const response = await this.client.models.generateContent({
        model: this.modelId,
        contents,
        config: {
          systemInstruction: this.systemPrompt,
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });

      const aiResponseText = response.text?.trim();

      if (!aiResponseText) {
        throw new Error('Empty response from Gemini');
      }

      context.messages.push({
        role: 'assistant',
        content: aiResponseText,
        timestamp: Date.now(),
      });

      if (context.messages.length > 10) {
        context.messages = context.messages.slice(-10);
      }

      const aiResponse: AIResponse = {
        text: aiResponseText,
        timestamp: Date.now(),
      };

      logger.info(`Gemini response: "${aiResponseText}"`);

      return aiResponse;
    } catch (error: any) {
      logger.error('Error generating AI response', {
        error: error.message || error,
        stack: error.stack,
        userMessage,
        sessionId,
      });

      if (error.status === 400 || error.message?.includes('API key')) {
        throw new Error('Erro de autenticação no Gemini. Verifique a GEMINI_API_KEY.');
      }

      if (error.status === 429) {
        throw new Error('Limite de requisições do Gemini excedido. Aguarde um momento e tente novamente.');
      }

      if (error.status === 503) {
        throw new Error('Modelo Gemini temporariamente indisponível. Tente novamente em alguns instantes.');
      }

      throw new Error('Erro interno do serviço de IA. Tente novamente.');
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.models.generateContent({
        model: this.modelId,
        contents: 'Responda apenas: ok',
        config: {
          maxOutputTokens: 10,
          temperature: 0.1,
        },
      });

      const isSuccessful = !!response.text;
      logger.info('Gemini connection test', { successful: isSuccessful });
      return isSuccessful;
    } catch (error: any) {
      logger.error('Gemini connection test failed', {
        error: error.message || error,
        status: error.status,
      });
      return false;
    }
  }

  clearConversation(sessionId: string): void {
    this.conversations.delete(sessionId);
    logger.info(`Cleared conversation for session: ${sessionId}`);
  }

  getConversationHistory(sessionId: string): ConversationContext | null {
    return this.conversations.get(sessionId) || null;
  }

  reloadSystemPrompt(): void {
    this.systemPrompt = this.loadSystemPrompt();
    logger.info('System prompt reloaded');
  }

  getCurrentSystemPrompt(): string {
    return this.systemPrompt;
  }
}
