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

### 2. Google Gemini (IA Conversacional)
- **Conta**: [Google AI Studio](https://console.aws.amazon.com)
- **Região**: Google AI Studio (obrigatório para Gemini)
- **Modelo**: Gemini 2.5 Flash

#### Como Configurar
1. Acesse Google AI Studio
2. Navegue até **Google AI Studio**
3. Copie a chave gerada
4. Crie credenciais API Key com permissão para usar a Gemini API

### 3. ElevenLabs (Text-to-Speech)
- **Conta**: [Criar conta](https://elevenlabs.io)
- **Créditos**: Plano gratuito disponível
- **Vozes**: Português brasileiro disponível

#### Como Obter API Key
1. Faça login no ElevenLabs
2. Vá para **Profile → API Key**
3. Copie a chave da API

## 💰 Custos Estimados

### Deepgram
- **Gratuito**: $150 em créditos
- **Uso estimado**: ~$5-10 para workshop completo

### Google Gemini
- **Pay-per-use**: ~$0.003 por 1K tokens
- **Uso estimado**: ~$2-5 para workshop completo

### ElevenLabs
- **Gratuito**: 10.000 caracteres/mês
- **Uso estimado**: Suficiente para workshop

> **💡 Dica**: Todos os serviços oferecem créditos gratuitos suficientes para completar o workshop!

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente
Prepare um arquivo `.env` com estas variáveis:

```env
# Deepgram
DEEPGRAM_API_KEY=

# Google Gemini
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-2.5-flash

# ElevenLabs
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL
ELEVENLABS_MODEL=eleven_multilingual_v2

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
- [ ] Conta no Google AI Studio com acesso Gemini
- [ ] Conta ElevenLabs com API key
- [ ] Arquivo `.env` preparado
- [ ] Microfone funcionando

---

➡️ **Próximo passo**: [Instalação](installation.md)