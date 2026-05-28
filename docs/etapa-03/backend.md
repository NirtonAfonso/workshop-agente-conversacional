# Etapa 03 - Backend Completo

Backend final com Deepgram, Gemini e ElevenLabs integrados.

## Responsabilidades

- Transcrever áudio com Deepgram
- Gerar resposta textual com Gemini
- Converter resposta em fala com ElevenLabs
- Emitir texto e áudio para o frontend via Socket.IO

## Configuração

```text
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-2.5-flash
ELEVENLABS_API_KEY=sua_chave_elevenlabs_aqui
ELEVENLABS_VOICE_ID=5p9IbzcK4R8rN1fpGdMF
ELEVENLABS_MODEL=eleven_multilingual_v2
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
- `src/services/ElevenLabsService.ts`
- `src/services/SocketService.ts`

