# ⚙️ Configuração das APIs

Guia detalhado para configurar todas as APIs necessárias para o workshop.

## 🔑 Deepgram (Speech-to-Text)

### Criando Conta

1. Acesse [deepgram.com](https://deepgram.com)
2. Clique em **"Get API Key"**
3. Preencha o formulário de registro
4. Confirme o email

### Obtendo API Key

1. Faça login no [Deepgram Console](https://console.deepgram.com)
2. No dashboard, clique em **"API Keys"**
3. Clique em **"Create a New API Key"**
4. Dê um nome (ex: "Workshop Agente")
5. Copie a chave gerada

### Configuração

```text
DEEPGRAM_API_KEY=sua_chave_aqui
```

### Teste da API

```bash
# Teste via curl
curl -X GET "https://api.deepgram.com/v1/projects" \
  -H "Authorization: Token SUA_CHAVE_AQUI"
```

## 🤖 Google Gemini (IA Conversacional)

### Criando Conta no Google AI Studio

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Faça login com sua Conta Google
3. Crie ou selecione um projeto Google

### Criando Chave da Gemini API

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Clique em **Create API key**
3. Escolha o projeto Google
4. Copie a chave gerada

### Configurando o Backend

1. Abra o arquivo `.env` do backend
2. Adicione `GEMINI_API_KEY=sua_chave_google_ai_studio_aqui`
3. Adicione `GEMINI_MODEL=gemini-3.1-flash-lite`
4. Salve o arquivo e reinicie o backend

### Configuração

```text
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-3.1-flash-lite
```

### Teste da API

```bash
# Testar acesso aos modelos Gemini
curl "https://generativelanguage.googleapis.com/v1beta/models?key=SUA_GEMINI_API_KEY"
```

## 🔊 Gemini TTS (Text-to-Speech)

### Usando a Conta do Google AI Studio

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Use a mesma chave configurada em `GEMINI_API_KEY`
3. Defina o modelo de voz `gemini-3.1-flash-tts-preview`
4. Escolha uma voz suportada, como `Kore`

### Configuração

```text
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview
GEMINI_TTS_VOICE=Kore
```

### Teste da API

```bash
# Listar modelos disponíveis na Gemini API
curl "https://generativelanguage.googleapis.com/v1beta/models?key=SUA_GEMINI_API_KEY"
```

## 🔧 Configuração Completa

### Arquivo .env Final

```text
# Deepgram (Speech-to-Text)
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui

# Google Gemini (IA Conversacional)
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-3.1-flash-lite

# Gemini TTS (Text-to-Speech)
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview
GEMINI_TTS_VOICE=Kore

# Configurações do Servidor
PORT=3001
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

## ✅ Teste Completo

### Health Check do Backend

1. Inicie o backend: `npm run dev`
2. Acesse: `http://localhost:3001/ready`
3. Deve retornar status de todas as APIs

### Teste End-to-End

1. Inicie backend e frontend
2. Acesse `http://localhost:5173`
3. Clique em "Iniciar Gravação"
4. Fale algo em português
5. Veja transcrição + resposta IA + áudio

## 🔒 Segurança

### Boas Práticas

- ✅ **Nunca** commitir arquivos `.env`
- ✅ **Rodar** credenciais regularmente
- ✅ **Usar** roles em produção
- ✅ **Limitar** permissões ao mínimo necessário

### Custos

- **Deepgram**: ~$0.0035/minuto
- **Google Gemini**: ~$0.003/1K tokens
- **Gemini TTS**: cobrado conforme limites e preços atuais da Gemini API

> **💰 Total estimado**: $2-5 para workshop completo

---

⬅️ **Anterior**: [Instalação](installation.md)
➡️ **Próximo**: [Solução de Problemas](../guides/troubleshooting.md)
