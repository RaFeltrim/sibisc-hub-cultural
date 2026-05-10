# Fluxo de Ambientes e Branches

## Objetivo

Definir o ciclo de vida do codigo desde o desenvolvimento ate producao, com ambientes claros de validacao.

## Branches Principais

```
prd (producao)
 ↑ merge aprovado pelo Rafael
hom (homologacao)
 ↑ merge apos testes passarem
test (testes isolados)
 ↑ merge da dev para validacao
dev (desenvolvimento)
 ↑ merge de feature branches
 │
 ├── feat/T-xxx-descricao
 ├── fix/T-xxx-descricao
 ├── docs/T-xxx-descricao
 └── chore/xxx-descricao
```

## Descricao de Cada Ambiente

### `dev` — Desenvolvimento

- **Proposito:** integrar features em andamento do time
- **Quem mergeia aqui:** qualquer membro do time via PR
- **Origem:** feature branches (`feat/`, `fix/`, `docs/`, `chore/`)
- **Regra:** PR deve ter build passando e descricao minima
- **Estado esperado:** pode ter bugs conhecidos, features incompletas
- **Deploy:** nenhum (apenas local)

### `test` — Testes Isolados

- **Proposito:** ambiente apartado para QA validar features antes de homologacao
- **Quem mergeia aqui:** TL ou QA via merge de `dev`
- **Origem:** branch `dev`
- **Regra:** so recebe merge quando dev estiver estavel o suficiente para validacao
- **Estado esperado:** funcional, com features completas para teste
- **Deploy:** ambiente de teste (se houver) ou local com flag de teste
- **Saida:** apos validacao QA, promover para `hom`

### `hom` — Homologacao

- **Proposito:** Rafael e stakeholders validam a entrega antes de producao
- **Quem mergeia aqui:** TL ou QA apos aprovacao em `test`
- **Origem:** branch `test`
- **Regra:** so recebe codigo ja validado em `test`
- **Estado esperado:** estavel, sem bugs conhecidos, pronto para demonstracao
- **Deploy:** ambiente de homologacao (Vercel preview, staging, etc)
- **Saida:** aprovacao final do Rafael promove para `prd`

### `prd` — Producao

- **Proposito:** versao entregavel e demonstravel do projeto
- **Quem mergeia aqui:** apenas Rafael (aprovacao final)
- **Origem:** branch `hom`
- **Regra:** so recebe merge apos homologacao aprovada
- **Estado esperado:** estavel, testado, documentado
- **Deploy:** producao (Vercel, Netlify, ou apresentacao USP)

### `main` — Referencia Historica

- **Proposito:** manter como branch padrao do GitHub para onboarding
- **Relacao:** sincronizada com `prd` apos cada release
- **Regra:** nao deve receber commits diretos nem PRs de features

## Fluxo Completo — Passo a Passo

### 1. Desenvolvedor cria feature

```bash
git checkout dev
git pull origin dev
git checkout -b feat/T-XXX-descricao
# ... trabalha, commita ...
git push origin feat/T-XXX-descricao
# abre PR para dev
```

### 2. PR revisado e mergeado em dev

- QA ou TL revisa o PR
- build deve passar
- merge squash ou merge commit para dev

### 3. Dev promovida para test

```bash
git checkout test
git pull origin test
git merge dev --no-edit
git push origin test
```

- QA executa validacao
- registra evidencias
- se falhar: abre issue, corrige em dev, repete

### 4. Test promovida para hom

```bash
git checkout hom
git pull origin hom
git merge test --no-edit
git push origin hom
```

- Rafael valida
- stakeholders testam
- se falhar: corrige em dev, repete ciclo

### 5. Hom promovida para prd

```bash
git checkout prd
git pull origin prd
git merge hom --no-edit
git push origin prd
```

- criar tag de release
- sincronizar main

```bash
git checkout main
git merge prd --no-edit
git push origin main
git tag -a v1.x.x -m "Release MVP vX.X.X"
git push origin v1.x.x
```

## Hotfix (Correcao Urgente em Producao)

```bash
git checkout prd
git checkout -b hotfix/descricao-curta
# ... corrige ...
git push origin hotfix/descricao-curta
# PR para prd (aprovacao Rafael)
# apos merge em prd, backport para dev:
git checkout dev
git merge prd --no-edit
git push origin dev
```

## Diagrama Visual

```
  feat/T-xxx ──PR──→ dev ──merge──→ test ──merge──→ hom ──merge──→ prd
                      ↑                                               │
                      │              hotfix ←─────────────────────────┘
                      └────── backport ←──────────────────────────────┘
```

## Regras Absolutas

1. **Ninguem commita direto em `test`, `hom` ou `prd`**
2. **Fluxo so anda para frente:** dev → test → hom → prd
3. **Hotfixes sao excecao** e devem ser backportados para dev
4. **Tags de release** so saem de `prd`
5. **main** e espelho de `prd`, nao recebe trabalho direto

## Estado Atual das Branches (03/04/2026)

| Branch | Baseada em | Commits a frente de main | Status |
|--------|-----------|--------------------------|--------|
| `dev` | main | +11 commits (mobile screens, profile, services) | ativa |
| `test` | main | 0 | aguardando primeira promocao |
| `hom` | main | 0 | aguardando primeira promocao |
| `prd` | main | 0 | aguardando primeira release |
| `main` | - | referencia | estavel |

## Proxima Acao

1. QA validar features em `dev` (HomePageMobile, UserProfilePage)
2. se aprovado, promover `dev` → `test`
3. QA executa teste completo em `test`
4. se aprovado, promover `test` → `hom`
5. Rafael valida em `hom`
6. se aprovado, promover `hom` → `prd` + tag release
