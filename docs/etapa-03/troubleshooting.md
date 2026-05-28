# Etapa 03 - Troubleshooting

## Texto aparece, mas áudio não toca

- Verifique `GEMINI_API_KEY`.
- Confira se `GEMINI_TTS_MODEL` e `GEMINI_TTS_VOICE` estão configurados corretamente.
- Veja se o navegador bloqueou autoplay.

## IA não responde

- Verifique `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` e `BEDROCK_MODEL_ID`.
- Confirme se o modelo está habilitado no Amazon Bedrock.
- Reinicie o backend.

## Transcrição não chega

- Verifique `DEEPGRAM_API_KEY`.
- Confirme permissão de microfone no navegador.

Veja também: [Solução de Problemas](../guides/troubleshooting.md).
