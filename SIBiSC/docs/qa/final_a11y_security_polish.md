# Polimento final de acessibilidade, headers e 404 - SIBiSC/Feltrim Agents

Data: 2026-05-19  
Branch: `fix/sibisc-final-a11y-security-polish`  
Escopo: `SF-FINAL-01` a `SF-FINAL-04`

## Resumo executivo

Foram aplicadas correcoes finais seguras para reduzir as pendencias P2 de hardening e acessibilidade do prototipo academico. A configuracao efetiva no root do projeto agora inclui headers defensivos e deixou de usar rewrite global de SPA; os hosts estaticos passam a reescrever apenas rotas conhecidas para `index.html`, permitindo 404 real para rotas desconhecidas no deploy.

O layout recebeu skip link, alvo `main` focavel, landmarks mais claros, footer rotulado e bottom nav mobile movida para mais cedo no DOM sem mudar seu comportamento visual fixo. O contraste foi reforcado nos pontos de maior risco visual: tokens de laranja foram escurecidos, CTAs em gradiente usam faixa mais escura, bottom nav usa fundo mais opaco e estado ativo sem amarelo claro sob texto branco, e o foco global passou a usar contorno solido de maior contraste.

## Correcoes por prioridade

### SF-FINAL-01 - Headers defensivos

Corrigido em configuracao:

- `vercel.json` na raiz agora declara `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy`.
- `SIBiSC/vercel.json` manteve os headers e ajustou a CSP para permitir os fonts externos usados pelo CSS (`fonts.googleapis.com` e `fonts.gstatic.com`), evitando uma CSP que quebraria a tipografia.
- `netlify.toml` recebeu headers equivalentes.

Limite de validacao: headers de Vercel/Netlify nao sao servidos pelo `vite preview`; precisam ser confirmados no preview/deploy remoto do PR.

### SF-FINAL-02 - HTTP 404 real

Implementado por configuracao:

- removido o rewrite global `/(.*) -> /index.html` da raiz Vercel;
- mantidos rewrites somente para deep links conhecidos: `/home-mobile`, `/noticias`, detalhes canonicos, `/eventos`, detalhes canonicos, `/catalogo`, detalhes canonicos e `/perfil`;
- removido o redirect catch-all do Netlify e substituido por redirects explicitos para as rotas conhecidas.

Resultado esperado no deploy: rotas desconhecidas deixam de cair no fallback SPA e passam a receber 404 real do host estatico. Rotas existentes continuam funcionando em refresh/deep link.

Limite de validacao: `vite preview` continua retornando `200` para rota inexistente por comportamento local de SPA fallback. A UI 404 acessivel segue renderizando corretamente.

### SF-FINAL-03 - Contraste em gradientes/pseudo-elementos

Mitigado em CSS:

- `--color-accent` foi escurecido para contraste AA com texto branco;
- `--color-accent-strong` foi escurecido para reforcar texto/acento em superficies claras;
- definido `--color-ink-strong`, ja usado por modulos CSS;
- foco global mudou de laranja translucido para contorno solido;
- CTAs e bottom nav evitam texto branco sobre amarelo/laranja claro;
- fundo da bottom nav ficou mais opaco e o link ativo usa gradiente escuro.

Validacao automatizada previa ja tinha 0 violacoes axe WCAG A/AA nas rotas principais, mas com itens `incomplete` por gradientes/pseudo-elementos. Esta tarefa reduziu os riscos visuais evidentes; uma medicao manual completa pixel a pixel ainda e recomendada antes de declarar WCAG AA completa.

### SF-FINAL-04 - Navegacao assistiva/mobile

Corrigido em layout:

- adicionado skip link `Pular para conteúdo principal`;
- `main` recebeu `id="conteudo-principal"` e `tabIndex={-1}`;
- ribbon informativa saiu de `div` solta e passou a `aside` rotulado;
- footer recebeu `aria-labelledby`;
- label da navegacao principal foi normalizada para `Navegação principal`;
- bottom nav recebeu `id="navegacao-mobile"` e foi movida para antes do conteudo no DOM, mantendo `position: fixed` visual.

No smoke mobile, a ordem inicial de foco ficou: skip link, marca, Início, Notícias, Eventos, Catálogo, Perfil, e depois controles do conteudo.

## Validacoes executadas

- `ReadLints` nos arquivos editados: sem erros.
- `npm run qa:repo`: passou.
- `npm run qa:ci`: passou, incluindo `vite build`.
- Smoke Playwright em Microsoft Edge no `vite preview` local:
  - `/`: `200`, h1 `Feltrim Agents ajuda você a encontrar a próxima leitura.`
  - `/home-mobile`: `200`, h1 `Feltrim Agents`
  - `/catalogo`: `200`, h1 `Catálogo`
  - `/catalogo/b1`: `200`, h1 `Memorias Postumas de Bras Cubas`
  - `/perfil`: `200`, h1 `João Silva`
  - `/__sf_final_rota_inexistente__`: `200` local, UI 404 com h1 `Essa rota ainda não existe no mapa do SIBiSC.`
  - console Edge: 0 errors, 0 warnings.

## Pendencias reais

- Confirmar no preview/deploy Vercel que os headers estao presentes no dominio efetivo.
- Confirmar no preview/deploy Vercel que rota inexistente retorna HTTP 404 real.
- Se houver deploy Netlify, confirmar que os redirects explicitos preservam deep links validos e deixam rotas desconhecidas em 404.
- Fazer medicao manual completa de contraste em gradientes/pseudo-elementos antes de declarar conformidade WCAG AA completa.
- Manter NO-GO para produto operacional real, reserva/renovacao oficial, integracao com biblioteca e compatibilidade auditada com NVDA/Narrator/VoiceOver ate validacoes dedicadas.
