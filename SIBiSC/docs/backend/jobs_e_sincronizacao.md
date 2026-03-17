# Jobs e Sincronização

## Objetivo

Registrar rotinas que atualizam a base do SIBiSC.

## Tipos de Rotina

- coleta de notícias
- sincronização de eventos
- atualização de disponibilidade do acervo

## Informações Obrigatórias por Job

- origem dos dados
- frequência de execução
- estratégia de reprocessamento
- impacto esperado em caso de falha
- responsável técnico pela manutenção

## Regras

- cada job precisa ter gatilho, frequência e política de falha
- logs e reprocessamento devem ser definidos junto com a implementação
- sincronizações não devem comprometer navegação pública por indisponibilidade momentânea
