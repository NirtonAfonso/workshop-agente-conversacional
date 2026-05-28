# ⚙️ Getting Started

Guia completo para configurar seu ambiente e começar o workshop do zero.

![Setup](https://img.shields.io/badge/Status-Setup%20Ready-brightgreen)
![Tempo](https://img.shields.io/badge/Tempo-30--45%20min-blue)

## 🎯 O que faremos nesta etapa

```{mermaid}
graph LR
    A[💻 Ambiente<br/>Local] --> B[🔑 Contas<br/>APIs]
    B --> C[🧪 Testes<br/>Básicos]
    C --> D[✅ Validação<br/>Setup]

    style A fill:#e3f2fd
    style B fill:#f1f8e9
    style C fill:#fff8e1
    style D fill:#e8f5e8
```

Ao final desta seção, você terá:
- ✅ Ambiente de desenvolvimento configurado
- ✅ Todas as contas de API criadas
- ✅ Chaves de acesso obtidas e testadas
- ✅ Projeto base rodando localmente

---

## 💻 Configuração do Ambiente Local

### 🔧 Ferramentas Essenciais

#### Node.js 18+
```bash
# Verificar versão (deve ser 18+)
node --version

# Se precisar instalar/atualizar:
# - macOS: brew install node
# - Windows: Download do site oficial
# - Linux: nvm install 18
```

#### Git
```bash
# Verificar instalação
git --version

# Configurar se ainda não fez:
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

#### Editor de Código
- **Recomendado**: [VSCode](https://code.visualstudio.com) com extensões:
  - TypeScript and JavaScript Language Features
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense

### 🎨 Navegador de Desenvolvimento
- **Chrome** ou **Edge** (melhor suporte Web Audio API)
- **DevTools**: Familiarize-se com Network e Console tabs

---

## 🔑 Criação das Contas de API

### 1. 📝 Deepgram (Speech-to-Text)

#### Por que Deepgram?
- ⚡ **Latência ultra-baixa** (< 100ms)
- 🌍 **Português brasileiro** nativo
- 💰 **$150 gratuitos** para teste
- 🎯 **Otimizado** para tempo real

#### Setup da Conta

```{admonition} Passo a Passo Deepgram
:class: note

1. **Acesse**: [deepgram.com](https://deepgram.com)
2. **Clique**: "Get API Key" ou "Sign Up"
3. **Preencha**: Informações básicas
4. **Confirme**: Email de verificação
5. **Dashboard**: Acesse o console
```

#### Obtendo API Key

1. No [Deepgram Console](https://console.deepgram.com):
   - Clique em **"API Keys"**
   - **"Create a New API Key"**
   - Nome: `workshop-agente-conversacional`
   - **Copie** a chave gerada

#### Teste Rápido
```bash
# Teste via curl (substitua SUA_CHAVE)
curl -X GET "https://api.deepgram.com/v1/projects" \
  -H "Authorization: Token SUA_CHAVE_AQUI"

# Resposta esperada: JSON com seus projetos
```

---

### 2. 🤖 AWS Bedrock (IA Conversacional)

#### Por que AWS Bedrock Claude?
- 🧠 **Claude**: Modelo mais avançado
- 💬 **Conversação natural** em português
- 🔒 **Segurança enterprise**
- 📊 **Pay-per-use** (~ $0.003/1K tokens)

#### Setup da Conta AWS

```{admonition} Importante sobre AWS
:class: warning

- Requer **cartão de crédito** para verificação
- **Região obrigatória**: us-east-1
- **Aprovação**: Bedrock pode levar alguns minutos
```

**Passo 1: Conta AWS**
1. Acesse [aws.amazon.com](https://aws.amazon.com)
2. "Create AWS Account"
3. Preencha dados + cartão de crédito
4. Complete verificação por telefone

**Passo 2: Habilitar Bedrock**
1. Faça login no [AWS Console](https://console.aws.amazon.com)
2. **IMPORTANTE**: Mude região para **us-east-1** (canto superior direito)
3. Procure "Bedrock" nos serviços
4. Vá em **"Model access"**
5. **"Manage model access"**
6. Habilite: **"Anthropic Claude 3.5 Haiku"**
7. Aguarde aprovação (1-5 minutos)

**Passo 3: Credenciais IAM**
1. Vá para **IAM** no console
2. **"Users"** → **"Create user"**
3. Nome: `bedrock-workshop-user`
4. **"Attach policies directly"**
5. Selecione: `AmazonBedrockFullAccess`
6. Complete criação
7. Clique no usuário → **"Security credentials"**
8. **"Create access key"** → "Application running on AWS services"
9. **Copie**: Access Key ID e Secret Access Key

#### Teste Rápido
```bash
# Instalar AWS CLI (opcional)
# pip install awscli

# Configurar (se instalou CLI)
aws configure
# Insira: Access Key, Secret Key, us-east-1, json

# Teste via CLI
aws bedrock list-foundation-models --region us-east-1
```

---

### 3. 🔊 Gemini TTS (Text-to-Speech)

#### Por que Gemini TTS?
- 🎵 **Qualidade excepcional** de voz
- 🇧🇷 **Português natural**
- ⚡ **Latência baixa**
- 🆓 cota gratuita disponível conforme limites atuais da Gemini API

#### Setup da Conta

**Passo 1: Chave da Gemini API**
1. Acesse [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Faça login com sua Conta Google
3. Clique em **Create API key**
4. Copie a chave para `GEMINI_API_KEY`

**Passo 2: Modelo e voz**
1. Configure `GEMINI_TTS_VOICE=Kore`
2. Troque `Kore` por outra voz suportada pela Gemini API se desejar
3. Configure `GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview`

#### Teste Rápido
```bash
# Listar modelos disponíveis na Gemini API
curl "https://generativelanguage.googleapis.com/v1beta/models?key=SUA_GEMINI_API_KEY"
```

---

## 🧪 Configuração do Projeto

### 📥 Clone do Repositório

```bash
# Clone o projeto
git clone https://github.com/NirtonAfonso/workshop-agente-conversacional.git
cd workshop-agente-conversacional

# Escolha a trilha do workshop
git checkout AWS      # Para Bedrock + Gemini TTS
# ou
git checkout Gemini   # Para Gemini + Gemini TTS

# Explore a estrutura
ls -la
# Você verá: etapa-01/, etapa-02/, etapa-03/, docs/
```

### ⚙️ Setup Básico (Etapa 01)

```bash
# Setup do Backend
cd etapa-01/backend
npm install

# Criar arquivo de configuração
cp .env.example .env
# Edite o .env com suas chaves
```

**Arquivo .env (etapa-01/backend/.env)**:
```text
# Deepgram Configuration
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui

# Server Configuration
PORT=3001
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

```bash
# Setup do Frontend
cd ../frontend
npm install
```

### 🧪 Teste Inicial

```bash
# Terminal 1: Backend
cd etapa-01/backend
npm run dev
# Esperado: "🚀 Server running on port 3001"

# Terminal 2: Frontend
cd etapa-01/frontend
npm run dev
# Esperado: "Local: http://localhost:5173"
```

**Navegador**: Acesse `http://localhost:5173`
- Deve ver interface do AudioRecorder
- Clique "Iniciar Gravação"
- Permita acesso ao microfone
- Fale algo → deve aparecer transcrição

---

## ✅ Checklist de Validação

### 🔍 Ambiente Local
- [ ] Node.js 18+ instalado e funcionando
- [ ] Git configurado
- [ ] VSCode (ou editor preferido) configurado
- [ ] Chrome/Edge atualizado

### 🔑 APIs Configuradas
- [ ] **Deepgram**: Conta criada + API key obtida + teste passou
- [ ] **AWS Bedrock**: Conta AWS + Bedrock habilitado + IAM configurado
- [ ] **Gemini TTS**: `GEMINI_API_KEY`, `GEMINI_TTS_MODEL` e `GEMINI_TTS_VOICE` configurados

### 🎯 Projeto Funcionando
- [ ] Repositório clonado
- [ ] Dependências instaladas (backend + frontend)
- [ ] Arquivo `.env` configurado
- [ ] Backend rodando na porta 3001
- [ ] Frontend rodando na porta 5173
- [ ] Teste básico de transcrição funcionando

### 🧪 Testes de Conectividade

**Health Check Backend**:
```bash
curl http://localhost:3001/health
# Esperado: {"status": "ok"}
```

**Health Check APIs**:
```bash
curl http://localhost:3001/ready
# Esperado: Status de todas as APIs
```

---

## 🚨 Solução de Problemas Comuns

### 🎤 Microfone não funciona
```javascript
// Teste no console do navegador
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(() => console.log('✅ Microfone OK'))
  .catch(e => console.error('❌ Erro:', e))
```

**Soluções**:
- Verificar permissões do navegador
- Testar em Chrome/Edge
- Verificar configurações do sistema

### 🔌 Erro de CORS
**Sintoma**: Frontend não conecta com backend

**Solução**:
```text
# Verificar CORS_ORIGIN no .env
CORS_ORIGIN=http://localhost:5173
```

### 💻 Porta em uso
```bash
# Matar processo na porta
npx kill-port 3001

# Ou usar porta diferente
PORT=3002 npm run dev
```

---

## 🎉 Pronto para o Workshop!

```{admonition} Parabéns! 🎊
:class: tip

Se todos os checkpoints passaram, você está pronto para começar o desenvolvimento!

**Próximos passos**:
1. ☕ Pegue um café (você merece!)
2. 📚 Revisar objetivos de cada etapa
3. 🚀 Começar com [Etapa 01 - Transcrição Básica](../etapa-01/index.md)

**Lembre-se**: Durante o workshop, sempre consulte a [Solução de Problemas](../guides/troubleshooting.md) se encontrar dificuldades.
```

---

## 📊 Estimativa de Custos

Durante o workshop completo, você gastará aproximadamente:

| Serviço | Uso Estimado | Custo |
|---------|--------------|-------|
| **Deepgram** | ~30 min de áudio | $1.05 |
| **AWS Bedrock** | ~500 requests | $2.50 |
| **Gemini TTS** | ~5000 caracteres de resposta | Conforme limites/preços atuais da Gemini API |
| **Total** | | Depende do uso e dos limites atuais das APIs |

```{admonition} Créditos Gratuitos 💰
:class: note

- **Deepgram**: $150 gratuitos
- **Gemini TTS**: cota gratuita conforme limites atuais da Gemini API
- **AWS**: Free tier para novos usuários

O workshop pode ser feito **completamente gratuito**!
```

---

➡️ **Continue para**: [Etapa 01 - Transcrição Básica](../etapa-01/index.md)
