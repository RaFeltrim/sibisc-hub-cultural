# Analise de Branches Git - SIBiSC/Web Mobile

Data da analise: 2026-05-18

## Resumo executivo

O repositorio Git efetivo do projeto nao e `Web_Mobile/SIBiSC`, mas sim `Web_Mobile`. O diretorio `SIBiSC` e o produto principal dentro desse repositorio.

Ha 8 branches locais e 12 branches remotas publicadas no GitHub. A quantidade nao parece acidental: ela vem de uma combinacao de fluxo de ambientes (`dev`, `test`, `hom`, `prd`, `main`), branches por tarefa academica, branches criadas por agentes/Copilot/Codex, e branches antigas que foram mergeadas mas nao limpas.

O ponto mais importante e que as refs locais estao parcialmente defasadas em relacao ao remoto: `origin/HEAD` nao esta configurado localmente e `origin/main` local aponta para `4c3b1d3`, enquanto o GitHub informa `main` em `53544be`. Portanto, qualquer limpeza deve comecar por uma atualizacao cuidadosa das refs e por verificacao de PRs/merges no GitHub, sem apagar nada automaticamente.

## Repositorio efetivo

| Item | Valor |
| --- | --- |
| Workspace informado | `C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP` |
| Produto SIBiSC | `Web_Mobile/SIBiSC` |
| Git top-level detectado | `C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile` |
| Git dir detectado | `C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile/.git` |
| Branch local atual | `dev` |
| Remoto | `origin` -> `https://github.com/RaFeltrim/sibisc-hub-cultural.git` |
| Branch principal no GitHub | `main` |
| Worktrees detectadas | Apenas a worktree principal, em `Web_Mobile`, na branch `dev` |

Observacao: a arvore de trabalho ja estava suja antes deste relatorio, com varias alteracoes em `SIBiSC/src`, `SIBiSC/docs` e `.playwright-cli/`. Esta analise nao fez checkout, reset, commit, push ou delete.

## Branches locais

Relacao com `main` nesta tabela usa a `main` local existente no clone. Como a `main` remota do GitHub esta mais nova que a `origin/main` local, use esta tabela como estado do clone, nao como unica fonte para limpeza remota.

| Branch local | Padrao | Ultimo commit | Autor | Upstream | Relacao com `main` local | Ahead/behind vs upstream | Leitura |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `dev` | ambiente/integracao | `3418c99` - 2026-05-18 - `fix: corrige nav bar mobile com 5 colunas no grid` | RaFeltrim | `origin/dev` | nao merged, `0 behind / 15 ahead` vs `main` local | alinhada | Manter. Branch ativa e worktree atual. |
| `test` | ambiente/QA | `bda14e2` - 2026-04-03 - `docs(governance): add environment flow...` | RaFeltrim | `origin/test` | nao merged, `0 behind / 12 ahead` vs `main` local | alinhada | Manter se o fluxo de ambientes continuar. Precisa promocao/sync planejado. |
| `hom` | ambiente/homologacao | `4c3b1d3` - 2026-03-17 - `merge(front): bring T-NOT-002...` | RaFeltrim | `origin/hom` | merged, igual a `main` local | alinhada | Manter se for ambiente formal; esta atrasada frente a `main` remota. |
| `prd` | ambiente/producao | `4c3b1d3` - 2026-03-17 - `merge(front): bring T-NOT-002...` | RaFeltrim | `origin/prd` | merged, igual a `main` local | alinhada | Manter se for ambiente formal; esta atrasada frente a `main` remota. |
| `main` | principal/onboarding | `4c3b1d3` - 2026-03-17 - `merge(front): bring T-NOT-002...` | RaFeltrim | `origin/main` | referencia local | alinhada com `origin/main` local | Manter. A ref local esta defasada em relacao ao GitHub. |
| `feat/T-NOT-002-news-origin` | feature/tarefa | `9d61bdb` - 2026-03-17 - `feat(front): complete T-NOT-002 news source detail (#24)` | RaFeltrim | `origin/feat/T-NOT-002-news-origin` | merged; `1 behind / 0 ahead` vs `main` local | alinhada | Candidata a arquivar/deletar apos confirmar que o PR/merge e evidencias estao ok. |
| `feat/T-ACV-003-browser-geolocation` | feature/tarefa | `4c3b1d3` - 2026-03-17 - `merge(front): bring T-NOT-002...` | RaFeltrim | sem upstream | merged; igual a `main` local | n/a | Local temporaria sem commits proprios aparentes. Candidata a deletar localmente apos confirmacao. |
| `codex/figma-web-handoff` | agente/Codex | `a35df02` - 2026-04-03 - `docs(security): add executive security report with action items` | RaFeltrim | `origin/codex/figma-web-handoff` | nao merged; `0 behind / 11 ahead` vs `main` local | `ahead 10` | Nao apagar sem review: ha commits locais nao publicados em relacao ao upstream. |

## Branches remotas no GitHub

Relacao com `main` nesta tabela usa o GitHub remoto atual (`main` em `53544be`). Para branches que tambem existem localmente, a comparacao remota pode divergir da comparacao local por causa das refs locais defasadas.

| Branch remota | Padrao | Ultimo commit remoto | Autor | Relacao com `main` remota | Sinais de PR/merge | Leitura |
| --- | --- | --- | --- | --- | --- | --- |
| `main` | principal/onboarding | `53544be` - 2026-05-10 - `docs: formalize README - SIBiSC Hub Cultural...` | Rafael Feltrim | referencia | PR #44 mergeado em 2026-05-10 a partir de `dev` | Manter. Branch padrao do GitHub. |
| `dev` | ambiente/integracao | `3418c99` - 2026-05-18 - `fix: corrige nav bar mobile com 5 colunas no grid` | RaFeltrim | diverged; `15 ahead / 12 behind` | PR #44 anterior foi mergeado, mas `dev` continuou ativa | Manter e revisar diferencas antes da proxima promocao. |
| `test` | ambiente/QA | `bda14e2` - 2026-04-03 - `docs(governance): add environment flow...` | RaFeltrim | diverged; `12 ahead / 12 behind` | sem PR direto identificado | Manter se for ambiente; precisa reconciliar com `main`/`dev`. |
| `hom` | ambiente/homologacao | `4c3b1d3` - 2026-03-17 - `merge(front): bring T-NOT-002...` | RaFeltrim | behind; `0 ahead / 12 behind` | sem PR direto identificado | Manter se for ambiente; esta congelada/antiga. |
| `prd` | ambiente/producao | `4c3b1d3` - 2026-03-17 - `merge(front): bring T-NOT-002...` | RaFeltrim | behind; `0 ahead / 12 behind` | sem PR direto identificado | Manter se for ambiente; esta congelada/antiga. |
| `feat/T-NOT-002-news-origin` | feature/tarefa | `9d61bdb` - 2026-03-17 - `feat(front): complete T-NOT-002 news source detail (#24)` | RaFeltrim | behind; `0 ahead / 13 behind` | parece incorporada em `main` historica | Candidata a limpeza apos confirmar merge e ausencia de PR aberto. |
| `feature/T-BASE-001-setup-inicial` | feature/tarefa | `88a9365` - 2026-03-24 - `fix: atualiza rotas para incluir Inicio...` | dudpaz | behind; `0 ahead / 10 behind` | PR #41 mergeado em 2026-03-29 | Candidata forte a limpar apos confirmacao. |
| `task/T-BASE-001` | task academica | `50a1750` - 2026-04-16 - `Delete SIBiSC/package-lock.json` | Rafael Feltrim | behind; `0 ahead / 6 behind` | PR #43 mergeado em 2026-04-16 | Candidata forte a limpar apos confirmacao. |
| `task/T-BASE-004` | task academica | `3e5f2fe` - 2026-04-16 - `Delete SIBiSC/package-lock.json` | Rafael Feltrim | behind; `0 ahead / 6 behind` | PR #42 mergeado em 2026-04-16 | Candidata forte a limpar apos confirmacao. |
| `copilot/t-base-004-review-approval` | agente/Copilot | `7a4bdcf` - 2026-03-29 - `Merge pull request #41...` | Rafael Feltrim/GitHub | behind; `0 ahead / 9 behind` | aponta para commit de merge ja incorporado | Candidata a limpeza; provavelmente sobra de automacao/review. |
| `copilot/task-t-base-001` | agente/Copilot | `7a4bdcf` - 2026-03-29 - `Merge pull request #41...` | Rafael Feltrim/GitHub | behind; `0 ahead / 9 behind` | mesmo SHA da branch Copilot acima | Candidata a limpeza; duplicada em conteudo. |
| `codex/figma-web-handoff` | agente/Codex | `33991ea` - 2026-03-23 - `feat: refine web ui and document figma handoff` | RaFeltrim | diverged; `1 ahead / 12 behind` | branch de agente; ata de 2026-04-03 recomenda nao criar mais `codex/` | Revisar antes de limpar, especialmente porque existe branch local com 10 commits a mais. |

## Por que existem tantas branches

### 1. O projeto adotou um fluxo de ambientes

A documentacao em `docs/governance/fluxo_de_branches_e_commits.md` e `docs/governance/fluxo_de_ambientes.md` define explicitamente:

```text
feat/* -> dev -> test -> hom -> prd -> main
```

Isso explica cinco branches permanentes: `dev`, `test`, `hom`, `prd` e `main`. Elas nao devem ser tratadas como lixo automaticamente, mesmo quando parecem antigas.

### 2. Houve congelamento academico/de entrega

`hom`, `prd` e parte das features ficaram paradas em commits de marco/abril. Isso combina com o contexto de entrega academica: criar um ponto demonstravel, validar, e depois preservar estados para apresentacao/onboarding. O problema e que esses marcos nao foram sincronizados depois que `main` recebeu novos commits em maio.

### 3. Branches por task ficaram publicadas apos merge

`feature/T-BASE-001-setup-inicial`, `task/T-BASE-001` e `task/T-BASE-004` tem PRs fechados e mergeados (#41, #43, #42), mas as branches remotas continuam existindo. Esse e o padrao classico de acumulacao: o trabalho termina, mas a branch de origem nao e apagada.

### 4. Agentes e automacoes criaram nomes proprios

`codex/figma-web-handoff`, `copilot/t-base-004-review-approval` e `copilot/task-t-base-001` indicam trabalho feito por agentes/assistentes. A ata de orquestracao de 2026-04-03 registra uma decisao direta: "Nao criar mais branches codex/ - usar feat/". Isso confirma que pelo menos parte do acumulo veio de automacao fora do padrao de nomenclatura aprovado.

### 5. Ha refs locais e remotas defasadas

O clone local nao tem `origin/HEAD` configurado e `origin/main` local esta antigo. Alem disso, `git ls-remote` mostrou branches remotas que nao aparecem em `git branch -r`, como `task/T-BASE-001`, `task/T-BASE-004`, `feature/T-BASE-001-setup-inicial` e as duas `copilot/*`. Isso sugere que o clone nao foi atualizado recentemente com todas as heads remotas.

### 6. Ha branch local temporaria sem upstream

`feat/T-ACV-003-browser-geolocation` existe localmente, nao tem upstream e aponta para o mesmo commit da `main` local. O nome indica uma feature planejada, mas o estado atual nao mostra commits proprios. Ela provavelmente e sobra local de tentativa/planejamento.

## Riscos atuais

| Risco | Impacto | Severidade |
| --- | --- | --- |
| Limpar usando refs locais defasadas | Pode apagar branch remota que parece velha localmente, mas tem contexto no GitHub | Alta |
| Apagar `codex/figma-web-handoff` local | Perda de ate 10 commits locais ainda nao publicados naquela branch | Alta |
| Manter `hom`/`prd` sem sync | Ambientes formais deixam de representar a realidade do produto | Media |
| Branches de task antigas no remoto | Polui a navegacao, confunde alunos e agentes, aumenta chance de PR contra base errada | Media |
| `origin/HEAD` ausente localmente | Ferramentas podem nao detectar a branch principal automaticamente | Baixa/media |
| Nomenclatura misturada (`feat`, `feature`, `task`, `copilot`, `codex`) | Dificulta governanca e decisao de limpeza | Media |

## Recomendacoes conservadoras

### Manter

- `main`: branch principal remota e referencia de onboarding.
- `dev`: branch ativa de integracao; worktree atual esta nela.
- `test`, `hom`, `prd`: manter enquanto o fluxo de ambientes documentado continuar valido.
- `codex/figma-web-handoff` local: manter ate revisar os 10 commits locais que nao estao em `origin/codex/figma-web-handoff`.

### Candidatas a arquivar/deletar depois de confirmar merge

- `feature/T-BASE-001-setup-inicial`: PR #41 mergeado.
- `task/T-BASE-001`: PR #43 mergeado.
- `task/T-BASE-004`: PR #42 mergeado.
- `copilot/t-base-004-review-approval`: aponta para commit ja incorporado e parece sobra de automacao.
- `copilot/task-t-base-001`: duplicada em conteudo com a anterior.
- `feat/T-NOT-002-news-origin`: parece incorporada ao historico principal; confirmar PR/issue antes de limpar.
- `feat/T-ACV-003-browser-geolocation`: local, sem upstream e sem commits proprios aparentes; confirmar que nao e marcador de trabalho futuro.

### Precisam review antes de apagar

- `dev`: tem commit recente em 2026-05-18 e diverge da `main` remota.
- `test`: tem 12 commits a frente da `main` remota, embora tambem esteja 12 commits atras. Decidir se sera recriada/promovida a partir de `dev`.
- `codex/figma-web-handoff`: branch remota antiga, mas branch local tem commits extras; revisar diff e decidir se vira PR/documentacao ou se sera descartada conscientemente.
- `hom` e `prd`: nao apagar se forem ambientes oficiais; decidir se devem ser sincronizadas por promocao formal.

## Procedimento seguro sugerido para limpeza futura

1. Atualizar a visao remota sem deletar nada automaticamente.
2. Conferir PRs fechados e issues associadas a cada branch candidata.
3. Para cada branch candidata, comparar contra `main` remota e contra `dev`.
4. Arquivar evidencia no documento de release ou governanca antes de apagar branch remota.
5. Apagar primeiro branches locais merged e sem commits proprios; depois branches remotas mergeadas; nunca apagar `dev`, `test`, `hom`, `prd` ou `main` sem decisao explicita.

Comandos seguros para diagnostico antes de qualquer limpeza:

```bash
git fetch --dry-run origin
git branch --merged main
git branch --no-merged main
git branch -r --merged origin/main
git branch -r --no-merged origin/main
git log --oneline --decorate --graph --all --max-count=80
```

Observacao: `git fetch --dry-run` apenas informa o que seria buscado. Se a equipe decidir atualizar refs locais, fazer isso como etapa separada e registrada.

## Como evitar novo acumulo

- Ativar ou reforcar a regra de apagar branch remota ao mergear PR no GitHub.
- Padronizar nomes: `feat/`, `fix/`, `docs/`, `chore/` e evitar `codex/`, `copilot/`, `task/` diretamente no remoto.
- Exigir card/issue no nome ou na descricao do PR.
- Fazer revisao quinzenal de branches remotas com dono, ultima data e status.
- Tratar `dev`, `test`, `hom`, `prd` como ambientes protegidos e documentar quando cada uma foi promovida.
- Para agentes, criar branches no mesmo padrao humano, por exemplo `docs/T-QA-001-relatorio-seguranca`, e deletar automaticamente apos PR mergeado.
- Antes de uma entrega academica, criar tag de release em vez de preservar muitas branches congeladas.

## Comandos e consultas usados

Todos os comandos Git foram de leitura/diagnostico. Nao houve checkout, reset, commit, push, delete, alteracao de config ou prune.

```bash
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile\SIBiSC" rev-parse --show-toplevel
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile\SIBiSC" rev-parse --git-dir
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile\SIBiSC" status --short --branch
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile\SIBiSC" remote -v
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" symbolic-ref --short refs/remotes/origin/HEAD
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" branch --show-current
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" for-each-ref refs/heads refs/remotes --format="%(refname:short)|%(objectname:short)|%(committerdate:iso8601)|%(authorname)|%(upstream:short)|%(upstream:track)|%(subject)" --sort=-committerdate
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" worktree list --porcelain
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" ls-remote --symref origin HEAD
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" ls-remote --heads origin
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" branch --merged main
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" branch --no-merged main
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" branch -r --merged main
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" branch -r --no-merged main
git -C "C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile" rev-list --left-right --count main...<branch>
```

Tambem foram consultados endpoints publicos do GitHub para branches, commits, compares e PRs do repositorio `RaFeltrim/sibisc-hub-cultural`, pois algumas branches remotas existem no GitHub mas nao estavam presentes nas refs locais.
