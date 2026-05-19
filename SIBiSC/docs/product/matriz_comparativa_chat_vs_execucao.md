# Matriz comparativa - Chat vs execucao SIBiSC/Feltrim Agents

Data: 2026-05-19  
Workspace: `C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile`  
App: `SIBiSC`  
Escopo: comparacao entre a ordem ideal de trabalho desde o inicio do chat e o que foi efetivamente executado no projeto.

## Sumario executivo

O SIBiSC/Feltrim Agents chegou a um resultado demonstravel e bem documentado: as sprints 0, 1, 2 e 3 foram executadas, os PRs principais foram promovidos ate `main`, os gates tecnicos relevantes ficaram verdes, o dominio Vercel respondeu `200 OK` na conferencia pos-release e os testes manuais finais concluiram **GO para apresentacao publica controlada como prototipo academico avancado**.

A execucao, porem, nao seguiu a ordem ideal desde o inicio. O maior desvio foi comecar pela representacao visual/command center do Feltrim Agents e so depois reposicionar o conceito como assistente guiado do usuario final. Isso gerou retrabalho de linguagem, UI, documentacao, backlog, QA e narrativa de release.

O estado honesto final e duplo: o projeto esta forte para apresentacao publica controlada, com discurso claro de prototipo, dados locais e ausencia de IA/backend/reserva real; mas segue **NO-GO para declarar produto operacional, acessibilidade final ou conformidade completa** ate corrigir P1/P2, validar leitor de tela real e fechar lacunas de mock, mobile, seguranca de headers e microcopy operacional.

## Premissa da comparacao

Esta matriz compara:

- **Intencao/ordem ideal desde o comeco:** o que deveria ter sido feito primeiro para reduzir retrabalho, risco de promessa e incerteza operacional.
- **Execucao real:** o que foi feito na sequencia efetiva do chat e do repositorio, com base nos documentos e historico Git observados.

Nao e uma avaliacao de culpa. E uma leitura de processo: onde a execucao convergiu com o plano, onde desviou, onde excedeu o esperado e onde ainda ha pendencias.

## Evidencias consultadas

- `SIBiSC/docs/product/feltrim_agents_analise_completa_e_backlog.md`
- `SIBiSC/docs/product/plano_sprints_finalizacao.md`
- `SIBiSC/docs/product/replanejamento_execucao_pos_sprint0.md`
- `SIBiSC/docs/product/release_final_status.md`
- `SIBiSC/docs/product/conferencia_pendencias_pos_release.md`
- `SIBiSC/docs/product/reuniao_vereditos_testes_manuais.md`
- `SIBiSC/docs/product/conclusao_sofia_reuniao_testes_manuais.md`
- `SIBiSC/docs/product/aceite_manual_po_pm.md`
- `SIBiSC/docs/product/deploy_404_diagnostico.md`
- `SIBiSC/docs/product/release_go_no_go_sprint3.md`
- `SIBiSC/docs/product/status_geral_e_pendencias_atuais.md`
- `SIBiSC/docs/qa/sprint0_evidencias_validacao.md`
- `SIBiSC/docs/qa/sprint1_evidencias_validacao.md`
- `SIBiSC/docs/qa/sprint2_evidencias_validacao.md`
- `SIBiSC/docs/qa/sprint3_hardening_release.md`
- `SIBiSC/docs/qa/teste_manual_funcional_rafael_qa.md`
- `SIBiSC/docs/qa/teste_manual_ux_acessibilidade.md`
- `SIBiSC/docs/qa/teste_manual_tl_seguranca.md`
- Git log recente: PRs #45, #55, #56, #57, #58, #59, #60 e #61 aparecem no historico recente de `main`.

## Matriz completa

| Etapa/tema | O que deveriamos ter feito desde o comeco | O que fizemos de fato | Status | Evidencia no repositorio | Impacto positivo | Risco ou custo do desvio | Proxima acao recomendada |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Entendimento do produto e escopo | Comecar com uma definicao fechada: SIBiSC como camada de experiencia sobre bibliotecas, nao substituto do SIBI/PHL, e Feltrim Agents como assistente do usuario final. | O entendimento foi refinado durante o chat. A analise posterior definiu o produto como prototipo avancado e camada de descoberta, com limites claros. | Feito com desvio | `docs/product/feltrim_agents_analise_completa_e_backlog.md`; `docs/product/plano_sprints_finalizacao.md` | O produto ganhou narrativa clara e defensavel para apresentacao. | Retrabalho conceitual e risco inicial de prometer IA/automacao acima da entrega real. | Manter o posicionamento aprovado em todos os docs, demo e UI futura. |
| 2. Referencias visuais/Instagram | Usar referencias visuais no inicio apenas como insumo de linguagem, hierarquia e mobile-first, depois validar contra escopo funcional. | As referencias foram usadas para melhorar UI e impacto visual antes de o escopo do Feltrim Agents estar totalmente estabilizado. | Feito com desvio | Evidenciado indiretamente em `docs/product/feltrim_agents_analise_completa_e_backlog.md` e nos docs de sprints que tratam de UI profissional/mobile-first. | Elevou qualidade visual e ajudou a reposicionar a Home. | Parte do refinamento visual precisou ser reencaixada depois na narrativa de assistente guiado. | Em proximos ciclos, fechar proposta de valor antes de aplicar referencia estetica forte. |
| 3. Definicao correta do Feltrim Agents | Definir Feltrim Agents desde o primeiro momento como assistente guiado de descoberta, limitado, explicavel e baseado em dados locais. | Primeiro foi tratado como visual/command center; depois foi reorientado para assistente guiado do usuario. Sprint 1 consolidou o painel com 9 perguntas fechadas. | Retrabalho | `docs/product/feltrim_agents_analise_completa_e_backlog.md`; `docs/qa/sprint1_evidencias_validacao.md`; `docs/product/matriz_perguntas_guiadas_sprint1.md` | A versao final ficou mais coerente com o usuario real e com o MVP. | Retrabalho de UI, microcopy, backlog, QA e expectativa de IA. | Preservar "assistente guiado" ate haver backend/IA real com guardrails. |
| 4. UI/UX e remocao de emojis | Profissionalizar a UI desde o inicio, sem emojis, com linguagem institucional, mobile-first e acessivel. | A UI foi profissionalizada ao longo do processo; a conversa indica remocao de emojis e os docs finais tratam de linguagem profissional, prototipo e mobile-first. | Feito com desvio | `docs/product/plano_sprints_finalizacao.md`; `docs/qa/teste_manual_ux_acessibilidade.md`; `docs/product/aceite_manual_po_pm.md` | A apresentacao ganhou credibilidade academica e institucional. | Ajustes visuais tardios geraram PRs de regressao visual e validações adicionais. | Manter checklist visual e de linguagem antes de cada release. |
| 5. Dados, mocks e IDs | Criar contrato de dados antes de telas: IDs canonicos, fonte de verdade, status de mock, limites de disponibilidade e rotas validas. | IDs quebrados foram descobertos e corrigidos na Sprint 0; `qa-guard` passou a validar `b1..b8` e recomendacoes contra catalogo local. | Feito com retrabalho | `docs/product/feltrim_agents_analise_completa_e_backlog.md`; `docs/qa/sprint0_evidencias_validacao.md`; `scripts/qa-guard.mjs` citado nos docs | Reduziu risco de links quebrados e recomendacoes invalidas. | O problema inicial afetava confianca do Perfil, favoritos, historico e recomendacoes. | Antes de ampliar catalogo, versionar contrato de dados e atualizar guard. |
| 6. QA + Dev pairing | Instituir QA + Dev desde a primeira historia, com criterios de aceite e evidencias antes de codar. | O modelo foi formalizado no plano de sprints e aplicado nas evidencias das sprints. | Feito com desvio | `docs/product/plano_sprints_finalizacao.md`; `docs/qa/sprint0_evidencias_validacao.md`; `docs/qa/sprint1_evidencias_validacao.md`; `docs/qa/sprint2_evidencias_validacao.md` | Melhorou rastreabilidade, reduziu regressao e sustentou Go/No-Go. | Parte do trabalho inicial precisou ser revalidada depois que os gates foram formalizados. | Tornar QA + Dev pairing uma regra de entrada de historia, nao apenas gate final. |
| 7. Planejamento de sprints | Planejar Sprint 0-3 antes de implementar novas features: estabilizar, entregar assistente, feedback/gamificacao, hardening/release. | O plano foi criado depois da analise completa e guiou a reta final. Houve replanejamento pos-Sprint 0. | Feito com desvio | `docs/product/plano_sprints_finalizacao.md`; `docs/product/replanejamento_execucao_pos_sprint0.md` | Transformou trabalho disperso em sequencia executavel. | O plano precisou absorver decisoes e retrabalhos ja ocorridos. | Comecar proximos projetos com roadmap, DoD e criterios Go/No-Go antes da execucao visual. |
| 8. Sprint 0 | Fazer estabilizacao de dados, rotas, microcopy, ARIA, Calendar, favoritos e guards antes de qualquer expansao. | Sprint 0 corrigiu Perfil via service, recomendacoes navegaveis, guard de IDs, status de disponibilidade, favicon, busca assistida, Calendar e remocao de script externo. | Feito | `docs/qa/sprint0_evidencias_validacao.md`; `docs/product/replanejamento_execucao_pos_sprint0.md`; PR #45 no historico | Criou baseline confiavel e promoveu Sprint 0 para `main`. | Persistiram decisoes abertas sobre fonte oficial, Sprint 1 e feedback. | Tratar Sprint 0 como modelo: estabilizacao antes de feature. |
| 9. Sprint 1 | Entregar Feltrim Agents guiado com perguntas fechadas, motivo, fonte/limite, fallback honesto e sem chat aberto. | Sprint 1 implementou painel com 9 perguntas, respostas explicaveis, disponibilidade mockada, ausencia de reserva real, fallback e template de feedback. | Feito | `docs/qa/sprint1_evidencias_validacao.md`; PR #55/#56 no historico | A proposta central do Feltrim Agents ficou demonstravel. | Leitor de tela real ainda ficou pendente; feedback ficou dependente de GitHub. | Corrigir pendencias de acessibilidade real e evoluir feedback sem login. |
| 10. Sprint 2 | Operacionalizar feedback Sofia/Claudia e so adicionar gamificacao leve se a base estivesse confiavel. | Sprint 2 adicionou CTA de feedback via GitHub Issues, aviso de privacidade e Jornada do Leitor com trilhas, selos e metas pessoais. | Feito com ressalvas | `docs/qa/sprint2_evidencias_validacao.md`; PR #57/#58 no historico | Criou ciclo inicial de feedback e engajamento demonstrativo. | GitHub cria barreira para usuario nao tecnico; gamificacao exibiu contadores acima da meta nos testes manuais. | Criar canal alternativo de feedback e ajustar contadores como "meta superada". |
| 11. Sprint 3 | Executar hardening, regressao, acessibilidade, Lighthouse, deploy, release e Go/No-Go sem ampliar escopo. | Sprint 3 corrigiu achados Lighthouse, aplicou `prefers-reduced-motion`, validou `qa:repo`, `qa:ci`, smokes e Lighthouse 100/100 em acessibilidade nas rotas auditadas. | Feito | `docs/qa/sprint3_hardening_release.md`; `docs/product/release_go_no_go_sprint3.md`; PR #59 no historico | Criou release tecnicamente defensavel e documentada. | Leitor de tela real nao foi validado; performance ficou como baseline, nao como gate. | Rodar validacao humana com NVDA/Narrator e priorizar performance se houver meta institucional. |
| 12. Testes manuais com 4 agentes | Validar producao com perspectivas separadas: QA funcional, UX/acessibilidade, TL/seguranca e PO/PM. | Foram executados quatro testes manuais reais em producao publica e repo local de apoio. | Feito | `docs/qa/teste_manual_funcional_rafael_qa.md`; `docs/qa/teste_manual_ux_acessibilidade.md`; `docs/qa/teste_manual_tl_seguranca.md`; `docs/product/aceite_manual_po_pm.md` | Encontrou riscos reais que os gates automatizados nao bloquearam. | Revelou P1/P2 pos-release: bottom nav, disponibilidade mockada, leitor de tela, headers, 404 HTTP, microcopy. | Fazer essa rodada antes do merge final, nao apenas como conferencia final. |
| 13. Sofia/Claudia e feedback | Definir desde o inicio papel, ferramenta, SLA, privacidade e devolutiva do feedback. | Sofia/Claudia foram consolidadas como ciclo de feedback; ferramenta inicial ficou GitHub Issues com template e aviso de privacidade. | Feito com desvio | `docs/product/plano_sprints_finalizacao.md`; `docs/qa/sprint2_evidencias_validacao.md`; `docs/product/conclusao_sofia_reuniao_testes_manuais.md` | Deu governanca e voz de usuario ao projeto. | GitHub Issues pode excluir usuario sem conta e expor feedback publico. | Criar alternativa sem login e reforcar politica de privacidade. |
| 14. Deploy Vercel/Netlify | Validar configuracao de monorepo, root/output, rewrites, dominio publico e protection antes de release. | Primeiro houve diagnostico de 404/401; depois foram adicionados `vercel.json` raiz e `netlify.toml`; conferencia final mostrou dominio Vercel `200 OK`. | Feito com retrabalho | `docs/product/deploy_404_diagnostico.md`; `docs/product/conferencia_pendencias_pos_release.md`; PR #60 no historico | Reduziu risco de apresentacao sem site publico. | Tempo gasto diagnosticando configuracao remota; dashboard Vercel ainda exige confirmacao manual. | Registrar print/config final do dashboard e manter Vercel como fonte primaria. |
| 15. Branches, Git e portfolio | Separar repos, limpar gitlink, trabalhar por branches pequenas, promover por PRs e evitar operacoes destrutivas. | Gitlink do `portfolio` foi corrigido e preservado como repo separado; PRs/sprints foram promovidos; limpeza de branches ficou pendente por autorizacao. | Feito com desvio | `docs/product/status_geral_e_pendencias_atuais.md`; `docs/product/conferencia_pendencias_pos_release.md`; git log recente | Historico principal ficou limpo e `main` consolidou as sprints. | Houve custo operacional com worktree/branches/portfolio e risco de apagar branch indevida. | Limpar branches apenas em tarefa separada, com aprovacao explicita e lista revisada. |
| 16. Acessibilidade e leitor de tela | Definir criterios WCAG/teclado/leitor de tela desde o inicio e validar com pessoa real antes de declarar pronto. | Foram feitos ajustes ARIA, foco, reduced motion e Lighthouse 100/100. Teste real com leitor de tela nao foi executado. | Pendente | `docs/qa/sprint3_hardening_release.md`; `docs/qa/teste_manual_ux_acessibilidade.md`; `docs/product/conferencia_pendencias_pos_release.md` | A base tecnica melhorou muito e os problemas estruturais ficaram visiveis. | Nao se pode declarar acessibilidade final, WCAG AA ou compatibilidade com leitor de tela. | Executar roteiro NVDA/Narrator com pessoa validadora e registrar evidencia. |
| 17. Seguranca e privacidade | Revisar links externos, scripts, headers, dados sensiveis, feedback publico e promessas de IA antes do release. | Script externo Figma foi removido; `noopener,noreferrer` aplicado em fluxos principais; feedback recebeu aviso de privacidade. Headers ainda incompletos. | Feito com pendencias | `docs/qa/sprint0_evidencias_validacao.md`; `docs/qa/teste_manual_tl_seguranca.md`; `docs/product/conferencia_pendencias_pos_release.md` | Reduziu riscos de terceiros, privacidade e promessa indevida. | Headers de seguranca, 404 HTTP e link externo de noticia ainda ficaram como P2/P3. | Configurar headers no deploy e padronizar `noopener noreferrer`. |
| 18. Documentacao e evidencias | Documentar decisoes, criterios, evidencias, QA, release e pendencias durante a execucao, nao so no fim. | Foram criados muitos documentos de produto, QA, governanca, deploy, branches, portfolio, release e testes manuais. | Excedente | `docs/product/*`; `docs/qa/*` | Rastreabilidade ficou acima do minimo esperado para projeto academico. | Volume alto pode dificultar leitura se nao houver sumario executivo e indice de decisoes. | Manter documentos finais consolidados e arquivar documentos intermediarios por tema. |
| 19. Release e Go/No-Go | Definir criterios claros: GO demonstrativo, NO-GO operacional/acessibilidade se houver P1/P2 ou leitor de tela pendente. | O Go/No-Go final foi formalizado: GO para apresentacao publica controlada; NO-GO para produto operacional, release sem ressalvas e acessibilidade final. | Feito | `docs/product/release_final_status.md`; `docs/product/reuniao_vereditos_testes_manuais.md`; `docs/product/conclusao_sofia_reuniao_testes_manuais.md` | Evita comunicacao exagerada e protege a credibilidade do projeto. | Requer disciplina de apresentacao para nao transformar prototipo em promessa oficial. | Usar roteiro de demo com disclaimers obrigatorios. |
| 20. Proximos passos | Sair da release com backlog P0/P1/P2/P3 claro, donos e ordem de fechamento. | A reuniao final e a conclusao da Sofia listaram P1/P2/P3 e ordem recomendada de correcao. | Feito | `docs/product/reuniao_vereditos_testes_manuais.md`; `docs/product/conclusao_sofia_reuniao_testes_manuais.md`; `docs/product/conferencia_pendencias_pos_release.md` | O time sabe o que falta para evoluir de prototipo forte para produto mais confiavel. | Se ignorado, a proxima fase pode repetir expansao antes de confiabilidade. | Fechar P1 antes de ampliar escopo; depois P2 de acessibilidade, seguranca e feedback. |

## Principais desvios de processo

1. **Feltrim Agents foi definido tarde demais.** A execucao comecou com uma leitura mais visual/command center e depois precisou reposicionar o conceito para assistente guiado do usuario final. Esse foi o principal motor de retrabalho.

2. **Contrato de dados veio depois da experiencia.** IDs, recomendacoes e Perfil precisaram de Sprint 0 para estabilizar. O ideal teria sido criar o contrato de mocks, IDs canonicos e disponibilidade demonstrativa antes de telas e cards.

3. **A promessa de produto precisou ser recalibrada em varias camadas.** Home, catalogo, detalhe, Perfil, renovacao, feedback e demo precisaram repetir limites: dados locais, sem reserva real, sem backend/IA generativa real e sem catalogo oficial.

4. **Deploy foi tratado apos a release estar quase pronta.** O diagnostico de 404/401 mostrou que build verde nao garantia dominio publico correto. A configuracao raiz do Vercel/Netlify reduziu risco, mas a confirmacao de dashboard ficou manual.

5. **Acessibilidade automatizada ficou forte, mas validacao assistiva real ficou para depois.** Lighthouse 100/100 e ARIA melhoram a base, mas nao substituem NVDA/Narrator/VoiceOver com pessoa validadora.

6. **Testes manuais seniores chegaram tarde.** Eles foram valiosos e encontraram P1/P2 reais, mas idealmente teriam ocorrido antes do fechamento do PR final, para reduzir ressalvas pos-release.

## O que fizemos melhor do que o plano inicial

- A documentacao final ficou mais robusta que um plano minimo: produto, QA, sprints, deploy, branches, portfolio, release, Go/No-Go e testes manuais foram registrados.
- O `qa-guard` virou protecao real de contrato, nao apenas checklist manual.
- A Sprint 3 corrigiu achados concretos de Lighthouse e deixou acessibilidade automatizada em 100/100 nas rotas auditadas.
- A decisao final foi honesta: GO para prototipo demonstrativo e NO-GO para produto operacional/acessibilidade final.
- O projeto passou por validacao multidisciplinar com QA funcional, UX/acessibilidade, TL/seguranca e PO/PM.
- O problema de deploy foi tratado no repo com configuracao mais resiliente para monorepo.
- O portfolio foi separado sem contaminar o repo principal, reduzindo risco de historico quebrado.

## O que ainda esta abaixo do ideal

- Disponibilidade e acoes de biblioteca ainda podem parecer operacionais demais em alguns fluxos diretos, especialmente catalogo/detalhe e renovacao.
- Leitor de tela real nao foi validado; portanto nao ha base para declarar acessibilidade final.
- O bug mobile da bottom nav interceptando `Buscar` em `/home-mobile` foi reproduzido nos testes manuais.
- Headers de seguranca em producao ainda precisam ser completados.
- Rotas inexistentes exibem UI 404, mas podem retornar HTTP 200 por causa do fallback SPA.
- Feedback via GitHub Issues cria barreira de login e pode nao ser adequado para publico geral.
- Gamificacao exibiu contadores acima da meta, como `7/5`, enfraquecendo polimento.
- Confirmacao do dashboard Vercel ainda e uma etapa manual pendente.

## Licoes para proximos projetos

1. Fechar proposta de valor, publico, limites e nao-escopo antes de refinar UI.
2. Criar contrato de dados e nomenclatura antes de mocks virarem interface.
3. Tratar "prototipo" como requisito de UX: todo fluxo que pareca operacional precisa avisar seus limites no ponto de decisao.
4. Definir Go/No-Go, P0/P1/P2/P3 e QA + Dev pairing antes da primeira sprint.
5. Fazer validacao manual senior antes do PR final, nao apenas como auditoria pos-release.
6. Testar deploy publico cedo, incluindo dominio, rewrite SPA, protection, root directory e status HTTP.
7. Separar "acessibilidade automatizada" de "acessibilidade validada por tecnologia assistiva real".
8. Manter documentacao consolidada: documentos demais ajudam auditoria, mas o time precisa de uma pagina final de decisao e proximas acoes.

## Priorizacao final do que ainda falta

| Prioridade | Item | Por que importa | Evidencia | Proxima acao |
| --- | --- | --- | --- | --- |
| P0 | Nenhum P0 aberto identificado na reuniao final | Os quatro testes manuais nao encontraram bloqueador critico. | `docs/product/reuniao_vereditos_testes_manuais.md` | Manter gate: qualquer novo P0 bloqueia ampliacao publica. |
| P1 | Reforcar disponibilidade mockada no catalogo, detalhe e unidades | Evita usuario tomar decisao real de deslocamento com dado demonstrativo. | `docs/qa/teste_manual_tl_seguranca.md`; `docs/product/reuniao_vereditos_testes_manuais.md` | Adicionar aviso persistente junto de cada numero/status de disponibilidade. |
| P1 | Corrigir bottom nav interceptando `Buscar` em `/home-mobile` | CTA visivel fica inacessivel por toque em viewport comum. | `docs/qa/teste_manual_funcional_rafael_qa.md` | Ajustar area segura/padding/scroll-margin e criar teste mobile. |
| P1 | Validar leitor de tela real | Bloqueia declaracao de acessibilidade final. | `docs/qa/teste_manual_ux_acessibilidade.md`; `docs/product/conferencia_pendencias_pos_release.md` | Executar roteiro NVDA/Narrator com pessoa validadora e registrar evidencia. |
| P2 | Corrigir headings e tabs do Perfil | Melhora orientacao por tecnologia assistiva e relacao tab/painel. | `docs/qa/teste_manual_ux_acessibilidade.md`; `docs/product/reuniao_vereditos_testes_manuais.md` | Garantir `h1` nas listagens e `aria-controls` para paineis existentes. |
| P2 | Configurar headers de seguranca | Aumenta defesa contra clickjacking, sniffing, referrer leak e abuso de permissoes. | `docs/qa/teste_manual_tl_seguranca.md` | Adicionar CSP/frame ancestors, `nosniff`, Referrer-Policy e Permissions-Policy. |
| P2 | Decidir 404 HTTP real ou documentar limitacao SPA | Evita monitores e crawlers tratarem rota invalida como sucesso. | `docs/qa/teste_manual_tl_seguranca.md` | Implementar tratamento no deploy ou registrar limitacao formal. |
| P2 | Ajustar microcopy de `Renovar` | Evita parecer renovacao oficial de biblioteca. | `docs/qa/teste_manual_tl_seguranca.md`; `docs/product/conclusao_sofia_reuniao_testes_manuais.md` | Trocar por linguagem de renovacao demonstrativa/mockada. |
| P2 | Criar alternativa de feedback sem GitHub | Reduz barreira para usuarios nao tecnicos e publico geral. | `docs/product/aceite_manual_po_pm.md`; `docs/product/reuniao_vereditos_testes_manuais.md` | Preparar formulario ou canal assistido por Claudia/Sofia. |
| P2 | Marcar topo do Perfil como demonstrativo | Reduz ruido de privacidade e oficialidade. | `docs/product/aceite_manual_po_pm.md` | Adicionar aviso proximo ao cabecalho do perfil. |
| P2 | Ajustar gamificacao acima da meta | Evita percepcao de erro em contadores como `7/5`. | `docs/qa/teste_manual_funcional_rafael_qa.md`; `docs/product/reuniao_vereditos_testes_manuais.md` | Exibir "meta superada", `5/5 +2` ou equivalente. |
| P2 | Confirmar dashboard Vercel | Fecha a pendencia operacional de dominio/producao/protection. | `docs/product/conferencia_pendencias_pos_release.md` | Registrar evidencia manual de Git settings, domains, deployment e protection. |
| P3 | Padronizar links externos | Melhora consistencia de seguranca. | `docs/qa/teste_manual_tl_seguranca.md` | Usar `rel="noopener noreferrer"` em todos os `target="_blank"`. |
| P3 | Medir contraste formalmente | Necessario antes de qualquer declaracao WCAG. | `docs/qa/teste_manual_ux_acessibilidade.md` | Rodar medicao WCAG AA nos acentos e textos pequenos. |
| P3 | Padronizar acentos e microcopy | Melhora polimento institucional. | `docs/product/aceite_manual_po_pm.md` | Revisar strings como Catalogo/Catalogo, Noticias/Noticias, Preferencias etc. |
| P3 | Simplificar roteiro mobile | Reduz densidade da demonstracao em tela pequena. | `docs/product/reuniao_vereditos_testes_manuais.md` | Apresentar fluxo mobile com roteiro curto e secoes prioritarias. |
| P3 | Limpar branches antigas | Organizacao de repo, sem impacto direto na apresentacao. | `docs/product/conferencia_pendencias_pos_release.md` | Fazer tarefa separada com aprovacao explicita, sem `reset --hard` ou force push. |

## Conclusao

O que deveriamos ter feito desde o inicio era: definir produto e Feltrim Agents, congelar contrato de dados, estabelecer QA + Dev e Go/No-Go, depois executar visual, sprints, deploy e release. O que fizemos foi mais iterativo: primeiro refinamos a experiencia e o conceito, depois corrigimos o rumo com Sprint 0-3, documentação extensa, PRs, deploy e testes manuais.

Apesar do retrabalho, o resultado final e positivo: o SIBiSC/Feltrim Agents esta apresentavel como prototipo academico avancado, com valor claro e evidencias. O limite tambem esta claro: ainda nao deve ser declarado produto operacional, acessibilidade final ou sistema integrado de biblioteca ate que as pendencias P1/P2 sejam corrigidas e revalidadas.
