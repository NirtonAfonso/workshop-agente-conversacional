# 🖥️ Backend - Etapa 02: IA Conversacional

Servidor evoluído com integração de AWS Bedrock Claude para adicionar inteligência conversacional às transcrições de áudio.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![AWS Bedrock](https://img.shields.io/badge/AWS%20Bedrock-Claude-orange)
![Etapa](https://img.shields.io/badge/Etapa-02-blue)

## 🎯 Objetivo desta Etapa

Evolução da **Etapa 01** adicionando:
- ✅ Todas as funcionalidades da Etapa 01 (WebSocket + Deepgram)
- ✅ Integração com AWS Bedrock Claude
- ✅ Pipeline completo: STT → IA → Frontend
- ✅ Contexto conversacional mantido

## 🚀 Tecnologias (Evolução)

**Mantém da Etapa 01:**
- Node.js + TypeScript
- Express.js + Socket.io
- Deepgram SDK
- Sistema de segurança

**Novo na Etapa 02:**
- **AWS Bedrock SDK** - Acesso ao Claude
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
│   │   ├── BedrockService.ts        # 🆕 IA Conversacional
│   │   └── SocketService.ts         # 🆕 Pipeline STT → AI
│   ├── types/
│   │   └── index.ts                 # 🆕 Tipos AI adicionados
│   ├── utils/
│   │   ├── config.ts                # 🆕 Config AWS
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

# 🆕 AWS Bedrock Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
BEDROCK_MODEL_ID=us.anthropic.claude-3-5-haiku-20241022-v1:0

# Server Configuration
PORT=3001
CORS_ORIGIN=http://localhost:8080
NODE_ENV=development
```

### Setup AWS Bedrock
1. Acesse [AWS Console](https://console.aws.amazon.com)
2. Habilite **Amazon Bedrock** na região us-east-1
3. Configure acesso ao **Claude**
4. Crie credenciais IAM com permissões Bedrock
5. Adicione credenciais ao `.env`

## 🧠 Serviços (Novos/Atualizados)

### BedrockService (Novo)
**Responsável pela IA conversacional:**

```typescript
class BedrockService {
  // Gera resposta inteligente
  async generateResponse(
    userMessage: string,
    sessionId?: string
  ): Promise<AIResponse>

  // Testa conectividade AWS
  async testConnection(): Promise<boolean>

  // Limpa contexto da conversa
  clearConversation(sessionId: string): void

  // Obtém histórico
  getConversationHistory(sessionId: string): ConversationContext
}
```

**Características:**
- **Claude** - Modelo de última geração
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
      const aiResponse = await bedrockService.generateResponse(
        transcription.text,
        socket.id
      )
      socket.emit('ai_response', aiResponse)
    }
  }
}
```

**Funcionalidades Expandidas:**
- **Dual service integration** - Deepgram + Bedrock
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
                            BedrockService
                                  ↓
                            AI Response → Frontend
```

### Pipeline Detalhado
1. **Audio Reception**: Frontend envia áudio via WebSocket
2. **STT Processing**: Deepgram transcreve áudio
3. **Transcription Event**: Resultado enviado ao frontend
4. **🆕 AI Trigger**: Se transcription.isInterim === false
5. **🆕 AI Processing**: Bedrock Claude gera resposta
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
GET /ready       # Testa Deepgram + Bedrock
GET /api/status  # Status com config AWS
```

## 🔒 Segurança (Atualizada)

### AWS Credentials
- **IAM credentials** com permissões mínimas
- **Region lock** - Apenas us-east-1
- **Model access** - Específico para Claude

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
const [deepgramOk, bedrockOk] = await Promise.all([
  socketService.testDeepgramConnection(),
  bedrockService.testConnection()
])

logger.info('🔍 Services status', {
  deepgram: deepgramOk ? '✅' : '❌',
  bedrock: bedrockOk ? '✅' : '❌'
})
```

### Teste Manual
```bash
# Endpoint com status completo
curl http://localhost:3001/api/status

# Response inclui status AWS
{
  "service": "Conversational Agent Backend",
  "deepgram": "connected",
  "bedrock": "connected",
  "aws_region": "us-east-1"
}
```

## 🎓 O que Você Aprende (Evolução)

### Novos Conceitos da Etapa 02

**1. AWS Bedrock Integration**
- SDK usage e authentication
- Claude model invocation
- Error handling AWS específico

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

**1. AWS Credentials**
```
Error: AccessDeniedException
```
Solução: Verificar IAM permissions para Bedrock

**2. Model Access**
```
Error: ModelNotReadyException
```
Solução: Habilitar Claude no Bedrock Console

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
🤖 AI request sent to Bedrock
✅ AI response: "Olá! Como posso ajudá-lo?"
```

## 🚀 Próximos Passos

Esta etapa prepara para:

**Etapa 03**: Adicionar Gemini TTS Text-to-Speech para conversa 100% por voz

### Diferenças para Etapa 03
- Etapa 02: **STT → AI → Texto**
- Etapa 03: **STT → AI → TTS → Áudio**

## 🎯 Conceitos-Chave Aprendidos

1. **Multi-Service Integration**: Orquestração Deepgram + AWS Bedrock
2. **Conversational Context**: Gestão de contexto entre mensagens
3. **AWS Cloud Services**: Integração com Bedrock Claude
4. **Advanced Pipeline**: Fluxo STT → AI → Response
5. **Session Management**: Isolamento de conversas por usuário

---

**Base sólida para aplicações de IA conversacional inteligente**

⬅️ **Etapa anterior**: [Etapa 01 - Transcrição Básica](../etapa-01/)
➡️ **Próxima etapa**: [Etapa 03 - Conversa Completa](../etapa-03/)