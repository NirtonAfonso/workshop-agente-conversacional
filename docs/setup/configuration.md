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

## 🤖 AWS Bedrock (IA Conversacional)

### Criando Conta AWS

1. Acesse [aws.amazon.com](https://aws.amazon.com)
2. Clique em **"Create AWS Account"**
3. Preencha informações e adicione cartão de crédito
4. Complete verificação por telefone

### Habilitando Bedrock

1. Faça login no [AWS Console](https://console.aws.amazon.com)
2. **Importante**: Mude região para **us-east-1**
3. Procure por **"Bedrock"** nos serviços
4. Vá em **"Model access"**
5. Clique em **"Manage model access"**
6. Habilite **"Anthropic Claude 3.5 Haiku"**
7. Aguarde aprovação (pode levar alguns minutos)

### Criando Credenciais IAM

1. Vá para **IAM** no console AWS
2. Clique em **"Users"** → **"Create user"**
3. Nome: `bedrock-workshop-user`
4. Em **"Permissions"**, clique **"Attach policies directly"**
5. Busque e selecione: `AmazonBedrockFullAccess`
6. Complete a criação
7. Clique no usuário criado
8. Vá em **"Security credentials"**
9. Clique em **"Create access key"**
10. Escolha **"Application running on AWS services"**
11. Copie **Access Key ID** e **Secret Access Key**

### Configuração

```text
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua_access_key_aqui
AWS_SECRET_ACCESS_KEY=sua_secret_key_aqui
BEDROCK_MODEL_ID=us.anthropic.claude-3-5-haiku-20241022-v1:0
```

### Teste da API

```bash
# Teste via AWS CLI (instalar aws-cli primeiro)
aws bedrock list-foundation-models --region us-east-1
```

## 🔊 Gemini TTS (Text-to-Speech)

### Criando chave no Google AI Studio

1. Acesse [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Faça login com sua Conta Google
3. Clique em **Create API key**
4. Copie a chave gerada para `GEMINI_API_KEY`

### Escolhendo voz

1. Comece com `GEMINI_TTS_VOICE=Kore`
2. Troque `Kore` por outra voz suportada pela Gemini API se desejar
3. O backend solicita uma leitura natural mantendo o idioma do texto

### Configuração

```text
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
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

# AWS Bedrock (IA Conversacional)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua_aws_access_key_id
AWS_SECRET_ACCESS_KEY=sua_aws_secret_access_key
BEDROCK_MODEL_ID=us.anthropic.claude-3-5-haiku-20241022-v1:0

# Gemini TTS (Text-to-Speech)
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
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
- ✅ **Usar** IAM roles em produção
- ✅ **Limitar** permissões ao mínimo necessário

### Custos

- **Deepgram**: ~$0.0035/minuto
- **AWS Bedrock**: ~$0.003/1K tokens
- **Gemini TTS**: conforme limites e preços atuais da Gemini API

> **💰 Total estimado**: $2-5 para workshop completo

---

⬅️ **Anterior**: [Instalação](installation.md)
➡️ **Próximo**: [Solução de Problemas](../guides/troubleshooting.md)
