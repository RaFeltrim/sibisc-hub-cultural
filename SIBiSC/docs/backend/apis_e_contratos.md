# APIs e Contratos

## Objetivo

Registrar contratos de leitura e operações server-side do projeto.

## Contratos Mínimos Esperados

### Notícias

- listar notícias com paginação simples ou limite inicial
- buscar notícia por identificador amigável

### Eventos

- listar eventos por período
- obter detalhe de evento

### Acervo

- buscar livros por termo
- obter disponibilidade por unidade
- consultar unidade mais próxima com base em coordenadas

## Regras

- contratos devem indicar entradas, saídas e erros esperados
- respostas públicas precisam ser estáveis para frontend e QA
- mudanças em contrato exigem atualização de frontend e QA
- falhas de fonte externa não devem vazar como erro confuso ao usuário final sem tratamento
