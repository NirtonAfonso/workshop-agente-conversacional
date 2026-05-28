# Etapa 02 - Setup Gemini

## Criar chave no Google AI Studio

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Faça login com sua Conta Google.
3. Clique em **Create API key**.
4. Crie ou selecione um projeto Google.
5. Copie a chave gerada.

## Configurar `.env`

No arquivo `etapa-02/backend/.env`:

```text
GEMINI_API_KEY=sua_chave_google_ai_studio_aqui
GEMINI_MODEL=gemini-2.5-flash
```

## Testar chave

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=SUA_GEMINI_API_KEY"
```

Se a resposta listar modelos disponíveis, a chave está funcionando.

