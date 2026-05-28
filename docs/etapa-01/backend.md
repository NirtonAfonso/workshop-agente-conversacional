# Etapa 01 - Backend

Backend Node.js + TypeScript responsável por receber o áudio do frontend e integrar com o Deepgram para transcrição em tempo real.

## Responsabilidades

- Subir servidor Express
- Gerenciar conexões Socket.IO
- Criar conexão live com Deepgram
- Enviar resultados de transcrição ao frontend
- Expor endpoints de health check

## Configuração

```text
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui
PORT=3001
CORS_ORIGIN=http://localhost:8080
```

## Comandos

```bash
cd etapa-01/backend
npm install
npm run dev
```

## Arquivos principais

- `src/server.ts`
- `src/services/DeepgramService.ts`
- `src/services/SocketService.ts`
- `src/utils/config.ts`

