# Dicionário de Dados

## Objetivo

Documentar significado, uso e responsabilidade de cada tabela e campo relevante, evitando interpretação diferente entre banco, backend e frontend.

## Convenções

- usar nomes consistentes em inglês técnico para tabelas e colunas
- descrever o papel funcional do campo, não apenas o tipo
- indicar se o campo é exposto ao frontend, usado internamente ou derivado

## Campos Críticos Esperados

### `library_units`

- `id`: identificador da unidade
- `name`: nome público da unidade
- `address`: endereço textual
- `latitude` e `longitude`: base para cálculo de proximidade
- `opening_hours`: informação operacional de uso público

### `books`

- `id`: identificador interno
- `title`: campo principal de busca
- `author`: campo de apoio à busca e relevância
- `isbn`: identificador externo quando existir
- `normalized_title`: campo auxiliar para busca estável

### `book_inventory`

- `book_id`: referência ao livro
- `unit_id`: referência à unidade
- `availability_status`: disponível, indisponível, consulta local ou equivalente
- `updated_at`: data da última sincronização útil

## Próximo Passo

O preenchimento completo deste dicionário deve acontecer em paralelo à primeira migration funcional.
