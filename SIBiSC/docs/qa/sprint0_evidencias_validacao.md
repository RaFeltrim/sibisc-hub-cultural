# Evidencias de Validacao - Sprint 0 SIBiSC/Feltrim Agents

Data: 2026-05-18  
Escopo: estabilizacao Sprint 0, sem iniciar Sprint 1.  
Decisao-base: GO para Sprint 0 e NO-GO para Sprint 1 ate evidencias e gates verdes.

## 1. Resumo QA + Dev

Status da rodada: validacao automatizada aprovada e smoke manual critico aprovado nas rotas cobertas.

Itens estabilizados:

- Perfil passou a consumir `userProfileService.js` para perfil, emprestimos, historico, favoritos, notificacoes, renovacao e remocao.
- Home passou a usar `getRecommendations()` para renderizar recomendacoes Feltrim Agents navegaveis e derivadas do catalogo local.
- `qa:repo` passou a auditar IDs canonicos `b1..b8`, referencias de Perfil/Home e recomendacoes contra `src/mocks/books.js`.
- Disponibilidade por unidade ganhou texto de status, alem da contagem visual.
- `index.html` recebeu favicon SVG inline para evitar requisicao padrao `/favicon.ico` sem asset.
- Microcopy da recomendacao da Home foi revalidada apos corrigir a concatenacao visual do nome do leitor.

Gate `"QA validado com Dev"`: atendido para os itens alterados nesta rodada com validacao por codigo, guard automatizado, build e smoke manual local. Ainda depende de Rafael para decisoes de Sprint 1.

## 2. Comandos executados

Ambiente: local, Windows, projeto `Web_Mobile/SIBiSC`.

| Comando | Resultado obtido |
| --- | --- |
| `npm run qa:repo` | Aprovado. Mensagem: `QA repository guard passou: estrutura minima, docs, rotas criticas e IDs canonicos estao consistentes.` |
| `npm run qa:ci` | Aprovado. Executou `qa:repo` e `vite build`; build concluiu com 82 modulos transformados. |
| `npm run dev -- --host 127.0.0.1` | Servidor local iniciou em `http://127.0.0.1:5175/` para smoke manual. Encerrado apos a validacao. |
| `npx --yes --package @playwright/cli playwright-cli ...` | Smoke manual com navegador executado em Home, Catalogo, Detalhe de Livro, Perfil, Favoritos, Eventos e Detalhe de Evento. |

## 3. Casos Sprint 0

| Caso | Esperado | Obtido | Status |
| --- | --- | --- | --- |
| IDs de Perfil | Emprestimos, historico e favoritos apontam para `b1..b8`. | Guard automatizado valida `mockLoans`, `mockLoanHistory` e `mockFavorites` contra catalogo. | Aprovado |
| Favoritos | Disponibilidade derivada do catalogo e botao Remover fora do link. | `getFavoritesWithStatus()` deriva contagens; markup segue `article` + `Link` + botao separado. | Aprovado por codigo/guard |
| Recomendacoes Feltrim Agents | Livros existentes, disponiveis, com `id === bookId` e source local. | Guard valida `getRecommendations()` contra catalogo e Home renderiza esse service. | Aprovado |
| Buscar/Explorar | Feedback perceptivel em regiao `aria-live`. | `SearchField` mantem `role="status"`/`aria-live` para Home, Home Mobile e Catalogo. | Aprovado por codigo |
| Perfil tabs | Estados acessiveis de abas. | `UserProfilePage.jsx` mantem `tablist`, `tab`, `tabpanel`, `aria-selected` e `aria-controls`. | Aprovado por codigo |
| Favoritos sem interacao aninhada | Botao Remover nao deve ficar dentro de link. | Botao permanece irmao do `Link` dentro do `article`. | Aprovado por codigo |
| Calendar | URL e fallback perceptivel. | `EventDetailPage.jsx` usa `createGoogleCalendarUrl()` com `ctz=America/Sao_Paulo` e status `aria-live`. | Aprovado por codigo |
| Favicon | Sem 404 relevante para favicon basico. | Favicon SVG inline adicionado em `index.html`. | Aprovado por codigo |

## 4. Smoke manual

Executado com Playwright CLI em navegador local:

| Rota/fluxo | Evidencia observada | Status |
| --- | --- | --- |
| Home `/` | Carregou hero Feltrim Agents, recomendacoes navegaveis `/catalogo/b1` e `/catalogo/b7`, microcopy de prototipo e dados locais. | Aprovado |
| Home busca assistida | Busca por `Vidas` exibiu status `Feltrim Agents encontrou 1 sugestao no catalogo local` e link `/catalogo/b7`. | Aprovado |
| Detalhe de livro `/catalogo/b7` | Abriu `Vidas Secas`; disponibilidade por unidade exibiu texto `Disponivel para retirada no prototipo local.`. | Aprovado |
| Catalogo `/catalogo` | Lista carregou livros navegaveis, incluindo `/catalogo/b7` e `/catalogo/b1`. | Aprovado |
| Perfil `/perfil` | Dados carregaram via service; tabs acessiveis `Empréstimos`, `Histórico`, `Favoritos`; links de emprestimos apontaram para `b5`, `b3`, `b1`. | Aprovado |
| Favoritos no Perfil | Aba Favoritos abriu com links `b7`, `b2`, `b4`, `b8`; botao `Remover` ficou separado do link e exibiu status `Vidas Secas removido dos favoritos.` sem navegar. | Aprovado |
| Detalhe de evento `/eventos/e1` | Carregou `Hora do Conto Infantil`; CTA `Abrir Google Calendar` abriu nova aba com URL contendo `ctz=America/Sao_Paulo` e exibiu status local. | Aprovado |
| Eventos `/eventos` | Lista carregou agenda e links `Ver detalhes`. | Aprovado |

## 5. Pendencias e bloqueios

- Fonte oficial, timestamp e sincronizacao de disponibilidade seguem sem decisao de Rafael.
- Sprint 1 continua bloqueada ate Rafael aprovar linguagem/escopo do MVP guiado, criterio Go/No-Go e ferramenta de feedback Sofia/Claudia.
- Smoke manual cobriu rotas criticas desta Sprint 0; Noticias e 404 seguem recomendados para regressao final da Sprint 3.

## 6. Recomendacao atual

GO para continuar/fechar Sprint 0 nos itens implementados.  
NO-GO para iniciar Sprint 1 nesta rodada, ate Rafael aprovar linguagem/escopo do MVP guiado, criterio Go/No-Go e ferramenta de feedback Sofia/Claudia.

## 7. Correcao pos-review TL+SE

Data: 2026-05-18/19  
Escopo: correcao curta dos achados do `docs/qa/code_review_sprint0_tl_se.md`, sem iniciar Sprint 1.

Achados corrigidos:

- Alto: removido de `index.html` o script externo `https://mcp.figma.com/mcp/html-to-design/capture.js`; o build publico nao carrega mais captura/design de terceiro por padrao.
- Medio: Home e Home Mobile agora mantem o catalogo completo em memoria para a busca assistida, limitando apenas a exibicao visual de destaques. Smoke confirmou busca por `Cortico` encontrando `b5`, que ficava fora do subconjunto inicial.
- Medio: fluxos assíncronos fora do Perfil receberam fallback leve de erro em Home, Home Mobile, Catalogo, Noticias, Eventos e detalhes de livro/evento/noticia.
- Medio: `qa-guard` passou a validar ausencia do script Figma, rotas principais e de detalhe, targets da Home mobile, campos minimos de livros/eventos/noticias, unidades referenciadas por inventario, uso de `userProfileService.js` no Perfil e `noopener,noreferrer` no Calendar.
- Medio: `userProfileService.js` deixou de mutar diretamente os arrays/objetos importados de `src/mocks/userProfile.js`; o estado mutavel do prototipo agora fica isolado no adapter do service.
- Baixo relacionado: `EventDetailPage.jsx` abre Google Calendar com `noopener,noreferrer` desde o `window.open`.

Pendencias mantidas:

- Os helpers legados dentro de `src/mocks/userProfile.js` ainda existem como mock de referencia, mas a tela de Perfil e o service principal nao dependem deles para mutacao direta.
- O guard continua estrutural e rapido; testes DOM/E2E completos seguem como pendencia de Sprint 1/2, se Rafael liberar a proxima fase.
- Fonte oficial, timestamp e sincronizacao de disponibilidade continuam sem decisao.

Comandos e resultados desta rodada:

| Comando/validacao | Resultado obtido |
| --- | --- |
| `ReadLints` nos arquivos editados | Sem erros reportados. |
| `npm run qa:repo` | Aprovado com o guard reforcado. |
| `npm run qa:ci` | Aprovado; executou `qa:repo` e `vite build`; build concluiu com 82 modulos transformados. |
| Playwright CLI em `http://127.0.0.1:5176/` | Aprovado em Home busca assistida (`Cortico` -> `/catalogo/b5`), Catalogo (`Vidas Secas`), Perfil/Favoritos e Evento/Calendar (`/eventos/e1`, nova aba Google Calendar com `ctz=America/Sao_Paulo`). |

Veredito atualizado: Sprint 0 consolidada para baseline local/prototipo guiado com ressalvas documentadas. Sprint 1 permanece NO-GO ate Rafael decidir escopo/linguagem do MVP guiado, criterio Go/No-Go e ferramenta/processo de feedback Sofia/Claudia.
