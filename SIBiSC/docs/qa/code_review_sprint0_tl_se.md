# Code Review Pos-Sprint 0 - TL + SE

Data: 2026-05-18  
Escopo: Sprint 0 do SIBiSC/Feltrim Agents, com foco em codigo alterado, contrato de dados, guard de QA, riscos tecnicos basicos e prontidao para Sprint 1.  
Modo: revisao sem alteracao de codigo de produto.

## Veredito executivo

**Aprovado com ressalvas para consolidar a Sprint 0.**

A Sprint 0 estabilizou pontos importantes: Perfil passou a consumir `userProfileService.js`, recomendacoes da Home usam `getRecommendations()`, os IDs canonicos `b1..b8` foram alinhados contra o catalogo local e `qa:repo`/`qa:ci` estao verdes. O estado atual e aceitavel como prototipo local/documentado.

As ressalvas principais sao: um script externo de captura Figma carregado globalmente em `index.html`, ausencia de tratamento de erro em varios fluxos assíncronos fora do Perfil, busca assistida da Home limitada a subconjunto do catalogo, guard de QA ainda estrutural e suscetivel a falso negativo, e persistencia mutavel em mocks/services.

**Sprint 1 permanece NO-GO** ate as decisoes de Rafael e a ferramenta/processo de feedback Sofia/Claudia serem definidos, alem de endurecer os pontos de seguranca/QA listados abaixo.

## Atualizacao pos-correcao

Data: 2026-05-18/19  
Status: achados de Sprint 0 corrigidos quando seguros e validados sem iniciar Sprint 1.

- Achado alto de `index.html`: corrigido. O script externo de captura Figma foi removido do HTML base.
- Busca assistida da Home/Home Mobile: corrigida. A busca consulta o catalogo completo carregado, enquanto a UI limita apenas a exibicao de resultados/destaques.
- Fallbacks assíncronos fora do Perfil: mitigados com `try/catch/finally` e `ErrorState` em Home, Home Mobile, Catalogo, Noticias, Eventos e paginas de detalhe.
- Guard QA: reforcado para validar ausencia do script externo, rotas principais/detalhe, targets de links, campos minimos usados pela UI, inventario/unidades, uso de service no Perfil e `noopener,noreferrer` no Calendar.
- Mutacao global em services/mocks: mitigada no `userProfileService.js` ao isolar estado mutavel em copias locais do adapter. Helpers legados de `src/mocks/userProfile.js` permanecem como referencia mockada e devem ser tratados como pendencia menor se voltarem a ser usados.
- Calendar: corrigido para abrir nova aba com `noopener,noreferrer`.

Validacao pos-correcao registrada em `docs/qa/sprint0_evidencias_validacao.md`: `ReadLints` sem erros, `npm run qa:repo` aprovado, `npm run qa:ci` aprovado e smoke Playwright CLI aprovado em Home busca assistida, Catalogo, Perfil/Favoritos e Evento/Calendar.

Veredito atualizado: **Sprint 0 consolidada como baseline local/prototipo guiado. Sprint 1 continua NO-GO** ate decisao de Rafael sobre escopo/linguagem do MVP, criterio Go/No-Go e processo de feedback Sofia/Claudia.

## Achados por severidade

### Critico

Nenhum achado critico bloqueante foi identificado para o fechamento da Sprint 0 como prototipo local.

### Alto

1. **Script externo carregado em todas as paginas**
   - Caminho: `index.html`
   - Evidencia: ha um `<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>` no documento base.
   - Risco: qualquer deploy publico passa a executar codigo de terceiro em todo o app, com acesso ao contexto da pagina. Isso e aceitavel apenas se for ferramenta temporaria de design em ambiente controlado.
   - Recomendacao: remover antes de publicacao, ou condicionar explicitamente a ambiente de desenvolvimento/design. Registrar a decisao no checklist de release.

### Medio

1. **Fluxos assíncronos fora do Perfil podem ficar presos em loading ou falhar sem fallback**
   - Caminhos: `src/pages/HomePage.jsx`, `src/pages/HomePageMobile.jsx`, `src/pages/CatalogPage.jsx`, `src/pages/BookDetailPage.jsx`, `src/pages/EventDetailPage.jsx`, `src/pages/NewsDetailPage.jsx`
   - Evidencia: `HomePage.jsx` usa `Promise.all` sem `try/catch/finally`; paginas de detalhe e catalogo tambem assumem sucesso do service.
   - Risco: quando os mocks virarem backend/Supabase/API oficial, uma falha parcial pode deixar tela carregando indefinidamente ou sem estado de erro honesto.
   - Recomendacao: padronizar `loading/error/data` por pagina ou criar hook/adaptador de query simples para Sprint 1.

2. **Busca assistida da Home consulta apenas um subconjunto do catalogo carregado**
   - Caminhos: `src/pages/HomePage.jsx`, `src/pages/HomePageMobile.jsx`
   - Evidencia: a Home desktop carrega `bookItems.slice(0, 5)` e a mobile `slice(0, 4)`, mas a UI comunica busca no catalogo local.
   - Risco: falsos negativos para livros existentes fora desse subconjunto, enfraquecendo a promessa de "busca assistida".
   - Recomendacao: manter um dataset completo para busca rapida e limitar apenas a exibicao, ou ajustar microcopy para "destaques".

3. **Guard de QA valida contrato importante, mas ainda nao prova os fluxos de UI declarados**
   - Caminho: `scripts/qa-guard.mjs`
   - Evidencia: o guard valida IDs, favoritos e recomendacoes por importacao de mocks/services, mas nao renderiza telas nem inspeciona a estrutura DOM dos fluxos.
   - Risco: o guard pode passar mesmo se Home deixar de renderizar recomendacoes, se Perfil voltar a importar mocks diretamente, se favoritos voltarem a aninhar botao dentro de link, ou se uma rota visual quebrar.
   - Recomendacao: manter o guard estrutural, mas adicionar smoke Playwright/DOM minimo para Home, Perfil, Favoritos, Calendar e busca.

4. **Service de perfil mistura contrato, derivacao e mutacao de mock global**
   - Caminhos: `src/services/userProfileService.js`, `src/mocks/userProfile.js`
   - Evidencia: `renewLoan`, `removeFavorite`, `addFavorite` e `updateNotificationPreferences` mutam arrays/objetos importados; alguns getters retornam copia rasa.
   - Risco: estado entre acoes/testes pode vazar dentro da mesma sessao, dificultando reprodutibilidade e futura troca por backend.
   - Recomendacao: tratar o service como adapter de prototipo, isolar mutacoes e planejar contrato imutavel ou store controlada antes de persistencia real.

### Baixo

1. **Recomendacoes podem virar fallback generico sem afinidade real**
   - Caminho: `src/services/userProfileService.js`
   - Evidencia: `getRecommendations()` ordena por score, mas nao filtra `score > 0`.
   - Risco: se preferencias futuras nao casarem com o catalogo, o assistente ainda recomendara livros disponiveis com razao generica.
   - Recomendacao: filtrar afinidade minima ou comunicar explicitamente "populares/disponiveis" quando nao houver match.

2. **`qa-guard` pode bloquear expansao legitima do catalogo**
   - Caminho: `scripts/qa-guard.mjs`
   - Evidencia: o guard exige exatamente `b1..b8` e acusa qualquer ID fora desse conjunto.
   - Risco: falso positivo quando Sprint 1 adicionar `b9+` de forma valida.
   - Recomendacao: separar "contrato Sprint 0" de "catalogo expansivel" ou tornar a lista esperada declarativa em fixture/contrato versionado.

3. **IDs e referencias de eventos/noticias/unidades ainda nao recebem o mesmo rigor dos livros**
   - Caminhos: `src/mocks/events.js`, `src/mocks/news.js`, `src/mocks/units.js`, `scripts/qa-guard.mjs`
   - Risco: links ou renderizacao podem quebrar fora do catalogo sem que o guard acuse, especialmente em detalhes de evento e disponibilidade por unidade.
   - Recomendacao: validar `eventId`, `newsId`, `unitId`, campos obrigatorios de Calendar e existencia de `unit` para todo inventario.

4. **`window.open` do Google Calendar deveria nascer com noopener**
   - Caminho: `src/pages/EventDetailPage.jsx`
   - Evidencia: o codigo chama `window.open(calendarUrl, '_blank')` e depois ajusta `calendarWindow.opener = null`.
   - Risco: baixo, mas o padrao mais robusto e abrir com features `noopener,noreferrer` desde o inicio.
   - Recomendacao: usar `window.open(calendarUrl, '_blank', 'noopener,noreferrer')` ou link externo com `rel`.

5. **Tabs do Perfil usam ARIA basico, mas nao implementam navegacao por setas**
   - Caminho: `src/pages/UserProfilePage.jsx`
   - Risco: baixo para Sprint 0, mas tabs com `role="tablist"` costumam esperar suporte de teclado por setas.
   - Recomendacao: na Sprint 1, adicionar comportamento de teclado ou simplificar para botoes/links sem role de tabs se o padrao completo nao for necessario.

## Analise TL

Pontos positivos:

- A decisao de centralizar Perfil em `userProfileService.js` reduz acesso direto da tela aos mocks e cria uma borda natural para futura troca por backend.
- `getRecommendations()` passou a derivar disponibilidade do catalogo local, corrigindo o maior risco de recomendacoes apontarem para livros inexistentes.
- `docs/product/multiagent_integration_contract.md` documenta premissas, IDs canonicos, limites de IA, disponibilidade mockada e pendencias de integracao.
- `qa:repo` entrou no `qa:ci`, o que cria um gate objetivo para regressao de IDs.

Ressalvas arquiteturais:

- O service atual ainda e um adapter de mock mutavel, nao um contrato de dominio pronto para persistencia.
- Home desktop e Home mobile duplicam logica de busca assistida, mensagens e matching local; isso tende a divergir na Sprint 1.
- `mockHomeContent` e validado pelo guard, mas a Home mobile real consome services diretamente; logo o arquivo funciona mais como fixture/documentacao do que fonte de verdade.
- O contrato de livros esta mais maduro que eventos, noticias, unidades, feedback e gamificacao. Para Sprint 1, a prioridade deve ser ampliar o contrato sem aumentar acoplamento.

Direcao recomendada:

- Manter Sprint 0 congelada como baseline.
- Antes de features novas, criar uma pequena camada de contrato/fixtures versionadas para `book`, `event`, `news`, `unit`, `profile` e `recommendation`.
- Extrair util comum de busca assistida/recomendacoes para evitar divergencia desktop/mobile.
- Adicionar testes de fluxo de UI para os caminhos que hoje dependem apenas de revisao manual.

## Analise SE

Seguranca e privacidade:

- Os dados pessoais exibidos no Perfil sao mockados, mas incluem nome, e-mail, telefone e preferencias. Antes de dados reais, e necessario definir minimizacao, consentimento, mascaramento em logs/evidencias e regra de exportacao.
- O texto da UI mitiga bem a promessa exagerada de IA: comunica prototipo, dados locais, ausencia de reserva real e disponibilidade mockada.
- O script externo de captura Figma no HTML base e o principal risco de seguranca basica para qualquer ambiente publico.
- Links externos de noticias usam `target="_blank"` com `rel="noreferrer"`, adequado para o prototipo.
- Google Calendar usa `URLSearchParams`, reduz risco de URL malformada/injecao por texto do evento, mas deve abrir com `noopener,noreferrer` diretamente.

Robustez e qualidade:

- Acessibilidade melhorou com `aria-live`, `aria-pressed`, status textual de disponibilidade e separacao de botao/link em favoritos.
- O risco remanescente de acessibilidade esta em tabs com semantica parcial e ausencia de teste automatizado/assistivo.
- Disponibilidade deve ganhar fonte, timestamp e SLA de sincronizacao quando sair dos mocks; sem isso, ha risco de usuario interpretar disponibilidade como oficial.

## Analise do guard QA

O `qa-guard` cobre bem:

- Presenca de arquivos essenciais de docs, rotas, Supabase e `.env.example`.
- Rotas criticas `/noticias`, `/eventos` e `/catalogo` em `AppRouter.jsx`.
- Catalogo exatamente com IDs `b1..b8`.
- `mockLoans`, `mockLoanHistory` e `mockFavorites` apontando para livros existentes.
- Disponibilidade de favoritos coerente com `src/mocks/books.js`.
- `mockHomeContent.featuredBooks` com IDs conhecidos.
- `getRecommendations()` retornando `id === bookId`, livro existente, disponivel, contagens coerentes e `source === 'catalogo-mock'`.
- Campos esperados no template de PR.

Possiveis falsos positivos:

- Qualquer expansao valida do catalogo para `b9+` falhara ate atualizar o contrato do guard.
- O script depende de `process.cwd()` ser o diretorio do projeto `SIBiSC`; fora do `npm run`, pode acusar estrutura ausente.
- Checks de documentacao por substring podem falhar por renomeacao legitima ou passar com referencia obsoleta.

Possiveis falsos negativos:

- Nao verifica se `UserProfilePage.jsx` continua usando `userProfileService.js`.
- Nao verifica se Home realmente renderiza recomendacoes vindas de `getRecommendations()`.
- Nao verifica consistencia de `title`, `author` e `isbn` entre perfil/favoritos/historico e o catalogo.
- Nao valida `unitId` do inventario contra `src/mocks/units.js`.
- Nao valida eventos/noticias contra rotas de detalhe.
- Nao valida `createGoogleCalendarUrl()` nem campos obrigatorios de evento.
- Nao captura regressao de DOM/acessibilidade, como botao dentro de link, ausencia de `aria-live`, tabs incompletas ou status textual de disponibilidade.
- Nao captura falso negativo de busca assistida por usar subconjunto do catalogo na Home.

Recomendacao para o guard:

- Preservar o guard estrutural como gate rapido.
- Adicionar uma segunda camada de testes de UI/smoke para rotas e interacoes criticas.
- Transformar a lista de IDs canonicos em contrato versionado, permitindo evolucao controlada na Sprint 1.

## Recomendacao Go/No-Go

**Sprint 0: GO para consolidacao com ressalvas registradas.**

Condicoes recomendadas antes de declarar Sprint 0 totalmente fechada:

- Registrar que o script Figma em `index.html` e temporario ou remove-lo antes de qualquer deploy publico.
- Aceitar formalmente que dados, disponibilidade, recomendacoes e perfil sao mocks locais.
- Manter `qa:repo`, `qa:ci` e a evidencia `docs/qa/sprint0_evidencias_validacao.md` como baseline.

**Sprint 1: NO-GO neste momento.**

Pre-condicoes para iniciar Sprint 1:

- Rafael decidir linguagem/escopo do MVP guiado e criterio Go/No-Go.
- Definir ferramenta/processo de feedback Sofia/Claudia, incluindo campos, severidade, dono e privacidade.
- Definir fonte futura de verdade para catalogo/disponibilidade, com timestamp e origem.
- Expandir o guard/testes para eventos, noticias, unidades, Calendar, busca assistida e acessibilidade minima.
- Endurecer tratamento de erro assíncrono antes de conectar backend ou Supabase real.
- Remover ou condicionar script externo de captura/design fora de desenvolvimento.

## Testes e comandos rodados

Comandos de inspecao:

- `git status --short`
- `git diff --stat`
- `git diff --name-status`
- `git log -5 --oneline`
- `git diff -- index.html scripts/qa-guard.mjs src/pages/UserProfilePage.jsx src/services/userProfileService.js src/pages/HomePage.jsx src/pages/HomePageMobile.jsx src/components/ui/AvailabilityTable.jsx src/components/ui/SearchField.jsx src/pages/CatalogPage.jsx src/pages/EventDetailPage.jsx src/utils/calendar.js`

Validacoes:

- `ReadLints` em `src` e `scripts/qa-guard.mjs`: sem erros reportados.
- `npm run qa:repo`: aprovado com mensagem `QA repository guard passou: estrutura minima, docs, rotas criticas e IDs canonicos estao consistentes.`
- `npm run qa:ci`: aprovado; executou `qa:repo` e `vite build`, com 82 modulos transformados.

Smoke Playwright:

- Nao foi reexecutado nesta revisao para evitar duplicar servidor/smoke manual. A evidencia recente em `docs/qa/sprint0_evidencias_validacao.md` registra smoke manual aprovado em Home, Catalogo, Detalhe de Livro, Perfil/Favoritos, Eventos e Detalhe de Evento.
