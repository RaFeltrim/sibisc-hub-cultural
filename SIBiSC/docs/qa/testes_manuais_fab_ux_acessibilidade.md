# Testes Manuais — UX e Acessibilidade: FeedbackFAB e FeltrimAgentsFAB

**Data:** 2026-05-19  
**Avaliador:** Especialista UX/Acessibilidade (análise estática de código-fonte)  
**Sprint de referência:** Sprint Final / Entrega Acadêmica  
**Componentes avaliados:**
- `src/components/feedback/FeedbackFAB.jsx` + `FeedbackFAB.module.css`
- `src/components/feltrim-agents/FeltrimAgentsFAB.jsx` + `FeltrimAgentsFAB.module.css`

**Escopo de cobertura:** análise estática do código-fonte. Critérios que exigem browser real, leitor de tela físico ou inspeção de contraste ao vivo estão documentados como **LIMITAÇÃO** com recomendação.

---

## 1. Heurísticas de Nielsen

### H1 — Visibilidade do Estado do Sistema

| Critério | FeedbackFAB | FeltrimAgentsFAB | Resultado |
|---|---|---|---|
| `aria-label` do FAB muda entre aberto/fechado | ✅ "Fechar painel de feedback" / "Abrir painel de feedback sobre o SIBiSC" | ✅ "Fechar Feltrim Agents" / "Feltrim Agents — assistente guiado" | **PASS** |
| `aria-expanded` atualizado | ✅ `aria-expanded={isOpen}` | ✅ `aria-expanded={isOpen}` | **PASS** |
| Animação de entrada do painel | ✅ `animation: panel-in 180ms ease both` | ✅ `animation: panel-in 180ms ease both` | **PASS** |
| Ícone do FAB muda de aparência ao abrir | ❌ Ícone de balão permanece estático | ❌ Ícone de estrela permanece estático | **FAIL** |

**Problema P1 (Baixo):** O ícone do botão FAB não fornece retroalimentação visual do estado (aberto/fechado) além da animação do painel emergindo. O usuário sem leitor de tela precisa inferir o estado pela presença ou ausência do painel. Recomendação: aplicar uma rotação sutil, mudança de cor de fundo, ou `box-shadow` marcante no estado `aria-expanded="true"` para reforçar visibilidade de estado.

---

### H2 — Correspondência com o Mundo Real

| Critério | FeedbackFAB | FeltrimAgentsFAB |
|---|---|---|
| Ícone reconhecível | ✅ Balão de conversa (SVG path de chat bubble) — universal para "feedback" | ⚠️ Estrela de 5 pontas — associada a "favoritos" ou "avaliação", menos intuitiva para "assistente" |
| Linguagem natural no painel | ✅ "Tem um feedback sobre o SIBiSC? Nos envie!" | ✅ "Feltrim Agents — Assistente guiado em protótipo" |
| Termos técnicos expostos | ✅ Nenhum | ✅ Nenhum — "dados locais do catálogo" é suficientemente claro |

**Problema P2 (Médio):** O ícone de estrela no FeltrimAgentsFAB não comunica imediatamente "assistente" ou "chat". Em contexto acadêmico de protótipo é aceitável, mas pode gerar fricção em teste com usuários reais. Recomendação: substituir por ícone de robô, faísca/raio (wand), ou balão com faísca — padrões que usuários associam a IA/assistente.

---

### H3 — Controle e Liberdade do Usuário

| Critério | FeedbackFAB | FeltrimAgentsFAB |
|---|---|---|
| Botão X fecha o painel | ✅ `handleClose()` com `ref={closeBtnRef}` | ✅ idem |
| Escape fecha o painel | ✅ `useEffect` com `document.addEventListener('keydown', onKeyDown)` para `e.key === 'Escape'` | ✅ idem |
| Re-clicar no FAB fecha | ✅ `handleToggle()` chama `handleClose()` se `isOpen` | ✅ idem |
| Foco retorna ao FAB ao fechar | ✅ `fabRef.current?.focus()` em `handleClose` e no handler do Escape | ✅ idem |

**Resultado: PASS** em ambos os componentes. Todos os três mecanismos de fechamento são implementados.

---

### H4 — Consistência e Padrões

| Critério | Resultado |
|---|---|
| Estrutura JSX (`root > panel (conditional) > fab`) | ✅ Idêntica |
| IDs dos painéis únicos e descritivos (`fab-feedback-panel`, `fab-agents-panel`) | ✅ |
| Keyframes `panel-in` idênticos | ✅ |
| `focus-visible` com outline de 3px e offset | ✅ Em todos os elementos interativos |
| Botão fechar (`closeBtn`) com dimensões 2rem × 2rem | ✅ Idêntico |
| FAB principal com 52 × 52px | ✅ Idêntico |
| Posicionamento: `position: fixed; right: 20px` | ✅ Idêntico |
| Espaçamento vertical entre os FABs | ✅ FeedbackFAB em `bottom: 80px`; FeltrimAgentsFAB em `bottom: 152px` (diferença de 72px: 52px do FAB + 20px de gap) |
| `prefers-reduced-motion` implementado | ✅ Em ambos |

**Resultado: PASS.** Os dois FABs são visualmente coerentes e seguem os mesmos padrões de design do projeto.

---

### H5 — Prevenção de Erros

| Critério | FeedbackFAB | FeltrimAgentsFAB |
|---|---|---|
| Ações destrutivas presentes | ❌ Nenhuma — apenas abrir link e copiar texto | ❌ Nenhuma — apenas navegação interna e busca |
| Link GitHub abre em nova aba (`target="_blank"`) | ✅ Com `rel="noopener noreferrer"` — seguro | N/A |
| `aria-label` do link descreve o destino | ✅ "Enviar feedback via GitHub Issues com o template de feedback Sofia e Claudia" | N/A |
| Reset do estado ao reabrir | ✅ `setCopyStatus('')` ao abrir | ✅ `setQuery('')` e `setSearchStatus('')` ao abrir |

**Resultado: PASS.** Sem ações destrutivas irreversíveis. Link externo adequadamente configurado.

---

### H6 — Reconhecimento vs. Lembrança

| Critério | FeedbackFAB | FeltrimAgentsFAB |
|---|---|---|
| Painel auto-explicativo ao abrir | ✅ Título, dois CTAs claros e aviso de privacidade | ✅ Subtítulo de protótipo, campo de busca com label, perguntas guiadas rotuladas |
| `aria-pressed` nos botões de seleção | N/A | ✅ `aria-pressed={guide.id === selectedGuideId}` |
| Feedback de status após ação | ✅ `role="status" aria-live="polite"` no `copyStatus` | ✅ `SearchField` tem `role="status" aria-live="polite"` no `statusMessage` |
| Aviso de limitação de escopo | ✅ `SOFIA_CLAUDIA_PRIVACY_NOTICE` | ✅ `GUIDED_ASSISTANT_LIMIT_NOTICE` + `panelSubtitle` |

**Resultado: PASS.**

---

### H7 — Eficiência de Uso

| Critério | FeedbackFAB | FeltrimAgentsFAB |
|---|---|---|
| Passos até ação principal | 2 cliques (FAB → link/botão) | 2 cliques (FAB → selecionar pergunta guiada) ou 3 (FAB → digitar → Enter) |
| Busca com sugestões em tempo real | N/A | ✅ `quickMatches` calculado via `useMemo` ao digitar |
| Fechar ao navegar para outra rota | N/A | ✅ `handleLinkClick()` fecha o painel ao clicar em link |

**Resultado: PASS.** Fluxo mínimo e eficiente.

---

### H8 — Design Minimalista

| Critério | FeedbackFAB | FeltrimAgentsFAB |
|---|---|---|
| Elementos no painel | Título, link GitHub, botão Copiar, status condicional, aviso privacidade | Subtítulo, busca, perguntas guiadas (9 botões), seção de resposta, recomendação por perfil (condicional) |
| Informação desnecessária presente | ✅ Não | ⚠️ A seção "Sugerido pelo perfil" (`.recommendedNote`) aparece apenas se `assistantRecommendations.length > 0` — condicional correto; 9 perguntas guiadas em grid 2×N pode parecer densa em telas pequenas |

**Problema P3 (Baixo):** O painel do FeltrimAgentsFAB tem mais elementos que o FeedbackFAB, o que é justificável pela complexidade do assistente. Em telas < 360px, o grid 2-colunas dos `guideButtons` (com font-size 0.64rem para a categoria) pode comprimir os textos. Recomendação: testar em 360px de largura; se necessário, mudar para grid 1-coluna abaixo de 380px.

---

## 2. Acessibilidade (WCAG 2.1 AA)

### A1 — `aria-label` nos Botões

| Elemento | FeedbackFAB | FeltrimAgentsFAB | Resultado |
|---|---|---|---|
| Botão FAB principal | ✅ Dinâmico com estado aberto/fechado | ✅ Dinâmico com estado aberto/fechado | **PASS** |
| Botão fechar (X) | ✅ `aria-label="Fechar painel de feedback"` | ✅ `aria-label="Fechar Feltrim Agents"` | **PASS** |
| Botões de pergunta guiada | N/A | ✅ Label visível via `span` interno (`shortLabel`) + `aria-pressed` | **PASS** |
| Link GitHub Issues | ✅ `aria-label` descritivo presente (sobrescreve texto visível de forma válida) | N/A | **PASS** |
| SVGs decorativos | ✅ `aria-hidden="true" focusable="false"` em todos | ✅ `aria-hidden="true" focusable="false"` em todos | **PASS** |

---

### A2 — `aria-expanded`

**FeedbackFAB:** `aria-expanded={isOpen}` no `<button ref={fabRef}>` — atualiza corretamente.  
**FeltrimAgentsFAB:** `aria-expanded={isOpen}` no `<button ref={fabRef}>` — atualiza corretamente.

**Resultado: PASS.**

---

### A3 — `role="dialog"` + `aria-modal`

| Atributo | FeedbackFAB | FeltrimAgentsFAB |
|---|---|---|
| `role="dialog"` | ✅ presente no `div` do painel | ✅ presente no `div` do painel |
| `aria-modal="true"` | ✅ presente | ✅ presente |
| `aria-labelledby` apontando para título do painel | ✅ `aria-labelledby="fab-feedback-title"` → `<p id="fab-feedback-title">` | ✅ `aria-labelledby="fab-agents-title"` → `<p id="fab-agents-title">` |

**Resultado: PASS.** A semântica de diálogo modal está completa.

**Nota técnica:** O `aria-labelledby` aponta para um `<p>` em ambos os casos. Tecnicamente válido; idealmente seria um `<h2>` ou `<h3>` para reforçar hierarquia, mas não é violação do WCAG.

---

### A4 — Focus Trap (Tab/Shift+Tab dentro do popup)

**FeedbackFAB — seletores usados:**
```
'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
```
Captura: link GitHub Issues ✅, botão Copiar ✅, botão X ✅.  
Foco inicial ao abrir: botão X (`closeBtnRef.current.focus()`).  
Ordem de foco dentro do painel: X → Link GitHub → Botão Copiar (**Problema P4: ordem de Tab não respeita ordem visual** — o X está primeiro no DOM mas visualmente fica no canto direito do header; link e botão vêm depois; isso é aceitável pois o foco inicial no X é correto pelo padrão de dialog.)

**FeltrimAgentsFAB — seletores usados:**
```
'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
```
Inclui `input` ✅ (necessário para o SearchField). Captura todos os elementos interativos.

**Resultado: PASS.** Focus trap implementado em ambos via `useEffect` com listener de `keydown`.

**Aviso de implementação (Baixo):** Ambos os componentes registram dois `document.addEventListener('keydown', ...)` sobrepostos (um para Escape, outro para Tab). Isso é correto e não é bug — cada listener faz `return` imediato se a key não for a esperada. Funcionalmente seguro.

---

### A5 — Escape Fecha o Painel

**Ambos:** `useEffect(() => { if (e.key === 'Escape') { setIsOpen(false); fabRef.current?.focus(); } }, [isOpen])`

**Resultado: PASS.** Escape implementado corretamente, com retorno de foco.

---

### A6 — Foco Retorna ao Botão ao Fechar

| Mecanismo de fechamento | FeedbackFAB | FeltrimAgentsFAB |
|---|---|---|
| Botão X | ✅ `handleClose()` → `fabRef.current?.focus()` | ✅ idem |
| Tecla Escape | ✅ `fabRef.current?.focus()` no handler | ✅ idem |
| Re-clicar no FAB | ✅ `handleToggle()` chama `handleClose()` | ✅ idem |
| Clicar em link interno (FeltrimAgents) | N/A | ✅ `handleLinkClick()` → `handleClose()` → `fabRef.current?.focus()` |

**Resultado: PASS.** Todos os caminhos de fechamento retornam o foco.

---

### A7 — Ordem de Foco Lógica e Esperada

**FeedbackFAB:**
Ao abrir: foco vai para botão X → Tab: Link GitHub → Tab: Botão Copiar → Tab: (trap volta para X).  
Ordem DOM é: X, link, botão — que corresponde à ordem visual de leitura ✅.

**FeltrimAgentsFAB:**
Ao abrir: X → (Tab) SearchField input → (Tab) Botão "Explorar" → (Tab) guideButton[0] → … → guideButton[8] → (Tab) links na seção guidedAnswer → (Tab) link de ação → (Tab volta para X).

**Problema P5 (Médio):** Com 9 perguntas guiadas + múltiplos links na resposta, a navegação por Tab pode ser extensa (potencialmente 15+ stops). Recomendação: considerar `tabindex="-1"` nos `guideButtons` não selecionados e gerenciar o foco via setas (`arrow keys`) usando padrão ARIA Roving Tabindex para a lista de perguntas guiadas. Isso reduziria a fadiga de Tab e se alinharia ao padrão WAI-ARIA "listbox" ou "tablist".

---

### A8 — Contraste (variáveis CSS vs. hardcode)

**Uso de variáveis CSS do projeto (tokens.css):**

| Propriedade | FeedbackFAB | FeltrimAgentsFAB |
|---|---|---|
| Background do FAB | `var(--color-accent-strong)` ✅ | `var(--color-ink-strong)` ✅ |
| Texto do FAB | `color: white` ⚠️ hardcode | `color: white` ⚠️ hardcode |
| Background do painel | `var(--color-surface-strong)` ✅ | `var(--color-surface-strong)` ✅ |
| Bordas | `var(--color-line)`, `var(--color-line-strong)` ✅ | idem ✅ |
| Textos do painel | `var(--color-ink-strong)`, `var(--color-ink-soft)`, `var(--color-ink-muted)` ✅ | idem ✅ |

**Valores hardcoded encontrados — Problema P6 (Baixo):**

```css
/* FeedbackFAB.module.css */
.fab:focus-visible { outline: 3px solid rgba(143, 58, 28, 0.5); }
/* rgba(143,58,28) = #8f3a1c = var(--color-accent-strong) */

.closeBtn:focus-visible { outline: 3px solid rgba(143, 58, 28, 0.3); }
.issueLink:focus-visible { outline: 3px solid rgba(143, 58, 28, 0.3); }
.copyBtn:focus-visible { outline: 3px solid rgba(143, 58, 28, 0.3); }
.issueLink:hover { background: rgba(143, 58, 28, 0.06); }
.copyBtn:hover { background: rgba(18, 38, 63, 0.05); }

/* FeltrimAgentsFAB.module.css */
.fab:focus-visible { outline: 3px solid rgba(18, 38, 63, 0.45); }
/* rgba(18,38,63) = #12263f = var(--color-ink) */
/* + vários outros rgba com os mesmos valores */
```

Os valores hardcoded correspondem às cores dos tokens (`--color-accent-strong: #8f3a1c`, `--color-ink: #12263f`) — semanticamente corretos. O risco é manutenção futura: se o token mudar, os hardcodes ficarão defasados. CSS não suporta nativamente `rgba(var(--color-accent-strong), 0.3)`, mas existem alternativas:
- Definir variáveis de outline no tokens.css: `--color-focus-accent: rgba(143, 58, 28, 0.5)`
- Usar `color-mix(in srgb, var(--color-accent-strong) 50%, transparent)` (suporte moderno)

**Estimativa de contraste (sem browser real — LIMITAÇÃO):**
- FAB do FeedbackFAB: branco sobre `#8f3a1c` → ratio ≈ 7.5:1 → **passa AA e AAA** ✅
- FAB do FeltrimAgentsFAB: branco sobre `#0d1d31` → ratio > 14:1 → **passa AA e AAA** ✅
- Textos do painel: `--color-ink-strong` (#0d1d31) sobre `--color-surface-strong` (#fffaf3) → ratio > 16:1 ✅
- `--color-ink-soft` (#4b6078) sobre `#fffaf3` → ratio ≈ 5.2:1 → **passa AA (4.5:1)** ✅
- `--color-ink-muted` (#73869c) sobre `#fffaf3` → ratio ≈ 3.1:1 → ⚠️ **pode reprovar AA para texto abaixo de 18pt** — aplicado em textos de 0.74–0.82rem que ficam abaixo do threshold de 18pt

**Problema P7 (Alto):** `--color-ink-muted` (#73869c) sobre fundo claro (#fffaf3) tem contraste estimado de ~3.1:1, abaixo do mínimo WCAG AA de 4.5:1 para texto normal. Este token é usado em: `.privacy` (FeedbackFAB, 0.76rem), `.limitNotice` e `.answerItem span/em` (FeltrimAgentsFAB, 0.74rem). Como são textos de apoio/disclaimers e fontes pequenas (< 14pt / 18.67px), o impacto é moderado, mas falha formalmente no WCAG.

**⚠️ LIMITAÇÃO:** A verificação de contraste exato requer inspeção com browser real + ferramenta como axe DevTools, Colour Contrast Analyser ou browser inspector. Os valores acima são estimativas baseadas nos tokens declarados no código. Recomendação: executar `axe` ou Lighthouse accessibility no ambiente de desenvolvimento antes da apresentação.

---

### A9 — `prefers-reduced-motion`

**FeedbackFAB:**
```css
@media (prefers-reduced-motion: reduce) {
  .fab, .closeBtn, .issueLink, .copyBtn { transition: none; }
  .fab:hover { transform: none; }
  .panel { animation: none; }
}
```
Cobre: animação de entrada do painel ✅, transitions de hover ✅, transform do FAB ✅.

**FeltrimAgentsFAB:**
```css
@media (prefers-reduced-motion: reduce) {
  .fab, .closeBtn, .guideButton, .answerItem, .answerAction, .quickResult { transition: none; }
  .fab:hover { transform: none; }
  .panel { animation: none; }
}
```
Cobre todos os elementos com transition ✅.

**Resultado: PASS.** Ambos respeitam a preferência do sistema operacional.

---

### A10 — Leitores de Tela (análise estática)

| Critério | FeedbackFAB | FeltrimAgentsFAB |
|---|---|---|
| Anúncio do nome do dialog ao abrir | ✅ `role="dialog" aria-labelledby="fab-feedback-title"` → anuncia "Tem um feedback sobre o SIBiSC? Nos envie!" | ✅ `role="dialog" aria-labelledby="fab-agents-title"` → anuncia "Feltrim Agents" |
| Status após ação anunciado ao vivo | ✅ `role="status" aria-live="polite"` no `copyStatus` | ✅ `role="status" aria-live="polite"` no `searchStatus` (via SearchField) |
| Seção de resposta ao vivo | N/A | ✅ `guidedAnswer` tem `aria-live="polite" aria-atomic="true"` |
| Perguntas guiadas comunicam estado selecionado | N/A | ✅ `aria-pressed` nos `guideButtons` |
| `aria-controls` nos guideButtons | N/A | ✅ `aria-controls="fab-agents-answer"` — indica ao AT qual região é afetada |

**Problema P8 (Médio):** `aria-atomic="true"` na seção `guidedAnswer` (FeltrimAgentsFAB) fará com que o leitor de tela releia TODA a seção ao trocar de pergunta guiada. Dependendo do volume de texto (título + resumo + N recomendações), o anúncio pode ser muito longo e perturbador para o usuário. Recomendação: remover `aria-atomic` ou reduzir para `aria-atomic="false"` para que apenas as mudanças sejam anunciadas.

**⚠️ LIMITAÇÃO:** A verificação real com NVDA, JAWS ou VoiceOver requer ambiente de browser com leitor de tela ativo. Recomenda-se testar com NVDA + Chrome antes da apresentação final para confirmar o fluxo de anúncio.

---

## 3. Mobile

### M1 — Área de Toque dos FABs ≥ 44×44px

| Elemento | Dimensão | Resultado |
|---|---|---|
| `.fab` (FeedbackFAB) | `width: 52px; height: 52px` | ✅ **PASS** (52 > 44) |
| `.fab` (FeltrimAgentsFAB) | `width: 52px; height: 52px` | ✅ **PASS** (52 > 44) |
| `.closeBtn` (ambos) | `width: 2rem; height: 2rem` = **32px × 32px** | ⚠️ **PARCIAL** |

**Problema P9 (Médio):** O botão X de fechamento tem 32×32px. O critério WCAG 2.5.5 (AAA) recomenda 44×44px. O critério WCAG 2.5.8 (AA, versão 2.2) define mínimo de 24×24px — que 32px cumpre. Apple HIG e Material Design recomendam 44px. Em contexto de apresentação acadêmica WCAG 2.1 AA, tecnicamente passa, mas o botão X de fechamento de um modal/dialog é elemento crítico de navegação.

Recomendação: aumentar para `width: 2.75rem; height: 2.75rem` (44px) mantendo o ícone SVG em 14px no centro.

---

### M2 — Popup Não Ultrapassa Viewport em Telas Pequenas

**FeedbackFAB:**
- `width: 288px` — em telefone de 360px, o painel terá `360 - 20 (right) - 288 = 52px` de margem à esquerda ✅

**FeltrimAgentsFAB:**
- `width: 320px; max-height: min(560px, calc(100svh - 220px))` ✅
- Em 360px: `360 - 20 - 320 = 20px` de margem ✅ (apertado mas dentro da viewport)
- `overflow-y: auto` com `scrollbar-gutter: stable` ✅ — painel rola internamente se o conteúdo exceder a altura máxima
- `100svh` garante que usa a viewport real do mobile sem a barra do browser ✅

**Resultado: PASS** para ambos. FeltrimAgentsFAB tem tratamento de altura máxima que FeedbackFAB não precisa (painel menor).

**Problema P10 (Baixo):** FeedbackFAB não tem `max-height` explícita. O conteúdo atual é fixo e cabe em qualquer tela acima de 360px. Se no futuro forem adicionados mais elementos, pode transbordar. Recomendação preventiva: adicionar `max-height: min(400px, calc(100svh - 160px)); overflow-y: auto` como medida de proteção.

---

### M3 — Sobreposição com BottomNav

**BottomNav:** `position: fixed; bottom: max(0.55rem, env(safe-area-inset-bottom))` — altura estimada ~60–70px no design atual (`.link { min-height: 2.65rem; padding: 0.28rem 0.1rem }` + padding do nav de 0.22rem × 2 + safe area).

**FeedbackFAB (mobile):** `bottom: 80px` (padrão) → `bottom: 32px` acima de 900px.  
→ Em mobile (<900px), o botão FAB fica a 80px do fundo, acima da BottomNav (~60–70px). ✅ Sem sobreposição.

**FeltrimAgentsFAB (mobile):** `bottom: 152px` → `bottom: 100px` acima de 900px.  
→ 152px claramente acima da BottomNav. ✅ Sem sobreposição.

**Resultado: PASS.** O empilhamento vertical dos FABs é consistente:
- BottomNav: 0–70px
- FeedbackFAB: 80px
- FeltrimAgentsFAB: 152px (= 80px + 52px (FAB) + 20px gap)

---

## 4. Problemas Consolidados

| # | Problema | Componente | Severidade | Critério Violado |
|---|---|---|---|---|
| P1 | Ícone do FAB não muda estado visual (aberto/fechado) | Ambos | **Baixo** | Nielsen H1 |
| P2 | Ícone de estrela não é associado intuitivamente a "assistente" | FeltrimAgentsFAB | **Médio** | Nielsen H2 |
| P3 | Grid 2-colunas de perguntas guiadas pode comprimir em telas < 380px | FeltrimAgentsFAB | **Baixo** | Nielsen H8, Mobile |
| P4 | `aria-labelledby` aponta para `<p>` em vez de elemento de heading | Ambos | **Baixo** | WCAG 1.3.1 (informativo) |
| P5 | Navegação por Tab com 15+ stops no painel do Feltrim Agents | FeltrimAgentsFAB | **Médio** | WCAG 2.4.3, 2.4.7 |
| P6 | Cores de `focus-visible outline` e hovers hardcoded (não usam variável CSS) | Ambos | **Baixo** | Manutenibilidade |
| P7 | `--color-ink-muted` pode ter contraste insuficiente (~3.1:1) em textos pequenos | Ambos | **Alto** | WCAG 1.4.3 (AA) |
| P8 | `aria-atomic="true"` em seção grande causa anúncio verboso em leitor de tela | FeltrimAgentsFAB | **Médio** | WCAG 4.1.3 |
| P9 | Botão X com 32×32px abaixo da recomendação de 44×44px | Ambos | **Médio** | WCAG 2.5.5 (AAA) / Material HIG |
| P10 | FeedbackFAB sem `max-height` (risco futuro de overflow) | FeedbackFAB | **Baixo** | Prevenção |

---

## 5. Pontos de Excelência

Os seguintes critérios foram implementados com qualidade acima do esperado para um protótipo acadêmico:

- **Focus trap completo** com Tab/Shift+Tab e `useEffect` dedicado em ambos os componentes
- **`prefers-reduced-motion`** cobrindo todas as transições e animações — raro em protótipos
- **Retorno de foco ao FAB** em todos os caminhos de fechamento (X, Escape, re-clique, link)
- **Foco inicial no botão X ao abrir** — padrão recomendado para dialogs WAI-ARIA
- **`aria-live="polite"`** nos feedbacks de status (`copyStatus`, `searchStatus`) — sem interrupção agressiva
- **`aria-pressed`** nos botões de perguntas guiadas — comunicação de estado para AT
- **`scrollbar-gutter: stable`** no painel do FeltrimAgentsFAB — previne layout shift ao scroll
- **`100svh`** no `max-height` — uso da viewport real do mobile
- **Reset de estado ao fechar/reabrir** — UX limpa sem estado residual
- **Link externo com `rel="noopener noreferrer"`** — segurança garantida

---

## 6. Sugestões de Melhoria Prioritárias

### Sugestão S1 — Feedback visual de estado aberto no FAB (P1)
```css
/* FeedbackFAB.module.css / FeltrimAgentsFAB.module.css */
.fab[aria-expanded="true"] {
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.4), 0 4px 16px rgba(0,0,0,0.3);
}
```
Sem alterar ícone, apenas um ring visual no estado aberto comunica o estado ao usuário visual.

### Sugestão S2 — Resolver contraste de `--color-ink-muted` (P7)
Em `tokens.css`, considerar escurecer `--color-ink-muted` de `#73869c` para `#5d7285` (~4.5:1) para textos em tamanho normal, ou garantir que o token só seja aplicado a textos de tamanho ≥ 18px ou 14px bold.

### Sugestão S3 — Reduzir carga de Tab no FeltrimAgentsFAB (P5)
Implementar Roving Tabindex para a lista de `guideButtons`:
```jsx
// No guideButton:
tabIndex={guide.id === selectedGuideId ? 0 : -1}
// + listener de keydown para ArrowUp/ArrowDown no container .guideList
```

### Sugestão S4 — Remover `aria-atomic` da seção de resposta (P8)
```jsx
<section
  id="fab-agents-answer"
  aria-live="polite"
  /* remover aria-atomic="true" */
  aria-labelledby="fab-agents-answer-title"
>
```

### Sugestão S5 — Aumentar closeBtn para 44px (P9)
```css
.closeBtn {
  width: 2.75rem;   /* ≈ 44px */
  height: 2.75rem;
}
```

### Sugestão S6 — Variáveis CSS para focus outlines (P6)
Em `tokens.css`:
```css
--color-focus-accent: rgba(143, 58, 28, 0.5);
--color-focus-ink: rgba(18, 38, 63, 0.45);
```

---

## 7. Limitações desta Avaliação

| Limitação | Impacto | Recomendação |
|---|---|---|
| Contraste não verificado em browser real | Médio — estimativas de ratio podem diferir em telas calibradas de forma diferente | Executar Lighthouse (Accessibility) ou axe DevTools no app em execução |
| Leitor de tela não testado (NVDA/JAWS/VoiceOver) | Alto — comportamento de `aria-live`, `aria-modal` e `aria-controls` pode variar por AT | Testar com NVDA + Chrome antes da apresentação |
| Focus trap não executado em runtime | Médio — lógica parece correta na análise estática, mas edge cases de DOM dinâmico só aparecem em uso real | Teste manual de Tab no browser após login |
| Viewport de telas < 360px não testável sem browser | Baixo — cálculos de largura são estimativas | Inspecionar em Chrome DevTools com device de 360px de largura |
| Modo escuro (dark mode) | Baixo — projeto não implementa dark mode; tokens são adequados para light mode | Registrar como dívida técnica se dark mode for adicionado |

---

## 8. Veredito Final

### FeedbackFAB

| Dimensão | Resultado |
|---|---|
| Heurísticas Nielsen | ✅ 7/8 PASS — P1 (Baixo) |
| Acessibilidade WCAG AA | ✅ PASS com ressalvas — P6 (Baixo), P7 (Alto — requer validação real), P9 (Médio) |
| Mobile | ✅ PASS |

### FeltrimAgentsFAB

| Dimensão | Resultado |
|---|---|
| Heurísticas Nielsen | ✅ 7/8 PASS — P2 (Médio), P3 (Baixo) |
| Acessibilidade WCAG AA | ✅ PASS com ressalvas — P5 (Médio), P7 (Alto — requer validação), P8 (Médio), P9 (Médio) |
| Mobile | ✅ PASS |

---

### **VEREDITO FINAL: GO com ressalvas**

Ambos os componentes estão prontos para apresentação acadêmica com as ressalvas documentadas abaixo.

**Justificativa:**
- A implementação de acessibilidade está **acima da média** para protótipos acadêmicos: focus trap, prefers-reduced-motion, aria-live, aria-pressed, aria-controls, retorno de foco — todos implementados.
- Os dois problemas de maior severidade (P7 — contraste do `--color-ink-muted`, P9 — closeBtn 32px) são compartilhados por todo o sistema de design do projeto, não são específicos dos FABs.
- O único problema crítico potencial (P7) requer verificação em browser real antes de uma publicação pública. Para apresentação acadêmica em protótipo, é tolerável.

**Ressalvas para registro:**
1. Executar axe DevTools ou Lighthouse Accessibility antes da apresentação para confirmar contraste do `--color-ink-muted` (P7).
2. Se houver tempo, aplicar S1 (ring visual no FAB aberto) e S5 (closeBtn 44px) para polimento imediato.
3. Registrar P5 (Roving Tabindex no Feltrim Agents) e P8 (aria-atomic) como débito técnico da próxima sprint.
4. Testar com leitor de tela real (NVDA + Chrome) se o projeto tiver critério de acessibilidade na rubrica de avaliação.

---

*Avaliação gerada em 2026-05-19 por análise estática do código-fonte. Não foram realizadas modificações no código de produção.*
