# Etapa 02 - Backend com Gemini

O backend da etapa 02 adiciona IA conversacional usando a Gemini API via Google AI Studio.

## Responsabilidades

- Receber transcrições finais do Deepgram
- Enviar o texto para `GeminiService`
- Manter contexto curto por sessão
- Emitir `ai-response` para o frontend

## Configuração

```env
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-2.5-flash
PORT=3001
CORS_ORIGIN=http://localhost:8080
```

## Arquivos principais

- `src/services/GeminiService.ts`
- `src/services/SocketService.ts`
- `src/prompts/system-prompt.txt`
- `src/utils/config.ts`

## Comandos

```bash
cd etapa-02/backend
npm install
npm run dev
```

