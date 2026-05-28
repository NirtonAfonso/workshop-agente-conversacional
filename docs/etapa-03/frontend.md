# Etapa 03 - Frontend

Na etapa 03, o frontend exibe a conversa completa e reproduz o áudio gerado pelo ElevenLabs.

## O que muda em relação à etapa 02

- Reprodução automática das respostas em áudio
- Player de áudio integrado
- Tratamento de eventos `tts-audio` e `tts-error`
- Experiência completa STT → Gemini → TTS

## Comandos

```bash
cd etapa-03/frontend
npm install
npm run dev
```

## Arquivos principais

- `src/App.tsx`
- `src/hooks/useAudioPlayer.ts`
- `src/hooks/useWebSocket.ts`
- `src/components/AudioRecorder.tsx`
- `src/components/TranscriptionDisplay.tsx`

