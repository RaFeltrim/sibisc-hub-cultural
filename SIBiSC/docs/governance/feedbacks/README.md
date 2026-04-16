# Feedbacks Operacionais

Esta pasta guarda os feedbacks formais por `task` e `subtask`.

## Objetivo

Concentrar o historico de ajustes solicitados durante a sprint, sempre vinculando:

- card do Jira
- US impactada
- problema observado
- ajuste solicitado
- status da validacao

## Convencao de Nome

- `jira_<ID_DO_CARD>.md`
- exemplo: `jira_SIBISC-142.md`

## Regra

Nao abrir um arquivo novo para cada rodada do mesmo card. O mesmo documento deve ser atualizado para manter o historico completo da revisao daquele item.

## Template Sugerido
Copie o conteúdo abaixo para iniciar seu arquivo `jira_ID.md`:

---
# Log de Feedback: [ID-TASK]
**Status Atual:** [ ] Pendente | [ ] Ajustando | [ ] Validado

## Rodada 1 - Data: DD/MM/2026
- **US Impactada:** US-XXX
- **Problema Observado:** ...
- **Ajuste Solicitado:** ...
- **Status da Validação:** ...

---
