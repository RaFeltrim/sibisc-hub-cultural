# Web e Mobile

Repositorio principal do projeto **SIBiSC**, organizado para concentrar o produto, a documentacao oficial e os materiais de apoio de forma clara e escalavel.

## O Que Este Repositorio Contem

- `SIBiSC/`: produto principal, documentacao oficial, codigo e integracoes futuras
- `_references/`: materiais metodologicos e historicos fora da navegacao principal do produto
- `SIBiSC/_academic_refs/`: slides e referencias academicas usadas pelo time

## Escopo Atual

- planejamento e execucao do Web-App do SIBiSC
- documentacao viva do projeto em Markdown
- onboarding tecnico com `Vite + React + Supabase`

## Fora do Escopo

- projetos paralelos, como o antigo `Study-Sync`
- materiais de referencia tratados como produto
- decisoes nao registradas em `SIBiSC/docs`

## Comece Por Aqui

Se voce e aluno e acabou de chegar no repositorio, siga esta ordem:

1. leia [`SIBiSC/README.md`](./SIBiSC/README.md)
2. abra [`SIBiSC/docs/management/README.md`](./SIBiSC/docs/management/README.md)
3. veja o backlog em [`SIBiSC/docs/management/plano_mvp_jira.md`](./SIBiSC/docs/management/plano_mvp_jira.md)
4. veja a sprint atual em [`SIBiSC/docs/management/sprints/README.md`](./SIBiSC/docs/management/sprints/README.md)
5. use o guia de entrada em [`SIBiSC/docs/onboarding/guia_do_grupo_stack_facil.md`](./SIBiSC/docs/onboarding/guia_do_grupo_stack_facil.md)

## Onde Encontrar USs, Tasks e Subtasks

- epicos e USs do produto: [`SIBiSC/docs/product/epicos_e_user_stories.md`](./SIBiSC/docs/product/epicos_e_user_stories.md)
- backlog do MVP pronto para Jira: [`SIBiSC/docs/management/plano_mvp_jira.md`](./SIBiSC/docs/management/plano_mvp_jira.md)
- trilha de sprints: [`SIBiSC/docs/management/sprints/README.md`](./SIBiSC/docs/management/sprints/README.md)
- criterios de aceite: [`SIBiSC/docs/product/criterios_de_aceite.md`](./SIBiSC/docs/product/criterios_de_aceite.md)
- rastreabilidade com QA: [`SIBiSC/docs/qa/matriz_us_x_testes.md`](./SIBiSC/docs/qa/matriz_us_x_testes.md)

## Como Trabalhar Sem Se Perder

Antes de comecar qualquer implementacao, confirme:

- qual `US` o seu card atende
- qual `task` voce esta executando
- se a `subtask` ja esta pequena o suficiente para ser feita sem travar
- qual documento precisa ser atualizado ao final
- como QA e TL vao validar sua entrega

## Como QA e TL Avaliam Sua Entrega

O fluxo oficial de avaliacao esta aqui:

- feedback por card: [`SIBiSC/docs/governance/feedback_por_task_e_subtask.md`](./SIBiSC/docs/governance/feedback_por_task_e_subtask.md)
- definicao de documentacao minima: [`SIBiSC/docs/governance/padrao_documental.md`](./SIBiSC/docs/governance/padrao_documental.md)
- fechamento de sprint e metricas: [`SIBiSC/docs/management/fechamento_de_sprint_e_metricas.md`](./SIBiSC/docs/management/fechamento_de_sprint_e_metricas.md)

QA e TL olham principalmente:

- se a entrega atende a task combinada
- se ela se encaixa no restante do sistema sem quebrar outras pecas
- se ha evidencias suficientes para testar
- se a documentacao foi atualizada com clareza

## Mapa Rapido

- produto: [`SIBiSC/README.md`](./SIBiSC/README.md)
- framework adaptado: [`SIBiSC/FRAMEWORK.md`](./SIBiSC/FRAMEWORK.md)
- indice geral: [`SIBiSC/docs/INDEX.md`](./SIBiSC/docs/INDEX.md)
- referencias metodologicas: [`_references/README.md`](./_references/README.md)

## Estado Atual

- o repositorio foi reorganizado para ter `SIBiSC` como unico produto principal
- as referencias do Feltrims Framework foram isoladas em `_references/feltrims-framework`
- os materiais academicos ficaram isolados em `SIBiSC/_academic_refs`
- o onboarding tecnico foi simplificado para `Vite + React + Supabase`

## Proximos Passos

1. iniciar o app base em `SIBiSC/src`
2. versionar `SIBiSC/supabase` com schema, migrations e RLS
3. executar as tasks do MVP em ordem didatica e bem documentada
