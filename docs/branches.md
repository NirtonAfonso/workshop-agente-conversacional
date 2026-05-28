# Branches do Workshop

Este repositório mantém duas trilhas oficiais para o mesmo agente conversacional.

## Branch `Gemini`

Use esta branch quando o foco da aula for **Google AI Studio/Gemini**:

- IA conversacional: Gemini via Google AI Studio
- Voz/TTS: Gemini TTS via Google AI Studio
- Variáveis principais: `GEMINI_API_KEY`, `GEMINI_MODEL`, `GEMINI_TTS_MODEL`, `GEMINI_TTS_VOICE`

```bash
git checkout Gemini
```

## Branch `AWS`

Use esta branch quando o foco da aula for **AWS Bedrock**:

- IA conversacional: AWS Bedrock Claude
- Voz/TTS: Gemini TTS via Google AI Studio
- Variáveis principais: `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `BEDROCK_MODEL_ID`, `GEMINI_API_KEY`, `GEMINI_TTS_MODEL`, `GEMINI_TTS_VOICE`

```bash
git checkout AWS
```

## O que não muda

Nas duas branches, a captura de áudio continua com o frontend React, a transcrição continua com Deepgram e a fala de resposta continua com Gemini TTS.
