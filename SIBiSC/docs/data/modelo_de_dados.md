# Modelo de Dados

## Objetivo

Definir o desenho lógico inicial do banco do SIBiSC e alinhar produto, backend e QA sobre o que será persistido.

## Entidades Iniciais

### `library_units`

- representa as unidades físicas do sistema
- guarda nome, endereço, bairro, coordenadas, horário e canais de contato

### `books`

- representa o catálogo bibliográfico consolidado
- guarda identificadores, título, autor, editora, ISBN e metadados mínimos de busca

### `book_inventory`

- relaciona livros e unidades
- guarda disponibilidade, quantidade e data da última atualização

### `news_posts`

- armazena notícias públicas do portal
- guarda título, resumo, conteúdo, categoria, origem e status editorial

### `events`

- armazena agenda cultural
- guarda título, descrição, unidade, data, horário e status

### `source_feeds`

- registra de onde os dados vieram
- permite rastrear integração, política de coleta e criticidade da fonte

### `sync_runs`

- registra execuções de sincronização
- guarda início, término, status, origem e mensagem de erro

## Diretrizes de Modelagem

- o banco deve ser unificado e servir como fonte única para os pilares públicos do produto
- conteúdo público e metadados operacionais devem coexistir com separação clara de responsabilidade
- toda tabela deve nascer preparada para rastreamento de atualização
- dados críticos para busca e proximidade devem priorizar consistência sobre excesso de complexidade
