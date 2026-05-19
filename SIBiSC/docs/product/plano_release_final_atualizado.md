# Plano de Release Final Atualizado - SIBiSC/Feltrim Agents

Data: 2026-05-19  
Workspace: `Web_Mobile`  
App: `SIBiSC`  
Branch local no momento da leitura: `fix/sibisc-visual-regressions`  
Status local inicial: branch alinhada com `origin/fix/sibisc-visual-regressions`, sem alteracoes locais antes da criacao deste documento.

## 1. Resumo executivo

A recomendacao atual e **revisar e mergear o PR #61 antes do PR #59**.

Motivo: o PR #61 corrige regressoes visuais percebidas depois do hardening, esta `MERGEABLE`, com `mergeStateStatus: CLEAN`, QA Gate verde, Vercel verde e Netlify preview verde. O PR #59 continua tecnicamente mergeable, mas esta `UNSTABLE` por checks Netlify externos falhando e toca alguns dos mesmos arquivos de Home/estilos. Mergear #61 primeiro estabiliza a experiencia visual em `main`; em seguida, o PR #59 deve ser atualizado contra `main` para preservar as correcoes visuais junto com as melhorias de acessibilidade, evidencias e hardening.

O release final ainda nao deve ser considerado GO irrestrito ate que:

- o dominio publico Vercel seja validado no dashboard e em producao;
- o roteiro com leitor de tela real seja executado e registrado;
- o PR #59 seja revalidado depois da entrada do PR #61;
- a decisao sobre Netlify seja explicitada como nao bloqueante ou resolvida como check obrigatorio.

## 2. Estado atual dos PRs

### PRs abertos

| PR | Branch | Estado | Mergeability | Checks principais | Leitura |
| --- | --- | --- | --- | --- | --- |
| #61 - `Fix SIBiSC visual regressions` | `fix/sibisc-visual-regressions` -> `main` | `OPEN` | `MERGEABLE`, `CLEAN` | QA Gate P0/P1 verde, Vercel verde, Netlify preview verde | Pronto para review prioritario. |
| #59 - `Finalize SIBiSC Sprint 3 hardening release` | `release/sibisc-hardening-sprint3` -> `main` | `OPEN` | `MERGEABLE`, `UNSTABLE` | QA Gate P0/P1 verde, Vercel verde, Netlify failure | Bom candidato de release, mas precisa ser atualizado/revalidado apos #61. |

### PR ja resolvido

| PR | Branch | Estado | Impacto |
| --- | --- | --- | --- |
| #60 - `fix(sibisc): consolidate deploy 404 configuration` | `fix/sibisc-deploy-404` -> `main` | `MERGED` em 2026-05-19 15:05 UTC | Consolida configuracao raiz de deploy para Vercel/Netlify e reduz risco de 404 por root/output incorreto. |

### Issues abertas relacionadas

Ainda existem issues R1/R1.1 abertas de QA, docs, dados e operacao minima, incluindo `US-MVP-QA-001`, `T-QA-001` a `T-QA-004`, `T-BASE-001/002/004`, `T-OPS-001/003` e `T-ACV-003`. Para este release, elas devem ser tratadas como backlog ou criterios de aceite apenas se o escopo da entrega final exigir fechamento formal dessas issues.

## 3. Ordem recomendada de merge

### Ordem recomendada

1. Review humano do PR #61.
2. Merge do PR #61 em `main`, se o review confirmar que a correcao visual esta adequada.
3. Atualizar o PR #59 contra o novo `main` (`rebase` ou merge de `main` na branch, conforme preferencia operacional).
4. Resolver eventuais conflitos em `HomePage.jsx`, `HomePageMobile.jsx` e `globals.css`.
5. Reexecutar validacoes do PR #59 depois da atualizacao.
6. Review humano do PR #59 com foco em acessibilidade, evidencias e release notes.
7. Executar e registrar leitor de tela real.
8. Merge final do PR #59.
9. Validar producao no dominio publico Vercel.

### Justificativa

O PR #61 e menor, mais recente e corrige diretamente a percepcao visual da entrega. Ele tambem esta limpo para merge e com os checks relevantes verdes. O PR #59 e maior e contem evidencias de release, Lighthouse, screenshots e hardening. Como #59 e #61 alteram arquivos comuns, principalmente Home e estilos globais, a sequencia #61 -> atualizar #59 reduz a chance de publicar uma release tecnicamente correta mas visualmente regressiva.

Mergear #59 antes de #61 tambem e possivel do ponto de vista Git, mas aumenta o risco de o PR visual precisar ser reinterpretado sobre uma base com hardening, alem de deixar `main` temporariamente com uma experiencia visual que ja foi identificada como regressiva.

## 4. Riscos de conflito

### Risco alto/moderado

Arquivos tocados por #59 e #61:

- `SIBiSC/src/pages/HomePage.jsx`
- `SIBiSC/src/pages/HomePageMobile.jsx`
- `SIBiSC/src/styles/globals.css`

Risco: conflitos ou regressao sem conflito textual. O caso mais provavel nao e apenas conflito Git; e uma combinacao onde uma mudanca de acessibilidade/hardening do #59 e uma mudanca visual do #61 coexistem, mas precisam de nova validacao manual.

### Risco baixo

Arquivos exclusivos do #61:

- `SIBiSC/src/components/layout/AppLayout.jsx`
- `SIBiSC/src/components/layout/AppLayout.module.css`
- `SIBiSC/src/components/layout/BottomNav.module.css`
- `SIBiSC/src/pages/HomePage.module.css`
- `SIBiSC/src/pages/HomePageMobile.module.css`
- `SIBiSC/docs/qa/visual_regressions_fix.md`

Arquivos exclusivos do #59:

- `SIBiSC/docs/product/release_go_no_go_sprint3.md`
- `SIBiSC/docs/qa/sprint3_hardening_release.md`
- evidencias Lighthouse e screenshots em `SIBiSC/docs/qa/`

Risco: baixo para conflito textual, mas alto volume documental em #59 exige review cuidadoso para evitar ruido na release.

## 5. Relacao entre visual fix, hardening e deploy 404

### Correcao visual (#61)

O PR #61 estabiliza a composicao da Home, Home mobile, header, bottom nav e rodape de bibliotecas. Ele responde a regressoes visuais percebidas pelo usuario e deve ser considerado prerequisito de qualidade visual antes do release final.

### Hardening/release (#59)

O PR #59 documenta e aplica hardening de acessibilidade, `prefers-reduced-motion`, evidencias Lighthouse, smokes Edge e criterios Go/No-Go. Ele e a camada de release final, mas deve ser recalibrado depois que a base visual correta entrar em `main`.

### Deploy 404 (#60)

O PR #60 ja entrou em `main` e reduziu o risco de deploy incorreto em monorepo ao consolidar configuracoes raiz. Ele nao substitui a acao no dashboard Vercel: o diagnostico ainda aponta para alias/dominio/protecao de deployment como fonte provavel do 404 publico.

Leitura combinada: #60 corrige a infraestrutura versionada, #61 corrige a experiencia visual, #59 fecha a release com evidencias e criterios de aceite.

## 6. Checklist Vercel dashboard

Objetivo: resolver e confirmar o dominio publico `https://sibisc-hub-cultural.vercel.app`.

- Abrir `https://vercel.com/rafeltrims-projects/sibisc-hub-cultural`.
- Em `Settings > Git`, confirmar:
  - repository: `RaFeltrim/sibisc-hub-cultural`;
  - production branch: `main`;
  - root directory: preferencialmente `SIBiSC`, ou raiz do repo usando o `vercel.json` raiz do PR #60;
  - build command coerente com o root escolhido;
  - output directory coerente com o root escolhido.
- Em `Settings > Domains`, confirmar:
  - `sibisc-hub-cultural.vercel.app` esta associado ao projeto correto;
  - nenhum alias antigo aponta para deployment inexistente;
  - o dominio esperado aparece como dominio de producao.
- Em `Deployments`, abrir o ultimo deployment de `main` depois do merge final:
  - confirmar commit/branch;
  - confirmar status `Ready` ou equivalente;
  - se necessario, usar `Promote to Production` ou `Redeploy`.
- Em `Deployment Protection`, decidir:
  - para apresentacao publica, producao deve estar publica;
  - se a protecao for mantida, documentar forma de acesso sem commitar bypass token.
- Validar manualmente:
  - `https://sibisc-hub-cultural.vercel.app`;
  - `https://sibisc-hub-cultural.vercel.app/home-mobile`;
  - `https://sibisc-hub-cultural.vercel.app/catalogo`;
  - `https://sibisc-hub-cultural.vercel.app/catalogo/b1`;
  - `https://sibisc-hub-cultural.vercel.app/perfil`;
  - `https://sibisc-hub-cultural.vercel.app/eventos`.

## 7. Checklist leitor de tela real

Status atual: pendente operacional. Continua bloqueante para GO final irrestrito.

Ambiente recomendado:

- Windows + NVDA + Edge, ou macOS + VoiceOver + Safari/Chrome.
- Preview do PR #59 atualizado apos merge do #61, ou producao final se o teste for feito apos merge.

Roteiro minimo:

- Navegar por teclado em `/`, `/home-mobile`, `/catalogo`, `/catalogo/b1`, `/perfil` e `/eventos`.
- Confirmar titulo/landmarks principais e ausencia de armadilha de foco.
- Na Home, alternar perguntas guiadas e confirmar anuncio da resposta em regiao viva.
- Na Home mobile, confirmar que header e bottom nav nao escondem controles e que o foco segue ordem logica.
- No Catalogo, buscar por `vidas` e confirmar anuncio do status da busca.
- No Detalhe, navegar pelas unidades e confirmar que disponibilidade/estado sao compreensiveis.
- No Perfil, alternar abas Emprestimos/Historico/Favoritos e confirmar relacao tab/painel.
- No Perfil, acionar Renovar e Remover favorito e confirmar mensagem de status.
- Em Eventos, abrir detalhe e acionar Google Calendar, confirmando aviso de nova aba.
- Registrar data, navegador, leitor, pessoa validadora, rotas testadas e achados.

Criterio de aceite: nenhum controle sem nome acessivel, nenhum fluxo principal impossivel sem mouse, estados selecionados compreensiveis e mensagens dinamicas anunciadas.

## 8. Decisao Netlify

Recomendacao: **Netlify nao deve bloquear o release de produto se Vercel for o canal oficial de entrega**.

Justificativa:

- O PR #59 esta `UNSTABLE` por failures do Netlify, mas QA Gate e Vercel passaram.
- O diagnostico do deploy 404 ja indicava que Netlify possui risco de configuracao externa de base/publish.
- O PR #61 mostra Netlify preview verde, sugerindo que a falha do #59 pode ser externa, transient ou ligada a estado/configuracao especifica do preview.

Excecao: se Netlify estiver marcado como required check no GitHub ou se for exigido pela disciplina como ambiente de entrega, entao ele vira bloqueador processual ate ser corrigido ou formalmente removido/dispensado como required check.

## 9. Sequencia final ate release

- Revisar PR #61, incluindo comparacao visual nas rotas `/` e `/home-mobile`.
- Mergear PR #61 em `main` se aprovado.
- Atualizar PR #59 contra `main`.
- Conferir conflito e regressao nos arquivos compartilhados: `HomePage.jsx`, `HomePageMobile.jsx`, `globals.css`.
- Reexecutar validacoes locais do #59 atualizado:
  - `npm run qa:repo`;
  - `npm run qa:ci`;
  - smoke visual nas rotas principais;
  - lints/diagnosticos dos arquivos tocados.
- Aguardar checks remotos do #59 atualizado.
- Reavaliar Netlify: nao bloqueante se Vercel for oficial; bloqueante se required check.
- Executar leitor de tela real e registrar evidencia.
- Review humano final do #59.
- Mergear #59.
- Validar producao Vercel e dominio publico.
- Registrar status final e qualquer pendencia pos-release.

## 10. Matriz Go/No-Go

| Criterio | Status atual | Decisao |
| --- | --- | --- |
| PR #61 visual | QA Gate, Vercel e Netlify verdes; mergeability limpa | GO para review/merge prioritario. |
| PR #59 hardening | QA Gate e Vercel verdes; Netlify falhando; mergeable mas unstable | GO condicional para manter em review; NO-GO para merge antes de atualizar apos #61. |
| Conflitos entre #61 e #59 | Risco em Home/Home mobile/globals | NO-GO para merge final do #59 sem revalidacao apos #61. |
| Deploy 404 publico | PR #60 mergeado, mas dashboard Vercel ainda precisa confirmacao | NO-GO para release publica se dominio continuar 404/401/protegido. |
| Leitor de tela real | Pendente | NO-GO para GO final irrestrito. |
| Netlify | Falha em #59, sucesso em #61 | Nao bloqueante para produto se Vercel for oficial; bloqueante se required check. |
| QA Gate GitHub | P0/P1 verdes em #59 e #61 | GO tecnico para continuidade. |
| Review humano | Pendente nos PRs abertos | NO-GO para merge automatico. |

## 11. Comentarios nos PRs

Nao foi feito comentario automatico em PR.

Recomendacao:

- Comentar no PR #61 apenas se o documento de planejamento for mantido em branch/documentacao compartilhada, avisando que ele deve entrar antes do #59.
- Comentar no PR #59 depois do merge do #61, informando que a branch precisa ser atualizada contra `main` e revalidada por causa dos arquivos compartilhados.

## 12. Decisoes pendentes do usuario

- Confirmar se #61 pode ser priorizado para merge antes de #59.
- Confirmar se Netlify e required check/processo obrigatorio ou apenas preview secundario.
- Executar ou delegar a validacao com leitor de tela real.
- Resolver no dashboard Vercel a exposicao publica do dominio.
- Decidir se este documento deve ser commitado em branch propria/documental ou anexado a algum PR existente. A recomendacao e nao misturar este plano ao PR #61 sem decisao explicita.
