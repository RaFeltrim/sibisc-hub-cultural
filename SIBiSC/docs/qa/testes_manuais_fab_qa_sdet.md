# Testes Manuais Funcionais — FeedbackFAB e FeltrimAgentsFAB

**Responsável:** Rafael-QA SDET  
**Data de execução:** 2026-05-19  
**Método:** Inspeção estática de código-fonte (JSX + CSS + serviços), raciocínio baseado no código, simulação de fluxo de usuário  
**Ambiente:** Sem browser real ativo — verificações visuais marcadas como "Verificação limitada — requer validação visual manual"  
**Playwright CLI:** Não disponível neste contexto de execução

---

## Arquivos inspecionados

| Arquivo | Finalidade |
|---|---|
| `src/components/feedback/FeedbackFAB.jsx` | Componente principal FAB de feedback |
| `src/components/feedback/FeedbackFAB.module.css` | Estilos do FeedbackFAB |
| `src/services/feedbackService.js` | Constantes: URL, template, aviso de privacidade |
| `src/components/feltrim-agents/FeltrimAgentsFAB.jsx` | Componente principal FAB do Feltrim Agents |
| `src/components/feltrim-agents/FeltrimAgentsFAB.module.css` | Estilos do FeltrimAgentsFAB |
| `src/services/guidedAssistantService.js` | Perguntas guiadas, respostas e referências do assistente |
| `src/components/ui/SearchField.jsx` | Campo de busca reutilizável consumido pelo Agents |
| `src/components/layout/BottomNav.jsx` | BottomNav (z-index e altura para cálculo de sobreposição) |
| `src/components/layout/BottomNav.module.css` | Estilos do BottomNav |
| `src/pages/HomePage.jsx` | Integração dos FABs na rota `/` |
| `src/pages/HomePageMobile.jsx` | Integração dos FABs na rota `/home-mobile` |
| `src/routes/AppRouter.jsx` | Estrutura de rotas e AppLayout |

---

## Seção 1 — FeedbackFAB

### TC-FAB-01 — Botão renderiza no canto correto (position fixed, bottom 80px, right 20px)

**Resultado:** ✅ PASS

**Evidência de código:**

```css
/* FeedbackFAB.module.css, linhas 1–10 */
.root {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}
```

Posicionamento fixo com `bottom: 80px` e `right: 20px` está declarado exatamente como especificado.  
`z-index: 200` garante sobreposição sobre qualquer conteúdo de página (BottomNav tem `z-index: 15`).

**Media query desktop** (`min-width: 900px`): `bottom: 32px` — ajuste contextual correto, pois o BottomNav fica `display: none` em desktop.

---

### TC-FAB-02 — Popup fechado por padrão

**Resultado:** ✅ PASS

**Evidência de código:**

```jsx
// FeedbackFAB.jsx, linha 10
const [isOpen, setIsOpen] = useState(false);

// FeedbackFAB.jsx, linha 99
{isOpen && (
  <div ... role="dialog" ...>
    ...
  </div>
)}
```

Estado inicial `false` impede renderização do painel. O painel só existe no DOM quando `isOpen === true`.

---

### TC-FAB-03 — Clique no botão abre popup

**Resultado:** ✅ PASS

**Evidência de código:**

```jsx
// FeedbackFAB.jsx, linhas 88–95
function handleToggle() {
  if (isOpen) {
    handleClose();
  } else {
    setCopyStatus('');  // limpa status anterior de cópia
    setIsOpen(true);
  }
}

// FeedbackFAB.jsx, linha 175
<button ... onClick={handleToggle}>
```

O clique no botão FAB executa `handleToggle`, que define `setIsOpen(true)` quando o painel está fechado. Também limpa o `copyStatus` residual de sessões anteriores.

**Comportamento adicional verificado:** Ao abrir, o `useEffect` (linha 17) foca automaticamente o botão X (`closeBtnRef.current.focus()`), implementando gestão de foco acessível.

---

### TC-FAB-04 — Botão X fecha popup

**Resultado:** ✅ PASS

**Evidência de código:**

```jsx
// FeedbackFAB.jsx, linhas 83–86
function handleClose() {
  setIsOpen(false);
  fabRef.current?.focus();  // devolve foco ao botão FAB
}

// FeedbackFAB.jsx, linhas 112–118
<button
  ref={closeBtnRef}
  type="button"
  className={styles.closeBtn}
  aria-label="Fechar painel de feedback"
  onClick={handleClose}
>
```

O botão X chama `handleClose()`, que fecha o painel e restaura foco ao botão FAB original. O SVG do ícone X tem `aria-hidden="true"` para leitores de tela, com o label textual no botão.

**Comportamento de teclado também verificado:** `useEffect` com `document.addEventListener('keydown', onKeyDown)` fecha o painel ao pressionar Escape e restaura foco ao FAB (linhas 23–33).

---

### TC-FAB-05 — Link GitHub Issues aponta para URL correta com template

**Resultado:** ✅ PASS

**Evidência de código:**

```js
// feedbackService.js, linhas 1–2
export const SOFIA_CLAUDIA_FEEDBACK_ISSUE_URL =
  'https://github.com/RaFeltrim/sibisc-hub-cultural/issues/new?template=feedback_sofia_claudia.md&labels=feedback%2Cqa&title=%5BFEEDBACK%5D%20SIBiSC%3A%20';
```

URL decodificada para leitura:
- Base: `https://github.com/RaFeltrim/sibisc-hub-cultural/issues/new`
- `template=feedback_sofia_claudia.md` ✅
- `labels=feedback,qa` ✅
- `title=[FEEDBACK] SIBiSC: ` (URL-encoded) ✅

```jsx
// FeedbackFAB.jsx, linhas 136–144
<a
  className={styles.issueLink}
  href={SOFIA_CLAUDIA_FEEDBACK_ISSUE_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Enviar feedback via GitHub Issues com o template de feedback Sofia e Claudia"
>
  Enviar via GitHub Issues
</a>
```

Link abre em nova aba (`target="_blank"`) com proteção contra vulnerabilidade de tab hijacking (`rel="noopener noreferrer"`). `aria-label` descritivo para leitores de tela.

---

### TC-FAB-06 — Botão "Copiar roteiro" presente

**Resultado:** ✅ PASS

**Evidência de código:**

```jsx
// FeedbackFAB.jsx, linhas 146–148
<button type="button" className={styles.copyBtn} onClick={handleCopy}>
  Copiar roteiro offline
</button>
```

Botão com texto exato "Copiar roteiro offline" está presente no JSX.  
O handler `handleCopy` (linhas 70–81) usa `navigator.clipboard.writeText(SOFIA_CLAUDIA_FEEDBACK_TEMPLATE)` com fallback para ambientes sem HTTPS.

**Template copiado (feedbackService.js, linhas 7–16):**
```
Feedback SIBiSC/Feltrim Agents
Rota ou tela: [...]
Dispositivo/navegador: [...]
O que eu tentei fazer: [...]
O que aconteceu: [...]
O que eu esperava: [...]
Impacto percebido: [...]
Privacidade: não inclua dados pessoais sensíveis...
```

---

### TC-FAB-07 — Aviso de privacidade presente

**Resultado:** ✅ PASS

**Evidência de código:**

```js
// feedbackService.js, linhas 4–5
export const SOFIA_CLAUDIA_PRIVACY_NOTICE =
  'Nao envie dados pessoais sensiveis, tokens, documentos, enderecos completos ou prints com informacoes privadas.';
```

```jsx
// FeedbackFAB.jsx, linha 160
<p className={styles.privacy}>{SOFIA_CLAUDIA_PRIVACY_NOTICE}</p>
```

O aviso está sempre visível dentro do painel (não condicional), renderizado como `<p>` com estilo `.privacy` (fonte 0.76rem, cor muted, borda delimitante). Posicionado como último elemento antes do fechamento do painel.

---

### TC-FAB-08 — Popup tem role=dialog e aria-label/aria-modal

**Resultado:** ✅ PASS

**Evidência de código:**

```jsx
// FeedbackFAB.jsx, linhas 100–107
<div
  ref={panelRef}
  id="fab-feedback-panel"
  role="dialog"
  aria-modal="true"
  aria-labelledby="fab-feedback-title"
  className={styles.panel}
>
  ...
  <p id="fab-feedback-title" className={styles.panelTitle}>
    Tem um feedback sobre o SIBiSC? Nos envie!
  </p>
```

- `role="dialog"` ✅  
- `aria-modal="true"` ✅  
- `aria-labelledby="fab-feedback-title"` ✅ (padrão preferencial ao `aria-label` quando há título visível associado)  
- O ID `"fab-feedback-title"` corresponde exatamente ao `<p>` com o título do painel

**Nota técnica:** O padrão `aria-labelledby` é preferível ao `aria-label` quando existe um elemento de título visível, conforme ARIA 1.2. Implementação correta.

**Focus trap adicional verificado:** Implementação de trap de foco via Tab/Shift+Tab (linhas 36–68) garante que o foco não escape do painel enquanto aberto.

---

### TC-FAB-09 — aria-expanded muda corretamente entre aberto/fechado

**Resultado:** ✅ PASS

**Evidência de código:**

```jsx
// FeedbackFAB.jsx, linhas 164–175
<button
  ref={fabRef}
  type="button"
  className={styles.fab}
  aria-label={
    isOpen
      ? 'Fechar painel de feedback'
      : 'Abrir painel de feedback sobre o SIBiSC'
  }
  aria-expanded={isOpen}
  aria-controls="fab-feedback-panel"
  onClick={handleToggle}
>
```

- `aria-expanded={isOpen}` é booleano React — renderizado como `aria-expanded="false"` quando fechado e `aria-expanded="true"` quando aberto ✅  
- `aria-controls="fab-feedback-panel"` aponta para o `id` do painel ✅  
- `aria-label` também muda entre "Abrir" e "Fechar" conforme estado ✅ (comportamento bônus, reforça semântica)

---

### TC-FAB-10 — Não sobrepõe BottomNav (bottom 80px garante margem)

**Resultado:** ⚠️ PARCIAL — Margem calculada suficiente, mas muito apertada em mobile médio. Verificação visual necessária.

**Cálculo de margem:**

| Viewport | BottomNav (approx. top em px da base) | FAB button bottom | Margem |
|---|---|---|---|
| Mobile pequeno (<560px) | ~55px | 80px | **~25px** ✅ seguro |
| Mobile médio (560–900px) | ~79px | 80px | **~1px** ⚠️ crítico |
| Desktop (≥900px) | BottomNav `display:none` | 32px (media query) | **sem conflito** ✅ |

**Cálculo detalhado para mobile médio (560–900px):**
- BottomNav: `bottom: 8.8px` (0.55rem) + padding interno 10.9px + link height ~59px = **~78.7px** do rodapé à borda superior do nav
- FeedbackFAB: `bottom: 80px` na borda inferior do botão  
- Gap: `80 - 78.7 = 1.3px` — praticamente zero

**Conclusão:** O botão FAB tecnicamente não se sobrepõe ao BottomNav (1.3px de folga), mas a proximidade é tão pequena que pode gerar experiência visual congestionada em dispositivos reais de 560–900px. Validação visual em browser é obrigatória.

---

## Seção 2 — FeltrimAgentsFAB

### TC-AGFAB-01 — Botão renderiza empilhado acima do FeedbackFAB (bottom 152px)

**Resultado:** ✅ PASS

**Evidência de código:**

```css
/* FeltrimAgentsFAB.module.css, linhas 1–10 */
.root {
  position: fixed;
  bottom: 152px;
  right: 20px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}
```

Posicionamento `bottom: 152px` está 72px acima do FeedbackFAB (`bottom: 80px`). Com o botão de 52px de altura, a separação entre os dois botões é:  
`152px - (80px + 52px) = 20px de gap` — não há sobreposição.

**Media query desktop** (`min-width: 900px`): `bottom: 100px` — gap para o FeedbackFAB (`bottom: 32px, height: 52px, top: 84px`) resulta em `100 - 84 = 16px`, ainda suficiente.

---

### TC-AGFAB-02 — Popup fechado por padrão

**Resultado:** ✅ PASS

**Evidência de código:**

```jsx
// FeltrimAgentsFAB.jsx, linha 27
const [isOpen, setIsOpen] = useState(false);

// FeltrimAgentsFAB.jsx, linha 170
{isOpen && (
  <div ... role="dialog" ...>
    ...
  </div>
)}
```

Idêntico ao padrão do FeedbackFAB. Estado inicial `false`, painel renderizado condicionalmente.

---

### TC-AGFAB-03 — Clique abre popup

**Resultado:** ✅ PASS

**Evidência de código:**

```jsx
// FeltrimAgentsFAB.jsx, linhas 154–162
function handleToggle() {
  if (isOpen) {
    handleClose();
  } else {
    setQuery('');        // limpa busca anterior
    setSearchStatus(''); // limpa status anterior
    setIsOpen(true);
  }
}
```

Ao abrir, o estado de busca é resetado (`query = ''`, `searchStatus = ''`). Foco é redirecionado ao botão X pelo `useEffect` (linha 68).

---

### TC-AGFAB-04 — Popup tem campo de busca ou perguntas guiadas visíveis

**Resultado:** ✅ PASS

**Evidência de código — Campo de busca:**

```jsx
// FeltrimAgentsFAB.jsx, linhas 211–224
<SearchField
  label="Busca assistida no catálogo"
  placeholder="Título, autor ou ISBN"
  value={query}
  onChange={(nextValue) => { ... }}
  onSubmit={handleAssistantSearch}
  buttonLabel="Explorar"
  statusMessage={searchStatus}
/>
```

**Evidência — Perguntas guiadas (quando query vazia):**

```jsx
// FeltrimAgentsFAB.jsx, linhas 246–267
<div className={styles.guideList} aria-label="Perguntas que o Feltrim Agents orienta nesta versão">
  <strong className={styles.guideListLabel}>Perguntas guiadas</strong>
  <div className={styles.guideButtons}>
    {guidedAssistantQuestions.map((guide) => (
      <button
        key={guide.id}
        type="button"
        className={styles.guideButton}
        aria-pressed={guide.id === selectedGuideId}
        aria-controls="fab-agents-answer"
        onClick={() => setSelectedGuideId(guide.id)}
      >
        <span>{guide.shortLabel}</span>
        <em>{guide.category}</em>
      </button>
    ))}
  </div>
</div>
```

O serviço define **9 perguntas guiadas** (`guidedAssistantService.js`):

| ID | Short Label | Categoria |
|---|---|---|
| literatura-brasileira | Literatura brasileira | Leitura |
| machado-de-assis | Machado de Assis | Autor |
| cidade-sociedade | Cidade e sociedade | Tema |
| confirmar-disponibilidade | Disponibilidade | Orientação |
| eventos-leitura | Eventos de leitura | Agenda |
| noticias-servicos | Notícias e serviços | Notícias |
| preferencias | Preferências | Perfil |
| sem-reserva-real | Reserva e renovação | Limite |
| fora-do-escopo | Fora do escopo | Fallback |

Todas as 9 são renderizadas como botões com `shortLabel` e `category` visíveis.

---

### TC-AGFAB-05 — Respostas são exibidas ao interagir

**Resultado:** ✅ PASS

**Evidência — Resposta inicial imediata ao abrir:**

```jsx
// FeltrimAgentsFAB.jsx, linha 33
const [selectedGuideId, setSelectedGuideId] = useState(guidedAssistantQuestions[0].id);
// guidedAssistantQuestions[0].id = 'literatura-brasileira'
```

A primeira pergunta ('literatura-brasileira') já está selecionada ao abrir o painel. O `useMemo` para `selectedGuide` (linha 126) computa imediatamente a resposta.

**Evidência — Seção de resposta renderizada:**

```jsx
// FeltrimAgentsFAB.jsx, linhas 269–326
<section
  id="fab-agents-answer"
  className={styles.guidedAnswer}
  aria-live="polite"
  aria-atomic="true"
  aria-labelledby="fab-agents-answer-title"
>
  <span className={styles.answerCategory}>{selectedGuide.category}</span>
  <h2 id="fab-agents-answer-title" className={styles.answerTitle}>
    {selectedGuide.answer.title}
  </h2>
  <p className={styles.answerSummary}>{selectedGuide.answer.summary}</p>
  {/* recomendações com links para /catalogo/:id */}
  {/* aviso de limitação (GUIDED_ASSISTANT_LIMIT_NOTICE) */}
  {/* botão de ação principal */}
</section>
```

- Ao clicar em qualquer botão de pergunta guiada: `setSelectedGuideId(guide.id)` atualiza o estado  
- `selectedGuide` é recomputado por `useMemo` com `getGuidedAssistantQuestion(selectedGuideId)`  
- `aria-live="polite"` anuncia a mudança de conteúdo para leitores de tela ✅  
- Perguntas com `answer.recommendations` exibem livros com link para `/catalogo/:bookId` ✅  
- Perguntas com `answer.references` exibem eventos/notícias com links para `/eventos/:id` ou `/noticias/:id` ✅

**Busca assistida:**

```jsx
// FeltrimAgentsFAB.jsx, linhas 131–147
function handleAssistantSearch() {
  const term = query.trim();
  if (!term) {
    setSearchStatus('Digite um título, autor, ISBN ou tema...');
    return;
  }
  const matches = getQuickMatches(catalogBooks, term);
  setSearchStatus(
    matches.length
      ? `Feltrim Agents encontrou ${countLabel} no catálogo local...`
      : 'Feltrim Agents não encontrou sugestão segura...'
  );
}
```

Resultados em tempo real via `useMemo` (`quickMatches`) são exibidos ao digitar (máx. 4 resultados). O status de busca é atualizado após clicar "Explorar".

---

### TC-AGFAB-06 — Botão X fecha popup

**Resultado:** ✅ PASS

**Evidência de código:**

```jsx
// FeltrimAgentsFAB.jsx, linhas 149–152 e 183–188
function handleClose() {
  setIsOpen(false);
  fabRef.current?.focus();
}

<button
  ref={closeBtnRef}
  type="button"
  className={styles.closeBtn}
  aria-label="Fechar Feltrim Agents"
  onClick={handleClose}
>
```

Mesma lógica robusta do FeedbackFAB: fecha painel, restaura foco ao botão FAB, Escape também funciona.

---

### TC-AGFAB-07 — Popup tem role=dialog acessível

**Resultado:** ✅ PASS

**Evidência de código:**

```jsx
// FeltrimAgentsFAB.jsx, linhas 171–177
<div
  ref={panelRef}
  id="fab-agents-panel"
  role="dialog"
  aria-modal="true"
  aria-labelledby="fab-agents-title"
  className={styles.panel}
>
  <p id="fab-agents-title" ...>Feltrim Agents</p>
```

- `role="dialog"` ✅  
- `aria-modal="true"` ✅  
- `aria-labelledby="fab-agents-title"` ✅  
- Focus trap implementado (inclui `input` no seletor de focusable: linha 91) ✅  
- Escape fecha e restaura foco ✅  
- `guideButton` usa `aria-pressed` para indicar seleção ✅  
- `answerAction` usa `aria-controls="fab-agents-answer"` ✅

---

### TC-AGFAB-08 — Visualmente diferenciado do FeedbackFAB (cor diferente)

**Resultado:** ✅ PASS

**Evidência de código:**

```css
/* FeedbackFAB.module.css, linha 20 */
background: var(--color-accent-strong);   /* tom vinho/laranja escuro ≈ #8f3a1c */

/* FeltrimAgentsFAB.module.css, linha 20 */
background: var(--color-ink-strong);      /* azul marinho escuro ≈ #12263f */
```

Cores semanticamente distintas confirmadas:
- FeedbackFAB: acento vinho (`--color-accent-strong`) — identidade visual de chamada para ação
- FeltrimAgentsFAB: tinta escura (`--color-ink-strong`) — identidade visual de informação/assistente

O focus-outline também reflete as respectivas identidades:  
- FeedbackFAB: `rgba(143, 58, 28, 0.5)` (vinho)  
- FeltrimAgentsFAB: `rgba(18, 38, 63, 0.45)` (marinho)

**Verificação limitada — diferença visual real:** Requer validação no browser para confirmar percepção de contraste entre os dois botões empilhados.

---

### TC-AGFAB-09 — Sem sobreposição entre os dois FABs

**Resultado:** ✅ PASS

**Cálculo de posicionamento dos botões:**

| Componente | CSS `bottom` | Altura | Faixa vertical |
|---|---|---|---|
| FeedbackFAB button | 80px | 52px | 80–132px da base |
| FeltrimAgentsFAB button | 152px | 52px | 152–204px da base |
| **Gap entre os botões** | — | — | **20px** (132px–152px) |

Gap de 20px entre os dois botões — sem sobreposição em mobile padrão (<900px).

Em desktop (≥900px):
- FeedbackFAB: `bottom: 32px`, button faixa 32–84px
- FeltrimAgentsFAB: `bottom: 100px`, button faixa 100–152px
- Gap: 16px — adequado

---

## Seção 3 — Integração

### TC-INT-01 — Ambos os FABs coexistem sem interferência

**Resultado:** ✅ PASS

**Evidência:**

```jsx
// HomePage.jsx, linhas 62–66
return (
  <>
    <FeedbackFAB />
    <FeltrimAgentsFAB />
    ...
  </>
);

// HomePageMobile.jsx, linhas 133–134
<FeedbackFAB />
<FeltrimAgentsFAB />
```

Os dois componentes são completamente independentes:
- Estado `isOpen` local em cada componente (sem compartilhamento)
- IDs de painel distintos: `fab-feedback-panel` vs `fab-agents-panel`
- IDs de título distintos: `fab-feedback-title` vs `fab-agents-title`
- Refs independentes (`fabRef`, `panelRef`, `closeBtnRef` em cada componente)
- Mesmo `z-index: 200`, porém em posições verticais diferentes — sem conflito de stacking

---

### TC-INT-02 — Apenas um popup aberto por vez (ou os dois podem coexistir)

**Resultado:** ⚠️ COMPORTAMENTO DOCUMENTADO — Dois popups podem coexistir simultaneamente

**Análise:**

Os dois FABs não possuem mecanismo de exclusão mútua. O estado `isOpen` de cada componente é completamente local e independente. Abrir o FeltrimAgentsFAB não fecha o FeedbackFAB, e vice-versa.

**Implicação visual:** Se ambos os painéis estiverem abertos ao mesmo tempo:
- FeedbackFAB panel: 288px de largura, ancorado à direita, aparece acima do botão em `bottom: 80px`
- FeltrimAgentsFAB panel: 320px de largura, `max-height: min(560px, calc(100svh - 220px))`, ancorado à direita, aparece acima do botão em `bottom: 152px`
- Os painéis podem se sobrepor visualmente dependendo do viewport e do conteúdo do FeltrimAgents

**Este comportamento não é um bug crítico** se o escopo do produto for de protótipo demonstrativo. Em produção com múltiplos usuários, exclusão mútua seria recomendada para clareza de interface.

---

### TC-INT-03 — Páginas HomePage e HomePageMobile não têm mais painéis inline

**Resultado:** ✅ PASS

**Evidência — HomePage.jsx (linhas 62–97):** O JSX retornado contém apenas:
1. `<FeedbackFAB />` — componente FAB (renderizado externamente via position fixed)
2. `<FeltrimAgentsFAB />` — componente FAB (idem)
3. `<section>` de notícias
4. `<section>` de eventos

Nenhum painel inline de feedback ou de assistente guiado presente.

**Evidência — HomePageMobile.jsx (linhas 68–136):** O JSX retornado contém:
1. Quick actions links
2. Seções de notícias, eventos e livros
3. `<FeedbackFAB />` ao final
4. `<FeltrimAgentsFAB />` ao final

Nenhum painel inline. Migração para FABs 100% concluída em ambas as páginas.

---

## Seção 4 — Bugs Encontrados

### BUG-001 — FeedbackFAB: margem crítica com BottomNav em mobile médio

| Campo | Detalhe |
|---|---|
| **ID** | BUG-001 |
| **Severidade** | Minor |
| **Componente** | `FeedbackFAB.module.css` |
| **Descrição** | Em viewports de 560px–900px de largura, a margem calculada entre o topo do BottomNav e a borda inferior do FeedbackFAB é de aproximadamente 1–2px |
| **Causa raiz** | BottomNav height ≈ 70px + bottom-offset ≈ 8.8px = ~78.8px; FeedbackFAB bottom = 80px; gap = ~1.2px |
| **Impacto** | Sem sobreposição técnica (FAB está acima), mas experiência visual muito congestionada em dispositivos comuns (ex: tablet em modo portrait) |
| **Sugestão de correção** | Aumentar `bottom` para `92px` (sem media query) na classe `.root` do FeedbackFAB |
| **Verificação** | Requer validação visual em browser real com viewport de ~768px |

---

### BUG-002 — FABs podem ter dois popups abertos simultaneamente

| Campo | Detalhe |
|---|---|
| **ID** | BUG-002 |
| **Severidade** | Low |
| **Componentes** | `FeedbackFAB.jsx`, `FeltrimAgentsFAB.jsx` |
| **Descrição** | Ausência de mecanismo de exclusão mútua permite que ambos os painéis estejam abertos ao mesmo tempo |
| **Causa raiz** | Estado `isOpen` completamente local em cada componente; nenhum Context, evento ou callback coordena os dois FABs |
| **Impacto** | Dois painéis sobrepostos podem poluir visualmente a interface e confundir o usuário em viewports estreitos |
| **Sugestão de correção** | Implementar exclusão mútua via React Context (`FABContext`) ou `useReducer` com action `OPEN_FAB` que fecha outros FABs antes de abrir o solicitado |
| **Verificação** | Requer validação visual em browser real |

---

### OBS-001 — `navigator.clipboard.writeText` requer contexto seguro (HTTPS)

| Campo | Detalhe |
|---|---|
| **ID** | OBS-001 |
| **Severidade** | Informacional — não é bug |
| **Componente** | `FeedbackFAB.jsx`, `handleCopy()` |
| **Descrição** | A API `navigator.clipboard.writeText` falha em contextos não-seguros (HTTP sem TLS). O try/catch exibe fallback adequado: "Nao foi possivel copiar automaticamente. Selecione o roteiro manualmente." |
| **Status** | Comportamento esperado e tratado. Em produção com HTTPS funciona normalmente |

---

### OBS-002 — FABs presentes apenas em HomePage e HomePageMobile

| Campo | Detalhe |
|---|---|
| **ID** | OBS-002 |
| **Severidade** | Informacional — verificar requisito de produto |
| **Componentes** | `HomePage.jsx`, `HomePageMobile.jsx` |
| **Descrição** | Os FABs estão registrados apenas nas duas rotas home. Páginas `/catalogo`, `/eventos`, `/noticias`, `/perfil` não os incluem |
| **Causa** | Decisão arquitetural de localização por página (não no `AppLayout` global) |
| **Impacto** | Se a intenção é coletar feedback em qualquer rota, seria necessário mover os FABs para `AppLayout.jsx` |
| **Verificação** | Confirmar com PO se cobertura de páginas é intencional para este Sprint |

---

## Seção 5 — Sumário Executivo

### Tabela de Resultados

| Caso de Teste | Resultado | Observação |
|---|---|---|
| TC-FAB-01 | ✅ PASS | `position: fixed; bottom: 80px; right: 20px` confirmado no CSS |
| TC-FAB-02 | ✅ PASS | `useState(false)` + renderização condicional `{isOpen && ...}` |
| TC-FAB-03 | ✅ PASS | `handleToggle()` → `setIsOpen(true)` + foco no close button |
| TC-FAB-04 | ✅ PASS | `handleClose()` + Escape + foco devolvido ao FAB |
| TC-FAB-05 | ✅ PASS | URL com template, labels e title prefix; `rel="noopener noreferrer"` |
| TC-FAB-06 | ✅ PASS | Botão "Copiar roteiro offline" presente com handler e fallback |
| TC-FAB-07 | ✅ PASS | `SOFIA_CLAUDIA_PRIVACY_NOTICE` renderizado sempre visível no painel |
| TC-FAB-08 | ✅ PASS | `role=dialog`, `aria-modal=true`, `aria-labelledby` corretos |
| TC-FAB-09 | ✅ PASS | `aria-expanded={isOpen}` muda entre "false" e "true" |
| TC-FAB-10 | ⚠️ PARCIAL | Gap ≈ 1.2px em mobile 560–900px; requer validação visual |
| TC-AGFAB-01 | ✅ PASS | `position: fixed; bottom: 152px; right: 20px` confirmado |
| TC-AGFAB-02 | ✅ PASS | `useState(false)` + renderização condicional |
| TC-AGFAB-03 | ✅ PASS | `handleToggle()` + reset de query/searchStatus ao abrir |
| TC-AGFAB-04 | ✅ PASS | SearchField + 9 guideButtons visíveis no painel |
| TC-AGFAB-05 | ✅ PASS | Resposta inicial imediata; `aria-live="polite"` ao trocar pergunta; resultados de busca em tempo real |
| TC-AGFAB-06 | ✅ PASS | Botão X com `aria-label="Fechar Feltrim Agents"` + Escape |
| TC-AGFAB-07 | ✅ PASS | `role=dialog`, `aria-modal`, `aria-labelledby`, `aria-pressed`, focus trap |
| TC-AGFAB-08 | ✅ PASS | `--color-accent-strong` (vinho) vs `--color-ink-strong` (marinho) |
| TC-AGFAB-09 | ✅ PASS | Gap de 20px entre botões em mobile; 16px em desktop |
| TC-INT-01 | ✅ PASS | IDs únicos, estados independentes, sem interferência |
| TC-INT-02 | ⚠️ DOC | Dois popups podem coexistir — ausência de exclusão mútua |
| TC-INT-03 | ✅ PASS | Nenhum painel inline em HomePage ou HomePageMobile |

**Resultados consolidados:**
- ✅ PASS: 20 casos
- ⚠️ PARCIAL/DOC: 2 casos
- ❌ FAIL: 0 casos

---

## Veredito Final

### ✅ GO com ressalvas

**Justificativa:**

Os dois componentes estão **funcionalmente completos** e **acessivelmente implementados**. Todos os requisitos funcionais críticos foram atendidos:

- Posicionamento fixo correto e independente para cada FAB ✅  
- Estado inicial fechado com abertura/fechamento corretos ✅  
- Popup do FeedbackFAB com todos os 4 elementos obrigatórios (título, link GitHub, botão copiar, aviso de privacidade) ✅  
- Popup do FeltrimAgentsFAB com busca assistida, 9 perguntas guiadas, respostas com recomendações e links de navegação ✅  
- Acessibilidade robusta: `role=dialog`, `aria-modal`, `aria-labelledby`, `aria-expanded`, focus trap, Escape key, foco restaurado, `aria-live` ✅  
- Diferenciação visual entre os FABs por cores distintas de CSS custom properties ✅  
- Migração de painéis inline concluída em ambas as páginas Home ✅  

**Ressalvas antes da homologação final:**

1. **[MINOR] BUG-001** — Validar visualmente no browser a margem entre FeedbackFAB e BottomNav em dispositivos de 560–900px. Se houver crowding visual confirmado, ajustar `bottom` de 80px para 92px.  
2. **[LOW] BUG-002** — Avaliar com PO se exclusão mútua dos dois FABs é necessária para a Sprint atual ou pode ser adicionada como melhoria incremental.  
3. **[INFO] OBS-002** — Confirmar se o escopo de páginas cobertas pelos FABs é intencional (apenas Home) ou se devem estar presentes globalmente (AppLayout).

---

*Relatório gerado por: Rafael-QA SDET | Método: Inspeção estática de código-fonte | 2026-05-19*
