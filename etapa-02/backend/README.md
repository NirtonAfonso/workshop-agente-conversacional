# 🖥️ Backend - Etapa 02: IA Conversacional

Servidor evoluído com integração de Gemini para adicionar inteligência conversacional às transcrições de áudio.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-API-blue)
![Etapa](https://img.shields.io/badge/Etapa-02-blue)

## 🎯 Objetivo desta Etapa

Evolução da **Etapa 01** adicionando:
- ✅ Todas as funcionalidades da Etapa 01 (WebSocket + Deepgram)
- ✅ Integração com Gemini via Google AI Studio
- ✅ Pipeline completo: STT → IA → Frontend
- ✅ Contexto conversacional mantido

## 🚀 Tecnologias (Evolução)

**Mantém da Etapa 01:**
- Node.js + TypeScript
- Express.js + Socket.io
- Deepgram SDK
- Sistema de segurança

**Novo na Etapa 02:**
- **@google/genai SDK** - Acesso ao Gemini 2.5 Flash
- **Conversation management** - Contexto entre mensagens
- **AI response pipeline** - Fluxo STT → AI

## 📁 Estrutura (Atualizada)

```
backend/
├── src/
│   ├── controllers/
│   │   └── healthController.ts      # Health checks
│   ├── middleware/
│   │   └── security.ts              # Segurança
│   ├── services/
│   │   ├── DeepgramService.ts       # STT (igual Etapa 01)
│   │   ├── GeminiService.ts        # 🆕 IA Conversacional
│   │   └── SocketService.ts         # 🆕 Pipeline STT → AI
│   ├── types/
│   │   └── index.ts                 # 🆕 Tipos AI adicionados
│   ├── utils/
│   │   ├── config.ts                # 🆕 config Gemini
│   │   └── logger.ts                # Logging
│   └── server.ts                    # Servidor principal
├── dist/
├── package.json
└── tsconfig.json
```

## ⚡ Comandos (Iguais)

```bash
npm install     # Instalar dependências
npm run dev     # Desenvolvimento
npm run build   # Build produção
npm start       # Executar build
npm run type-check  # Verificar tipos
```

## 🔧 Configuração (Expandida)

### Variáveis de Ambiente (.env)

```env
# Deepgram Configuration (da Etapa 01)
DEEPGRAM_API_KEY=your_deepgram_api_key_here

# 🆕 Google Gemini Configuration
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-2.5-flash

# Server Configuration
PORT=3001
CORS_ORIGIN=http://localhost:8080
NODE_ENV=development
```

### Setup Google Gemini
1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Habilite **Google AI Studio** na região Google AI Studio
3. Configure acesso ao **Gemini 2.5 Flash**
4. Crie credenciais API Key com permissão para usar a Gemini API
5. Adicione credenciais ao `.env`

## 🧠 Serviços (Novos/Atualizados)

### GeminiService (Novo)
**Responsável pela IA conversacional:**

```typescript
class GeminiService {
  // Gera resposta inteligente
  async generateResponse(
    userMessage: string,
    sessionId?: string
  ): Promise<AIResponse>

  // Testa conectividade Gemini
  async testConnection(): Promise<boolean>

  // Limpa contexto da conversa
  clearConversation(sessionId: string): void

  // Obtém histórico
  getConversationHistory(sessionId: string): ConversationContext
}
```

**Características:**
- **Gemini 2.5 Flash** - Modelo de última geração
- **Contexto conversacional** - Memória entre mensagens
- **System prompts** - Personalidade e comportamento
- **Session management** - Conversas isoladas por usuário

### SocketService (Evoluído)
**Pipeline completo STT → AI:**

```typescript
class SocketService {
  // Pipeline: áudio → transcrição → IA → resposta
  private async handleAudioChunk(socket, audioData) {
    // 1. Transcribe with Deepgram
    const transcription = await deepgramService.transcribeAudio(buffer)
    socket.emit('transcription', transcription)

    // 2. 🆕 Generate AI response
    if (!transcription.isInterim) {
      const aiResponse = await GeminiService.generateResponse(
        transcription.text,
        socket.id
      )
      socket.emit('ai_response', aiResponse)
    }
  }
}
```

**Funcionalidades Expandidas:**
- **Dual service integration** - Deepgram + Gemini
- **Pipeline automation** - Fluxo automático STT → AI
- **Session isolation** - Contexto por socket
- **Error handling** robusto para ambos serviços

## 🌐 API WebSocket (Expandida)

### Eventos Recebidos (Iguais)
```typescript
socket.on('start_recording', () => {})
socket.on('audio_chunk', async (audioData) => {})
socket.on('stop_recording', () => {})
```

### Eventos Enviados (Expandidos)

#### `transcription` (Igual Etapa 01)
```typescript
interface TranscriptionResult {
  text: string
  confidence: number
  isInterim: boolean
  timestamp: number
}
```

#### `ai_response` (Novo)
```typescript
interface AIResponse {
  text: string
  timestamp: number
  confidence?: number
}

socket.emit('ai_response', {
  text: "Entendi! Você disse sobre...",
  timestamp: Date.now(),
  confidence: 0.95
})
```

#### `error` (Expandido)
```typescript
// Agora inclui erros de IA também
socket.emit('error', {
  message: "Erro na geração de resposta IA",
  code: "AI_GENERATION_ERROR",
  timestamp: Date.now()
})
```

## 🔄 Fluxo de Dados (Evoluído)

```
Frontend Audio → WebSocket → Deepgram → Transcription → Frontend
                                  ↓
                            GeminiService
                                  ↓
                            AI Response → Frontend
```

### Pipeline Detalhado
1. **Audio Reception**: Frontend envia áudio via WebSocket
2. **STT Processing**: Deepgram transcreve áudio
3. **Transcription Event**: Resultado enviado ao frontend
4. **🆕 AI Trigger**: Se transcription.isInterim === false
5. **🆕 AI Processing**: Gemini gera resposta
6. **🆕 AI Response Event**: Resposta enviada ao frontend

## 🧠 Sistema de Conversação

### Contexto Conversacional
```typescript
interface ConversationContext {
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: number
  }>
}

// Mantido por sessionId (socket.id)
private conversations = new Map<string, ConversationContext>()
```

### System Prompt
```typescript
// Personalidade do assistente
const systemPrompt = `
Você é um assistente conversacional inteligente em português brasileiro.
Responda de forma natural, útil e concisa às mensagens do usuário.
Mantenha um tom amigável e profissional.
`
```

### Gestão de Memória
- **Histórico limitado** - Últimas 10 mensagens por sessão
- **Cleanup automático** - Sessões expiram após inatividade
- **Context isolation** - Cada socket tem contexto próprio

## 📊 Logging (Expandido)

### Logs da IA
```typescript
logger.info('🤖 Generating AI response', {
  userMessage: text.substring(0, 50),
  sessionId: socket.id
})

logger.info('✅ AI response generated', {
  responseLength: response.text.length,
  sessionId: socket.id,
  processingTime: '1.2s'
})
```

### Health Checks Atualizados
```bash
GET /health      # Status básico
GET /ready       # Testa Deepgram + Gemini
GET /api/status  # Status com config Gemini
```

## 🔒 Segurança (Atualizada)

### Gemini API Key
- **chave da Gemini API** com permissões mínimas
- **Region lock** - Apenas Google AI Studio
- **Model access** - Específico para Gemini 2.5 Flash

### Rate Limiting Específico
```typescript
// Rate limit específico para IA
const aiRateLimit = {
  windowMs: 60000,        // 1 minuto
  max: 20,                // 20 requests AI por minuto
  message: 'Rate limit exceeded for AI requests'
}
```

## 🧪 Testes (Expandidos)

### Conectividade Dupla
```typescript
// Testa ambos serviços na inicialização
const [deepgramOk, geminiOk] = await Promise.all([
  socketService.testDeepgramConnection(),
  GeminiService.testConnection()
])

logger.info('🔍 Services status', {
  deepgram: deepgramOk ? '✅' : '❌',
  gemini: geminiOk ? '✅' : '❌'
})
```

### Teste Manual
```bash
# Endpoint com status completo
curl http://localhost:3001/api/status

# Response inclui status Gemini
{
  "service": "Conversational Agent Backend",
  "deepgram": "connected",
  "Gemini": "connected",
  "aws_region": "Google AI Studio"
}
```

## 🎓 O que Você Aprende (Evolução)

### Novos Conceitos da Etapa 02

**1. Google Gemini Integration**
- SDK usage e authentication
- Gemini model invocation
- Error handling Gemini específico

**2. Conversational AI Patterns**
- Context management entre mensagens
- System prompt engineering
- Session isolation

**3. Service Orchestration**
- Pipeline multi-service
- Async service coordination
- Error propagation entre serviços

**4. Advanced WebSocket Patterns**
- Multiple event types
- Service-specific error handling
- Complex data flows

## 🔍 Debug (Expandido)

### Problemas Comuns

**1. Gemini API Key**
```
Error: AccessDeniedException
```
Solução: Verificar permissões da chave da Gemini API para Gemini

**2. Model Access**
```
Error: ModelNotReadyException
```
Solução: Habilitar Gemini no Gemini Console

**3. Rate Limiting**
```
Error: ThrottlingException
```
Solução: Implementar retry com backoff

### Logs Importantes
```typescript
🔌 Client connected: socket-abc123
🎤 Audio chunk: 1024 bytes
📝 Transcription: "olá assistente" (final)
🤖 AI request sent to Gemini
✅ AI response: "Olá! Como posso ajudá-lo?"
```

## 🚀 Próximos Passos

Esta etapa prepara para:

**Etapa 03**: Adicionar ElevenLabs Text-to-Speech para conversa 100% por voz

### Diferenças para Etapa 03
- Etapa 02: **STT → AI → Texto**
- Etapa 03: **STT → AI → TTS → Áudio**

## 🎯 Conceitos-Chave Aprendidos

1. **Multi-Service Integration**: Orquestração Deepgram + Google Gemini
2. **Conversational Context**: Gestão de contexto entre mensagens
3. **Google AI Studio**: Integração com Gemini
4. **Advanced Pipeline**: Fluxo STT → AI → Response
5. **Session Management**: Isolamento de conversas por usuário

---

**Base sólida para aplicações de IA conversacional inteligente**

⬅️ **Etapa anterior**: [Etapa 01 - Transcrição Básica](../etapa-01/)
➡️ **Próxima etapa**: [Etapa 03 - Conversa Completa](../etapa-03/)
