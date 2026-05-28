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

```text
DEEPGRAM_API_KEY=...
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
BEDROCK_MODEL_ID=us.anthropic.claude-3-5-haiku-20241022-v1:0
GEMINI_API_KEY=...
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview
GEMINI_TTS_VOICE=Kore
CORS_ORIGIN=https://seu-frontend.com
```

## Cuidados

- Nunca exponha chaves no frontend.
- Configure CORS para o domínio real.
- Monitore limites de Deepgram, AWS Bedrock e Gemini TTS.

## Publicar o site no GitHub Pages

O repositório inclui o workflow `.github/workflows/docs.yml`.

1. Faça push do projeto para o GitHub.
2. Abra **Settings > Pages** no repositório.
3. Em **Build and deployment**, selecione **GitHub Actions**.
4. Faça push na branch `main` ou `master`, ou rode o workflow manualmente em **Actions**.

O workflow instala as dependências de `docs/requirements.txt`, executa `sphinx-build -b html docs docs/_build/html` e publica o resultado no GitHub Pages.
