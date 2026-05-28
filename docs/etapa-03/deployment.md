# Etapa 03 - Deploy

## Build local

Backend:

```bash
cd etapa-03/backend
npm install
npm run build
npm start
```

Frontend:

```bash
cd etapa-03/frontend
npm install
npm run build
```

## Variáveis de produção

Configure secrets no provedor de deploy:

```env
DEEPGRAM_API_KEY=...
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
ELEVENLABS_API_KEY=...
CORS_ORIGIN=https://seu-frontend.com
```

## Cuidados

- Nunca exponha chaves no frontend.
- Configure CORS para o domínio real.
- Monitore limites de Deepgram, Gemini e ElevenLabs.

