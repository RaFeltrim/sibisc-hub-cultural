# Feltrim Agents no SIBiSC - Analise Completa e Backlog

Ultima atualizacao: 2026-05-18  
Escopo analisado: front React/Vite, rotas, paginas, mocks, services, documentacao de produto, arquitetura, QA e feedback.

## 1. Visao executiva

O SIBiSC esta hoje em um estado funcional de prototipo avancado de frontend. As rotas publicas principais existem e carregam conteudo local: Home, Noticias, Eventos, Catalogo, Detalhe de Livro, Perfil e 404. A experiencia visual foi reposicionada para uma linguagem mais profissional, mobile-first e com Feltrim Agents como camada de assistencia ao usuario final.

O Feltrim Agents, porem, ainda nao existe como assistente interativo real. O que existe e uma vitrine de conceito na Home, uma busca assistida baseada no catalogo mockado e um algoritmo simples de recomendacao por regras locais usando preferencias fixas do usuario mockado. Ainda nao existem chat, modelo de IA, cadastro real, preferencias editaveis, feedback estruturado no produto, integracao com catalogo oficial, reserva real, autenticacao, persistencia ou observabilidade de uso.

O maior risco atual nao e visual. O maior risco e de confiabilidade percebida: ha links do Perfil apontando para IDs numericos inexistentes no catalogo (`1..12` contra `b1..b8`), botoes que parecem executar acoes sem retorno claro, inconsistencias de microcopy/acento, lacunas de acessibilidade em filtros/tabs e uma promessa de IA ainda maior que a capacidade implementada.

Recomendacao de decisao: antes de expandir IA, gamificacao ou integracao externa, estabilizar os fluxos P0/P1 do prototipo, alinhar a promessa do Feltrim Agents com o comportamento real e transformar os mocks em contratos evolutiveis para backend/Supabase/catalogo oficial.

## 2. Fontes inspecionadas

- `README.md`
- `package.json`
- `src/routes/AppRouter.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/HomePageMobile.jsx`
- `src/pages/CatalogPage.jsx`
- `src/pages/BookDetailPage.jsx`
- `src/pages/EventsPage.jsx`
- `src/pages/EventDetailPage.jsx`
- `src/pages/NewsPage.jsx`
- `src/pages/NewsDetailPage.jsx`
- `src/pages/UserProfilePage.jsx`
- `src/components/layout/AppLayout.jsx`
- `src/components/layout/BottomNav.jsx`
- `src/components/ui/SearchField.jsx`
- `src/components/ui/FilterPills.jsx`
- `src/components/ui/AvailabilityTable.jsx`
- `src/components/cards/BookCard.jsx`
- `src/services/catalogService.js`
- `src/services/eventsService.js`
- `src/services/newsService.js`
- `src/services/userProfileService.js`
- `src/lib/supabaseClient.js`
- `src/mocks/books.js`
- `src/mocks/events.js`
- `src/mocks/news.js`
- `src/mocks/units.js`
- `src/mocks/userProfile.js`
- `docs/product/epicos_e_user_stories.md`
- `docs/product/criterios_de_aceite.md`
- `docs/product/mvp_e_releases.md`
- `docs/product/personas.md`
- `docs/frontend/fluxos_e_telas.md`
- `docs/data/modelo_de_dados.md`
- `docs/backend/apis_e_contratos.md`
- `docs/architecture/integracoes.md`
- `docs/governance/feedbacks/README.md`
- `docs/qa/plano_completo_testes_zero_problemas.md`

## 3. Proposta de valor do Feltrim Agents

Feltrim Agents deve ser a camada de assistencia inteligente do SIBiSC para o usuario final. A proposta correta nao e substituir o catalogo oficial, o PHL ou qualquer sistema bibliotecario de autoridade. A proposta e reduzir atrito de descoberta, orientar o usuario em linguagem simples e aproximar acervo, agenda cultural, noticias e perfil de leitura.

Valor principal:

- Ajudar o usuario a descobrir livros disponiveis com base em preferencias declaradas, historico e contexto.
- Explicar por que um livro foi recomendado, evitando recomendacoes opacas.
- Orientar o uso do sistema: busca, disponibilidade, unidade mais proxima, eventos, devolucoes, favoritos e proximas acoes.
- Transformar dados institucionais dispersos em uma experiencia mobile-first coerente.
- Criar um ciclo de melhoria com feedback humano por Sofia e Claudia.

Limite conceitual importante: Feltrim Agents deve falar como assistente do leitor, nao como painel interno de agentes, squad ou automacao administrativa.

## 4. Diferencial frente ao SIBI/PHL oficial

| Dimensao | SIBI/PHL oficial | SIBiSC com Feltrim Agents |
| --- | --- | --- |
| Papel principal | Sistema oficial de catalogacao, circulacao e autoridade bibliografica. | Camada moderna de experiencia, descoberta e orientacao mobile-first. |
| Fonte de verdade | Deve continuar sendo o sistema oficial ou base institucional. | Deve consumir, espelhar ou integrar dados oficiais, sem contradizer a fonte. |
| Busca | Foco em consulta bibliografica e registros estruturados. | Busca orientada ao usuario comum: titulo, autor, ISBN, interesse, contexto e disponibilidade. |
| Recomendacao | Geralmente inexistente ou limitada. | Recomendacoes explicaveis baseadas em preferencias, disponibilidade e historico. |
| Jornada cultural | Normalmente separada do catalogo. | Une acervo, noticias, eventos e perfil em uma jornada unica. |
| Mobile | Pode ser funcional, mas nao necessariamente desenhado para uso rapido. | Mobile-first, com bottom nav, cards, microinteracoes e estados de uso. |
| Feedback | Canais institucionais separados. | Sofia e Claudia como ciclo operacional de coleta, triagem, retorno e backlog. |
| Gamificacao inclusiva | Nao e foco. | Trilhas, metas pessoais e selos sem ranking competitivo. |

Posicionamento recomendado: o SIBiSC deve ser apresentado como uma camada de acesso e engajamento sobre o ecossistema de bibliotecas, nao como substituto do sistema oficial de gestao bibliotecaria.

## 5. Estado atual do sistema

### 5.1 Implementado de verdade no front

| Area | Estado observado |
| --- | --- |
| Aplicacao React/Vite | Existe e usa React Router, CSS Modules e Vite. |
| Rotas principais | `/`, `/home-mobile`, `/noticias`, `/noticias/:newsId`, `/eventos`, `/eventos/:eventId`, `/catalogo`, `/catalogo/:bookId`, `/perfil`, `*`. |
| Layout global | Header, desktop nav, footer com unidades e bottom nav mobile. |
| Home/Feltrim Agents | Hero novo com proposta de assistente, acoes para catalogo/eventos/perfil, busca assistida e recomendacoes mockadas. |
| Noticias | Listagem, filtros por categoria, detalhe, fonte externa e estados de loading/vazio/erro. |
| Eventos | Listagem agrupada por dia, detalhe, data/horario/local/publico/inscricao e botao Google Calendar. |
| Catalogo | Busca por titulo, autor e ISBN, debounce, resultados, cards de livros e detalhe com disponibilidade. |
| Disponibilidade por unidade | Inventario mockado por unidade, total disponivel e destaque de unidade mais proxima por bairro manual. |
| Perfil | Dados de usuario mockado, preferencias, notificacao, emprestimos, historico, favoritos, renovar e remover favorito. |
| Mocks e services | Services pequenos isolam dados locais para futura troca por backend/Supabase. |
| Supabase client | Cliente existe e detecta variaveis, mas nao e usado nos fluxos principais. |
| QA documental | Ha plano completo de QA zero-problemas e documentos de casos funcionais, seguranca e acessibilidade. |

### 5.2 Parcial, prototipo ou mock

| Area | O que existe | O que falta para ser produto real |
| --- | --- | --- |
| Assistente IA | Texto de conceito, busca local e recomendacao por regra simples. | Chat, NLU, memoria, fontes verificaveis, guardrails, logs, avaliacao e fallback. |
| Recomendacoes | Home cruza preferencias fixas com livros disponiveis. | Preferencias editaveis, historico real, explicabilidade robusta, diversidade, exclusao de indisponiveis e feedback da recomendacao. |
| Perfil do leitor | Tela com dados mockados e preferencias fixas. | Cadastro, login, edicao de preferencias, consentimento, persistencia e privacidade. |
| Emprestimos e favoritos | Estado local mutavel em mock. | Integracao com circulacao real, consistencia com catalogo, confirmacao e persistencia. |
| Reservas | Noticia menciona reserva online; perfil usa aba `reservas` para emprestimos. | Fluxo real de reserva, regras de disponibilidade, prazos, cancelamento e confirmacao. |
| Google Calendar | URL e abertura em nova aba. | Validacao de timezone, fallback mobile/popup, feedback visual e dados completos no evento. |
| Geolocalizacao | Fallback manual por bairro. | Permissao de geolocalizacao real, coordenadas, calculo de distancia e tratamento de erro. |
| Integracao oficial | Docs preveem Supabase e sincronizacao. | Contrato com SIBI/PHL, ingestao, frequencia, observabilidade, reconciliacao e fonte de verdade. |
| Feedback Sofia/Claudia | Processo documentado no plano QA. | Entrada no produto, template operacional, issues rastreaveis e SLA visivel. |
| Gamificacao | Ideia discutida no contexto do dia. | Nenhuma tela, componente, modelo de dados ou regra implementada. |

### 5.3 Conversado hoje, mas ainda nao existe no sistema

- Chat real do Feltrim Agents para tirar duvidas do usuario.
- Assistente capaz de recomendar por conversa, preferencias coletadas no cadastro e disponibilidade atualizada.
- Cadastro/onboarding de preferencias de leitura.
- Edicao de preferencias no perfil.
- Consentimento explicito para uso de preferencias/historico em recomendacoes.
- Gamificacao com trilhas, selos, metas pessoais e desafios culturais.
- Feedback in-app por Sofia e Claudia.
- Observabilidade de uso, eventos de analytics, funil de recomendacao e metricas de sucesso.
- Integracao com catalogo oficial/SIBI/PHL ou Supabase em producao.
- Reserva real de livro ou acao transacional com biblioteca.
- Testes automatizados E2E cobrindo fluxo Home -> Recomendacao -> Catalogo -> Detalhe -> Acao.
- Painel ou rotina para curadoria/admin de noticias, eventos e acervo.

## 6. Jornada ideal do usuario

1. Cadastro
   - Usuario cria ou acessa perfil.
   - Informa unidade preferida, bairro, temas de interesse, autores, categorias, objetivo de leitura e permissao de uso desses dados.

2. Preferencias
   - Sistema transforma entradas em preferencias verificaveis.
   - Usuario pode editar, pausar ou apagar preferencias.
   - Feltrim Agents explica que usa preferencias e disponibilidade para recomendar.

3. Recomendacao
   - Usuario pede ajuda ou recebe sugestoes contextualizadas.
   - Cada recomendacao mostra motivo, disponibilidade, unidade mais proxima e alternativa se o livro estiver indisponivel.

4. Catalogo
   - Usuario abre o livro recomendado.
   - Confere metadados, unidades, quantidade disponivel, horario e rota/unidade prioritaria.

5. Reserva ou acao
   - MVP minimo: orientar retirada, favoritar ou compartilhar.
   - Evolucao: reservar exemplar, acompanhar prazo, cancelar reserva ou pedir aviso de disponibilidade.

6. Feedback
   - Usuario avalia se a recomendacao ajudou.
   - Sofia e Claudia recebem feedbacks qualificados.
   - QA reproduz problemas, PO prioriza e PM acompanha SLA.

## 7. Desalinhamentos encontrados

### 7.1 Conceituais

- A Home chama Feltrim Agents de assistente IA, mas o comportamento implementado e recomendacao local por regra e busca em mock. Isso pode gerar expectativa maior que a entrega.
- A aba interna do Perfil usa o estado `reservas`, mas a UI exibe `Emprestimos`. O conceito de reserva ainda nao esta implementado.
- O produto quer ser camada moderna sobre o catalogo oficial, mas ainda nao ha fonte oficial nem contrato de integracao. O prototipo deve deixar claro que a disponibilidade e mockada.
- Feedback de Sofia e Claudia esta documentado como processo, mas nao existe como funcionalidade para usuario final.

### 7.2 Tecnicos

- `src/mocks/books.js` usa IDs `b1..b8`; `src/mocks/userProfile.js` usa `1..12`. Isso quebra links de emprestimos, historico e favoritos para detalhes de livro.
- `userProfileService.js` implementa chamadas mockadas async, mas `UserProfilePage.jsx` importa diretamente de `mocks/userProfile.js`, duplicando caminho de dados e dificultando evolucao para service/backend.
- `supabaseClient.js` existe, mas os services principais ainda usam somente mocks locais.
- `getRecommendations()` retorna IDs `rec-001..rec-003`, autores e titulos nao necessariamente presentes no catalogo mockado; nao esta conectado a links reais.
- Datas de eventos mockadas estao fixas em marco de 2026; isso pode envelhecer rapidamente.
- `createGoogleCalendarUrl()` nao explicita timezone e usa endpoint que pode abrir uma pagina generica dependendo do ambiente/autenticacao.

### 7.3 UX e acessibilidade

- Botao `Buscar`/`Explorar` em buscas nao produz feedback perceptivel porque o resultado ja muda por debounce e `onSubmit` esta vazio.
- Filtros e tabs usam botao visual ativo, mas ainda precisam de estado semantico como `aria-pressed`, `role="tablist"`/`role="tab"` ou equivalente.
- `AvailabilityTable` mostra distancia com separador `|`; quando nao ha bairro selecionado, o comportamento pode deixar texto truncado ou pouco claro.
- Botao `Remover` esta dentro de um `Link` em Favoritos, uma estrutura interativa aninhada arriscada para teclado, leitor de tela e eventos.
- Acentuacao e microcopy variam entre `Catalogo`/`Catálogo`, `Noticias`/`Notícias`, `Inicio`/`Início`, `Sao Carlos`/`São Carlos`.
- O estado vazio/fallback de localizacao aparece no Catalogo apenas quando ha query; a mensagem pode sugerir indisponibilidade de localizacao mesmo sem o usuario ter pedido geolocalizacao.

## 8. Principais riscos para usuarios reais

| Risco | Impacto | Severidade |
| --- | --- | --- |
| Links do Perfil abrem "Livro nao encontrado". | Quebra fluxo de confianca em emprestimos, historico e favoritos. | P0 |
| Usuario interpreta recomendacao mockada como disponibilidade real. | Pode gerar deslocamento indevido ou frustracao. | P0/P1 |
| Promessa de IA sem assistente real. | Perda de credibilidade e confusao de produto. | P1 |
| Botoes sem retorno perceptivel. | Usuario repete acoes ou acha que o sistema falhou. | P1 |
| Reserva sugerida em conteudo, mas nao implementada. | Expectativa transacional nao atendida. | P1 |
| Google Calendar abre incompleto ou generico. | Usuario perde evento ou nao consegue salvar lembrete. | P1 |
| Interacoes sem semantica ARIA adequada. | Barreiras para teclado/leitores de tela. | P1 |
| Dados mockados sem rotulo claro. | Validacao academica pode confundir prototipo com produto integrado. | P1 |
| Falta de observabilidade. | Time nao sabe onde usuarios travam. | P2 |
| Falta de fluxo real de feedback. | Sofia/Claudia viram processo manual sem rastreabilidade no produto. | P2 |

## 9. Mapa existe vs falta

| Jornada/Capacidade | Existe hoje | Falta para MVP confiavel | Prioridade |
| --- | --- | --- | --- |
| Home profissional | Sim | Ajustar promessa de IA ao comportamento real ate existir assistente. | P1 |
| Busca de catalogo | Sim, em mock | Feedback no submit, estados melhores, integracao futura. | P1 |
| Detalhe de livro | Sim | Links consistentes, acao clara de retirada/reserva, fonte dos dados. | P0 |
| Perfil | Sim, mock | IDs validos, tabs acessiveis, service unificado, edicao de preferencias. | P0/P1 |
| Preferencias | Parcial | Cadastro e edicao real. | P1 |
| Recomendacoes | Parcial | Motor explicavel conectado a catalogo e feedback. | P1 |
| Assistente IA | Conceito | Chat/fluxo conversacional, guardrails, logs e avaliacao. | P1/P2 |
| Eventos | Sim | Calendar robusto e feedback de acao. | P1 |
| Noticias | Sim | Acentuacao consistente e curadoria real. | P2 |
| Feedback Sofia/Claudia | Documentado | Formulario/canal in-app e workflow rastreavel. | P2 |
| Gamificacao | Nao | Modelo, UI, regras inclusivas e metricas. | P2 |
| Observabilidade | Nao | Eventos, funis, erros e dashboard. | P2 |
| Catalogo oficial | Nao | Contratos, sync, fallback e reconciliacao. | P1/P2 |

## 10. Backlog priorizado por epicos

### EP01 - Assistente IA Feltrim Agents

Objetivo: transformar a vitrine atual em uma assistencia real, confiavel e limitada ao escopo do SIBiSC.

Itens priorizados:

- P1: Definir escopo do assistente: duvidas de uso, recomendacoes, eventos e disponibilidade.
- P1: Criar componente de conversa ou painel assistido com historico curto da sessao.
- P1: Implementar respostas baseadas em dados locais do catalogo/eventos/noticias, sem inventar disponibilidade.
- P1: Exibir fontes usadas em cada resposta: livro, unidade, evento ou noticia.
- P1: Criar fallback honesto quando nao houver dados.
- P2: Registrar feedback da resposta: ajudou, nao ajudou, motivo.
- P2: Criar avaliacao QA de prompts, respostas proibidas e regressao.

Criterios de aceite:

- O assistente nunca afirma disponibilidade sem dado vindo do catalogo.
- Toda recomendacao possui motivo compreensivel e link valido.
- Quando nao sabe responder, orienta proxima acao sem inventar informacao.
- Usuario consegue identificar que esta em um prototipo se os dados ainda forem mockados.
- QA consegue reproduzir ao menos 10 perguntas principais com resultado esperado.

### EP02 - Recomendacoes

Objetivo: recomendar livros disponiveis, relevantes e explicaveis.

Itens priorizados:

- P0: Corrigir IDs entre perfil, favoritos, historico e catalogo.
- P1: Unificar recomendacoes para usar somente livros existentes no catalogo.
- P1: Criar criterios de afinidade: categoria, autor, topico, disponibilidade e unidade preferida.
- P1: Exibir motivo e disponibilidade em cada recomendacao.
- P1: Criar estado "nao encontrei sugestao segura" com alternativa de busca.
- P2: Permitir feedback por recomendacao.
- P2: Medir clique, detalhe aberto, favorito/reserva e rejeicao.

Criterios de aceite:

- Nenhuma recomendacao aponta para rota inexistente.
- Livros indisponiveis nao aparecem como sugestao principal sem aviso.
- O motivo da recomendacao e especifico, nao generico.
- A lista se atualiza quando preferencias mudam.
- O usuario pode seguir da recomendacao para detalhe do catalogo em um clique.

### EP03 - Cadastro e Preferencias

Objetivo: coletar dados minimos para personalizacao com transparencia.

Itens priorizados:

- P1: Criar onboarding de preferencias: categorias, autores, temas, unidade, bairro.
- P1: Criar tela de edicao de preferencias no Perfil.
- P1: Separar dados pessoais de preferencias de recomendacao.
- P1: Informar como as preferencias sao usadas.
- P2: Permitir limpar preferencias e pausar personalizacao.
- P2: Preparar modelo para Supabase/Auth.

Criterios de aceite:

- Usuario consegue cadastrar ao menos 3 preferencias de leitura.
- Usuario consegue editar preferencias depois do cadastro.
- Alteracao de preferencia muda recomendacoes ou explica por que nao mudou.
- Ha texto claro de consentimento/uso dos dados.
- Dados sensiveis nao aparecem em logs ou UI publica.

### EP04 - Gamificacao do leitor

Objetivo: aumentar engajamento com metas pessoais e inclusivas, sem ranking competitivo.

Itens priorizados:

- P2: Definir trilhas: Explorador de Literatura Brasileira, Agenda Cultural, Primeira Visita, Leitura em Familia.
- P2: Criar selos de progresso individual, sem comparacao publica.
- P2: Criar metas pessoais configuraveis: livros salvos, eventos visitados, temas explorados.
- P2: Conectar desafios a acoes reais: favoritar, participar, devolver no prazo, avaliar recomendacao.
- P3: Criar historico visual de conquistas no Perfil.

Criterios de aceite:

- A gamificacao nao usa ranking publico nem exposicao comparativa.
- Usuario entende como conquistar cada selo.
- A interface evita linguagem punitiva ou excludente.
- Metas podem ser ignoradas sem bloquear uso do sistema.
- QA valida que conquistas nao podem ser disparadas por links quebrados ou dados inconsistentes.

### EP05 - Feedback Sofia/Claudia

Objetivo: fechar o ciclo entre usuario, produto, QA e backlog.

Itens priorizados:

- P2: Criar formulario simples de feedback no produto.
- P2: Classificar feedback: duvida, erro, sugestao, recomendacao ruim, acessibilidade.
- P2: Registrar rota, dispositivo, horario e contexto quando permitido.
- P2: Criar template operacional para Sofia e Claudia com SLA.
- P2: Gerar item de backlog/issue rastreavel.
- P3: Criar status de retorno ao usuario: recebido, em analise, planejado, corrigido.

Criterios de aceite:

- Usuario consegue enviar feedback em ate 2 passos a partir de qualquer rota critica.
- Sofia/Claudia recebem informacao suficiente para triagem.
- QA consegue reproduzir problemas com base no registro.
- Feedback P0/P1 tem caminho claro para priorizacao.
- Nenhum feedback fica sem dono apos triagem.

### EP06 - QA e Observabilidade

Objetivo: reduzir risco antes de evoluir escopo.

Itens priorizados:

- P0: Criar auditoria automatizada de IDs entre mocks e rotas.
- P1: Criar smoke automatizado das rotas criticas.
- P1: Criar testes E2E para Home -> Catalogo -> Detalhe, Perfil -> Livro, Evento -> Calendar.
- P1: Medir erros de console e links quebrados.
- P2: Adicionar eventos de analytics: busca, recomendacao exibida, recomendacao clicada, livro aberto, feedback enviado.
- P2: Definir dashboard minimo de saude: erros, conversao de busca, top termos sem resultado.

Criterios de aceite:

- `npm run qa:ci` continua passando antes de release.
- Build nao passa com links criticos de mock quebrados, se o guard for implementado.
- Fluxos P0 possuem evidencia manual ou automatizada.
- Erros de console em rotas criticas sao tratados como bloqueio.
- Metricas nao coletam dados pessoais sem necessidade.

### EP07 - Acessibilidade

Objetivo: manter a qualidade visual sem excluir usuarios.

Itens priorizados:

- P1: Adicionar semantica correta para tabs do Perfil.
- P1: Adicionar `aria-pressed` ou equivalente em filtros/pills de Noticias, Catalogo e Detalhe.
- P1: Resolver interacao aninhada de botao dentro de link em Favoritos.
- P1: Garantir foco visivel e ordem de teclado em Home, Catalogo, Eventos e Perfil.
- P2: Validar contrastes apos redesign visual.
- P2: Padronizar textos com acentuacao e linguagem clara.

Criterios de aceite:

- Todas as acoes principais funcionam por teclado.
- Controles ativos comunicam estado a tecnologia assistiva.
- Nao ha botao interativo dentro de link interativo.
- Lighthouse/axe nao indicam regressao bloqueante.
- Estados de loading, vazio e erro sao anunciaveis quando necessario.

### EP08 - Integracao futura com catalogo oficial

Objetivo: preparar a camada SIBiSC para consumir dados oficiais sem virar sistema paralelo inconsistente.

Itens priorizados:

- P1: Definir fonte de verdade: SIBI/PHL/Supabase/sync local.
- P1: Documentar contrato de livros, exemplares, unidades, disponibilidade e timestamps.
- P1: Definir frequencia de sincronizacao e tolerancia de defasagem.
- P1: Criar campo "ultima atualizacao" no detalhe de disponibilidade.
- P2: Implementar ingestao para Supabase com RLS e leitura publica controlada.
- P2: Criar observabilidade de sync, falhas e divergencias.
- P2: Criar fallback quando fonte oficial estiver indisponivel.

Criterios de aceite:

- A UI informa origem e atualizacao dos dados quando disponibilidade for exibida.
- Dados oficiais prevalecem sobre qualquer cache local.
- Falha de sincronizacao nao gera disponibilidade falsa.
- Contratos possuem entradas, saidas e erros esperados.
- QA consegue simular fonte indisponivel e validar fallback.

## 11. Plano de implementacao em fases

### Fase 0 - Quick fixes obrigatorios

Objetivo: estabilizar a credibilidade do prototipo antes de ampliar escopo.

- Corrigir IDs do Perfil para apontar para `b1..b8` ou ampliar catalogo mockado para cobrir `1..12`.
- Remover botao interativo dentro de link em Favoritos.
- Adicionar estados ARIA em tabs/filtros/pills.
- Dar feedback perceptivel para Buscar/Explorar, Renovar, Remover e Abrir Google Calendar.
- Revisar microcopy e acentuacao.
- Corrigir favicon/assets 404.
- Validar URL do Google Calendar.
- Rotular claramente dados mockados/prototipo quando houver risco de expectativa real.

Saida esperada: nenhum P0/P1 conhecido bloqueando navegacao basica.

### Fase 1 - MVP assistente

Objetivo: entregar Feltrim Agents como assistente limitado, util e honesto.

- Criar painel de assistente com perguntas guiadas.
- Responder com base em catalogo, eventos, noticias e perfil mockado/service.
- Recomendar somente livros existentes e disponiveis.
- Mostrar explicacao e fonte da resposta.
- Coletar feedback simples da resposta.
- Criar testes de prompts principais.

Saida esperada: usuario consegue pedir ajuda para encontrar livro, entender disponibilidade e navegar para acao concreta.

### Fase 2 - Beta com feedback Sofia/Claudia

Objetivo: validar valor com usuarios reais ou avaliadores internos.

- Criar formulario de feedback in-app.
- Implantar fluxo Sofia/Claudia com template, severidade, SLA e retorno.
- Instrumentar eventos de busca/recomendacao.
- Rodar sessoes de teste com perfis de estudante, cidadao e participante de eventos.
- Ajustar microcopy, jornada e recomendacoes com base nos achados.

Saida esperada: backlog priorizado por evidencia de uso real.

### Fase 3 - Release estavel

Objetivo: aproximar prototipo de produto confiavel.

- Integrar Supabase ou fonte oficial definida.
- Incluir autenticação/cadastro conforme escopo academico aprovado.
- Persistir preferencias e favoritos.
- Exibir data de atualizacao da disponibilidade.
- Criar observabilidade minima de sync e erros.
- Fechar regressao, acessibilidade e performance mobile.

Saida esperada: release demonstravel sem contradizer fonte oficial e com riscos conhecidos mitigados.

## 12. Correcoes obrigatorias antes de avancar

1. Corrigir links quebrados do Perfil para livros.
2. Resolver interacao `button` dentro de `Link` em Favoritos.
3. Padronizar IDs de mocks e services.
4. Definir se Perfil deve consumir `userProfileService.js` ou mocks diretos; evitar duplicidade.
5. Ajustar microcopy/acento em navegacao, titulos e estados.
6. Adicionar semantica ARIA nos filtros e tabs.
7. Dar feedback visual ou textual para acoes que hoje parecem silenciosas.
8. Validar Google Calendar com dados completos, timezone e fallback.
9. Marcar recomendacoes e disponibilidade como prototipo/mock enquanto nao houver integracao real.
10. Garantir favicon e assets sem 404.

## 13. Metricas de sucesso

### Produto

- Percentual de buscas com clique em livro.
- Percentual de recomendacoes clicadas.
- Taxa de recomendacao avaliada como util.
- Tempo ate encontrar um livro disponivel.
- Percentual de usuarios que configuram preferencias.
- Percentual de usuarios que retornam ao Perfil.
- Feedbacks recebidos por rota e por tipo.

### UX

- Taxa de abandono em busca sem resultado.
- Termos mais buscados sem correspondencia.
- Tempo ate abrir detalhe de evento/livro.
- Satisfacao qualitativa coletada por Sofia/Claudia.
- Problemas de usabilidade por sessao de teste.

### Qualidade

- Bugs P0/P1 abertos antes de release.
- Links internos quebrados.
- Erros de console em rotas criticas.
- Lighthouse Acessibilidade por rota.
- Build/QA gate aprovado.
- Tempo medio de resposta a feedback por severidade.

### Integracao

- Defasagem media entre catalogo oficial e SIBiSC.
- Falhas de sync por dia.
- Percentual de registros sem unidade/disponibilidade.
- Consultas ao catalogo com fallback acionado.

## 14. Riscos e mitigacoes

| Risco | Mitigacao recomendada |
| --- | --- |
| IA prometer mais do que entrega | Limitar escopo, exibir fontes e usar fallback honesto. |
| Dados oficiais divergirem do prototipo | Definir fonte de verdade e mostrar ultima atualizacao. |
| Recomendacao enviesada ou repetitiva | Diversificar criterios, permitir feedback e explicar motivo. |
| Gamificacao excluir usuarios | Usar metas pessoais, sem ranking e sem penalizacao. |
| Feedback virar processo manual solto | Criar formulario, template, SLA e responsavel. |
| Acessibilidade regredir com visual premium | Incluir checks ARIA/teclado em DoD e QA gate. |
| Supabase/Auth aumentar escopo demais | Fasear integracao e manter contratos pequenos. |
| Reserva real depender de sistema externo | Comecar com acao orientativa e so prometer reserva apos contrato oficial. |

## 15. Decisoes recomendadas para a proxima reuniao

1. Feltrim Agents sera assistente conversacional real no MVP ou painel guiado de recomendacoes primeiro?
2. Reserva de livro entra no escopo academico ou fica como integracao futura?
3. O catalogo oficial sera integrado via Supabase espelho, API existente, importacao manual ou apenas simulado no MVP?
4. Quais dados de preferencia podem ser coletados sem criar risco de privacidade desnecessario?
5. Sofia e Claudia receberao feedback por formulario no app, Notion/Jira ou documento interno?
6. Gamificacao entra antes ou depois da primeira validacao de recomendacoes?

## 16. Proximos passos recomendados

1. Abrir uma tarefa P0 para consistencia de IDs e links do Perfil.
2. Abrir uma tarefa P1 para acessibilidade de tabs/filtros e interacoes aninhadas.
3. Abrir uma tarefa P1 para alinhar microcopy: "prototipo", "IA", "reserva", "disponibilidade" e acentuacao.
4. Refinar o MVP do Feltrim Agents como assistente guiado antes de implementar chat aberto.
5. Criar o primeiro formulario/processo in-app de feedback Sofia/Claudia.
6. Atualizar `docs/product/epicos_e_user_stories.md` com os epicos novos deste documento.
7. Atualizar `docs/qa/matriz_us_x_testes.md` com os fluxos Feltrim Agents, recomendacoes, preferencias e feedback.

## 17. Conclusao

O SIBiSC tem uma base visual e funcional promissora, com rotas publicas, mocks bem separados e documentacao de QA madura para um projeto academico. A mudanca de posicionamento do Feltrim Agents foi absorvida parcialmente na Home e no Perfil, mas ainda precisa virar produto real por meio de cadastro/preferencias, recomendacoes confiaveis, feedback operacional e integracao futura com fonte oficial.

A prioridade agora deve ser confiabilidade. Corrigir links, estados, microcopy e acessibilidade tem mais valor imediato do que ampliar a superficie de IA. Depois disso, o caminho recomendado e evoluir Feltrim Agents em fases: assistente guiado, recomendacoes explicaveis, feedback Sofia/Claudia e, por fim, integracao oficial e gamificacao inclusiva.
