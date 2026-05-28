# Etapa 02 - Troubleshooting

## Gemini não responde

- Confira se `GEMINI_API_KEY` está preenchida.
- Confira se `GEMINI_MODEL=gemini-2.5-flash`.
- Reinicie o backend depois de alterar `.env`.
- Valide a chave em [Google AI Studio](https://aistudio.google.com/app/apikey).

## Transcrição funciona, mas IA falha

Esse caso normalmente indica que Deepgram está correto e o problema está na configuração do Gemini. Verifique os logs do backend e a mensagem emitida em `ai-error`.

Veja também: [Solução de Problemas](../guides/troubleshooting.md).

