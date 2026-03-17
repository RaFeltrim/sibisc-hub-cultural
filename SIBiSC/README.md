# SIBiSC - Web-App

## Contexto do Projeto

**Disciplina:** SSC0961 - Desenvolvimento Web e Mobile  
**Universidade:** Universidade de Sao Paulo

**Equipe:**
- Eduardo Paz e Silva
- Matheus Marchi Baron
- Pedro Augusto Pereira Magalhaes
- Pedro Dorigatti Aureo Ferreira
- Rafael Feltrim

## Problema

O Sistema Integrado de Bibliotecas de Sao Carlos (SIBiSC) enfrenta tres problemas centrais:

- dados de acervo, eventos e horarios estao fragmentados
- a experiencia mobile atual e ruim para consulta rapida
- o engajamento com noticias e atividades culturais e baixo

## Solucao Proposta

O SIBiSC sera um hub cultural digital com tres pilares:

1. portal de noticias
2. calendario de eventos
3. consulta de livros com disponibilidade por unidade e geolocalizacao

## Diferencial

O projeto e hiperlocal. Ele liga a comunidade de Sao Carlos ao acervo fisico e aos espacos culturais da rede municipal com uma experiencia simples, mobile-first e orientada a uso real.

## Estrutura do Projeto

- [`docs/`](./docs/): documentacao oficial em Markdown
- [`docs_pdfs/`](./docs_pdfs/): espelhos PDF da documentacao principal
- [`_academic_refs/`](./_academic_refs/): slides e materiais academicos de apoio
- [`src/`](./src/): espaco reservado para o app
- [`supabase/`](./supabase/): espaco reservado para schema, migrations e configuracoes de banco

## Guia Rapido Para Alunos

Se voce chegou agora no projeto, siga esta ordem:

1. leia [`docs/management/README.md`](./docs/management/README.md)
2. abra [`docs/management/plano_mvp_jira.md`](./docs/management/plano_mvp_jira.md)
3. identifique a sprint em [`docs/management/sprints/README.md`](./docs/management/sprints/README.md)
4. leia o guia de stack em [`docs/onboarding/guia_do_grupo_stack_facil.md`](./docs/onboarding/guia_do_grupo_stack_facil.md)
5. confirme como QA e TL avaliam as entregas em [`docs/governance/feedback_por_task_e_subtask.md`](./docs/governance/feedback_por_task_e_subtask.md)

## Onde Estao as USs, Tasks e Subtasks

- visao de produto: [`docs/product/epicos_e_user_stories.md`](./docs/product/epicos_e_user_stories.md)
- backlog operacional para Jira: [`docs/management/plano_mvp_jira.md`](./docs/management/plano_mvp_jira.md)
- sprints sugeridas: [`docs/management/sprints/README.md`](./docs/management/sprints/README.md)
- criterios de aceite: [`docs/product/criterios_de_aceite.md`](./docs/product/criterios_de_aceite.md)

## Como Escolher Uma Task

Antes de pegar uma task, responda:

- qual tela, fluxo ou componente essa task entrega
- ela pode ser feita com `mock local` primeiro
- qual documentacao voce vai atualizar no final
- como outra pessoa testaria sua entrega sem explicacao oral

## Como Trabalhar Sem Criar Dependencia Desnecessaria

A regra do projeto e:

- construir primeiro com `mock local`
- usar `services` pequenos para isolar leitura de dados
- integrar com Supabase depois, sem refazer a tela
- manter cada task pequena, clara e testavel

## Como QA e TL Avaliam

QA e TL validam sua entrega olhando quatro pontos:

1. a task faz exatamente o que prometeu
2. a entrega se encaixa no sistema sem quebrar outras pecas
3. existem evidencias para validar o comportamento
4. a documentacao foi atualizada com clareza suficiente para outra pessoa continuar o trabalho

Documentos principais dessa avaliacao:

- [`docs/qa/matriz_us_x_testes.md`](./docs/qa/matriz_us_x_testes.md)
- [`docs/governance/feedback_por_task_e_subtask.md`](./docs/governance/feedback_por_task_e_subtask.md)
- [`docs/governance/padrao_documental.md`](./docs/governance/padrao_documental.md)

## Stack de Entrada do Grupo

A stack mais facil para o time comecar e:

- `Vite`
- `React`
- `JavaScript`
- `React Router`
- `Supabase`
- `CSS Modules`

O guia completo esta em [`docs/onboarding/guia_do_grupo_stack_facil.md`](./docs/onboarding/guia_do_grupo_stack_facil.md).

## Ponto de Entrada da Documentacao

O indice mestre da documentacao esta em [`docs/INDEX.md`](./docs/INDEX.md).
