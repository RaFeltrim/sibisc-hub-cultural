# Auditoria de ambiente do `portfolio`

Data: 2026-05-18

Escopo: `Web_Mobile` e `Web_Mobile/portfolio`.

Esta analise foi feita antes de qualquer correcao estrutural. Nao foram executados comandos de alteracao como `git rm`, `checkout`, `reset`, `commit`, `push`, `prune` ou `config`. A unica alteracao feita nesta etapa foi a criacao deste relatorio Markdown.

## Diagnostico executivo

`Web_Mobile/portfolio` e um repositorio Git proprio e valido, com remote `origin` apontando para `https://github.com/RaFeltrim/portfolio.git`.

No repositorio pai `Web_Mobile`, o caminho `portfolio` esta rastreado no indice como gitlink (`mode 160000`) no commit `8cec6a6c50377977c873643aa4d7c8468b026b80`, mas nao existe `.gitmodules`. Isso caracteriza uma referencia de submodulo incompleta ou informal: o pai sabe que `portfolio` e um objeto Git separado, mas nao tem metadados suficientes para clonar/inicializar como submodulo padrao.

O repositorio remoto `RaFeltrim/portfolio` existe no GitHub, e a branch principal remota e `main`.

Recomendacao principal: tratar `portfolio` como repo separado. Antes de qualquer mudanca no indice do pai, fazer backup ou confirmar que todo conteudo nao rastreado do `portfolio` foi preservado no destino correto.

## Evidencias no repo pai `Web_Mobile`

- Top-level Git detectado: `C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile`.
- Branch atual: `dev`.
- Upstream: `origin/dev`.
- Estado contra upstream: `ahead 1`, `behind 0`.
- Commit local atual: `1b74769 feat(sibisc): consolidate feltrim agents sprint 0`.
- Commit remoto de referencia em `origin/dev`: `3418c99 fix: corrige nav bar mobile com 5 colunas no grid`.
- `portfolio` esta no indice como gitlink:
  - modo: `160000`;
  - objeto: `8cec6a6c50377977c873643aa4d7c8468b026b80`;
  - path: `portfolio`.
- `.gitmodules`: nao encontrado em `Web_Mobile`.
- `.gitignore`: existe, mas nao possui entrada para `portfolio/`.

Status local observado antes da criacao deste relatorio:

- `portfolio` aparecia como modificado no pai por conter conteudo nao rastreado dentro do repo aninhado.
- `SIBiSC/.playwright-cli/` continha arquivos YAML nao rastreados.
- `SIBiSC/docs/product/auditoria_portfolio_local.md` estava nao rastreado.
- Nao havia outras alteracoes rastreadas no pai alem do estado do gitlink `portfolio`.

Apos este relatorio, tambem passa a existir a entrada nao rastreada `SIBiSC/docs/product/auditoria_portfolio_ambiente.md`, que e esperada por esta tarefa.

## Evidencias em `Web_Mobile/portfolio`

- E um repositorio Git valido.
- Top-level Git detectado: `C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile/portfolio`.
- Branch atual: `main`.
- Upstream: `origin/main`.
- Estado contra upstream: `ahead 0`, `behind 0`.
- Remote:
  - fetch: `https://github.com/RaFeltrim/portfolio.git`;
  - push: `https://github.com/RaFeltrim/portfolio.git`.
- Commit atual: `8cec6a6 feat(i18n): complete EN translation coverage for all visible sections`.
- Arquivos rastreados no commit atual:
  - `index.html`;
  - `styles.css`.

Itens nao rastreados observados:

- `CURRICULO_FASE_A.md`;
- `CURRICULO_FASE_A_EN.md`;
- `CURRICULO_FASE_A_EN_PRINT.html`;
- `CURRICULO_FASE_A_PRINT.html`;
- `LINKEDIN_FASE_C.md`;
- `contexto-compactado-branding-rafael-feltrim.md`;
- `generate_cv.py`;
- conteudo em `GITHUB_FASE_B/`, incluindo documentacao, workflow e diretorios de staging.

Nao foram abertos conteudos de arquivos potencialmente sensiveis. Pela checagem de nomes, foram vistos apenas arquivos `.env.example` em projetos de staging; nao apareceram `.env` reais, chaves privadas, certificados, bancos locais ou nomes contendo `password`, `credential`, `secret`, `token` ou `id_rsa`. O arquivo `docs/key-metrics-tracking-plan.md` contem `key` no nome, mas pelo nome parece documentacao de metricas, nao segredo.

## Repositorios aninhados relevantes

Dentro de `portfolio/GITHUB_FASE_B/_staging`, foram confirmados repositorios Git proprios:

- `Executive-QA-View`
  - branch: `main`;
  - upstream: `origin/main`;
  - estado: `ahead 0`, `behind 0`;
  - remote: `https://github.com/RaFeltrim/Executive-QA-View.git`.
- `RaFeltrim`
  - branch: `main`;
  - upstream: `origin/main`;
  - estado: `ahead 0`, `behind 0`;
  - remote: `https://github.com/RaFeltrim/RaFeltrim.git`.
- `lasy-ai-crm`
  - branch: `master`;
  - upstream: `origin/master`;
  - estado: `ahead 0`, `behind 0`;
  - remote: `https://github.com/RaFeltrim/lasy-ai-crm.git`.
- `qa-ia-portfolio`
  - branch: `main`;
  - upstream: `origin/main`;
  - estado: `ahead 0`, `behind 0`;
  - remote: `https://github.com/RaFeltrim/qa-ia-portfolio.git`.
- `sigeco-condo-access`
  - branch: `main`;
  - upstream: `origin/main`;
  - estado: `ahead 0`, `behind 0`;
  - remote: `https://github.com/RaFeltrim/sigeco-condo-access.git`.

`GITHUB_FASE_B/_staging/us-avaliator` nao se comportou como repositorio Git proprio na checagem: o Git resolveu o top-level para o repo `portfolio`.

## Confirmacao GitHub

Consulta somente-leitura ao GitHub confirmou:

- repositorio: `RaFeltrim/portfolio`;
- URL: `https://github.com/RaFeltrim/portfolio`;
- visibilidade reportada: publico;
- branch principal: `main`;
- ultimo push reportado: `2026-05-12T14:00:07Z`.

## Riscos

- Gitlink sem `.gitmodules`: clones futuros do `Web_Mobile` nao terao instrucao padrao de submodulo para `portfolio`.
- Status confuso no pai: conteudo nao rastreado dentro de `portfolio` aparece como modificacao do gitlink no `Web_Mobile`.
- Risco de perda de trabalho local: `portfolio` tem muitos itens nao rastreados, incluindo material de curriculo, LinkedIn e `GITHUB_FASE_B/`.
- Repositorios dentro de repositorio: os projetos em `_staging` possuem seus proprios remotes; qualquer limpeza ou movimentacao sem inventario pode separar pastas do historico Git correto.
- `.gitignore` do pai nao ignora `portfolio/`, entao o estado do gitlink continuara aparecendo ate haver decisao estrutural.

## Opcoes seguras

### 1. Manter `portfolio` como repo separado e remover o gitlink do indice do pai

Intencao: `portfolio` deixa de ser parte do `Web_Mobile` e passa a viver apenas como repo proprio.

Proximos comandos sugeridos, nao executados:

```powershell
git -C "C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile" status --short --branch
git -C "C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile/portfolio" status --short --branch
git -C "C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile" rm --cached portfolio
```

Antes disso, preservar os nao rastreados do `portfolio`, porque `git rm --cached portfolio` so remove o gitlink do indice do pai, mas a operacao deve ser acompanhada de backup e revisao para evitar confusao operacional.

### 2. Formalizar submodulo

Intencao: `Web_Mobile` continua referenciando `portfolio`, agora como submodulo Git correto.

Proximos comandos sugeridos, nao executados:

```powershell
git -C "C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile" submodule status
git -C "C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile" submodule add https://github.com/RaFeltrim/portfolio.git portfolio
```

Essa opcao so e recomendada se `portfolio` realmente precisar fazer parte do checkout do `Web_Mobile`. Para o contexto SIBiSC, parece menos adequada que separar.

### 3. Apenas ignorar localmente

Intencao: reduzir ruido local sem mexer no indice remoto do pai.

Proximos comandos sugeridos, nao executados:

```powershell
Add-Content "C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile/.git/info/exclude" "portfolio/"
```

Essa opcao nao resolve o gitlink ja rastreado no indice. Serve apenas como paliativo local e nao corrige a estrutura do repositorio para outros clones.

### 4. Backup antes de qualquer mudanca

Intencao: preservar todo conteudo local nao rastreado antes de mexer em indice, submodulo ou organizacao de pastas.

Proximos comandos sugeridos, nao executados:

```powershell
git -C "C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile/portfolio" status --short --branch
git -C "C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile/portfolio" status --short --ignored --untracked-files=all
```

Alternativas seguras apos revisar o conteudo:

- commitar o que pertence ao repo `portfolio`;
- mover material pessoal para uma pasta fora de `Web_Mobile`;
- commitar cada projeto de `_staging` no respectivo repositorio remoto;
- criar uma copia de seguranca fora do workspace antes de qualquer remocao.

## Recomendacao

Recomendo a opcao 1, mas apenas depois de backup/revisao dos nao rastreados do `portfolio`: manter `portfolio` como repo separado e remover o gitlink do indice do `Web_Mobile` em um commit planejado no pai.

Motivo: o repo `portfolio` existe no GitHub, esta atualizado com `origin/main`, tem conteudo e remotes proprios, e nao ha `.gitmodules` no pai. Formalizar submodulo so faria sentido se o projeto academico realmente precisasse carregar o portfolio como dependencia versionada.
