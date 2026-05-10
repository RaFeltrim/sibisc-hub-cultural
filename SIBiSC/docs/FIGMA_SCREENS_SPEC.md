# Figma Screens Specification — SIBiSC Mobile

**Para adicionar ao Figma:** https://www.figma.com/design/7HlVm9sJ0ffToiUwO69QO6/-USP--SIBiSC-App

---

## 📱 Tela 1: Home Mobile

**Frame Name:** `🏠 Home - Mobile`  
**Size:** 375 x 812 (iPhone 12)  
**Device:** Mobile Portrait

### Hierarquia de Componentes

```
Home - Mobile [Frame 375x812]
├── Hero Section
│   ├── Title "Bem-vindo ao SIBiSC"
│   ├── Subtitle "Sua biblioteca municipal ao alcance da mão"
│   └── Background Gradient (135deg)
├── Search Field
│   ├── Input "Título, autor ou ISBN"
│   ├── Search Icon
│   └── [Opcional] Quick Results Dropdown
├── Quick Actions [Grid 3 cols]
│   ├── Card 1: 📚 Catálogo
│   ├── Card 2: 📅 Agenda
│   └── Card 3: 📰 Notícias
├── Section: Últimas Notícias
│   ├── SectionHeader (eyebrow + title + link)
│   └── News Stack [vertical]
│       ├── NewsCard 1
│       ├── NewsCard 2
│       └── NewsCard 3
├── Section: Próximos Encontros
│   ├── SectionHeader
│   └── Events Stack [vertical]
│       ├── EventCard 1
│       ├── EventCard 2
│       └── EventCard 3
└── Section: Livros em Destaque
    ├── SectionHeader
    └── Books Grid [2 cols auto-fit]
        ├── BookCard 1 (O Cortiço)
        ├── BookCard 2 (Dom Casmurro)
        ├── BookCard 3 (Memórias...)
        └── BookCard 4 (Quincas Borba)
```

### Styling

| Elemento | Token | Valor |
|----------|-------|-------|
| Hero Background | gradient | `135deg rgba(197,95,52,0.12) → rgba(16,37,63,0.08)` |
| Hero Title | font-size | clamp(1.5rem, 4vw, 2rem) |
| Hero Title | color | --color-ink-strong |
| Quick Action Card | background | rgba(16,37,63,0.04) |
| Quick Action Card | border | 1px solid rgba(16,37,63,0.1) |
| Quick Action Icon | font-size | 1.8rem |
| Section Gap | space | var(--space-lg) |

### Interactive States

- ✅ Search input → shows quick results dropdown
- ✅ Search empty → clears dropdown
- ✅ Cards on hover → subtle shadow increase
- ✅ Cards on tap → background color change

---

## 👤 Tela 2: User Profile

**Frame Name:** `👤 Profile - Mobile`  
**Size:** 375 x 812 (iPhone 12)  
**Device:** Mobile Portrait

### Hierarquia de Componentes

```
Profile - Mobile [Frame 375x812]
├── User Header Section
│   ├── Avatar Circle (60x60) "👤"
│   ├── User Info
│   │   ├── Name "João Silva"
│   │   ├── Unit "Biblioteca Central"
│   │   ├── Email "joao.silva@email.com"
│   │   └── Member Since "Janeiro de 2023"
│   └── Settings Card
│       └── Checkbox + Label "Receber notificações..."
│           └── Hint "Receberá alerta 3 dias antes"
├── Tabs Navigation [sticky]
│   ├── Tab 1: "Empréstimos" [badge 2]
│   ├── Tab 2: "Histórico"
│   └── Tab 3: "Favoritos" [badge 4]
└── Tab Content Area
    ├── [TAB 1] Loans
    │   └── Loan Stack [vertical]
    │       ├── Loan Card 1
    │       │   ├── Cover Box (60x80, color)
    │       │   ├── Title "O Cortiço"
    │       │   ├── Author "Aluísio Azevedo"
    │       │   ├── ISBN
    │       │   ├── Badge "📅 Devolve em 5 dias"
    │       │   └── Renew Button 🔄 [right]
    │       ├── Loan Card 2 (12 dias)
    │       └── Loan Card 3 (OVERDUE) ⚠️
    │
    ├── [TAB 2] History
    │   └── Timeline [vertical]
    │       ├── Timeline Item 1
    │       │   ├── Marker (dot)
    │       │   ├── Title "Quincas Borba"
    │       │   ├── Author "Machado de Assis"
    │       │   └── Meta "📍 Unit | 📅 Date | 📚 Days"
    │       ├── Timeline Item 2
    │       ├── Timeline Item 3
    │       ├── Timeline Item 4
    │       └── Timeline Item 5
    │
    └── [TAB 3] Favorites
        └── Favorites List [vertical]
            ├── Favorite Card 1
            │   ├── Title "São Bernardo"
            │   ├── Author "Graciliano Ramos"
            │   ├── Badge "✓ 2 de 3 disponíveis"
            │   └── Heart Button ♥️ [right]
            ├── Favorite Card 2
            ├── Favorite Card 3
            └── Favorite Card 4
```

### Styling

| Elemento | Token | Valor |
|----------|-------|-------|
| User Header | background | linear-gradient(135deg, rgba(197,95,52,0.1), rgba(16,37,63,0.08)) |
| Avatar | size | 60x60 |
| Avatar | background | rgba(255,255,255,0.6) |
| Tabs Nav | position | sticky top-0 |
| Tabs Nav | border-bottom | 1px solid rgba(16,37,63,0.1) |
| Tab Active | border-bottom | 2px solid --color-accent-strong |
| Tab Badge | background | --color-accent |
| Tab Badge | color | white |
| Loan Card | background | rgba(16,37,63,0.04) |
| Loan Card Overdue | background | rgba(200,80,80,0.08) |
| Loan Card Overdue | border | 1px solid rgba(200,80,80,0.3) |
| Due Badge Active | background | rgba(100,150,100,0.2) |
| Due Badge Overdue | background | rgba(200,80,80,0.2) |
| Timeline Marker | background | --color-accent |
| Timeline Line | border-left | 2px solid rgba(16,37,63,0.1) |
| Favorite Available | badge-bg | rgba(100,150,100,0.2) |
| Favorite Unavailable | badge-bg | rgba(200,150,100,0.2) |

### Interactive States

- ✅ Tab click → content switches
- ✅ Tab active → underline + color change
- ✅ Renew button (🔄) → updates dueDate
- ✅ Heart button (♥️) → removes favorite
- ✅ Loan cards → hover/tap effect
- ✅ Timeline items → clickable to book detail

---

## 🎨 Design Tokens Utilizados

### Colors
```
--color-accent: Primary action color
--color-accent-strong: Strong accent (links, active states)
--color-ink-strong: Strong text (titles)
--color-ink-soft: Soft text (subtitles, meta)
--color-bg: Background base
--color-warn: Warning states (overdue)
```

### Spacing
```
--space-xs: 0.5rem
--space-sm: 0.75rem
--space-md: 1rem
--space-lg: 1.5rem
--space-xl: 2rem
```

### Radius
```
--radius-sm: 0.25rem
--radius-md: 0.5rem
--radius-lg: 1rem
--radius-pill: 9999px
```

### Shadow
```
--shadow-soft: 0 2px 8px rgba(0,0,0,0.1)
```

---

## 📐 Component Library Reference

### Existing Components (from Figma)

Reutilizar se existirem:
- [ ] NewsCard component
- [ ] EventCard component
- [ ] BookCard component
- [ ] SectionHeader component
- [ ] SearchField component
- [ ] Badge component
- [ ] Button component

### New Components Needed

- [ ] QuickActionCard (3-column grid)
- [ ] LoanCard (with renew button)
- [ ] TimelineItem (with marker)
- [ ] FavoriteCard (with heart button)
- [ ] UserHeader (avatar + info + settings)
- [ ] TabsNavigation (sticky tabs with badges)

---

## 📍 Flows & States

### Home Mobile Flow
```
User opens app
  ↓
Hero section loads with search
  ↓
User can:
  1. Search (with quick results)
  2. Tap quick action (Catálogo/Agenda/Notícias)
  3. Scroll to see News/Events/Featured Books
  4. Click any card to detail page
```

### Profile Flow
```
User taps "Perfil" in BottomNav
  ↓
Profile page loads with 3 tabs
  ↓
User can:
  1. View active loans (with renew option)
  2. See loan history (timeline)
  3. Manage favorites (remove)
  4. Toggle notifications
  5. Tap any book to detail page
```

---

## 🔄 Data Binding

### Home Mobile
```
Hero.title = "Bem-vindo ao SIBiSC"
SearchField.value = user input (debounce 180ms)
SearchField.results = quickSearch(query)

NewsSection.items = mockNews.slice(0, 3)
EventsSection.items = mockEvents.slice(0, 3)
BooksSection.items = mockBooks.slice(0, 4)
```

### Profile
```
UserHeader.name = mockUser.name
UserHeader.unit = mockUser.unit
UserHeader.email = mockUser.email
UserHeader.avatar = mockUser.avatar

Loans Tab:
  LoanCard.items = mockLoans.filter(status === 'active')
  LoanCard.daysLeft = daysUntilDue(dueDate)
  LoanCard.isOverdue = daysLeft < 0
  RenewButton.onClick = renewLoan(loanId)

History Tab:
  TimelineItem.items = mockLoanHistory
  TimelineItem.returnedDate = item.returnedDate
  TimelineItem.daysHeld = item.daysHeld

Favorites Tab:
  FavoriteCard.items = mockFavorites
  FavoriteCard.available = item.available
  HeartButton.onClick = removeFavorite(favoriteId)
```

---

## ✅ Checklist para Adicionar ao Figma

### Tela: Home Mobile
- [ ] Create frame 375 x 812
- [ ] Add Hero section with gradient
- [ ] Add SearchField component
- [ ] Add Quick Actions grid (3 cards)
- [ ] Add News Section (SectionHeader + 3 NewsCards)
- [ ] Add Events Section (SectionHeader + 3 EventCards)
- [ ] Add Books Section (SectionHeader + 4 BookCards in 2-col grid)
- [ ] Apply responsive constraints
- [ ] Add links/prototypes to card interactions
- [ ] Set up auto-layout for sections

### Tela: Profile
- [ ] Create frame 375 x 812
- [ ] Add User Header (avatar + info + settings)
- [ ] Add Tabs Navigation (sticky, 3 tabs)
- [ ] Add Tab 1: Loans
  - [ ] Add 3 LoanCards with different states
  - [ ] Add Renew buttons
- [ ] Add Tab 2: History
  - [ ] Add Timeline with 5 items
  - [ ] Add timeline markers and line
- [ ] Add Tab 3: Favorites
  - [ ] Add 4 FavoriteCards
  - [ ] Mix available/unavailable states
  - [ ] Add heart buttons
- [ ] Apply responsive constraints
- [ ] Add tab switching interactions
- [ ] Set up auto-layout

### BottomNav Update
- [ ] Add 5th nav item: "Perfil"
- [ ] Add profile icon SVG
- [ ] Update states (active/inactive)

---

## 📞 Instructions para Manual Addition

Se Figma MCP não disponível, adicionar manualmente:

1. **Abrir Figma:** https://www.figma.com/design/7HlVm9sJ0ffToiUwO69QO6
2. **Pages:**
   - [ ] Criar página "Mobile Screens"
3. **Frames:**
   - [ ] Frame: "🏠 Home - Mobile" (375x812)
   - [ ] Frame: "👤 Profile - Mobile" (375x812)
4. **Componentes:**
   - [ ] Reutilizar NewsCard, EventCard, BookCard
   - [ ] Criar novos se necessário
5. **Prototyping:**
   - [ ] Search input → mostra resultados
   - [ ] Tabs → switching content
   - [ ] Cards → link para detail pages
6. **Publicar:**
   - [ ] Marcar como "Ready for Dev"

---

**Status:** 📋 Especificação completa pronta para Figma

Compartilhe este documento com o designer para adicionar as telas, ou use como guia para import via Figma API.
