# Critérios de Aceite

## Objetivo

Garantir que as USs do SIBiSC sejam interpretadas da mesma forma por gestão, arquitetura, desenvolvimento e QA.

## Padrão Recomendado

Cada história deve conter critérios de aceite que respondam:

- em qual contexto o fluxo começa
- qual ação o usuário executa
- qual resultado visível deve acontecer
- qual comportamento é esperado em erro, ausência de dados ou fallback

## Regras Gerais

- usar linguagem verificável, evitando termos vagos como "rápido" ou "intuitivo" sem contexto
- explicitar estados de carregamento, vazio e erro nas jornadas públicas
- registrar fallback quando houver dependência de geolocalização, agenda ou fonte externa
- diferenciar claramente leitura pública de operação interna

## Exemplos de Aplicação

- Notícias: a listagem deve exibir título, resumo, data e origem
- Eventos: o detalhe deve exibir data, unidade, descrição e ação de lembrete
- Acervo: a busca deve responder mesmo sem geolocalização, usando alternativa manual

## Uso no Processo

- PO escreve os critérios iniciais
- TL valida se são implementáveis
- QA valida se são suficientes para teste
- mudanças de escopo devem atualizar o critério antes da implementação
