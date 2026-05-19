# Notas de Integracao Frontend - Feltrim Agents

Ultima atualizacao: 2026-05-18

## Escopo desta rodada

Esta rodada estabiliza a experiencia frontend do SIBiSC/Feltrim Agents sem prometer backend de IA real. O assistente deve ser apresentado como camada guiada de orientacao do usuario, usando dados locais do catalogo, eventos, noticias e perfil mockado enquanto nao houver contrato oficial com backend, Supabase ou catalogo institucional.

## Decisoes implementadas

- Feltrim Agents comunica ajuda concreta para busca, duvidas de uso, recomendacoes por preferencias, eventos e noticias, sempre como prototipo guiado.
- A busca assistida em Home, Home Mobile e Catalogo agora retorna feedback perceptivel em regiao `aria-live` ao acionar Buscar/Explorar.
- Recomendacoes e disponibilidade continuam baseadas em mocks locais; a UI informa esse limite quando ha risco de expectativa de IA, reserva ou disponibilidade real.
- Recomendacoes exibidas na Home agora usam `userProfileService.getRecommendations()`, que deriva IDs e disponibilidade do catalogo local.
- A pagina de Perfil agora consome `userProfileService.js` para perfil, emprestimos, historico, favoritos, notificacoes, renovacao e remocao de favoritos.
- Tabs do Perfil usam semantica `tablist`/`tab`/`tabpanel`; filtros e seletores de bairro usam `aria-pressed`.
- Favoritos no Perfil separa o link do livro do botao Remover, evitando interacao aninhada.
- IDs de emprestimos, historico e favoritos devem apontar somente para livros existentes em `src/mocks/books.js` (`b1` a `b8` nesta versao).
- `qa:repo` inclui auditoria automatizada para IDs de Perfil/Home e recomendacoes Feltrim Agents contra `src/mocks/books.js`.

## Dependencias de dados

- `bookId` em `mockLoans`, `mockLoanHistory` e `mockFavorites` deve existir em `bookItems`.
- Recomendacoes do Feltrim Agents devem usar livros existentes e preferencialmente com `totalAvailable > 0`.
- `UserProfilePage.jsx` deve continuar consumindo dados/actions por `userProfileService.js`; acesso direto aos mocks deve ser excecao documentada.
- Qualquer futura integracao oficial deve preservar campos minimos de livro: `id`, `title`, `author`, `isbn`, `category`, `summary`, `inventory`, `unitId`, `available`, `total`, `callNumber` e `shelf`.
- Disponibilidade exibida ao usuario deve ter fonte e data de atualizacao quando sair dos mocks.
- Eventos usados no Google Calendar precisam conter `title`, `date`, `startTime`, `endTime`, `locationName`, `locationAddress` e `description`.

## Pontos para QA

- Validar Home -> resultado assistido -> detalhe de livro.
- Validar Catalogo com termo existente, termo inexistente e submit vazio.
- Validar Perfil -> Emprestimos/Historico/Favoritos -> detalhe de livro sem 404.
- Validar remocao de favorito sem navegacao acidental.
- Validar leitor de tela/teclado em filtros, seletores de bairro e tabs.
- Validar "Abrir Google Calendar" com feedback visivel e URL contendo timezone `America/Sao_Paulo`.

## Limites conhecidos

- Nao ha chat aberto, modelo de IA, memoria, autenticacao, persistencia real, reserva real ou sincronizacao com catalogo oficial.
- Feedback de usuario Sofia/Claudia segue documentado no processo de QA, mas ainda nao ha formulario in-app.
- Preferencias do leitor continuam mockadas e nao editaveis nesta rodada.
