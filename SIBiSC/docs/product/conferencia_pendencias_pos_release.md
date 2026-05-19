# Conferencia de Pendencias Pos-Release - SIBiSC/Feltrim Agents

Data: 2026-05-19  
Workspace: `C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile`  
App: `SIBiSC`  
Escopo: conferencia final das pendencias registradas apos Sprint 3, PR #59, PR #60 e PR #61.

## 1. Resumo executivo

O estado operacional melhorou em relacao aos diagnosticos anteriores: o dominio publico `https://sibisc-hub-cultural.vercel.app` respondeu `200 OK` por HTTP e nao apresentou `404` nem `401` no teste executado nesta conferencia.

As pendencias remanescentes sao majoritariamente operacionais: confirmacao manual do dashboard Vercel, teste real com leitor de tela por pessoa validadora, eventual ajuste futuro de workflow apenas se aparecer novo warning/permissao apropriada, e limpeza de branches somente com autorizacao explicita.

## 2. Evidencias coletadas

### Git local/remoto

Comandos executados apenas em modo leitura:

- `git status --short --branch`
- `git log --oneline --decorate -n 8 main`
- `git log --oneline --decorate -n 8 dev`
- `git ls-remote origin refs/heads/main refs/heads/dev`
- `gh pr list --state open --limit 20 --json number,title,headRefName,baseRefName,state,isDraft,updatedAt`
- `git branch -vv --all`
- `git branch --merged main`
- `git branch -r --merged origin/main`

Resultado:

- `main` local esta em `6029d9d` e sincronizada com `origin/main`.
- `origin/main` esta em `6029d9d6ef0894ffd08817e973b057559c0651c3`.
- `dev` local/remota esta em `ae127e0`, anterior ao fechamento final da release em `main`.
- `git status --short --branch` retornou apenas `## main...origin/main`, sem alteracoes locais naquele momento.
- `gh pr list --state open` retornou `[]`; nao havia PRs abertas.
- PR #59 aparece mergeado em `main` por `014cc81`.
- PR #60 aparece mergeado em `main` por `5afa3c3`.
- PR #61 aparece mergeado em `main` por `dde54dd`.

### Vercel e dominio publico

Comandos executados:

- `Get-Command vercel -ErrorAction SilentlyContinue`
- `curl.exe -I --max-time 20 -s -S https://sibisc-hub-cultural.vercel.app`

Resultado:

- CLI `vercel`: nao encontrada no ambiente local.
- Nao foi possivel executar `vercel whoami`, `vercel project ls` ou `vercel inspect` sem a CLI.
- HTTP do dominio publico respondeu:
  - `HTTP/1.1 200 OK`
  - `Server: Vercel`
  - `X-Vercel-Cache: HIT`
  - `X-Vercel-Id: gru1::4glcp-1779214068142-c26c363c5a75`
  - `Content-Type: text/html; charset=utf-8`

Interpretacao: o bloqueio publico observado anteriormente como `404`/`401` nao foi reproduzido nesta conferencia. Ainda assim, sem CLI ou acesso autenticado ao dashboard, a confirmacao de projeto, alias, branch de producao e Deployment Protection continua sendo checklist manual.

### Configuracao versionada de deploy

Arquivos existentes:

- `vercel.json` na raiz de `Web_Mobile`
- `SIBiSC/vercel.json`

Configuracao raiz:

- `installCommand`: `npm ci --prefix SIBiSC`
- `buildCommand`: `npm run build --prefix SIBiSC`
- `outputDirectory`: `SIBiSC/dist`
- rewrite SPA de `/(.*)` para `/index.html`

Configuracao em `SIBiSC/vercel.json`:

- `framework`: `vite`
- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`
- rewrite SPA de `/(.*)` para `/index.html`

### Leitor de tela

Comandos executados:

- `Get-Command nvda -ErrorAction SilentlyContinue`
- `Test-Path $env:WINDIR\System32\Narrator.exe`
- `Get-Command VoiceOverUtility -ErrorAction SilentlyContinue`

Resultado:

- NVDA nao foi encontrado no `PATH`.
- Windows Narrator existe em `C:\WINDOWS\System32\Narrator.exe`.
- VoiceOver nao se aplica ao ambiente Windows.
- Nao foi executado teste real com leitor de tela. A existencia do Narrator no sistema nao equivale a validacao humana, porque o ambiente de agente nao permite avaliar fala, navegacao assistiva real, entendimento dos anuncios ou qualidade da experiencia.

### GitHub Actions Node 20

Arquivo inspecionado:

- `.github/workflows/qa-gate.yml`

Estado atual:

- `actions/checkout@v4`
- `actions/setup-node@v4`
- `actions/upload-artifact@v4`
- `node-version: 22` nos jobs P0/P1

Interpretacao: nao ha uso aparente de actions antigas com runtime Node 16 neste workflow. A pendencia "Node 20 warning" parece operacional/historica neste momento, ou ja mitigada pelo estado atual do arquivo. Nao foi feita alteracao em workflow, em linha com a restricao de nao editar quando a pendencia dependia de permissao `workflow`.

## 3. Tabela de pendencias

| Pendencia | Status | Evidencia | Bloqueador | Proximo passo | Dono sugerido |
| --- | --- | --- | --- | --- | --- |
| Confirmar dominio/producao Vercel para resolver `https://sibisc-hub-cultural.vercel.app` 404/Deployment Protection | Parcialmente resolvida por evidencia publica; pendente confirmacao de dashboard | `curl.exe -I` retornou `HTTP/1.1 200 OK`, `Server: Vercel`, `X-Vercel-Cache: HIT` | Sem CLI `vercel` e sem acesso autenticado ao dashboard nesta sessao | Validar dashboard Vercel conforme checklist abaixo e registrar print/data se necessario | Responsavel pelo projeto Vercel |
| Testar com leitor de tela real | Pendente manual | NVDA nao encontrado; Narrator existe, mas teste real nao e executavel de forma confiavel pelo agente | Necessita pessoa validadora em ambiente GUI com audio/leitor de tela | Executar roteiro NVDA/Narrator abaixo e anexar evidencia humana | QA/acessibilidade ou apresentador responsavel |
| Atualizar GitHub Actions Node 20 | Nao bloqueante no estado atual; pendencia operacional/historica | `.github/workflows/qa-gate.yml` usa actions `@v4` e `node-version: 22` | Nao ha alteracao segura necessaria identificada; mudancas futuras em workflow podem exigir token com escopo `workflow` | Monitorar checks do GitHub; se surgir warning real, atualizar com token adequado | Mantenedor com permissao `workflow` |
| Limpeza de branches antigas | Pendente por autorizacao, nao bloqueante | Branches locais/remotas listadas; varias estao mergeadas em `main` | Falta autorizacao explicita para deletar branches | Revisar lista de candidatas e aprovar limpeza em tarefa separada | Maintainer do repo |

## 4. Conclusao Go/No-Go operacional

Decisao: **GO operacional condicionado para apresentacao publica pelo dominio Vercel**, porque a URL publica principal respondeu `200 OK` e nao ha PR aberta nem divergencia em `main`.

Condicoes e limites:

- A confirmacao no dashboard Vercel ainda deve ser feita manualmente para fechar a causa operacional de alias/protecao.
- O teste real com leitor de tela continua pendente e deve ser tratado como **NO-GO para aprovacao final irrestrita de acessibilidade**, mas nao foi possivel executa-lo tecnicamente neste ambiente.
- GitHub Actions Node 20 nao bloqueia a apresentacao no estado atual do workflow.
- Branch cleanup nao bloqueia apresentacao e nao deve ser executada sem autorizacao especifica.

## 5. Checklist manual Vercel

Objetivo: confirmar que o `200 OK` publico corresponde ao projeto correto e nao a um estado acidental.

1. Abrir `https://vercel.com/rafeltrims-projects/sibisc-hub-cultural`.
2. Em **Settings > Git**, confirmar:
   - Repository: `RaFeltrim/sibisc-hub-cultural`.
   - Production Branch: `main`.
   - Root Directory: `SIBiSC` ou raiz do repo com o `vercel.json` raiz atual.
   - Build Command compativel com o root escolhido.
   - Output Directory compativel com o root escolhido.
3. Em **Settings > Domains**, confirmar:
   - `sibisc-hub-cultural.vercel.app` esta associado ao projeto correto.
   - Nao ha alias antigo apontando para deployment inexistente.
   - O dominio esperado aparece como dominio de producao.
4. Em **Deployments**, abrir o deployment mais recente de `main`:
   - Confirmar commit/branch.
   - Confirmar status `Ready`.
   - Confirmar que o alias de producao aponta para esse deployment.
5. Em **Deployment Protection**, confirmar:
   - Production esta publica se a apresentacao for publica.
   - Se a protecao for mantida, documentar forma de acesso sem commitar bypass token.
6. Revalidar manualmente:
   - `https://sibisc-hub-cultural.vercel.app`
   - `https://sibisc-hub-cultural.vercel.app/home-mobile`
   - `https://sibisc-hub-cultural.vercel.app/catalogo`
   - `https://sibisc-hub-cultural.vercel.app/catalogo/b1`
   - `https://sibisc-hub-cultural.vercel.app/perfil`
   - `https://sibisc-hub-cultural.vercel.app/eventos`

## 6. Roteiro manual de leitor de tela

Ambiente recomendado:

- Windows + NVDA + Edge, preferencialmente.
- Alternativa Windows: Narrator + Edge.
- Alternativa macOS: VoiceOver + Safari/Chrome.

Registro minimo:

- Data e hora.
- URL testada.
- Sistema operacional.
- Navegador e versao.
- Leitor de tela e versao.
- Pessoa validadora.
- Rotas testadas.
- Achados, severidade e decisao final.

Passos:

1. Abrir `https://sibisc-hub-cultural.vercel.app`.
2. Navegar somente por teclado na Home:
   - Confirmar link de pular conteudo, se presente.
   - Confirmar ordem logica de foco.
   - Confirmar nomes acessiveis dos CTAs principais.
   - Confirmar landmarks ou estrutura equivalente para cabecalho, conteudo principal e navegacao.
3. Acessar `/home-mobile`:
   - Confirmar que header e bottom nav nao escondem controles.
   - Confirmar foco visivel e ordem logica.
   - Confirmar que botoes/links anunciam finalidade.
4. Acessar `/catalogo`:
   - Buscar por `vidas`.
   - Confirmar que o resultado/estado da busca e percebido.
   - Navegar para um item do catalogo sem mouse.
5. Acessar `/catalogo/b1`:
   - Confirmar que titulo, autor, disponibilidade e unidades sao compreensiveis.
   - Confirmar que botoes de acao tem nome acessivel.
6. Acessar `/perfil`:
   - Alternar abas Emprestimos/Historico/Favoritos.
   - Confirmar relacao tab/painel.
   - Acionar Renovar e Remover favorito.
   - Confirmar mensagem de status anunciada ou perceptivel.
7. Acessar `/eventos`:
   - Navegar por eventos.
   - Abrir detalhe, se disponivel.
   - Acionar Google Calendar e confirmar aviso de nova aba/janela.
8. Testar comportamento com `Esc`, `Tab`, `Shift+Tab`, `Enter` e `Espaco`.
9. Registrar qualquer controle sem nome, armadilha de foco, foco invisivel, mudanca dinamica nao anunciada ou conteudo essencial fora da ordem de leitura.

Criterio de aceite:

- Nenhum fluxo principal impossivel sem mouse.
- Nenhum controle interativo sem nome acessivel.
- Foco visivel e previsivel nas rotas principais.
- Estados selecionados compreensiveis.
- Mensagens dinamicas importantes anunciadas ou claramente percebidas.
- Nenhuma armadilha de foco.

## 7. Branches candidatas a limpeza futura

Nenhuma branch foi deletada. A lista abaixo e apenas candidata para revisao humana, porque as refs aparecem mergeadas em `origin/main` ou relacionadas a PRs ja encerrados.

### Intocaveis/protegidas sem decisao explicita

- `main`
- `origin/main`
- `origin/HEAD`
- `dev` / `origin/dev`
- `hom` / `origin/hom`
- `prd` / `origin/prd`
- `test` / `origin/test`

Motivo: branches de ambiente, integracao ou referencia principal devem ser tratadas como protegidas ate confirmacao formal da estrategia do repo.

### Candidatas locais a revisar

- `feature/sibisc-feedback-gamification-sprint2`
- `feature/sibisc-guided-assistant-sprint1`
- `fix/sibisc-deploy-404`
- `fix/sibisc-visual-regressions`
- `release/sibisc-hardening-sprint3`
- `release/sibisc-hardening-sprint3-workflow-blocked`
- `feat/T-NOT-002-news-origin`
- `feat/T-ACV-003-browser-geolocation`
- `codex/figma-web-handoff`

Observacao: `codex/figma-web-handoff` local aparece com commit diferente e indicador `[origin/codex/figma-web-handoff: ahead 10]`; revisar antes de qualquer limpeza, mesmo constando como mergeada no calculo local.

### Candidatas remotas a revisar

- `origin/copilot/t-base-004-review-approval`
- `origin/copilot/task-t-base-001`
- `origin/feature/T-BASE-001-setup-inicial`
- `origin/feature/sibisc-feedback-gamification-sprint2`
- `origin/feature/sibisc-guided-assistant-sprint1`
- `origin/fix/sibisc-deploy-404`
- `origin/fix/sibisc-visual-regressions`
- `origin/release/sibisc-hardening-sprint3`
- `origin/task/T-BASE-001`
- `origin/task/T-BASE-004`
- `origin/feat/T-NOT-002-news-origin`
- `origin/codex/figma-web-handoff`

Regra recomendada para limpeza:

1. Confirmar que nao ha PR aberta.
2. Confirmar que o conteudo esta mergeado em `main` ou arquivado em tag/release.
3. Confirmar que a branch nao e ambiente/protegida.
4. Solicitar aprovacao explicita do mantenedor.
5. Deletar local/remoto em tarefa separada, sem `force push`, sem `reset --hard` e sem delecao automatica em lote.

## 8. Proximos passos recomendados

1. Responsavel Vercel: executar checklist de dashboard e registrar evidencia da configuracao final.
2. QA/acessibilidade: executar roteiro real com NVDA ou Narrator e anexar resultado.
3. Maintainer GitHub: manter workflow como esta, salvo novo warning real de Actions; se precisar alterar workflow, usar token com escopo `workflow`.
4. Maintainer repo: aprovar explicitamente, em tarefa separada, quais branches podem ser limpas.
