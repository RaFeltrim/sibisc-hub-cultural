# Fluxo de Branches e Commits

## Objetivo

Garantir que o time trabalhe com autonomia sem baguncar a integracao do projeto.

## Regra Central

Ninguem desenvolve direto na `main`, `dev`, `test`, `hom` ou `prd`.

Cada entrega do Jira deve nascer em uma branch propria a partir de `dev`, com commits pequenos e ordenados.

Toda alteracao funcional relevante deve ser seguida por commit proprio.

## Ambientes (novo — 2026-04-03)

O projeto agora opera com 4 ambientes em branches protegidas:

```text
feat/* → dev → test → hom → prd → main (sync)
```

- `dev`: integracao de features. Alunos fazem PR para ca.
- `test`: QA valida. Merges feitos por TL ou Rafael.
- `hom`: Rafael e stakeholders validam antes de producao.
- `prd`: versao entregavel. So Rafael aprova.
- `main`: espelho de prd para onboarding.

Ver detalhes completos em `fluxo_de_ambientes.md`.

## Regra por Card

### Epicos

- epicos organizam o trabalho
- epicos nao devem virar branch de desenvolvimento

### User Stories

- USs orientam o escopo
- em geral, a branch deve nascer da `task` ou `subtask`, nao da US inteira

### Tasks e Subtasks

- cada `task` ou `subtask` deve ter branch propria
- se uma `task` for muito grande, quebrar em `subtasks` antes de codar

## Nomenclatura de Branch

Padrao:

```text
tipo/identificador-descricao-curta
```

Exemplos:

- `feat/US-NOT-001-t-not-001-news-list`
- `feat/T-EVT-003-event-detail`
- `fix/T-ACV-003-geofallback`
- `docs/T-QA-001-validation-rules`
- `chore/T-BASE-001-front-setup`

## Ordem de Trabalho Recomendada

1. atualizar `main`
2. criar branch do card
3. registrar contrato ou decisao necessaria
4. implementar em pequenos blocos
5. validar localmente
6. atualizar documentacao
7. abrir PR

## Ordem Recomendada dos Commits

### P0

- quebra de build
- quebra de rota principal
- seguranca
- arquivos de pipeline

Esses commits entram primeiro.

### P1

- implementacao principal da `task`
- integracao entre componentes
- correcao que bloqueia a sprint

### P2

- melhorias de UX
- organizacao de codigo
- estados complementares

### P3

- polish visual
- texto
- pequenos refinamentos nao bloqueantes

## Tipos de Commit

Use sempre:

- `feat`
- `fix`
- `docs`
- `chore`
- `test`

Padrao:

```text
tipo(escopo): resumo curto
```

Exemplos:

- `docs(news): register accepted contract for news card`
- `chore(front): add route scaffold for catalog`
- `feat(events): add grouped events page`
- `fix(book-detail): correct nearest unit summary`
- `test(qa): add repository guard for ci`

## Ritmo de Commit

- commitar ao fechar uma unidade real de progresso
- ao terminar uma funcionalidade, correcao ou ajuste tecnico relevante, commitar imediatamente
- nao esperar o fim do dia para criar um commit gigante
- nao misturar ajuste de pipeline com feature de tela no mesmo commit

## O Que Conta Como Unidade Real de Progresso

Exemplos de momentos em que o commit deve acontecer:

- terminou uma tela navegavel
- terminou um componente reutilizavel
- fechou uma correcao de bug
- concluiu uma integracao entre modulos
- terminou uma mudanca de contrato em `service`
- ajustou pipeline, script de QA ou regra de repositorio

Se a mudanca ja consegue ser descrita com clareza em uma mensagem de commit, ela ja deve ser commitada.

## O Que Nunca Fazer

- commit direto na `main`
- branch com varios cards sem relacao
- commit com mensagem vaga como `ajustes`, `mudancas`, `update`
- PR sem documentacao e sem validacao local
- passar horas acumulando varias alteracoes funcionais sem commit

## Checklist Antes do PR

- branch esta ligada a um card real
- documentacao minima foi atualizada
- `cd SIBiSC && npm run qa:ci` passou
- impacto em outras pecas foi revisado
- QA e TL conseguem entender o contexto sem reuniao adicional
