# ✅ Pré-requisitos

Antes de começar o workshop, certifique-se de ter tudo configurado.

## 🛠️ Ferramentas de Desenvolvimento

### Node.js
- **Versão**: 18 ou superior
- **Download**: [nodejs.org](https://nodejs.org)
- **Verificar**: `node --version`

### Package Manager
- **npm** (incluído com Node.js) ou **yarn**
- **Verificar**: `npm --version`

### Git
- **Necessário**: Para clonar o repositório
- **Download**: [git-scm.com](https://git-scm.com)

### Editor de Código
- **Recomendado**: VSCode com extensões TypeScript e React
- **Alternativas**: WebStorm, Sublime Text, Atom

## 🌐 Navegador Moderno

### Requisitos
- **Chrome**: Versão 88+
- **Firefox**: Versão 85+
- **Safari**: Versão 14+
- **Edge**: Versão 88+

### APIs Necessárias
- ✅ **Web Audio API** - Para captura de áudio
- ✅ **WebSocket** - Para comunicação em tempo real
- ✅ **MediaDevices** - Para acesso ao microfone

### Teste de Compatibilidade

```javascript
// Teste rápido no console do navegador
console.log('Web Audio API:', !!window.AudioContext);
console.log('WebSocket:', !!window.WebSocket);
console.log('MediaDevices:', !!navigator.mediaDevices);
```

## 🔑 Contas e APIs

### 1. Deepgram (Speech-to-Text)
- **Conta**: [Criar conta gratuita](https://deepgram.com)
- **Créditos**: $150 gratuitos para teste
- **Documentação**: [docs.deepgram.com](https://docs.deepgram.com)

#### Como Obter API Key
1. Faça login no [Deepgram Console](https://console.deepgram.com)
2. Navegue até **API Keys**
3. Clique em **Create API Key**
4. Copie a chave gerada

### 2. AWS Bedrock (IA Conversacional)
- **Conta**: [AWS Console](https://console.aws.amazon.com)
- **Região**: us-east-1 (obrigatório para Claude)
- **Modelo**: Claude 3.5 Haiku

#### Como Configurar
1. Acesse AWS Console
2. Navegue até **Amazon Bedrock**
3. Habilite acesso ao modelo Claude
4. Crie credenciais IAM com permissões Bedrock

### 3. Gemini TTS (Text-to-Speech)
- **Conta**: [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Chave**: usa a mesma `GEMINI_API_KEY`
- **Modelo**: `gemini-3.1-flash-tts-preview`

#### Como Obter API Key
1. Acesse o Google AI Studio
2. Crie ou reutilize uma chave da Gemini API
3. Copie a chave da API

## 💰 Custos Estimados

### Deepgram
- **Gratuito**: $150 em créditos
- **Uso estimado**: ~$5-10 para workshop completo

### AWS Bedrock
- **Pay-per-use**: ~$0.003 por 1K tokens
- **Uso estimado**: ~$2-5 para workshop completo

### Gemini TTS
- **Uso estimado**: baixo para o workshop
- **Cobrança**: depende dos limites e preços atuais da Gemini API

> **💡 Dica**: Todos os serviços oferecem créditos gratuitos suficientes para completar o workshop!

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente
Prepare um arquivo `.env` com estas variáveis:

```text
# Deepgram
DEEPGRAM_API_KEY=

# AWS Bedrock
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
BEDROCK_MODEL_ID=us.anthropic.claude-3-5-haiku-20241022-v1:0

# Gemini TTS
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview
GEMINI_TTS_VOICE=Kore

# Server
PORT=3001
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

## ✅ Checklist Final

Antes de começar, verifique:

- [ ] Node.js 18+ instalado
- [ ] Git configurado
- [ ] Navegador moderno com Web Audio API
- [ ] Conta Deepgram com API key
- [ ] Conta AWS com acesso Bedrock
- [ ] Gemini TTS configurado no Google AI Studio
- [ ] Arquivo `.env` preparado
- [ ] Microfone funcionando

---

➡️ **Próximo passo**: [Instalação](installation.md)
