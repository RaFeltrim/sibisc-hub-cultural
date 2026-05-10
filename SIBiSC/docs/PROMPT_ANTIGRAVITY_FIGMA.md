# Prompt para Antigravity — Adicionar Telas ao Figma

> **Para executar:** Copie este prompt e envie ao agente Antigravity no Feltrim's Framework

---

## 🎯 CONTEXTO DA TAREFA

**Projeto:** SIBiSC App — Biblioteca Municipal USP  
**Objetivo:** Criar 2 novas telas mobile no Figma usando MCP  
**Link Figma:** https://www.figma.com/design/7HlVm9sJ0ffToiUwO69QO6/-USP--SIBiSC-App  
**Status:** 100% automatizado — usar Figma MCP para criar

---

## 📋 PROMPT PARA ANTIGRAVITY

```
Tu és o Antigravity — especialista em automação de design e integração Figma MCP.

TAREFA: Adicionar 2 novas telas mobile ao arquivo Figma do SIBiSC conforme especificação abaixo.

AMBIENTE:
- URL Figma: https://www.figma.com/design/7HlVm9sJ0ffToiUwO69QO6/-USP--SIBiSC-App
- MCP Disponível: figma (use ReadMcpResourceTool + criar via API)
- Autenticação: Usar token do usuário (Figura deve estar autenticada)

---

## TELA 1️⃣: HOME MOBILE

Nome da Página: "Mobile Screens"
Nome do Frame: "🏠 Home - Mobile"
Dimensões: 375 x 812 (iPhone 12)

Estrutura de Layers (criar na ordem):

1. HERO SECTION
   ├─ Background: Rectangle 375x200
   │  └─ Fill: linear-gradient(135deg, rgba(197,95,52,0.12), rgba(16,37,63,0.08))
   ├─ Title Text: "Bem-vindo ao SIBiSC"
   │  └─ Font: Bold, 32px, color: --color-ink-strong
   └─ Subtitle Text: "Sua biblioteca municipal ao alcance da mão"
      └─ Font: Regular, 16px, color: --color-ink-soft

2. SEARCH SECTION
   ├─ SearchField Component
   │  ├─ Label: "Buscar livro"
   │  ├─ Placeholder: "Título, autor ou ISBN"
   │  ├─ Button Label: "Buscar"
   │  └─ Height: 48px
   └─ [Estado: com/sem resultados]

3. QUICK ACTIONS
   ├─ AutoLayout: horizontal, 3 columns, gap 12px
   ├─ Action Card 1
   │  ├─ Icon: 📚 (28px)
   │  ├─ Label: "Catálogo"
   │  ├─ Link: /catalogo
   │  └─ Hover: background rgba(197,95,52,0.12)
   ├─ Action Card 2
   │  ├─ Icon: 📅
   │  ├─ Label: "Agenda"
   │  └─ Link: /eventos
   └─ Action Card 3
      ├─ Icon: 📰
      ├─ Label: "Notícias"
      └─ Link: /noticias

4. NEWS SECTION
   ├─ SectionHeader
   │  ├─ Eyebrow: "Novidades" (12px, uppercase, accent color)
   │  ├─ Title: "Últimas notícias" (20px, bold)
   │  └─ Link: "Ver mais" → /noticias
   └─ AutoLayout: vertical, gap 12px
      ├─ NewsCard 1
      ├─ NewsCard 2
      └─ NewsCard 3
         (Usar NewsCard component existente do projeto)

5. EVENTS SECTION
   ├─ SectionHeader
   │  ├─ Eyebrow: "Agenda"
   │  ├─ Title: "Próximos encontros"
   │  └─ Link: "Ver agenda" → /eventos
   └─ AutoLayout: vertical, gap 12px
      ├─ EventCard 1
      ├─ EventCard 2
      └─ EventCard 3
         (Usar EventCard component existente)

6. BOOKS SECTION
   ├─ SectionHeader
   │  ├─ Eyebrow: "Destaques"
   │  ├─ Title: "Livros em destaque"
   │  └─ Link: "Explorar catálogo" → /catalogo
   └─ AutoLayout: grid, 2 columns, gap 12px
      ├─ BookCard 1: O Cortiço
      ├─ BookCard 2: Dom Casmurro
      ├─ BookCard 3: Memórias Póstumas
      └─ BookCard 4: Quincas Borba
         (Usar BookCard component existente)

7. SPACING & CONSTRAINTS
   ├─ Padding: 16px (horizontal)
   ├─ Gap entre seções: 24px
   └─ Todas as linhas com responsive: "fill container"

---

## TELA 2️⃣: USER PROFILE

Nome do Frame: "👤 Profile - Mobile"
Dimensões: 375 x 812 (iPhone 12)

Estrutura de Layers:

1. USER HEADER
   ├─ Background: linear-gradient(135deg, rgba(197,95,52,0.1), rgba(16,37,63,0.08))
   ├─ Avatar Circle (60x60)
   │  ├─ Fill: rgba(255,255,255,0.6)
   │  └─ Text: "👤" (2rem)
   ├─ User Info Column
   │  ├─ Name: "João Silva" (bold, 18px)
   │  ├─ Unit: "Biblioteca Central" (14px, accent color)
   │  ├─ Email: "joao.silva@email.com" (12px, ink-soft)
   │  └─ Member Since: "Membro desde Janeiro de 2023" (12px, ink-soft)
   └─ Settings Card
      ├─ Checkbox + Label: "Receber notificações de devoluções"
      └─ Hint: "Receberá alerta 3 dias antes da devolução" (10px, ink-soft)

2. TABS NAVIGATION (sticky)
   ├─ Position: sticky top (quando scrollar)
   ├─ Background: white
   ├─ Border-bottom: 1px solid rgba(16,37,63,0.1)
   ├─ AutoLayout: horizontal, 3 equal columns
   ├─ Tab 1
   │  ├─ Label: "Empréstimos"
   │  ├─ Badge: "2" (background: accent color, white text, border-radius: 50%)
   │  └─ Active state: border-bottom 2px accent-strong
   ├─ Tab 2
   │  ├─ Label: "Histórico"
   │  └─ Inactive state: gray text, no bottom border
   └─ Tab 3
      ├─ Label: "Favoritos"
      └─ Badge: "4"

3. TAB CONTENT - LOANS (padrão: visível)
   ├─ AutoLayout: vertical, gap 12px
   ├─ Loan Card 1 (ATIVO - 5 dias)
   │  ├─ Cover Box: 60x80, background: #e8d5c4
   │  ├─ Content Column
   │  │  ├─ Title: "O Cortiço" (bold, 15px)
   │  │  ├─ Author: "Aluísio Azevedo" (12px, ink-soft)
   │  │  ├─ ISBN: "ISBN: 978-8525406555" (10px, monospace, ink-soft)
   │  │  ├─ Badge: "📅 Devolve em 5 dias"
   │  │  │  └─ Background: rgba(100,150,100,0.2), color: #2d5a3d
   │  │  └─ Date: "25/04/2026" (10px, ink-soft)
   │  └─ Renew Button: "🔄" (40x40, border: 1px rgba(100,150,100,0.3))
   │
   ├─ Loan Card 2 (ATIVO - 12 dias)
   │  ├─ Cover: #d4a574
   │  ├─ Title: "Dom Casmurro"
   │  ├─ Badge: "📅 Devolve em 12 dias"
   │  └─ Renew Button: desativado (opacity: 0.5)
   │
   └─ Loan Card 3 (OVERDUE - 2 dias atrasado)
      ├─ Card Border: rgba(200,80,80,0.3)
      ├─ Card Background: rgba(200,80,80,0.08)
      ├─ Cover: #c4a4a4
      ├─ Title: "Memórias Póstumas de Brás Cubas"
      ├─ Badge: "⚠️ Atrasado por 2 dias"
      │  └─ Background: rgba(200,80,80,0.2), color: #8b1a1a
      └─ Renew Button: desativado

4. TAB CONTENT - HISTORY (oculto por padrão)
   ├─ AutoLayout: vertical, gap 12px
   ├─ Timeline Line: border-left: 2px --color-accent, padding-left: 12px
   └─ Timeline Items (x5)
      ├─ Timeline Marker: 12x12 circle, background: --color-accent
      ├─ Title: "Quincas Borba" (bold, 14px)
      ├─ Author: "Machado de Assis" (12px, ink-soft)
      ├─ ISBN: "ISBN: 978-8525406588" (10px, monospace)
      └─ Meta Row
         ├─ "📍 Biblioteca Central"
         ├─ "📅 15/03/2026"
         └─ "📚 14 dias"
         (se atrasado: adicionar ⚠️ tag com "Atrasado (5d)")

5. TAB CONTENT - FAVORITES (oculto por padrão)
   ├─ AutoLayout: vertical, gap 12px
   ├─ Favorite Card 1 (Available)
   │  ├─ Content Column
   │  │  ├─ Title: "São Bernardo" (bold, 14px)
   │  │  ├─ Author: "Graciliano Ramos" (12px, ink-soft)
   │  │  ├─ ISBN: "ISBN: 978-8535060031"
   │  │  └─ Badge: "✓ 2 de 3 disponíveis"
   │  │     └─ Background: rgba(100,150,100,0.2), color: #2d5a3d
   │  └─ Heart Button: "♥️" (40x40, right side)
   │
   ├─ Favorite Card 2 (Unavailable)
   │  ├─ Title: "Vidas Secas"
   │  ├─ Badge: "⏳ Indisponível (2 total)"
   │  │  └─ Background: rgba(200,150,100,0.2)
   │  └─ Heart Button: "♥️"
   │
   ├─ Favorite Card 3
   │  └─ (similar pattern)
   │
   └─ Favorite Card 4
      └─ (similar pattern)

6. EMPTY STATE (quando sem favoritos)
   ├─ Text: "📚 Nenhum favorito ainda" (center, 14px)
   └─ Button: "Explorar catálogo" (CTA style, link: /catalogo)

---

## TELA 3️⃣: ATUALIZAR BOTTOM NAV

Frame Existente: "BottomNav" ou "Navigation - Mobile"

Adicionar 5º Item:
├─ To: /perfil
├─ Label: "Perfil"
├─ Icon: SVG circle com user icon
├─ Order: 5º (último)
└─ States:
   ├─ Default: gray icon, gray text
   ├─ Active: accent color icon, accent color text
   └─ Hover: subtle background

---

## PROTOTIPING & INTERACTIONS

1. Home Mobile → Cards linkam para detail pages
   ├─ News Card → /noticias/:id
   ├─ Event Card → /eventos/:id
   └─ Book Card → /catalogo/:id

2. Profile → Tabs switch content
   ├─ Empréstimos tab → mostra loans
   ├─ Histórico tab → mostra history
   └─ Favoritos tab → mostra favorites

3. Bottom Nav → 5º item linkam a /perfil

---

## DESIGN TOKENS A APLICAR

Colors:
- --color-accent: Use cor primária do SIBiSC (provavelmente #c55f34)
- --color-accent-strong: Tom mais forte
- --color-ink-strong: #102535
- --color-ink-soft: #669198
- --color-bg: #ffffff

Spacing: Use spacing de 4px base
- 12px = xs
- 16px = sm
- 24px = md
- 32px = lg

Radius:
- 4px = sm
- 8px = md
- 16px = lg
- 9999px = pill

Typography:
- Titles: 18-32px, Bold (700)
- Body: 14-16px, Regular (400)
- Caption: 10-12px, Regular (400)
- Mono (ISBN): 10-11px, Monospace

---

## CRITÉRIOS DE SUCESSO

✅ Tela 1 (Home Mobile) criada com todas as seções
✅ Tela 2 (Profile Mobile) criada com 3 abas funcionais
✅ BottomNav atualizado com 5º item
✅ Todos os componentes linkados corretamente
✅ Prototyping configurado para navegação
✅ Design tokens aplicados
✅ Responsivity configurada
✅ Publicado no Figma como "Ready for Dev"

---

## ENTREGÁVEL

Após completar:

1. Fornecer link direto das telas criadas:
   - URL Frame Home Mobile
   - URL Frame Profile Mobile
   - URL Frame Updated BottomNav

2. Confirmar estados:
   - [ ] Telas criadas
   - [ ] Prototyping ativo
   - [ ] Componentes linkados
   - [ ] Design tokens aplicados
   - [ ] Publicado

3. Mensagem de sucesso:
   "🟢 Telas adicionadas ao Figma | Home Mobile ✅ | Profile Mobile ✅ | BottomNav ✅ | Prototyping ✅"

---

## REFERÊNCIA TÉCNICA

Componentes já existentes no Figma para REUTILIZAR:
- NewsCard
- EventCard
- BookCard
- SectionHeader
- SearchField
- Button

Não criar duplicatas — usar as existentes.

---

## CONTEXTO ADICIONAL

Este projeto é o SIBiSC — app de biblioteca municipal para USP.
Stack: React 19 + React Router + CSS Modules + Figma MCP

Componentes React ja foram desenvolvidos em:
- /SIBiSC/src/pages/HomePageMobile.jsx (374 linhas)
- /SIBiSC/src/pages/UserProfilePage.jsx (300+ linhas)

Mock data 100% funcional:
- /SIBiSC/src/mocks/userProfile.js
- /SIBiSC/src/services/userProfileService.js
- /SIBiSC/src/services/homePageMobileService.js

Documentação:
- /SIBiSC/docs/TELAS_NOVAS.md
- /SIBiSC/docs/MOBILE_SCREENS_MOCKUP_GUIDE.md
- /SIBiSC/docs/FIGMA_SCREENS_SPEC.md

---

## EXECUÇÃO

Execute this task:
1. Use Figma MCP para criar frames, layers, components
2. Apply design tokens
3. Configure prototyping
4. Publish to Figma
5. Return confirmation message with links

100% automatizado. Nada manual.

---

**Criado por:** Rafael Feltrim
**Data:** 03 de Abril de 2026
**Framework:** Feltrim's Framework v2.0
**Projeto:** SIBiSC App — USP Biblioteca Municipal
```

---

## 🚀 COMO USAR

1. **Copie o prompt acima completo**
2. **Cole no chat com Antigravity** (ou outro agente Figma-capable)
3. **Envie com:** "Antigravity, por favor execute esta tarefa"
4. Antigravity usará Figma MCP para criar tudo automaticamente ✅

---

## 📌 Alternativa: Se Figma MCP não funcionar

```bash
# Use o Figma API diretamente via curl/Node
curl -X POST https://api.figma.com/v1/files/[FILE_ID]/components \
  -H "X-Figma-Token: [TOKEN]"
```

Mas o prompt está otimizado para **Figma MCP → Botão Flutante → Enviar ao Figma** como você usou antes!
