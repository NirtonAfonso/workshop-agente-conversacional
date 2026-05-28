# Etapa 03 - Backend Completo

Backend final com Deepgram, Gemini e Gemini TTS integrados.

## Responsabilidades

- Transcrever áudio com Deepgram
- Gerar resposta textual com Gemini
- Converter resposta em fala com Gemini TTS
- Emitir texto e áudio para o frontend via Socket.IO

## Configuração

```text
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-3.1-flash-lite
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview
GEMINI_TTS_VOICE=Kore
PORT=3001
CORS_ORIGIN=http://localhost:8080
```

## Comandos

```bash
cd etapa-03/backend
npm install
npm run dev
```

## Arquivos principais

- `src/services/DeepgramService.ts`
- `src/services/GeminiService.ts`
- `src/services/GeminiTTSService.ts`
- `src/services/SocketService.ts`
