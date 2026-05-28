# Etapa 03 - Setup Gemini TTS

## Criar chave

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Faça login com sua Conta Google.
3. Clique em **Create API key**.
4. Copie a chave criada.

## Configurar `.env`

Use a mesma chave da Gemini API para texto e voz:

```text
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-3.1-flash-lite
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview
GEMINI_TTS_VOICE=Kore
```

## Observações

- O Gemini TTS retorna áudio PCM; o backend converte esse áudio para WAV antes de enviar ao frontend.
- A voz padrão configurada é `Kore`, mas você pode trocar por outra voz suportada pela Gemini API.
- A etapa 03 agora usa apenas Deepgram e Google AI Studio/Gemini no backend.
