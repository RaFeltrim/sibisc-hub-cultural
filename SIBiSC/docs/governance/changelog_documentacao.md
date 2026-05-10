# Changelog da Documentacao

## Objetivo

Manter historico das mudancas estruturais na documentacao do projeto.

## 2026-03-23 - refresh visual e handoff MCP para o Figma ativo

- atualizado [`../frontend/design_system.md`](../frontend/design_system.md) com a linguagem visual atual, tokens, tipografia e regras de uso
- atualizado [`../frontend/handoff_figma_lovable.md`](../frontend/handoff_figma_lovable.md) com o arquivo `[USP] SIBiSC App`, o fluxo de captura por Figma MCP e a regra de evitar duplicidade
- documentadas as capturas publicas `Home`, `Noticias`, `Eventos` e `Catalogo` nas variantes desktop e mobile
- documentada a pagina web organizada no Figma com `Home`, listagens e detalhes de `Noticias`, `Eventos` e `Catalogo`
- registrada a validacao de cobertura das rotas publicas e dos fluxos de `Ler detalhe` e `Ver detalhes`
- registrado que `SIBiSC/index.html` manteve o script de captura para futuras importacoes controladas ao Figma

## 2026-03-16 - reorganizacao inicial

- reorganizacao profissional do repositorio
- `SIBiSC` consolidado como produto principal
- `Study-Sync` retirado do escopo do repositorio principal
- framework movido para `_references/feltrims-framework`
- materiais academicos movidos para `SIBiSC/_academic_refs`
- malha inicial de documentacao criada em `SIBiSC/docs`

## 2026-03-16 - enriquecimento documental

- documentos de produto detalhados com personas, epicos, USs e releases
- documentos de gestao expandidos com roadmap, riscos e execucao
- blueprint integrado aprofundado para leitura da TL e do time
- documentacao tecnica inicial detalhada para dados, backend, frontend, QA e DevOps
- onboarding e governanca complementados para facilitar interpretacao do projeto

## 2026-03-16 - governanca de revisao e autonomia do time

- criada a ata [`../management/ata_reuniao_qualidade_documentacao_2026-03-16.md`](../management/ata_reuniao_qualidade_documentacao_2026-03-16.md) com o acordo de qualidade documental
- criado o padrao [`feedback_por_task_e_subtask.md`](./feedback_por_task_e_subtask.md) para registrar ajustes por `task/subtask`
- criada a pasta [`feedbacks/`](./feedbacks/) para centralizar devolutivas formais por card
- criado o modelo [`../management/fechamento_de_sprint_e_metricas.md`](../management/fechamento_de_sprint_e_metricas.md) para contar a historia da sprint e medir evolucao
- `padrao_documental.md`, `matriz_us_x_testes.md`, `atas_de_reuniao.md` e `INDEX.md` foram atualizados para refletir o novo fluxo de trabalho

## 2026-03-16 - abertura da camada operacional de gestao

- criada a visao de entrada [`../management/README.md`](../management/README.md) para localizar rapidamente a pasta de gestao
- criado o backlog [`../management/plano_mvp_jira.md`](../management/plano_mvp_jira.md) com epicos, USs, tasks e subtasks ate o MVP
- criada a trilha [`../management/sprints/README.md`](../management/sprints/README.md) com cinco sprints didaticas para alunos iniciantes
- adicionadas as sprints `00` a `04` com foco em onboarding, fundacao, pilares publicos, acervo e fechamento do MVP
- atualizados `roadmap.md`, `plano_de_execucao.md` e `INDEX.md` para conectar a estrategia com a execucao diaria

## 2026-03-16 - guia didatico da stack mais facil

- criado o guia [`../onboarding/guia_do_grupo_stack_facil.md`](../onboarding/guia_do_grupo_stack_facil.md) para compartilhar com o grupo
- definida a trilha didatica `Vite + React + JavaScript + React Router + Supabase + CSS Modules`
- reorganizadas as tasks do MVP por nivel de dificuldade e modo independente com `mock local`
- atualizados `como_rodar_o_projeto.md`, `arquitetura_visao_geral.md`, `integrated_system_blueprint.md`, `ambientes_e_variaveis.md` e `INDEX.md` para manter coerencia com a stack de entrada

## 2026-03-16 - reforco do guia de entrada no README

- atualizado o `README.md` da raiz com caminho rapido para USs, tasks, subtasks, QA e TL
- reescrito `SIBiSC/README.md` com leitura inicial mais didatica para alunos
- reforcado o fluxo de avaliacao para que o time entenda como QA e TL validam cada entrega

## 2026-03-16 - criacao manual da base visual do front

- atualizado [`../frontend/handoff_figma_lovable.md`](../frontend/handoff_figma_lovable.md) com os links e o status real do projeto no Lovable e do arquivo no Figma
- registrada a estrutura inicial do arquivo `SIBiSC Front MVP` com paginas e frames mobile e desktop
- registrada a primeira validacao manual do front em [`../qa/plano_e2e.md`](../qa/plano_e2e.md)
- documentados os fluxos ja confirmados na preview: `Home`, `Noticias`, `Eventos`, `Catalogo` e fallback de calendario

## 2026-03-16 - base executavel do front integrada ao repositorio

- criado o front real em `SIBiSC` com `Vite + React + React Router`
- adicionadas rotas do MVP para `Home`, `Noticias`, `Eventos` e `Catalogo`
- adicionados mocks, services e cliente publico do Supabase para onboarding e integracao futura
- atualizados `SIBiSC/README.md`, `src/README.md`, `../onboarding/como_rodar_o_projeto.md` e `../frontend/handoff_figma_lovable.md` para refletir o novo estado do projeto

## 2026-03-16 - governanca de branches, commits e gate de QA

- reforcado `CONTRIBUTING.md` com branch por card, commits pequenos e gate local obrigatorio
- criado [`fluxo_de_branches_e_commits.md`](./fluxo_de_branches_e_commits.md) para orientar o time de alunos
- atualizados `pipeline_ci_cd.md`, `estrategia_shift_left.md` e `como_contribuir.md` com o novo fluxo operacional
- preparado o repositorio para gate automatico de QA no GitHub Actions

## 2026-03-16 - orquestracao continua durante toda a execucao

- criado [`../management/modelo_operacao_orquestracao.md`](../management/modelo_operacao_orquestracao.md) como regra oficial de atuacao do time de orquestracao
- atualizado `management/README.md` para registrar que a orquestracao atua 100% do tempo
- atualizado `plano_de_execucao.md` para tratar a orquestracao como torre de controle ativa durante o projeto

## 2026-03-16 - cadencia profissional de commits reforcada

- atualizado `CONTRIBUTING.md` para exigir commit apos cada alteracao funcional relevante
- atualizado `fluxo_de_branches_e_commits.md` para tornar explicita a cadencia de commit durante a execucao
- reforcado que o historico deve refletir a evolucao real do trabalho, e nao apenas um consolidado final
