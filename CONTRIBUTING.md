# Contributing

## Objetivo

Este repositorio existe para organizar e evoluir o projeto **SIBiSC** com documentacao clara, decisoes rastreaveis e entregas incrementais.

## Regras Gerais

1. Toda decisao relevante deve ser registrada em `SIBiSC/docs`.
2. Toda documentacao oficial deve nascer em `.md`.
3. Referencias externas e academicas nao substituem a documentacao do projeto.
4. Mudancas em produto, arquitetura, banco, QA ou deploy devem atualizar o documento correspondente.
5. Ninguem trabalha direto na `main`.
6. Cada card do Jira deve nascer em uma branch propria.

## Fluxo Recomendado

1. alinhar a mudanca com uma US, epico, task ou subtask registrada
2. criar branch a partir da `main` atualizada
3. atualizar ou criar a documentacao necessaria
4. implementar a alteracao tecnica em commits pequenos
5. rodar os checks locais obrigatorios
6. revisar impactos cruzados com a `Tech Lead`
7. abrir PR com contexto claro

## Branches

Use uma branch por card.

Padroes recomendados:

- `feat/US-NOT-001-t-not-001-news-list`
- `fix/T-ACV-003-geofallback`
- `docs/T-QA-001-pipeline`
- `chore/setup-front-base`

Regras:

- `feat/` para feature nova
- `fix/` para correcao
- `docs/` para documentacao
- `chore/` para ajustes de base, tooling ou infraestrutura
- nao misture mais de um card principal na mesma branch

## Commits

Todo aluno deve realizar commits durante a execucao, e nao apenas no final.

Ordem recomendada por prioridade:

1. `docs(...)` para registrar contrato, decisao ou feedback
2. `chore(...)` para estrutura base e preparacao
3. `feat(...)` ou `fix(...)` para a implementacao principal
4. `test(...)` quando houver cobertura automatizada
5. `docs(...)` final para evidencias e ajustes de rastreabilidade

Padrao:

```text
tipo(escopo): resumo curto
```

Exemplos:

- `feat(news): add news list page with local mocks`
- `fix(catalog): correct nearest unit highlight`
- `docs(qa): record validation for event detail flow`

## Check Local Obrigatorio

Antes de abrir PR, rode:

```bash
cd SIBiSC
npm run qa:ci
```

Se esse comando falhar, a branch nao esta pronta para integracao.

## Revisao de QA e TL

- `QA` valida risco, evidencias e compatibilidade
- `TL` valida encaixe tecnico, impacto cruzado e qualidade de integracao
- PR sem rastreabilidade, sem build ou sem documentacao minima nao deve entrar

## Documento de Apoio

Leia tambem:

- `SIBiSC/docs/governance/fluxo_de_branches_e_commits.md`
- `SIBiSC/docs/devops/pipeline_ci_cd.md`
- `SIBiSC/docs/qa/estrategia_shift_left.md`

## Pull Requests

Todo PR deve informar:

- o card principal atendido
- a prioridade do item (`P0`, `P1`, `P2` ou `P3`)
- o que mudou
- por que mudou
- quais documentos foram atualizados
- qual comando local foi executado
- quais riscos ou dependencias permanecem abertos

## Convencoes

- use nomes de arquivos descritivos e em minusculas com `_`
- mantenha a documentacao especifica ao SIBiSC
- trate `_references/` como apoio, nao como fonte oficial do produto
