# Matriz de perguntas guiadas - Sprint 1

Data: 2026-05-19  
Escopo: Feltrim Agents como assistente guiado, sem chat aberto, IA generativa, backend real, reserva real ou integracao oficial SIBI/PHL.

## Texto base obrigatorio

> Esta resposta usa dados locais do prototipo. A disponibilidade nao substitui confirmacao oficial da biblioteca e ainda nao ha reserva real nesta versao.

## Perguntas aprovadas para o incremento inicial

| ID | Pergunta guiada | Fonte local | Motivo exibido | Proxima acao | Limite comunicado |
| --- | --- | --- | --- | --- | --- |
| `literatura-brasileira` | Quero uma leitura de literatura brasileira | `catalogo-mock` + preferencias demonstrativas | Autor/categoria nas preferencias do perfil mockado | Abrir detalhe de `b7` ou `b3`; explorar catalogo | Disponibilidade mockada, sem reserva real |
| `machado-de-assis` | Tenho interesse em Machado de Assis | `src/mocks/books.js` | Autor corresponde diretamente ao interesse informado | Abrir `b3` ou `b1`; buscar no catalogo | Nao consulta catalogo oficial |
| `cidade-sociedade` | Procuro temas de cidade e sociedade | `src/mocks/books.js` | Resumos de `b2` e `b5` citam cidade, desigualdade ou tensoes sociais | Abrir livros no catalogo | Resultado depende do acervo local mockado |
| `confirmar-disponibilidade` | Como vejo disponibilidade sem reservar? | Inventario local mockado | Exemplo usa contagem local de `b7` | Abrir catalogo/detalhe para ver unidades | Disponibilidade nao e oficial e nao gera reserva |
| `eventos-leitura` | Quais eventos combinam com leitura? | `src/mocks/events.js` | Eventos mencionam clube, roda ou livro do catalogo | Abrir `e3`, `e7` ou agenda completa | Data/horario/inscricao devem ser confirmados |
| `noticias-servicos` | Quero entender novidades e servicos | `src/mocks/news.js` | Noticias contextualizam orientacao digital e acervo | Abrir `n1`, `n2` ou noticias | Conteudo editorial do prototipo |
| `preferencias` | Minhas preferencias sao editaveis? | `src/mocks/userProfile.js` | Perfil possui categorias, autores e topicos demonstrativos | Abrir Perfil | Preferencias nao sao editaveis nem persistidas nesta Sprint |
| `sem-reserva-real` | Posso reservar ou renovar pelo assistente? | Contrato Sprint 1 | O assistente apenas orienta caminhos fechados | Consultar catalogo/perfil | Sem reserva, pre-reserva, renovacao oficial ou SIBI/PHL |
| `fora-do-escopo` | Tenho outra duvida fora desta lista | Escopo funcional Sprint 1 | Fallback honesto sem inventar capacidade | Explorar catalogo | Sem chat aberto, IA real, backend real ou fonte oficial |

## Decisoes de produto

- A Sprint 1 usa 9 perguntas guiadas para ficar dentro do criterio de 8 a 10 perguntas.
- As recomendacoes continuam usando apenas IDs canonicos `b1..b8`.
- Preferencias permanecem demonstrativas; a edicao simples fica fora deste incremento por risco de sugerir persistencia real.
- Feedback de Sofia/Claudia entra por GitHub Issues, com template dedicado.
- Guard reforcado em `scripts/qa-guard.mjs` valida quantidade de perguntas, texto base, IDs de livros, motivo, fonte, limite e proxima acao.

## Cobertura das issues

- #46: matriz de perguntas guiadas registrada neste documento e no service `src/services/guidedAssistantService.js`.
- #47: painel de perguntas guiadas previsto para Home desktop e mobile, sem chat aberto.
- #48: cada resposta/recomendacao possui motivo, fonte/limite e proxima acao.
- #49: disponibilidade mockada e ausencia de reserva real aparecem no texto base e nas respostas.
- #50: pergunta `fora-do-escopo` define fallback honesto.
- #53: contrato preservado por IDs canonicos e guard automatizado.
- #54: preferencias definidas como demonstrativas nesta Sprint.
