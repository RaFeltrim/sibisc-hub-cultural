# SIBiSC - App Web (MVP)

Este é o repositório da aplicação web do SIBiSC, desenvolvida com React e Vite.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js LTS instalado
- npm funcionando

### Instalação
1. Clone o repositório.
2. Na raiz do projeto, instale as dependências:
   ```bash
   npm install

### ⚙️ Configuração de Ambiente

- Para que o app se conecte ao banco de dados, você precisa configurar as variáveis de ambiente:
- Crie um arquivo chamado .env na raiz do projeto.
- Copie o conteúdo do arquivo .env.example para o seu .env.
- Preencha as chaves do Supabase conforme orientado no guia do grupo.

### 🛠️ Comandos Disponíveis

    npm run dev: Inicia o server de dev
    npm run build: Gera a versão de produção na pasta /dist.
    npm run qa:ci *Rode sempre antes de abrir um PR*
### Development Strategy
- Toda task deve ser feita com mock local
