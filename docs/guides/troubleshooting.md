# 🔧 Solução de Problemas

Guia completo para resolver problemas comuns durante o workshop.

## 🎤 Problemas de Áudio

### Microfone não funciona

**Sintomas**: Não consegue iniciar gravação ou não há transcrição

**Soluções**:

1. **Verificar permissões do navegador**
   ```javascript
   // Teste no console
   navigator.mediaDevices.getUserMedia({ audio: true })
     .then(() => console.log('✅ Microfone OK'))
     .catch(e => console.error('❌ Erro:', e))
   ```

2. **Configurações do sistema**
   - **macOS**: Configurações → Segurança → Microfone
   - **Windows**: Configurações → Privacidade → Microfone
   - **Linux**: `alsamixer` ou PulseAudio

3. **Testar outros navegadores**
   - Chrome/Edge (melhor suporte)
   - Firefox
   - Safari (limitações)

### Áudio de baixa qualidade

**Sintomas**: Transcrição imprecisa ou com erros

**Soluções**:

1. **Verificar configuração de áudio**
   ```typescript
   // Em AudioRecorder.tsx
   const audioConfig = {
     sampleRate: 16000,        // Deepgram otimizado
     echoCancellation: true,   // Reduz eco
     noiseSuppression: true,   // Reduz ruído
     channelCount: 1          // Mono
   }
   ```

2. **Ambiente de gravação**
   - Use fones de ouvido
   - Ambiente silencioso
   - Fale claramente

## 🌐 Problemas de WebSocket

### Conexão falha constantemente

**Sintomas**: "Desconectado do servidor" ou reconexões frequentes

**Soluções**:

1. **Verificar URLs**
   ```typescript
   // frontend/src/hooks/useWebSocket.ts
   const socket = io('http://localhost:3001')

   // backend .env
   CORS_ORIGIN=http://localhost:5173
   ```

2. **Testar conectividade**
   ```bash
   # Teste se backend está rodando
   curl http://localhost:3001/health

   # Teste WebSocket
   curl -X GET http://localhost:3001/socket.io/
   ```

3. **Firewall/Proxy**
   - Desabilitar firewall temporariamente
   - Verificar proxy corporativo

## 🔑 Problemas de API

### Deepgram API Error

**Erro comum**: `401 Unauthorized`

**Soluções**:

1. **Verificar API Key**
   ```bash
   # Teste direto
   curl -X GET "https://api.deepgram.com/v1/projects" \
     -H "Authorization: Token SUA_CHAVE"
   ```

2. **Formato correto no .env**
   ```text
   DEEPGRAM_API_KEY=sua_chave_sem_aspas
   ```

### AWS Bedrock Access Denied

**Erro comum**: `AccessDeniedException`

**Soluções**:

1. **Verificar região**
   ```text
   AWS_REGION=us-east-1  # Obrigatório para Claude
   ```

2. **Verificar model access**
   - AWS Console → Bedrock → Model access
   - Habilitar Claude 3.5 Haiku

3. **Verificar IAM permissions**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "bedrock:InvokeModel",
           "bedrock:ListFoundationModels"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

### Gemini TTS Rate Limit

**Erro comum**: `429 Too Many Requests`

**Soluções**:

1. **Verificar plano**
   - Plano gratuito: cota gratuita conforme limites atuais da Gemini API
   - Upgrade se necessário

2. **Implementar retry**
   ```typescript
   // Já implementado no backend
   await new Promise(resolve => setTimeout(resolve, 1000))
   ```

## 🖥️ Problemas do Backend

### Servidor não inicia

**Erro comum**: `Error: listen EADDRINUSE :::3001`

**Soluções**:

1. **Matar processo na porta**
   ```bash
   # macOS/Linux
   lsof -ti:3001 | xargs kill -9

   # Windows
   netstat -ano | findstr :3001
   taskkill /PID <PID> /F
   ```

2. **Usar porta diferente**
   ```text
   PORT=3002
   ```

### Dependências não encontradas

**Erro comum**: `Cannot find module`

**Soluções**:

1. **Reinstalar dependências**
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

2. **Verificar versão Node.js**
   ```bash
   node --version  # Deve ser 18+
   ```

## 🎨 Problemas do Frontend

### Build falha

**Erro comum**: TypeScript errors

**Soluções**:

1. **Verificar tipos**
   ```bash
   npm run type-check
   ```

2. **Limpar cache**
   ```bash
   rm -rf .vite node_modules
   npm install
   ```

### Hot reload não funciona

**Soluções**:

1. **Verificar porta**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     server: {
       port: 5173,
       host: true,
     }
   })
   ```

## 🔍 Debug Avançado

### Logs detalhados

1. **Backend debug**
   ```bash
   DEBUG=* npm run dev
   ```

2. **Frontend debug**
   ```typescript
   // Adicionar logs no useWebSocket
   useEffect(() => {
     socket.on('connect', () => {
       console.log('🔌 Connected:', socket.id)
     })
   }, [])
   ```

### Ferramentas de desenvolvimento

1. **Chrome DevTools**
   - Network tab para WebSocket
   - Console para logs
   - Application → Media para áudio

2. **Postman/Insomnia**
   - Testar endpoints HTTP
   - Verificar health checks

## 📊 Monitoramento

### Health Checks

```bash
# Status geral
curl http://localhost:3001/health

# Status completo com APIs
curl http://localhost:3001/ready

# Status detalhado
curl http://localhost:3001/api/status
```

### Logs estruturados

```typescript
// Backend - logger.ts
logger.info('🎤 Audio processing', {
  chunkSize: audioData.length,
  socketId,
  timestamp: Date.now()
})
```

## 🆘 Quando Pedir Ajuda

### Informações necessárias

1. **Sistema operacional** e versão
2. **Node.js version**: `node --version`
3. **Browser** e versão
4. **Logs de erro** completos
5. **Passos para reproduzir**

### Onde buscar ajuda

- **GitHub Issues**: Para bugs específicos
- **Documentação**: Para configuração
- **Community**: Discord/Slack da comunidade

---

⬅️ **Anterior**: [Configuração](../setup/configuration.md)
