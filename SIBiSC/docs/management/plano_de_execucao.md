# Plano de Execucao

## Objetivo

Traduzir backlog, arquitetura e dependencias em ordem pratica de trabalho para o time.

## Leitura Recomendada Antes da Execucao

1. [`management/README.md`](./README.md)
2. [`plano_mvp_jira.md`](./plano_mvp_jira.md)
3. [`sprints/README.md`](./sprints/README.md)
4. documentos tecnicos e de QA relacionados ao item que sera implementado

## Sequencia Recomendada

1. consolidar backlog, personas, criterios de aceite e releases
2. estruturar app base e workspace do Supabase
3. modelar dados, RLS e politicas de leitura publica
4. definir contratos e estrategia de ingestao
5. implementar backend e consultas principais
6. construir telas e fluxos do MVP
7. validar com QA, revisar documentacao e ajustar

## Regra para Times Iniciantes

Nao avancar para o proximo bloco sem confirmar:

- existe documentacao suficiente para a proxima frente trabalhar
- ha dependencias criticas resolvidas
- o escopo da fase esta claro para TL, QA e devs
- a task atual foi quebrada em partes pequenas quando necessario

## Ponte com as Sprints

O plano geral acima deve ser distribuido pelas sprints definidas em `management/sprints/`. Se houver duvida entre o plano macro e a sprint atual, a sprint governa a execucao diaria e o plano macro governa a direcao do projeto.

## Regra Final

Nenhuma etapa e considerada concluida sem atualizacao documental correspondente e sem registro de riscos remanescentes.
