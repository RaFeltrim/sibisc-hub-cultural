# Padrao Documental

## Regras Base

- toda documentacao oficial fica em `SIBiSC`
- a fonte oficial e sempre Markdown
- PDFs em `docs_pdfs` sao espelhos, nao origem
- cada agente e dono da documentacao da sua frente
- a `Tech Lead` integra a documentacao completa

## Convencoes

- arquivos em minusculas com `_`
- linguagem clara e objetiva
- atualizacao obrigatoria em mudancas de escopo, arquitetura, dados, QA ou deploy
- referencias externas devem ser interpretadas e traduzidas para a documentacao do projeto

## Criterio de Qualidade da Documentacao

Um documento e considerado util quando permite que outro integrante entenda:

- qual problema ele resolve
- qual decisao esta registrada
- qual impacto isso tem no restante do sistema

## Definicao de Documentacao Minima por Card

Toda `task` e `subtask` precisa registrar pelo menos:

- card do Jira relacionado
- US impactada
- resumo da alteracao
- arquivos ou modulos alterados
- criterio de validacao
- dependencias e impactos conhecidos
- riscos ou limites remanescentes

## Integracao com o Fluxo de Feedback

Quando uma entrega precisar de ajuste, o detalhamento oficial deve ser registrado em:

- [`feedback_por_task_e_subtask.md`](./feedback_por_task_e_subtask.md)
- [`feedbacks/README.md`](./feedbacks/README.md)

O objetivo e manter um historico tecnico claro do que precisou ser corrigido para que as pecas do sistema se encaixem corretamente.

## Integracao com o Fechamento de Sprint

O fechamento documental de cada sprint deve seguir o modelo em:

- [`../management/fechamento_de_sprint_e_metricas.md`](../management/fechamento_de_sprint_e_metricas.md)

Isso garante que a evolucao do time seja observada em qualidade, autonomia e capacidade de integracao, e nao apenas em quantidade de cards finalizados.

## Regra para Times Iniciantes

Quando houver duvida entre documentar pouco demais ou de forma objetiva, o time deve escolher a opcao que permita a outro colega:

- entender o contexto sem depender de conversa oral
- testar a entrega
- identificar o encaixe da peca no sistema
- continuar a implementacao sem reabrir o problema do zero
