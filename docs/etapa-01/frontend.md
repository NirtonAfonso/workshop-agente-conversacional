# Etapa 01 - Frontend

Interface React responsável por capturar áudio do microfone, controlar o estado da gravação e exibir as transcrições recebidas em tempo real.

## Responsabilidades

- Solicitar permissão de microfone ao navegador
- Capturar áudio com Web Audio API
- Enviar áudio para o backend via Socket.IO
- Exibir transcrições parciais e finais
- Mostrar estado de conexão e gravação

## Comandos

```bash
cd etapa-01/frontend
npm install
npm run dev
```

## Arquivos principais

- `src/App.tsx`
- `src/components/AudioRecorder.tsx`
- `src/components/TranscriptionDisplay.tsx`
- `src/hooks/useWebSocket.ts`

