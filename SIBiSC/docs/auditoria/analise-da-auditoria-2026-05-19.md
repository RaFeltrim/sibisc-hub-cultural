# Analise da auditoria completa - SIBiSC/Feltrim Agents

**Data:** 2026-05-19  
**Base analisada:** `docs/auditoria/auditoria-completa-2026-05-19.md` e `docs/auditoria/aprendizados/auditoria-senior-sibisc.md`  
**Escopo:** revisao senior do relatorio, comparacao pontual com estado atual do projeto, docs finais recentes e deploy publico.  
**Restricao aplicada:** analise somente leitura do projeto; nenhuma alteracao de codigo, indice ou configuracao foi feita por este documento.

---

## Sumario executivo

O relatorio principal e tecnicamente forte, rastreavel e util para tomada de decisao. Ele separa bem fatos, inferencias, recomendacoes e severidades, e acerta o veredito central: **GO para apresentacao academica controlada como prototipo demonstrativo; NO-GO para produto operacional; NO-GO para declarar conformidade WCAG completa**.

Nao ha P0 identificado. O principal P1 continua real: **todos os eventos mockados estao datados em marco de 2026**, o que prejudica a narrativa publica em maio/junho de 2026. Os P2 relevantes sao ausencia de testes formais, ausencia de `engines`, validacao formal incompleta de contraste/leitores especificos e decisao ainda aberta sobre a experiencia mobile em `/` versus `/home-mobile`.

Alguns achados do relatorio precisam ser lidos com o contexto mais recente: headers de seguranca e HTTP 404 real estao **confirmados no dominio publico** nesta revisao; a validacao da Sofia fecha a pendencia para apresentacao controlada, mas nao substitui NVDA/Narrator/VoiceOver; a mitigacao de contraste reduziu risco visual, mas ainda nao autoriza afirmar WCAG AA completa.

---

## Veredito geral atualizado

| Frente | Veredito atualizado | Racional |
| --- | --- | --- |
| Apresentacao academica controlada | **GO com ressalva P1** | O app esta funcional, documentado e deployado; atualizar ou contextualizar datas dos eventos antes da demonstracao. |
| Apresentacao publica ampla | **GO condicional** | Viavel se o discurso reforcar prototipo, mocks, ausencia de reserva real e limites de acessibilidade formal. |
| Entrega academica | **GO** | Documentacao, CI, build, QA guard, evidencias e rastreabilidade superam o minimo esperado. |
| Produto operacional real | **NO-GO** | Sem backend operacional, autenticacao, reserva, persistencia, integracao SIBI/PHL e governanca de dados reais. |
| Declaracao WCAG AA completa | **NO-GO** | Ha boas praticas e validacao assistiva controlada, mas faltam medicao formal de contraste e rodada dedicada com leitores especificos se essa compatibilidade for comunicada. |
| Deploy publico atual | **GO tecnico** | Dominio publico respondeu `200` na home, `404` em rota inexistente e headers defensivos principais presentes. |

---

## Achados por severidade

### P0 - Critico

Nenhum P0 real foi encontrado. O projeto nao apresenta bloqueio tecnico que impeça carregamento, build, navegacao principal ou apresentacao controlada.

### P1 - Alto

1. **Eventos passados em `src/mocks/events.js`.** Os sete eventos estao entre `2026-03-20` e `2026-03-29`. Para uma apresentacao em maio/junho de 2026, isso parece erro de produto, mesmo sendo mock.
2. **Risco de narrativa publica se "Feltrim Agents" for apresentado como IA real.** A UI e a documentacao avisam que e assistente guiado/prototipo, mas a apresentacao precisa repetir isso verbalmente.

### P2 - Medio

1. **Sem testes unitarios/E2E formais.** `qa-guard.mjs` e valioso, mas valida contratos/dados, nao comportamento de UI.
2. **Sem `engines` no `package.json`.** O CI usa Node 22, mas o pacote nao fixa versao minima.
3. **Acessibilidade formal incompleta.** Sofia valida o GO controlado, mas nao ha execucao auditiva dedicada com NVDA/Narrator/VoiceOver nem medicao manual completa de contraste.
4. **Duas homes sem selecao automatica por viewport.** `/home-mobile` funciona, mas usuarios mobile em `/` dependem do layout desktop ou da comunicacao da rota manual.
5. **Processo de manutencao de mocks temporais ausente.** A auditoria aponta o problema, mas falta uma regra operacional explicita para atualizar datas antes de demos.

### P3 - Baixo

1. Quick Actions mobile com siglas `CAT`, `AGE`, `NOT` podem ser pouco claras.
2. `NotFoundPage` usa `<section>` como raiz interna; como o `AppLayout` ja fornece `<main>`, o risco real e baixo.
3. Google Fonts externo e `@import` sem preconnect sao aceitaveis para prototipo, mas subotimos para produto.
4. Dois `vercel.json` podem confundir mantenedores; a raiz do monorepo deve ser documentada como autoritativa.
5. Noticias tambem estao em marco de 2026; e menor que eventos, mas envelhece a narrativa.
6. `docs/INDEX.md` nao lista a nova area `docs/auditoria/`.

---

## Matriz - achado da auditoria x estado atual x acao recomendada

| ID | Achado da auditoria | Estado atual observado | Classificacao atual | Acao recomendada |
| --- | --- | --- | --- | --- |
| A-001 | Eventos em marco/2026, todos passados | Confirmado em `src/mocks/events.js` | **P1 pendente real** | Atualizar datas para periodo da apresentacao ou explicar explicitamente como agenda historica/mockada. |
| A-002 | Ausencia de `engines` no `package.json` | Confirmado; scripts existem, sem chave `engines` | **P2 pendente real** | Adicionar `node >=22` em sprint tecnica futura. |
| A-003 | `/home-mobile` nao e acessada automaticamente por viewport | Confirmado em `AppRouter.jsx`; rota separada manual | **P2 decisao de produto** | Implementar home responsiva unica ou documentar intencao da rota manual. |
| A-004 | Sem Vitest/Jest/Playwright config | Confirmado; ha QA guard, nao framework de teste | **P2 pendente real** | Criar testes unitarios dos services e, se houver tempo, smoke E2E minimo. |
| A-005 | Contraste nao medido formalmente | Mitigacoes documentadas em `final_a11y_security_polish.md`, mas medicao completa segue pendente | **P2 parcialmente mitigado** | Medir pontos criticos antes de declarar WCAG AA. |
| A-006 | Sem NVDA/Narrator/VoiceOver | Sofia validou experiencia assistiva controlada; leitores especificos nao executados | **P2 parcialmente resolvido** | Nao comunicar compatibilidade com leitores especificos sem rodada dedicada. |
| A-007 | Quick Actions mobile abreviadas | Mantido como observado na auditoria | **P3 pendente** | Trocar por rotulos completos se houver polimento visual. |
| A-008 | `NotFoundPage` com `<section>` raiz | Confirmado; impacto reduzido porque `AppLayout` envolve com `<main>` | **P3 baixo risco** | Corrigir apenas se houver sprint de semantica fina. |
| A-009 | Google Fonts externo | Confirmado e permitido pela CSP | **P3 monitorar** | Auto-hospedar somente para produto real ou politica de privacidade mais rigorosa. |
| A-010 | `dist/` local pode confundir | Artefato gerado/ignorado; nao e risco operacional | **P3 documentacao** | Manter onboarding claro sobre `dist/` gerado por build. |
| A-011 | Dois `vercel.json` | Confirmado; configs consistentes | **P3 documentacao** | Documentar que o `vercel.json` da raiz do monorepo e autoritativo no deploy principal. |
| A-012 | Noticias em marco/2026 | Confirmado em `src/mocks/news.js` | **P3 pendente** | Atualizar se a narrativa publica depender de atualidade. |
| A-013 | `SectionHeader` limitado a h1/h2 | Baixo impacto no estado atual | **P3 futuro** | Ampliar para `1-6` somente se surgirem paginas mais complexas. |
| A-014 | Fonts sem preconnect | Confirmado; impacto baixo | **P3 futuro** | Adicionar preconnect em sprint de performance. |
| A-015 | Noticias sem filtro por categoria | Limite funcional aceitavel para MVP | **P3 opcional** | Implementar filtro se a banca cobrar exploracao de conteudo. |
| D-001 | Headers defensivos deveriam ser confirmados em deploy | Confirmado nesta revisao com `curl -I` no dominio publico | **Resolvido** | Manter monitoramento apos novos deploys. |
| D-002 | 404 real em rota inexistente tinha evidencias divergentes em docs finais | Confirmado nesta revisao: rota inexistente retorna `404 Not Found` no Vercel | **Resolvido/desatualizacao documental** | Atualizar docs finais em oportunidade futura para remover divergencia historica. |
| D-003 | Worktree limpo na auditoria | Estado atual tem `docs/auditoria/` e `.playwright-cli/` como untracked | **Divergencia temporal** | Nao e bug do app; apenas registrar que a auditoria/docs ainda nao estao versionados. |
| D-004 | Auditoria nao indexada | `docs/INDEX.md` nao lista `docs/auditoria/` | **Documentacao pendente** | Recomendar inclusao no indice, sem alterar sem pedido. |

---

## Itens que exigem correcao

1. **Atualizar datas dos eventos.** Esta e a unica correcao que eu trataria como pre-apresentacao obrigatoria. E barata e remove o maior ponto de constrangimento publico.
2. **Definir a estrategia mobile.** Se a apresentacao usar celular, ou divulgar `/home-mobile`, ou implementar/explicar responsividade da rota `/`.
3. **Adicionar `engines` no pacote.** Nao bloqueia agora, mas reduz ambiguidade entre desenvolvimento local, CI e Vercel.
4. **Criar pelo menos testes unitarios de services.** O primeiro alvo deve ser `guidedAssistantService`, catalogo e formatadores, porque concentram regras de negocio e contratos com mocks.
5. **Executar medicao formal de contraste se a comunicacao mencionar acessibilidade.** Sem essa etapa, a afirmacao correta e "boas praticas e validacoes parciais", nao "WCAG AA completo".

---

## Itens que exigem apenas documentacao ou monitoramento

1. **Indexacao da auditoria.** `docs/INDEX.md` ainda nao lista `docs/auditoria/auditoria-completa-2026-05-19.md`, o documento de aprendizados nem esta analise. Recomendo indexar depois, mas nao alterar sem pedido.
2. **Dois `vercel.json`.** Configuracao duplicada esta consistente; basta documentar a fonte autoritativa.
3. **Google Fonts externo.** Monitorar como risco de privacidade/performance para produto real; aceitavel no prototipo.
4. **Sofia como validacao assistiva.** Documentar sempre a diferenca entre validacao humana controlada e auditoria especifica de NVDA/Narrator/VoiceOver.
5. **HTTP 404 e headers.** Confirmados no deploy publico nesta revisao; revalidar apos mudancas em `vercel.json`, Vercel ou rotas.

---

## Itens que parecem ja resolvidos

1. **Headers defensivos em producao.** O dominio publico retorna CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` e HSTS.
2. **HTTP 404 real para rota inexistente no Vercel.** A rota `/rota-inexistente-analise-auditoria` retornou `404 Not Found`, alinhando o deploy atual com a auditoria principal.
3. **Skip link, landmarks e foco.** `final_a11y_security_polish.md` registra skip link, `main` focavel, footer rotulado e bottom nav reorganizada no DOM.
4. **Risco visual de contraste parcialmente mitigado.** Tokens e estados visuais foram reforcados, embora falte medicao formal completa.
5. **Comunicacao de prototipo.** O relatorio e os docs finais mostram avisos recorrentes sobre mocks, ausencia de reserva real, ausencia de backend operacional e Feltrim Agents como assistente guiado.
6. **Seguranca basica de SPA estatica.** Sem tokens hardcoded, `.env` ignorado, `.env.example` com placeholders, links externos com protecao contra opener.

---

## Divergencias e desatualizacoes relevantes

1. **404 publico.** Docs anteriores indicavam que uma rota inexistente ainda retornava `200` ou que a validacao remota estava pendente. No estado observado nesta analise, o dominio publico retorna `404` para rota invalida.
2. **Headers finais.** `final_a11y_security_polish.md` registrava validacao remota pendente por preview `401`. No dominio publico atual, os headers defensivos estao presentes.
3. **Worktree.** A auditoria registrava worktree limpa com `.playwright-cli/` ignorado. O estado atual mostra `docs/auditoria/` e `.playwright-cli/` como untracked no nivel do monorepo.
4. **Acessibilidade assistiva.** A auditoria esta correta ao manter ressalva para NVDA/Narrator/VoiceOver, mas deve ser lida junto de `validacao_leitor_tela_sofia.md`: Sofia fecha o GO controlado, nao uma certificacao de leitores especificos.
5. **Contraste.** A auditoria tratava contraste como inferencia estatica; docs posteriores mostram mitigacoes reais, mas a pendencia formal continua.

---

## Riscos por frente

| Frente | Risco atual | Severidade | Tratamento |
| --- | --- | --- | --- |
| Apresentacao publica | Eventos passados e interpretacao de "Agents" como IA real | **P1/P2** | Atualizar datas e declarar que e assistente guiado sem LLM. |
| Entrega academica | Banca questionar ausencia de testes formais | **P2** | Explicar `qa-guard.mjs`, CI e evidencias manuais; planejar Vitest/E2E como proximo passo. |
| Acessibilidade | Declarar WCAG AA ou compatibilidade com leitores especificos sem base suficiente | **P2** | Usar linguagem restrita: boas praticas, validacao Sofia e ressalvas. |
| Seguranca | Baixo risco para SPA estatica; risco maior so se virar produto real com dados | **P3** | Manter headers, CSP, sem segredos e aviso de PII. |
| Manutencao | Mocks temporais envelhecem e duplicidade de configs confunde | **P2/P3** | Criar checklist pre-demo e documentar config autoritativa. |
| Deploy | Mudancas futuras em rewrites podem quebrar deep links ou 404 | **P3** | Revalidar `200`/`404` e headers apos cada alteracao de deploy. |

---

## Analise do documento de aprendizados

O documento `docs/auditoria/aprendizados/auditoria-senior-sibisc.md` e reutilizavel. Ele possui fonte, contexto, quando reusar, principios, checklist, riscos, limitacoes e decisoes especificas do SIBiSC. Tambem extrai padroes bons para outros SPAs academicos: `qa-guard`, headers Vercel, rewrites restritivos, Supabase inativo com fallback e comunicacao repetida de limites.

Pontos fortes:

1. **Boa portabilidade.** Serve como checklist para auditorias de React/Vite/Vercel.
2. **Boa granularidade.** Distingue riscos de produto, deploy, mocks, acessibilidade e seguranca.
3. **Boa rastreabilidade.** Aponta o relatorio principal como referencia.
4. **Boa decisao de pasta.** Estar em `docs/auditoria/aprendizados/` e coerente com o tema.

Licoes que faltam ou merecem atualizacao:

1. **Desatualizacao documental tambem e risco.** O caso 404/headers mostra que docs finais podem ficar inconsistentes poucas horas depois de um deploy.
2. **Validacao assistiva precisa de vocabulario preciso.** "Pessoa leitora de tela real", "validacao com Sofia" e "NVDA/Narrator/VoiceOver auditado" nao sao equivalentes.
3. **Auditoria deve registrar o estado Git dos documentos de auditoria.** Neste momento, a pasta `docs/auditoria/` aparece como untracked.
4. **Indice documental faz parte da entrega.** Relatorios importantes fora do `docs/INDEX.md` perdem descobribilidade.
5. **Deploy publico deve ser rechecado com timeout.** O uso de `HEAD`/`curl -I` com timeout evita conclusoes travadas por rede ou preview autenticado.

Recomendacao: manter o documento no local atual, mas atualizar em uma proxima rodada com uma secao "Licoes pos-auditoria" contendo os cinco pontos acima e referenciar tanto a auditoria principal quanto esta analise. Tambem recomendo indexar a area `docs/auditoria/` no `docs/INDEX.md` quando houver autorizacao para alterar o indice.

---

## Recomendacoes de proximos passos

### Antes da apresentacao

1. Atualizar `src/mocks/events.js` para datas atuais/futuras ou preparar uma fala explicando que a agenda e historica/mockada.
2. Reforcar no roteiro: Feltrim Agents e assistente guiado com respostas fixas, sem LLM e sem reserva real.
3. Se demonstrar em celular, acessar explicitamente `/home-mobile` ou explicar a decisao de rota mobile separada.
4. Evitar declarar "WCAG AA completo" ou "compatibilidade NVDA/Narrator/VoiceOver" sem nova rodada dedicada.

### Proxima sprint tecnica

1. Adicionar `engines` no `package.json`.
2. Criar testes unitarios minimos para services e regras de recomendacao.
3. Medir contraste manualmente nos pontos com gradiente, bottom nav, footer, estados de foco/hover/active.
4. Documentar processo de atualizacao de mocks temporais.
5. Indexar `docs/auditoria/` no `docs/INDEX.md`.

### Futuro de produto

1. Consolidar experiencia responsiva em uma home unica ou implementar deteccao/redirect mobile.
2. Definir canal de feedback nao dependente de GitHub para publico nao tecnico.
3. Planejar backend real, autenticacao, reserva, renovacao e integracao SIBI/PHL apenas se o projeto sair do escopo academico.

---

## Go/No-Go atualizado

**GO para apresentacao academica controlada**, desde que a equipe trate verbalmente e/ou corrija o P1 das datas dos eventos.

**GO para entrega academica**, com ressalvas transparentes: prototipo, mocks, sem backend operacional, sem reserva real e sem IA generativa.

**GO tecnico para deploy publico atual**, pois a home responde `200`, rota inexistente responde `404` e headers defensivos estao presentes.

**NO-GO para produto operacional**, por ausencia de dados reais, autenticacao, persistencia, reserva/renovacao oficial e integracao institucional.

**NO-GO para declaracao plena de acessibilidade/WCAG AA**, ate haver medicao formal de contraste e, se comunicado, testes auditivos dedicados com NVDA/Narrator/VoiceOver.

---

## Nota sobre indexacao

O `docs/INDEX.md` nao lista `docs/auditoria/auditoria-completa-2026-05-19.md`, `docs/auditoria/aprendizados/auditoria-senior-sibisc.md` nem esta analise. Isso e relevante para rastreabilidade da entrega. Recomendo adicionar uma secao "Auditoria" ao indice em uma proxima alteracao autorizada.
