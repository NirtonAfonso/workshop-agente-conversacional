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
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-3.1-flash-lite
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview
GEMINI_TTS_VOICE=Kore
CORS_ORIGIN=https://seu-frontend.com
```

## Cuidados

- Nunca exponha chaves no frontend.
- Configure CORS para o domínio real.
- Monitore limites de Deepgram, Gemini e Gemini TTS.

## Publicar o site no GitHub Pages

O repositório inclui o workflow `.github/workflows/docs.yml`.

1. Faça push do projeto para o GitHub.
2. Abra **Settings > Pages** no repositório.
3. Em **Build and deployment**, selecione **GitHub Actions**.
4. Faça push na branch `main` ou `master`, ou rode o workflow manualmente em **Actions**.

O workflow instala as dependências de `docs/requirements.txt`, executa `sphinx-build -b html docs docs/_build/html` e publica o resultado no GitHub Pages.
