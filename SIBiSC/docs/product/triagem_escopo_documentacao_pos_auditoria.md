# Triagem de escopo da documentacao pos-auditoria - SIBiSC/Feltrim Agents

Data: 2026-05-19  
Escopo: triagem executiva e operacional das documentacoes recentes do SIBiSC, com foco em diferenciar MVP academico controlado, produto futuro, itens superdimensionados e riscos de comunicacao.  
Resultado esperado: orientar apresentacao, limpeza narrativa e backlog sem alterar codigo de producao.

## Fontes analisadas

- `SIBiSC/docs/auditoria/auditoria-completa-2026-05-19.md`
- `SIBiSC/docs/auditoria/analise-da-auditoria-2026-05-19.md`
- `SIBiSC/docs/auditoria/aprendizados/auditoria-senior-sibisc.md`
- `SIBiSC/docs/product/feltrim_agents_analise_completa_e_backlog.md`
- `SIBiSC/docs/product/auditoria_documentacao_final.md`
- `SIBiSC/docs/product/go_no_go_final_pos_fechamento.md`
- `SIBiSC/docs/product/consolidado_validacoes_operacionais_independentes.md`
- `SIBiSC/docs/product/conclusao_final_sofia_pos_validacoes_independentes.md`
- `SIBiSC/docs/product/release_final_status.md`
- `SIBiSC/docs/product/matriz_comparativa_chat_vs_execucao.md`
- `SIBiSC/docs/product/conferencia_pendencias_pos_release.md`
- `SIBiSC/docs/product/mvp_e_releases.md`
- `SIBiSC/docs/product/epicos_e_user_stories.md`
- `SIBiSC/docs/product/criterios_de_aceite.md`
- `SIBiSC/docs/qa/sprint_final_fechamento_evidencias.md`
- `SIBiSC/docs/qa/final_a11y_security_polish.md`
- `SIBiSC/docs/qa/validacao_leitor_tela_sofia.md`

## Veredito executivo

O SIBiSC esta dentro do escopo atual como **MVP academico demonstrativo e apresentacao publica controlada**, nao como produto operacional. A documentacao e abundante, rastreavel e majoritariamente honesta: ela reconhece dados mockados, ausencia de reserva real, ausencia de backend operacional, ausencia de IA generativa e limites de acessibilidade formal.

O escopo atual do MVP deve ser defendido como: portal de noticias, agenda de eventos, catalogo demonstrativo, disponibilidade mockada por unidade, recomendacao/assistente guiado com perguntas fechadas, feedback orientado e evidencias de QA/CI suficientes para uma banca academica. O maior cuidado e impedir que a narrativa transforme o prototipo em promessa de sistema real de biblioteca.

O produto futuro e valido, mas precisa ser separado da entrega atual. Entram aqui: integracao com SIBI/PHL ou Supabase real, autenticacao, persistencia, reserva/renovacao oficial, preferencias editaveis, feedback in-app definitivo, observabilidade, testes E2E formais, geolocalizacao real, painel de curadoria e acessibilidade auditada em leitores especificos.

O que esta superdimensionado para o momento e qualquer fala de IA real, chat livre com LLM, produto operacional final, conformidade WCAG completa, compatibilidade auditada com NVDA/Narrator/VoiceOver, catalogo oficial em tempo real, reserva real ou operacao institucional sem contrato de dados e governanca.

## Reuniao assincrona senior

### PO/PM

- O MVP academico esta defensavel quando descrito como camada de experiencia e descoberta sobre bibliotecas, nao como substituto do SIBI/PHL.
- O documento `mvp_e_releases.md` coloca noticias, eventos, busca de livros, disponibilidade por unidade e unidade mais proxima no R1; isso sustenta a apresentacao controlada.
- O backlog de Feltrim Agents e produto futuro e rico, mas mistura visao de produto com capacidades ainda nao entregues. A narrativa publica deve usar "assistente guiado" e "prototipo" como termos principais.
- Decisao pendente: quais itens entram na fala da banca como "implementado" versus "proxima sprint".

### Tech Lead / Security Engineer

- A base tecnica atual e SPA React/Vite com rotas publicas, services sobre mocks, `qa-guard`, build e deploy Vercel. Isso basta para demo controlada.
- A auditoria mais recente confirma headers defensivos e 404 publico no dominio efetivo, mas documentos anteriores registram validacao remota pendente ou 404 local como 200. Essa divergencia e temporal e deve ser explicada.
- Sem backend, autenticacao, autorizacao, RLS ativa, logs de operacao, observabilidade ou integracao oficial, o sistema nao pode ser chamado de produto operacional.
- `engines`, Vitest/Playwright formal, Lighthouse CI e manifestos de evidencia sao melhorias de engenharia para sprint futura, nao bloqueadores de apresentacao.

### QA / SDET

- Ha evidencia suficiente para GO academico: `qa:repo`, `qa:ci`, build Vite, smoke manual, Lighthouse/axe em documentos e validacoes independentes.
- `qa-guard` valida contratos de dados mockados, mas nao substitui testes unitarios ou E2E.
- Screenshots citados em documentos de QA nao aparecem todos no repositorio; isso e lacuna documental de reevidencia, nao prova de falha de produto.
- O maior risco de QA para a apresentacao e comunicacional: datas de eventos/noticias em marco de 2026, expectativas sobre reserva real e afirmacoes de acessibilidade alem da evidencia.

### UX / Acessibilidade

- Skip link, landmarks, foco visivel, `aria-live`, abas e labels foram melhorados e validados em rotas principais.
- Sofia foi aceita por decisao do Rafael como validadora real da experiencia assistiva para o GO controlado do prototipo.
- Isso nao equivale a compatibilidade auditada com NVDA, Narrator ou VoiceOver, nem a conformidade WCAG AA completa.
- A rota `/home-mobile` separada da home desktop continua uma decisao de produto/UX: aceitavel para demo quando explicada, fragil para usuario real sem redirecionamento automatico.

### Dados / Back-end

- O estado atual e mockado: livros, disponibilidade, eventos, noticias, perfil, emprestimos, favoritos, historico, jornada do leitor e recomendacoes.
- Supabase esta preparado, mas inativo nos fluxos principais; portanto e item de arquitetura futura, nao evidencia de backend operacional.
- Geolocalizacao atual e fallback manual por bairro, nao coordenada real nem permissao do navegador.
- Integracao com catalogo oficial, sincronizacao, RLS, fonte de verdade, reserva e renovacao oficial dependem de decisao institucional e contratos.

### Sofia / Representante operacional

- A fala operacional correta e: "libero a apresentacao controlada como prototipo academico demonstrativo".
- A Sofia valida que os fluxos sao compreensiveis e navegaveis, mas nao deve ser usada para prometer operacao real, acessibilidade plena ou atendimento institucional.
- Claudia aparece nos documentos mais como fluxo/canal de feedback do que como agente com validacao propria separada. Se ela for mencionada na defesa, vale criar nota curta de papel e limite operacional.
- O roteiro da apresentacao deve repetir: dados locais, disponibilidade demonstrativa, sem reserva real, sem renovacao oficial, sem IA generativa e sem integracao oficial.

## Matriz de escopo por tema/entrega

| Tema/entrega | Estado documental e factual | Classificacao | Evidencia documental | Acao recomendada |
| --- | --- | --- | --- | --- |
| Apresentacao academica controlada | Aprovada com ressalvas, sem P0/P1 bloqueante nos documentos finais. | Dentro do MVP atual | `go_no_go_final_pos_fechamento.md`, `conclusao_final_sofia_pos_validacoes_independentes.md`, `analise-da-auditoria-2026-05-19.md` | Manter GO com roteiro honesto. |
| Noticias: listagem e detalhe | Implementado no front com dados locais e docs de MVP R1. | Dentro do MVP atual | `mvp_e_releases.md`, `epicos_e_user_stories.md`, auditoria funcional | Apresentar como conteudo demonstrativo/mockado. |
| Eventos: agenda e detalhe | Implementado, mas datas mockadas de marco/2026 envelhecem a narrativa. | Dentro do MVP atual com risco de comunicacao | Auditoria completa A-001, analise da auditoria | Atualizar datas ou explicar agenda historica/mockada. |
| Catalogo e busca | Implementado com busca por titulo/autor/ISBN e detalhes. | Dentro do MVP atual | `mvp_e_releases.md`, auditoria completa, `qa-guard` | Reforcar que o acervo e demonstrativo. |
| Disponibilidade por unidade | Existe como contagem mockada, com avisos apos sprint final. | Dentro do MVP atual com ressalva | `sprint_final_fechamento_evidencias.md`, `go_no_go_final_pos_fechamento.md` | Nao usar como disponibilidade real. |
| Unidade mais proxima | Existe por bairro/fallback manual, nao por geolocalizacao real. | Dentro do MVP atual como simulacao | `mvp_e_releases.md`, auditoria de catalogo | Dizer "bairro selecionado/manual", nao "GPS real". |
| Feltrim Agents guiado | Existe como perguntas fixas e recomendacoes por regras locais. | Dentro do MVP atual | Auditoria completa, `feltrim_agents_analise_completa_e_backlog.md` atualizado por execucao posterior | Chamar de assistente guiado, nao IA generativa. |
| Chat livre / LLM | Documentado como desejo/produto futuro, nao implementado. | Produto futuro, fora do MVP atual | `feltrim_agents_analise_completa_e_backlog.md` | Manter como roadmap, sem promessa na demo. |
| Feedback Sofia/Claudia | GitHub Issues e roteiro local existem; canal in-app definitivo nao. | Produto futuro parcial | `sprint_final_fechamento_evidencias.md`, docs de feedback | Apresentar como fluxo operacional inicial. |
| Perfil, favoritos e jornada | Implementados como mock local; sem persistencia. | Dentro do MVP demonstrativo, produto futuro para uso real | `go_no_go_final_pos_fechamento.md`, `sprint_final_fechamento_evidencias.md` | Repetir "perfil demonstrativo". |
| Renovacao | Renomeada para simulacao; nenhuma operacao oficial. | Dentro do MVP apenas como demonstracao | `sprint_final_fechamento_evidencias.md` | Nunca chamar de renovacao oficial. |
| Reserva de livros | Explicitamente ausente. | Fora do MVP atual / produto futuro condicionado | Auditoria completa, `go_no_go_final_pos_fechamento.md` | Remover qualquer ambiguidade de copy. |
| Autenticacao e cadastro | Nao existem. | Produto futuro | Auditoria completa, backlog Feltrim Agents | Nao prometer conta real no MVP. |
| Supabase/backend real | Cliente preparado, inativo nos fluxos principais. | Produto futuro | Auditoria completa, docs de dados/backend | Tratar como preparacao tecnica, nao entrega. |
| Integracao SIBI/PHL/catalogo oficial | Documentada como direcao, sem contrato operacional. | Produto futuro condicionado | `feltrim_agents_analise_completa_e_backlog.md`, docs de arquitetura | Exigir decisao institucional e fonte de verdade. |
| Geolocalizacao real | Nao implementada; branch futura citada. | Produto futuro | Auditoria completa, `mvp_e_releases.md` | Decidir se R1 exige GPS real ou fallback manual basta. |
| Gamificacao | Jornada/sinais existem como demonstrativos; sem ranking publico. | MVP demonstrativo / produto futuro para persistencia | Auditoria completa, `sprint_final_fechamento_evidencias.md` | Evitar vender como sistema de engajamento real. |
| Acessibilidade estrutural | Boa base, Sofia aprovou GO controlado. | Dentro do MVP atual com ressalva | `validacao_leitor_tela_sofia.md`, `final_a11y_security_polish.md` | Dizer "validacao assistiva controlada", nao WCAG completo. |
| WCAG AA completa | Contraste formal e leitores especificos ainda nao fechados. | Fora do MVP atual | `go_no_go_final_pos_fechamento.md`, auditoria completa | NO-GO para declaracao plena. |
| NVDA/Narrator/VoiceOver | Nao houve auditoria auditiva dedicada de fornecedor especifico. | Fora do MVP atual | `validacao_leitor_tela_sofia.md` | So mencionar como pendencia futura. |
| Headers/404 publico | Confirmado na auditoria mais recente; docs antigos registram pendencia. | Dentro do MVP tecnico atual com contradicao documental | `analise-da-auditoria-2026-05-19.md`, `final_a11y_security_polish.md`, `consolidado_validacoes_operacionais_independentes.md` | Atualizar narrativa final para refletir estado mais recente. |
| Testes automatizados unit/E2E | Ausentes; existe guard de integridade e smoke manual. | Produto futuro / sprint tecnica | Auditoria completa, `analise-da-auditoria-2026-05-19.md` | Planejar Vitest e E2E minimo. |
| Evidencias visuais citadas | Algumas imagens referenciadas nao foram encontradas. | Ambiguo / lacuna documental | `auditoria_documentacao_final.md` | Criar manifesto de evidencias ou ajustar referencias. |
| Limpeza de branches | Documentada como pendente, sem autorizacao. | Fora do escopo da triagem atual | `conferencia_pendencias_pos_release.md` | Tratar em tarefa separada. |

## Itens dentro do escopo atual e evidencias

1. **MVP academico demonstrativo.** Evidencias: `go_no_go_final_pos_fechamento.md`, `conclusao_final_sofia_pos_validacoes_independentes.md` e auditoria completa convergem para GO controlado.
2. **Rotas principais publicas.** Evidencias: auditoria completa lista `/`, `/home-mobile`, `/noticias`, `/eventos`, `/catalogo`, `/perfil` e `*`; documentos de QA registram smoke.
3. **Noticias, eventos e catalogo com dados locais.** Evidencias: `mvp_e_releases.md`, `epicos_e_user_stories.md`, auditoria funcional e `qa-guard`.
4. **Feltrim Agents como assistente guiado.** Evidencias: auditoria completa descreve 9 perguntas fixas, fontes/limites e ausencia de chat livre/LLM.
5. **Disponibilidade demonstrativa clara.** Evidencias: `sprint_final_fechamento_evidencias.md` registra avisos em catalogo, cards, detalhe e unidades.
6. **Perfil e jornada como mock local.** Evidencias: `go_no_go_final_pos_fechamento.md` e sprint final indicam perfil demonstrativo e simulacao de renovacao.
7. **Acessibilidade suficiente para demo controlada.** Evidencias: `validacao_leitor_tela_sofia.md`, `final_a11y_security_polish.md` e docs de QA.
8. **Seguranca basica de SPA estatica.** Evidencias: auditoria completa e analise da auditoria registram headers, CSP, sem tokens hardcoded e `rel="noopener noreferrer"`.
9. **Rastreabilidade documental.** Evidencias: `auditoria_documentacao_final.md` considera a documentacao suficiente com lacunas localizadas.

## Itens dentro do produto, mas fora do MVP atual / sprint futura

1. **Autenticacao, cadastro e preferencias editaveis.** Necessitam modelo de dados, consentimento, persistencia e politica de privacidade.
2. **Integracao oficial SIBI/PHL/Supabase.** Necessita fonte de verdade, contratos, sincronizacao, RLS, logs e reconciliacao.
3. **Reserva e renovacao oficial.** Exigem operacao institucional, regras de circulacao, confirmacao e governanca.
4. **Chat real ou IA generativa.** Exige escopo, guardrails, logs, avaliacao, fallback e controle de alucinacao.
5. **Feedback in-app definitivo sem GitHub.** Precisa canal aprovado, dono operacional, SLA, classificacao e retorno.
6. **Observabilidade e analytics.** Requer decisao de privacidade, eventos minimos, dashboard e metricas de sucesso.
7. **Testes unitarios/E2E formais.** Devem cobrir services, fluxos criticos e regressao mobile.
8. **Auditoria formal de acessibilidade.** Inclui medicao de contraste e, se comunicado, NVDA/Narrator/VoiceOver.
9. **Geolocalizacao real.** Precisa permissao, coordenadas, erro/fallback e criterio claro de distancia.
10. **Curadoria/admin de noticias, eventos e acervo.** Produto futuro para operacao real.

## Itens fora de escopo ou superdimensionados para o momento

1. **Declarar SIBiSC como produto operacional real.** Fora de escopo porque nao ha backend, autenticacao, persistencia, integracao oficial ou operacao institucional.
2. **Declarar Feltrim Agents como IA real/LLM.** Superdimensionado porque o comportamento atual e regras locais e perguntas fixas.
3. **Declarar reserva/renovacao oficial.** Fora de escopo porque as acoes sao demonstrativas e nao enviam operacao para biblioteca.
4. **Declarar disponibilidade real em tempo real.** Fora de escopo porque os dados sao mockados e nao sincronizados com fonte oficial.
5. **Declarar WCAG AA completa.** Fora de escopo porque faltam medicao formal de contraste e validacoes especificas.
6. **Declarar compatibilidade auditada com NVDA/Narrator/VoiceOver.** Fora de escopo porque Sofia valida o GO controlado, mas nao executa esses leitores especificos.
7. **Prometer canal institucional de atendimento.** Superdimensionado porque GitHub/roteiro local sao meios iniciais, nao atendimento oficial.
8. **Tratar dashboards, observabilidade e analytics como prontos.** Fora de escopo porque estao apenas no backlog/visao futura.
9. **Tratar Claudia como agente validador independente.** Ambiguo/superdimensionado sem nota propria; hoje aparece mais como papel de fluxo de feedback.

## Ambiguidades e decisoes pendentes

1. **Datas dos eventos e noticias.** Rafael deve decidir se atualiza para a data da apresentacao ou explica como conteudo historico/mockado.
2. **Estrategia mobile.** Decidir se `/home-mobile` continua rota manual de demo ou se a home unica/responsiva entra em sprint futura.
3. **Linguagem do Feltrim Agents.** Decidir a palavra oficial da apresentacao: recomendacao e "assistente guiado" devem prevalecer sobre "IA" ate existir IA real.
4. **Canal de feedback sem GitHub.** Rafael/professor devem aprovar se roteiro local basta ou se precisa formulario/e-mail/canal institucional.
5. **Escopo de acessibilidade a comunicar.** Decidir se a banca ouvira "boas praticas e validacao Sofia" ou se sera prometida validacao formal, que ainda exigiria nova rodada.
6. **Fonte de verdade futura.** Professor/orientador/Rafael devem decidir entre SIBI/PHL, Supabase espelho, importacao manual ou simulacao mantida.
7. **Claudia como papel operacional.** Se Claudia entrar na apresentacao, criar nota objetiva de responsabilidades e limites.
8. **Contradicao headers/404.** Documentos antigos registram pendencia; auditoria mais recente confirma no dominio publico. Decidir se atualizar docs finais ou apenas apontar o documento mais recente como fonte prevalente.
9. **Evidencias visuais ausentes.** Decidir se vale anexar prints/manifesto final ou ajustar referencias para nao prometer artefatos inexistentes.

## Riscos de comunicacao

| Risco | Por que importa | Forma segura de comunicar |
| --- | --- | --- |
| "Feltrim Agents" soar como IA generativa | Pode sugerir LLM/chat livre nao implementado. | "Assistente guiado com perguntas fechadas e recomendacoes por regras locais." |
| Disponibilidade parecer real | Pode induzir deslocamento ou decisao operacional. | "Contagem demonstrativa/mockada; confirme com a biblioteca." |
| Reserva/renovacao parecer oficial | Pode gerar expectativa transacional. | "Simulacao demonstrativa, sem operacao enviada a biblioteca." |
| Perfil parecer conta real | Pode levantar privacidade/autenticacao. | "Perfil local/mockado para demonstrar jornada." |
| Sofia virar certificacao de acessibilidade | Pode inflar evidencia. | "Validacao assistiva controlada para GO do prototipo; sem auditoria NVDA/Narrator/VoiceOver." |
| Lighthouse/axe virar WCAG completo | Ferramenta automatica nao cobre tudo. | "Boas praticas e checks automatizados; contraste formal ainda pendente." |
| Headers/404 terem narrativa contraditoria | Docs antigos e novos divergem temporalmente. | "Estado mais recente confirma; documentos anteriores registram etapa historica." |
| GitHub Issues parecer canal institucional | Feedback pode ser publico e exigir conta. | "Canal inicial de projeto; roteiro local sem login; canal definitivo pendente." |
| Eventos passados parecerem bug | Datas de marco/2026 em apresentacao posterior reduzem confianca. | Atualizar datas ou dizer explicitamente que sao dados mockados/historicos. |

## Contradicoes ou leituras que exigem cuidado

1. **Headers e 404.** `consolidado_validacoes_operacionais_independentes.md` e `final_a11y_security_polish.md` registram pendencia remota ou 404 local como 200. A `analise-da-auditoria-2026-05-19.md` registra confirmacao posterior de headers e 404 no dominio publico. Leitura recomendada: divergencia temporal, nao conflito fatal.
2. **Leitor de tela.** `sprint_final_fechamento_evidencias.md` ainda dizia validacao real pendente. `validacao_leitor_tela_sofia.md` fecha a pendencia de pessoa validadora para GO controlado por decisao do Rafael, mas nao NVDA/Narrator/VoiceOver.
3. **Backlog antigo de Feltrim Agents.** `feltrim_agents_analise_completa_e_backlog.md` cita riscos P0/P1 que foram corrigidos depois por sprints finais; deve ser lido como diagnostico historico e backlog, nao como estado final absoluto.
4. **Documentacao de evidencias.** Alguns prints citados nao foram encontrados. Isso nao derruba o app, mas reduz reauditoria documental.
5. **MVP R1 e produto real.** `mvp_e_releases.md` fala em disponibilidade e unidade mais proxima; no estado atual, isso deve ser interpretado como MVP demonstrativo com mocks, nao como dado oficial.

## Recomendacoes de limpeza e ajuste de narrativa

1. Criar um bloco padrao para abertura da apresentacao: "prototipo academico demonstrativo, dados locais/mockados, sem reserva real, sem IA generativa, sem catalogo oficial em tempo real".
2. Atualizar ou contextualizar datas de eventos/noticias antes da demo.
3. Usar sempre "assistente guiado" para o Feltrim Agents; reservar "IA" para visao futura.
4. Inserir no indice e nos documentos finais uma indicacao de fonte prevalente: `go_no_go_final_pos_fechamento.md` + `analise-da-auditoria-2026-05-19.md`.
5. Criar uma nota curta sobre Claudia se ela for citada como papel da operacao.
6. Criar `docs/qa/manifesto_evidencias.md` ou ajustar referencias a screenshots ausentes.
7. Atualizar docs antigos, quando oportuno, com nota de "estado superado por auditoria posterior" para headers/404.
8. Separar backlog de produto futuro de itens exigidos para a banca, evitando parecer lista de promessas.
9. Trocar termos como "reserva", "renovacao" e "disponibilidade" por versoes qualificadas quando forem mock: "simulacao", "demonstrativa", "contagem local".

## Proximos passos priorizados

### Antes da apresentacao

1. Atualizar datas de eventos ou preparar fala explicando conteudo mockado/historico.
2. Revisar o roteiro de demo para repetir limites de produto nos pontos sensiveis: Feltrim Agents, disponibilidade, Perfil, renovacao e acessibilidade.
3. Definir se `/home-mobile` sera usada explicitamente na apresentacao mobile.
4. Apontar `go_no_go_final_pos_fechamento.md` e esta triagem como leitura executiva principal.
5. Evitar qualquer slide que prometa WCAG completo, IA real, reserva oficial ou catalogo em tempo real.

### Proxima sprint tecnica

1. Adicionar `engines` ao `package.json`.
2. Criar testes unitarios minimos para services e guard de recomendacoes.
3. Criar smoke E2E minimo para Home, Catalogo, Detalhe, Perfil e Eventos.
4. Medir contraste formalmente nos pontos criticos.
5. Confirmar e registrar headers/404 no dominio publico apos qualquer novo deploy.
6. Criar manifesto de evidencias QA.

### Produto futuro

1. Decidir fonte de verdade e estrategia de integracao oficial.
2. Definir cadastro, preferencias e consentimento.
3. Planejar feedback in-app com dono operacional e SLA.
4. Evoluir Feltrim Agents de painel guiado para assistente real somente com guardrails e avaliacao.
5. Definir se reserva/renovacao entram no produto ou permanecem fora do escopo.

## Fechamento

A triagem final e: **dentro do escopo atual para MVP/apresentacao academica controlada; dentro do produto futuro para integracao, autenticacao, persistencia, feedback definitivo e acessibilidade formal; fora do escopo atual para promessas operacionais, IA real, WCAG completa e transacoes oficiais**.

O time deve preservar a forca do projeto sem inflar a promessa. O SIBiSC esta pronto para demonstrar valor, engenharia, cuidado de UX e maturidade documental; ainda nao esta pronto para operar como sistema real de biblioteca.
