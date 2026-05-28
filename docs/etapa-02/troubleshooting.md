# Etapa 02 - Troubleshooting

## AWS Bedrock não responde

- Confira se `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` e `BEDROCK_MODEL_ID` estão preenchidos.
- Confirme se o modelo configurado está habilitado no Amazon Bedrock da região escolhida.
- Reinicie o backend depois de alterar `.env`.
- Valide as credenciais no console da AWS ou com a AWS CLI.

## Transcrição funciona, mas IA falha

Esse caso normalmente indica que Deepgram está correto e o problema está na configuração do Bedrock. Verifique os logs do backend e a mensagem emitida em `ai-error`.

Veja também: [Solução de Problemas](../guides/troubleshooting.md).
