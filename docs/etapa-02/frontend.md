# Etapa 02 - Frontend

Na etapa 02, o frontend passa a exibir uma conversa entre usuário e IA. A transcrição final enviada pelo backend gera uma resposta textual do Gemini.

## O que muda em relação à etapa 01

- Exibição de respostas da IA
- Histórico de conversa
- Estados visuais para processamento
- Integração com eventos `ai-response` e `ai-error`

## Comandos

```bash
cd etapa-02/frontend
npm install
npm run dev
```

## Arquivos principais

- `src/App.tsx`
- `src/components/AudioRecorder.tsx`
- `src/components/TranscriptionDisplay.tsx`
- `src/hooks/useWebSocket.ts`

