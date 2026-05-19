# Review PR #57 - Sprint 2 SIBiSC/Feltrim Agents

Data: 2026-05-19  
PR: [#57](https://github.com/RaFeltrim/sibisc-hub-cultural/pull/57)  
Base: `dev`  
Head: `feature/sibisc-feedback-gamification-sprint2`  
Escopo: revisao QA/TL/SE local antes do merge em `dev`.

## Veredito

**Aprovado com ressalvas baixas.**

Nao encontrei bug funcional bloqueante no canal de feedback Sofia/Claudia, na privacidade do CTA, na jornada demonstrativa do leitor, na gamificacao leve, no `feedbackService`, no `userProfileService`, no `qa-guard`, nas evidencias visuais ou nos smokes das rotas afetadas.

Recomendacao Go/No-Go: **GO para merge em `dev`**, desde que o time aceite as ressalvas P3 abaixo como melhorias nao bloqueantes. Nao foi feito commit, push ou merge nesta revisao.

## Achados por severidade

### Criticos / P0

- Nenhum achado.

### Altos / P1

- Nenhum achado.

### Medios / P2

- Nenhum achado funcional. O incremento permanece dentro do contrato da Sprint 2: feedback por GitHub Issues, sem coleta de dados sensiveis pelo app, sem ranking publico, sem competicao e sem promessa de persistencia real.

### Baixos / P3 e ressalvas

- **Template de feedback poderia repetir o aviso sobre prints privados.** A UI e `feedbackService.js` orientam a nao enviar dados sensiveis, tokens, documentos, enderecos completos ou prints com informacoes privadas. O template `.github/ISSUE_TEMPLATE/feedback_sofia_claudia.md` contem criterio final contra segredos/tokens/dados pessoais desnecessarios, mas a secao "Evidencias" ainda lista "Print/video/log" sem repetir o aviso. Nao bloqueia o merge, mas vale reforcar em ajuste posterior.
- **`qa-guard` cobre o contrato principal, mas nao valida o conteudo do template de Issue.** O guard confirma URL, template esperado na query string, privacidade no service e `publicRanking: false`. Como o template existe, nao ha falha atual; a melhoria seria checar existencia e tokens de privacidade do template para evitar regressao futura.
- **Documento de evidencias tem uma pendencia desatualizada.** `docs/qa/sprint2_evidencias_validacao.md` ainda lista "Abrir PR contra `dev` se as validacoes passarem", mas o PR #57 ja esta aberto. E uma ressalva documental baixa.
- **Leitor de tela real nao foi executado nesta rodada.** O diff usa `aria-live`, `aria-pressed`, `aria-controls`, `role="progressbar"`, foco visivel e textos explicitos, mas NVDA/VoiceOver/leitor real continua recomendado antes da release final.

## Revisao do diff

- **Feedback Sofia/Claudia via GitHub Issues:** Home desktop e Home mobile exibem CTA para `issues/new?template=feedback_sofia_claudia.md`, com `target="_blank"` e `rel="noopener noreferrer"`. O template dedicado existe no repo.
- **Privacidade:** o aviso do service e da UI nao pede dados sensiveis e orienta contra tokens, documentos, enderecos completos e prints privados. O app nao coleta feedback diretamente; delega para GitHub Issues.
- **Gamificacao leve:** `getReaderJourney()` calcula trilhas, selos e metas a partir de mocks locais e declara explicitamente que nao ha ranking publico, pontuacao competitiva ou persistencia real. Badges tambem carregam `publicRanking: false`.
- **Acessibilidade e foco:** botoes guiados usam `aria-pressed`/`aria-controls`; resposta usa `aria-live`; progresso usa `role="progressbar"` com `aria-valuemin`, `aria-valuemax` e `aria-valuenow`; CTAs e tabs tem foco visivel. Contraste aparente ficou adequado nos screenshots revisados.
- **Mobile:** `/home-mobile` renderizou o card de feedback em viewport 375x812. A evidencia visual mostra layout estreito sem quebra aparente relevante.
- **Robustez de services:** `feedbackService.js` e simples e sem estado; `userProfileService.js` clona dados de leitura e preserva mocks locais; progresso e limitado a 100%; IDs de livros sao filtrados contra catalogo local. Nao ha promessa de backend real.
- **Robustez do `qa-guard`:** o guard passou e cobre rotas criticas, IDs canonicos, disponibilidade, recomendacoes, URL de feedback, aviso de privacidade, jornada do leitor, ausencia de ranking publico e campos minimos de trilhas/selos/metas.
- **Screenshots/evidencias:** os tres PNGs da Sprint 2 existem e foram abertos: Home com CTA de feedback, Perfil com Jornada do leitor e Home mobile com Feedback Sofia/Claudia. A documentacao de Sprint 2 esta coerente, salvo a pendencia desatualizada citada em P3.

## Testes rodados

- `ReadLints` nos arquivos alterados pelo PR #57: aprovado, sem erros reportados.
- `npm run qa:repo` em `SIBiSC`: aprovado.
- `npm run qa:ci` em `SIBiSC`: aprovado, incluindo `vite build` com 84 modulos transformados.
- Smoke Playwright/Edge em servidor Vite local temporario:
  - `/`: abriu Home e confirmou o seletor `text=Feedback operacional`.
  - `/perfil`: abriu Perfil e confirmou o seletor `text=Jornada do leitor`.
  - `/home-mobile` em 375x812: abriu Home mobile e confirmou o seletor `text=Feedback Sofia/Claudia`.
- Evidencias existentes revisadas visualmente:
  - `docs/qa/sprint2-smoke-home.png`
  - `docs/qa/sprint2-smoke-perfil.png`
  - `docs/qa/sprint2-smoke-home-mobile.png`

## Riscos residuais

- Usuarios ainda podem anexar prints privados no GitHub por engano; a UI mitiga, mas o template poderia reforcar o aviso exatamente na secao de evidencias.
- O GitHub Issues e um canal externo ao app; dados enviados seguem a visibilidade/configuracao do repositorio, nao uma politica de coleta interna do SIBiSC.
- A validacao de acessibilidade foi estrutural e por smoke visual; teste com leitor de tela real segue como recomendacao antes da release final.
- A jornada do leitor e mock/local; se futuramente houver backend real, sera necessario revalidar privacidade, consentimento, retencao e promessa de persistencia.

## Recomendacao final

**Merge recomendado em `dev`: sim.**

Antes ou logo apos o merge, recomendo registrar as ressalvas P3 como backlog: reforcar o aviso de prints privados no template de Issue, ampliar o `qa-guard` para validar o template e atualizar a pendencia documental da Sprint 2.
