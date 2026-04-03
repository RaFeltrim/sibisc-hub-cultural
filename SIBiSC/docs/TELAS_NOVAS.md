# Novas Telas — SIBiSC Mobile

**Data:** 03 de Abril de 2026  
**Status:** Implementadas  
**Stakeholder:** Equipe de Desenvolvimento

---

## 1. HomePageMobile (Rota: `/home-mobile`)

### Objetivo
Criar uma tela de início otimizada para mobile que se diferencia da versão web desktop-first.

### Características
- **Mobile Hero:** Seção compacta com título "Bem-vindo ao SIBiSC"
- **Search Field:** Campo de busca com resultados rápidos em tempo real
- **Quick Actions:** 3 cards com acesso rápido (Catálogo, Agenda, Notícias)
- **Stack Layout:** Seções empilhadas verticalmente
  - Últimas Notícias (cards compactos)
  - Próximos Encontros (eventos)
  - Livros em Destaque (grid responsivo)

### Responsividade
- **Mobile (< 640px):** Layout vertical, 1 coluna, grid 3 cards quick actions
- **Tablet+ (640px+):** Layout adaptável, 2 colunas onde apropriado, grid 4 quick actions

### Imports
```jsx
import HomePageMobile from '../pages/HomePageMobile';
// Router: <Route path="/home-mobile" element={<HomePageMobile />} />
```

---

## 2. UserProfilePage (Rota: `/perfil`)

### Objetivo
Implementar tela de perfil do usuário com gestão de empréstimos, histórico e favoritos.

### Seções

#### 2.1 User Header
- **Avatar:** Emoji user (♤)
- **Info Card:** Nome, unidade, email, data de adesão
- **Settings:** Toggle para notificações de devolução

#### 2.2 Tabs Navigation
3 abas principais:

**A) Empréstimos Ativos**
- Lista de livros emprestados
- Badge com número de empréstimos
- Cards com:
  - Capa colorida (mockData)
  - Título e autor
  - Status: "Devolve em X dias" ou "Atrasado por X dias"
  - Data de devolução
- Visual diferente para atrasados (border + background warn)

**B) Histórico**
- Timeline vertical de devoluções anteriores
- Cada item mostra:
  - Título e autor
  - Data de devolução
  - Quantos dias manteve o livro
- Cards interativos (link para livro)

**C) Favoritos**
- Lista de livros marcados como favoritos
- Badge com número de favoritos
- Cada card mostra:
  - Título e autor
  - Status: "Disponível" ou "Indisponível"
  - Botão de coração (removedor de favorito)
- Empty state se não houver favoritos

### Mock Data
- **Usuário:** João Silva (email, unidade Central)
- **Empréstimos:** 3 (2 ativos, 1 atrasado)
- **Histórico:** 3 devoluções anteriores
- **Favoritos:** 3 livros (2 disponíveis, 1 indisponível)

### Imports
```jsx
import UserProfilePage from '../pages/UserProfilePage';
// Router: <Route path="/perfil" element={<UserProfilePage />} />
```

---

## 3. BottomNav — Atualizado

### Mudança
Adicionada 5ª aba: **Perfil** (`/perfil`)

### Icon
SVG circular com ícone de usuário dentro (consistente com outras abas)

### Ordem
1. Inicio (/)
2. Noticias (/noticias)
3. Eventos (/eventos)
4. Catalogo (/catalogo)
5. Perfil (/perfil) ← **NOVO**

---

## 4. Estrutura de Arquivos Criados

```
SIBiSC/src/
├── pages/
│   ├── HomePageMobile.jsx           ← NOVO
│   ├── HomePageMobile.module.css    ← NOVO
│   ├── UserProfilePage.jsx          ← NOVO
│   └── UserProfilePage.module.css   ← NOVO
├── routes/
│   └── AppRouter.jsx                ← ATUALIZADO (2 rotas novas)
└── components/layout/
    └── BottomNav.jsx                ← ATUALIZADO (icon 'profile' + item novo)
```

---

## 5. Pontos de Integração Futura

### Supabase RLS
- Tela de Perfil precisa autenticação real
- `SELECT * FROM user_profile WHERE user_id = auth.uid()`
- Histórico e favoritos vêm de tabelas de empréstimos

### Notificações
- Toggle de notificações deve salvar em `user_preferences`
- Integrar com n8n para enviar push quando livro vai vencer

### Dados Reais
- Substituir `mockReservas`, `mockHistorico`, `mockFavoritos` por chamadas de serviço
- Criar `userProfileService.js` similar aos outros

---

## 6. Design Tokens Utilizados

### Cores
- `--color-accent`: Links e botões principais
- `--color-accent-strong`: Textos acentuados
- `--color-ink-strong`: Títulos
- `--color-ink-soft`: Subtítulos e meta

### Espaçamento
- `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`

### Radius
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`

### Shadows
- `--shadow-soft`: Cards e elementos elevados

---

## 7. Testes Propostos

```gherkin
Scenario: Visualizar empréstimos ativos
  Given usuário logado
  When acessa /perfil
  And clica na aba "Empréstimos Ativos"
  Then vê lista de livros emprestados
  And vê status de devolução (dias restantes)
  And vê visual diferente para atrasados

Scenario: Favoritar um livro
  Given na tela de perfil, aba Favoritos
  When clica no botão de coração
  Then livro é removido da lista
  And notificação de sucesso aparece

Scenario: Histórico de empréstimos
  Given acessa aba Histórico
  Then vê timeline com devoluções passadas
  And pode clicar para retornar ao livro
```

---

## 8. Checklist para Finalização

- [x] HomePageMobile criada
- [x] UserProfilePage criada
- [x] CSS modules criados
- [x] Rotas adicionadas
- [x] BottomNav atualizado com ícone
- [ ] Testar em dispositivos reais/emulador
- [ ] Conectar dados reais do Supabase
- [ ] Implementar autenticação real
- [ ] Design review com stakeholder
- [ ] Deploy em staging

---

**Próximas Ações:**
1. Validar telas no Figma
2. Integrar com dados reais
3. Implementar autenticação
4. User testing mobile
