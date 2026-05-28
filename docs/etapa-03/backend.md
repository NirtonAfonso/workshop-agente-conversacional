# Etapa 03 - Backend Completo

Backend final com Deepgram, AWS Bedrock e Gemini TTS integrados.

## Responsabilidades

- Transcrever áudio com Deepgram
- Gerar resposta textual com AWS Bedrock Claude
- Converter resposta em fala com Gemini TTS
- Emitir texto e áudio para o frontend via Socket.IO

## Configuração

```text
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua_aws_access_key
AWS_SECRET_ACCESS_KEY=sua_aws_secret_key
BEDROCK_MODEL_ID=us.anthropic.claude-3-5-haiku-20241022-v1:0
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
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
- `src/services/BedrockService.ts`
- `src/services/GeminiTTSService.ts`
- `src/services/SocketService.ts`
