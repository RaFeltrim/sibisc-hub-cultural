# ATA — Reuniao de Orquestracao

**Data:** 2026-04-03
**Participantes:** Claudia (PM), Marlon (PO), Beatriz (TL — parcial), Rafael Feltrim (CEO)
**Projeto:** SIBiSC — USP Web e Mobile
**Pauta:** Fluxo de branches, priorizacao do backlog, proximos passos

---

## 1. Situacao Atual

### Branches criadas e publicadas

| Branch | Estado | Commits a frente de main |
|--------|--------|--------------------------|
| `dev` | ativa | +11 (mobile screens, profile, mocks, services) |
| `test` | criada | 0 (aguarda primeira promocao) |
| `hom` | criada | 0 (aguarda validacao Rafael) |
| `prd` | criada | 0 (aguarda release) |
| `main` | referencia | estavel |

### Fluxo definido

```
feat/* → dev → test → hom → prd → main (sync)
```

Documentado em `docs/governance/fluxo_de_ambientes.md`.

### O que ja foi entregue (em dev)

- HomePageMobile.jsx — tela mobile com hero, search, quick actions
- UserProfilePage.jsx — 3 abas (emprestimos, historico, favoritos)
- Mocks completos (userProfile.js, homePageMobileData.js)
- Services mock com delay simulado (userProfileService.js, homePageMobileService.js)
- BottomNav com 5 itens (+ Perfil)
- AppRouter com /home-mobile e /perfil
- Documentacao Figma e prompt Antigravity

---

## 2. Priorizacao do Backlog (Marlon — PO)

### MoSCoW para o MVP

| Prioridade | Task | Justificativa | Esforco |
|------------|------|---------------|---------|
| **MUST** | Header mobile melhorado | Pedido direto stakeholder, visivel em toda tela | P |
| **MUST** | T-NOT-003: nav lista↔detalhe noticias | Fluxo quebrado = app incompleto na demo | P |
| **MUST** | T-QA-001 a 004: validacao de fluxos | Sem QA, bug na demo mata a nota | M |
| **MUST** | Sincronizar Figma | Pedido stakeholder, entregavel da disciplina | M |
| **SHOULD** | T-EVT-004: acao de agenda | Da "wow" na demo | P |
| **SHOULD** | T-ACV-004: detalhe livro + disponibilidade | Core da proposta (biblioteca) | M |
| **SHOULD** | T-OPS-001 a 003: base unidades | Contextualiza app multi-unidade | M |
| **COULD** | T-ACV-003: geolocalizacao + fallback | Diferencial, mas arriscado (permissoes) | G |
| **COULD** | Renovacao emprestimos | Bonito no perfil, 100% mock | P |
| **WONT** | Favoritos c/ notificacao disponibilidade | Exige push/polling inexistente | G |

### Decisao-chave do PO

> O perfil do usuario (emprestimos, historico, favoritos) ja esta feito e impressiona.
> **Nao investir mais tempo nele.** O retorno marginal agora esta nos fluxos de
> navegacao completos (noticias, livros, eventos) e no polimento visual (header).
> Uma demo onde tudo "navega de ponta a ponta" vale mais que features isoladas bonitas.

---

## 3. Sprint Plan (Claudia — PM)

### Sprint 1 — "Estabilizar e Promover" (03/04 - 11/04)

**Objetivo:** Levar dev pelo fluxo ate test. Fechar lacunas criticas.

| # | Task | Responsavel | Blocker |
|---|------|-------------|---------|
| 1 | Promover dev → test (primeiro merge) | Rafael | Nenhum |
| 2 | T-NOT-003 — Nav lista↔detalhe noticias | Aluno A | Nenhum |
| 3 | T-EVT-003 — Detalhe evento completo | Aluno B | Nenhum |
| 4 | Header mobile — corrigir corte | Aluno C | Nenhum |
| 5 | Unificar / e /home-mobile com media query | Rafael | Nenhum |

**Entregavel:** branch test com noticias completas, header mobile corrigido.

### Sprint 2 — "Acervo Core" (12/04 - 22/04)

**Objetivo:** Completar fluxo de acervo com busca, disponibilidade e geo.

| # | Task | Responsavel | Blocker |
|---|------|-------------|---------|
| 1 | T-ACV-001 — Validar busca real | Aluno A | Nenhum |
| 2 | T-ACV-002 — Disponibilidade por biblioteca | Aluno B | T-OPS-001 |
| 3 | T-OPS-001 — Base de unidades | Rafael | Nenhum |
| 4 | T-ACV-003 — Geoloc com fallback | Aluno C | Nenhum |
| 5 | T-ACV-004 — Detalhe livro + disponibilidade + proximidade | Aluno A+B | T-ACV-002, T-ACV-003 |
| 6 | Promover dev → test (segunda rodada) | Rafael | Todas acima |

**Blockers criticos:**
- T-ACV-002 depende de T-OPS-001 (precisa saber quais unidades existem)
- T-ACV-004 depende de T-ACV-002 e T-ACV-003
- Se Supabase nao pronto, manter mocks — front nao bloqueia

### Sprint 3 — "Operacao + Polish" (23/04 - 30/04)

| # | Task | Responsavel | Blocker |
|---|------|-------------|---------|
| 1 | T-OPS-002 — Unidades nas telas | Aluno B | T-OPS-001 |
| 2 | T-OPS-003 — Publicacao minima | Rafael | Nenhum |
| 3 | T-EVT-004 — Acao de agenda | Aluno C | T-EVT-003 |
| 4 | Promover test → hom | Rafael | QA pass |
| 5 | Promover hom → prd | Rafael | Hom validado |

### Sprint 4 — "QA e Entrega" (01/05 - 09/05)

| # | Task | Responsavel |
|---|------|-------------|
| 1 | T-QA-001 — Validar fluxo noticias | Aluno A |
| 2 | T-QA-002 — Validar fluxo eventos | Aluno B |
| 3 | T-QA-003 — Validar fluxo acervo | Aluno C |
| 4 | T-QA-004 — Fechar documentacao MVP | Rafael + todos |
| 5 | Figma: subir telas mobile (Antigravity) | Rafael |
| 6 | Release prd → main com tag v1.0.0 | Rafael |

---

## 4. Analise Tecnica (Beatriz — TL)

### Debitos tecnicos identificados

1. **Rota /home-mobile separada da /**
   - Problema: duas rotas para home cria confusao
   - Recomendacao: unificar com `useMediaQuery` ou CSS media queries
   - Prioridade: Sprint 1 item 5

2. **UserProfilePage usa mocks direto em vez de service**
   - Problema: inconsistencia com o padrao dos outros pages
   - Recomendacao: UserProfilePage ja usa imports de `mocks/userProfile.js`. Manter assim por ora — o service existe para uso futuro com Supabase

3. **Fluxo de branches para time USP**
   - Avaliacao: adequado, mas Rafael deve fazer os merges entre ambientes
   - Alunos so fazem PR para dev via feature branches

### Grafo de dependencias

```
T-BASE-002 (Supabase) ─┐
                        ├→ T-OPS-001 (unidades) → T-ACV-002 → T-ACV-004
                        │                       → T-OPS-002
T-ACV-003 (geo) ──────────────────────────────────────────────┘
T-EVT-003 (detalhe) → T-EVT-004 (agenda)
T-NOT-002 (DONE) → T-NOT-003 (nav lista↔detalhe)
```

---

## 5. Riscos

| Risco | Impacto | Mitigacao |
|-------|---------|-----------|
| Supabase nao configurado a tempo | Alto | Manter mocks; front nao bloqueia |
| Time nao domina git flow | Medio | Rafael faz merges entre ambientes |
| Duas rotas home | Baixo | Unificar Sprint 1 ou Sprint 3 |
| Alunos sobrecarregados fim semestre | Alto | Sprint 4 e buffer |
| Feature creep no perfil | Medio | Cortar notif favoritos (WONT) |
| Figma desatualizado na entrega | Alto | 1 pessoa dedicada ao Figma, paralelo ao dev |
| QA espremido no final | Critico | Testar cada bloco ao fechar |
| Geoloc falhar na demo | Alto | Fallback manual ja no design |
| Tudo mock sem backend real | Baixo | Aceitavel para disciplina, explicitar na apresentacao |

---

## 6. Decisoes Tomadas

### Convergencias (todos concordam)

1. **Nao investir mais no perfil** — ja impressiona, retorno marginal zero
2. **Prioridade maxima: navegacao ponta a ponta** — fluxos completos valem mais que features isoladas
3. **Header mobile e MUST** — pedido direto do stakeholder
4. **Figma paralelo ao dev** — nao bloquear codigo esperando design
5. **Mocks sao aceitaveis** — para disciplina USP, explicitar na apresentacao
6. **Rafael controla merges entre ambientes** — alunos so fazem PR para dev

### Decisoes pendentes de Rafael

- [ ] Confirmar se unifica / e /home-mobile na Sprint 1 ou adia
- [ ] Confirmar se Supabase sera configurado ou MVP fica 100% mock
- [ ] Definir data limite da apresentacao USP (fim abril? maio?)
- [ ] Atribuir alunos especificos as tasks

---

## 7. Acoes Imediatas (Hoje — 03/04)

| # | Acao | Responsavel | Deadline |
|---|------|-------------|----------|
| 1 | Promover dev → test (exercitar o fluxo) | Rafael | 2026-04-03 |
| 2 | Commitar documentacao do fluxo de ambientes | Rafael | 2026-04-03 |
| 3 | Abrir issues no GitHub para Sprint 1 | Rafael | 2026-04-04 |
| 4 | Executar prompt Antigravity para Figma | Rafael | 2026-04-05 |
| 5 | Nao criar mais branches codex/ — usar feat/ | Todo time | Imediato |

---

## 8. Proxima Reuniao

**Data sugerida:** 2026-04-11 (fim da Sprint 1)
**Pauta:** Status Sprint 1, decisao Supabase, promocao test → hom

---

**Ata registrada por:** Time de Orquestracao Feltrim's Framework
**Aprovacao:** Pendente Rafael Feltrim
