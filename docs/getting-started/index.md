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

### 2. 🤖 Google Gemini (IA Conversacional)

#### Por que Gemini?
- 🧠 **Gemini 2.5 Flash**: Modelo mais avançado
- 💬 **Conversação natural** em português
- 🔒 **Segurança enterprise**
- 📊 **Pay-per-use** (~ $0.003/1K tokens)

#### Setup da Conta no Google AI Studio

```{admonition} Importante sobre Google AI Studio
:class: warning

- Use uma Conta Google para acessar o Google AI Studio
- A chave da Gemini API pode ser criada em poucos minutos
```

**Passo 1: Conta no Google AI Studio**
1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Faça login com sua Conta Google
3. Crie ou selecione um projeto Google

**Passo 2: Criar chave da Gemini API**
1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Clique em **Create API key**
3. Crie ou selecione um projeto Google
4. Copie a chave gerada
5. Use o modelo `gemini-2.5-flash` no `.env`

**Passo 3: Configurar variáveis de ambiente**
1. Abra o arquivo `.env` do backend
2. Adicione `GEMINI_API_KEY=sua_chave_google_ai_studio_aqui`
3. Adicione `GEMINI_MODEL=gemini-2.5-flash`
4. Salve o arquivo e reinicie o backend

#### Teste Rápido
```bash
# Testar acesso aos modelos Gemini
curl "https://generativelanguage.googleapis.com/v1beta/models?key=SUA_GEMINI_API_KEY"
```

---

### 3. 🔊 ElevenLabs (Text-to-Speech)

#### Por que ElevenLabs?
- 🎵 **Qualidade excepcional** de voz
- 🇧🇷 **Português natural**
- ⚡ **Latência baixa**
- 🆓 **10.000 caracteres/mês** gratuitos

#### Setup da Conta

**Passo 1: Registro**
1. Acesse [elevenlabs.io](https://elevenlabs.io)
2. "Get Started Free"
3. Registre com email
4. Confirme conta

**Passo 2: API Key**
1. Login → Avatar (canto superior direito)
2. **"Profile"**
3. Copie a **"API Key"**

**Passo 3: Escolher Voz**
1. Menu **"Voices"**
2. Teste vozes disponíveis
3. Para português: buscar "Portuguese" ou "Multilingual"
4. **Recomendação**: Use `EXAVITQu4vr4xnSDxMaL` (Bella - Multilingual)

#### Teste Rápido
```bash
# Teste via curl (substitua SUA_CHAVE)
curl -X GET "https://api.elevenlabs.io/v1/voices" \
  -H "xi-api-key: SUA_CHAVE_AQUI"

# Resposta esperada: JSON com lista de vozes
```

---

## 🧪 Configuração do Projeto

### 📥 Clone do Repositório

```bash
# Clone o projeto
git clone https://github.com/NirtonAfonso/workshop-agente-conversacional.git
cd workshop-agente-conversacional

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
```env
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
- [ ] **Google Gemini**: Conta Google AI Studio + chave da Gemini API configurada
- [ ] **ElevenLabs**: Conta criada + API key obtida + teste passou

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
```env
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
| **Google Gemini** | ~500 requests | $2.50 |
| **ElevenLabs** | ~5000 caracteres | $0.15 |
| **Total** | | **~$3.70** |

```{admonition} Créditos Gratuitos 💰
:class: note

- **Deepgram**: $150 gratuitos
- **ElevenLabs**: 10k caracteres/mês
- **Google AI Studio**: cota gratuita disponível conforme limites atuais da Gemini API

O workshop pode ser feito **completamente gratuito**!
```

---

➡️ **Continue para**: [Etapa 01 - Transcrição Básica](../etapa-01/index.md)
