# Arquitetura - Visao Geral

## Objetivo

Descrever a arquitetura macro do SIBiSC de forma acessivel para gestao, produto e engenharia.

## Direcao Atual

- `Vite + React Web mobile-first` como camada principal de experiencia para o MVP
- `Supabase` como base de dados, autenticacao futura e suporte a funcoes auxiliares
- jobs ou rotinas server-side para ingestao e sincronizacao

## Observacao Importante

A escolha de `Vite + React` nesta fase e didatica e operacional. Ela reduz a curva de entrada para o grupo e acelera a construcao do MVP. Se o projeto amadurecer e precisar de outra estrategia de frontend depois, essa decisao pode ser revista em nova ata.

## Componentes Principais

- interface publica para noticias, eventos e acervo
- camada minima de operacao interna para curadoria e unidades
- banco unificado com tabelas orientadas a conteudo, acervo e sincronizacao
- mecanismo de ingestao de fontes externas

## Principios Arquiteturais

- reduzir complexidade no MVP
- manter uma fonte unica de verdade para dados publicos
- separar leitura publica de operacoes privilegiadas
- evitar dependencia de scraping em tempo real para jornadas do usuario

## Observacao Final

As decisoes detalhadas e integradas vivem no `integrated_system_blueprint.md`.
