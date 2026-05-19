# Contrato de Integracao Multiagente - SIBiSC/Feltrim Agents

Ultima atualizacao: 2026-05-18  
Escopo: contratos de dados para prototipo frontend, mocks locais, services e futura integracao com backend/Supabase/catalogo oficial.

## 1. Objetivo

Este contrato estabiliza os dados compartilhados entre Front, Back/Dados, Produto e QA para que o Feltrim Agents recomende apenas livros verificaveis, mantenha rotas internas validas e prepare a troca futura dos mocks por fonte oficial sem reescrever as telas.

Premissas:

- O catalogo mockado em `src/mocks/books.js` e a fonte local de verdade enquanto nao houver integracao oficial.
- IDs canonicos de livros seguem o formato `b1..b8`.
- Recomendacoes so podem apontar para livros existentes no catalogo e com `availableCount > 0`.
- Dados de disponibilidade sao mockados e devem ser comunicados como prototipo quando exibidos ao usuario.
- Feltrim Agents deve orientar o usuario final; nao deve prometer reserva real, disponibilidade oficial ou IA generativa aberta sem contrato posterior.

## 2. IDs canonicos

| Entidade | Formato canonico | Fonte local | Rotas impactadas |
| --- | --- | --- | --- |
| Usuario | `user-001` | `src/mocks/userProfile.js` | `/perfil` |
| Livro | `b1..b8` | `src/mocks/books.js` | `/catalogo/:bookId` |
| Unidade | `u1..u4` | `src/mocks/units.js` | catalogo/detalhe |
| Evento | `e1..e7` | `src/mocks/events.js` | `/eventos/:eventId` |
| Noticia | `n1..n4` | `src/mocks/news.js` | `/noticias/:newsId` |
| Emprestimo | `loan-001...` | `src/mocks/userProfile.js` | `/perfil` |
| Historico | `hist-001...` | `src/mocks/userProfile.js` | `/perfil` |
| Favorito | `fav-001...` | `src/mocks/userProfile.js` | `/perfil` |
| Recomendacao | mesmo `book.id` | `userProfileService.getRecommendations()` | `/catalogo/:bookId` |

Regra P0: nenhum `bookId` usado por Perfil, Home, services ou recomendacoes pode sair do conjunto atual de `bookItems.map(book => book.id)`.

## 3. Usuario

Contrato minimo:

```js
{
  id: 'user-001',
  name: 'Joao Silva',
  email: 'joao.silva@email.com',
  unit: 'Biblioteca Central',
  joinDate: 'Janeiro de 2023',
  avatar: 'JS',
  phone: '(16) 3307-9400',
  membershipStatus: 'Ativo',
  readingPreferences: ReadingPreferences
}
```

Regras:

- `id` deve ser estavel e nao derivado de e-mail.
- `unit` deve corresponder ao nome de uma unidade conhecida ou ser tratado como texto legado.
- Dados pessoais nao devem ser usados em analytics sem consentimento futuro.
- `readingPreferences` e a unica parte do perfil usada hoje para recomendacoes.

## 4. Preferencias

Contrato minimo:

```js
{
  categories: ['Romance', 'Naturalismo', 'Memorialismo'],
  authors: ['Machado de Assis', 'Graciliano Ramos', 'Carolina Maria de Jesus'],
  topics: ['literatura brasileira', 'cidade e sociedade', 'classicos nacionais'],
  preferredUnit: 'Biblioteca Central'
}
```

Regras:

- `categories` deve comparar com `book.category`.
- `authors` deve comparar com `book.author`.
- `topics` pode comparar com `book.title`, `book.category` e `book.summary`.
- `preferredUnit` deve ser usado para ordenar ou explicar disponibilidade somente quando houver dado por unidade.
- Mudancas futuras de preferencias devem recomputar recomendacoes ou explicar por que nao houve sugestao segura.

## 5. Livro

Contrato minimo:

```js
{
  id: 'b1',
  category: 'Romance',
  title: 'Memorias Postumas de Bras Cubas',
  author: 'Machado de Assis',
  isbn: '978-85-359-0277-7',
  year: 1881,
  publisher: 'Companhia das Letras',
  pages: 256,
  summary: '...',
  inventory: Availability[]
}
```

Regras:

- `id` e a chave primaria de navegacao.
- `isbn` e informativo no prototipo; nao deve substituir `id`.
- `inventory` e obrigatorio para recomendacao por disponibilidade.
- Livros sem disponibilidade podem aparecer no catalogo, mas nao como recomendacao principal sem aviso.

## 6. Disponibilidade

Contrato minimo:

```js
{
  unitId: 'u1',
  available: 2,
  total: 3,
  callNumber: 'B869.3 M149m',
  shelf: 'Estante 800.1',
  distanceByNeighborhood: {
    Centro: '1.2km',
    'Vila Prado': '2.4km'
  }
}
```

Campos derivados:

- `availableCount`: soma de `inventory[].available`.
- `totalCount`: soma de `inventory[].total`.
- `available`: `availableCount > 0`.
- `nearestInventory`: menor distancia entre unidades com `available > 0`.

Regras:

- Distancias devem ser tratadas como mock; a futura integracao deve trocar string por numero normalizado em km.
- A UI nao deve afirmar disponibilidade oficial ate existir origem, timestamp e SLA de sync.
- Falha de catalogo oficial futura deve cair para estado honesto, nao para disponibilidade inventada.

## 7. Recomendacao

Contrato minimo retornado por `getRecommendations()`:

```js
{
  id: 'b3',
  bookId: 'b3',
  title: 'Dom Casmurro',
  author: 'Machado de Assis',
  isbn: '978-85-359-0376-7',
  category: 'Romance',
  reason: 'Autor presente nas preferencias do cadastro: Machado de Assis.',
  similarTo: '...',
  availableCount: 5,
  totalCount: 6,
  source: 'catalogo-mock'
}
```

Regras:

- `id` e `bookId` devem ser iguais ao `book.id` canonico.
- A recomendacao deve nascer de livro existente em `bookItems`.
- `availableCount` deve ser calculado do inventario atual, nao hardcoded fora do catalogo.
- Ordenacao recomendada: maior afinidade por autor, depois categoria, depois topicos, depois disponibilidade.
- `reason` deve ser especifico e compreensivel.
- Se nao houver livro disponivel, retornar lista vazia e a UI deve orientar busca manual.

## 8. Feedback Sofia/Claudia

Contrato minimo futuro:

```js
{
  id: 'fb-001',
  receivedBy: 'Sofia',
  userId: 'user-001',
  route: '/catalogo/b3',
  type: 'recomendacao_ruim',
  severityHint: 'P1',
  description: 'Recomendacao nao parecia relacionada ao interesse.',
  expected: 'Sugestao alinhada a preferencia cadastrada.',
  observed: 'Sugestao generica.',
  device: 'mobile',
  browser: 'Chrome',
  status: 'recebido',
  createdAt: '2026-05-18T00:00:00.000Z'
}
```

Regras:

- Sofia classifica impacto percebido.
- Claudia registra contexto, passos, evidencia e status.
- QA define severidade tecnica.
- PO decide prioridade de produto.
- Feedback de recomendacao deve guardar `bookId`, `reason` exibido e se houve clique no detalhe.
- Nao registrar dados sensiveis sem necessidade.

## 9. Gamificacao

Contrato minimo futuro:

```js
{
  userId: 'user-001',
  achievements: [
    {
      id: 'ach-literatura-brasileira-1',
      title: 'Explorador de Literatura Brasileira',
      progress: 2,
      target: 3,
      sourceActions: ['favorite_book', 'open_book_detail'],
      publicRanking: false
    }
  ]
}
```

Regras:

- Gamificacao deve ser inclusiva, sem ranking publico e sem punicao.
- Conquistas devem depender de acoes rastreaveis e IDs validos.
- Nenhuma conquista pode disparar por livro inexistente, rota quebrada ou feedback sem dono.
- Dados de gamificacao nao devem virar criterio para bloquear uso do catalogo.

## 10. Decisoes de dados desta rodada

- Perfil foi alinhado para usar `bookId` canonico `b1..b8` em emprestimos, historico e favoritos.
- Itens de Perfil que nao existiam no catalogo local foram substituidos por livros existentes.
- Favoritos passaram a refletir contagens coerentes com `inventory` do catalogo.
- `getRecommendations()` passou a retornar livros reais, disponiveis e com `id` navegavel para `/catalogo/:bookId`.
- `getFavoritesWithStatus()` deixou de sortear disponibilidade aleatoria e passou a derivar status do catalogo mockado.
- Dados referenciais de `homePageMobileData.js` foram alinhados a IDs canonicos de livros, eventos e noticias.
- `UserProfilePage.jsx` passou a carregar perfil, emprestimos, historico, favoritos e preferencias de notificacao via `userProfileService.js`.
- A Home passou a renderizar recomendacoes Feltrim Agents a partir de `getRecommendations()`, preservando `bookId` navegavel e disponibilidade derivada do catalogo mockado.
- `qa:repo` passou a auditar IDs canonicos, referencias de Perfil/Home e recomendacoes contra `src/mocks/books.js`.

## 11. Pendencias de integracao

Front:

- Revalidar `UserProfilePage.jsx` em smoke manual apos a migracao para `userProfileService.js`.
- Manter o padrao ja materializado de favorito como `article` com `Link` e botao separado; revalidar para evitar regressao para botao dentro de `Link`.
- Replicar semantica acessivel em filtros/pills fora do Perfil, quando aplicavel.
- Exibir feedback perceptivel para buscar/calendario e manter feedback de renovar/remover.
- Deixar claro na UI quando disponibilidade e recomendacao usam dados mockados.

QA:

- Manter auditoria automatizada de IDs entre `books`, Perfil, Home, services e rotas no `qa:repo`.
- Revalidar fluxo Perfil -> Emprestimos/Historico/Favoritos -> Detalhe de livro.
- Revalidar Home -> Recomendacao -> Detalhe de livro.
- Revalidar que recomendacoes nao incluem livros indisponiveis ou inexistentes.
- Revalidar que o botao Remover dos favoritos nao esta aninhado em `Link` e que tabs do Perfil mantem semantica acessivel.
- Atualizar matriz US x testes com recomendacao, preferencias, feedback Sofia/Claudia e gamificacao.

Back/Dados:

- Definir fonte de verdade futura: SIBI/PHL, Supabase, API propria ou importacao controlada.
- Adicionar `updatedAt`/`source` para disponibilidade oficial.
- Definir reconciliacao entre cache local e catalogo oficial.
- Planejar IDs estaveis para exemplar fisico quando reserva real entrar no escopo.

## 12. Riscos

| Risco | Impacto | Mitigacao |
| --- | --- | --- |
| IDs divergentes voltarem em novos mocks | Link quebrado em rotas criticas | Guard automatizado no `qa:ci` |
| Recomendacao parecer oficial sem ser | Perda de confianca do usuario | Microcopy de prototipo e fonte `catalogo-mock` |
| Disponibilidade mockada ser confundida com dado real | Deslocamento indevido ate unidade | Exibir origem e timestamp quando houver integracao |
| Perfil continuar importando mocks diretos | Services divergem da tela | Refatorar pagina para usar service unico |
| Feedback Sofia/Claudia ficar fora do produto | Falta de rastreabilidade | Contrato de feedback e template operacional |
| Gamificacao entrar antes da base de dados | Conquistas incorretas | Fasear apos IDs, analytics e feedback confiaveis |

## 13. Checklist de aceite do contrato

- [x] IDs de Perfil usam `b1..b8`.
- [x] Recomendacoes usam livros existentes e disponiveis.
- [x] Favoritos nao sorteiam disponibilidade.
- [x] Home mobile de referencia usa IDs canonicos.
- [x] Front consome service de Perfil em vez de mocks diretos.
- [x] QA possui guard automatizado de consistencia de IDs.
- [ ] Fonte oficial, timestamp e sync ainda precisam de decisao.
