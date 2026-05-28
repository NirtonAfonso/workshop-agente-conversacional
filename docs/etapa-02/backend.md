# Etapa 02 - Backend com AWS Bedrock

O backend da etapa 02 adiciona IA conversacional usando AWS Bedrock Claude.

## Responsabilidades

- Receber transcrições finais do Deepgram
- Enviar o texto para `BedrockService`
- Manter contexto curto por sessão
- Emitir `ai-response` para o frontend

## Configuração

```text
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua_aws_access_key
AWS_SECRET_ACCESS_KEY=sua_aws_secret_key
BEDROCK_MODEL_ID=us.anthropic.claude-3-5-haiku-20241022-v1:0
PORT=3001
CORS_ORIGIN=http://localhost:8080
```

## Arquivos principais

- `src/services/BedrockService.ts`
- `src/services/SocketService.ts`
- `src/prompts/system-prompt.txt`
- `src/utils/config.ts`

## Comandos

```bash
cd etapa-02/backend
npm install
npm run dev
```
