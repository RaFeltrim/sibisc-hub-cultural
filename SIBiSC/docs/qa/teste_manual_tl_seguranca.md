# Teste manual TL + Security - SIBiSC/Feltrim Agents

## Sumario executivo

- **Produto:** SIBiSC / Feltrim Agents.
- **Ambiente publico:** `https://sibisc-hub-cultural.vercel.app`.
- **Repo local de apoio:** `C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile\SIBiSC`.
- **Data da execucao:** 19/05/2026.
- **Papel:** Tech Lead + Security Engineer senior.
- **Metodo:** teste manual real com navegador Chromium via Playwright, verificacao de console/rede, links, rotas SPA, headers, fluxos visiveis e guards locais.
- **Alteracao de codigo:** nenhuma. Foi criado apenas este relatorio.
- **Veredito tecnico:** **aprovado com ressalvas importantes**.

Nao encontrei erro critico de runtime, quebra de rota principal, exposicao obvia de segredo client-side, uso perigoso de `localStorage/sessionStorage`, DOM XSS evidente ou promessa explicita de IA/backend real no Feltrim Agents. Os fluxos principais carregam e os guards locais passaram.

A ressalva de maior prioridade e de produto/robustez: a rota direta de catalogo e o detalhe de livro ainda mostram disponibilidade como se fosse operacional em producao publica, sem aviso suficientemente claro de mock naquele fluxo. Isso viola o contrato de "disponibilidade claramente mockada" para usuarios que chegam direto ao catalogo, sem passar pelo assistente.

## Veredito por prioridade

### P0

Nenhum P0 encontrado.

### P1

#### TLSEC-001 - Catalogo e detalhe de livro nao deixam disponibilidade claramente mockada

- **Severidade:** Alta.
- **Area:** Produto, robustez tecnica e promessa publica.
- **Rotas:** `/catalogo`, `/catalogo/b1`.
- **Evidencia de navegador:** Playwright retornou `catalog.hasMockOrPrototypeNotice: false` e `bookDetail.textHasMock: false`.
- **Evidencia visual/textual:** `/catalogo` exibe `7 exemplares disponiveis`, `5 exemplares disponiveis`, etc.; `/catalogo/b1` exibe `3 exemplares disponiveis` e `Disponibilidade por unidade`, sem disclaimer visivel suficiente no fluxo testado em producao.
- **Impacto:** usuario pode interpretar a disponibilidade como inventario real da biblioteca e se deslocar ou tomar decisao operacional com base em dado mockado.
- **Recomendacao:** adicionar aviso persistente e proximo da disponibilidade em lista e detalhe, por exemplo: "Disponibilidade demonstrativa/mockada do prototipo; confirme com a biblioteca antes de se deslocar." O aviso deve aparecer no catalogo, no detalhe e nas tabelas por unidade, nao apenas no Feltrim Agents.

### P2

#### TLSEC-002 - Headers de seguranca basicos estao incompletos em producao

- **Severidade:** Media.
- **Area:** Security hardening.
- **Evidencia:** `curl.exe -I` em `/`, `/catalogo/b1` e rota inexistente retornou `Strict-Transport-Security`, mas nao retornou `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` ou `Permissions-Policy`.
- **Evidencia adicional:** respostas incluem `Access-Control-Allow-Origin: *` em HTML estatico.
- **Impacto:** aumenta exposicao a clickjacking, MIME sniffing, vazamento de referrer e reduz defesa em profundidade contra XSS, mesmo em SPA estatica.
- **Recomendacao:** configurar headers no `vercel.json`/edge. Prioridade minima: `Content-Security-Policy` com `frame-ancestors 'none'` ou origem permitida, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy` restritiva.

#### TLSEC-003 - Rota inexistente retorna HTTP 200, apesar de UI 404

- **Severidade:** Media.
- **Area:** Observabilidade, SEO e semantica HTTP.
- **Evidencia:** `curl.exe -I https://sibisc-hub-cultural.vercel.app/__qa_rota_inexistente_404__` retornou `HTTP/1.1 200 OK`.
- **Evidencia de UI:** Playwright confirmou tela com `404` e `Essa rota ainda nao existe no mapa do SIBiSC.`
- **Causa provavel:** rewrite SPA global para `/index.html` em `vercel.json`.
- **Impacto:** monitores, crawlers e ferramentas de QA podem considerar URLs inexistentes como sucesso. Isso mascara links quebrados e reduz qualidade de relatorios.
- **Recomendacao:** se viavel no contexto Vercel/SPAs, manter fallback de SPA para rotas validas e tratar rotas desconhecidas com status 404 via edge/function, ou documentar explicitamente a limitacao.

#### TLSEC-004 - Acao `Renovar` no Perfil confirma renovacao sem reforcar que e mock

- **Severidade:** Media.
- **Area:** Fluxo critico de usuario e promessa operacional.
- **Rota:** `/perfil`.
- **Evidencia:** apos clicar `Renovar`, status exibido: `Emprestimo renovado: O Cortico. Confira a nova data de devolucao.`
- **Contexto:** o Perfil tem avisos de jornada demonstrativa, mas a microcopia da acao de renovacao parece operacional.
- **Impacto:** pode sugerir renovacao real de emprestimo, especialmente para usuario que acessa direto o Perfil.
- **Recomendacao:** trocar para linguagem explicita: `Renovacao demonstrativa aplicada apenas ao perfil mockado deste prototipo.`

### P3

#### TLSEC-005 - Link externo de noticia usa `rel="noreferrer"` sem `noopener` explicito

- **Severidade:** Baixa.
- **Area:** Consistencia de links externos.
- **Rota:** `/noticias/n1`.
- **Evidencia:** Playwright encontrou link externo para `https://www.saocarlos.sp.gov.br/` com `target="_blank"` e `rel="noreferrer"`.
- **Nota:** `noreferrer` normalmente implica `noopener` em navegadores modernos, entao o risco pratico e baixo.
- **Recomendacao:** padronizar como `rel="noopener noreferrer"` para consistencia com o CTA do GitHub Issues e clareza de revisao.

## Evidencias positivas

### Runtime, console e rede

- Playwright percorreu `/`, `/home-mobile`, `/catalogo`, `/catalogo/b1`, `/eventos`, `/eventos/e1`, `/perfil`, `/noticias`, `/noticias/n1` e rota inexistente.
- `consoleEvents: []`.
- `failedRequests: []`.
- `httpErrors: []`.
- Paginas principais responderam `200` e renderizaram conteudo esperado.

### Guards locais

Comandos executados em `SIBiSC`:

```bash
npm run qa:repo
npm run qa:ci
```

Resultado:

- `qa:repo` passou: estrutura minima, docs, rotas criticas e IDs canonicos consistentes.
- `qa:ci` passou: `qa:repo` + `vite build`.
- Build gerado com sucesso: `dist/index.html`, CSS e JS de producao.

### Feltrim Agents

- Home desktop e mobile deixam claro que o assistente e um prototipo com dados locais.
- Perguntas guiadas testadas: `Disponibilidade`, `Reserva e renovacao`, `Fora do escopo`.
- A resposta de reserva diz que o Feltrim Agents nao executa reserva, pre-reserva, renovacao oficial ou contato com SIBI/PHL.
- A resposta fora de escopo diz que nao ha chat aberto, IA generativa, catalogo oficial em tempo real ou integracao com atendimento.
- O texto da Home reforca: `Nao ha backend de IA ou reserva real nesta previa.`

### Feedback Sofia/Claudia e privacidade

- CTA do GitHub Issues em Home desktop:
  - URL: `https://github.com/RaFeltrim/sibisc-hub-cultural/issues/new?template=feedback_sofia_claudia.md&labels=feedback%2Cqa&title=%5BFEEDBACK%5D%20SIBiSC%3A%20`
  - `target="_blank"`.
  - `rel="noopener noreferrer"`.
- Aviso de privacidade presente: `Nao envie dados pessoais sensiveis, tokens, documentos, enderecos completos ou prints com informacoes privadas.`
- O app nao coleta feedback diretamente; delega para GitHub Issues.

### Links externos

- GitHub Issues abre com template esperado.
- Google Calendar abriu popup real para Google/Calendar. A URL capturada continha `calendar.google.com/.../eventedit` e detalhes do evento.
- O detalhe do Calendar inclui alerta de prototipo: `Evento SIBiSC em prototipo. Confirme inscricao e disponibilidade com a biblioteca.`
- Link externo de noticia aponta para `https://www.saocarlos.sp.gov.br/`.

### Jornada do leitor

- `/perfil` exibe aviso: `Jornada demonstrativa calculada com mocks locais de perfil, historico e favoritos. Nao ha ranking publico, pontuacao competitiva ou persistencia real nesta versao.`
- Playwright confirmou `hasRankingDenial: true` e `hasPersistenceDenial: true`.
- Abas do perfil funcionam: emprestimos, historico e favoritos.
- Remocao de favorito e notificacao operam apenas no estado mockado da sessao.

### Rotas SPA e reload direto

Rotas internas carregaram diretamente por URL:

- `/catalogo`
- `/catalogo/b1`
- `/eventos`
- `/eventos/e1`
- `/noticias`
- `/noticias/n1`
- `/perfil`
- `/home-mobile`

Rotas invalidas exibem UI de erro controlada:

- `/__qa_rota_inexistente_404__` mostra `404` e mensagem de rota inexistente.

## Checklist tecnico executado

| Item | Resultado |
| --- | --- |
| Console sem erros criticos | Aprovado |
| Network sem 4xx/5xx nos fluxos testados | Aprovado |
| Build local | Aprovado |
| `qa:repo` | Aprovado |
| `qa:ci` | Aprovado |
| Links internos principais | Aprovado |
| GitHub Issues | Aprovado |
| Google Calendar | Aprovado |
| Feltrim Agents sem promessa de IA/backend real | Aprovado |
| Feltrim Agents sem promessa de reserva real | Aprovado |
| Feedback sem incentivo a dados sensiveis | Aprovado |
| Jornada sem ranking publico/persistencia real prometida | Aprovado |
| Disponibilidade claramente mockada em todos os fluxos | Falhou em catalogo/detalhe |
| Headers basicos de seguranca | Parcial |
| 404 HTTP real em producao | Parcial/falhou semanticamente |

## Observacoes de seguranca de codigo

- Busca por padroes perigosos nao encontrou uso ativo de `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, `localStorage`, `sessionStorage`, `postMessage` ou service worker no escopo `src`.
- `supabaseClient.js` usa `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`, com `persistSession: false`.
- `.env.example` contem placeholders, nao segredo real.
- Nao foram observadas chamadas `fetch`/API reais nos fluxos principais; services usados sao locais/mockados.

## Recomendacoes priorizadas

1. Corrigir TLSEC-001 antes de nova comunicacao publica: aviso de disponibilidade mockada deve estar junto de todo numero de estoque.
2. Ajustar microcopia da renovacao no Perfil para nao parecer renovacao operacional.
3. Adicionar headers de seguranca no deploy Vercel.
4. Decidir se a semantica HTTP 404 sera implementada ou documentada como limitacao consciente do fallback SPA.
5. Padronizar links externos com `noopener noreferrer`.
