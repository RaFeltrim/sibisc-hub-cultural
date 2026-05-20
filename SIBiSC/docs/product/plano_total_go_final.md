# Plano Total GO final - SIBiSC/Feltrim Agents

Data: 2026-05-19  
Escopo: fechamento final do repositorio para apresentacao academica controlada do SIBiSC, sem prometer produto operacional real.

## Definicao objetiva de GO

### Total GO academico/controlado

O SIBiSC esta em **Total GO academico/controlado** quando pode ser apresentado como prototipo demonstrativo de web-app React/Vite para descoberta de noticias, eventos, catalogo local, disponibilidade demonstrativa por unidade, perfil mockado e Feltrim Agents como assistente guiado.

Este GO permite demonstracao publica controlada com roteiro honesto, desde que a fala repita:

- os dados sao locais, mockados ou demonstrativos;
- a disponibilidade nao substitui confirmacao oficial da biblioteca;
- nao ha reserva, pre-reserva ou renovacao oficial;
- nao ha backend operacional, autenticacao, persistencia real ou integracao SIBI/PHL;
- Feltrim Agents e assistente guiado por perguntas fechadas e regras locais, nao IA generativa;
- acessibilidade foi melhorada e validada de forma controlada, mas nao equivale a declaracao WCAG AA completa.

### GO operacional/produto real

O SIBiSC so deve receber **GO operacional/produto real** depois de validacoes externas e decisoes institucionais. Esse GO exige backend real, fonte de verdade oficial, autenticacao, governanca de dados, reserva/renovacao transacional, auditoria formal de acessibilidade, suporte operacional e contrato claro com SIBI/PHL ou outro sistema oficial.

No estado atual, o veredito operacional continua **NO-GO**.

## Itens concluidos neste fechamento

- Datas de eventos mockados foram movidas de marco/2026 para junho/2026, removendo o maior risco de narrativa de agenda expirada.
- Datas e texto principal das noticias mockadas foram atualizados para maio/2026 e programacao de junho/2026.
- Home mobile de referencia foi sincronizada com as novas datas de eventos/noticias.
- Copy da Home reforca "assistente guiado em prototipo" e deixa claro que nao ha backend de IA generativa nem reserva real.
- `package.json` e `package-lock.json` passaram a declarar `engines.node >=22`, alinhando desenvolvimento local, CI e Vercel; `package.json` tambem expoe `npm run qa-guard` como alias do guard existente.
- `docs/INDEX.md` foi atualizado para listar auditoria, plano Total GO e evidencia final.
- `docs/product/release_final_status.md` recebeu adendo de fechamento sem apagar historico.
- Evidencia final foi criada em `docs/qa/total_go_evidencias.md`.

## Itens fora do escopo atual

Os itens abaixo continuam fora do MVP academico/controlado porque dependem de produto real, credenciais, contrato, validacao externa ou operacao institucional:

- backend real, Supabase ativo em fluxos principais, RLS operacional e persistencia;
- autenticacao, cadastro, preferencias editaveis e gestao de consentimento;
- integracao oficial com SIBI/PHL, catalogo institucional ou fonte de verdade equivalente;
- reserva, pre-reserva, renovacao oficial, circulacao e confirmacao transacional;
- IA generativa, LLM, chat livre, memoria conversacional, guardrails e avaliacao de respostas;
- canal de feedback institucional com dono, SLA e tratamento fora do GitHub;
- observabilidade, analytics, logs de auditoria e monitoramento de producao;
- geolocalizacao real por navegador/GPS e calculo formal de distancia;
- auditoria formal WCAG AA, contraste completo e testes dedicados com NVDA, Narrator ou VoiceOver;
- validacao final irrestrita de professor/orientador, biblioteca ou area institucional.

## Estrategia `/home-mobile` versus home responsiva

A rota `/home-mobile` permanece como rota manual de demonstracao mobile. Isso e aceitavel para o Total GO academico/controlado se a equipe acessar a rota explicitamente durante a demo.

Para GO operacional/produto real, a recomendacao e substituir a estrategia por uma home unica responsiva ou por decisao de roteamento documentada e testada para viewport mobile. O fechamento atual nao implementa redirect automatico porque isso mudaria comportamento de entrada da aplicacao perto da entrega.

## Checklist final de apresentacao

- Abrir a apresentacao declarando: "prototipo academico demonstrativo, com dados locais/mockados".
- Mostrar Home, Noticias, Eventos, Catalogo, Detalhe de Livro, Perfil, Feltrim Agents e 404 controlado.
- Ao mostrar catalogo/disponibilidade, dizer que a contagem e demonstrativa e deve ser confirmada com a biblioteca.
- Ao mostrar Perfil, dizer que nome, historico, favoritos, emprestimos e notificacoes sao mocks locais.
- Ao mostrar Feltrim Agents, usar "assistente guiado" e evitar "IA real", "LLM" ou "chat generativo".
- Ao mostrar renovacao/perfil, dizer que e simulacao demonstrativa, sem operacao oficial.
- Ao mostrar acessibilidade, dizer "boas praticas e validacao controlada", nao "WCAG AA completo".
- Se demonstrar celular, abrir `/home-mobile` explicitamente.
- Citar `docs/qa/total_go_evidencias.md` como evidencia final dos comandos executados.

## Proximos passos para produto real

1. Definir fonte de verdade: SIBI/PHL, Supabase espelho, importacao manual governada ou outra API oficial.
2. Modelar autenticacao, autorizacao, RLS, consentimento e privacidade antes de persistir dados de usuario.
3. Implementar reserva/renovacao somente com regras institucionais, logs e confirmacao de operacao.
4. Criar testes unitarios e E2E formais para Home, Catalogo, Detalhe, Eventos, Perfil e Feltrim Agents.
5. Rodar auditoria de acessibilidade formal com medicao de contraste e leitores de tela especificos se isso for comunicado.
6. Definir canal de feedback publico sem dependencia de GitHub para usuarios nao tecnicos.
7. Planejar observabilidade, analytics e processo de manutencao dos mocks ate a troca por dados reais.

## Veredito recomendado

**TOTAL GO academico/controlado** para apresentacao e entrega demonstrativa, com narrativa honesta e evidencias no repositorio.

**NO-GO operacional/produto real** ate que as dependencias externas, tecnicas e institucionais sejam fechadas.
