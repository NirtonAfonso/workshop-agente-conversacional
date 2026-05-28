# 🤖 Etapa 02 - IA Conversacional

![Etapa](https://img.shields.io/badge/Etapa-02-blue)
![Status](https://img.shields.io/badge/Status-Implementado-brightgreen)

## 🎯 Objetivo

Segunda etapa que adiciona **inteligência conversacional** às transcrições usando Gemini.

## ✨ Funcionalidades

- **🎤 Tudo da Etapa 01** (áudio + transcrição)
- **🤖 IA Conversacional** com Gemini via Google AI Studio
- **💬 Interface de chat** inteligente
- **🧠 Contexto conversacional** mantido

## 🏗️ Arquitetura

```{mermaid}
graph TB
    subgraph "🖥️ Frontend (React + TypeScript)"
        A[🎤 AudioRecorder] --> B[📡 WebSocket Client]
        B --> C[💬 Chat Interface]
    end

    subgraph "🌐 Backend (Node.js + TypeScript)"
        D[📡 WebSocket Server] --> E[🎵 Audio Processing]
        E --> F[📝 Deepgram STT]
        E --> G[🤖 Gemini]
    end

    B <--> D
    F --> E
    G --> E
    E --> D

    style A fill:#e1f5fe
    style C fill:#f3e5f5
    style F fill:#fff3e0
    style G fill:#fce4ec
```

## 🚀 Como Executar

### Pré-requisitos
- Tudo da Etapa 01
- Conta no Google AI Studio com acesso ao Gemini

### Configuração Adicional

Adicione ao `.env` do backend:

```text
# Google Gemini Configuration
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-3.1-flash-lite
```

### Setup Google Gemini

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Clique em **Create API key**
3. Crie ou selecione um projeto Google
4. Copie a chave para `GEMINI_API_KEY`
5. Use `GEMINI_MODEL=gemini-3.1-flash-lite`

## 🎓 O que Você Aprende (Novo)

1. **Google Gemini Integration** - Acesso ao Gemini via API
2. **Conversational AI** - Contexto entre mensagens
3. **Service Orchestration** - Pipeline STT → AI
4. **Chat Interface** - UI conversacional moderna
5. **Session Management** - Contexto por usuário

## 🔄 Fluxo Conversacional

1. **Usuário fala** → Transcrição em tempo real
2. **Texto transcrito** → Enviado para Gemini
3. **Gemini processa** → Gera resposta inteligente
4. **Resposta exibida** → Interface de chat
5. **Contexto mantido** → Conversa fluida

## 📚 Documentação Detalhada

```{toctree}
:maxdepth: 1

frontend
backend
gemini-setup
troubleshooting
```

---

⬅️ **Etapa anterior**: [Etapa 01 - Transcrição Básica](../etapa-01/index.md)
➡️ **Próxima etapa**: [Etapa 03 - Workshop Completo](../etapa-03/index.md)
