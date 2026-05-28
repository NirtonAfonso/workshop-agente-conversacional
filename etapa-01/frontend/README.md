# 🎨 Frontend - Etapa 01: Transcrição Básica

Interface inicial do workshop focada na captura de áudio e transcrição em tempo real usando Deepgram.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Etapa](https://img.shields.io/badge/Etapa-01-green)

## 🎯 Objetivo desta Etapa

Esta é a **primeira etapa** do workshop, focada em:
- ✅ Captura de áudio do microfone
- ✅ Streaming em tempo real via WebSocket
- ✅ Transcrição usando Deepgram API
- ✅ Interface básica para exibição dos resultados

## 🚀 Tecnologias

- **React 18.3.1 + TypeScript** - Framework e tipagem
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes base
- **Socket.io Client** - Comunicação WebSocket

## 📁 Estrutura

```
frontend/
├── src/
│   ├── components/
│   │   ├── AudioRecorder.tsx        # Componente de gravação
│   │   ├── TranscriptionDisplay.tsx # Exibição de transcrições
│   │   └── ui/                      # Componentes UI base
│   ├── hooks/
│   │   └── useWebSocket.ts          # Hook WebSocket
│   ├── App.tsx                      # App principal
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## ⚡ Comandos

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Linting
npm run lint
```

## 🎤 Funcionalidades Implementadas

### AudioRecorder
- **Gravação em tempo real** com Web Audio API (AudioContext)
- **Processamento PCM** direto com ScriptProcessorNode
- **Button visual feedback** durante gravação
- **Tratamento de permissões** de microfone
- **Streaming de áudio** para o backend
- **Estados visuais** claros (idle, recording, processing)

### TranscriptionDisplay
- **Exibição em tempo real** das transcrições
- **Resultados intermediários** e finais
- **Scroll automático** para novas transcrições
- **Histórico completo** da sessão
- **Interface limpa** e responsiva

### useWebSocket Hook
- **Conexão automática** com backend
- **Eventos tipados** para transcription
- **Reconexão** em caso de falha
- **Status de conexão** monitorado

## 🌐 Comunicação WebSocket

### Eventos Enviados
```typescript
// Iniciar gravação
socket.emit('start_recording')

// Enviar chunk de áudio
socket.emit('audio_chunk', audioBuffer)

// Parar gravação
socket.emit('stop_recording')
```

### Eventos Recebidos
```typescript
// Resultado da transcrição
socket.on('transcription', (result: TranscriptionResult) => {
  // result.text, result.confidence, result.isInterim
})

// Erros
socket.on('error', (error: ErrorMessage) => {
  // Tratamento de erros
})
```

## 📱 Interface

### Design
- **Layout simples** e focado
- **Cores suaves** com Tailwind CSS
- **Responsivo** para desktop e mobile
- **Feedback visual** claro durante uso

### Estados da Aplicação
- **Idle**: Aguardando usuário iniciar gravação
- **Recording**: Gravando e enviando áudio
- **Processing**: Processando áudio no backend
- **Error**: Exibindo erros de forma amigável

## 🔧 Configuração

### Conexão Backend
Por padrão conecta em `http://localhost:3001`. Para alterar:

```typescript
// src/hooks/useWebSocket.ts
const socket = io('http://localhost:3001')
```

### Audio Settings
```typescript
// Configurações de áudio otimizadas para Deepgram
const audioConfig = {
  sampleRate: 16000,        // 16kHz para Deepgram
  channelCount: 1,          // Mono
  echoCancellation: true,   // Cancelamento de eco
  noiseSuppression: true    // Supressão de ruído
}

// AudioContext configurado para 16kHz
audioContextRef.current = new AudioContext({ sampleRate: 16000 })
```

## 🎓 O que Você Aprende

### 1. Web Audio API
- Como capturar áudio do microfone com AudioContext
- Processamento PCM em tempo real com ScriptProcessorNode
- Conversão Float32 para PCM 16-bit
- Tratamento de permissões do browser

### 2. WebSocket Real-time
- Comunicação bidirecional
- Streaming de dados binários
- Reconexão automática

### 3. React + TypeScript
- Hooks customizados
- State management
- Componentes tipados

### 4. Audio Processing
- Formatos de áudio para web
- Otimização para APIs STT
- Buffer management

## 🚀 Próximos Passos

Após dominar esta etapa, você pode avançar para:

**Etapa 02**: Adicionar IA conversacional com Gemini
**Etapa 03**: Incluir Text-to-Speech com ElevenLabs

## 🔍 Debug

### Console Logs
```typescript
// WebSocket events
console.log('🔌 Connected to server')
console.log('🎤 Audio chunk sent:', chunk.size)
console.log('📝 Transcription received:', result.text)
```

### DevTools
- **Network tab**: Monitorar WebSocket connection
- **Console**: Ver logs de áudio e transcrição
- **Application**: Verificar permissões de microfone

## 🎯 Conceitos-Chave Aprendidos

1. **Web Audio API**: Captura e processamento de áudio avançado
2. **Real-time Audio Processing**: PCM conversion e streaming
3. **Speech-to-Text**: Integração com Deepgram
4. **Modern React**: Hooks, TypeScript, component patterns
5. **User Experience**: Estados visuais e feedback

---

**Base sólida para construir aplicações de áudio em tempo real**

➡️ **Próxima etapa**: [Etapa 02 - IA Conversacional](../etapa-02/)