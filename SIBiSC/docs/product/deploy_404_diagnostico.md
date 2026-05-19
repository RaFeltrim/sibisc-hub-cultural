# Diagnostico de Deploy 404 - SIBiSC

Data: 2026-05-19  
Branch de trabalho: `fix/sibisc-deploy-404`  
App: `Web_Mobile/SIBiSC`

## 1. Resumo executivo

O erro publico em `https://sibisc-hub-cultural.vercel.app` nao parece ser causado por falha de build do React/Vite nem por ausencia de rewrite SPA dentro de `SIBiSC/vercel.json`.

A evidencia mais forte aponta para problema de configuracao remota no Vercel: o deployment de producao do commit `95e1b7e8b0ae65af07aae595cae8b4f2846f49dd` foi registrado como sucesso pelo GitHub/Vercel, mas o dominio publico `sibisc-hub-cultural.vercel.app` responde `404 NOT_FOUND`. A URL gerada do deployment existe, porem responde `401 Authentication Required`, indicando protecao de deployment ativa.

Para reduzir risco de root/output incorreto em monorepo, foram adicionadas configuracoes raiz explicitas para Vercel e Netlify. A restauracao definitiva do dominio publico ainda deve ser feita/confirmada no dashboard da Vercel, porque alias, dominio e deployment protection sao configuracoes remotas.

## 2. Evidencias coletadas

- `git status --short --branch` inicial: branch `release/sibisc-hardening-sprint3`, sem alteracoes locais.
- `origin/main`: `95e1b7e8b0ae65af07aae595cae8b4f2846f49dd`, merge do PR #58.
- PR #58: QA Gate `P0 Repository Guard` e `P1 Frontend Build` verdes; status `Vercel` verde; Netlify preview reportado como verde.
- Deployment GitHub/Vercel de producao:
  - deployment id: `4743036513`
  - environment: `Production`
  - sha: `95e1b7e8b0ae65af07aae595cae8b4f2846f49dd`
  - target/environment URL: `https://sibisc-hub-cultural-dpzqg4qvf-rafeltrims-projects.vercel.app`
  - status: `success`
- Teste HTTP do dominio publico:
  - `https://sibisc-hub-cultural.vercel.app`: `404 Not Found`
  - header: `X-Vercel-Error: NOT_FOUND`
- Teste HTTP da URL gerada do deployment de producao:
  - `https://sibisc-hub-cultural-dpzqg4qvf-rafeltrims-projects.vercel.app`: `401 Unauthorized`
  - pagina: `Authentication Required`
  - indica Vercel Deployment Protection ativa.
- Vercel CLI nao foi encontrada localmente com `where.exe vercel`.
- `gh` esta disponivel e foi usado apenas para leitura.
- `SIBiSC/vercel.json` em `origin/main` ja contem:
  - `framework: "vite"`
  - `buildCommand: "npm run build"`
  - `outputDirectory: "dist"`
  - rewrite `/(.*)` para `/index.html`
- `SIBiSC/vite.config.js` usa configuracao padrao de Vite React, sem `base` customizado.
- `SIBiSC/package.json` expoe `build`, `qa:repo` e `qa:ci`.

## 3. Diagnostico

### Causa mais provavel

O projeto Vercel possui um deployment de producao bem-sucedido para `origin/main`, mas o dominio publico `sibisc-hub-cultural.vercel.app` nao esta atribuido a esse deployment, esta apontando para um estado antigo/inexistente, ou esta afetado por configuracao remota de dominio/protecao.

O sinal decisivo e a diferenca entre as respostas:

- URL de deployment gerada pela Vercel: existe, mas exige autenticacao (`401`).
- Dominio publico esperado: nao encontra deployment associado (`404 NOT_FOUND`).

Isso separa o problema de um erro classico de SPA rewrite. Se fosse apenas rewrite ausente, a raiz `/` tenderia a carregar e rotas internas falhariam; aqui a propria raiz do dominio publico retorna 404.

### Riscos de configuracao identificados

- O repo e um monorepo leve com o app em `SIBiSC`, mas tambem contem `sibisc-app`, outro app Vite. Isso aumenta o risco de Vercel/Netlify serem configurados com root ou publish directory errado no dashboard.
- O arquivo `SIBiSC/vercel.json` so e considerado se o Root Directory do projeto Vercel for `SIBiSC`. Se o Root Directory remoto for a raiz do repo, esse arquivo pode ser ignorado.
- O link publico de preview Netlify `https://deploy-preview-58--venerable-cannoli-da6c81.netlify.app` tambem respondeu `404`, apesar do check do GitHub aparecer como sucesso. Isso sugere configuracao de Netlify externa ao codigo, provavelmente base/publish incorretos ou site/slug acessivel apenas parcialmente.

## 4. Correcoes aplicadas no repo

### Vercel raiz

Foi adicionado `vercel.json` na raiz de `Web_Mobile` para tornar o deploy resiliente quando o projeto Vercel estiver configurado com Root Directory na raiz do repositorio:

- instala dependencias com `npm ci --prefix SIBiSC`
- builda com `npm run build --prefix SIBiSC`
- publica `SIBiSC/dist`
- preserva rewrite SPA para `/index.html`

O `SIBiSC/vercel.json` foi mantido, pois continua correto para o cenario em que o Root Directory remoto e `SIBiSC`.

### Netlify raiz

Foi adicionado `netlify.toml` na raiz de `Web_Mobile`:

- `base = "SIBiSC"`
- `publish = "dist"`
- `command = "npm ci && npm run build"`
- redirect SPA `/* -> /index.html`

Netlify nao e o bloqueador principal do release, mas essa configuracao reduz a chance de previews verdes com artefato vazio/incorreto.

## 5. Proximos passos no Vercel

1. Abrir `https://vercel.com/rafeltrims-projects/sibisc-hub-cultural`.
2. Em **Settings > Git**, confirmar:
   - Repository: `RaFeltrim/sibisc-hub-cultural`
   - Production Branch: `main`
   - Root Directory: preferencialmente `SIBiSC`; se ficar na raiz do repo, usar o novo `vercel.json` raiz.
3. Em **Settings > Domains**, confirmar se `sibisc-hub-cultural.vercel.app` esta listado e atribuido ao projeto correto.
4. Em **Deployments**, abrir o deployment de producao do commit `95e1b7e8b0ae65af07aae595cae8b4f2846f49dd`.
5. Se o deployment estiver correto, usar **Promote to Production** ou **Redeploy** para reassociar o alias de producao.
6. Em **Deployment Protection**, decidir se producao deve ser publica:
   - para apresentacao publica, desativar protecao no ambiente Production;
   - se a protecao for exigida, fornecer bypass token apenas para validacao automatizada, sem commitar secrets.
7. Revalidar:
   - `https://sibisc-hub-cultural.vercel.app`
   - `https://sibisc-hub-cultural.vercel.app/perfil`

## 6. Status do Netlify

O link do dashboard Netlify relatado pelo usuario pode falhar por acesso, slug/projeto externo ou permissao. O preview publico associado ao PR #58 tambem retornou `404`, entao a recomendacao e tratar Netlify como nao-bloqueante para o release principal e usar Vercel como fonte primaria.

Se Netlify voltar a ser exigido, confirmar no dashboard:

- Base directory: `SIBiSC`
- Build command: `npm ci && npm run build`
- Publish directory: `SIBiSC/dist` se a base for raiz, ou `dist` se a base for `SIBiSC`
- Redirect SPA ativo via `netlify.toml`

## 7. Validacao local

Validacoes executadas apos esta alteracao:

- `npm run qa:repo`: aprovado.
- `npm run qa:ci`: aprovado, incluindo `vite build` com 84 modulos transformados.
- `npm run build`: aprovado.
- `npm run build --prefix SIBiSC`, a partir da raiz `Web_Mobile`: aprovado; valida o `buildCommand` do `vercel.json` raiz.
- Inspecao de `SIBiSC/dist/index.html`: arquivo gerado com assets em `/assets/...`.

Essas validacoes confirmam que a configuracao local/build esta integra, mas nao conseguem reassociar o dominio publico da Vercel sem acao no dashboard ou CLI autenticada.
