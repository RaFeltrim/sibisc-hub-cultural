# Teste manual funcional - Rafael QA SDET

## Sumario executivo

- **Produto:** SIBiSC / Feltrim Agents.
- **Ambiente prioritario:** producao publica, `https://sibisc-hub-cultural.vercel.app`.
- **Repo local de apoio:** `C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile\SIBiSC`.
- **Data da execucao:** 19/05/2026.
- **Ferramenta:** navegador real via Playwright CLI (`@playwright/cli`), com snapshots de acessibilidade, navegacao, cliques, preenchimento de campos e avaliacao de hit target.
- **Comandos locais de build/QA:** nao executados. A producao respondeu e o objetivo era teste manual funcional real; nao houve bloqueio que exigisse ambiente local.
- **Alteracao de codigo:** nenhuma.
- **Veredito:** **aprovado com ressalvas**.

O site cobre as rotas e fluxos principais de noticias, eventos, catalogo, perfil, feedback Sofia/Claudia, home desktop e home mobile. A ressalva principal e um problema real de regressao visual/interacao no mobile: a bottom nav intercepta o clique do botao `Buscar` da busca assistida em `/home-mobile` quando o botao fica proximo ao rodape visivel.

## Escopo coberto

| Area | Status | Observacao |
| --- | --- | --- |
| Home desktop | Aprovado | Header, nav, assistente, recomendacoes, feedback, noticias, eventos e unidades carregam e navegam. |
| Home mobile `/home-mobile` | Aprovado com ressalva | Conteudo e navegacao existem, mas bottom nav bloqueia um CTA da busca assistida em um estado reproduzido. |
| Noticias | Aprovado | Lista, filtros, detalhe e link de origem validados. |
| Eventos | Aprovado | Lista agrupada, detalhe, informacoes de agenda e CTA Google Calendar validados. |
| Catalogo | Aprovado | Busca, filtro por bairro, cards, detalhe, disponibilidade rotulada e estado sem resultado validados. |
| Perfil | Aprovado com ressalva | Abas e acoes funcionam; ha inconsistencia visual em progresso acima da meta. |
| Rotas invalidas | Aprovado | NotFound geral e itens inexistentes exibem estados de erro controlados. |
| Regressao visual basica | Aprovado com ressalva | Defeito confirmado no mobile: bottom nav intercepta botao de busca assistida. |

## Achados

### QA-001 - Bottom nav intercepta botao `Buscar` em `/home-mobile`

- **Severidade:** Alta.
- **Prioridade:** P1/P2 antes de entrega, por violar explicitamente o criterio de regressao visual basica.
- **Rota:** `/home-mobile`.
- **Dispositivo:** viewport mobile `390x844`.
- **Passos:**
  1. Abrir `https://sibisc-hub-cultural.vercel.app/home-mobile`.
  2. Selecionar a pergunta guiada `Eventos de leitura`.
  3. Preencher a busca assistida com `Sapiens`.
  4. Tentar clicar em `Buscar`.
- **Resultado esperado:** o botao `Buscar` deve receber o clique e aplicar a busca/emitir status sem interferencia da bottom nav.
- **Resultado obtido:** Playwright nao conseguiu clicar no botao porque a bottom nav interceptou o ponteiro. O hit target do centro do botao caiu no item `Eventos` da navegacao mobile.
- **Evidencia textual:**
  - `locator.click: Timeout 30000ms exceeded`.
  - `span Eventos from nav aria-label="Navegação mobile" subtree intercepts pointer events`.
  - Bounding box do botao: `x=36.78, y=790.28, width=316.44, height=54`, viewport `390x844`.
  - `document.elementFromPoint(center)` retornou `SPAN`, texto `Eventos`.
- **Impacto:** acao visivel fica parcialmente inacessivel por toque quando o conteudo e rolado para uma posicao em que o CTA coincide com a bottom nav fixa. A busca ainda apresenta resultado rapido por debounce, mas o CTA visivel nao e acionavel nesse estado.

### QA-002 - Jornada do leitor exibe progresso acima da meta

- **Severidade:** Baixa.
- **Rota:** `/perfil`.
- **Passos:**
  1. Abrir `/perfil`.
  2. Verificar secao `Jornada do leitor`.
  3. Observar trilhas, selos e metas.
- **Resultado esperado:** progresso deve ser apresentado de forma consistente, preferencialmente limitado visualmente ao alvo ou descrito como meta superada.
- **Resultado obtido:** cards exibem valores como `7/5`, `7/6`, `7/3`, enquanto o progressbar visual e limitado. A informacao funciona, mas gera ruido de interpretacao.
- **Evidencia textual:** snapshot do perfil exibiu `Trilha de literatura brasileira 7/5`, `Trilha de diversidade autoral 7/6`, `Explorador de literatura brasileira 7/3` e `Ampliar autores explorados 7/6`.
- **Impacto:** inconsistencia visual/conteudo; nao bloqueia fluxo.

## Execucao detalhada

### 1. Home desktop

| Caso | Passos | Esperado | Obtido | Severidade | Evidencia |
| --- | --- | --- | --- | --- | --- |
| HD-01 Header/nav | Abrir `/`; verificar header, marca, nav e CTA. | Header com `SIBiSC`, links `Inicio`, `Noticias`, `Eventos`, `Catalogo` e CTA `Consultar acervo`. | Exibido e navegavel. | N/A | Snapshot: `Rede municipal de bibliotecas de Sao Carlos`, `SIBiSC`, `Consultar acervo`. |
| HD-02 Feltrim Agents | Abrir `/`; verificar hero e assistente. | Hero deve explicar prototipo, dados locais e apoio do Feltrim Agents. | Exibido com metricas, busca assistida e perguntas guiadas. | N/A | `Feltrim Agents ajuda voce a encontrar a proxima leitura`, `Assistente em prototipo`. |
| HD-03 Perguntas guiadas | Clicar `Machado de Assis`. | Resposta deve mudar e manter recomendacoes explicaveis. | Resposta mudou para `Caminho por autor`, com `Dom Casmurro` e `Memorias Postumas de Bras Cubas`. | N/A | `Motivo: Autor corresponde diretamente ao interesse informado`, `Fonte/limite: catalogo-mock`. |
| HD-04 Busca assistida | Preencher `Vidas Secas`; clicar `Explorar`. | Busca deve exibir status e resultado local. | Status exibido: `Feltrim Agents encontrou 1 sugestao...`; resultado `Vidas Secas`. | N/A | Link `/catalogo/b7`, autor `Graciliano Ramos`. |
| HD-05 Feedback Sofia/Claudia | Ver painel de feedback. | Deve exibir fluxo Sofia/Claudia e link para GitHub Issues. | Exibido com privacidade e URL do template. | N/A | `Enviar feedback via GitHub Issues`, URL com `feedback_sofia_claudia.md`. |
| HD-06 Noticias/eventos/unidades | Ver blocos inferiores e footer. | Home deve trazer noticias, eventos e unidades/bibliotecas. | Exibidos 3 cards de noticia, 3 eventos e 4 unidades. | N/A | `Ultimas noticias`, `Proximos encontros`, `Biblioteca Central`, `BibCom UFSCar`. |

### 2. Home mobile `/home-mobile`

| Caso | Passos | Esperado | Obtido | Severidade | Evidencia |
| --- | --- | --- | --- | --- | --- |
| HM-01 Layout mobile | Viewport `390x844`; abrir `/home-mobile`. | Conteudo mobile deve carregar com hero, cards e bottom nav. | Exibido. | N/A | `Feltrim Agents`, `Feedback Sofia/Claudia`, `Livros em destaque`, bottom nav com 5 itens. |
| HM-02 Perguntas guiadas | Clicar `Eventos de leitura`. | Resposta deve exibir eventos relacionados e links. | Exibiu `Eventos ligados a leitura` com `Clube do Livro: Vidas Secas` e `Roda de Leitura: Poesia Brasileira`. | N/A | `Fonte/limite: agenda local mockada`. |
| HM-03 Feedback | Ver card Sofia/Claudia. | Deve haver chamada e link para GitHub Issues. | Exibido. | N/A | `Relate duvidas, bugs ou sugestoes`, `Enviar feedback`. |
| HM-04 Navegacao para rotas | Clicar quick action `Catalogo` e bottom nav `Perfil`/`Catalogo`. | Deve navegar para rotas corretas. | Bottom nav navegou para `/catalogo`; quick actions estao presentes. | N/A | URL apos clique: `/catalogo`. |
| HM-05 Busca assistida mobile | Preencher `Sapiens`; clicar `Buscar`. | Botao deve ser acionavel. | **Falhou por overlay da bottom nav.** | Alta | Ver QA-001. |

### 3. Noticias

| Caso | Passos | Esperado | Obtido | Severidade | Evidencia |
| --- | --- | --- | --- | --- | --- |
| NT-01 Lista | Abrir `/noticias`. | Lista de noticias deve carregar. | 4 cards carregados. | N/A | `Noticia`, filtros e cards renderizados. |
| NT-02 Filtros | Clicar filtro `Acervo`. | Lista deve reduzir para noticias de Acervo. | Resultado reduziu de 4 para 1. | N/A | Titulo: `Biblioteca Central recebe doacao de 3.000 volumes da USP`. |
| NT-03 Detalhe | Abrir detalhe da noticia filtrada. | Detalhe deve mostrar titulo, resumo, origem e corpo. | Detalhe abriu em `/noticias/n2`. | N/A | `detailTitle: Biblioteca Central recebe doacao de 3.000 volumes da USP`. |
| NT-04 Link externo | Ver origem da noticia. | Link deve apontar para fonte. | `sourceHref: https://www.saocarlos.sp.gov.br/`. | N/A | Link de origem confirmado. |
| NT-05 Estado vazio | Procurar filtro sem itens. | Se existir categoria sem itens, deve haver vazio. | Nao aplicavel: todas as categorias disponiveis tem item. Componente de vazio existe, mas nao foi acionavel por dado atual. | N/A | Filtros disponiveis: `Todas`, `Servicos`, `Acervo`, `Eventos`, `Inclusao`. |

### 4. Eventos

| Caso | Passos | Esperado | Obtido | Severidade | Evidencia |
| --- | --- | --- | --- | --- | --- |
| EV-01 Lista | Abrir `/eventos`. | Agenda deve listar eventos agrupados por dia. | 7 links de detalhe carregados. | N/A | Grupos com `sexta-feira, 20 de marco`, `domingo, 22 de marco`, etc. |
| EV-02 Detalhe | Abrir terceiro evento. | Detalhe deve exibir dados completos. | Abriu `Clube do Livro: Vidas Secas`. | N/A | `domingo, 22 de marco`, `10:00 - 11:30`, `Aberto ao publico`. |
| EV-03 CTA Calendar | Clicar `Abrir Google Calendar`. | Deve abrir Google Calendar com dados do evento. | Popup abriu para Google Calendar/login com URL contendo `eventedit`, `text=Clube+do+Livro`, `dates=20260322T100000/20260322T113000`. | N/A | `popupOpened: true`; URL de Google Calendar capturada. |
| EV-04 Comunicacao de agenda | Ver texto de calendario. | Deve comunicar que abre no Google Calendar e que agenda e prototipo. | Exibido. | N/A | `Adicionar ao seu calendario`, `Abra o evento no Google Calendar...`. |

### 5. Catalogo

| Caso | Passos | Esperado | Obtido | Severidade | Evidencia |
| --- | --- | --- | --- | --- | --- |
| CT-01 Lista inicial | Abrir `/catalogo`. | Lista deve carregar cards do acervo. | 8 cards carregados. | N/A | `initialCount: 8`. |
| CT-02 Busca | Buscar `Machado`. | Deve filtrar livros por autor/titulo/ISBN e mostrar status. | Retornou 2 livros. | N/A | `Busca aplicada: 2 livros encontrados`; `Memorias Postumas de Bras Cubas`, `Dom Casmurro`. |
| CT-03 Filtro bairro | Selecionar `Vila Prado`. | Cards devem priorizar unidade mais proxima conforme bairro. | Primeiro card passou a indicar `Biblioteca Vila Prado, 0.8km`. | N/A | `nearestSample` confirmado. |
| CT-04 Estado sem resultado | Buscar `zzzzzz-sem-resultado`. | Deve exibir vazio amigavel. | Exibiu `Nenhum livro encontrado` e instrucao para revisar termo/remover filtros. | N/A | `emptyHasMessage: true`. |
| CT-05 Detalhe livro | Abrir `/catalogo/b7`. | Deve mostrar metadados, disponibilidade e unidades. | Exibiu `Vidas Secas`, ISBN, editora, ano e 7 exemplares. | N/A | `7 exemplares disponiveis`, `978-85-359-0211-1`, `Record`. |
| CT-06 Disponibilidade rotulada | No detalhe, trocar bairro para `Cidade Aracy`. | Deve atualizar unidade mais proxima e lista de disponibilidade. | Exibiu `Biblioteca Cidade Aracy`, `0.9km`, chamada `869.3 R175v`. | N/A | Lista por unidade usa `Disponivel para retirada no prototipo local.` |

### 6. Perfil

| Caso | Passos | Esperado | Obtido | Severidade | Evidencia |
| --- | --- | --- | --- | --- | --- |
| PF-01 Cabecalho | Abrir `/perfil`. | Perfil deve mostrar usuario e preferencias. | Exibiu `Joao Silva`, unidade, email e preferencias. | N/A | `Romance`, `Naturalismo`, `Memorialismo`. |
| PF-02 Jornada | Ver `Jornada do leitor`. | Deve mostrar trilhas, selos e metas. | Exibido. | Baixa para inconsistencia | Ver QA-002. |
| PF-03 Abas | Alternar `Emprestimos`, `Historico`, `Favoritos`. | Abas devem trocar painel. | Funcionou. | N/A | Abas: `Emprestimos 2`, `Historico`, `Favoritos 4`. |
| PF-04 Renovar | Clicar `Renovar` no emprestimo permitido. | Deve atualizar status e data mockada. | Status exibido: `Emprestimo renovado: O Cortico...`. | N/A | Acao confirmada por role `status`. |
| PF-05 Historico | Abrir aba `Historico`. | Deve listar historico, unidade e devolucao. | Exibiu itens e periodo/devolucao. | N/A | `Periodo`, `Devolucao`, indicador de atraso quando aplicavel. |
| PF-06 Favoritos/remover | Abrir `Favoritos`; remover `Vidas Secas`. | Deve remover card e atualizar badge/status. | Removeu de 4 para 3 favoritos. | N/A | `Vidas Secas removido dos favoritos`, aba passou para `Favoritos 3`. |
| PF-07 Notificacoes | Alternar checkbox de devolucao. | Deve atualizar preferencia mockada e status. | Exibiu `Notificacoes de devolucao desativadas para este perfil de prototipo.` | N/A | Checkbox respondendo. |

### 7. Rotas invalidas e itens inexistentes

| Caso | Passos | Esperado | Obtido | Severidade | Evidencia |
| --- | --- | --- | --- | --- | --- |
| NF-01 Rota inexistente | Abrir `/qualquer-rota-invalida`. | Deve exibir NotFound controlado. | Exibiu `404` e `Essa rota ainda nao existe no mapa do SIBiSC.` | N/A | Link `Voltar para inicio`. |
| NF-02 Noticia inexistente | Abrir `/noticias/inexistente`. | Deve exibir erro controlado. | Exibiu `Noticia nao encontrada`. | N/A | `O item procurado nao existe mais ou ainda nao foi publicado.` |
| NF-03 Evento inexistente | Abrir `/eventos/inexistente`. | Deve exibir erro controlado. | Exibiu `Evento nao encontrado`. | N/A | `O evento procurado nao esta mais disponivel na agenda.` |
| NF-04 Livro inexistente | Abrir `/catalogo/inexistente`. | Deve exibir erro controlado. | Exibiu `Livro nao encontrado`. | N/A | `Esse item nao esta disponivel no catalogo atual.` |

## Evidencias tecnicas resumidas

- Producao abriu com titulo `SIBiSC` e URL `https://sibisc-hub-cultural.vercel.app/`.
- Console na home: `Total messages: 0 (Errors: 0, Warnings: 0)`.
- Rotas principais exercitadas diretamente: `/`, `/home-mobile`, `/noticias`, `/noticias/n1`, `/eventos`, `/eventos/e3`, `/catalogo`, `/catalogo/b7`, `/perfil`, rotas invalidas.
- Google Calendar abriu popup real para `accounts.google.com` com parametro `continue=https://calendar.google.com/calendar/u/0/r/eventedit...`.
- A interferencia da bottom nav foi confirmada por hit test de navegador, nao apenas por avaliacao visual.

## Recomendacoes

1. Corrigir o espacamento inferior/padding ou comportamento de scroll em layouts mobile com bottom nav fixa, garantindo area segura para CTAs (`padding-bottom` no conteudo principal e/ou `scroll-margin-bottom` em campos/botoes).
2. Adicionar teste e2e mobile para clicar no botao `Buscar` em `/home-mobile` apos selecionar perguntas guiadas longas.
3. Ajustar exibicao de progresso no perfil para valores como `5/5 +2` ou `Meta superada`, evitando `7/5`.
4. Opcional: adicionar heading semantico nos estados de erro de detalhe, pois hoje `ErrorState` usa `strong`; isso melhoraria leitura por tecnologias assistivas, embora nao bloqueie o fluxo.
