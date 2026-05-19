# Plano Operacional de Organizacao de Branches

Data da organizacao inicial: 2026-05-18

Este plano inicia a organizacao das branches do repositorio `Web_Mobile` em modo seguro e nao destrutivo. Nenhuma branch foi apagada, nenhuma ref foi podada, nenhum checkout/reset foi feito, nenhum commit/push foi executado e nenhuma configuracao Git foi alterada.

## Estado atual resumido

| Item | Estado observado |
| --- | --- |
| Workspace | `C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP` |
| Repositorio efetivo | `Web_Mobile` |
| Produto principal | `Web_Mobile/SIBiSC` |
| Git top-level | `C:/Users/Rafael Feltrim/Downloads/Web e Mobile - USP/Web_Mobile` |
| Remoto | `origin` -> `https://github.com/RaFeltrim/sibisc-hub-cultural.git` |
| Branch atual | `dev` |
| Worktrees | Apenas a worktree principal em `Web_Mobile`, apontando para `dev` |
| Ref remota local de `origin/main` | `4c3b1d3`, defasada no clone local |
| `HEAD` remoto no GitHub | `main`, em `53544be` |
| Branches locais visiveis | 8 |
| Branches remotas rastreadas localmente | 7 |
| Branches remotas publicadas no GitHub via `ls-remote` | 12 |

Observacao importante: a branch principal do GitHub foi detectada por `git ls-remote --symref origin HEAD` como `main`, mas a ref rastreada localmente `origin/main` ainda aponta para `4c3b1d3`. Portanto, qualquer decisao de limpeza remota deve considerar que o clone local esta defasado e deve ser revisado novamente antes de qualquer acao destrutiva.

## Branch principal detectada

- Principal remota detectada: `main`.
- Evidencia: `git ls-remote --symref origin HEAD` retornou `ref: refs/heads/main HEAD`.
- Estado remoto atual de `main`: `53544bed464aa2f16c74fce72ccdd817de1f43e7`.
- Estado local rastreado em `origin/main`: `4c3b1d3401a764ab1f104d498bf1b42410efd5b2`.

## Branch atual e risco do trabalho nao commitado

A branch atual e `dev`, alinhada com `origin/dev` no clone local. A worktree esta suja e contem trabalho nao commitado relevante. Isso inclui alteracoes em codigo do produto, componentes de UI, paginas, mocks, servicos, utilitarios, scripts de QA, evidencias Playwright e varios documentos de Sprint 0/Feltrim Agents.

Arquivos e areas com risco alto de perda se houver limpeza indevida:

- `SIBiSC/src/**`: alteracoes em layout, navegacao, paginas, mocks, servicos e componentes.
- `SIBiSC/scripts/qa-guard.mjs`: alteracao em script de QA.
- `SIBiSC/.playwright-cli/*.yml`: evidencias temporais de navegacao/teste.
- `SIBiSC/docs/product/**`: documentos de analise, backlog, sprints, execucao multiagente e integracao.
- `SIBiSC/docs/qa/**`: planos e evidencias de validacao da Sprint 0.

Regra operacional para a proxima etapa: nao alternar branch, nao resetar, nao limpar arquivos, nao deletar branches e nao tentar reconciliar `dev` enquanto esse trabalho nao commitado nao for salvo, revisado ou descartado conscientemente pelo Rafael.

## Branches que definitivamente nao devem ser apagadas agora

Esta secao e deliberadamente conservadora. A verificacao usou apenas comandos Git de leitura e consultas publicas/read-only via GitHub CLI/API: `status`, `branch`, `for-each-ref`, `worktree list`, `ls-remote`, `rev-list`, `log`, `cat-file`, `gh pr list`, `gh api /branches` e `gh api /compare`. Nao houve delecao, `prune`, `checkout`, `commit`, `push`, `reset`, alteracao de config ou atualizacao de refs.

Sinais confirmados nesta auditoria:

- A branch atual e `dev`, usada pela unica worktree detectada.
- Nao ha PR aberto no GitHub para o repositorio no momento da consulta.
- `main`, `dev`, `test`, `hom` e `prd` existem como branches de ambiente/fluxo formal.
- A `origin/main` local continua defasada: o GitHub aponta `main` para `53544be`, mas esse objeto nem existe no clone local sem atualizar refs.
- `dev` e `test` divergem de `main` no GitHub; `hom` e `prd` estao atrasadas, mas continuam sendo branches de ambiente.
- Ha trabalho nao commitado e novos documentos da Sprint 0/Feltrim Agents na worktree atual em `dev`.

| Branch | Escopo | Motivo para nao apagar agora | Risco se apagar agora |
| --- | --- | --- | --- |
| `main` | local/remota | Branch principal detectada no GitHub e referencia de onboarding. Mesmo que a ref local esteja antiga, a remota e a base formal do projeto. | Perder ou confundir a referencia canonica do repositorio e do historico de entrega. |
| `dev` | local/remota | Branch atual, unica worktree ativa e integracao do trabalho corrente. Tambem concentra o contexto da Sprint 0/Feltrim Agents e esta divergente de `main`. | Interromper o trabalho atual, perder o ponto de integracao e aumentar o risco sobre alteracoes nao commitadas. |
| `test` | local/remota | Branch de QA prevista no fluxo de ambientes; no GitHub esta 12 commits a frente e 12 atras de `main`, e atras de `dev` por 3 commits. | Perder um ambiente de validacao ou um marco de QA antes de decidir resincronizacao/promocao. |
| `hom` | local/remota | Branch de homologacao prevista no fluxo; esta congelada em marco antigo, mas isso pode ser intencional para entrega/demonstracao. | Apagar um possivel marco academico ou ambiente formal antes de substituir por tag ou nova politica. |
| `prd` | local/remota | Branch de producao prevista no fluxo; tambem esta congelada em marco antigo. | Perder a referencia de producao/marco final usado em apresentacao, entrega ou rollback conceitual. |
| `codex/figma-web-handoff` | local | Branch local esta `ahead 10` do upstream. Embora seus commits estejam incorporados em `dev`, ela preserva a trilha local do trabalho de agente/handoff. | Perder contexto de divergencia local vs remoto e dificultar auditoria do trabalho feito por agente. |
| `codex/figma-web-handoff` | remota | Branch de agente publicada; o compare GitHub mostra 1 commit a frente de `main` remota e ela esta relacionada ao historico de handoff Figma. | Apagar evidencia historica de handoff/automacao sem revisar se deve virar PR, tag ou documento. |
| `feat/T-NOT-002-news-origin` | local/remota | Feature academica nomeada por tarefa; no GitHub esta atras de `main`/`dev`, mas nao apareceu PR associado na busca atual e o commit referencia historico de entrega. | Perder rastreabilidade de uma task/feature de entrega antes de confirmar issue, PR, evidencias e necessidade de tag. |

### REVISAR, nao deletar ainda

Estas branches continuam ambiguas. Elas podem ser candidatas futuras, mas nesta etapa nao devem ser classificadas como deletaveis sem aprovacao explicita e nova conferencia.

| Branch | Escopo | Por que e ambigua | Risco se apagar sem revisar |
| --- | --- | --- | --- |
| `feat/T-ACV-003-browser-geolocation` | local | Nao tem upstream e aponta para o mesmo commit da `main` local, sem commits proprios aparentes. O nome, porem, sugere feature planejada. | Apagar um marcador de trabalho futuro ou contexto de planejamento ainda usado pelo Rafael. |
| `feature/T-BASE-001-setup-inicial` | remota | PR #41 esta mergeado em `main`, mas e uma branch academica/base de setup e nao existe como ref local atualizada. | Perder rastreabilidade de uma entrega base antes de confirmar que PR, evidencias e tags bastam. |
| `task/T-BASE-001` | remota | PR #43 esta mergeado em `main`, mas a branch preserva uma task academica publicada. | Perder uma referencia historica de tarefa antes de aprovar arquivamento ou tag. |
| `task/T-BASE-004` | remota | PR #42 esta mergeado em `main`, mas a branch preserva uma task academica publicada. | Perder uma referencia historica de tarefa antes de aprovar arquivamento ou tag. |
| `copilot/t-base-004-review-approval` | remota | Nao ha PR associado na busca atual e ela aponta para commit de merge ja incorporado em `main`, mas pode ser trilha de automacao/review. | Apagar evidencia de automacao sem confirmar que nao e usada por workflow, review ou registro academico. |
| `copilot/task-t-base-001` | remota | Mesma SHA da outra branch `copilot/*`; parece duplicada, mas ainda e historico de automacao. | Apagar evidencia de automacao sem confirmar que nao ha dependencia externa ou registro associado. |

### Possiveis candidatas somente apos aprovacao

Depois de salvar/revisar o trabalho atual, atualizar a visao remota em etapa separada sem `--prune`, confirmar evidencias academicas e obter aprovacao explicita, as candidatas mais plausiveis continuam sendo `feat/T-ACV-003-browser-geolocation` local, `feature/T-BASE-001-setup-inicial`, `task/T-BASE-001`, `task/T-BASE-004`, `copilot/t-base-004-review-approval` e `copilot/task-t-base-001`. `feat/T-NOT-002-news-origin` so deveria entrar nessa lista se a equipe confirmar que a entrega esta totalmente preservada em `main`, PR/issue/documentacao e, se necessario, tag.

## Matriz de branches por acao recomendada

| Acao recomendada | Branch | Escopo | Motivo | Condicao antes de agir |
| --- | --- | --- | --- | --- |
| AMBIENTE / PROTEGIDA | `main` | remota/local | Branch principal do GitHub e referencia de onboarding. | Nao deletar. Qualquer mudanca deve ser por PR/promocao formal. |
| AMBIENTE / PROTEGIDA | `dev` | remota/local | Branch atual da worktree e integracao ativa; contem trabalho nao commitado na worktree. | Nao deletar. Primeiro salvar ou revisar trabalho da Sprint 0/Feltrim Agents. |
| AMBIENTE / PROTEGIDA | `test` | remota/local | Branch de QA documentada no fluxo de ambientes; diverge de `main` local. | Nao deletar sem decisao de governanca. Revisar se deve ser resincronizada. |
| AMBIENTE / PROTEGIDA | `hom` | remota/local | Branch de homologacao documentada; parece congelada em marco antigo. | Nao deletar se ainda representa ambiente formal; decidir se sera atualizada por promocao. |
| AMBIENTE / PROTEGIDA | `prd` | remota/local | Branch de producao documentada; parece congelada em marco antigo. | Nao deletar se ainda representa ambiente formal; decidir se sera atualizada por promocao. |
| MANTER | `codex/figma-web-handoff` | local | A branch local esta `ahead 10` em relacao ao upstream e pode conter trabalho nao publicado. | Revisar commits/diff antes de decidir arquivar, abrir PR ou descartar. |
| REVISAR ANTES DE APAGAR | `codex/figma-web-handoff` | remota | Branch de agente antiga; a remota diverge da local e o relatorio anterior apontou decisao de evitar novas `codex/*`. | Comparar local vs remoto e decidir se os commits locais precisam virar PR/documentacao. |
| REVISAR ANTES DE APAGAR | `feat/T-NOT-002-news-origin` | remota/local | Parece incorporada historicamente, mas e uma feature academica com PR/evidencia associada. | Confirmar PR/issue/evidencias antes de limpar local e remoto. |
| REVISAR ANTES DE APAGAR | `feat/T-ACV-003-browser-geolocation` | local | Branch sem upstream e apontando para o mesmo commit de `main` local, sem commits proprios aparentes; o nome sugere feature planejada. | Rafael confirmar que nao e marcador de trabalho futuro. |
| REVISAR ANTES DE APAGAR | `feat/T-NOT-002-news-origin` | local | Branch local merged em `main` local e rastreia remota antiga, mas preserva uma feature academica. | So depois de confirmar merge e arquivamento/evidencia da task. |
| REVISAR ANTES DE APAGAR | `feature/T-BASE-001-setup-inicial` | remota GitHub | Branch remota nao rastreada localmente; PR #41 mergeado, mas e referencia academica/base de setup. | Confirmar no GitHub que nao ha PR aberto nem evidencia pendente. |
| REVISAR ANTES DE APAGAR | `task/T-BASE-001` | remota GitHub | Branch remota nao rastreada localmente; PR #43 mergeado, mas preserva task academica. | Confirmar PR mergeado e ausencia de dependencia academica. |
| REVISAR ANTES DE APAGAR | `task/T-BASE-004` | remota GitHub | Branch remota nao rastreada localmente; PR #42 mergeado, mas preserva task academica. | Confirmar PR mergeado e ausencia de dependencia academica. |
| REVISAR ANTES DE APAGAR | `copilot/t-base-004-review-approval` | remota GitHub | Branch de automacao apontando para commit de merge ja incorporado. | Confirmar que nao ha PR aberto e que a branch nao e usada por automacao. |
| REVISAR ANTES DE APAGAR | `copilot/task-t-base-001` | remota GitHub | Branch de automacao com mesmo SHA da outra branch `copilot/*`, aparentemente duplicada. | Confirmar que nao ha PR aberto e que a branch nao e usada por automacao. |
| ARQUIVAR / TAG ANTES DE LIMPAR | `codex/figma-web-handoff` | local/remota | Tem conteudo de handoff/seguranca e divergencia local; pode merecer preservacao historica. | Se for descartada, criar tag/registro de decisao antes da limpeza. |
| ARQUIVAR / TAG ANTES DE LIMPAR | `feat/T-NOT-002-news-origin` | local/remota | Branch de feature academica, possivelmente associada a entrega e evidencia. | Garantir que o estado final esta em `main` ou em documento/tag antes de apagar. |
| ARQUIVAR / TAG ANTES DE LIMPAR | `hom` e `prd` | remota/local | Podem representar marcos de entrega/homologacao/producao. | Se forem substituidas por tags no futuro, criar tags de marco antes de mudar a politica. |

## Comandos seguros de diagnostico

Estes comandos sao de leitura ou dry-run. Eles podem ser repetidos antes da proxima etapa para revisar o estado sem apagar nada.

```powershell
git status --short --branch -uall
git branch --list --all --verbose --verbose --no-color
git remote -v
git worktree list --porcelain
git ls-remote --symref origin HEAD
git ls-remote --heads origin
git branch --all --merged main --no-color
git branch --all --no-merged main --no-color
git branch --remotes --merged origin/main --no-color
git branch --remotes --no-merged origin/main --no-color
git fetch --dry-run origin
```

Para visualizar a limpeza sem executar delecoes, usar apenas `Write-Output`/`Write-Host`:

```powershell
Write-Output "DRY-RUN local: git branch -d feat/T-ACV-003-browser-geolocation"
Write-Output "DRY-RUN remote: git push origin --delete task/T-BASE-001"
```

Nao executar ainda:

```powershell
# git branch -d <branch>
# git branch -D <branch>
# git push origin --delete <branch>
# git fetch --prune
# git remote set-head origin -a
```

## Checklist de aprovacao do Rafael

Antes de qualquer limpeza real, Rafael precisa aprovar explicitamente:

- [ ] Confirmar que `main`, `dev`, `test`, `hom` e `prd` seguem como branches protegidas/de ambiente.
- [ ] Confirmar se `feat/T-ACV-003-browser-geolocation` pode ser apagada localmente.
- [ ] Confirmar se `feat/T-NOT-002-news-origin` esta totalmente incorporada e pode ser removida local/remota.
- [ ] Confirmar no GitHub que `feature/T-BASE-001-setup-inicial`, `task/T-BASE-001`, `task/T-BASE-004`, `copilot/t-base-004-review-approval` e `copilot/task-t-base-001` nao tem PRs abertos.
- [ ] Revisar `codex/figma-web-handoff` local, especialmente os commits locais ainda nao publicados.
- [ ] Decidir se `codex/figma-web-handoff` ou branches de entrega precisam virar tag antes de limpeza.
- [ ] Salvar, commitar ou descartar conscientemente o trabalho nao commitado da Sprint 0/Feltrim Agents antes de qualquer checkout ou operacao de branch.
- [ ] Definir se as refs locais defasadas devem ser atualizadas em uma etapa separada, sem `--prune` inicialmente.

## Politica futura de branches

- Manter branches permanentes somente para fluxo de ambiente: `main`, `dev`, `test`, `hom`, `prd`.
- Criar trabalho temporario com prefixos padronizados: `feat/`, `fix/`, `docs/`, `chore/`.
- Evitar publicar branches `codex/`, `copilot/` e `task/`; agentes devem seguir o mesmo padrao humano.
- Exigir issue/card no nome da branch ou na descricao do PR quando aplicavel.
- Apagar branch remota automaticamente apos merge de PR, exceto branches protegidas.
- Fazer revisao quinzenal com dono, data do ultimo commit, PR associado e decisao: manter, arquivar, deletar local, deletar remota.
- Para marcos academicos ou entregas, preferir tags documentadas a branches congeladas.
- Nunca limpar branches com worktree suja ou refs locais defasadas sem uma nova auditoria de leitura.

## Artefatos gerados nesta etapa

- Plano operacional: `Web_Mobile/SIBiSC/docs/product/plano_organizacao_branches.md`.
- Script de auditoria dry-run: `Web_Mobile/scripts/branch-cleanup-dry-run.ps1`.
