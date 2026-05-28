# 🎤 Workshop Agente Conversacional

Um workshop completo demonstrando como criar um agente conversacional inteligente que captura áudio em tempo real, transcreve com Deepgram, gera respostas inteligentes com Gemini e converte texto em voz com Gemini TTS.

![Status](https://img.shields.io/badge/status-pronto-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Deepgram](https://img.shields.io/badge/Deepgram-API-purple)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-API-blue)
![Gemini TTS](https://img.shields.io/badge/Gemini TTS-TTS-red)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Usar](#como-usar)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licença)

## 🚀 Sobre o Projeto

Este workshop apresenta uma implementação completa de um agente conversacional inteligente que:

- **🎤 Captura áudio** em tempo real do microfone do usuário
- **📝 Transcreve automaticamente** usando a API do Deepgram (Speech-to-Text)
- **🤖 Gera respostas inteligentes** usando Gemini via Google AI Studio
- **🔊 Converte respostas em áudio** usando Gemini TTS (Text-to-Speech)
- **💬 Mantém conversação natural** com contexto e memória
- **⚡ Funciona em tempo real** com WebSocket para comunicação instantânea

### ✨ O que você aprenderá

- Captura e processamento de áudio no navegador com Web Audio API
- Comunicação em tempo real com WebSocket (Socket.io)
- Integração com APIs de IA modernas (Deepgram, Google Gemini, Gemini TTS)
- Desenvolvimento fullstack com React + TypeScript e Node.js + TypeScript
- Criação de interfaces modernas e responsivas com Radix UI e Tailwind CSS
- Arquitetura de aplicações conversacionais

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.3.1 + TypeScript** - Framework moderno para interfaces
- **Vite** - Build tool extremamente rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e customizáveis
- **Socket.io Client** - Comunicação WebSocket em tempo real
- **Lucide React** - Biblioteca de ícones moderna

### Backend
- **Node.js + TypeScript** - Runtime JavaScript com tipagem estática
- **Express.js** - Framework web minimalista e flexível
- **Socket.io** - WebSocket para comunicação bidirecional
- **Deepgram SDK** - Speech-to-Text em tempo real
- **Google Gemini** - Acesso ao Gemini 3.1 Flash Lite para IA conversacional
- **Gemini TTS** - Text-to-Speech via Google AI Studio

### Segurança & DevEx
- **Helmet** - Headers de segurança
- **Rate Limiting** - Proteção contra abuso
- **CORS** - Controle de acesso entre origens
- **ESLint + TypeScript** - Qualidade e consistência do código

## ✅ Pré-requisitos

Antes de começar, você precisará de:

### Ferramentas de Desenvolvimento
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Navegador moderno** com suporte a Web Audio API

### Contas e Chaves de API
- **Conta no Deepgram** ([criar conta gratuita](https://deepgram.com))
- **Conta no Google AI Studio** com chave da Gemini API ([criar chave](https://aistudio.google.com/app/apikey))

> **💡 Dica**: Todas as plataformas oferecem créditos gratuitos para teste!

## 📦 Instalação e Configuração

### 1. Clone e Configure o Projeto

```bash
# Clone o repositório
git clone https://github.com/NirtonAfonso/workshop-agente-conversacional.git
cd workshop-agente-conversacional

# Este projeto tem 3 etapas - use a etapa-03 (versão completa)
cd etapa-03

# Instale dependências do backend
cd backend
npm install

# Instale dependências do frontend
cd ../frontend
npm install
```

### 2. Configuração das APIs

Crie um arquivo `.env` na pasta `etapa-03/backend/`:

```env
# Deepgram (Speech-to-Text)
DEEPGRAM_API_KEY=sua_chave_deepgram_aqui

# Google Gemini (IA Conversacional)
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-3.1-flash-lite

# Gemini TTS (Text-to-Speech via Google AI Studio)
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview
GEMINI_TTS_VOICE=Kore

# Configurações do Servidor
PORT=3001
CORS_ORIGIN=http://localhost:8080
NODE_ENV=development
```

### 3. Obtenha suas Chaves de API

#### Deepgram
1. Acesse [Deepgram Console](https://console.deepgram.com)
2. Crie uma conta ou faça login
3. Navegue até **API Keys** e crie uma nova chave

#### Google Gemini
1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crie uma chave de API para usar a Gemini API
3. Copie a chave e use em GEMINI_API_KEY no arquivo .env

#### Gemini TTS
1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Use a mesma chave configurada em `GEMINI_API_KEY`
3. Configure `GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview`
4. Configure `GEMINI_TTS_VOICE=Kore` ou outra voz suportada pelo Gemini TTS

## 🚀 Como Usar

### 1. Execute o Backend
```bash
cd etapa-03/backend
npm run dev
```

### 2. Execute o Frontend (novo terminal)
```bash
cd etapa-03/frontend
npm run dev
```

### 3. Acesse a Aplicação
Abra seu navegador e acesse: `http://localhost:8080`

### 4. Experimente a Conversa Inteligente

1. **🎤 Inicie a gravação**: Clique no botão "Iniciar Gravação"
2. **🔓 Permita acesso**: Autorize o uso do microfone
3. **💬 Converse naturalmente**: Fale em português - sua voz será transcrita em tempo real
4. **🤖 Receba respostas**: O Gemini gerará respostas inteligentes automaticamente
5. **🔊 Ouça as respostas**: As respostas são convertidas em áudio e reproduzidas
6. **🔄 Continue a conversa**: Mantenha um diálogo natural e fluido
7. **⏹️ Pare quando quiser**: Clique em "Parar Gravação" para finalizar

### 5. Recursos Adicionais

- **📋 Histórico**: Veja todo o histórico da conversa na tela
- **🔄 Limpar**: Use o botão de limpeza para começar uma nova conversa
- **⚡ Tempo real**: Tudo funciona em tempo real sem delays perceptíveis

## 📁 Estrutura do Projeto

```
workshop-agente-conversacional/
├── etapa-01/                # Etapa 1: Transcrição básica
├── etapa-02/                # Etapa 2: + IA conversacional
├── etapa-03/                # Etapa 3: Workshop completo ⭐
│   ├── frontend/            # React + TypeScript
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── AudioRecorder.tsx
│   │   │   │   ├── TranscriptionDisplay.tsx
│   │   │   │   └── ui/      # Radix UI components
│   │   │   ├── hooks/
│   │   │   │   ├── useWebSocket.ts
│   │   │   │   ├── useAudioPlayer.ts
│   │   │   │   └── use-*.ts
│   │   │   ├── lib/utils.ts
│   │   │   └── App.tsx
│   │   └── package.json
│   └── backend/             # Node.js + TypeScript
│       ├── src/
│       │   ├── controllers/ # Health checks
│       │   ├── middleware/  # Security & validation
│       │   ├── services/
│       │   │   ├── DeepgramService.ts    # STT
│       │   │   ├── GeminiService.ts     # IA
│       │   │   ├── GeminiTTSService.ts  # TTS
│       │   │   └── SocketService.ts      # WebSocket
│       │   ├── types/       # TypeScript definitions
│       │   ├── utils/       # Config & logging
│       │   └── server.ts
│       └── package.json
├── README.md
```

## ✨ Funcionalidades Implementadas

### 🎤 Captura e Processamento de Áudio
- ✅ Gravação de áudio em tempo real com Web Audio API (AudioContext)
- ✅ Processamento de chunks de áudio otimizado para streaming
- ✅ Feedback visual durante gravação (animação de pulso)
- ✅ Tratamento de permissões de microfone

### 🌐 Comunicação em Tempo Real
- ✅ WebSocket bidirecional com Socket.io
- ✅ Streaming de áudio em tempo real para o backend
- ✅ Reconexão automática em caso de perda de conexão
- ✅ Monitoramento de status de conexão

### 🧠 Inteligência Artificial
- ✅ **Speech-to-Text**: Transcrição em tempo real com Deepgram (português brasileiro)
- ✅ **IA Conversacional**: Respostas inteligentes com Gemini via Google AI Studio
- ✅ **Text-to-Speech**: Síntese de voz natural com Gemini TTS
- ✅ Manutenção de contexto conversacional

### 💎 Interface e Experiência
- ✅ Design moderno e responsivo com Tailwind CSS
- ✅ Componentes acessíveis com Radix UI
- ✅ Animações suaves e feedback visual
- ✅ Exibição de transcrições com resultados intermediários e finais
- ✅ Player de áudio integrado para respostas TTS
- ✅ Histórico completo da conversa

### 🔒 Segurança e Performance
- ✅ Headers de segurança com Helmet
- ✅ Rate limiting para proteção contra abuso
- ✅ CORS configurado adequadamente
- ✅ Tratamento robusto de erros
- ✅ TypeScript para type safety

## 🎯 Estrutura de Aprendizado

Este workshop está organizado em 3 etapas progressivas:

### 📁 Etapa 01 - Transcrição Básica
- Captura de áudio + Deepgram
- Transcrição em tempo real
- Interface básica

### 📁 Etapa 02 - IA Conversacional
- Adição do Gemini
- Respostas inteligentes
- Contexto conversacional

### 📁 Etapa 03 - Workshop Completo 🎖️
- **Text-to-Speech com Gemini TTS**
- **Conversa completa por voz**
- **Interface polida e profissional**
- **Todas as funcionalidades integradas**

> **💡 Recomendação**: Use a `etapa-03` para experiência completa ou explore as etapas anteriores para entender a evolução do projeto.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🌐 Site da Documentação

O site em `docs/` é publicado pelo workflow `.github/workflows/docs.yml`.
No GitHub, vá em **Settings > Pages** e selecione **GitHub Actions** como fonte.
Em seguida, faça push na branch `main` ou `master`; o workflow compila o Sphinx e publica o site no GitHub Pages.

---

<div align="center">

### 🎉 Workshop Pronto para Uso!

**Este é um projeto completo e funcional demonstrando as mais modernas tecnologias de IA conversacional.**

Desenvolvido por **Vini Ganancio** para a comunidade de desenvolvedores

📧 [contato@viniganancio.dev](mailto:contato@viniganancio.dev)

[⬆ Voltar ao topo](#-workshop-agente-conversacional)

</div>
