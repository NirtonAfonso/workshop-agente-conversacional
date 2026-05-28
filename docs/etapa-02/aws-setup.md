# Etapa 02 - Setup AWS Bedrock

## Habilitar o modelo

1. Acesse o [AWS Console](https://console.aws.amazon.com).
2. Abra o serviço **Amazon Bedrock** na região usada no projeto, por exemplo `us-east-1`.
3. Em **Model access**, solicite acesso ao modelo Claude escolhido.
4. Aguarde o status ficar disponível antes de iniciar o backend.

## Criar credenciais

1. Acesse **IAM** no console AWS.
2. Crie um usuário ou uma access key para desenvolvimento local.
3. Conceda permissão ao Bedrock, por exemplo `AmazonBedrockFullAccess` em ambiente de estudo.
4. Copie a access key e secret key.

## Configurar `.env`

No arquivo `etapa-02/backend/.env`:

```text
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua_aws_access_key
AWS_SECRET_ACCESS_KEY=sua_aws_secret_key
BEDROCK_MODEL_ID=us.anthropic.claude-3-5-haiku-20241022-v1:0
```

## Testar configuração

Depois de salvar o `.env`, reinicie o backend e acesse:

```text
http://localhost:3001/health
```

Se `bedrock` estiver como `connected`, a etapa 02 está pronta.
