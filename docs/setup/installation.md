# 📦 Instalação

Guia completo para instalar e configurar o workshop.

## 🔄 Clonando o Repositório

```bash
# Clone o repositório
git clone https://github.com/NirtonAfonso/workshop-agente-conversacional.git
cd workshop-agente-conversacional

# Escolha a trilha do workshop
git checkout AWS      # Para Bedrock + Gemini TTS
# ou
git checkout Gemini   # Para Gemini + Gemini TTS
```

## 📁 Estrutura das Etapas

O projeto está organizado em 3 etapas progressivas:

```
workshop-agente-conversacional/
├── etapa-01/    # Transcrição básica
├── etapa-02/    # + IA conversacional
├── etapa-03/    # + Text-to-speech (completo)
└── docs/        # Documentação
```

## 🚀 Instalação por Etapa

### Etapa 01 - Transcrição Básica

```bash
# Backend
cd etapa-01/backend
npm install

# Frontend (novo terminal)
cd etapa-01/frontend
npm install
```

### Etapa 02 - IA Conversacional

```bash
# Backend
cd etapa-02/backend
npm install

# Frontend (novo terminal)
cd etapa-02/frontend
npm install
```

### Etapa 03 - Workshop Completo

```bash
# Backend
cd etapa-03/backend
npm install

# Frontend (novo terminal)
cd etapa-03/frontend
npm install
```

## ⚙️ Configuração das APIs

### 1. Etapa 01 (.env no backend)

```text
# Deepgram Configuration
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui

# Server Configuration
PORT=3001
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### 2. Etapa 02 (adicionar ao .env)

```text
# AWS Bedrock Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua_aws_access_key_id
AWS_SECRET_ACCESS_KEY=sua_aws_secret_access_key
BEDROCK_MODEL_ID=us.anthropic.claude-3-5-haiku-20241022-v1:0
```

### 3. Etapa 03 (adicionar ao .env)

```text
# Gemini TTS Configuration
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview
GEMINI_TTS_VOICE=Kore
```

## ✅ Verificação da Instalação

### Teste das Dependências

```bash
# Verificar Node.js
node --version  # Deve ser 18+

# Verificar npm
npm --version

# Verificar se as dependências foram instaladas
cd etapa-01/backend && npm list --depth=0
cd etapa-01/frontend && npm list --depth=0
```

### Teste dos Servidores

```bash
# Backend (terminal 1)
cd etapa-01/backend
npm run dev
# Deve exibir: "🚀 Server running on port 3001"

# Frontend (terminal 2)
cd etapa-01/frontend
npm run dev
# Deve exibir: "Local: http://localhost:5173"
```

## 🔧 Resolução de Problemas

### Problemas Comuns

#### Erro: Node.js version
```bash
# Atualizar Node.js para versão 18+
# Download: https://nodejs.org
```

#### Erro: npm install failed
```bash
# Limpar cache e reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Erro: Permission denied
```bash
# No macOS/Linux
sudo npm install -g npm@latest

# Ou use yarn como alternativa
npm install -g yarn
yarn install
```

#### Erro: Port already in use
```bash
# Matar processo na porta 3001
npx kill-port 3001

# Ou usar porta diferente
PORT=3002 npm run dev
```

### Logs de Debug

```bash
# Backend com logs detalhados
DEBUG=* npm run dev

# Frontend com logs de build
npm run dev -- --debug
```

## 📱 Teste do Microfone

Antes de iniciar, teste se o microfone funciona:

1. Abra `http://localhost:5173`
2. Clique em "Iniciar Gravação"
3. Permita acesso ao microfone
4. Fale algo e veja se aparece na transcrição

## 🎯 Próximos Passos

Após a instalação:

1. **Teste a Etapa 01** - Transcrição básica
2. **Configure APIs** - Adicione chaves conforme avança
3. **Teste cada etapa** - Valide funcionamento
4. **Explore o código** - Entenda a implementação

---

⬅️ **Anterior**: [Pré-requisitos](prerequisites.md)
➡️ **Próximo**: [Configuração](configuration.md)
