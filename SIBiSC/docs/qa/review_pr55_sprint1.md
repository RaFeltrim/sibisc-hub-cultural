# Review PR #55 - Sprint 1 SIBiSC/Feltrim Agents

Data: 2026-05-19  
PR: [#55](https://github.com/RaFeltrim/sibisc-hub-cultural/pull/55)  
Base: `dev`  
Head: `feature/sibisc-guided-assistant-sprint1`  
Escopo: revisao local complementar antes de qualquer merge, porque o QA Gate remoto nao apareceu no PR.

## Veredito

**Aprovado com ressalvas.**

Nao encontrei bug funcional bloqueante no assistente guiado, nos dados locais/mock, nos textos de limite, na navegacao por teclado basica, na responsividade da Home desktop/mobile, no `qa-guard`, na documentacao ou no template Sofia/Claudia.

Recomendacao Go/No-Go: **GO para merge em `dev` com ressalvas de processo**, desde que o time aceite a validacao local como compensacao temporaria para o QA Gate remoto ausente e registre o fechamento/triagem manual das issues #46-#54. Nao foi feito commit, push ou merge nesta revisao.

## Achados por severidade

### Bloqueantes / P0

- Nenhum achado.

### Altos / P1

- Nenhum achado.

### Medios / P2

- Nenhum achado funcional. O comportamento entregue ficou dentro do contrato de Sprint 1: assistente guiado fechado, sem chat aberto, sem IA/backend real, sem reserva/renovacao oficial e sem disponibilidade oficial.

### Baixos / P3 e ressalvas

- **QA Gate remoto ausente no PR #55.** O `statusCheckRollup` do PR mostra Vercel verde, mas nao mostra o QA Gate remoto. A validacao local passou, porem ainda recomendo investigar o workflow em tarefa separada ou registrar decisao explicita aceitando QA local para este merge.
- **Issues #46-#54 seguem abertas.** O corpo do PR contem `Closes #46` a `Closes #54`, mas a consulta do GitHub retornou `closingIssuesReferences: []`. Como o PR mira `dev`, pode ser necessario fechar ou comentar as issues manualmente apos o merge/aceite.
- **Leitor de tela real ainda pendente.** A estrutura possui `aria-live`, `aria-pressed`, foco visivel e `role="status"`, mas a validacao com NVDA/VoiceOver/Leitor real nao foi executada nesta rodada.

## Revisao do diff

- **Comportamento do assistente guiado:** o PR adiciona 9 perguntas fechadas, fallback honesto e respostas com motivo, fonte/limite e proxima acao. O smoke confirmou troca de pergunta e resposta de fallback sem inventar capacidades.
- **Dados locais/mock:** `guidedAssistantService.js` deriva livros, eventos, noticias e perfil apenas de mocks locais e valida IDs canonicos via `qa-guard`.
- **Texto de limites:** os textos declaram dados locais do prototipo, disponibilidade mockada, ausencia de reserva real e ausencia de backend/IA/integracao oficial onde isso importa.
- **Acessibilidade:** Home desktop e mobile usam botoes com `aria-pressed`, `aria-controls`, resposta em `aria-live="polite"`/`aria-atomic`, foco visivel em botoes/links e `SearchField` com `role="status"`.
- **Responsividade:** smoke mobile em 375x812 confirmou `/home-mobile` sem overflow horizontal (`scrollWidth` igual a `innerWidth`).
- **`qa-guard` e docs/evidencias:** guard passou e cobre perguntas guiadas, texto base, IDs canonicos, motivos, fontes, limites e proximas acoes. Docs da matriz e evidencias Sprint 1 estao coerentes com o incremento.
- **Template Sofia/Claudia:** `.github/ISSUE_TEMPLATE/feedback_sofia_claudia.md` cobre relato, reproducao, evidencias, severidade, prioridade, status e criterio de fechamento.

## Testes rodados

- `npm run qa:repo` em `SIBiSC`: aprovado.
- `npm run qa:ci` em `SIBiSC`: aprovado, incluindo `vite build` com 83 modulos transformados.
- Smoke Playwright CLI em servidor local temporario:
  - `/`: abriu Home e confirmou Feltrim Agents, 9 perguntas guiadas, `aria-pressed` e resposta explicavel.
  - Fallback: acionado "Fora do escopo", com texto sem chat aberto, IA generativa, catalogo oficial em tempo real ou integracao com atendimento.
  - Busca assistida: termo `vidas` retornou status com 1 sugestao local e link para `Vidas Secas`.
  - `/catalogo/b7`: detalhe abriu com disponibilidade mockada por unidade.
  - `/perfil`: perfil abriu com preferencias demonstrativas.
  - `/home-mobile` em 375x812: sem overflow horizontal detectado.
  - Console Playwright: 0 warnings e 0 errors.
- `ReadLints`: executado nos arquivos alterados pelo PR #55 e nos relatorios tocados nesta revisao; sem erros reportados.

## Relacao com issues #46-#54

- #46 `S1-01 Definir matriz de perguntas guiadas do Feltrim Agents`: coberta por `docs/product/matriz_perguntas_guiadas_sprint1.md` e `guidedAssistantService.js`; issue ainda `OPEN`.
- #47 `S1-02 Implementar painel de assistente guiado`: coberta nas Homes desktop/mobile; issue ainda `OPEN`.
- #48 `S1-03 Exibir motivo, fonte e proxima acao nas recomendacoes`: coberta nos cards de resposta/recomendacao; issue ainda `OPEN`.
- #49 `S1-04 Comunicar disponibilidade mockada e ausencia de reserva real`: coberta no texto base e nas respostas; issue ainda `OPEN`.
- #50 `S1-05 Criar fallback honesto para perguntas fora do escopo`: coberta pela pergunta `fora-do-escopo`; issue ainda `OPEN`.
- #51 `S1-06 Criar template de feedback Sofia/Claudia em GitHub Issues`: coberta pelo template dedicado; issue ainda `OPEN`.
- #52 `S1-07 Montar matriz QA dos 10 cenarios do assistente`: coberta por `docs/qa/sprint1_evidencias_validacao.md` e por esta revisao complementar; issue ainda `OPEN`.
- #53 `S1-08 Preservar guards e contrato de dados na Sprint 1`: coberta pelo `qa-guard` reforcado; issue ainda `OPEN`.
- #54 `S1-09 Decidir preferencias demonstrativas ou edicao simples`: coberta pela decisao de manter preferencias demonstrativas nesta Sprint; issue ainda `OPEN`.

## Recomendacao final

**Merge recomendado em `dev`: sim, com ressalvas.**

Antes ou logo apos o merge, recomendo registrar no PR/issues que o QA Gate remoto nao apareceu, que a decisao foi aceitar a validacao local complementar, e que as issues #46-#54 precisam de fechamento/triagem manual se o GitHub nao as fechar automaticamente.
