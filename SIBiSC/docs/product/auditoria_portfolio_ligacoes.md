# Auditoria: ligacoes tecnicas do `RaFeltrim/portfolio`

Data da auditoria: 2026-05-18

## Conclusao executiva

O repositorio `RaFeltrim/portfolio` deve ser tratado como **projeto independente** do SIBiSC e do repo pai `Web_Mobile`.

Ele tem ligacao com o SIBiSC apenas como **referencia narrativa de portfolio**: a pagina lista o projeto `SIBiSC - Hub Cultural` e aponta para o repositorio `RaFeltrim/Web_e_Mobile`. Nao foi encontrada dependencia tecnica em sentido inverso, importacao de codigo do SIBiSC, build compartilhado, uso de arquivos fora da pasta `portfolio`, nem pipeline local que acople os projetos.

**Pode ser alterado com seguranca**, desde que sejam respeitadas as pre-condicoes abaixo: sincronizar o repo proprio antes de editar, nao commitar os arquivos locais nao rastreados por acidente, nao misturar o gitlink do repo pai em commits do SIBiSC/Web_Mobile e lembrar que o GitHub Pages publico publica a partir de `main`.

## Escopo verificado

- Pasta local: `Web_Mobile/portfolio`
- Remoto declarado: `https://github.com/RaFeltrim/portfolio.git`
- Remoto GitHub consultado: `https://github.com/RaFeltrim/portfolio`
- Relacao com repo pai: entrada `160000` em `Web_Mobile`, sem `.gitmodules`
- Arquivos principais locais verificados: `index.html`, `styles.css`
- README remoto verificado em `main`
- Estado Git local e metadados GitHub Pages verificados em modo leitura

## Estado Git local

Dentro de `Web_Mobile/portfolio`:

- E um repositorio Git proprio, com `.git`.
- Branch local atual: `main`.
- Remote `origin`: `https://github.com/RaFeltrim/portfolio.git`.
- Arquivos rastreados localmente: `index.html` e `styles.css`.
- HEAD local: `8cec6a6`.
- `origin/main` local tambem aponta para `8cec6a6`, mas essa referencia esta desatualizada.
- `git ls-remote origin refs/heads/main` mostrou que o remoto atual aponta para `e93d4e8`.

Interpretacao: a auditoria anterior de `ahead 0/behind 0` valia contra a referencia local `origin/main`, mas o remoto real avancou depois. Antes de alterar, o repo local deve ser sincronizado para evitar editar em cima de uma revisao antiga.

Dentro do repo pai `Web_Mobile`:

- A entrada `portfolio` aparece como gitlink `160000` apontando para `8cec6a6`.
- Nao ha `.gitmodules` configurando submodule formal.
- O status do repo pai mostra `? portfolio`, coerente com conteudo nao rastreado dentro do repo aninhado.

Interpretacao: o repo pai guarda um ponteiro para um commit do `portfolio`, mas nao ha configuracao completa de submodule. Alterar o `portfolio` nao altera o SIBiSC por si so; porem atualizar/puxar commits no repo aninhado pode fazer o repo pai enxergar uma mudanca de gitlink se esse ponteiro for versionado.

## Estado remoto

No GitHub, `RaFeltrim/portfolio` esta como:

- Repositorio publico.
- Default branch: `main`.
- Nao e fork.
- Descricao: portfolio profissional de Rafael Feltrim com projetos e cases.
- Homepage: `https://rafeltrim.github.io/portfolio/`.
- GitHub Pages ativo, status `built`, fonte `main` em `/`, HTTPS enforced.
- Branch encontrada: `main`.

Commits recentes observados no remoto:

- `e93d4e8` - `feat: highlight public QA AI boilerplates`
- `cec0db5` - `docs: add portfolio README`
- `ea0388f` - `fix(portfolio): update SIBiSC link to sibisc-hub-cultural`
- `8f74a36` - `fix(portfolio): replace private us-avaliator link with internal badge`
- `8cec6a6` - `feat(i18n): complete EN translation coverage for all visible sections`

O README remoto descreve o projeto como portfolio publico em HTML/CSS/JavaScript, com deploy estatico por GitHub Pages e execucao local abrindo `index.html` no navegador.

## Ligacoes encontradas

### Ligacoes tecnicas

Nao foi encontrada ligacao tecnica direta com `SIBiSC` ou `Web_Mobile`.

Evidencias:

- `index.html` importa apenas:
  - Google Fonts;
  - Bootstrap Icons via CDN;
  - `styles.css` local.
- Nao ha `package.json`, lockfile ou configuracao de build na raiz do portfolio local.
- Nao ha importacao de assets, scripts ou CSS usando `../` para sair da pasta `portfolio`.
- O JavaScript esta inline em `index.html`, sem imports de modulos externos locais.
- O deploy remoto e GitHub Pages estatico a partir da propria branch `main`.

### Ligacoes narrativas e de portfolio

Foram encontradas ligacoes narrativas para outros projetos:

- `RaFeltrim/Executive-QA-View`
- `RaFeltrim/secure-ai-studio`
- `RaFeltrim/lasy-ai-crm`
- `RaFeltrim/sigeco-condo-access`
- `RaFeltrim/Web_e_Mobile`, exibido na pagina como `SIBiSC - Hub Cultural`
- `RaFeltrim/us-avaliator` na versao local
- `RaFeltrim/QA-Guide`
- Na versao remota atual, tambem aparece `qa-ia-portfolio` e ajustes de boilerplates publicos.

Essas ligacoes sao links, cards e narrativas de portfolio. Elas nao indicam compartilhamento de codigo, importacao de pacote, pipeline comum ou dependencia runtime entre o portfolio e os projetos citados.

## Arquivos locais nao rastreados

O repo local `portfolio` tem muitos arquivos nao rastreados:

- Curriculos e HTMLs de impressao: `CURRICULO_FASE_A*.md/html`.
- Documento de contexto: `contexto-compactado-branding-rafael-feltrim.md`.
- Script auxiliar: `generate_cv.py`.
- Pasta `GITHUB_FASE_B/`.
- Documento `LINKEDIN_FASE_C.md`.

Dentro de `GITHUB_FASE_B/_staging/` ha repositorios/projetos aninhados com seus proprios remotes:

- `lasy-ai-crm` -> `https://github.com/RaFeltrim/lasy-ai-crm.git`
- `qa-ia-portfolio` -> `https://github.com/RaFeltrim/qa-ia-portfolio.git`
- `sigeco-condo-access` -> `https://github.com/RaFeltrim/sigeco-condo-access.git`
- `Executive-QA-View` -> `https://github.com/RaFeltrim/Executive-QA-View.git`

Esses itens parecem material de staging/branding e nao fazem parte do portfolio rastreado localmente. O risco principal e operacional: um `git add .` dentro de `portfolio` poderia incluir grande volume de material auxiliar e repos aninhados por engano.

## Arquivos sensiveis

Nao foram encontrados arquivos com nomes como credenciais reais, `credentials`, `secret` ou `token`.

Foram encontrados apenas:

- Arquivos `.env.example` dentro de projetos em `GITHUB_FASE_B/_staging/`.
- Menções a variaveis de ambiente e tokens em documentacao/exemplos.

Recomendacao: antes de qualquer commit, repetir uma varredura de nomes sensiveis e revisar especialmente `GITHUB_FASE_B/_staging/` e `contexto-compactado-branding-rafael-feltrim.md`, sem publicar material auxiliar que nao precise estar no portfolio.

## Impacto de alteracoes

Alterar `Web_Mobile/portfolio/index.html`, `styles.css` ou `README.md` do repo `RaFeltrim/portfolio`:

- Afeta o portfolio publico no GitHub Pages apos push para `main`.
- Nao altera o funcionamento do SIBiSC.
- Nao altera o build do `Web_Mobile`, pois nao ha importacao tecnica do portfolio pelo SIBiSC.
- Pode alterar o estado visto pelo repo pai se o commit apontado pelo gitlink mudar e esse ponteiro for incluido em commit no `Web_Mobile`.

Alterar arquivos do SIBiSC:

- Nao afeta o portfolio, exceto se a narrativa/link do portfolio ficar desatualizada.

## Pre-condicoes para alterar com seguranca

1. Entrar explicitamente em `Web_Mobile/portfolio` antes de editar e confirmar `git rev-parse --show-toplevel`.
2. Sincronizar o repo proprio com o remoto, pois o remoto `main` esta em `e93d4e8` e o local esta em `8cec6a6`.
3. Revisar `git status --short --untracked-files=all` antes de qualquer add/commit.
4. Evitar `git add .`; preferir adicionar apenas arquivos esperados, como `index.html`, `styles.css` e, se aplicavel, `README.md`.
5. Nao incluir `GITHUB_FASE_B/_staging/` em commits do portfolio sem decisao explicita.
6. Nao commitar o gitlink `portfolio` no repo pai `Web_Mobile` junto de alteracoes do SIBiSC, a menos que a intencao seja atualizar o ponteiro do repo aninhado.
7. Considerar que qualquer push em `main` publica no GitHub Pages em `https://rafeltrim.github.io/portfolio/`.

## Veredito

**Independente:** sim, tecnicamente independente.

**Pode alterar:** sim, com seguranca operacional.

**Condicao principal:** tratar `Web_Mobile/portfolio` como repositorio proprio, sincronizar com `RaFeltrim/portfolio` antes de editar e manter separadas as alteracoes do repo pai `Web_Mobile`/SIBiSC.
