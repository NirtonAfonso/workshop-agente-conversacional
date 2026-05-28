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

```env
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
3. Adicione `GEMINI_MODEL=gemini-2.5-flash`
4. Salve o arquivo e reinicie o backend

### Configuração

```env
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-2.5-flash
```

### Teste da API

```bash
# Testar acesso aos modelos Gemini
curl "https://generativelanguage.googleapis.com/v1beta/models?key=SUA_GEMINI_API_KEY"
```

## 🔊 ElevenLabs (Text-to-Speech)

### Criando Conta

1. Acesse [elevenlabs.io](https://elevenlabs.io)
2. Clique em **"Get Started Free"**
3. Registre-se com email
4. Confirme a conta

### Obtendo API Key

1. Faça login no ElevenLabs
2. Clique no avatar (canto superior direito)
3. Vá em **"Profile"**
4. Copie a **"API Key"**

### Escolhendo Voz

1. Vá em **"Voices"** no menu
2. Teste diferentes vozes
3. Para português: procure vozes com **"Portuguese"**
4. Copie o **Voice ID** da voz escolhida
5. Ou use o padrão: `EXAVITQu4vr4xnSDxMaL` (Bella - Multilingual)

### Configuração

```env
ELEVENLABS_API_KEY=sua_chave_aqui
ELEVENLABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL
ELEVENLABS_MODEL=eleven_multilingual_v2
```

### Teste da API

```bash
# Teste via curl
curl -X GET "https://api.elevenlabs.io/v1/voices" \
  -H "xi-api-key: SUA_CHAVE_AQUI"
```

## 🔧 Configuração Completa

### Arquivo .env Final

```env
# Deepgram (Speech-to-Text)
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui

# Google Gemini (IA Conversacional)
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-2.5-flash

# ElevenLabs (Text-to-Speech)
ELEVENLABS_API_KEY=sua_chave_elevenlabs_aqui
ELEVENLABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL
ELEVENLABS_MODEL=eleven_multilingual_v2

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
- **ElevenLabs**: ~$0.0001/caractere

> **💰 Total estimado**: $2-5 para workshop completo

---

⬅️ **Anterior**: [Instalação](installation.md)
➡️ **Próximo**: [Solução de Problemas](../guides/troubleshooting.md)
