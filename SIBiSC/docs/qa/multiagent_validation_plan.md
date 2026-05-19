# Plano de Validacao Multiagente - SIBiSC/Feltrim Agents

Ultima atualizacao: 2026-05-18  
Responsavel: QA/SDET  
Escopo: validacao dos fluxos integrados discutidos na rodada multiagente, sem implementacao de feature.

## 1. Objetivo

Este documento consolida a validacao idempotente da integracao SIBiSC/Feltrim Agents apos a rodada multiagente interrompida. O foco e preparar QA para revalidar confiabilidade, dados, UX, produto e feedback, sem ampliar escopo funcional.

Fontes obrigatorias lidas nesta recuperacao:

- `docs/product/feltrim_agents_analise_completa_e_backlog.md`
- `docs/product/reuniao_sincrona_relatorios_executivos.md`
- `docs/product/plano_sprints_finalizacao.md`
- `docs/qa/plano_completo_testes_zero_problemas.md`
- `package.json`

Arquivos opcionais verificados nesta rodada:

- Encontrado e lido: `docs/product/multiagent_execution_log.md`
- Encontrado e lido: `docs/product/multiagent_integration_contract.md`

## 2. Estado da recuperacao

Resultado observado:

- `docs/qa/multiagent_validation_plan.md` nao existia e foi criado.
- `package.json` possui `npm run qa:ci`, que executa `npm run qa:repo && npm run build`.
- Ao checar a partir de `Web_Mobile/SIBiSC`, havia alteracoes locais aparentes em `src/components`, `src/mocks`, `src/pages`, `src/services`, arquivos Playwright e documentos, incluindo contrato/log multiagente criados por outra frente.
- Como ha sinais de alteracoes simultaneas de outras frentes, `npm run qa:ci` nao foi forcado nesta recuperacao.
- Foi executado `npm run qa:repo` como validacao segura e repetido apos o contrato aparecer; resultado: aprovado.

Decisao de QA:

- Para mudanca apenas documental: registrar plano e recomendar comandos.
- Para mudanca em `src/`, `scripts/`, `package.json`, `vite.config.*` ou dados/mocks: executar `npm run qa:ci`, se o ambiente estiver estavel.
- Para alteracoes simultaneas aparentes de outros agentes: evitar testes longos concorrentes, registrar o risco e executar apenas smoke manual ou `npm run qa:repo`, se seguro.

## 3. Estrategia de validacao

Prioridade P0/P1:

1. Confirmar consistencia de IDs e links entre Perfil, catalogo, recomendacoes, favoritos e historico.
2. Validar que recomendacoes apontam para livros existentes, disponiveis ou explicitamente marcados como indisponiveis.
3. Confirmar que CTAs principais possuem retorno perceptivel e nao geram navegacao acidental.
4. Validar acessibilidade em filtros, abas, navegacao mobile, foco e estados ativos.
5. Garantir que eventos e Google Calendar nao prometem comportamento externo sem fallback.
6. Confirmar que o fluxo Sofia/Claudia transforma feedback em registro reproduzivel.

Evidencia minima por rodada:

- data/hora, branch e commit quando disponivel;
- comandos executados e saida resumida;
- rotas e viewports avaliadas;
- status por fluxo: aprovado, falhou, bloqueado ou nao aplicavel;
- bugs P0/P1 com passos, esperado, obtido e responsavel;
- decisao Go/No-Go quando for pre-release.

### 3.1 Fluxo QA + Dev pairing

Este fluxo deve acompanhar cada historia das sprints finais. A validacao multiagente nao deve ser tratada como uma fila separada no fim do ciclo.

1. Refinamento tecnico: QA participa junto com Dev, TL e PO para revisar comportamento esperado, criterio de aceite, riscos de dados/mocks, acessibilidade, mobile e impactos em rotas ou services.
2. Planejamento de teste da historia: Dev e QA definem antes de codar quais casos serao executados, quais dados serao usados, quais comandos devem rodar e qual evidencia sera obrigatoria.
3. Desenvolvimento com validacao exploratoria: enquanto o Dev implementa, QA valida em ambiente local ou preview, testando cenarios felizes, bordas, regressao e UX real.
4. Correcao e revalidacao no mesmo ciclo: se QA encontrar falha, Dev corrige e QA revalida antes de o card seguir para `done`.
5. Revisao tecnica do TL: TL apoia quando houver conflito entre front, dados e testes, especialmente em contratos de mocks/services, ARIA, rotas dinamicas, recomendacoes e feedback.
6. Fechamento da historia: o gate `"QA validado com Dev"` deve estar registrado na historia, com evidencias e status de revalidacao.

Evidencias obrigatorias por historia:

- prints ou video curto quando o comportamento visual for relevante;
- passos executados;
- resultado esperado;
- resultado obtido;
- testes, comandos ou checks manuais rodados;
- ambiente usado: local, preview, homologacao ou producao;
- responsavel Dev e QA pela revalidacao.

## 4. Fluxos E2E prioritarios

### 4.1 Cadastro/preferencias -> recomendacoes -> catalogo -> perfil -> feedback

Objetivo: validar a jornada principal de personalizacao e descoberta, mesmo que cadastro/preferencias ainda estejam mockados ou documentados como evolucao.

Roteiro:

```gherkin
Given que o usuario possui preferencias de leitura cadastradas ou mockadas
When acessa a Home/Feltrim Agents
Then ve recomendacoes coerentes com preferencias, disponibilidade e limite de prototipo
When abre uma recomendacao
Then navega para um detalhe valido do catalogo
When favorita ou consulta a disponibilidade
Then a acao possui retorno perceptivel
When retorna ao Perfil
Then favoritos, historico, emprestimos e preferencias permanecem consistentes
When relata problema para Sofia ou Claudia
Then o feedback e registrado com rota, dispositivo, passos, esperado, obtido e impacto
```

Checks obrigatorios:

- Preferencias exibidas no Perfil devem bater com as usadas nas recomendacoes.
- Recomendacao deve ter motivo compreensivel e link valido.
- Livro recomendado deve existir no catalogo e abrir `/catalogo/:bookId` sem erro.
- Perfil nao deve conter link para ID inexistente.
- Feedback deve conseguir virar issue/backlog reproduzivel.

### 4.2 Recomendacoes disponiveis e explicaveis

Objetivo: impedir recomendacoes enganosas, opacas ou quebradas.

Roteiro:

```gherkin
Given que ha livros com categorias, autores, disponibilidade e unidades
When Feltrim Agents apresenta sugestoes
Then cada sugestao aponta para um livro existente
  And exibe motivo especifico
  And nao afirma disponibilidade sem dado do catalogo
  And oferece alternativa quando nao houver sugestao segura
```

Checks obrigatorios:

- Nenhum ID `rec-*` deve ser tratado como rota de livro se nao existir no catalogo.
- Livros indisponiveis nao devem aparecer como sugestao principal sem aviso.
- Motivos nao podem ser genericos demais, como apenas "recomendado para voce".
- O usuario deve conseguir seguir para detalhe do catalogo em um clique.

### 4.3 Catalogo -> detalhe -> disponibilidade -> favoritos

Objetivo: validar descoberta, metadados, disponibilidade e acoes de engajamento.

Roteiro:

```gherkin
Given que o usuario acessa o catalogo
When busca por titulo, autor, ISBN, acento ou termo inexistente
Then recebe resultado, vazio ou erro amigavel
When abre o detalhe de um livro
Then ve metadados, disponibilidade por unidade e status textual
When favorita ou remove favorito
Then o Perfil reflete a acao sem navegacao inesperada
```

Checks obrigatorios:

- Busca deve aceitar acentos, caixa alta/baixa e ISBN.
- Tabela de disponibilidade deve ter headers e texto de status, nao apenas cor.
- Unidade mais proxima deve ter criterio claro quando bairro estiver selecionado.
- Remover favorito nao pode estar dentro de link interativo nem disparar rota acidental.

### 4.4 Perfil -> emprestimos/historico/favoritos -> detalhe

Objetivo: validar confianca do Perfil e evitar livro nao encontrado.

Roteiro:

```gherkin
Given que o usuario esta no Perfil
When navega por Emprestimos, Historico e Favoritos
Then cada item abre detalhe valido ou exibe fallback rastreado
  And abas comunicam estado ativo visual e semanticamente
  And acoes de renovar/remover possuem feedback perceptivel
```

Checks obrigatorios:

- IDs do Perfil devem ser compatibilizados com `books`.
- Tabs devem usar semantica adequada ou atributos ARIA equivalentes.
- Foco por teclado deve entrar, acionar e sair das abas de forma previsivel.
- Nenhuma acao critica pode depender apenas de cor ou animacao.

### 4.5 Eventos -> detalhe -> Google Calendar

Objetivo: validar a promessa de calendario e evitar CTA silencioso.

Roteiro:

```gherkin
Given que o usuario acessa Eventos
When abre um evento
Then ve data, horario, local, publico, inscricao e descricao
When aciona Google Calendar
Then a URL contem titulo, data, horario, local e descricao
  And existe feedback ou fallback se nova aba for bloqueada
```

Checks obrigatorios:

- Datas devem considerar timezone ou registrar limitacao.
- CTA deve comunicar que abriu nova aba ou que houve bloqueio.
- Mobile deve manter leitura sem scroll horizontal.
- Evento sem imagem externa nao deve quebrar layout.

### 4.6 Feedback Sofia/Claudia -> triagem -> validacao

Objetivo: fechar o ciclo operacional de feedback sem depender de memoria oral.

Roteiro:

```gherkin
Given que Sofia ou Claudia recebe um relato
When Claudia registra o feedback no template
Then o item possui contexto suficiente para QA reproduzir
When QA classifica severidade e PO prioriza
Then o feedback recebe status e responsavel
When houver correcao ou decisao
Then Sofia/Claudia retornam ao usuario com status claro
```

Campos minimos:

- ID, data/hora, recebido por Sofia/Claudia.
- Usuario ou perfil, ambiente, dispositivo, navegador e viewport.
- Rota/tela, passos, esperado, obtido e impacto.
- Evidencias, severidade tecnica, prioridade de produto, dono e status.

## 5. Checklists transversais

### 5.1 IDs e dados

- [ ] Todos os IDs de livros usados por Perfil, favoritos, historico, emprestimos e recomendacoes existem em `src/mocks/books.js`.
- [ ] Rotas dinamicas `/catalogo/:bookId`, `/eventos/:eventId` e `/noticias/:newsId` tratam ID invalido sem tela branca.
- [ ] Services e mocks nao divergem em campos obrigatorios.
- [ ] Dados mockados/prototipo sao rotulados quando houver risco de interpretacao como dado oficial.
- [ ] Disponibilidade nao contradiz quantidade, unidade ou status textual.

### 5.2 Recomendacoes disponiveis

- [ ] Cada recomendacao possui livro real, motivo, disponibilidade ou aviso de indisponibilidade.
- [ ] Lista vazia tem fallback honesto e CTA para buscar no catalogo.
- [ ] Preferencias alteradas devem mudar recomendacoes ou explicar por que nao mudaram.
- [ ] Nenhuma recomendacao promete reserva real se o fluxo nao existir.

### 5.3 ARIA, teclado e estados

- [ ] BottomNav e nav desktop indicam rota ativa com `aria-current` ou equivalente.
- [ ] Filtros/pills usam `aria-pressed`, tabs reais ou semantica equivalente.
- [ ] Loading, vazio e erro sao comunicaveis quando necessario.
- [ ] Foco visivel existe em links, botoes, cards acionaveis, filtros e abas.
- [ ] Nao ha controle interativo dentro de outro controle interativo.

### 5.4 CTAs e feedback visual

- [ ] Buscar/Explorar comunica resultado, mesmo com debounce.
- [ ] Renovar emprestimo exibe mudanca observavel ou mensagem de sucesso/limite.
- [ ] Remover favorito confirma remocao sem navegar.
- [ ] Abrir Google Calendar informa nova aba, bloqueio ou fallback.
- [ ] Favoritar/salvar nao parece silencioso.

### 5.5 Favoritos e perfil

- [ ] Favoritos refletem livros existentes.
- [ ] Remocao nao quebra historico nem emprestimos.
- [ ] Perfil apresenta preferencias, unidade e notificacoes de forma consistente.
- [ ] Historico e emprestimos nao apontam para catalogo inexistente.

### 5.6 Calendario e eventos

- [ ] URL do Google Calendar inclui titulo, descricao, local e intervalo de data/hora.
- [ ] Timezone esta definido ou documentado como limitacao.
- [ ] Mobile abre nova aba/fallback sem travar fluxo.
- [ ] Eventos antigos ou sem data futura sao tratados de forma clara.

### 5.7 Favicon, assets e console

- [ ] Favicon e assets basicos nao retornam 404 relevante.
- [ ] DevTools Console nao mostra erro JS critico nas rotas principais.
- [ ] Network nao mostra falha bloqueante para CSS/JS/assets essenciais.
- [ ] 404 intencional de rota invalida exibe pagina amigavel.

### 5.8 Mobile e responsividade

- [ ] Viewport 375x812 sem scroll horizontal.
- [ ] Viewport 768x1024 preserva hierarquia e navegacao.
- [ ] Desktop 1366x768 mantem nav, cards e tabelas legiveis.
- [ ] Areas clicaveis sao confortaveis no touch.
- [ ] BottomNav nao cobre conteudo ou CTAs finais.

### 5.9 Reduced motion

- [ ] Interface respeita `prefers-reduced-motion` para animacoes nao essenciais.
- [ ] Transicoes nao bloqueiam percepcao de estado.
- [ ] Informacao importante nao depende de movimento.
- [ ] Teste manual em modo reduced motion e registrado antes de release.

### 5.10 Gamificacao futura

- [ ] Gamificacao permanece P2/futura ate confiabilidade e recomendacoes estarem estaveis.
- [ ] Regras propostas evitam ranking publico competitivo.
- [ ] Metas, trilhas e selos sao opcionais e inclusivos.
- [ ] Conquistas nao podem ser disparadas por link quebrado ou dado inconsistente.
- [ ] Feedback de gamificacao deve entrar no mesmo fluxo Sofia/Claudia.

## 6. Criterios de aceite por frente

### Dados

- IDs de livros, eventos, noticias, favoritos, historico e emprestimos sao consistentes.
- Recomendacoes usam dados verificaveis e nao inventam disponibilidade.
- Dados mockados sao identificados quando podem afetar expectativa real.
- Contratos futuros de catalogo oficial/Supabase preservam fonte de verdade, timestamp e fallback.
- Nenhum P0 de dado/link quebrado permanece aberto antes de demonstracao.

### Front/UX

- Rotas criticas carregam sem tela branca: `/`, `/home-mobile`, `/catalogo`, `/catalogo/:bookId`, `/perfil`, `/eventos`, `/eventos/:eventId`, `/noticias` e rota invalida.
- CTAs principais possuem retorno perceptivel.
- Mobile-first validado em 375px, tablet e desktop.
- ARIA, teclado, foco visivel e estados ativos nao apresentam regressao bloqueante.
- Favicon/assets basicos e console/rede ficam sem falhas criticas.

### Produto

- Feltrim Agents e apresentado como assistente de descoberta/orientacao, sem prometer IA aberta alem do implementado.
- Recomendacoes explicam motivo, fonte/criterio e proxima acao.
- Reserva real, integracao oficial e gamificacao ficam rotuladas como futuras se nao estiverem implementadas.
- Feedback Sofia/Claudia possui owner, SLA e status de retorno.
- Go/No-Go considera valor, confianca e limites do prototipo.

### QA

- `npm run qa:ci` passa quando houver mudanca de codigo/dados relevante e ambiente estavel.
- Smoke das rotas criticas e E2E prioritarios possuem evidencia.
- Bugs P0/P1 sao bloqueantes ate correcao ou decisao formal de No-Go.
- Relatorio de execucao registra comandos, ambiente, viewports e status por fluxo.
- Feedbacks recentes sao triados antes de fechar rodada.
- Historias alteradas possuem gate `"QA validado com Dev"` antes de `done`, com prints, passos, esperado/obtido e testes rodados.

## 7. Comandos recomendados

Executar a partir de `Web_Mobile/SIBiSC`.

Para checagem rapida de guard documental/repositorio:

```bash
npm run qa:repo
```

Para gate completo recomendado antes de PR/release:

```bash
npm run qa:ci
```

Para build isolado quando o guard ja foi executado:

```bash
npm run build
```

Para smoke manual local:

```bash
npm run dev
```

Rotas minimas para smoke manual:

- `/`
- `/home-mobile`
- `/catalogo`
- `/perfil`
- `/eventos`
- `/noticias`
- `/catalogo/b1` ou outro ID valido confirmado no catalogo
- rota invalida para validar 404 amigavel

## 8. Registro desta rodada

Execucao nesta recuperacao:

- Criado `docs/qa/multiagent_validation_plan.md`.
- Consultado `package.json`; `qa:ci` esta disponivel.
- Lidos `docs/product/multiagent_execution_log.md` e `docs/product/multiagent_integration_contract.md`.
- Consultado estado local a partir de `Web_Mobile/SIBiSC`; havia alteracoes aparentes em Front/Dados, contrato/log multiagente e artefatos Playwright.
- Executado `npm run qa:repo` durante a recuperacao; resultado final: `QA repository guard passou: estrutura minima, docs e rotas criticas estao consistentes.`
- Nao executado `npm run qa:ci`, pois ha alteracoes simultaneas aparentes e o comando inclui build; deve ser rodado quando o ambiente estiver estavel.

Bloqueios e riscos pendentes:

- A rodada depende de revalidacao futura caso outros agentes alterem `src/`, mocks, services ou contratos apos esta checagem.
- O contrato declara pendencias: Front ainda deve consumir service de Perfil em vez de mocks diretos, QA ainda precisa de guard automatizado de consistencia de IDs e fonte oficial/timestamp/sync seguem sem decisao.
- Cadastro/preferencias reais, feedback in-app Sofia/Claudia, gamificacao e integracao oficial seguem como escopo futuro/produto, nao como funcionalidade validada nesta rodada.

## 9. Proximo passo de QA

Na proxima mudanca de codigo ou dados, executar:

1. `git status --short -- "Web_Mobile/SIBiSC"` para identificar arquivos alterados.
2. `npm run qa:repo` se houver risco de concorrencia ou mudanca pequena.
3. `npm run qa:ci` se o ambiente estiver estavel.
4. Smoke manual dos fluxos 4.1 a 4.6, priorizando IDs, recomendacoes, Perfil e feedback Sofia/Claudia.
5. Atualizar este registro com resultado, evidencias e decisao Go/No-Go.
