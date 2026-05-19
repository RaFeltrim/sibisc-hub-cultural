# Auditoria local da pasta `portfolio`

Data: 2026-05-18

Escopo auditado: `Web_Mobile/portfolio`

Esta auditoria foi feita apenas por leitura/inspecao. A pasta `portfolio` nao foi movida, apagada, commitada ou alterada.

## Resumo executivo

`portfolio` nao e uma pasta comum do projeto SIBiSC. Ela e um repositorio Git proprio, apontando para `https://github.com/RaFeltrim/portfolio.git`, atualmente no branch `main`.

No repositorio pai `Web_Mobile`, o caminho `portfolio` aparece no indice como gitlink (`mode 160000`) no commit `8cec6a6c50377977c873643aa4d7c8468b026b80`, e o `HEAD` local da pasta `portfolio` esta no mesmo commit. Porem, o `Web_Mobile` nao possui `.gitmodules` correspondente, entao o estado parece ser de submodulo/nested repo incompleto ou quebrado.

Classificacao principal: **projeto proprio separavel**.

Classificacoes secundarias:

- **Rascunho local / material de staging**: ha muitos arquivos nao rastreados dentro do repositorio `portfolio`, incluindo curriculos, material de LinkedIn e a pasta `GITHUB_FASE_B`.
- **Risco operacional moderado**: o gitlink sem `.gitmodules` deixa o `Web_Mobile` em estado confuso para clones, status e colaboracao.
- **Nao parece artefato gerado**: nao foram encontrados `node_modules`, `dist`, `build`, `.next`, `coverage`, `test-results` ou `playwright-report`.

## Evidencias principais

- `Web_Mobile/portfolio/.git` existe: e um nested Git repo.
- `Web_Mobile` rastreia `portfolio` como gitlink `160000`, nao como diretorio normal.
- `git submodule status -- portfolio` falha por falta de mapeamento em `.gitmodules`.
- O repo `portfolio` tem apenas `index.html` e `styles.css` rastreados no commit atual.
- Dentro do repo `portfolio`, existem 8 entradas nao rastreadas no status local:
  - `CURRICULO_FASE_A.md`
  - `CURRICULO_FASE_A_EN.md`
  - `CURRICULO_FASE_A_EN_PRINT.html`
  - `CURRICULO_FASE_A_PRINT.html`
  - `GITHUB_FASE_B/`
  - `LINKEDIN_FASE_C.md`
  - `contexto-compactado-branding-rafael-feltrim.md`
  - `generate_cv.py`

## Estrutura e tamanho

Tamanho aproximado: **24,27 MB**.

Contagem aproximada:

- **1055 arquivos**
- **345 diretorios**

Estrutura de alto nivel:

- `.git/`
- `index.html`
- `styles.css`
- `generate_cv.py`
- `CURRICULO_FASE_A*.md/html`
- `LINKEDIN_FASE_C.md`
- `contexto-compactado-branding-rafael-feltrim.md`
- `GITHUB_FASE_B/`

## Repositorios aninhados encontrados

Dentro de `portfolio`, foram encontrados estes repositorios Git:

| Caminho | Branch | Origin | Status local |
| --- | --- | --- | --- |
| `portfolio` | `main` | `https://github.com/RaFeltrim/portfolio.git` | 8 entradas locais nao rastreadas |
| `portfolio/GITHUB_FASE_B/_staging/Executive-QA-View` | `main` | `https://github.com/RaFeltrim/Executive-QA-View.git` | limpo |
| `portfolio/GITHUB_FASE_B/_staging/lasy-ai-crm` | `master` | `https://github.com/RaFeltrim/lasy-ai-crm.git` | limpo |
| `portfolio/GITHUB_FASE_B/_staging/qa-ia-portfolio` | `main` | `https://github.com/RaFeltrim/qa-ia-portfolio.git` | limpo |
| `portfolio/GITHUB_FASE_B/_staging/RaFeltrim` | `main` | `https://github.com/RaFeltrim/RaFeltrim.git` | limpo |
| `portfolio/GITHUB_FASE_B/_staging/sigeco-condo-access` | `main` | `https://github.com/RaFeltrim/sigeco-condo-access.git` | limpo |

## Frameworks e conteudo identificado

O topo de `portfolio` e uma pagina estatica pessoal:

- `index.html`
- `styles.css`

Em `GITHUB_FASE_B/_staging`, ha projetos separados com stacks proprias:

- `Executive-QA-View`: Vite, React, TypeScript, Supabase, Vitest, Playwright.
- `lasy-ai-crm`: Next.js 14, React, TypeScript, Supabase, Vitest, Playwright.
- `sigeco-condo-access`: Vite, React, TypeScript, Cypress, Playwright, Robot Framework; backend Express/Prisma em `backend/`.
- `qa-ia-portfolio`: hub de portfolio QA + IA.
- `us-avaliator`: framework multiagente para gerar Gherkin, planos de teste e analise de risco.

## Arquivos sensiveis aparentes

Nao foram abertos conteudos de arquivos sensiveis.

Achados por nome:

- Foram encontrados apenas arquivos `.env.example`, nao `.env` reais:
  - `GITHUB_FASE_B/_staging/lasy-ai-crm/.env.example`
  - `GITHUB_FASE_B/_staging/sigeco-condo-access/.env.example`
  - `GITHUB_FASE_B/_staging/sigeco-condo-access/backend/.env.example`
  - `GITHUB_FASE_B/_staging/Executive-QA-View/.env.example`
- Nao foram encontrados arquivos com extensoes aparentes de chave/certificado/banco local como `.pem`, `.key`, `.p12`, `.pfx`, `.crt`, `.cer`, `.sqlite` ou `.db`.
- Foi encontrado `docs/key-metrics-tracking-plan.md`; pelo nome, parece documentacao de metricas, nao segredo.

## Dependencias, build outputs e artefatos

Encontrado:

- `package.json` em projetos aninhados.
- `package-lock.json` em:
  - `lasy-ai-crm`
  - `sigeco-condo-access`
  - `Executive-QA-View`

Nao encontrado:

- `node_modules`
- `dist`
- `build`
- `.next`
- `coverage`
- `test-results`
- `playwright-report`

## Riscos

1. **Submodulo incompleto no `Web_Mobile`**: o indice tem gitlink para `portfolio`, mas nao ha `.gitmodules`; isso tende a quebrar fluxo de clone/submodule e confundir status.
2. **Mistura de repositorios dentro de repositorios**: `portfolio` contem varios repositorios aninhados em `_staging`, o que aumenta risco de commits acidentais, ignorados incorretos e perda de contexto.
3. **Material de portfolio/curriculo dentro do repo academico**: o conteudo parece pessoal/profissional e separavel do SIBiSC/Web_Mobile.
4. **Entradas nao rastreadas dentro de `portfolio`**: o repo `portfolio` local tem conteudo novo nao commitado, entao qualquer acao de limpeza deve preservar ou versionar isso primeiro no destino correto.

## Recomendacao

`portfolio` deve ser tratado como **repo separado**, nao como parte legitima do SIBiSC.

Proximos passos seguros:

1. Decidir se o `Web_Mobile` deve realmente referenciar `portfolio` como submodulo.
2. Se sim, restaurar/criar `.gitmodules` corretamente apontando para `https://github.com/RaFeltrim/portfolio.git`.
3. Se nao, remover o gitlink do indice do `Web_Mobile` em uma etapa futura planejada, sem apagar a pasta local antes de backup/confirmacao.
4. Antes de mover ou limpar, revisar os 8 itens nao rastreados do repo `portfolio` e decidir se pertencem ao repo `portfolio`, a outro repo, ou a uma area local fora de `Web_Mobile`.
5. Manter `node_modules` e outputs de build fora do versionamento; a auditoria nao encontrou esses artefatos no momento.

