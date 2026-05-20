# Aprendizados: Auditoria Sênior de Projeto SPA Acadêmico

**Domínio:** Auditoria técnica de projetos front-end React / SPA acadêmicos  
**Tema:** Metodologia e achados recorrentes em auditorias de protótipos SPA com deploy Vercel  
**Contexto:** Auditoria completa do SIBiSC/Feltrim Agents (SSC0961 USP, 2026)  
**Data:** 2026-05-19  
**Reuso:** Qualquer auditoria de projeto front-end acadêmico ou SPA MVP em Vercel  
**Relatório de referência:** `docs/auditoria/auditoria-completa-2026-05-19.md`

---

## Fonte

Auditoria técnica completa executada em 2026-05-19 sobre:
- Repositório: `RaFeltrim/sibisc-hub-cultural`
- Stack: Vite 8 + React 19 + React Router 7 + CSS Modules + Supabase (inativo)
- Deploy: Vercel via monorepo (subpasta `SIBiSC/`)
- 12 fases de auditoria: mapeamento, produto, funcional, UX, a11y, segurança, dados, deploy, testes, git, docs, relatório

---

## Quando Reusar Este Documento

- Ao auditar um SPA React/Vite em Vercel
- Ao revisar qualidade de protótipo acadêmico antes de apresentação
- Ao configurar pipeline de CI/CD mínimo para projeto estudantil
- Ao avaliar comunicação de limitações de protótipo para usuários finais
- Ao configurar guard de integridade de dados mockados (qa-guard pattern)

---

## Princípios-Chave Aprendidos

### 1. O principal risco de protótipos é a datação dos mocks
Dados temporais hardcoded (datas de eventos, notícias) ficam desatualizados rapidamente. Um evento de "março 2026" numa apresentação de "maio 2026" é imediatamente questionado pela banca.

**Regra:** Sempre verificar se datas dos mocks estão no futuro próximo antes de qualquer apresentação.

### 2. Duas homes (desktop/mobile) sem redirecionamento automático é armadilha
Projetos com `/home-mobile` como rota manual exigem que o usuário saiba a URL. Em contexto real, isso deve ser resolvido com `useMediaQuery` ou CSS `display:none` por breakpoint.

**Padrão recomendado:** Uma única home que adapta layout por CSS/hooks, ou um redirect no AppRouter baseado em viewport.

### 3. qa-guard.mjs é um padrão poderoso para consistência de dados mockados
O script `qa-guard.mjs` implementado no projeto valida automaticamente:
- Presença de IDs canônicos
- Coerência entre mocks (favoritos ↔ catálogo, recomendações ↔ catálogo)
- Campos obrigatórios em cada entidade
- Flags de segurança (publicRanking=false, limit notice, privacy notice)

**Reuso:** Este padrão deve ser adotado em qualquer projeto com dados mockados estáticos. Custo de implementação: ~100 linhas de Node.js. Benefício: previne inconsistências silenciosas.

### 4. Headers de segurança no vercel.json são simples e essenciais
O projeto implementou CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy em `vercel.json`. Estes 5 headers podem ser copiados como template para qualquer projeto Vercel.

**Template base:**
```json
"headers": [{
  "source": "/(.*)",
  "headers": [
    { "key": "Content-Security-Policy", "value": "default-src 'self'; object-src 'none'; frame-ancestors 'none';" },
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "X-Frame-Options", "value": "DENY" },
    { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
    { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=()" }
  ]
}]
```

### 5. Rewrites restritivos no Vercel são melhores que wildcard para SPAs com mocks
Usar `:param(id1|id2|id3)` nos rewrites em vez de `:param(.*)` significa que IDs inválidos retornam HTTP 404 real do Vercel, não uma página de "livro não encontrado" com HTTP 200. Isso é mais correto do ponto de vista HTTP.

**Trade-off:** Exige atualizar o vercel.json quando novos IDs são adicionados.

### 6. Supabase "preparado mas inativo" é uma boa estratégia de prototipagem
O padrão `isSupabaseConfigured = Boolean(url && key)` com `supabase = isSupabaseConfigured ? createClient(...) : null` permite:
- Desenvolver completamente sem backend
- Ativar o Supabase apenas configurando env vars
- Nenhum erro em produção quando as vars estão ausentes

### 7. Comunicação de limitações de protótipo precisa ser proativa e repetida
O projeto fez isso bem: avisos em 6+ pontos da UI, aviso global no hero, limite notice em cada resposta do assistente, `mockNotice` no catálogo, aviso no perfil. Isso é o padrão correto para protótipos.

**Anti-padrão:** Um único aviso no início que o usuário ignora.

### 8. ARIA para SPAs: checklist mínimo que funciona
O projeto implementou corretamente:
- `<a href="#main-id">Pular para conteúdo</a>` (skip link)
- `<main tabIndex={-1}>` (foco programático)
- `aria-live="polite"` + `aria-atomic="true"` para updates dinâmicos
- `role="tablist/tab/tabpanel"` + `aria-selected` + `hidden` para tabs
- `role="progressbar"` + `aria-valuemin/max/now` para barras
- `aria-hidden="true"` em ícones decorativos com texto adjacente
- `focus-visible` com outline em vez de `focus` (melhor UX)

### 9. O padrão de "mock service with delay" é realista
Simular `await delay(300)` nos services antes de retornar dados mockados é uma boa prática: prepara o código para substituição real por API, força tratamento de loading states, e a UI fica mais próxima do comportamento real.

### 10. SectionHeader com headingLevel prop é padrão flexível
O componente `SectionHeader({ headingLevel = 2 })` que renderiza dinamicamente `h1` ou `h2` é uma boa abstração. Para projetos mais complexos, aceitar valores `1-6`.

---

## Checklist Reutilizável para Auditoria de SPA Acadêmico

### Antes da Apresentação (P1)
- [ ] Verificar se datas dos mocks (eventos, notícias) estão no futuro
- [ ] `npm run build` sem erros
- [ ] `npm run qa:repo` (ou equivalente) sem falhas
- [ ] Domínio público retorna 200
- [ ] Rota inexistente retorna 404

### Segurança Básica (P2)
- [ ] CSP configurada no vercel.json
- [ ] X-Frame-Options DENY
- [ ] X-Content-Type-Options nosniff
- [ ] Sem tokens hardcoded no código-fonte
- [ ] `.env` no `.gitignore`
- [ ] Links externos com `rel="noopener noreferrer"`

### Acessibilidade Básica (P2)
- [ ] Skip link presente e funcional
- [ ] `<main>` com `id` e `tabIndex=-1`
- [ ] Cada página tem exatamente um `<h1>`
- [ ] `aria-live` em regiões que mudam dinamicamente
- [ ] `focus-visible` com outline visível
- [ ] `prefers-reduced-motion` respeitado
- [ ] Elementos semânticos corretos (header, nav, main, footer)

### Qualidade de Dados (qa-guard pattern)
- [ ] IDs canônicos consistentes entre todos os mocks
- [ ] Campos obrigatórios validados automaticamente
- [ ] Referências cruzadas (A referencia B, B existe?)
- [ ] Flags de segurança (publicRanking=false, mockNotice=presente)

### DevOps Mínimo
- [ ] `engines` no `package.json`
- [ ] GitHub Actions com build + guard
- [ ] `outputDirectory` correto no vercel.json
- [ ] Rewrite/redirect para rotas do SPA

---

## Riscos e Limitações

- **Mocks estáticos** ficam desatualizados rapidamente — exigem processo de manutenção
- **Duas homes** (desktop/mobile separadas) introduzem duplicação de código e UX inconsistente
- **Google Fonts externo** adiciona latência e rastreamento — em prod real, auto-hospedar
- **qa-guard não substitui testes E2E** — valida dados mas não comportamento de UI
- **Contraste CSS** precisa de ferramenta dedicada para validação WCAG — análise estática de tokens não é suficiente

---

## Decisões de Projeto Específicas do SIBiSC

| Decisão | Justificativa | Trade-off |
|---|---|---|
| 9 perguntas fixas vs. chat livre | Viável sem backend de IA | Limitado, mas honesto |
| Duas homes (desktop/mobile) | Permite experiências distintas | Sem auto-detect por viewport |
| Supabase preparado mas inativo | Facilita migração futura | Código extra inativo |
| Rewrites restritivos por ID | 404 real para IDs inválidos | Requer update manual ao adicionar IDs |
| qa-guard.mjs centralizado | Única fonte de verdade de contratos | Depende de manter o script atualizado |
| Google Fonts externo | Fontes de alta qualidade sem esforço | Latência, privacidade |
| publicRanking=false em todos os badges | Sem competição pública | Gamificação apenas individual |
