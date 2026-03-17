# Fluxos e Telas

## Objetivo

Mapear a navegação principal do SIBiSC para orientar design, frontend e QA.

## Fluxos do MVP

### Fluxo 1 - Entrada pública

- home com destaques de notícias, eventos e busca rápida

### Fluxo 2 - Notícias

- listagem
- filtro simples
- detalhe da notícia

### Fluxo 3 - Eventos

- visão de calendário ou lista por período
- detalhe do evento
- ação de lembrete

### Fluxo 4 - Acervo

- busca
- resultado
- disponibilidade por unidade
- unidade mais próxima

## Regras de Interface

- toda tela pública precisa indicar estados de carregamento, vazio, erro e fallback
- telas com dependência de geolocalização devem ter alternativa manual
- a navegação precisa continuar compreensível em telas pequenas
