# Como Rodar o Projeto

## Stack de Entrada

Para o onboarding do grupo, a stack recomendada e:

- `Vite`
- `React`
- `JavaScript`
- `React Router`
- `Supabase`
- `CSS Modules`

## Pre-requisitos

- `Node.js` LTS instalado
- `npm` funcionando
- acesso ao repositorio
- acesso ao projeto Supabase do SIBiSC

## Criacao do App Base

```bash
npm create vite@latest sibisc-app -- --template react
cd sibisc-app
npm install
npm install react-router-dom @supabase/supabase-js
npm run dev
```

## Estrutura Minima Esperada

```text
src/
  components/
  lib/
  mocks/
  pages/
  routes/
  services/
  styles/
```

## Arquivo `.env`

Criar `.env` com:

```env
VITE_SUPABASE_URL=https://vuhfazknlyqnphriilkw.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_UklsEfW9sJJP5ScGJItGVw_OhJRQ2Kf
```

## Cliente do Supabase

Criar `src/lib/supabase.js` com a configuracao do cliente publico. Esse cliente deve usar apenas a chave publica do projeto.

## Fluxo de Trabalho Recomendado

1. rodar o app localmente
2. criar ou usar `mock` local para a feature
3. montar tela ou componente
4. revisar responsividade
5. documentar a entrega
6. so depois integrar com o Supabase, se a task pedir isso

## Regra

Sempre que o projeto ganhar codigo executavel novo ou mudar a forma de setup, este documento deve ser um dos primeiros a ser atualizado.
