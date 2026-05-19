# Replanejamento de Execucao Pos-Sprint 0 - SIBiSC/Feltrim Agents

Data: 2026-05-18/19  
Formato: reuniao simulada do time completo  
Escopo: replanejar a execucao apos Sprint 0, code review, correcoes pos-review e auditoria de branches.  
Restricao operacional: este documento planeja proximas acoes, sem executar commit, push, checkout, reset, delecao de branch ou limpeza destrutiva.

## 1. Veredito executivo

O time considera a Sprint 0 consolidada como baseline local de prototipo guiado. As validacoes registradas passaram: `ReadLints`, `qa:repo`, `qa:ci` e smoke Playwright nos fluxos criticos cobertos. As correcoes pos-review reduziram riscos relevantes de seguranca, tratamento de erro, busca assistida, Calendar, mutacao em service e guard de QA.

A recomendacao central permanece: **NO-GO para Sprint 1 ate Rafael fechar as decisoes de produto, operacao de feedback e fonte oficial/sync de disponibilidade**. O proximo passo nao e criar feature nova; e salvar o estado atual quando Rafael autorizar, fazer uma revisao final curta, decidir se abre PR e preparar Sprint 1 em historias pequenas.

O time tambem recomenda manter a auditoria de branches em modo conservador. `main`, `dev`, `test`, `hom`, `prd`, `codex/figma-web-handoff` e `feat/T-NOT-002-news-origin` nao devem ser apagadas agora. A worktree esta suja com trabalho relevante da Sprint 0/Feltrim Agents; qualquer checkout, reset, prune ou delecao antes de salvar/revisar esse estado aumenta risco de perda e confusao de historico.

## 2. Bases da reuniao

- `docs/product/plano_sprints_finalizacao.md`
- `docs/product/avaliacao_time_completo_sprints_finais.md`
- `docs/qa/code_review_sprint0_tl_se.md`
- `docs/qa/sprint0_evidencias_validacao.md`
- `docs/product/plano_organizacao_branches.md`
- `docs/product/multiagent_execution_log.md`
- `docs/product/multiagent_integration_contract.md`
- `docs/product/relatorio_sofia_feedback_usuario.md`
- `git status --short --branch` em leitura: branch atual `dev`, worktree suja com alteracoes e documentos da Sprint 0/Feltrim Agents.

## 3. Estado atual consolidado

| Tema | Situacao | Implicacao |
| --- | --- | --- |
| Sprint 0 | Implementada, revisada, corrigida e validada localmente. | Pode virar baseline se Rafael autorizar commit/PR. |
| Sprint 1 | Continua bloqueada. | Nao iniciar implementacao nova antes de decisoes pendentes. |
| Qualidade | `ReadLints`, `qa:repo`, `qa:ci` e smoke Playwright registrados como verdes. | Manter estes gates como baseline minimo. |
| Produto | MVP recomendado como assistente guiado de descoberta. | Evitar promessa de IA real, chat aberto, reserva real ou catalogo oficial. |
| Dados | Catalogo local e IDs canonicos `b1..b8` estao protegidos por contrato/guard. | Expansao de catalogo exige atualizar contrato versionado. |
| Feedback | Sofia/Claudia possuem modelo conceitual, mas falta ferramenta/processo oficial. | Bloqueia beta e Sprint 1 operacional. |
| Branches | Branch atual `dev`; worktree suja; branches de ambiente e historicas protegidas. | Salvar/revisar antes de qualquer limpeza. |

## 4. Reuniao por papel

### 4.1 PO - valor, MVP e decisoes de Rafael

Parecer: o valor do SIBiSC/Feltrim Agents esta claro quando o produto se apresenta como uma camada de descoberta orientada ao usuario, nao como substituto do SIBI/PHL nem como IA transacional.

Decisao recomendada de MVP: **Feltrim Agents como assistente guiado de descoberta**, com busca local, recomendacoes explicaveis, perfil demonstrativo, eventos, noticias e limites visiveis. Chat aberto, IA real, reserva real, catalogo oficial e gamificacao devem ficar como evolucoes condicionadas.

Decisoes que Rafael precisa fechar antes da Sprint 1:

- Linguagem oficial do MVP: recomendacao do PO e "assistente guiado de descoberta".
- Escopo da Sprint 1: painel/fluxo guiado, nao chat conversacional real.
- Reserva: fora do MVP, com orientacao de retirada ou evolucao futura.
- Fonte futura de disponibilidade: SIBI/PHL, Supabase, API propria, importacao controlada ou mock academico assumido.
- Preferencias: manter demonstrativas ou implementar edicao simples.
- Nivel de disclaimer na demo e no beta.

### 4.2 PM - roadmap e priorizacao pos-Sprint 0

Parecer: o roadmap precisa ganhar uma fase intermediaria entre "Sprint 0 validada" e "Sprint 1 em desenvolvimento". Essa fase reduz risco de historico, branches e decisoes abertas.

Roadmap replanejado:

| Fase | Nome | Objetivo | Saida esperada |
| --- | --- | --- | --- |
| Fase A | Consolidacao do baseline | Revisar estado atual e salvar quando Rafael autorizar. | Commit/PR opcional autorizado ou decisao formal de manter local temporariamente. |
| Fase B | Decisoes Sprint 1 | Fechar linguagem, escopo, feedback e Go/No-Go. | Matriz de decisoes assinada por Rafael. |
| Fase C | Preparacao de historias | Quebrar Sprint 1 em itens pequenos e testaveis. | Backlog Ready com criterios de aceite e QA pairing. |
| Fase D | Sprint 1 guiada | Implementar somente o MVP guiado aprovado. | Incremento demonstravel sem IA/backend/reserva real. |
| Fase E | Feedback/beta | Operar Sofia/Claudia e coletar evidencias. | Feedback rastreavel, triado e com devolutiva. |
| Fase F | Limpeza de branches | Revisar candidatas e limpar apenas com aprovacao explicita. | Branches arquivadas/deletadas com seguranca, se aplicavel. |

Priorizacao imediata:

1. Salvar estado atual com autorizacao.
2. Decidir linguagem/escopo do MVP.
3. Definir ferramenta de feedback Sofia/Claudia.
4. Escrever historias pequenas da Sprint 1.
5. So entao iniciar implementacao.

### 4.3 GP - governanca, branches, cadencia e worktree suja

Parecer: a maior fragilidade operacional agora nao e codigo; e governanca do estado atual. A worktree suja contem codigo, scripts, docs e evidencias relevantes. Sem salvar/revisar, qualquer operacao de branch pode misturar Sprint 0 com futuras sprints.

Regras de governanca:

- Nao fazer checkout, reset, branch delete, prune, push ou commit sem comando explicito do Rafael.
- Tratar `dev` como branch de integracao atual e protegida enquanto a worktree estiver suja.
- Manter `main`, `dev`, `test`, `hom`, `prd`, `codex/figma-web-handoff` e `feat/T-NOT-002-news-origin` intocaveis nesta etapa.
- Registrar decisoes de Rafael em documento unico antes de Sprint 1.
- Usar cadencia curta: daily de 15 minutos focada em decisoes, P0/P1, evidencia e bloqueios.

Risco principal: se o time iniciar Sprint 1 sem salvar o baseline da Sprint 0, o trabalho futuro fica dificil de revisar, testar, abrir PR e reverter seletivamente.

### 4.4 TL - arquitetura, branch strategy, integracao e criterios tecnicos

Parecer: a arquitetura atual e suficiente para prototipo guiado local, mas ainda nao deve ser tratada como base de backend real. `userProfileService.js`, catalogo local, guard de QA e fallbacks formam uma borda boa para Sprint 1, desde que a Sprint 1 continue guiada e local.

Direcao tecnica:

- Preservar Sprint 0 como baseline.
- Separar "contrato Sprint 0" de "contrato expansivel" antes de adicionar `b9+` ou novas entidades.
- Extrair ou padronizar logica comum de busca/recomendacao desktop/mobile somente se a historia exigir e o risco compensar.
- Expandir testes/guards para eventos, noticias, unidades, Calendar e acessibilidade minima por demanda da Sprint 1.
- Nao conectar backend, Supabase real, IA generativa ou catalogo oficial sem origem, timestamp, fallback, privacidade e criterio QA.

Branch strategy recomendada:

- Trabalho atual fica em `dev` ate Rafael autorizar salvar.
- Se houver PR, preferir PR pequeno de consolidacao Sprint 0 a partir de `dev`, com descricao das validacoes e ressalvas.
- Para Sprint 1, criar branch nova somente depois do baseline salvo e revisado, usando prefixo humano e objetivo, por exemplo `feat/sprint1-feltrim-agents-guiado`.
- Limpeza de branches antigas so depois de PR/baseline e nova auditoria read-only.

Criterios tecnicos para liberar Sprint 1:

- `qa:repo` verde no baseline.
- `qa:ci` verde se houver codigo/dados.
- Smoke dos fluxos Home, Catalogo, Perfil, Eventos e recomendacao registrado.
- Decisoes de Rafael documentadas.
- Ferramenta de feedback definida.
- Nenhum P0/P1 tecnico conhecido sem dono.

### 4.5 Dev Front/Dados - incrementos implementaveis com baixo risco

Parecer: os proximos incrementos devem ser pequenos, reversiveis e testaveis. O foco e aumentar clareza e rastreabilidade, nao complexidade.

Historias candidatas para Sprint 1, se Rafael aprovar o MVP guiado:

| Historia | Escopo baixo risco | Criterio de aceite |
| --- | --- | --- |
| FA-01 - Perguntas guiadas | Lista de 8 a 10 perguntas principais com respostas baseadas em dados locais. | Cada resposta mostra fonte/limite e proxima acao. |
| FA-02 - Recomendacao explicavel | Melhorar motivo, origem e link das recomendacoes existentes. | Toda recomendacao aponta para livro real e explica por que apareceu. |
| FA-03 - Fallback honesto | Mensagem padrao quando nao houver dado seguro. | O assistente nao inventa disponibilidade, reserva, horario ou fonte. |
| FA-04 - Preferencias demonstrativas | Indicar que preferencias sao do prototipo ou liberar edicao simples se aprovado. | Usuario entende se pode ou nao alterar preferencias nesta versao. |
| FA-05 - Canal minimo de feedback | Link/formulario/documento visivel ou especificacao in-app simples. | Usuario sabe onde reportar recomendacao ruim ou confusao. |
| FA-06 - Guard expansivel | Versionar IDs esperados e preparar expansao controlada do catalogo. | `qa:repo` nao bloqueia expansao legitima se contrato for atualizado. |

Itens que nao devem entrar na Sprint 1 sem nova aprovacao:

- Chat aberto de IA.
- Integracao com API externa ou modelo generativo.
- Reserva real ou pre-reserva.
- Catalogo oficial com sincronizacao real.
- Gamificacao com regras persistidas.
- Coleta de dados pessoais ou analytics sem revisao de privacidade.

### 4.6 QA/SDET - gates, regressao, pairing e evidencias

Parecer: QA deve continuar com autoridade de bloqueio. A Sprint 0 produziu evidencias suficientes para baseline local, mas Sprint 1 so pode iniciar com criterios claros por historia.

Gates obrigatorios:

| Gate | Quando aplicar | Evidencia minima |
| --- | --- | --- |
| Refinamento QA + Dev | Antes de codar cada historia. | Casos felizes, bordas, mobile, acessibilidade e dados afetados. |
| Guard rapido | A cada mudanca de codigo/dados. | `npm run qa:repo` aprovado. |
| CI local | Quando houver codigo/dados. | `npm run qa:ci` aprovado ou justificativa formal. |
| Smoke manual/Playwright | Fluxos criticos alterados. | Passos, esperado, obtido e rotas cobertas. |
| Revalidacao | Apos bug corrigido. | Registro de correcao e resultado reexecutado. |
| Go/No-Go | Fim da fase ou sprint. | P0 zero, P1 mitigado, evidencias e decisoes registradas. |

Pareamento QA + Dev:

- QA participa do refinamento da historia antes da implementacao.
- Dev e QA combinam dados, riscos e evidencia esperada.
- QA valida em local/preview assim que a mudanca estiver testavel.
- O card nao vai para `done` sem "QA validado com Dev".

Regressao minima antes da Sprint 1:

- Home/Feltrim Agents -> recomendacao -> detalhe.
- Catalogo -> busca -> detalhe.
- Perfil -> emprestimos/historico/favoritos -> detalhe/remover.
- Eventos -> detalhe -> Google Calendar.
- Noticias e 404 como regressao final, mesmo que nao sejam bloqueio imediato.

### 4.7 Sofia/Claudia - feedback de usuario e operacao beta

Parecer Sofia: o produto pode gerar valor em beta controlado se o usuario entender que esta usando um prototipo guiado com dados locais. A promessa precisa ser repetida nos pontos de decisao.

Parecer Claudia: feedback sem ferramenta vira conversa solta. Antes da Sprint 1, o time precisa escolher o canal oficial e o status operacional.

Processo minimo recomendado:

1. Canal: escolher entre Markdown compartilhado, issue, quadro, Notion/Jira ou formulario in-app.
2. Template: `id`, rota, dispositivo, navegador, passos, esperado, observado, evidencia, tipo, impacto, severidade sugerida, dono, status e retorno.
3. Status: recebido, em analise, planejado, corrigido, contornado, nao aplicavel.
4. SLA: P0 imediato, P1 na sprint, P2 no backlog priorizado, P3 quando houver folga.
5. Devolutiva: Sofia escreve retorno em linguagem simples; Claudia garante registro e fechamento.

Recomendacao para beta: rodar primeiro com 3 a 5 avaliadores internos, medindo conclusao de tarefa, compreensao dos limites e utilidade das recomendacoes.

### 4.8 SE - seguranca, privacidade e comunicacao sobre IA

Parecer: os riscos criticos conhecidos da Sprint 0 foram mitigados para prototipo local, especialmente a remocao do script externo no HTML base e `noopener,noreferrer` no Calendar. Para Sprint 1, o risco muda de "codigo imediato" para "promessa, dados e privacidade".

Riscos e controles:

| Risco | Impacto | Controle recomendado |
| --- | --- | --- |
| Comunicar IA real sem backend/guardrails | Usuario confia em capacidade inexistente. | Usar "assistente guiado" e disclaimers nos pontos de decisao. |
| Disponibilidade mockada parecer oficial | Usuario pode tomar decisao errada de deslocamento. | Exibir origem local/prototipo e exigir fonte/timestamp antes de integracao real. |
| Coletar feedback com dados pessoais | Exposicao desnecessaria em docs/evidencias. | Minimizar dados, mascarar prints e evitar e-mail/telefone em logs. |
| Preferencias parecerem persistidas | Usuario acha que dados pessoais foram gravados. | Declarar preferencias demonstrativas ou implementar consentimento/persistencia real. |
| Analytics sem decisao | Coleta alem do necessario. | Instrumentar so eventos minimos e nao sensiveis, com decisao registrada. |
| Chat aberto futuro | Prompt injection, alucinacao, vazamento e custo. | Adiar ate haver fontes, guardrails, logs, avaliacao e criterio QA. |

## 5. Fases praticas replanejadas

### Fase A - Congelar e salvar baseline quando autorizado

Objetivo: transformar a Sprint 0 validada em unidade revisavel.

Acoes:

- Manter worktree atual sem checkout/reset/delete.
- Fazer revisao final de arquivos alterados e documentos gerados.
- Quando Rafael autorizar, criar commit ou PR de consolidacao da Sprint 0.
- Se Rafael preferir nao abrir PR ainda, registrar decisao e manter estado local com risco conhecido.

Saida: baseline salvo ou decisao formal de adiar salvamento.

### Fase B - Decisoes de Rafael

Objetivo: remover bloqueios da Sprint 1.

Acoes:

- Aprovar linguagem oficial do MVP.
- Aprovar escopo do Feltrim Agents guiado.
- Definir criterio Go/No-Go.
- Escolher ferramenta/processo Sofia/Claudia.
- Definir posicao sobre fonte oficial/sync de disponibilidade.

Saida: matriz de decisoes preenchida.

### Fase C - Preparacao da Sprint 1 em historias pequenas

Objetivo: deixar a Sprint 1 pronta sem iniciar codigo prematuramente.

Acoes:

- Quebrar o MVP guiado em historias pequenas.
- Escrever criterios de aceite por historia.
- Adicionar checklist QA + Dev por historia.
- Mapear evidencias esperadas.
- Definir o que fica explicitamente fora do escopo.

Saida: backlog Ready.

### Fase D - Execucao da Sprint 1

Objetivo: entregar incremento guiado com risco controlado.

Acoes:

- Implementar uma historia por vez.
- Rodar `qa:repo`/`qa:ci` conforme tipo de mudanca.
- Registrar smoke e evidencia por fluxo.
- Fazer revalidacao QA + Dev antes de `done`.

Saida: MVP guiado demonstravel e validado.

### Fase E - Feedback operacional e beta controlado

Objetivo: validar valor real sem aumentar promessa.

Acoes:

- Rodar piloto Sofia/Claudia com poucos usuarios/avaliadores.
- Registrar feedbacks com template e SLA.
- Classificar P0/P1/P2/P3.
- Converter achados em backlog priorizado.

Saida: aprendizado rastreavel e recomendacao Go/No-Go.

### Fase F - Limpeza de branches somente depois

Objetivo: organizar historico sem risco de perda.

Acoes:

- Repetir auditoria read-only com refs atualizadas de forma segura.
- Revisar branches candidatas com Rafael.
- Criar tag/registro antes de apagar qualquer marco academico, se necessario.
- Executar limpeza apenas com aprovacao explicita e comandos especificos.

Saida: branches organizadas sem afetar baseline ou entrega.

## 6. Matriz de decisoes para Rafael

| Decisao | Opcao A | Opcao B | Recomendacao do time | Bloqueia Sprint 1? |
| --- | --- | --- | --- | --- |
| Linguagem do MVP | Assistente guiado de descoberta | Assistente IA/chat | Aprovar assistente guiado de descoberta. | Sim |
| Escopo Feltrim Agents | Painel/perguntas guiadas | Chat conversacional real | Painel guiado na Sprint 1. | Sim |
| Go/No-Go | P0 zero + P1 mitigado + evidencias | Avaliacao informal | Gate formal com QA/PO/GP. | Sim |
| Feedback Sofia/Claudia | Documento/issue/quadro simples | Esperar formulario in-app | Escolher ferramenta simples agora. | Sim |
| Fonte de disponibilidade | Mock academico rotulado | Fonte oficial/sync agora | Manter mock rotulado; planejar fonte oficial. | Sim, ao menos como decisao |
| Reserva real | Fora do MVP | Integrar agora | Fora do MVP, com orientacao futura. | Sim |
| Preferencias | Demonstrativas | Edicao simples | Demonstrativas se prazo curto; edicao simples se historia pequena couber. | Parcial |
| Gamificacao | P2 apos confiabilidade | Antecipar visual | P2 apos feedback e confiabilidade. | Nao, se adiada |
| PR do baseline | Abrir PR de consolidacao | Manter local temporariamente | Abrir PR apos revisao, se Rafael autorizar. | Parcial |
| Limpeza de branches | Depois do baseline | Agora | Adiar limpeza destrutiva. | Nao, mas reduz risco |

## 7. Ordem operacional recomendada

1. **Salvar estado atual com seguranca**: revisar worktree e, quando Rafael autorizar, criar commit/PR de consolidacao da Sprint 0. Nao executar agora sem aprovacao.
2. **Fazer revisao final curta**: conferir se documentos, evidencias e validacoes refletem exatamente o baseline.
3. **Decidir abrir PR ou nao**: se abrir, PR deve ser de consolidacao Sprint 0, com `qa:repo`, `qa:ci`, ReadLints e smoke registrados.
4. **Fechar decisoes de Rafael**: linguagem, escopo MVP, Go/No-Go, feedback Sofia/Claudia e fonte oficial/sync.
5. **Preparar Sprint 1**: quebrar em historias pequenas com criterios de aceite e QA + Dev pairing.
6. **Iniciar Sprint 1 somente apos GO**: implementar assistente guiado, recomendacoes explicaveis, fallback honesto e feedback minimo conforme aprovado.
7. **Limpar branches depois**: repetir auditoria read-only, preservar marcos e deletar apenas com aprovacao explicita.

## 8. Backlog inicial sugerido para Sprint 1

| ID | Historia | Prioridade | Donos | Gate |
| --- | --- | --- | --- | --- |
| S1-01 | Definir 10 perguntas principais do Feltrim Agents guiado. | P0 | PO + Sofia + TL | PO aprova escopo e QA aprova matriz de casos. |
| S1-02 | Implementar painel/fluxo guiado baseado em dados locais. | P0 | Front + Dados + TL | `qa:repo`, `qa:ci`, smoke Home -> detalhe. |
| S1-03 | Exibir fonte, motivo e limite em recomendacoes. | P0 | Front + PO + Sofia | Usuario entende origem local e proxima acao. |
| S1-04 | Criar fallback honesto para perguntas fora do escopo. | P1 | Front + QA + PO | Nao inventa disponibilidade, reserva, horario ou fonte. |
| S1-05 | Definir e expor canal minimo de feedback. | P1 | Sofia + Claudia + Front | Feedback gera item rastreavel. |
| S1-06 | Ajustar contrato/guard para expansao controlada. | P1 | TL + QA + Dados | Guard continua protegendo sem bloquear expansao aprovada. |
| S1-07 | Revisar preferencias demonstrativas ou edicao simples. | P2 | PO + Front + SE | Sem coleta/persistencia ambigua. |

## 9. Criterio Go/No-Go proposto para Sprint 1

### GO

- Baseline da Sprint 0 salvo ou decisao formal de manter local registrada.
- Rafael aprovou linguagem e escopo do MVP.
- Ferramenta/processo Sofia/Claudia definido.
- Fonte de disponibilidade tratada como mock rotulado ou plano oficial aprovado.
- P0 zero e P1 com mitigacao/dono.
- `qa:repo` e `qa:ci` verdes no baseline quando houver codigo/dados.

### NO-GO

- Worktree suja sem decisao de salvamento e time tentando iniciar nova feature.
- Linguagem do MVP ainda ambigua entre IA real e assistente guiado.
- Feedback sem ferramenta, status, dono ou SLA.
- Disponibilidade mockada comunicada como oficial.
- Pedido de chat aberto, backend real, reserva real ou catalogo oficial sem contrato tecnico/QA.
- Qualquer branch protegida ou historica prestes a ser apagada sem aprovacao explicita.

## 10. Ata final do consenso

O time recomenda tratar a Sprint 0 como um marco de confiabilidade local e nao como autorizacao automatica para expandir escopo. A proxima decisao de Rafael deve ser operacional: salvar ou nao o baseline agora, abrir PR ou nao, e fechar as escolhas que destravam Sprint 1.

A Sprint 1 deve nascer pequena: Feltrim Agents guiado, recomendacoes explicaveis, fallback honesto e feedback minimo rastreavel. O que parece mais ambicioso - IA real, chat aberto, reserva, catalogo oficial e gamificacao - deve ficar fora ate existir fonte, contrato, privacidade, QA e decisao formal.

Recomendacao final: **salvar o estado atual quando Rafael autorizar, adiar limpeza de branches, fechar a matriz de decisoes e iniciar Sprint 1 somente com GO formal.**
