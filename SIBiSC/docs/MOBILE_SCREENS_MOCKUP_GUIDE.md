# Mobile Screens Mockup Guide

**Data:** 03 de Abril de 2026  
**Status:** Completamente Mockado ✅  
**Arquitetura:** Separation of Concerns (Mock Data → Services → Components)

---

## Estrutura de Mocks

```
src/
├── mocks/
│   ├── userProfile.js                 ← Dados completos de usuário
│   └── homePageMobileData.js          ← Dados de homepage
│
├── services/
│   ├── userProfileService.js          ← API mock para perfil
│   └── homePageMobileService.js       ← API mock para home
│
└── pages/
    ├── UserProfilePage.jsx            ← Utiliza userProfileService
    └── HomePageMobile.jsx             ← Utiliza homePageMobileService
```

---

## 1. UserProfile — Stack Completo

### Dados Mockados (mocks/userProfile.js)

```javascript
mockUser = {
  id, name, email, unit, joinDate, avatar, phone, membershipStatus
}

mockLoans = [
  { id, bookId, title, author, isbn, dueDate, borrowedDate, status, coverColor, unit, renewalCount, canRenew }
  // 3 empréstimos: 2 ativos, 1 atrasado
]

mockLoanHistory = [
  { id, bookId, title, author, isbn, returnedDate, borrowedDate, daysHeld, unit, status, daysLate }
  // 5 devoluções históricas (algumas atrasadas)
]

mockFavorites = [
  { id, bookId, title, author, isbn, available, availableCount, totalCount, addedDate, lastBorrowed, coverColor }
  // 4 livros favoritos (3 disponíveis, 1 não)
]

mockNotificationPreferences = {
  dueDate, dueDate_days: 3, overdue, availableBook, email, sms, push
}
```

### Serviço Mock (services/userProfileService.js)

```javascript
// Métodos principais:
getUserProfile()                           // → mockUser
getUserLoans()                             // → mockLoans
getLoanHistory(limit, offset)              // → mockLoanHistory[]
getUserFavorites()                         // → mockFavorites[]
getNotificationPreferences()               // → mockNotificationPreferences

// Ações:
renewLoan(loanId)                          // Atualiza dueDate (+14 dias)
addFavorite(bookId, data)                  // Adiciona à lista
removeFavorite(favoriteId)                 // Remove da lista

// Análises:
getUserStatistics()                        // totalBorrowed, avgDays, etc
getRecommendations()                       // Baseado em histórico
exportProfileData()                        // Exporta tudo
```

### Componente (pages/UserProfilePage.jsx)

```jsx
<UserProfilePage>
  ├── User Header
  │   ├── Avatar (👤)
  │   ├── Info (nome, unit, email, joined)
  │   └── Settings (toggle notificações)
  │
  ├── Tabs Navigation
  │   ├── Empréstimos (badge com count)
  │   ├── Histórico
  │   └── Favoritos (badge com count)
  │
  └── Tab Content
      ├── Loans → Loan Cards com renew 🔄
      ├── History → Timeline view
      └── Favorites → Grid com ♥️ remove
```

**Estados:**
- ✅ Empréstimos ativos com status
- ✅ Empréstimos atrasados com alerta ⚠️
- ✅ Renovação funcional (com limite)
- ✅ Histórico com timeline
- ✅ Favoritos com disponibilidade
- ✅ Remoção de favoritos (live update)

---

## 2. HomePageMobile — Stack Completo

### Dados Mockados (mocks/homePageMobileData.js)

```javascript
mockHomeContent = {
  sections: [
    { id: 'hero', type: 'hero', title, subtitle },
    { id: 'quick-actions', type: 'actions', actions: [] },
    { id: 'news-section', eyebrow, title, linkTo },
    // ...
  ],

  featuredBooks: [
    { id, title, author, isbn, year, available, availableCount }
    // 4 livros
  ],

  upcomingEvents: [
    { id, title, date, time, location, category, attendees }
    // 3 eventos
  ],

  latestNews: [
    { id, title, excerpt, date, category, featured }
    // 3 notícias
  ]
}
```

### Serviço Mock (services/homePageMobileService.js)

```javascript
// Busca principal:
getHomepageContent()                       // → Estrutura completa

// Seções individuais:
getFeaturedBooks(limit)                    // → books[]
getUpcomingEvents(limit)                   // → events[]
getLatestNews(limit)                       // → news[]
getFeaturedNews()                          // → featured news

// Utilitários:
quickSearch(query)                         // → Busca em tempo real
getSearchSuggestions()                     // → Popular searches
getPopularCategories()                     // → Categories
getLibraryStats()                          // → Units, books, members
getHomepageBanners()                       // → Promotional banners
getUserTestimonials()                      // → Reviews

// Filtrado:
getUpcomingEventsWithDetails(daysAhead)    // → Eventos nos próximos N dias
```

### Componente (pages/HomePageMobile.jsx)

```jsx
<HomePageMobile>
  ├── Mobile Hero
  │   ├── Title + subtitle
  │   ├── SearchField (com quick results)
  │   └── Search results (dropdown)
  │
  ├── Quick Actions
  │   ├── 📚 Catálogo
  │   ├── 📅 Agenda
  │   └── 📰 Notícias
  │
  ├── Sections (stacked)
  │   ├── News Section
  │   ├── Events Section
  │   └── Featured Books Section
  │
  └── Each clickable to detail pages
```

**Estados:**
- ✅ Hero compacto (mobile-optimized)
- ✅ Search com debounce
- ✅ Quick results dropdown
- ✅ Quick action cards
- ✅ Responsive grid/stack

---

## 3. BottomNav — Atualizado

```javascript
navItems = [
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/noticias', label: 'Noticias', icon: 'news' },
  { to: '/eventos', label: 'Eventos', icon: 'calendar' },
  { to: '/catalogo', label: 'Catalogo', icon: 'books' },
  { to: '/perfil', label: 'Perfil', icon: 'profile' },  // ← NOVO
]
```

---

## Como Usar os Mocks

### Opção 1: Chamar Serviços (Recomendado)

```jsx
import { getUserProfile, getUserLoans } from '../services/userProfileService';

function UserProfilePage() {
  useEffect(() => {
    (async () => {
      const profile = await getUserProfile();
      const loans = await getUserLoans();
      // setState...
    })();
  }, []);
}
```

### Opção 2: Importar Dados Diretos

```jsx
import { mockUser, mockLoans } from '../mocks/userProfile';

// Acesso direto (sem delay)
console.log(mockUser);
```

### Opção 3: Modificar Dados (Stateful)

```jsx
const [loans, setLoans] = useState(mockLoans);
const [favorites, setFavorites] = useState(mockFavorites);

const handleRenew = (id) => {
  renewBook(id); // Modifica mock
  setLoans([...loans]); // Atualiza UI
};
```

---

## Migração para Dados Reais

### Passo 1: Trocar Imports

```javascript
// Antes:
import { getUserLoans } from '../services/userProfileService';

// Depois:
import { getUserLoans } from '../services/supabaseService';
// (ou implementar a chamada Supabase direto)
```

### Passo 2: Mesmo Interface

Os serviços mock mantêm a mesma interface das chamadas reais:

```javascript
// Mock:
await getUserLoans() → Promise<Array>

// Real (Supabase):
await supabase.from('loans').select('*') → Promise<Array>
```

### Passo 3: Adicionar Error Handling

```javascript
try {
  const loans = await getUserLoans();
  setLoans(loans);
} catch (error) {
  setError(error.message);
}
```

---

## Dados Disponíveis

### UserProfile

- **User:** Nome, email, unidade, data de adesão, avatar
- **Loans:** 3 (2 ativos, 1 atrasado)
  - Ativo 1: 5 dias para vencer
  - Ativo 2: 12 dias para vencer
  - Atrasado: 2 dias de atraso
- **History:** 5 devoluções
  - 4 no prazo
  - 1 atrasada
- **Favorites:** 4 livros
  - 3 disponíveis
  - 1 indisponível
- **Notifications:** Toggle + preferências

### HomePageMobile

- **Featured Books:** 4 títulos
- **Upcoming Events:** 3 próximos eventos
- **Latest News:** 3 notícias recentes
- **Stats:** Units, books, members, visitors
- **Categories:** 6 categorias populares
- **Search Suggestions:** 8 termos populares

---

## Testando os Mocks

### Teste 1: Renovação

1. Abra `/perfil`
2. Vá para aba "Empréstimos"
3. Clique 🔄 em um livro que permite renovação
4. Observe dueDate atualizada (+14 dias)
5. Botão desativa após 2 renovações

### Teste 2: Favoritos

1. Abra `/perfil`
2. Vá para aba "Favoritos"
3. Clique ♥️ para remover
4. Observe lista atualizar em tempo real
5. Contador no badge decresce

### Teste 3: Busca Mobile

1. Abra `/home-mobile`
2. Digite no search field
3. Observe resultados aparecerem (debounce 180ms)
4. Clique para ir ao livro
5. Busca vazia limpa resultados

### Teste 4: Responsividade

1. Abra em mobile (< 640px)
2. Observe layout single-column
3. Redimensione para tablet (> 640px)
4. Observe grid 2+ colunas

---

## Performance

Todos os serviços simulam:
- **Delay realista:** 300ms (simula latência de rede)
- **Debounce em search:** 180ms
- **Paginação:** limit/offset supported
- **Lazy loading:** Seções carregam conforme necessário

---

## Checklist de Mocks

- [x] mockUser com perfil completo
- [x] mockLoans com 3 estados (ativo, ativo, atrasado)
- [x] mockLoanHistory com 5 devoluções
- [x] mockFavorites com 4 livros (mix disponibilidade)
- [x] mockNotificationPreferences com 6 toggles
- [x] userProfileService com 15+ métodos
- [x] homePageMobileService com 12+ métodos
- [x] Componentes totalmente funcionais
- [x] CSS responsivo
- [x] Rotas adicionadas (/home-mobile, /perfil)
- [x] BottomNav com icon de profile
- [x] Documentação completa

---

## Próximos Passos (Não Bloqueantes)

1. **Supabase Integration**
   - Criar tabelas: users, loans, loan_history, favorites
   - Implementar RLS
   - Conectar services ao Supabase

2. **Real Authentication**
   - Substituir mockUser por auth.user()
   - Filtrar dados por user_id

3. **Push Notifications**
   - Implementar n8n webhook
   - Enviar notificação 3 dias antes de vencer

4. **Advanced Features**
   - Estatísticas gráficas (histórico por mês)
   - Recomendações com IA
   - Social sharing

---

**Status:** 🟢 Pronto para demonstração e testes de UX

Tudo está mockado, funcional e documentado para facilitar integração futura com dados reais.
