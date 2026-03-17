# Matriz US x Testes

## Objetivo

Rastrear a relacao entre backlog e cobertura de testes.

## Estrutura Esperada

- ID da US
- task ou subtask vinculada
- fluxo coberto
- tipo de teste
- status da cobertura
- responsavel
- feedback de revisao relacionado, quando houver

## Fluxos Que Devem Entrar Primeiro

- `US-NOT-001` e `US-NOT-002`
- `US-EVT-001`, `US-EVT-002` e `US-EVT-003`
- `US-ACV-001`, `US-ACV-002` e `US-ACV-003`

## Status

A matriz sera consolidada assim que o backlog funcional estiver estabilizado e os criterios de aceite estiverem fechados.

## Regra de Rastreabilidade

Sempre que uma `task` ou `subtask` gerar ajuste de integracao, o feedback deve apontar:

- qual US foi impactada
- qual teste precisa ser criado, corrigido ou reexecutado
- qual evidencia valida o novo encaixe da peca no sistema

Isso evita que a revisao fique apenas no nivel de codigo e garante ligacao entre implementacao, documentacao e qualidade.
