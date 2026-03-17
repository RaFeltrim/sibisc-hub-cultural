# Feedback por Task e Subtask

## Objetivo

Padronizar como o time registra ajustes necessarios apos a revisao de uma entrega. Este documento evita feedback disperso, facilita rastreabilidade e cria historico de integracao entre as pecas do sistema.

## Quando Usar

Criar um feedback formal sempre que uma `task` ou `subtask`:

- nao se encaixar corretamente no sistema
- alterar contrato sem alinhamento previo
- deixar impacto colateral sem documentacao
- falhar em criterios de aceite, compatibilidade ou testabilidade
- chegar com documentacao insuficiente para revisao

## Principio

O feedback nao e uma critica pessoal ao aluno. Ele e um mecanismo de encaixe. O foco da revisao deve ser sempre: o que precisa mudar para que esta peca funcione bem com as outras pecas do produto.

## Local de Armazenamento

Os feedbacks operacionais devem ser salvos em:

- `SIBiSC/docs/governance/feedbacks/`

Convencao sugerida de nome:

- `jira_<ID_DO_CARD>.md`
- exemplo: `jira_SIBISC-142.md`

Se houver mais de uma rodada, o mesmo arquivo deve ser atualizado com novas secoes, mantendo historico cronologico.

## Estrutura Obrigatoria

Cada feedback por card deve conter:

- identificacao do card
- tipo do item: `task` ou `subtask`
- US vinculada
- responsavel pela entrega
- revisor principal
- data da revisao
- status atual
- resumo do item entregue
- expectativa original
- problema encontrado
- impacto na compatibilidade do sistema
- ajuste solicitado
- criterio objetivo para considerar o ajuste resolvido
- evidencias esperadas na devolucao

## Template Base

```md
# Feedback - <JIRA-ID>

## Identificacao

- Tipo: `task` | `subtask`
- US vinculada:
- Responsavel:
- Revisor:
- Data da revisao:
- Status: `aberto` | `em ajuste` | `validado` | `aceito com ressalva`

## Resumo da Entrega

Descrever em 3 a 5 linhas o que o aluno implementou.

## Expectativa do Card

Descrever o contrato esperado para o item.

## Desvio Encontrado

Descrever com objetividade onde a entrega saiu do esperado.

## Impacto no Sistema

Explicar como o desvio afeta compatibilidade, reutilizacao, testes, UX, dados ou deploy.

## Ajuste Solicitado

Listar a correcao necessaria.

## Evidencias Esperadas

- link para arquivo alterado
- prova de teste
- atualizacao documental
- observacao de integracao

## Retorno do Aluno

Espaco para a nova devolucao.

## Validacao Final

Registrar se o item foi aprovado e quais riscos ficaram remanescentes.
```

## Categorias de Feedback

Sempre que possivel, marcar o feedback com pelo menos uma categoria:

- `compatibilidade`
- `contrato`
- `dados`
- `frontend`
- `backend`
- `qa`
- `documentacao`
- `seguranca`
- `performance`
- `observabilidade`

## Severidade

Usar uma severidade simples para ajudar o aluno a priorizar:

- `alta`: impede integracao ou quebra requisito importante
- `media`: entrega funciona parcialmente, mas precisa ajuste antes de merge
- `baixa`: melhoria recomendada, sem bloqueio imediato

## Regras de Qualidade do Feedback

- feedback deve descrever fato observavel, nao opiniao vaga
- feedback deve indicar o impacto do problema
- feedback deve sugerir um proximo passo verificavel
- feedback deve apontar onde a documentacao precisa ser corrigida
- feedback deve fechar o ciclo com validacao final

## Relacao com Jira

O card no Jira pode resumir o estado da revisao, mas o detalhamento oficial fica em Markdown no repositorio. Isso preserva historico tecnico e permite revisitar decisoes durante a sprint e no fechamento final.

## Relacao com QA e TL

- `TL` verifica encaixe arquitetural e compatibilidade
- `QA` verifica testabilidade, cobertura e criterios de aceite
- ambos podem contribuir no mesmo feedback, desde que o arquivo mantenha uma linha clara de acao para o aluno

## Resultado Esperado

Ao usar este padrao, cada aluno consegue:

- entender exatamente o que ajustar
- saber por que o ajuste importa
- reenviar a entrega com mais autonomia
- aprender com historico real do proprio trabalho
