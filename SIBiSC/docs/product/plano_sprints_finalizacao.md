<!-- markdownlint-disable MD024 -->

# Plano de Sprints de Finalizacao - SIBiSC/Feltrim Agents

Data: 2026-05-18  
Projeto: SIBiSC/Feltrim Agents  
Formato: reuniao integrada de QA, PO, PM, GP, TL, Sofia e Claudia  
Objetivo: organizar as sprints finais para entregar um prototipo avancado, confiavel, demonstravel e com escopo honesto.

## 1. Sumario executivo

O time integrado recomenda finalizar o SIBiSC/Feltrim Agents em quatro sprints curtas e sequenciais: Sprint 0 de estabilizacao, Sprint 1 de MVP do Feltrim Agents guiado, Sprint 2 de feedback operacional com gamificacao leve apenas se os gates anteriores passarem, e Sprint 3 de hardening, QA final e release.

A nova orientacao operacional e que QA valida junto dos Devs e do TL em todas as sprints, desde o refinamento tecnico e criterios de aceite ate a Definition of Done. Qualidade deixa de ser uma etapa final isolada e passa a ser um ciclo curto de combinacao, execucao exploratoria, correcao e revalidacao dentro da propria historia.

A decisao central da reuniao e proteger confiabilidade antes de expansao. O projeto ja possui base React/Vite funcional, rotas principais, catalogo, eventos, noticias, perfil, recomendacoes locais, UX mobile-first e documentacao de QA/produto. Ainda assim, IA real/backend, catalogo oficial, reserva real, feedback in-app completo e gamificacao nao devem ser expandidos antes de estabilizar P0, contrato de dados, validacao QA e comunicacao clara dos limites do prototipo.

Nota de replanejamento pos-Sprint 0: apos code review, correcoes pos-review, validacoes verdes e auditoria de branches, a Sprint 0 foi consolidada como baseline local/prototipo guiado, mas a Sprint 1 permanece NO-GO ate Rafael aprovar linguagem/escopo do MVP, criterio Go/No-Go, ferramenta/processo Sofia/Claudia e fonte oficial/sync de disponibilidade. A ordem operacional atualizada esta em `docs/product/replanejamento_execucao_pos_sprint0.md`: salvar o estado atual quando autorizado, revisar/decidir PR, preparar historias pequenas da Sprint 1 e adiar limpeza destrutiva de branches.

Recomendacao explicita do time: nao expandir gamificacao, chat aberto de IA, reserva real ou integracao oficial antes de fechar P0/P1, contrato multiagente, plano de QA e evidencias dos fluxos criticos.

## 2. Fontes consideradas

- `docs/product/feltrim_agents_analise_completa_e_backlog.md`
- `docs/product/reuniao_sincrona_relatorios_executivos.md`
- `docs/product/multiagent_execution_log.md`
- `docs/product/multiagent_integration_contract.md`
- `docs/product/frontend_integration_notes.md`
- `docs/product/multiagent_round_consolidation.md`
- `docs/product/relatorio_sofia_feedback_usuario.md`
- `docs/qa/plano_completo_testes_zero_problemas.md`
- `docs/qa/multiagent_validation_plan.md`
- `package.json`

## 3. Premissas e decisoes ja tomadas

| Decisao | Implicacao para as sprints |
| --- | --- |
| Feltrim Agents e assistente do usuario final. | A linguagem da UI deve orientar leitores e usuarios, nao descrever automacao interna de agentes. |
| SIBiSC e camada de experiencia sobre o ecossistema de bibliotecas. | O produto nao substitui SIBI/PHL nem deve contradizer fonte oficial. |
| MVP atual deve ser honesto como prototipo guiado. | Enquanto nao houver backend/IA real, recomendacoes usam dados locais e devem informar limites. |
| IDs canonicos de livros seguem `b1..b8` no catalogo mockado. | Perfil, favoritos, historico, emprestimos e recomendacoes precisam usar apenas IDs validos. |
| Disponibilidade e recomendacoes ainda dependem de mocks. | UI deve mostrar origem/limite quando a informacao puder parecer oficial. |
| "Zero problemas" e meta operacional. | Gate real e zero P0/P1 conhecido, evidencia QA e Go/No-Go formal. |
| Sofia e Claudia sao stakeholders de feedback. | Feedback precisa ser registrado, classificado, reproduzido, priorizado e devolvido ao usuario. |
| Gamificacao deve ser inclusiva. | Sem ranking publico, sem punicao e apenas apos base confiavel. |

## 4. Decisoes pendentes para Rafael

Estas decisoes devem ser fechadas antes ou durante o sprint planning. Sem decisao, o plano assume a opcao conservadora.

| Decisao | Opcao recomendada | Impacto se ficar aberta |
| --- | --- | --- |
| Linguagem oficial | "assistente guiado de descoberta" no MVP; "IA" apenas como evolucao. | Promessa maior que a entrega real. |
| MVP do Feltrim Agents | Painel/perguntas guiadas antes de chat aberto. | Chat aberto exige backend, guardrails, logs e avaliacao. |
| IA real/backend | Adiar para pos-release academico ou tratar como P2 condicionado. | Aumenta risco tecnico, privacidade e prazo. |
| Catalogo oficial | Definir fonte futura: SIBI/PHL, Supabase, API propria, importacao controlada ou mock academico. | Disponibilidade pode parecer oficial sem ser. |
| Reserva real | Fora do MVP; usar orientacao de retirada ou acao futura. | Usuario pode esperar transacao que nao existe. |
| Preferencias editaveis | Implementar edicao simples apenas se Sprint 1 estiver estavel. | Recomendacao fica menos controlavel pelo usuario. |
| Feedback Sofia/Claudia | Definir ferramenta minima: documento, issue, quadro, Notion/Jira ou formulario in-app. | Feedback vira conversa solta sem SLA. |
| Gamificacao | Manter P2 apos confiabilidade, com prototipo leve se houver folga. | Pode distrair de P0/P1 e gerar conquistas inconsistentes. |
| Go/No-Go final | P0 zerado, P1 mitigado, `qa:ci`, smoke manual, acessibilidade e feedback triado. | Release pode sair com risco conhecido. |

## 5. Papeis e responsabilidades

| Papel | Responsabilidades |
| --- | --- |
| QA | Define estrategia de teste, severidade, gates, evidencias, regressao, smoke, acessibilidade e recomendacao Go/No-Go. Participa do refinamento tecnico com Devs/TL, combina casos por historia antes da implementacao, valida em local/preview durante o desenvolvimento e bloqueia release com P0/P1 aberto. |
| PO | Prioriza valor, valida criterios de aceite, decide escopo do MVP e aprova trade-offs de produto. |
| PM | Organiza cronograma, dependencias, riscos, metricas, rituais e comunicacao de status. |
| GP | Garante governanca, rastreabilidade, donos, atas, decisoes pendentes, plano de release e disciplina de escopo. |
| TL | Define solucao tecnica, contratos, padroes de services, sequenciamento de implementacao e revisao tecnica. Revisa impactos tecnicos e ajuda a resolver conflitos entre front, dados e testes. |
| Sofia | Representa impacto percebido do usuario, classifica feedbacks por dor, valida clareza de comunicacao e devolutiva. |
| Claudia | Opera o registro de feedback: contexto, passos, evidencias, status, issue/backlog, SLA e retorno operacional. |

### Modelo transversal - QA + Dev pairing

Aplica-se a todas as sprints e a todas as historias que alterem comportamento, dados, experiencia, acessibilidade ou promessa de produto.

- QA participa do refinamento tecnico junto com Devs, TL e PO antes da implementacao para revisar riscos, dependencias, dados, criterios de aceite e evidencia esperada.
- Dev e QA definem os casos de teste por historia antes de codar, incluindo cenarios felizes, bordas, dados invalidos, acessibilidade, mobile e regressao quando aplicavel.
- Durante o desenvolvimento, QA executa validacao exploratoria em ambiente local ou preview, acompanhando a historia ainda em andamento em vez de esperar apenas a etapa final.
- Quando houver falha, Dev corrige e QA revalida no mesmo ciclo; o card nao deve ir para `done` enquanto a revalidacao estiver pendente.
- TL revisa impactos tecnicos, contratos e conflitos entre front, dados e testes, especialmente quando uma correcao de UI puder afetar mocks, services, acessibilidade ou rotas.
- Cada historia deve ter evidencias obrigatorias: prints ou video curto quando util, passos executados, resultado esperado, resultado obtido, testes/comandos rodados e status da revalidacao.
- O gate `"QA validado com Dev"` passa a integrar a Definition of Done transversal da sprint.

## 6. Roadmap recomendado

| Sprint | Nome | Duracao sugerida | Foco | Condicao para avancar |
| --- | --- | --- | --- | --- |
| Sprint 0 | Estabilizacao e contrato | 3 a 5 dias uteis | P0/P1, contratos, QA, microcopy critica, confiabilidade de dados. | P0 zerado, P1 com plano, contrato e plano QA revalidados. |
| Sprint 1 | MVP Feltrim Agents guiado | 1 semana | Assistente guiado, recomendacoes explicaveis, perguntas principais e fallback honesto. | Fluxos Home -> recomendacao -> detalhe e Perfil -> livro aprovados. |
| Sprint 2 | Feedback e gamificacao leve | 1 semana | Feedback Sofia/Claudia operacional, metricas basicas e prototipo leve de gamificacao inclusiva se nao houver debito P0/P1. | Feedback rastreavel, SLA definido, gamificacao sem bloquear uso. |
| Sprint 3 | Hardening, QA e release | 1 semana | Regressao, acessibilidade, Lighthouse, evidencias, demo final e Go/No-Go. | Release aprovada por QA/PO/GP com riscos registrados. |

## 7. Sprint 0 - Estabilizacao e contrato

### Objetivo

Remover riscos de confiabilidade antes de ampliar o produto. Esta sprint consolida contratos, revalida as implementacoes recentes, fecha P0/P1 conhecidos e prepara o terreno para o MVP guiado.

### Duracao sugerida

3 a 5 dias uteis.

### Historias e epicos

- EP06 - QA e observabilidade minima.
- EP07 - Acessibilidade.
- EP02 - Recomendacoes consistentes.
- EP08 - Contrato para integracao futura.
- Ajustes transversais de microcopy e limites do prototipo.

### Tarefas

- Revalidar consistencia de IDs entre catalogo, perfil, favoritos, historico, emprestimos, Home e recomendacoes.
- Confirmar que recomendacoes usam livros existentes e com disponibilidade calculada do catalogo mockado.
- Revalidar que favoritos nao possuem interacao aninhada de botao dentro de link.
- Confirmar tabs, filtros e seletores com `aria-pressed`, `tablist`/`tab`/`tabpanel` ou semantica equivalente.
- Revisar microcopy de "assistente", "IA", "prototipo", "dados locais", "disponibilidade" e "sem reserva real".
- Validar Google Calendar com titulo, data, horario, local, timezone e feedback de nova aba/fallback.
- Confirmar se `UserProfilePage.jsx` deve consumir service unico ou registrar excecao temporaria.
- Atualizar matriz QA/backlog se novos achados P0/P1 aparecerem.
- Rodar `npm run qa:repo` e, se houver mudanca de codigo/dados e ambiente estavel, `npm run qa:ci`.

### Criterios de aceite

- Nenhum link critico do Perfil ou Home abre livro inexistente.
- Nenhuma recomendacao aponta para ID fora do catalogo.
- A UI informa quando recomendacao/disponibilidade usa dado local de prototipo.
- CTAs criticos possuem retorno perceptivel: buscar, renovar, remover e calendar.
- Controles ativos comunicam estado visual e semanticamente.
- QA consegue reproduzir os fluxos P0/P1 planejados com evidencia.

### Definicao de pronto

- P0 fechado ou explicitamente bloqueado com dono e decisao.
- P1 classificado, mitigado ou planejado para Sprint 1 com aceite claro.
- Contrato de dados e plano QA lidos/revalidados.
- Evidencias de sanity anexadas ao registro da sprint.
- Gate `"QA validado com Dev"` registrado nas historias alteradas.
- PO aprova linguagem do MVP como assistente guiado/prototipo, salvo decisao contraria de Rafael.

### Dependencias

- Rafael aprovar linguagem oficial e criterio Go/No-Go.
- TL confirmar padrao de services/mocks.
- QA ter ambiente estavel para gate.

### Riscos

- Corrigir somente visual sem validar teclado/leitor de tela.
- Reintroduzir IDs invalidos em mocks novos.
- Usar "IA" na UI sem explicar limite de prototipo.
- Tratar disponibilidade mockada como dado oficial.

### Entregaveis

- Checklist P0/P1 fechado.
- Evidencia de sanity dos fluxos Home, Catalogo, Perfil e Eventos.
- Contrato e plano QA referenciados no planejamento.
- Lista de decisoes pendentes reduzida para escopo futuro.

### Gates QA

- Gate 0: historias com criterio de aceite e dados claros.
- Gate 0.1: Dev e QA definem casos de teste e evidencias esperadas antes de codar.
- Gate 1: `npm run qa:repo` aprovado.
- Gate 2: `npm run qa:ci` quando houver mudanca de codigo/dados.
- Gate 3: smoke manual de rotas criticas e IDs.
- Gate 4: QA revalida com Dev as correcoes antes de mover card para `done`.
- Bloqueio: qualquer P0 aberto impede Sprint 1.

### Demo/review

- Demonstrar Home -> recomendacao -> detalhe valido.
- Demonstrar Perfil -> emprestimo/historico/favorito -> detalhe valido.
- Demonstrar remocao de favorito sem navegacao acidental.
- Demonstrar feedback visual para acoes principais.
- Revisar com Sofia se o usuario entende os limites do prototipo.

## 8. Sprint 1 - MVP Feltrim Agents guiado

### Objetivo

Entregar o Feltrim Agents como assistente guiado e confiavel, usando dados locais verificaveis para responder duvidas principais, recomendar livros, orientar disponibilidade, eventos, noticias e perfil sem prometer chat aberto ou IA real.

### Duracao sugerida

1 semana.

### Historias e epicos

- EP01 - Assistente Feltrim Agents guiado.
- EP02 - Recomendacoes explicaveis.
- EP03 - Preferencias demonstrativas ou editaveis simples, conforme decisao.
- EP06 - Testes de prompts/perguntas principais.

### Tarefas

- Definir as 10 perguntas principais que o assistente guiado deve cobrir.
- Criar fluxo de perguntas ou painel de orientacao: encontrar livro, entender recomendacao, ver disponibilidade, achar evento, usar perfil, favoritos e limites de reserva.
- Exibir motivo, fonte e proxima acao em cada recomendacao.
- Criar fallback honesto quando nao houver dado seguro.
- Reforcar que nao ha reserva real, chat aberto ou catalogo oficial em tempo real nesta versao.
- Se aprovado, permitir edicao simples de preferencias ou registrar claramente que preferencias sao mockadas.
- Escrever casos QA para perguntas principais e respostas proibidas.
- Medir eventos basicos de uso se a instrumentacao for leve e nao atrasar P0/P1.

### Criterios de aceite

- Usuario consegue entender o que o Feltrim Agents faz em ate 1 minuto.
- Cada recomendacao possui livro real, motivo especifico, disponibilidade ou aviso e link valido.
- O assistente nunca inventa disponibilidade, reserva, horario ou fonte.
- Perguntas fora do escopo recebem fallback honesto e proxima acao.
- QA valida no minimo 10 cenarios principais do assistente.

### Definicao de pronto

- Historias do MVP guiado aprovadas pelo PO.
- Fluxos principais testados por QA.
- Microcopy aprovada por PO/Sofia.
- TL confirma que o assistente usa dados locais verificaveis e contratos existentes.
- Gate `"QA validado com Dev"` concluido por historia, com evidencias de perguntas, respostas, esperado/obtido e testes rodados.
- P0/P1 novos fechados antes de avancar.

### Dependencias

- Sprint 0 aprovada.
- Linguagem oficial definida por Rafael.
- Escopo de preferencias aprovado.
- Decisao de nao incluir chat aberto no MVP, salvo orientacao expressa.

### Riscos

- Usuario interpretar fluxo guiado como IA generativa real.
- Recomendacoes ficarem opacas ou repetitivas.
- Preferencias mockadas parecerem dados pessoais reais.
- Fallback honesto parecer erro se a microcopy for fraca.

### Entregaveis

- Feltrim Agents guiado especificado e/ou implementado conforme escopo.
- Matriz de perguntas principais.
- Criterios de resposta segura.
- Evidencias dos fluxos de recomendacao.

### Gates QA

- Smoke Home/Feltrim Agents.
- E2E Home -> recomendacao -> catalogo -> detalhe.
- Validador manual de "nao inventar": disponibilidade, reserva, horario e fonte.
- Acessibilidade de controles do assistente.

### Demo/review

- Executar 3 jornadas: usuario quer livro por autor, usuario quer evento, usuario nao entende disponibilidade.
- Sofia avalia clareza e confianca.
- PO valida se a proposta de valor ficou alinhada ao MVP.
- QA mostra resultados dos 10 cenarios principais.

## 9. Sprint 2 - Feedback e gamificacao leve

### Objetivo

Operacionalizar o ciclo Sofia/Claudia e, se os gates de confiabilidade estiverem verdes, introduzir uma camada leve de engajamento inclusivo. A gamificacao entra apenas como prototipo controlado e nao deve competir com correcoes P0/P1.

### Duracao sugerida

1 semana.

### Historias e epicos

- EP05 - Feedback Sofia/Claudia.
- EP04 - Gamificacao inclusiva.
- EP06 - Metricas e observabilidade minima.
- EP03 - Preferencias e controle do usuario, se ainda pendente.

### Tarefas

- Definir ferramenta oficial de feedback: documento, issue, quadro, Notion/Jira ou formulario in-app.
- Criar template operacional com rota, dispositivo, passos, esperado, observado, impacto, severidade, dono, status e retorno.
- Definir SLA por severidade P0/P1/P2/P3.
- Criar entrada simples de feedback no produto ou, no minimo, canal visivel documentado.
- Implementar feedback por recomendacao: ajudou, nao ajudou, motivo, se couber no escopo.
- Instrumentar eventos basicos: busca, recomendacao exibida, recomendacao clicada, detalhe aberto, favorito/remocao, feedback enviado.
- Desenhar gamificacao leve: trilhas, selos e metas pessoais sem ranking publico.
- Validar que conquistas dependem de acoes rastreaveis e IDs validos.

### Criterios de aceite

- Todo feedback P0/P1 tem dono, severidade, SLA e criterio de fechamento.
- Claudia consegue registrar relato suficiente para QA reproduzir.
- Sofia consegue classificar impacto percebido e preparar devolutiva.
- Usuario encontra caminho claro para enviar feedback ou entende o canal oficial.
- Gamificacao, se implementada, e opcional, inclusiva, sem ranking e nao bloqueia uso.
- Nenhuma conquista dispara por livro inexistente, rota quebrada ou dado inconsistente.

### Definicao de pronto

- Fluxo Sofia/Claudia aprovado por PM/GP/QA/PO.
- SLA registrado e usado em triagem piloto.
- Feedbacks de teste geram backlog rastreavel.
- Gate `"QA validado com Dev"` concluido nos fluxos de feedback, metricas e gamificacao que forem implementados.
- Gamificacao so entra se Sprint 0 e Sprint 1 nao tiverem P0/P1 aberto.

### Dependencias

- Rafael decidir ferramenta de feedback.
- Sprint 1 aprovada.
- Eventos basicos definidos sem coletar dado pessoal desnecessario.
- Regras de gamificacao aprovadas por PO/Sofia/QA.

### Riscos

- Feedback ficar fora do produto e sem rastreabilidade.
- Coleta de contexto registrar dado sensivel sem necessidade.
- Gamificacao antecipada mascarar problemas de confianca.
- Metricas incompletas levarem a decisoes por impressao.

### Entregaveis

- Fluxo Sofia/Claudia operacional.
- Template de feedback e SLA.
- Backlog inicial de feedbacks classificados.
- Prototipo ou especificacao de gamificacao leve.
- Lista de metricas instrumentadas ou planejadas.

### Gates QA

- Teste do fluxo feedback -> triagem -> reproducao -> backlog -> retorno.
- Sanity de recomendacao com feedback.
- Validacao de acessibilidade do formulario/canal.
- Revisao de privacidade: sem dados pessoais desnecessarios.

### Demo/review

- Simular usuario reportando recomendacao ruim.
- Claudia registra, QA classifica, PO prioriza e Sofia prepara retorno.
- Mostrar metricas iniciais ou plano de coleta.
- Apresentar gamificacao apenas se todos concordarem que nao ha P0/P1 bloqueante.

## 10. Sprint 3 - Hardening, QA e release

### Objetivo

Fechar a release final com regressao, acessibilidade, performance, evidencias, narrativa de demonstracao e decisao Go/No-Go formal.

### Duracao sugerida

1 semana.

### Historias e epicos

- EP06 - QA final e release.
- EP07 - Acessibilidade final.
- EP08 - Documentacao de integracao futura.
- Governanca de release, demo e pos-release.

### Tarefas

- Executar regressao dos fluxos P0/P1.
- Rodar `npm run qa:ci` em ambiente estavel.
- Executar smoke manual nas rotas `/`, `/home-mobile`, `/catalogo`, `/perfil`, `/eventos`, `/noticias`, detalhe valido e rota invalida.
- Registrar Lighthouse de Home, Catalogo, Eventos, Noticias e Perfil, com foco em acessibilidade e performance mobile.
- Validar teclado, foco, ARIA e reduced motion nos fluxos principais.
- Validar console e network sem erro critico em rotas principais.
- Consolidar feedbacks abertos com status e decisao.
- Preparar roteiro de demo final com narrativa honesta: prototipo avancado, assistente guiado, dados locais e evolucoes futuras.
- Fazer reuniao Go/No-Go com QA, PO, PM, GP, TL, Sofia e Claudia.

### Criterios de aceite

- `npm run qa:ci` aprovado ou justificativa formal se nao aplicavel.
- Nenhum bug P0/P1 aberto.
- Todos os fluxos criticos possuem evidencia.
- Lighthouse sem regressao bloqueante de acessibilidade.
- Performance mobile possui baseline registrado.
- Feedbacks recentes triados e com dono.
- Demo final nao promete IA real, reserva real ou catalogo oficial se nao implementados.

### Definicao de pronto

- Go/No-Go assinado.
- Evidencias salvas e rastreaveis.
- Gate `"QA validado com Dev"` fechado nas historias e bugs corrigidos durante o hardening.
- Riscos aceitos documentados.
- Backlog pos-release priorizado.
- Narrativa de apresentacao aprovada por PO/PM/Sofia.

### Dependencias

- Sprints anteriores aprovadas.
- Ambiente de build/teste estavel.
- Decisao de Rafael sobre escopo demonstravel.
- Docs finais atualizados.

### Riscos

- Descobrir P0/P1 tarde sem folga de correcao.
- Build passar, mas fluxo manual falhar.
- Acessibilidade ou mobile ficarem sem evidencia.
- Demo comunicar roadmap como se fosse implementacao pronta.

### Entregaveis

- Relatorio de regressao.
- Evidencias de QA.
- Registro Go/No-Go.
- Roteiro de demo.
- Backlog pos-release P1/P2/P3.

### Gates QA

- `npm run qa:repo`
- `npm run qa:ci`
- Smoke manual de rotas criticas.
- Regressao E2E das jornadas principais.
- Lighthouse/acessibilidade.
- Revisao final de feedbacks Sofia/Claudia.

### Demo/review

- Roteiro final de 10 a 15 minutos:
  1. Posicionamento do SIBiSC.
  2. Home e Feltrim Agents guiado.
  3. Recomendacao explicavel.
  4. Catalogo e detalhe.
  5. Perfil, favoritos e preferencias.
  6. Eventos e Google Calendar.
  7. Feedback Sofia/Claudia.
  8. Roadmap responsavel: IA real, catalogo oficial, reserva e gamificacao futura.

## 11. Backlog priorizado por sprint

### P0 - Bloqueadores

| Item | Sprint | Dono principal | Criterio de aceite |
| --- | --- | --- | --- |
| Revalidar IDs canonicos entre Perfil, Home, recomendacoes e catalogo. | Sprint 0 | TL + QA | Nenhum link critico abre livro inexistente. |
| Revalidar recomendacoes usando livros reais e disponiveis do catalogo local. | Sprint 0 | TL + PO + QA | Toda recomendacao possui `bookId` valido, motivo e rota funcional. |
| Definir Go/No-Go operacional. | Sprint 0 | GP + QA + PO | Criterios de release registrados e aceitos. |
| Feedback critico com dono e SLA. | Sprint 2 | Claudia + Sofia + QA | Zero feedback P0/P1 sem dono apos triagem. |
| Regressao final sem P0/P1 aberto. | Sprint 3 | QA | Go/No-Go nao aprova release com P0/P1 aberto. |

### P1 - Necessarios para MVP confiavel

| Item | Sprint | Dono principal | Criterio de aceite |
| --- | --- | --- | --- |
| Padronizar microcopy de assistente, prototipo, disponibilidade e reserva. | Sprint 0 | PO + Sofia + TL | Usuario entende limites do MVP nos pontos de decisao. |
| Revalidar ARIA, teclado e foco em tabs/filtros/nav. | Sprint 0 | QA + TL | Controles ativos comunicam estado a tecnologia assistiva. |
| Validar CTAs com feedback perceptivel. | Sprint 0 | QA + TL + PO | Buscar, renovar, remover e calendar comunicam resultado. |
| Definir 10 perguntas principais do Feltrim Agents. | Sprint 1 | PO + Sofia + TL | Perguntas cobrem tarefas reais de busca, recomendacao e orientacao. |
| Implementar ou especificar fallback honesto. | Sprint 1 | TL + PO | Assistente nao inventa dado quando nao ha fonte segura. |
| Validar fluxo Sofia/Claudia. | Sprint 2 | Claudia + Sofia + QA | Feedback registrado vira item reproduzivel. |
| Registrar baseline Lighthouse e acessibilidade. | Sprint 3 | QA | Relatorios anexados e sem regressao bloqueante. |

### P2 - Evolucoes controladas

| Item | Sprint | Dono principal | Criterio de aceite |
| --- | --- | --- | --- |
| Preferencias editaveis simples. | Sprint 1 ou 2 | PO + TL | Usuario edita preferencias ou UI informa que sao demonstrativas. |
| Feedback por recomendacao. | Sprint 2 | Sofia + TL + QA | Usuario avalia recomendacao em fluxo simples. |
| Instrumentacao basica. | Sprint 2 | PM + TL | Eventos essenciais planejados ou coletados sem dados sensiveis. |
| Gamificacao leve inclusiva. | Sprint 2 | PO + Sofia + QA | Sem ranking publico, opcional e dependente de dados validos. |
| Catalogo oficial/Supabase. | Pos-release ou P2 condicionado | TL + PM | Fonte, timestamp, sync, fallback e riscos definidos antes de implementar. |
| IA real/backend. | Pos-release ou P2 condicionado | TL + PM + QA | Guardrails, fontes, logs e avaliacao aprovados antes de chat aberto. |

## 12. Plano de testes por sprint

| Sprint | Testes principais | Evidencia esperada |
| --- | --- | --- |
| Sprint 0 | Smoke de rotas, auditoria de IDs, sanity de Perfil/Home, ARIA/teclado, CTAs e Calendar. | Checklist P0/P1, prints, passos, esperado/obtido, resumo de comando, bugs com severidade e gate `"QA validado com Dev"`. |
| Sprint 1 | E2E Home -> recomendacao -> detalhe, perguntas principais do assistente, fallback, acessibilidade do painel guiado. | Matriz das 10 perguntas, prints, passos, resultado esperado/obtido, testes rodados e evidencias por fluxo. |
| Sprint 2 | Feedback Sofia/Claudia, formulario/canal, SLA, feedback por recomendacao, gamificacao sem regressao. | Registro piloto de feedback, issues/backlog, sanity de gamificacao, revisao de privacidade e revalidacao QA+Dev. |
| Sprint 3 | Regressao completa, `qa:ci`, Lighthouse, mobile, acessibilidade, console/network, Go/No-Go. | Relatorio de regressao, Lighthouse, checklist final, ata Go/No-Go e evidencias obrigatorias por historia/bug. |

### Regressao final obrigatoria

- Home/Feltrim Agents: busca assistida, recomendacoes e limites do prototipo.
- Catalogo: busca por titulo, autor, ISBN, acentos e termo inexistente.
- Detalhe de livro: metadados, disponibilidade, unidade, bairro e status textual.
- Perfil: preferencias, emprestimos, historico, favoritos, renovar/remover e links validos.
- Eventos: listagem, detalhe, Google Calendar e fallback.
- Noticias: listagem, detalhe, filtros/estados.
- Navegacao mobile: BottomNav, rota ativa, foco, area touch e sem scroll horizontal.
- Acessibilidade: teclado, foco visivel, ARIA, contraste e reduced motion.
- Feedback: registro, triagem, severidade, dono, status e devolutiva.

## 13. Plano de demo e review por sprint

| Sprint | Demo | Review |
| --- | --- | --- |
| Sprint 0 | Mostrar que fluxos criticos nao quebram e que limites estao claros. | QA decide se P0/P1 permite avancar. |
| Sprint 1 | Mostrar Feltrim Agents guiado resolvendo duvidas reais com dados verificaveis. | PO/Sofia validam valor e clareza; QA valida seguranca de resposta. |
| Sprint 2 | Simular feedback de usuario ate backlog e apresentar gamificacao leve se liberada. | PM/GP validam SLA, rastreabilidade e ausencia de debito critico. |
| Sprint 3 | Executar demo final completa com narrativa de release. | Go/No-Go formal e backlog pos-release. |

## 14. Metricas de acompanhamento

| Metrica | Uso | Meta inicial |
| --- | --- | --- |
| Burndown da sprint | Acompanhar escopo e risco de atraso. | Tendencia diaria sem acumulo de P0/P1 no fim. |
| Bugs por severidade | Controlar qualidade e bloqueios. | P0/P1 = 0 antes de release. |
| Lead time de feedback | Medir tempo de resposta Sofia/Claudia. | Dentro do SLA por severidade. |
| Cobertura de fluxos P0/P1 | Garantir validacao das jornadas criticas. | 100% antes da Sprint 3 fechar. |
| Lighthouse Acessibilidade | Evitar regressao inclusiva. | Sem regressao bloqueante; ideal 100/100 nas rotas avaliadas. |
| Lighthouse Performance mobile | Criar baseline tecnico. | Baseline registrado e sem queda grave. |
| Tarefas concluidas por usuario | Validar usabilidade real. | Aumentar taxa de conclusao sem ajuda. |
| Recomendacao exibida -> detalhe aberto | Medir valor do Feltrim Agents. | Estabelecer baseline no MVP. |
| Feedbacks sem dono | Medir governanca de feedback. | 0 apos triagem. |
| Termos sem resultado | Orientar melhoria de catalogo/recomendacao. | Lista priorizada para backlog. |

## 15. RACI por area

| Area | QA | PO | PM | GP | TL | Sofia | Claudia |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Priorizacao P0/P1 | R | A | C | C | C | C | C |
| Contrato de dados | C | C | C | I | R/A | I | I |
| MVP Feltrim Agents | C | A | C | I | R | C | I |
| Microcopy e limites | C | A | C | I | R | R | I |
| Acessibilidade | R/A | C | I | I | R | C | I |
| Feedback Sofia/Claudia | C | C | C | I | I | R | R/A |
| Gamificacao leve | C | A | C | I | R | C | I |
| Metricas | C | C | R | C | R | C | C |
| Release Go/No-Go | R | A | C | A | C | C | I |
| Demo final | C | R/A | R | C | C | C | I |

Legenda: R = responsavel pela execucao, A = aprovador final, C = consultado, I = informado.

## 16. Plano de release final

### Preparacao

- Congelar escopo apos Sprint 2, salvo P0/P1.
- Consolidar backlog pos-release para IA real, catalogo oficial, reserva real e gamificacao expandida.
- Atualizar roteiro de demo e disclaimers do prototipo.
- Confirmar evidencias de QA e metricas.

### Go

Release pode ser aprovada se:

- Nao ha P0/P1 aberto.
- `npm run qa:ci` passou, ou existe justificativa formal para nao execucao em mudanca apenas documental.
- Smoke manual de rotas criticas foi aprovado.
- Fluxos Home/Feltrim Agents, Catalogo, Perfil, Eventos, Noticias e Feedback possuem evidencia.
- Historias alteradas possuem gate `"QA validado com Dev"` com prints, passos, esperado/obtido e testes rodados.
- Acessibilidade nao tem regressao bloqueante.
- Disponibilidade, reserva, IA e catalogo oficial estao comunicados com limites corretos.
- Feedbacks recentes estao triados e com dono.
- PO/QA/GP aprovam a narrativa final.

### No-Go

Release deve ser bloqueada se:

- Qualquer P0/P1 estiver aberto.
- Recomendacao ou Perfil levar a livro inexistente.
- UI prometer reserva real, IA real ou disponibilidade oficial sem implementacao.
- Fluxo principal falhar em mobile ou teclado.
- Feedback critico estiver sem dono.
- `qa:ci` falhar em mudanca de codigo/dados sem correcao ou decisao formal.

### Pos-release

- Janela de observacao de 24h a 48h.
- Sofia e Claudia monitoram feedbacks e classificam impacto.
- QA reproduz P0/P1 imediatamente.
- PM/GP acompanham SLA e comunicacao.
- PO prioriza backlog pos-release com base em evidencia.

## 17. Sequencia recomendada final

1. Fechar Sprint 0 antes de qualquer expansao: P0, contrato, QA, microcopy, acessibilidade e IDs.
2. Entregar Feltrim Agents como assistente guiado, nao chat aberto, usando dados locais verificaveis.
3. Operacionalizar feedback Sofia/Claudia antes de escalar funcionalidades novas.
4. Introduzir gamificacao apenas como P2 leve, inclusiva e opcional, se nao houver P0/P1 aberto.
5. Tratar IA real/backend, catalogo oficial e reserva real como evolucoes condicionadas a fonte de verdade, guardrails, testes e aprovacao de Rafael.

## 18. Encerramento da reuniao integrada

Consenso do time: o projeto esta maduro para uma reta final organizada, mas nao para aumento de promessa. A entrega final mais forte e um SIBiSC demonstravel, mobile-first, com Feltrim Agents guiado, recomendacoes explicaveis, dados locais identificados, feedback rastreavel e QA com evidencias.

O caminho de menor risco e transformar a qualidade existente em confianca percebida. Depois disso, IA real, catalogo oficial, reserva e gamificacao podem entrar como proximas fases com contrato, donos e criterios de aceite proprios.
