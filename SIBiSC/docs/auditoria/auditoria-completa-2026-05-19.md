# Auditoria Técnica Completa — SIBiSC / Feltrim Agents

**Auditor:** Auditor Sênior Independente (agente automatizado)  
**Data:** 2026-05-19  
**Domínio auditado:** https://sibisc-hub-cultural.vercel.app  
**Repositório:** RaFeltrim/sibisc-hub-cultural  
**Raiz local:** `c:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile\SIBiSC`  
**Metodologia:** Leitura de código-fonte, execução de comandos locais, teste HTTP do domínio público, análise estática de acessibilidade, segurança e dados.

---

## Legenda de classificações

| Sigla | Significado |
|---|---|
| **FATO** | Observado diretamente no código ou saída de comando |
| **INFERÊNCIA** | Conclusão lógica a partir de fatos observados |
| **RECOMENDAÇÃO** | Ação sugerida pelo auditor |
| **P0** | Crítico — bloqueia uso ou apresentação |
| **P1** | Alto — impacta significativamente |
| **P2** | Médio — deve ser corrigido antes de release |
| **P3** | Baixo — melhoria futura |

---

## FASE 1 — MAPEAMENTO INICIAL

### 1.1 Raiz real do repositório

- **FATO:** A raiz do repositório Git está em `c:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile` (nível acima de SIBiSC).
- **FATO:** A pasta `SIBiSC/` é um subprojeto dentro de um monorepo maior que contém também `portfolio/`, `ENTREGA_FINAL_PROF_LINA_2026/`, etc.
- **FATO:** O Vercel é configurado a partir do `vercel.json` na raiz (`Web_Mobile/`), com `outputDirectory: "SIBiSC/dist"` e `buildCommand: "npm run build --prefix SIBiSC"`.

### 1.2 Estrutura de pastas relevante

```
Web_Mobile/
├── .github/
│   ├── workflows/qa-gate.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── feedback_sofia_claudia.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
├── netlify.toml
├── vercel.json          ← Deploy root
└── SIBiSC/
    ├── src/
    │   ├── components/ (cards/, layout/, ui/)
    │   ├── hooks/ (useDebouncedValue.js)
    │   ├── lib/ (supabaseClient.js)
    │   ├── mocks/ (books.js, events.js, news.js, units.js, userProfile.js, homePageMobileData.js)
    │   ├── pages/ (10 páginas)
    │   ├── routes/ (AppRouter.jsx)
    │   ├── services/ (7 serviços)
    │   ├── styles/ (globals.css, tokens.css)
    │   └── utils/ (calendar.js, formatters.js)
    ├── docs/             ← 40+ documentos markdown
    ├── docs_pdfs/        ← Espelhos PDF
    ├── scripts/
    │   ├── qa-guard.mjs  ← Guard de integridade de dados
    │   └── figma_creation_script.js
    ├── supabase/         ← Placeholder (sem schema real)
    ├── _academic_refs/   ← Material acadêmico
    ├── .playwright-cli/  ← Evidências de smoke tests manuais
    ├── test-results/     ← Pasta de resultados (.last-run.json vazio)
    ├── index.html
    ├── package.json
    ├── vercel.json       ← Deploy inner (também configurado)
    ├── vite.config.js
    └── .env.example
```

### 1.3 Stack

| Componente | Versão | Status |
|---|---|---|
| Vite | 8.0.0 | Produção |
| React | 19.2.4 | Produção |
| React Router DOM | 7.13.1 | Produção |
| Supabase JS | 2.99.2 | Preparado / INATIVO em produção |
| @vitejs/plugin-react | 6.0.1 | Dev |
| CSS Modules | (nativo) | Produção |
| Google Fonts | Externo | Produção |

**FATO:** Não há framework de testes (Vitest, Jest, Playwright config) no `package.json`.  
**FATO:** Não há campo `engines` em `package.json` (Node version não especificada).

### 1.4 Scripts npm

| Script | Comando | Resultado |
|---|---|---|
| `dev` | `vite` | Servidor local 5173 |
| `build` | `vite build` | **PASSOU** (735ms, 0 erros) |
| `preview` | `vite preview` | Preview local |
| `qa:repo` | `node ./scripts/qa-guard.mjs` | **PASSOU** |
| `qa:ci` | `qa:repo + build` | **PASSOU** |
| `check` | alias de `qa:ci` | **PASSOU** |
| `npm test` | **NÃO EXISTE** | — |

### 1.5 Rotas configuradas

| Rota | Componente | Rewrite Vercel |
|---|---|---|
| `/` | HomePage | Não necessário (index.html padrão) |
| `/home-mobile` | HomePageMobile | ✅ |
| `/noticias` | NewsPage | ✅ |
| `/noticias/:newsId` | NewsDetailPage | ✅ (apenas n1-n4) |
| `/eventos` | EventsPage | ✅ |
| `/eventos/:eventId` | EventDetailPage | ✅ (apenas e1-e7) |
| `/catalogo` | CatalogPage | ✅ |
| `/catalogo/:bookId` | BookDetailPage | ✅ (apenas b1-b8) |
| `/perfil` | UserProfilePage | ✅ |
| `*` | NotFoundPage | 404 HTTP real no Vercel |

**FATO:** O `vercel.json` usa regex restritivos nos rewrites (ex: `:newsId(n1|n2|n3|n4)`). IDs fora da lista retornam HTTP 404 do Vercel, passando pelo NotFoundPage via React Router.

### 1.6 Git e Branches

| Item | Observação |
|---|---|
| Branch ativa | `main` (up to date com origin/main) |
| Worktree | Limpa (sem staged nem modificados) |
| Untracked | `.playwright-cli/` (ignorado por `.gitignore` raiz) |
| Stash | Nenhum |
| Branches locais | 15+ (dev, hom, prd, test, feature/*, fix/*, release/*) |
| Último commit | `e7f178b docs(sibisc): audit final documentation coverage` |
| Remote | `https://github.com/RaFeltrim/sibisc-hub-cultural.git` |
| GitHub Actions | `.github/workflows/qa-gate.yml` (Node 22, qa:repo + build) |

---

## FASE 2 — ENTENDIMENTO DO PRODUTO

### 2.1 O que o SIBiSC faz

O SIBiSC é um **hub digital para a Rede Municipal de Bibliotecas de São Carlos**, desenvolvido como projeto acadêmico da disciplina SSC0961 (USP). Integra três pilares:

1. **Portal de notícias** — atualizações sobre serviços e vida cultural das bibliotecas
2. **Agenda de eventos** — calendário de atividades com integração Google Calendar
3. **Catálogo com consulta de disponibilidade** — busca por título/autor/ISBN com priorização geográfica por bairro

### 2.2 O que é o Feltrim Agents

O Feltrim Agents é um **assistente guiado por perguntas fixas** que funciona como pseudo-IA de recomendação. Possui 9 perguntas predefinidas com respostas estruturadas que incluem:
- Recomendações de livros com motivo/fonte/limite explicitados
- Referências a eventos e notícias
- Orientação de disponibilidade sem reserva real
- Fallback honesto para "fora do escopo"

**FATO:** Não há chat livre, IA generativa, LLM ou backend de IA. O "assistente" é lógica JavaScript pura sobre dados locais.

### 2.3 O que é real, mockado, demonstrativo ou futuro

| Funcionalidade | Status |
|---|---|
| Catálogo de livros (8 títulos) | **MOCK** — dados hardcoded |
| Disponibilidade por unidade | **MOCK** — números fictícios |
| Notícias (4 itens) | **MOCK** — conteúdo editorial fictício |
| Eventos (7 itens) | **MOCK** — datas hardcoded (março 2026, PASSADAS) |
| Perfil do usuário (João Silva) | **MOCK** — sem autenticação |
| Empréstimos / Histórico / Favoritos | **MOCK** — sem persistência |
| Renovação de empréstimo | **SIMULAÇÃO** — apenas na memória |
| Feltrim Agents | **PROTÓTIPO** — sem backend de IA |
| Supabase | **PREPARADO** — código presente, inativo em produção |
| Reserva de livros | **NÃO EXISTE** — explicitamente comunicado |
| Autenticação | **NÃO EXISTE** — sem login |
| Geolocalização real | **NÃO EXISTE** — bairro selecionado manualmente |
| Integração com SIBI/PHL | **NÃO EXISTE** — futuro |

### 2.4 Promessa de produto vs. comportamento implementado

**ALINHADO:** O README, os documentos de produto e o próprio UI comunicam consistentemente que se trata de protótipo. Os avisos de "mockado", "demonstrativo" e "sem reserva real" aparecem em múltiplos pontos.

**RISCO DE COMUNICAÇÃO:** A landing page possui copy impressionante ("Feltrim Agents ajuda você a encontrar a próxima leitura") que pode ser interpretado como produto funcional por usuários que não leem os avisos de protótipo.

---

## FASE 3 — AUDITORIA FUNCIONAL

### 3.1 Home Desktop (`/`)

| Item | Esperado | Obtido | Severidade |
|---|---|---|---|
| Carregamento inicial | LoadingState + dados em paralelo | ✅ 5 promises em paralelo | OK |
| Hero Feltrim Agents | Texto + console visual | ✅ Bem implementado | OK |
| Busca assistida | Debounce + busca no catálogo | ✅ Debounce 180ms | OK |
| 9 perguntas guiadas | Seleção + resposta com aria-live | ✅ Correto | OK |
| Recomendações | Baseadas em preferências do perfil | ✅ Algoritmo de scoring | OK |
| Aviso de protótipo | Comunicado claramente | ✅ Múltiplos pontos | OK |
| Notícias (3) | Cards linkados | ✅ | OK |
| Eventos (3) | Cards linkados | ✅ | OK |
| Feedback Sofia/Claudia | GitHub Issues + roteiro local | ✅ | OK |
| Estado de erro | ErrorState com mensagem clara | ✅ | OK |

### 3.2 Home Mobile (`/home-mobile`)

| Item | Esperado | Obtido | Severidade |
|---|---|---|---|
| Rota manual | Usuário precisa acessar `/home-mobile` explicitamente | **RISCO:** Não há detecção automática por viewport | P2 |
| Quick Actions | Botões CAT/AGE/NOT | Textos abreviados sem ícones descriptivos no label | P3 |
| Seções de conteúdo | Notícias, Eventos, Livros | ✅ Condicionais `{array.length > 0 &&}` | OK |
| Assistente guiado | 9 perguntas, aria-live | ✅ | OK |
| Feedback | GitHub Issues + roteiro local | ✅ | OK |

**INFERÊNCIA:** O projeto tem duas homes (`/` e `/home-mobile`) mas não há redirecionamento automático baseado em viewport. Um usuário mobile que acessa `/` verá a versão desktop com layout provavelmente incoerente para a tela pequena.

### 3.3 Feltrim Agents / Perguntas Guiadas

| Item | Resultado |
|---|---|
| 9 perguntas | ✅ (qa:guard valida entre 8 e 10) |
| Explicabilidade (motivo/fonte/limite) | ✅ Presente em cada recomendação |
| Referência cruzada catálogo | ✅ IDs canônicos validados |
| Sem reserva real | ✅ Comunicado explicitamente (`sem-reserva-real`) |
| Sem chat livre | ✅ Fallback `fora-do-escopo` honesto |
| aria-live nas respostas | ✅ |

### 3.4 Notícias (`/noticias`, `/noticias/:newsId`)

| Item | Resultado |
|---|---|
| Lista de 4 notícias | ✅ Todas com campos obrigatórios |
| Filtros/categorias | ❌ Não implementado (sem filtro por categoria na lista) |
| Detalhe com parágrafos | ✅ |
| Link de fonte externa | ✅ com `rel="noopener noreferrer"` |
| Datas de março 2026 (PASSADAS) | **RISCO** P1 — contexto temporal desatualizado |

### 3.5 Eventos (`/eventos`, `/eventos/:eventId`)

| Item | Resultado |
|---|---|
| Lista de 7 eventos | ✅ |
| **Datas hardcoded: 20-29 março 2026** | **P1 — TODOS OS EVENTOS JÁ PASSARAM** (auditoria em maio 2026) |
| Detalhe com infoGrid | ✅ |
| Google Calendar | ✅ `noopener,noreferrer` validado no qa:guard |
| calendarStatus aria-live | ✅ |

**FATO:** Os 7 eventos estão datados entre 20 e 29 de março de 2026. Na data desta auditoria (19 de maio de 2026), todos os eventos estão **60+ dias no passado**. Para uma apresentação acadêmica em maio/junho de 2026, isso pode causar confusão.

### 3.6 Catálogo (`/catalogo`, `/catalogo/:bookId`)

| Item | Resultado |
|---|---|
| 8 livros (b1-b8) | ✅ Todos com catálogo completo |
| Busca por título/autor/ISBN | ✅ Debounce 220ms, normalização de texto |
| Filtro por bairro | ✅ 4 bairros (Centro, Vila Prado, Cidade Aracy, Monjolinho) |
| Disponibilidade por unidade | ✅ AvailabilityTable |
| Mock notice visível | ✅ (`<aside aria-label="Aviso...">`) |
| Geolocalização real | ❌ Não implementada (manual apenas) |
| Detalhe: unidade mais próxima | ✅ Algoritmo de distância por bairro |

### 3.7 Perfil (`/perfil`)

| Item | Resultado |
|---|---|
| Aviso de protótipo no topo | ✅ |
| Tabs (Empréstimos/Histórico/Favoritos) | ✅ ARIA correto (role=tablist/tab/tabpanel) |
| Empréstimo atrasado | ✅ `loan-003` com 2 dias de atraso |
| Simulação de renovação | ✅ Claramente "demonstrativa" |
| Jornada do leitor | ✅ Trilhas/selos/metas com publicRanking=false |
| Remoção de favorito | ✅ Funciona em memória |
| Notificação toggle | ✅ (sem backend) |

### 3.8 Rota inexistente / 404

| Item | Resultado |
|---|---|
| HTTP 404 real no Vercel | ✅ Confirmado por Invoke-WebRequest |
| NotFoundPage para rotas desconhecidas | ✅ via React Router `path="*"` |
| IDs fora da whitelist (ex: /noticias/n99) | 404 HTTP real no Vercel ✅ |

---

## FASE 4 — AUDITORIA UX/UI

### 4.1 Hierarquia Visual de Headings

| Página | H1 | H2 | H3 | H4 | Status |
|---|---|---|---|---|---|
| HomePage | "Feltrim Agents ajuda..." | "Perguntas que o Feltrim..." | — | — | ✅ |
| HomePageMobile | "Feltrim Agents" | Títulos de seções | — | — | ✅ |
| NewsPage | "Notícias" (via SectionHeader h1=1) | — | — | — | ✅ |
| NewsDetailPage | Título da notícia | — | — | — | ✅ |
| EventsPage | "Agenda" (h1=1) | — | — | — | ✅ |
| EventDetailPage | Título do evento | — | — | — | ✅ |
| CatalogPage | "Catálogo" (headingLevel=1) | — | — | — | ✅ |
| BookDetailPage | Título do livro | "Disponibilidade por unidade" | — | — | ✅ |
| UserProfilePage | Nome do usuário | Jornada, seções | Trilhas, Selos | Badges, Metas | ✅ |
| NotFoundPage | "Essa rota ainda não existe..." | — | — | — | ✅ (root em `<section>`, não `<main>`) |

**INFERÊNCIA:** A hierarquia de headings é consistente. O `SectionHeader` suporta apenas h1/h2, limitando granularidade em páginas complexas.

### 4.2 Design System

- **Fontes:** Fraunces (display/titulos), Manrope (corpo), Space Mono (mono) — carregadas via Google Fonts externo
- **Paleta:** azul-marinho (`#12263f`), terracota (`#b84f28`), âmbar (`#efb266`), marfim (`#f5efe2`)
- **Tokens CSS:** 18 variáveis de cor, 6 de raio, 3 de sombra, 9 de espaço — bem organizados em `tokens.css`
- **CSS Modules:** Cada componente/página tem seu próprio `.module.css` — sem vazamentos de estilo

### 4.3 Responsividade

- **FATO:** `vite.config.js` abre em `host: '0.0.0.0'` e `port: 5173` mas sem configuração especial de viewport.
- **FATO:** `index.html` tem `<meta name="viewport" content="width=device-width, initial-scale=1.0">` ✅
- **FATO:** `globals.css` tem `main { width: min(100%, var(--content-width)); }` com breakpoint em `900px`
- **INFERÊNCIA:** Layout responsivo funcional mas há duas homes separadas (desktop `/` vs mobile `/home-mobile`) sem redirecionamento automático — o usuário mobile que acessa `/` verá o layout desktop.

### 4.4 Clareza sobre protótipo

- **FATO:** A palavra "protótipo" aparece explicitamente: hero da Home, HomePageMobile, cards de disponibilidade, detalhe de livro, perfil, jornada do leitor, respostas do assistente.
- **FATO:** O aviso `GUIDED_ASSISTANT_LIMIT_NOTICE` aparece em todos os fluxos do assistente.
- **FATO:** `BookDetailPage` tem `<p>Contagem demonstrativa/mockada; confirme disponibilidade real com a biblioteca.</p>` inline.

### 4.5 Consistência Textual

- **FATO:** Português consistente em todos os fluxos auditados.
- **FATO:** Convenção: "demo" e "demonstrativo/a" para dados fictícios, "mock" para dados locais.
- **FATO:** Alguns textos internos em inglês (comentários de código) — não visíveis ao usuário.

### 4.6 Estados Vazios / Erro / Loading

| Estado | Componente | Implementação |
|---|---|---|
| Loading | `LoadingState` | ✅ com label descritivo |
| Erro | `ErrorState` | ✅ com título + mensagem |
| Vazio | `EmptyState` | ✅ com mensagem contextual |
| Status dinâmico | `role="status" aria-live="polite"` | ✅ |

---

## FASE 5 — ACESSIBILIDADE

### 5.1 Elementos Semânticos

| Elemento | Uso | Status |
|---|---|---|
| `<header>` | AppLayout | ✅ |
| `<nav>` | Desktop nav + BottomNav | ✅ com aria-label |
| `<main id="conteudo-principal">` | AppLayout | ✅ com tabIndex=-1 |
| `<footer>` | AppLayout | ✅ com aria-labelledby |
| `<aside>` | Ribbon e mock notices | ✅ |
| `<article>` | BookDetailPage, EventDetailPage, cards | ✅ |
| `<section>` | Seções de conteúdo | ✅ |
| `<section>` (root de NotFoundPage) | Deveria ser `<main>` | ⚠️ P3 |

### 5.2 Skip Link

- **FATO:** `<a className={styles.skipLink} href="#conteudo-principal">Pular para conteúdo principal</a>` implementado em `AppLayout.jsx` linha 27. ✅

### 5.3 ARIA

| Atributo | Uso | Status |
|---|---|---|
| `aria-label` | Navs, ações, seções | ✅ Consistente |
| `aria-live="polite"` | Busca, status, feedback, calendário | ✅ |
| `aria-atomic="true"` | Respostas do assistente | ✅ |
| `aria-pressed` | Guias e filtros de bairro | ✅ |
| `aria-controls` | Botões de guia → seção de resposta | ✅ |
| `role="tablist"` | Navegação de abas do Perfil | ✅ |
| `role="tab"` + `aria-selected` | Abas | ✅ |
| `role="tabpanel"` + `hidden` | Painéis | ✅ |
| `role="progressbar"` + `aria-valuemin/max/now` | ProgressMeter | ✅ |
| `role="note"` | Aviso de protótipo no Perfil | ✅ |
| `role="status"` | Status de ação | ✅ |
| `aria-hidden="true"` | Ícones SVG do BottomNav | ✅ |

### 5.4 Imagens

- **FATO:** Não há elementos `<img>` no código. Capas de livros são `<div>` com cor CSS (`backgroundColor`).
- **FATO:** O avatar do perfil é `<div role="img" aria-label={`Perfil de ${user.name}`}>` ✅
- **FATO:** SVGs inline usam `aria-hidden="true"` quando decorativos e texto visível adjacente ✅

### 5.5 Formulários e Controles

- **FATO:** `SearchField` usa `<label>` com `<span>` visível associado ao `<input type="search">` ✅
- **FATO:** `aria-describedby` apontando para `statusId` quando statusMessage presente ✅
- **FATO:** Checkbox no Perfil (notificações) tem `<label>` explícito ✅
- **FATO:** Botões de filtro (bairro, guias) têm texto visível ✅

### 5.6 Focus e Interação de Teclado

- **FATO:** `globals.css` define `button:focus-visible, a:focus-visible, input:focus-visible { outline: 3px solid var(--color-accent-strong); outline-offset: 3px; }` ✅
- **FATO:** `main tabIndex={-1}` permite foco programático após skip link ✅
- **FATO:** Scroll-to-top implementado em `AppLayout` com respeito a `prefers-reduced-motion` ✅

### 5.7 Motion

- **FATO:** `globals.css` tem `@media (prefers-reduced-motion: reduce)` que anula animações e transições ✅

### 5.8 Contraste (ANÁLISE ESTÁTICA)

**INFERÊNCIA** (análise não instrumentada, sem ferramenta de contraste):

| Combinação | Cor de texto | Cor de fundo | Estimativa |
|---|---|---|---|
| Corpo principal | `#12263f` | `#f5efe2` | Alta chance de AA ✅ |
| Texto suave | `#4b6078` | `#f5efe2` | Risco de falha AA ⚠️ |
| Acento sobre fundo | `#b84f28` | `#f5efe2` | Risco dependendo de tamanho ⚠️ |
| Texto mutado | `#73869c` | `#f5efe2` | Alto risco de falha AA ⚠️ |

**RECOMENDAÇÃO:** Executar auditoria formal de contraste com ferramenta (Colour Contrast Analyser, axe) antes de declarar conformidade WCAG AA.

### 5.9 Tamanho de Alvo de Toque

- **INFERÊNCIA:** Não auditado instrumentalmente. Os botões do BottomNav têm texto + ícone SVG, o que sugere alvos razoáveis. Filtros de bairro (pills) e guias do assistente podem ser menores que 44×44px.
- **RECOMENDAÇÃO:** Validar manualmente em viewport mobile.

### 5.10 Roteiro Manual Pendente (NVDA/Narrator/VoiceOver)

O `go_no_go_final.md` documenta que Sofia foi tratada como leitora de tela real por decisão do Rafael, mas **não houve execução auditiva formal com NVDA, Narrator ou VoiceOver**. Este roteiro permanece como pendência manual:

1. Instalar NVDA (Windows) ou Narrator
2. Abrir `https://sibisc-hub-cultural.vercel.app` no Edge/Chrome
3. Verificar: ordem de leitura, skip link, anúncio de aria-live, navegação por tabs do Perfil, busca assistida
4. Verificar `/home-mobile` com viewport 390×844

---

## FASE 6 — SEGURANÇA E PRIVACIDADE

### 6.1 Headers de Segurança (Verificado ao Vivo)

**FATO — Domínio público retornou HTTP 200 com os seguintes headers:**

| Header | Valor | Status |
|---|---|---|
| `Content-Security-Policy` | `default-src 'self'; object-src 'none'; frame-ancestors 'none'; ...` | ✅ Bem configurado |
| `X-Content-Type-Options` | `nosniff` | ✅ |
| `X-Frame-Options` | `DENY` | ✅ |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` | ✅ |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | ✅ (Vercel padrão) |

**Ausente:** `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy` — risco baixo para SPA estático.

### 6.2 Content Security Policy

- **FATO:** CSP bloqueia `object-src 'none'`, `frame-ancestors 'none'` ✅
- **FATO:** `script-src 'self'` — sem inline scripts ✅
- **FATO:** `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` — `unsafe-inline` necessário para CSS Modules em runtime ⚠️ (aceitável para projeto atual)
- **FATO:** `connect-src 'self' https://*.supabase.co` — preparado para Supabase ✅
- **FATO:** `img-src 'self' data:` — sem hotlink de imagens externas ✅

### 6.3 Links Externos

- **FATO:** GitHub Issues link em `feedbackService.js` tem `rel="noopener noreferrer"` ✅
- **FATO:** Google Calendar (`window.open(url, '_blank', 'noopener,noreferrer')`) ✅ — validado no qa:guard
- **FATO:** Links de fonte em notícias têm `rel="noopener noreferrer"` ✅

### 6.4 Tokens / Variáveis de Ambiente

- **FATO:** `supabaseClient.js` usa `import.meta.env.VITE_SUPABASE_URL` e `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY` ✅
- **FATO:** Nenhum token hardcoded encontrado no código-fonte ✅
- **FATO:** `.env` está no `.gitignore` ✅
- **FATO:** `.env.example` contém apenas placeholders ✅
- **FATO:** Supabase retorna `null` quando variáveis não estão configuradas — o app degrada graciosamente para mocks ✅

### 6.5 Feedback e PII

- **FATO:** GitHub Issues template incluí aviso: "sem dados pessoais sensíveis, tokens, documentos, endereços completos ou prints privados" ✅
- **FATO:** `SOFIA_CLAUDIA_PRIVACY_NOTICE` exibido na UI em dois pontos ✅
- **INFERÊNCIA:** Qualquer dado enviado via GitHub Issues é público. O aviso está presente.

### 6.6 Google Fonts (Privacidade)

- **FATO:** `globals.css` usa `@import url('https://fonts.googleapis.com/...')` — requisição para servidor Google em cada visita
- **INFERÊNCIA:** Para contexto acadêmico/protótipo, aceitável. Para produto real, considerar auto-hospedagem das fontes.

---

## FASE 7 — DADOS, MOCKS E CONTRATOS

### 7.1 IDs Canônicos

| Conjunto | IDs | Validação |
|---|---|---|
| Livros | b1–b8 | ✅ qa:guard valida presença e ausência de extras |
| Eventos | e1–e7 | ✅ vercel.json + qa:guard |
| Notícias | n1–n4 | ✅ vercel.json + qa:guard |
| Unidades | u1–u4 | ✅ inventário referencia apenas u1-u4 |

### 7.2 Consistência entre Mocks

**FATO:** `qa:guard.mjs` valida:
- Recomendações apontam para livros reais do catálogo ✅
- Favoritos têm availableCount/totalCount consistentes com catálogo ✅
- Empréstimos/histórico referenciam livros reais ✅
- Perguntas guiadas referenciam livros, eventos e notícias reais ✅
- Gamificação declara `publicRanking: false` ✅
- Template de feedback tem URL correto ✅

**FATO:** `npm run qa:repo` PASSOU sem falhas.

### 7.3 Disponibilidade Mockada

- **FATO:** Avisos de disponibilidade mockada presentes em: CatalogPage (aside), BookDetailPage (heading + small), guidedAssistantService (limit em cada resposta), HomePageMobile (heroCopy)
- **FATO:** O campo `available > total` é validado pelo qa:guard e não ocorre ✅

### 7.4 Datas dos Eventos

- **FATO CRÍTICO:** Os 7 eventos têm datas de 20-29 de março de 2026. Na data desta auditoria (19 de maio de 2026), todos estão **60+ dias no passado**.
- **RECOMENDAÇÃO:** Atualizar datas para maio/junho de 2026 antes da apresentação.

### 7.5 Gamificação

- **FATO:** `publicRanking: false` em `readerJourney` e em cada badge ✅
- **FATO:** `prototypeNotice` contém "Não há ranking público, pontuação competitiva ou persistência real" ✅
- **FATO:** qa:guard valida ≥3 itens em trails, badges, personalGoals ✅

---

## FASE 8 — DEVOPS / DEPLOY

### 8.1 Configuração de Deploy

| Arquivo | Status |
|---|---|
| `Web_Mobile/vercel.json` | ✅ Correto — raiz do projeto, `outputDirectory: "SIBiSC/dist"` |
| `SIBiSC/vercel.json` | ✅ Inner config redundante mas consistente |
| `Web_Mobile/netlify.toml` | ✅ Configurado como alternativa (redirects individuais por ID) |

**INFERÊNCIA:** Dois `vercel.json` (raiz e SIBiSC/) pode causar confusão. O Vercel usa o da raiz para deploy; o inner é mantido por conveniência local.

### 8.2 GitHub Actions

**FATO:** `.github/workflows/qa-gate.yml` roda em PRs e push para `main`:
- Job `p0-repository-guard`: `npm run qa:repo` ✅
- Job `p1-frontend-build`: `npm run build` + upload de artefato ✅
- Node 22 no CI (vs. sem `engines` no `package.json`) ⚠️

**FATO:** Sem job de deploy automático — deploy no Vercel é integração nativa (webhook Git), não via Actions.

### 8.3 Resultado do Build (Local)

```
vite v8.0.0 building for production...
✓ 84 modules transformed
dist/index.html                   1.00 kB │ gzip:  0.59 kB
dist/assets/index-B4zGOyC8.css   62.13 kB │ gzip: 11.45 kB
dist/assets/index-D06Ib8MQ.js   322.13 kB │ gzip: 97.35 kB
✓ built in 735ms
```

**FATO:** Build sem erros, sem warnings. Bundle JS de 97KB gzip é razoável para SPA com React 19.

### 8.4 Domínio Público

**FATO — Verificado ao vivo (Invoke-WebRequest):**
- `GET https://sibisc-hub-cultural.vercel.app` → **HTTP 200** ✅
- `HEAD https://sibisc-hub-cultural.vercel.app/rota-inexistente-404` → **HTTP 404** ✅
- `X-Vercel-Cache: HIT` — CDN ativo ✅
- Todos os 5 security headers presentes ✅

### 8.5 Ausências Notáveis

- **FATO:** Sem campo `engines` em `package.json` → risco de warning Vercel sobre Node version
- **FATO:** Sem lighthouse CI automatizado
- **FATO:** Sem deploy preview automático documentado no processo
- **FATO:** `dist/` na pasta local (gerado localmente) — ignorado pelo `.gitignore` raiz ✅

---

## FASE 9 — TESTES AUTOMATIZADOS E EVIDÊNCIAS

### 9.1 Frameworks de Teste

**FATO:** Não existe nenhum dos seguintes no projeto:
- `vitest.config.js`
- `jest.config.js`
- `playwright.config.js`
- Pasta `tests/` ou `e2e/`
- `npm test` script

**FATO:** A pasta `test-results/` contém apenas `.last-run.json` sem conteúdo de teste.

### 9.2 QA Guard (qa-guard.mjs)

**FATO:** O único teste automatizado é o `scripts/qa-guard.mjs`, que valida:
- Existência de arquivos obrigatórios
- Consistência de IDs canônicos entre mocks
- Campos obrigatórios em cada entidade (livro, evento, notícia)
- Disponibilidade coerente (available ≤ total)
- Conformidade de URL de feedback e template GitHub
- Conformidade de gamificação (publicRanking=false)
- Perguntas guiadas com motivo/fonte/limite

**FATO:** `npm run qa:repo` PASSOU sem falhas. **Este é um guard de integridade de dados, não um teste E2E.**

### 9.3 Evidências Manuais

**FATO:** Pasta `.playwright-cli/` contém 230+ arquivos `.yml` de snapshots e `.log` de console — evidência de smoke tests manuais executados com Playwright no dia 2026-05-19.

**FATO:** `docs/qa/` contém:
- Screenshots (sprint2, sprint3)
- Relatórios Lighthouse para 6 rotas (sprint3)
- Relatório de acessibilidade
- Validação de leitor de tela
- Casos de teste funcional
- Teste manual de segurança

### 9.4 Resultado da Execução

| Comando | Resultado |
|---|---|
| `npm run build` | ✅ PASSOU — 0 erros |
| `npm run qa:repo` | ✅ PASSOU — 0 falhas |
| `npm run qa:ci` | ✅ PASSOU — (qa:repo + build) |
| `npm test` | ❌ NÃO EXISTE |
| Playwright E2E formal | ❌ NÃO CONFIGURADO |
| Vitest unit | ❌ NÃO CONFIGURADO |

---

## FASE 10 — GIT, BRANCHES E MANUTENÇÃO

### 10.1 Estado do Worktree

```
On branch main
Your branch is up to date with 'origin/main'.
Untracked files: ../.playwright-cli/
nothing added to commit but untracked files present
```

**FATO:** Worktree limpa. Nenhum arquivo modificado ou staged. ✅

### 10.2 Branches

| Branch | Tipo | Status |
|---|---|---|
| `main` | Principal | Ativo, protegido |
| `dev` | Desenvolvimento | Remoto |
| `hom` | Homologação | Remoto |
| `prd` | Produção | Remoto |
| `test` | Testes | Local + Remoto |
| `feature/sibisc-guided-assistant-sprint1` | Sprint 1 | Mergeada |
| `feature/sibisc-feedback-gamification-sprint2` | Sprint 2 | Mergeada |
| `fix/sibisc-deploy-404` | Fix | Mergeada |
| `fix/sibisc-final-a11y-security-polish` | Fix | Mergeada |
| `fix/sibisc-final-closure` | Fix | Mergeada |
| `fix/sibisc-visual-regressions` | Fix | Mergeada |
| `release/sibisc-hardening-sprint3` | Sprint 3 | Mergeada |
| `codex/figma-web-handoff` | Codex | Remoto |
| `feat/T-ACV-003-browser-geolocation` | Feature futura | Local |
| `feat/T-NOT-002-news-origin` | Feature futura | Local + Remoto |

**OBSERVAÇÃO:** Branches `hom`, `prd`, `test` sugerem pipeline de ambientes, mas sem evidência de deploy automatizado para esses ambientes.

### 10.3 Commits Recentes

Os últimos 20 commits seguem convenção `tipo(escopo): descrição` (Conventional Commits) com escopos `sibisc`, `qa`, `docs`, `fix`, `feat` — padrão bem seguido.

### 10.4 Artefatos Locais

| Item | Status |
|---|---|
| `node_modules/` | Presente (ignorado pelo .gitignore) ✅ |
| `dist/` | Presente localmente (ignorado) ✅ |
| `.env` | Ausente (bom — sem credenciais reais) ✅ |
| `.playwright-cli/` | Presente (ignorado pelo .gitignore raiz) ✅ |
| Submódulos | Nenhum ✅ |

---

## FASE 11 — DOCUMENTAÇÃO

### 11.1 Inventário de Documentos

| Área | Documentos | Status |
|---|---|---|
| **Produto** | epicos_e_user_stories, criterios_de_aceite, mvp_e_releases, personas, go_no_go_final_pos_fechamento, feltrim_agents_analise_completa_e_backlog | ✅ Abrangentes |
| **Arquitetura** | arquitetura_visao_geral, integracoes, integrated_system_blueprint | ✅ |
| **Backend** | apis_e_contratos, jobs_e_sincronizacao, observabilidade_e_erros | ✅ (Futuro/aspiracional) |
| **Dados** | modelo_de_dados, dicionario_de_dados, migrations_e_rls | ✅ (Futuro) |
| **DevOps** | ambientes_e_variaveis, deploy_e_rollback, pipeline_ci_cd | ✅ |
| **Frontend** | design_system, fluxos_e_telas, handoff_figma_lovable, mobile_first | ✅ |
| **Governança** | fluxo_de_branches_e_commits, padrao_documental, feedbacks/ | ✅ |
| **Management** | sprints/, atas, planos, roadmap, riscos | ✅ |
| **Onboarding** | como_rodar, como_contribuir, glossario, guia_stack_facil | ✅ |
| **QA** | casos_de_teste_funcional, estrategia_shift_left, relatorio_acessibilidade, validacoes | ✅ |

### 11.2 Avaliação da Documentação

| Documento | Qualidade |
|---|---|
| README.md | ✅ Claro, bem estruturado |
| docs/INDEX.md | ✅ Índice mestre presente |
| go_no_go_final_pos_fechamento.md | ✅ Honesto, atualizado, com ressalvas |
| casos_de_teste_funcional.md | ✅ Existente |
| relatorio_acessibilidade.md | ✅ Existente (validação pendente manual) |
| deploy_e_rollback.md | ✅ Existente |
| pipeline_ci_cd.md | ✅ Existente |

### 11.3 Documentos Ausentes ou Incompletos

| Ausência | Impacto |
|---|---|
| Testes E2E automatizados documentados | P2 — Playwright config ausente |
| Guia de atualização de datas dos mocks | P1 — Eventos passados sem processo de atualização |
| Changelog de produto (user-facing) | P3 |
| Documentação de acessibilidade com resultados formais | P2 |

---

## FASE 12 — RELATÓRIO FINAL

### 1. Sumário Executivo

O SIBiSC/Feltrim Agents é um protótipo acadêmico de alta qualidade técnica para a disciplina SSC0961 da USP. O projeto demonstra maturidade de engenharia incomum para contexto acadêmico: pipeline CI/CD funcional, guard de integridade de dados (qa-guard.mjs), headers de segurança completos, hierarquia ARIA correta, tokens CSS organizados e documentação extensiva (40+ documentos).

O principal risco operacional para a apresentação é a **datação passada de todos os eventos** (março 2026, 60+ dias atrás). Além disso, a ausência de testes automatizados formais (E2E/unit) e a falta de conformidade formal de contraste WCAG impede a declaração de qualidade "sem ressalvas".

O veredito interno do projeto (`go_no_go_final.md`) é alinhado com esta auditoria: **GO para apresentação como protótipo acadêmico, NO-GO para produto operacional**.

---

### 2. Veredito Geral

| Categoria | Veredito | Justificativa |
|---|---|---|
| **GO para Apresentação Pública?** | ✅ **GO com ressalvas** | Funciona corretamente, bem comunicado como protótipo. Atualizar datas dos eventos antes. |
| **GO para Uso Acadêmico?** | ✅ **GO** | Atende requisitos da disciplina. Documentação extensiva. |
| **GO para Produto Operacional?** | ❌ **NO-GO** | Sem backend, reserva real, autenticação, persistência, integração oficial. |
| **GO para WCAG AA Formal?** | ❌ **NO-GO** | Sem medição formal de contraste. Sem teste auditivo com NVDA/Narrator. |

---

### 3. Matriz de Achados

| ID | Área | Achado | Severidade | Tipo | Arquivo/Rota | Ação |
|---|---|---|---|---|---|---|
| A-001 | Dados/Funcional | Todos os 7 eventos têm datas de março 2026 — 60+ dias passados na data da apresentação | **P1** | FATO | `src/mocks/events.js` | Atualizar datas para maio/junho 2026 |
| A-002 | Deploy | Sem campo `engines` no `package.json` — CI usa Node 22 mas package não especifica | **P2** | FATO | `package.json` | Adicionar `"engines": { "node": ">=22" }` |
| A-003 | UX/UI | `/home-mobile` não é acessada automaticamente por viewport mobile — usuário mobile em `/` vê layout desktop | **P2** | INFERÊNCIA | `src/routes/AppRouter.jsx` | Adicionar redirect por media query ou useMediaQuery |
| A-004 | Testes | Sem framework de testes automatizados (Vitest/Jest/Playwright) | **P2** | FATO | `package.json`, projeto | Configurar Vitest para testes unitários de serviços |
| A-005 | Acessibilidade | Contraste não medido formalmente — tokens `--color-ink-soft` (#4b6078) e `--color-ink-muted` (#73869c) sobre `--color-paper` (#f5efe2) podem falhar WCAG AA | **P2** | INFERÊNCIA | `src/styles/tokens.css` | Executar auditoria com Colour Contrast Analyser |
| A-006 | Acessibilidade | Sem teste formal com leitor de tela (NVDA/Narrator/VoiceOver) | **P2** | FATO | `docs/qa/go_no_go_final_pos_fechamento.md` | Executar roteiro manual com NVDA no Edge |
| A-007 | UX/UI | Quick Actions da Home Mobile usam textos "CAT", "AGE", "NOT" — pouco descritivos | **P3** | FATO | `src/pages/HomePageMobile.jsx` linha 296-307 | Substituir por rótulos completos |
| A-008 | Acessibilidade | `NotFoundPage` usa `<section>` como root em vez de `<main>` | **P3** | FATO | `src/pages/NotFoundPage.jsx` linha 6 | Mudar para `<main>` ou garantir que `AppLayout` provê o main |
| A-009 | Segurança | Google Fonts via `@import` envia requisições ao Google em cada visita | **P3** | FATO | `src/styles/globals.css` linha 1 | Para prod real: auto-hospedar fontes |
| A-010 | DevOps | `dist/` gerado localmente existe na pasta mas não está no repo — risco de confusão para novos colaboradores | **P3** | INFERÊNCIA | `SIBiSC/.gitignore` | Documentar no onboarding que dist/ é gerado pelo build |
| A-011 | Deploy | Dois `vercel.json` existentes (raiz e SIBiSC/) com configuração duplicada | **P3** | FATO | `Web_Mobile/vercel.json`, `SIBiSC/vercel.json` | Documentar qual é o autoritativo |
| A-012 | Dados | Datas das 4 notícias também em março 2026 — contexto temporal desatualizado | **P3** | FATO | `src/mocks/news.js` | Atualizar datas para maio 2026 |
| A-013 | UX/UI | `SectionHeader` suporta apenas `h1` ou `h2` — sem `h3+` para páginas com hierarquia mais profunda | **P3** | FATO | `src/components/ui/SectionHeader.jsx` linha 5 | Aceitar `headingLevel` arbitrário |
| A-014 | Performance | Google Fonts carregadas via `@import` sem `<link rel="preconnect">` no HTML head | **P3** | FATO | `index.html`, `src/styles/globals.css` | Adicionar preconnect no index.html |
| A-015 | Funcional | Notícias sem filtro por categoria na lista `/noticias` — cards têm categoria mas sem filtro UI | **P3** | FATO | `src/pages/NewsPage.jsx` | Adicionar FilterPills ou aceitar como limitação do protótipo |

---

### 4. Matriz por Área

#### Produto
- **PONTOS FORTES:** Proposta de valor clara e hiperlocal. Comunicação honesta de protótipo em múltiplos pontos. Feltrim Agents com 9 perguntas fixas e explicabilidade total.
- **GAPS:** Dados temporais desatualizados (eventos passados). A diferença entre "assistente guiado" e "IA real" pode não ser óbvia para usuários finais sem leitura cuidadosa dos avisos.

#### Funcional
- **PONTOS FORTES:** Todas as rotas funcionando. Estados de loading/error/empty em cada fluxo. Busca com debounce. Google Calendar integrado.
- **GAPS:** Eventos de março 2026 passados (P1). Home mobile sem redirecionamento automático (P2). Filtro de notícias ausente (P3).

#### UX/UI
- **PONTOS FORTES:** Design coeso e elegante. Paleta consistente. Tokens CSS bem organizados. Avisos de protótipo claros.
- **GAPS:** Quick Actions abreviadas (P3). Duas homes sem transição automática (P2).

#### Acessibilidade
- **PONTOS FORTES:** Skip link, aria-live, role=tablist/tab/tabpanel, aria-pressed, progressbar, prefers-reduced-motion, focus-visible, elementos semânticos.
- **GAPS:** Contraste não medido formalmente (P2). Sem teste auditivo real (P2). NotFoundPage usa section como root (P3).

#### Segurança
- **PONTOS FORTES:** CSP completa, HSTS, X-Frame-Options DENY, Permissions-Policy restritivo, sem tokens hardcoded, rel=noopener noreferrer nos links externos, aviso de PII no feedback.
- **GAPS:** Google Fonts externo (P3 — aceitável).

#### Dados
- **PONTOS FORTES:** qa-guard.mjs com validação extensiva, todos os IDs canônicos consistentes, disponibilidade coerente, gamificação sem ranking público.
- **GAPS:** Datas de março 2026 em eventos e notícias (P1/P3).

#### Deploy
- **PONTOS FORTES:** vercel.json correto, GitHub Actions com qa:repo + build, build 735ms sem erros, HTTP 200 no domínio, HTTP 404 para rotas inexistentes, todos os security headers presentes.
- **GAPS:** Sem campo `engines` (P2). Dois vercel.json (P3). Sem job de lighthouse CI.

#### QA
- **PONTOS FORTES:** qa-guard.mjs (guard de dados), npm run qa:ci (build + guard), screenshots e Lighthouse nos docs, smoke tests manuais evidenciados.
- **GAPS:** Sem framework de testes automatizados (P2). Sem E2E formal.

#### Documentação
- **PONTOS FORTES:** 40+ documentos, INDEX.md, onboarding claro, go_no_go honesto, PDFs espelhados.
- **GAPS:** Processo de atualização de datas dos mocks não documentado. Resultados formais de contraste ausentes.

#### Git/Manutenção
- **PONTOS FORTES:** Worktree limpa, commits convencionais, branches organizadas, .gitignore adequado.
- **GAPS:** `feat/T-ACV-003-browser-geolocation` branch local sem PR — feature não implementada (geolocalização real).

---

### 5. Evidências

| ID Achado | Arquivo | Linha | Evidência |
|---|---|---|---|
| A-001 | `src/mocks/events.js` | 5-99 | `date: '2026-03-20'` a `date: '2026-03-29'` |
| A-002 | `package.json` | 1-27 | Ausência de chave `engines` |
| A-003 | `src/routes/AppRouter.jsx` | 18-30 | `/home-mobile` é rota fixa, sem redirect por viewport |
| A-004 | `package.json` | scripts | Sem `test` script |
| A-005 | `src/styles/tokens.css` | 9-10 | `--color-ink-soft: #4b6078` e `--color-ink-muted: #73869c` |
| A-006 | `docs/product/go_no_go_final_pos_fechamento.md` | 20 | "Ainda não houve medição formal/manual completa de contraste nem auditoria auditiva dedicada com NVDA, Narrator ou VoiceOver." |
| A-007 | `src/pages/HomePageMobile.jsx` | 296-307 | `<span className={styles.actionIcon} aria-hidden="true">CAT</span>` |
| A-008 | `src/pages/NotFoundPage.jsx` | 6 | `<section className={styles.page}>` sem role ou semântica de landmark |
| A-009 | `src/styles/globals.css` | 1 | `@import url('https://fonts.googleapis.com/...')` |
| A-011 | `Web_Mobile/vercel.json` + `SIBiSC/vercel.json` | — | Configuração duplicada em ambos |
| A-012 | `src/mocks/news.js` | 5-61 | Datas `2026-03-03` a `2026-03-15` |
| A-014 | `index.html` | 1-21 | Sem `<link rel="preconnect" href="https://fonts.googleapis.com">` |

**Build output verificado:**
```
✓ built in 735ms — 0 erros, 0 warnings
npm run qa:repo → "QA repository guard passou: estrutura minima, docs, rotas criticas e IDs canonicos estao consistentes."
HTTP 200 para https://sibisc-hub-cultural.vercel.app
HTTP 404 para https://sibisc-hub-cultural.vercel.app/rota-inexistente-404
```

---

### 6. Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Confusão usuário: "Feltrim Agents tem IA real?" | Média | Alto (apresentação) | Reforçar verbalmente na apresentação; avisos na UI já existem |
| Eventos passados geram questionamento na apresentação | Alta | Médio | Atualizar datas antes da apresentação |
| Contraste insuficiente para usuários com baixa visão | Média | Médio | Executar auditoria formal antes de declarar acessibilidade |
| Supabase configurado mas inativo pode causar confusão técnica | Baixa | Baixo | `isSupabaseConfigured = false` degrada graciosamente |
| Usuário mobile acessa `/` e vê layout desktop | Média | Médio | Rota manual `/home-mobile` é conhecida; documentar |
| .playwright-cli/ acumulando arquivos (230+) | Baixa | Baixo | Ignorado pelo .gitignore |

---

### 7. Recomendações

**ANTES DA APRESENTAÇÃO (P1):**
1. Atualizar `src/mocks/events.js` com datas de maio/junho 2026
2. (Opcional) Atualizar `src/mocks/news.js` com datas de abril/maio 2026

**PRÓXIMA SPRINT (P2):**
3. Adicionar `"engines": { "node": ">=22" }` ao `package.json`
4. Configurar Vitest para testes unitários mínimos dos services (catalogService, guidedAssistantService)
5. Executar auditoria formal de contraste com Colour Contrast Analyser ou axe
6. Executar roteiro manual com NVDA/Narrator no Edge
7. Implementar redirecionamento automático `/home-mobile` para viewport < 768px

**MELHORIA FUTURA (P3):**
8. Adicionar `<link rel="preconnect">` para Google Fonts no `index.html`
9. Corrigir Quick Actions da Home Mobile (textos completos vs "CAT"/"AGE"/"NOT")
10. Mudar `<section>` para `<main>` na NotFoundPage
11. Aceitar headingLevel arbitrário no SectionHeader
12. Documentar qual `vercel.json` é autoritativo

---

### 8. Próxima Sprint Sugerida

**Sprint 5 — Polimento Pré-Apresentação (estimativa: 2-4 horas)**

| Task | Responsável | Estimativa | Prioridade |
|---|---|---|---|
| Atualizar datas dos eventos para maio/junho 2026 | Dev | 15min | P1 |
| Atualizar datas das notícias para abril/maio 2026 | Dev | 10min | P3 |
| Adicionar `engines` ao package.json | Dev | 5min | P2 |
| Executar auditoria de contraste (Colour Contrast Analyser) | QA | 1h | P2 |
| Executar roteiro NVDA/Narrator | QA | 1h | P2 |
| Configurar Vitest básico (3 testes de catalogService) | Dev | 2h | P2 |
| Preconnect Google Fonts no index.html | Dev | 5min | P3 |

---

### 9. Checklist de Manutenção

Para cada ciclo de manutenção, verificar:

- [ ] `npm run qa:ci` passa sem falhas
- [ ] Datas dos mocks (`events.js`, `news.js`) estão no futuro ou contexto correto
- [ ] Domínio público retorna 200 em `https://sibisc-hub-cultural.vercel.app`
- [ ] Domínio público retorna 404 para rota inválida
- [ ] Nenhum token real em `.env` commitado
- [ ] Branch `main` up to date com remote
- [ ] Branches de feature mergeadas e deletadas após PR

---

### 10. Decisões que Exigem Rafael

1. **Atualizar datas dos eventos** — decisão simples, mas exige confirmação de quais datas usar
2. **Redirecionamento mobile automático** — implementar ou documentar a rota manual como decisão de UX
3. **Testar com NVDA/Narrator** — exige máquina com Windows e leitor de tela instalado
4. **Adicionar Vitest** — decidir se entra no escopo acadêmico ou fica para próxima versão
5. **Google Fonts vs. auto-hospedagem** — para produto real, exige decisão de privacidade
6. **Canal definitivo de feedback** para audiência não técnica sem GitHub

---

## RESPOSTA FINAL

### 1. "O projeto está pronto para quê?"

**O projeto está pronto para apresentação acadêmica controlada como protótipo demonstrativo.** Funciona corretamente, tem UI coerente, comunicação honesta dos limites, pipeline CI/CD operacional, deploy no Vercel com security headers completos. Com a atualização das datas dos eventos (15 minutos de trabalho), está pronto para ser apresentado sem surpresas técnicas.

**Não está pronto para:** produto operacional, uso real por usuários externos, declaração de conformidade WCAG AA, integração com sistema real de bibliotecas.

### 2. "O que ainda impede release sem ressalvas?"

- **P1:** Eventos com datas de março 2026 (passadas) — solução trivial, 15 minutos
- **P2:** Ausência de testes automatizados unitários/E2E
- **P2:** Contraste WCAG AA não medido formalmente
- **P2:** Sem teste auditivo com NVDA/Narrator/VoiceOver
- **Estrutural:** Sem backend real, sem reserva, sem autenticação — inerente ao escopo acadêmico

### 3. "O que um novo mantenedor precisa saber nos primeiros 30 minutos?"

1. **Monorepo:** O projeto Git está em `Web_Mobile/`, o código React em `SIBiSC/`. O deploy parte da raiz.
2. **100% mock:** Nenhum dado é persistido. O Supabase está configurado mas inativo — `supabaseClient.js` retorna `null` se as env vars não estiverem presentes. Tudo funciona com mocks locais.
3. **qa:ci é o gatekeeper:** Antes de qualquer PR, rode `npm run qa:ci` dentro de `SIBiSC/`. Se passar, o código está íntegro.
4. **Feltrim Agents não é IA:** São 9 respostas fixas em `guidedAssistantService.js`. Nenhuma chamada de API externa.
5. **Datas dos mocks estão congeladas:** `events.js` e `news.js` têm datas de março 2026. Se apresentar em outra data, atualize.
6. **O deploy é automático:** Qualquer push para `main` desencadeia o Vercel (via integração Git). O GitHub Actions (`qa-gate.yml`) roda qa:repo + build como gate de PR.
7. **Documentação é extensiva:** Comece por `docs/INDEX.md`. Tudo que precisar saber sobre o projeto está em `docs/`.

---

*Auditoria gerada em 2026-05-19 por auditor sênior independente automatizado.*  
*Evidências locais e ao vivo verificadas. Todos os fatos são rastreáveis ao código-fonte ou saída de comando.*
