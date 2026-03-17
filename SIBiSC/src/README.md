# Source Guide

Esta pasta ja contem a base executavel do front do SIBiSC.

## Estrutura Atual

- `components/`: layout, cards e blocos de UI reutilizaveis
- `hooks/`: utilitarios de comportamento de interface
- `lib/`: cliente do Supabase e configuracoes de acesso
- `mocks/`: dados locais para desenvolver sem bloquear o time
- `pages/`: telas do MVP
- `routes/`: mapa de rotas da aplicacao
- `services/`: funcoes de leitura de dados, hoje em mock e prontas para futura integracao
- `styles/`: tokens visuais e estilos globais
- `utils/`: formatadores e helpers de fluxo

## Regra de Trabalho

- toda task nova deve respeitar a estrutura atual
- primeiro construir com `mock local`
- depois trocar a fonte de dados por `service` real quando a task pedir integracao
- evitar codigo solto ou sem relacao clara com backlog e documentacao
