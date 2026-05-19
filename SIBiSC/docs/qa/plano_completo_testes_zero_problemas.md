# Plano Completo de Testes e Governanca de Qualidade - Meta Zero Problemas

## 1. Contexto

Este plano consolida a estrategia de QA para o projeto SIBiSC/Feltrim Agents, considerando os fluxos atuais em React/Vite, os documentos existentes em `docs/qa`, o gate local `npm run qa:ci` e os principais modulos expostos pelas rotas da aplicacao.

Fontes internas consideradas:

- `docs/qa/casos_de_teste_funcional.md`
- `docs/qa/plano_e2e.md`
- `docs/qa/relatorio_acessibilidade.md`
- `docs/qa/casos_de_teste_seguranca.md`
- `docs/qa/estrategia_shift_left.md`
- `docs/qa/matriz_us_x_testes.md`
- `docs/frontend/fluxos_e_telas.md`
- `docs/product/criterios_de_aceite.md`
- `src/routes/AppRouter.jsx`
- `package.json`

## 2. Objetivo e premissa zero-problemas

O objetivo e reduzir ao maximo o risco de falhas percebidas pelos usuarios durante a utilizacao do SIBiSC/Feltrim Agents, adotando uma meta operacional de zero defeitos criticos em producao.

A expressao "garantir 0 problemas" deve ser entendida como direcao de qualidade e nao como promessa absoluta. O plano busca:

- prevenir defeitos antes da implementacao por criterios de aceite claros;
- detectar falhas cedo com smoke, sanity, regressao e testes exploratorios;
- bloquear liberacoes com defeitos P0/P1 ou ausencia de evidencia;
- responder rapidamente aos feedbacks dos usuarios por meio de Sofia e Claudia;
- manter rastreabilidade entre user stories, testes, evidencias, issues e decisoes de release.

## 3. Participantes e responsabilidades

| Participante | Papel no plano | Responsabilidades principais |
| --- | --- | --- |
| QA | Dono da estrategia de qualidade | Define casos de teste, severidade, gates, evidencias, matriz de riscos, regressao e recomendacao de liberacao. Valida junto dos Devs desde refinamento ate DoD. |
| Devs | Donos da implementacao | Participam da definicao de casos por historia antes de codar, corrigem achados no mesmo ciclo e acompanham a revalidacao com QA. |
| TL | Dono da direcao tecnica | Revisa impactos tecnicos e resolve conflitos entre front, dados, mocks, services e testes. |
| PO | Dono do valor e aceite funcional | Prioriza escopo, valida criterios de aceite, decide trade-offs de produto e aprova mudancas de backlog. |
| PM | Dono de prazo e coordenacao | Planeja ciclos, janelas de teste, dependencia entre times, SLAs de resposta e comunicacao de status. |
| GP | Governanca do projeto | Garante aderencia a processo, riscos, documentacao, rituais, auditoria e tomada de decisao de release. |
| Sofia | Validadora executiva e canal de feedback | Recebe feedbacks qualificados, valida impacto percebido, ajuda a classificar urgencia e confirma comunicacao final ao usuario. |
| Claudia | Coordenadora operacional de feedback | Coleta, organiza, reproduz, acompanha issues, atualiza status e garante retorno ao usuario junto com Sofia. |

### 3.1 Fluxo QA + Dev pairing

Para cumprir a orientacao de que QA valida junto dos Devs, cada historia deve seguir este ciclo:

1. QA participa do refinamento tecnico com Devs, TL e PO antes da implementacao, revisando criterio de aceite, riscos, dados, acessibilidade, mobile e impacto em fluxos existentes.
2. Dev e QA definem os casos de teste por historia antes de codar, incluindo cenarios felizes, bordas, regressao e checks manuais/automatizados aplicaveis.
3. QA executa validacao exploratoria durante o desenvolvimento, em ambiente local ou preview, para antecipar problemas antes da etapa final.
4. Dev corrige e QA revalida no mesmo ciclo; a historia nao deve ser movida para `done` enquanto a revalidacao estiver pendente.
5. TL revisa impactos tecnicos e ajuda a resolver conflitos front/dados/testes quando a historia tocar mocks, services, rotas, acessibilidade ou contratos.
6. O gate `"QA validado com Dev"` passa a ser requisito da Definition of Done.

## 4. RACI simplificado

| Atividade | QA | PO | PM | GP | Sofia | Claudia |
| --- | --- | --- | --- | --- | --- | --- |
| Definir estrategia e matriz de testes | R/A | C | C | C | I | I |
| Fechar criterios de aceite | C | R/A | C | I | C | C |
| Planejar ciclos e calendario de QA | C | C | R/A | C | I | C |
| Executar smoke, sanity e regressao | R/A | I | C | I | I | C |
| Validar severidade e prioridade de bugs | R | A | C | C | C | C |
| Receber feedback de usuarios | C | I | C | I | R | R/A |
| Criar issue e rastrear resolucao | C | C | C | I | C | R/A |
| Aprovar release | R | A | C | A | C | I |
| Comunicar retorno ao usuario | I | C | C | I | R/A | R |

Legenda: R = responsavel pela execucao, A = aprovador final, C = consultado, I = informado.

## 5. Escopo funcional

### Dentro do escopo

- Home e Feltrim Agents: apresentacao do assistente, busca assistida, recomendacoes, acoes para catalogo, eventos e perfil.
- Cadastro/preferencias/perfil: dados do usuario mockado, preferencias de leitura, emprestimos, historico, favoritos, notificacoes e botoes de renovacao/remocao.
- Recomendacoes: livros sugeridos com base em preferencias, disponibilidade e explicacao do motivo da recomendacao.
- Catalogo: busca por titulo, autor e ISBN, debounce, resultados, detalhe do livro, disponibilidade por unidade e bairro mais proximo.
- Noticias: listagem, filtros quando disponiveis, detalhe, estados de carregamento, vazio e erro.
- Eventos: listagem, detalhe, local, publico, inscricao e acionamento de Google Calendar.
- Navegacao mobile: BottomNav com Home, Noticias, Eventos, Catalogo e Perfil; responsividade sem scroll horizontal.
- Acessibilidade: WCAG 2.1 AA, teclado, leitores de tela, landmarks, `aria-current`, `aria-pressed`, labels, contraste e foco visivel.
- Performance: Lighthouse, tempo de carregamento percebido, peso de bundle e responsividade em mobile.
- Seguranca basica: exposicao de chaves, inputs, XSS, parametros de rota, RLS/Supabase quando integrado.
- Dados e mocks: consistencia entre IDs de mocks, rotas dinamicas e links internos.
- Feedback do usuario: coleta, triagem, reproducao, priorizacao, issue, validacao e retorno.

### Fora do escopo imediato, mas monitorado

- Garantia formal sobre sistemas externos fora do controle do projeto, como disponibilidade do Google Calendar.
- Testes de carga extensivos em backend real, enquanto a aplicacao estiver majoritariamente baseada em mocks.
- Validacao completa de autenticacao real se o fluxo ainda estiver em prototipo ou sem contrato final.

## 6. Tipos de teste

| Tipo | Finalidade | Exemplos no SIBiSC | Evidencia esperada |
| --- | --- | --- | --- |
| Smoke | Confirmar que o app abre e as rotas criticas estao vivas. | Home, Noticias, Eventos, Catalogo, Perfil e 404. | Checklist, print por rota, status do build. |
| Sanity | Validar rapidamente uma correcao especifica. | Revalidar um link quebrado no Perfil ou o botao de calendario. | Issue com antes/depois e print ou video curto. |
| Funcional | Confirmar comportamento por modulo. | Busca, detalhe, filtros, disponibilidade, recomendacoes. | Roteiro Given/When/Then preenchido. |
| E2E | Validar jornadas completas do usuario. | Home -> Catalogo -> Livro -> Unidade mais proxima; Eventos -> Detalhe -> Calendar. | Video, screenshots e logs de console. |
| Regressao | Garantir que mudancas nao quebraram fluxos existentes. | Reexecutar casos P0/P1 apos ajustes em rotas, mocks ou layout. | Matriz com status aprovado/falhou. |
| UI/UX | Verificar clareza, estados e microcopy. | Mensagens de vazio, erro, botoes sem feedback e instrucoes. | Checklist heuristico e evidencias visuais. |
| Acessibilidade | Garantir uso por teclado e tecnologia assistiva. | BottomNav, filtros, busca, cards, tabelas e estados dinamicos. | Lighthouse, axe/WAVE, roteiro com leitor de tela. |
| Responsividade | Confirmar uso em mobile, tablet e desktop. | 375x812, 768x1024, 1366x768 e 1920x1080. | Prints por viewport. |
| Performance | Controlar carregamento e qualidade tecnica. | Lighthouse Performance, bundle Vite, ausencia de travamentos. | Relatorio Lighthouse e resultado do build. |
| Seguranca basica | Reduzir riscos comuns de frontend e dados. | XSS em busca, parametros invalidos, `.env`, headers, RLS. | Checklist OWASP leve e logs de rede. |
| Compatibilidade | Validar navegadores e dispositivos principais. | Chrome, Edge, Firefox, Android Chrome, iOS Safari quando possivel. | Matriz por ambiente. |
| Dados/mocks | Garantir consistencia dos dados de prototipo. | IDs `n1`, `e1`, `b1`, favoritos, emprestimos e rotas dinamicas. | Relatorio de inconsistencias. |
| Usabilidade | Observar dificuldade real de uso. | Encontrar livro, salvar evento, entender recomendacao. | Notas de sessao e classificacao de feedback. |
| Feedback do usuario | Fechar o ciclo pos-uso. | Sofia e Claudia recebem, reproduzem e acompanham retorno. | Registro de feedback, issue e resposta final. |

## 7. Matriz de riscos e prioridades

| ID | Risco | Impacto | Probabilidade | Prioridade | Mitigacao |
| --- | --- | --- | --- | --- | --- |
| R01 | Usuario nao encontra livro por falha na busca ou no debounce. | Alto | Media | P0 | Testes funcionais e E2E de busca por titulo, autor, ISBN, sem resultados e caracteres especiais. |
| R02 | Disponibilidade por unidade ou bairro mais proximo aparece incorreta. | Alto | Media | P0 | Validar mocks, tabela, destaque de unidade e fallback manual de localizacao. |
| R03 | Link interno do Perfil aponta para ID inexistente no catalogo. | Alto | Media | P0 | Auditoria de IDs entre `mockUser`, emprestimos, favoritos, historico e `books`. |
| R04 | Botao "Abrir Google Calendar" nao gera evento correto ou nao abre em mobile. | Medio/Alto | Media | P1 | Teste em desktop/mobile, validacao da URL gerada e fallback quando popup for bloqueado. |
| R05 | Navegacao mobile confunde usuario ou perde estado ativo. | Alto | Media | P1 | Validar BottomNav, `aria-current`, foco, labels e rota ativa. |
| R06 | Acessibilidade regressa apos alteracao visual. | Alto | Media | P1 | Gate Lighthouse/axe, teclado, leitor de tela e checklist WCAG por componente. |
| R07 | Microcopy nao orienta acao ou erro. | Medio | Alta | P1 | Revisao PO/UX/QA de textos de empty, loading, erro, botoes e feedback de acao. |
| R08 | Botoes parecem executar acao, mas nao dao retorno perceptivel. | Medio | Alta | P1 | Definir feedback visual/toast/estado para renovar, remover favorito, buscar e salvar evento. |
| R09 | Favicon, assets ou recursos externos geram erros em console/rede. | Baixo/Medio | Media | P2 | Auditoria DevTools, Lighthouse Best Practices e sanity em deploy. |
| R10 | Dados mockados divergentes do comportamento esperado em producao. | Alto | Media | P1 | Contratos de dados, cenarios com vazios/erro e rastreabilidade para integracao Supabase. |
| R11 | Performance mobile prejudica a experiencia. | Medio/Alto | Media | P1 | Lighthouse mobile, compressao, controle de bundle e teste em rede simulada. |
| R12 | Feedback de usuario entra sem dono ou sem retorno. | Alto | Media | P0 | Fluxo Sofia/Claudia com SLA, triagem, issue, owner e validacao de resposta. |

## 8. Pendencias iniciais para revalidacao

Os itens abaixo devem abrir a primeira rodada de QA. Alguns podem ja ter sido corrigidos em auditorias anteriores, mas precisam ser revalidados no ambiente atual antes de qualquer liberacao.

| Item | Severidade inicial | Responsavel por triagem | Criterio de fechamento |
| --- | --- | --- | --- |
| Links do Perfil para emprestimos, historico e favoritos podem apontar para IDs inexistentes no catalogo. | P0 | QA + Claudia | Todos os links do Perfil abrem detalhe valido ou exibem erro amigavel rastreado. |
| IDs entre mocks, rotas dinamicas e cards devem ser compatibilizados. | P0 | QA | Auditoria sem inconsistencias entre noticias, eventos, livros e perfil. |
| Microcopy de estados vazios, erros e acoes deve estar clara para usuario final. | P1 | PO + QA | Textos revisados, sem jargao tecnico e com proxima acao evidente. |
| Botoes sem retorno perceptivel devem comunicar resultado. | P1 | QA + PO | Renovar, remover favorito, buscar e calendario apresentam estado ou efeito observavel. |
| Google Calendar deve ser validado em desktop e mobile. | P1 | QA | URL contem titulo, data, horario e local; nova aba/fallback documentado. |
| Estados ARIA devem ser consistentes em navegacao, filtros, abas e loading. | P1 | QA | `aria-current`, `aria-pressed` ou semantica equivalente validada com teclado/leitor. |
| Favicon e assets devem estar sem erro de rede no deploy. | P2 | QA | DevTools Network sem 404 relevante para assets basicos. |
| Hierarquia de headings no Perfil deve permanecer corrigida. | P2 | QA | Lighthouse Acessibilidade mantem 100/100 ou sem regressao WCAG 2.4.6. |

## 9. Roteiros de teste de alto nivel

### 9.1 Smoke de liberacao

```gherkin
Given que a aplicacao esta publicada em ambiente de teste
When o QA acessa as rotas "/", "/home-mobile", "/noticias", "/eventos", "/catalogo", "/perfil" e uma rota invalida
Then todas as paginas carregam sem tela branca
  And o console nao exibe erro critico
  And a navegacao principal permanece disponivel
  And estados de loading, vazio ou erro sao amigaveis
```

### 9.2 Home e Feltrim Agents

Checklist:

- Validar hero com nome Feltrim Agents e proposta do assistente.
- Confirmar acoes para Catalogo, Eventos e Perfil.
- Buscar por titulo, autor e ISBN na busca assistida.
- Confirmar recomendacoes baseadas em preferencias e disponibilidade.
- Validar estado sem resultado com microcopy clara.
- Confirmar que links de recomendacao abrem detalhes validos do catalogo.

```gherkin
Given que o usuario esta na Home
When digita um termo existente na busca assistida
Then resultados relacionados aparecem
  And cada resultado navega para um detalhe valido
  And a recomendacao explica por que o item foi sugerido
```

### 9.3 Cadastro, preferencias e Perfil

Checklist:

- Validar dados do usuario, unidade, e-mail e data de membro.
- Confirmar preferencias de leitura usadas nas recomendacoes.
- Alternar notificacoes de devolucao e verificar retorno visual.
- Navegar entre abas de Emprestimos, Historico e Favoritos.
- Validar botao Renovar com mudanca observavel de estado ou data.
- Validar Remover favorito sem disparar navegacao acidental.
- Confirmar que todos os links para livros existem no catalogo.
- Garantir que o fluxo indica claramente que dados sao mockados/prototipo quando aplicavel.

```gherkin
Given que o usuario esta no Perfil
When abre a aba Favoritos e remove um item
Then o item sai da lista sem recarregar a pagina
  And a acao possui feedback perceptivel
  And nenhum link quebrado e gerado
```

### 9.4 Recomendacoes

Checklist:

- Confirmar que preferencias de categorias, autores e topicos influenciam recomendacoes.
- Confirmar que livros indisponiveis nao sao priorizados como recomendacao principal.
- Validar texto de justificativa da recomendacao.
- Validar comportamento quando nao houver livro alinhado ao perfil.
- Confirmar ausencia de promessas enganosas sobre IA ou disponibilidade.

```gherkin
Given que existem preferencias cadastradas no perfil
When a Home monta as recomendacoes
Then os livros sugeridos respeitam disponibilidade e afinidade
  And cada sugestao apresenta um motivo compreensivel
```

### 9.5 Catalogo e disponibilidade

Checklist:

- Buscar por titulo, autor e ISBN.
- Testar busca com acentos, caixa alta/baixa e termo inexistente.
- Validar debounce e ausencia de travamento durante digitacao.
- Abrir detalhe do livro.
- Validar ISBN, ano, editora, paginas e resumo.
- Validar tabela de disponibilidade por unidade.
- Alterar bairro e confirmar unidade mais proxima.
- Testar fallback quando geolocalizacao nao estiver disponivel.

```gherkin
Given que o usuario busca por um livro existente
When abre o detalhe do livro e seleciona um bairro
Then a tabela de disponibilidade e exibida
  And a unidade mais proxima com exemplar disponivel e destacada
  And o status nao depende apenas de cor
```

### 9.6 Noticias

Checklist:

- Listar noticias recentes.
- Abrir detalhe de noticia por card.
- Validar titulo, resumo, data, categoria e fonte quando houver.
- Testar estados de loading, vazio e erro.
- Validar filtros de categoria quando disponiveis.
- Confirmar retorno para listagem.

```gherkin
Given que o usuario acessa Noticias
When seleciona uma noticia
Then a pagina de detalhe abre com conteudo completo
  And a URL reflete o ID correto
  And existe caminho claro para voltar
```

### 9.7 Eventos e Google Calendar

Checklist:

- Listar eventos futuros em ordem cronologica.
- Abrir detalhe de evento.
- Validar data, horario, local, publico, inscricao e descricao.
- Clicar em "Abrir Google Calendar".
- Confirmar URL com titulo, data, horario, local e descricao.
- Testar comportamento em mobile e com popup bloqueado.
- Validar evento sem imagem/midia externa.

```gherkin
Given que o usuario esta no detalhe de um evento
When clica em "Abrir Google Calendar"
Then uma nova aba ou fallback abre a URL do Google Calendar
  And os dados essenciais do evento estao preenchidos
```

### 9.8 Navegacao mobile e responsividade

Checklist:

- Validar BottomNav com 5 itens.
- Confirmar item ativo visualmente e semanticamente.
- Validar ausencia de scroll horizontal em 375px.
- Confirmar areas clicaveis confortaveis.
- Navegar entre todos os modulos via BottomNav.
- Validar orientacao portrait e, se possivel, landscape.

```gherkin
Given que o usuario acessa a aplicacao em viewport mobile
When navega pelo BottomNav
Then cada modulo abre corretamente
  And o item ativo fica evidente
  And o conteudo permanece legivel sem scroll horizontal
```

### 9.9 Acessibilidade WCAG

Checklist:

- Atributo `lang="pt-BR"` no HTML.
- Headings em ordem logica.
- Todo controle interativo acessivel por teclado.
- Foco visivel em links, botoes, filtros e abas.
- `aria-current` ou semantica equivalente para rota ativa.
- `aria-pressed` ou semantica equivalente para filtros/selecoes quando aplicavel.
- Loading com `role="status"` ou `aria-live`.
- Tabela de disponibilidade com headers e texto de status.
- Contraste minimo AA.
- Zoom 200% sem perda de conteudo.

```gherkin
Given que o usuario navega apenas por teclado
When percorre Home, Catalogo, Eventos e Perfil
Then todos os elementos interativos recebem foco visivel
  And podem ser acionados por Enter ou Space quando aplicavel
  And a ordem de foco segue a leitura visual
```

### 9.10 Feedback do usuario

```gherkin
Given que um usuario reporta dificuldade ou defeito para Sofia ou Claudia
When o feedback e recebido
Then Claudia registra o relato com contexto, ambiente e passos
  And Sofia ajuda a classificar impacto percebido
  And QA tenta reproduzir
  And PO prioriza com base em valor e severidade
  And o usuario recebe retorno apos resolucao ou decisao de backlog
```

## 10. Criterios de aceite por release

Uma release so pode ser considerada pronta quando:

- Todos os cenarios P0 estao aprovados.
- Nao ha bugs P0 ou P1 abertos.
- Bugs P2 possuem decisao explicita de corrigir antes da release ou aceitar com plano de mitigacao.
- `npm run qa:ci` passa localmente ou na pipeline.
- Rotas criticas carregam sem erro de console bloqueante.
- Fluxos Home/Feltrim Agents, Catalogo, Eventos, Noticias, Perfil e navegacao mobile possuem evidencias.
- Lighthouse de acessibilidade nao apresenta regressao relevante nas rotas avaliadas.
- Performance mobile esta dentro do limite definido para a release ou possui justificativa aprovada.
- Feedbacks recentes de Sofia e Claudia foram triados e classificados.
- Matriz US x testes foi atualizada para mudancas relevantes.
- Evidencias estao salvas em pasta ou issue rastreavel.

## 11. Quality gates

### Gate 0 - Antes do desenvolvimento

- User story possui objetivo, criterio de aceite e prioridade.
- Dependencias de dados, mocks ou API estao claras.
- QA identifica risco e tipo de teste necessario.
- QA participa do refinamento tecnico com Devs/TL antes da implementacao.
- Dev e QA definem casos de teste e evidencias obrigatorias por historia antes de codar.
- PO confirma valor e comportamento esperado.

### Gate 1 - Antes de abrir PR

Comando minimo:

```bash
npm run qa:ci
```

Tambem deve haver:

- smoke manual do fluxo alterado;
- validacao exploratoria em local ou preview quando houver mudanca de UI, dados ou fluxo;
- registro do gate `"QA validado com Dev"` quando a historia estiver pronta para revisao;
- evidencia de tela ou video curto;
- atualizacao de docs quando a mudanca alterar comportamento;
- ausencia de `.env` ou segredo versionado.

### Gate 2 - Revisao de PR

- QA revisa cenarios e riscos.
- PO valida aceite funcional.
- PM verifica impacto no cronograma.
- GP verifica aderencia a processo e rastreabilidade.
- Nenhum P0/P1 conhecido pode ser ignorado.

### Gate 3 - Pre-release

- Regressao dos fluxos P0/P1.
- Lighthouse em Home, Catalogo, Eventos, Noticias e Perfil.
- DevTools sem erro critico.
- Validacao em viewport mobile e desktop.
- Feedbacks abertos classificados.

### Gate 4 - Pos-release

- Monitoramento de feedback por Sofia e Claudia.
- Janela de observacao inicial de 24h a 48h.
- Hotfix se surgir P0/P1.
- Registro de aprendizados e atualizacao da matriz.

## 12. Plano de execucao por ciclos

| Ciclo | Objetivo | Atividades | Saida esperada |
| --- | --- | --- | --- |
| C0 - Preparacao | Organizar base de QA | Revisar criterios de aceite, riscos, mocks, rotas e pendencias iniciais. | Matriz de risco priorizada e agenda de teste. |
| C1 - Rodada exploratoria | Descobrir problemas de uso real | Navegacao livre guiada por personas, mobile-first, console e rede, em local/preview durante o desenvolvimento. | Lista de achados com severidade, evidencia e responsavel Dev/QA. |
| C2 - Correcao orientada a risco | Corrigir P0/P1 primeiro | Dev corrige, QA faz sanity/revalidacao no mesmo ciclo, TL resolve conflitos tecnicos e PO valida comportamento. | Issues criticas fechadas ou mitigadas com gate `"QA validado com Dev"`. |
| C3 - Regressao | Garantir que nada quebrou | Reexecutar smoke, E2E e funcionais P0/P1. | Relatorio de regressao aprovado. |
| C4 - Validacao final | Decidir release | Gates finais, Lighthouse, acessibilidade, responsividade e dados. | Go/No-Go documentado. |
| C5 - Monitoramento pos-liberacao | Capturar feedback real | Sofia e Claudia coletam feedback, QA reproduz, PO prioriza. | Backlog atualizado e retorno ao usuario. |

## 13. Fluxo de feedback com Sofia e Claudia

1. Usuario envia feedback para Sofia ou Claudia.
2. Claudia registra em template padrao: data, usuario/perfil, dispositivo, navegador, rota, descricao, passos, esperado, obtido, anexos e impacto.
3. Sofia classifica impacto percebido: bloqueia uso, atrapalha uso, duvida de usabilidade, melhoria ou elogio.
4. QA tenta reproduzir em ambiente controlado.
5. QA define severidade tecnica: P0, P1, P2 ou P3.
6. PO define prioridade de produto e decide se entra na release atual ou backlog.
7. Claudia cria issue ou item de backlog com evidencia e responsavel.
8. PM acompanha SLA e remove impedimentos.
9. QA valida a correcao e anexa evidencia.
10. Sofia e Claudia retornam ao usuario com status: corrigido, contornado, planejado ou nao aplicavel.

### Template minimo de feedback

```text
ID:
Data/hora:
Recebido por: Sofia / Claudia
Usuario ou perfil:
Ambiente: producao / homologacao / local
Dispositivo e navegador:
Rota/tela:
Descricao:
Passos para reproduzir:
Resultado esperado:
Resultado observado:
Impacto para o usuario:
Anexos/evidencias:
Classificacao inicial:
Issue/backlog:
Status:
Retorno ao usuario:
```

### SLA sugerido

| Severidade | Exemplo | Primeira resposta | Decisao de prioridade | Validacao |
| --- | --- | --- | --- | --- |
| P0 | Fluxo critico indisponivel ou dado incorreto grave. | Ate 2h uteis | Mesmo dia | Antes de nova liberacao. |
| P1 | Fluxo importante com contorno dificil. | Ate 1 dia util | Ate 1 dia util | Na proxima rodada de regressao. |
| P2 | Problema moderado com contorno claro. | Ate 2 dias uteis | Ate 3 dias uteis | Conforme sprint. |
| P3 | Melhoria, texto, ajuste visual leve. | Ate 5 dias uteis | Backlog regular | Conforme priorizacao. |

## 14. Metricas de qualidade

| Metrica | Como medir | Meta inicial |
| --- | --- | --- |
| Bugs P0/P1 abertos | Issues abertas por severidade | 0 antes de release |
| Bugs por modulo | Contagem por Home, Perfil, Catalogo, Noticias, Eventos | Identificar hotspots |
| Taxa de retrabalho | Issues reabertas / issues fechadas | Abaixo de 10% |
| Tempo de primeira resposta a feedback | Recebimento ate resposta inicial | Dentro do SLA por severidade |
| Tempo medio de resolucao | Abertura ate validacao QA | Reduzir por ciclo |
| Cobertura de fluxos P0/P1 | Cenarios executados / planejados | 100% pre-release |
| Lighthouse Acessibilidade | Score por rota avaliada | Sem regressao; ideal 100/100 |
| Lighthouse Performance mobile | Score por rota avaliada | Definir baseline e evoluir |
| Erros de navegacao | Links quebrados ou rotas invalidas nao tratadas | 0 em rotas criticas |
| Falhas de console criticas | Erros JS em fluxo P0/P1 | 0 antes de release |
| Feedbacks sem dono | Feedbacks sem responsavel apos triagem | 0 |

## 15. Evidencias esperadas

Para cada ciclo de teste, registrar:

- ambiente usado: local, preview, homologacao ou producao;
- versao, branch, commit ou data/hora da execucao;
- navegador, dispositivo e viewport;
- checklist executado;
- passos por historia, resultado esperado e resultado obtido;
- screenshots dos fluxos principais;
- video curto para E2E critico ou bug complexo;
- logs de console e Network quando houver falha;
- relatorios Lighthouse e acessibilidade;
- resultado de `npm run qa:ci` quando aplicavel;
- gate `"QA validado com Dev"` quando a historia tiver correcao ou mudanca de comportamento;
- issue/backlog associado;
- decisao de Go/No-Go quando for pre-release.

Sugestao de organizacao:

```text
docs/qa/evidencias/
  AAAA-MM-DD-ciclo-regressao/
    resumo.md
    screenshots/
    videos/
    lighthouse/
    logs/
```

## 16. Definition of Ready e Definition of Done

### Definition of Ready

Uma demanda esta pronta para desenvolvimento quando:

- possui user story ou descricao objetiva;
- possui criterio de aceite verificavel;
- possui prioridade definida pelo PO;
- possui impacto em modulo identificado;
- possui dados/mocks ou contrato esperado;
- possui riscos de QA mapeados.

### Definition of Done

Uma demanda esta pronta para release quando:

- implementacao concluida sem erro critico;
- criterios de aceite aprovados pelo PO;
- testes aplicaveis executados pelo QA;
- gate `"QA validado com Dev"` concluido com revalidacao no mesmo ciclo;
- evidencias anexadas;
- documentacao atualizada quando necessario;
- feedbacks relacionados fechados ou reclassificados;
- regressao do fluxo impactado aprovada.

## 17. Go/No-Go de release

| Condicao | Go | No-Go |
| --- | --- | --- |
| Build e QA gate | `npm run qa:ci` aprovado | Build ou guard falha |
| Bugs P0/P1 | Nenhum aberto | Qualquer P0/P1 aberto |
| Rotas criticas | Todas acessiveis | Tela branca, erro critico ou rota quebrada |
| Acessibilidade | Sem regressao bloqueante | Falha que impede uso por teclado/leitor |
| Mobile | Fluxos principais utilizaveis | Navegacao ou leitura prejudicada |
| Dados/mocks | IDs e links consistentes | Link critico quebrado ou dado incoerente |
| Feedbacks recentes | Triados e com decisao | Feedback critico sem dono |

## 18. Cadencia de governanca

- Daily curta de QA durante ciclos C1 a C4: status de P0/P1, bloqueios e decisoes.
- Reuniao de triagem com Sofia e Claudia: consolidar feedbacks, classificar impacto e acionar PO/QA.
- Revisao de release com QA, PO, PM e GP: avaliar gates e assinar Go/No-Go.
- Retrospectiva pos-release: analisar metricas, retrabalho, feedbacks e melhorias no plano.

## 19. Checklist final de liberacao

- [ ] `npm run qa:ci` aprovado.
- [ ] Smoke de rotas criticas aprovado.
- [ ] Home/Feltrim Agents validado.
- [ ] Perfil, preferencias, emprestimos, historico e favoritos validados.
- [ ] Catalogo, busca, detalhe e disponibilidade por unidade aprovados.
- [ ] Noticias lista/detalhe aprovadas.
- [ ] Eventos lista/detalhe e Google Calendar aprovados.
- [ ] Navegacao mobile e responsividade aprovadas.
- [ ] Acessibilidade WCAG revisada sem regressao bloqueante.
- [ ] Performance Lighthouse registrada.
- [ ] Seguranca basica revisada.
- [ ] Links internos e IDs de mocks auditados.
- [ ] Feedbacks de Sofia e Claudia triados.
- [ ] Evidencias salvas e rastreaveis.
- [ ] Gate `"QA validado com Dev"` registrado nas historias alteradas.
- [ ] Decisao Go/No-Go registrada.

## 20. Proximos passos recomendados

1. Criar uma primeira rodada C0/C1 com foco nas pendencias iniciais de Perfil, IDs, Google Calendar, ARIA, microcopy e favicon.
2. Atualizar `docs/qa/matriz_us_x_testes.md` com os novos fluxos Home/Feltrim Agents, Perfil e Feedback do Usuario.
3. Definir baseline Lighthouse para performance mobile e manter acessibilidade sem regressao.
4. Padronizar template de feedback usado por Sofia e Claudia em `docs/governance/feedbacks`.
5. Evoluir o gate automatizado para cobrir links internos e consistencia minima de IDs entre mocks e rotas.
