# Reuniao de Proximos Passos Pos-Analises - SIBiSC/Feltrim Agents

Data: 2026-05-18/19  
Workspace: `C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP`  
Repositorio pai: `Web_Mobile`  
App: `Web_Mobile/SIBiSC`  
Formato: reuniao simulada do time completo para decidir proximas acoes apos Sprint 0, auditoria de branches e auditoria do `portfolio`.

## 1. Participantes e papeis

| Papel | Responsabilidade nesta reuniao |
| --- | --- |
| PO | Confirmar valor, linguagem do MVP, escopo e criterios de aceite de produto. |
| PM | Ordenar prioridades, dependencias, cronograma e plano de 48h/7 dias. |
| GP | Garantir governanca, rastreabilidade, decisoes formais e protecao do trabalho atual. |
| TL | Avaliar integracao tecnica, branch strategy, contratos e limites de arquitetura. |
| QA/SDET | Validar gates, evidencias, regressao minima e criterios de Go/No-Go. |
| SE | Revisar riscos de seguranca, privacidade, promessa de IA e dados sensiveis. |
| Sofia/Claudia | Definir feedback de usuario, registro operacional, status, SLA e devolutiva. |

## 2. Estado atual objetivo

| Trilha | Estado observado | Implicacao |
| --- | --- | --- |
| Sprint 0 | Implementada, corrigida pos-review e commitada localmente em `dev` no commit `1b74769 feat(sibisc): consolidate feltrim agents sprint 0`. | Existe baseline local revisavel. Falta publicar ou preparar PR, se Rafael autorizar. |
| Git remoto | `dev` esta `ahead 1` de `origin/dev`. | Push ainda nao foi feito. O trabalho esta protegido localmente, mas nao esta publicado. |
| Worktree | `portfolio` aparece como gitlink modificado; `SIBiSC/.playwright-cli/`, `auditoria_portfolio_local.md` e `auditoria_portfolio_ambiente.md` estao nao rastreados. | Antes de qualquer organizacao Git, revisar o que deve entrar no proximo commit e o que deve ficar fora. |
| Evidencias Sprint 0 | `ReadLints`, `qa:repo`, `qa:ci` e smoke Playwright foram registrados como aprovados nas evidencias da Sprint 0. | Sprint 0 pode ser tratada como marco local consolidado. |
| Branches | Manter/proteger `main`, `dev`, `test`, `hom`, `prd`, `codex/figma-web-handoff` e `feat/T-NOT-002-news-origin`. | Limpeza so depois de proteger baseline e com aprovacao explicita. |
| Portfolio | `Web_Mobile/portfolio` e repo Git proprio em `main`, remoto `https://github.com/RaFeltrim/portfolio.git`, atualizado; no pai aparece como gitlink `160000` sem `.gitmodules`. | Tratar como repo separado e resolver gitlink em etapa planejada, com backup/revisao antes. |
| Sprint 1 | Continua NO-GO. | Bloqueada por decisoes de MVP, Go/No-Go, feedback Sofia/Claudia e fonte/sync de disponibilidade. |

Observacao de versionamento: `SIBiSC/docs/product/auditoria_portfolio_ambiente.md` existe como relatorio recem-criado e nao rastreado. Ele precisa entrar no proximo commit ou ser incluido em um commit de organizacao, junto da decisao sobre `auditoria_portfolio_local.md`.

## 3. Decisoes ja tomadas

- A Sprint 0 foi consolidada como baseline local do prototipo guiado, com correcoes pos-review aplicadas.
- A Sprint 1 nao deve iniciar enquanto Rafael nao fechar linguagem/escopo do MVP, criterio Go/No-Go, processo Sofia/Claudia e fonte oficial/sync de disponibilidade.
- O produto deve ser comunicado como assistente guiado de descoberta no MVP, nao como chat aberto de IA, backend real, reserva real ou catalogo oficial em tempo real.
- `main`, `dev`, `test`, `hom`, `prd`, `codex/figma-web-handoff` e `feat/T-NOT-002-news-origin` nao devem ser apagadas nesta etapa.
- `portfolio` deve ser tratado como repo separado. Formalizar submodulo so faria sentido se Rafael decidir que o portfolio precisa fazer parte do checkout do `Web_Mobile`.
- Qualquer limpeza de branch, gitlink ou arquivo local deve acontecer apenas depois de proteger o trabalho atual e com comando explicito de Rafael.

## 4. Pendencias criticas

| Pendencia | Dono sugerido | Bloqueio gerado |
| --- | --- | --- |
| Decidir push direto de `dev` ou PR de consolidacao da Sprint 0. | Rafael + GP + TL | Publicacao do baseline e inicio seguro da proxima fase. |
| Revisar nao rastreados e decidir o que entra no proximo commit. | GP + TL + QA/SDET | Evita perder evidencias ou misturar artefatos temporarios. |
| Resolver `portfolio` como repo separado, com backup/revisao antes do gitlink. | Rafael + TL + SE | Reduz confusao de status e risco de perda de material pessoal/profissional. |
| Fechar linguagem e escopo do MVP Feltrim Agents. | Rafael + PO + Sofia | Libera ou bloqueia Sprint 1. |
| Definir criterio formal de Go/No-Go. | Rafael + QA/SDET + GP | Evita avancar por avaliacao informal. |
| Definir ferramenta/processo Sofia/Claudia. | Rafael + Sofia + Claudia + PM | Feedback sem rastreabilidade bloqueia beta e Sprint 1 operacional. |
| Definir fonte/sync de disponibilidade futura. | Rafael + PO + TL | Evita que mock local seja interpretado como dado oficial. |

## 5. Proximas acoes por prioridade

### 5.1 Publicar/push ou preparar PR da Sprint 0

Opcoes:

| Opcao | Como funciona | Vantagem | Risco |
| --- | --- | --- | --- |
| Push direto de `dev` | Publicar o commit local `1b74769` em `origin/dev`. | Rapido, preserva baseline remoto e reduz risco de perda local. | Menos oportunidade de revisao formal antes da publicacao. |
| PR de consolidacao | Publicar branch/estado e abrir PR com resumo de validacoes. | Melhor rastreabilidade, revisao e discussao de riscos. | Leva mais tempo e ainda exige decidir base/fluxo correto. |
| Manter local por enquanto | Nao publicar ainda. | Evita publicar antes da revisao de nao rastreados. | Mantem risco de trabalho importante ficar apenas local. |

Recomendacao do time: preparar publicacao controlada da Sprint 0, preferencialmente com PR de consolidacao se Rafael quiser revisao formal; se a prioridade for preservar rapidamente o baseline, fazer push de `dev` apos confirmar que o commit `1b74769` e o estado esperado. Em ambos os casos, nao misturar `portfolio` e artefatos nao rastreados sem decisao previa.

### 5.2 Resolver `portfolio` gitlink com backup/revisao antes

Ordem recomendada:

1. Revisar o status do repo `portfolio` e seus itens nao rastreados.
2. Preservar ou versionar o que pertence ao repo `portfolio` antes de mexer no pai.
3. Confirmar que `portfolio` deve ficar como repo separado.
4. Em etapa futura planejada, remover o gitlink do indice do `Web_Mobile` ou formalizar submodulo, conforme decisao de Rafael.

Recomendacao do time: manter `portfolio` como repo separado e remover o gitlink do indice do pai apenas em commit planejado, depois de backup/revisao dos nao rastreados. Nao executar `git rm`, mover pastas ou limpar arquivos nesta reuniao.

### 5.3 Limpeza de branches somente apos proteger trabalho atual

Ordem recomendada:

1. Publicar ou formalizar o baseline da Sprint 0.
2. Repetir auditoria read-only das refs locais/remotas.
3. Confirmar com Rafael quais branches representam ambiente, marco academico ou automacao.
4. Criar tag/registro antes de apagar qualquer marco relevante, se necessario.
5. Executar limpeza apenas com aprovacao explicita e comandos especificos.

Recomendacao do time: nenhuma delecao agora. Branches de ambiente, branch atual e trilhas historicas protegidas continuam intocaveis.

### 5.4 Decisoes para liberar Sprint 1

Sprint 1 so recebe GO quando Rafael decidir:

- Linguagem oficial: "assistente guiado de descoberta" no MVP.
- Escopo: painel/perguntas guiadas e recomendacoes explicaveis, sem chat aberto.
- Go/No-Go: P0 zero, P1 mitigado com dono, evidencias QA e decisao PO/QA/GP.
- Feedback Sofia/Claudia: ferramenta, template, status, SLA e devolutiva.
- Disponibilidade: mock academico rotulado agora; fonte oficial/sync apenas como evolucao planejada.
- Reserva real, IA real, catalogo oficial e gamificacao: fora da Sprint 1, salvo decisao explicita com contrato e QA.

### 5.5 Preparacao de feedback Sofia/Claudia

Proposta minima:

| Elemento | Decisao sugerida |
| --- | --- |
| Canal | Documento, issue, quadro, Notion/Jira ou formulario simples. Escolher o menor canal rastreavel agora. |
| Template | ID, rota, dispositivo, navegador, passos, esperado, observado, evidencia, tipo, impacto, severidade, dono, status e retorno. |
| Status | Recebido, em analise, planejado, corrigido, contornado, nao aplicavel. |
| SLA | P0 imediato, P1 na sprint, P2 no backlog priorizado, P3 quando houver folga. |
| Devolutiva | Sofia escreve retorno em linguagem simples; Claudia garante registro e fechamento. |

Recomendacao do time: iniciar com canal simples e rastreavel antes de implementar formulario in-app. O formulario pode virar historia futura quando o processo ja estiver validado.

## 6. Riscos e mitigacao

| Risco | Impacto | Mitigacao |
| --- | --- | --- |
| Baseline da Sprint 0 ficar apenas local | Perda de rastreabilidade e maior risco operacional. | Rafael decidir push/PR em ate 48h. |
| Misturar Sprint 0 com limpeza de `portfolio` ou branches | Dificulta review e pode gerar perda/confusao de historico. | Separar commits: baseline, organizacao de docs, portfolio e branches. |
| Remover gitlink sem revisar nao rastreados do `portfolio` | Perda de material pessoal/profissional ou staging. | Backup/revisao antes de qualquer `git rm --cached` ou movimentacao. |
| Apagar branch historica ou de ambiente | Perda de marco academico, QA, hom/prd ou trilha de automacao. | Manter branches protegidas e exigir aprovacao explicita. |
| Iniciar Sprint 1 sem decisoes de produto | Escopo cresce para IA/chat/reserva sem base tecnica. | Manter NO-GO ate matriz de Rafael ser fechada. |
| Feedback Sofia/Claudia sem ferramenta | Relatos soltos, sem SLA nem reproducao. | Definir template e status antes do beta. |
| Mock de disponibilidade parecer oficial | Usuario pode confiar em dado nao sincronizado. | Rotular origem local/prototipo e planejar fonte oficial futura. |
| Comunicar IA real sem backend/guardrails | Risco de expectativa falsa, privacidade e seguranca. | Usar "assistente guiado" e adiar IA real para fase condicionada. |

## 7. Matriz de decisoes para Rafael

| Decisao | Opcao recomendada | Impacto | Quando decidir |
| --- | --- | --- | --- |
| Publicar Sprint 0 | Preparar PR de consolidacao; se quiser preservar rapido, push de `dev` apos revisao curta. | Transforma `1b74769` em baseline remoto/revisavel. | Em ate 48h. |
| Incluir relatorios de portfolio | Incluir `auditoria_portfolio_ambiente.md` e `auditoria_portfolio_local.md` no proximo commit de organizacao, se aprovados. | Preserva diagnostico que justifica resolver gitlink. | Antes do commit de organizacao. |
| Tratar `.playwright-cli/` | Revisar se e evidencia util ou artefato temporario antes de versionar. | Evita commitar ruido de ferramenta ou perder evidencia relevante. | Antes do proximo commit. |
| Resolver `portfolio` | Manter como repo separado e remover gitlink do pai em etapa futura, apos backup/revisao. | Corrige estrutura do `Web_Mobile` sem apagar conteudo local. | Apos baseline Sprint 0 estar protegido. |
| Limpar branches | Adiar; repetir auditoria read-only e aprovar branch por branch. | Reduz risco de apagar ambiente, marco academico ou trilha de agente. | Depois de push/PR da Sprint 0 e revisao do portfolio. |
| Linguagem do MVP | Aprovar "assistente guiado de descoberta". | Libera microcopy, criterios QA e backlog da Sprint 1. | Antes de Sprint 1. |
| Escopo Sprint 1 | Perguntas guiadas, recomendacoes explicaveis, fallback honesto e feedback minimo. | Evita entrar em IA real, chat aberto, reserva real e catalogo oficial. | Antes de Sprint 1. |
| Go/No-Go | P0 zero, P1 mitigado com dono, evidencias e aprovacao PO/QA/GP. | Da criterio objetivo para avancar ou bloquear. | Antes de Sprint 1 e ao fim de cada trilha. |
| Feedback Sofia/Claudia | Escolher canal simples e rastreavel agora. | Permite beta controlado e backlog reproduzivel. | Antes de Sprint 1 operacional. |
| Fonte de disponibilidade | Manter mock rotulado no MVP e planejar fonte oficial/sync futura. | Reduz promessa falsa e risco de decisao incorreta do usuario. | Antes de Sprint 1. |

## 8. Plano de 48h

1. Rafael decide se quer push direto de `dev` ou PR de consolidacao da Sprint 0.
2. GP/TL revisam rapidamente o escopo do commit `1b74769` e confirmam que nao ha acao Git pendente antes da publicacao.
3. GP registra que `auditoria_portfolio_ambiente.md` precisa entrar no proximo commit ou em commit de organizacao.
4. TL/SE revisam a lista de nao rastreados do `portfolio` e definem plano de backup/revisao, sem executar remocao.
5. PO/Sofia redigem linguagem final do MVP como assistente guiado.
6. QA/SDET confirma checklist de Go/No-Go para Sprint 1.
7. Claudia propoe canal/template inicial de feedback.

Saida esperada em 48h: baseline Sprint 0 com decisao de publicacao, matriz de decisoes preenchida por Rafael e plano seguro para `portfolio`.

## 9. Plano de 7 dias

1. Publicar ou abrir PR da Sprint 0, se Rafael aprovar.
2. Criar commit separado de organizacao documental, incluindo relatorios de auditoria de portfolio se aprovados.
3. Executar backup/revisao do `portfolio` e decidir entre remover gitlink do pai ou formalizar submodulo.
4. Repetir auditoria read-only de branches apos baseline protegido.
5. Fechar Sprint 1 em historias pequenas: perguntas guiadas, recomendacoes explicaveis, fallback honesto e feedback minimo.
6. Definir ferramenta Sofia/Claudia e rodar piloto interno com 3 a 5 avaliadores.
7. Fazer reuniao Go/No-Go da Sprint 1 com PO, PM, GP, TL, QA/SDET, SE, Sofia e Claudia.

Saida esperada em 7 dias: Sprint 0 publicada ou formalmente preservada, `portfolio` com plano estrutural aprovado, branches sem limpeza prematura e Sprint 1 pronta apenas se receber GO formal.

## 10. Go/No-Go por trilha

| Trilha | Status atual | GO quando | NO-GO se |
| --- | --- | --- | --- |
| Sprint 0 | GO local, aguardando decisao de publicacao. | Rafael autorizar push/PR ou registrar decisao formal de manter local temporariamente. | Publicacao misturar artefatos nao decididos ou baseline ficar indefinidamente so local. |
| Git/branches | NO-GO para limpeza. | Baseline protegido, auditoria read-only atualizada e aprovacao explicita branch por branch. | Houver tentativa de delete, prune, checkout/reset ou limpeza com worktree/confusao pendente. |
| Portfolio | NO-GO para alteracao estrutural imediata. | Backup/revisao dos nao rastreados concluida e Rafael decidir repo separado vs submodulo. | Houver `git rm`, movimentacao ou limpeza antes de preservar conteudo local. |
| Sprint 1 | NO-GO. | Linguagem, escopo, Go/No-Go, feedback Sofia/Claudia e disponibilidade forem decididos. | Pedidos de IA real, chat aberto, reserva real ou catalogo oficial entrarem sem contrato, fonte e QA. |
| Feedback usuario | Parcial, ainda sem ferramenta oficial. | Canal, template, status, SLA e devolutiva estiverem definidos. | Feedback ficar em conversa solta, sem dono, severidade, evidencia ou retorno. |

## 11. Encerramento e recomendacao central

Consenso do time: a prioridade nao e iniciar Sprint 1 nem limpar historico; e proteger a Sprint 0, separar corretamente o problema do `portfolio`, manter branches importantes intactas e fechar as decisoes de Rafael que destravam o proximo ciclo.

Recomendacao central: **publicar ou preparar PR da Sprint 0 em ate 48h, resolver `portfolio` apenas depois de backup/revisao, adiar limpeza de branches e manter Sprint 1 em NO-GO ate Rafael fechar a matriz de decisoes.**
