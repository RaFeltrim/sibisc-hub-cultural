# Plano da sprint final de fechamento - SIBiSC/Feltrim Agents

Data: 2026-05-19  
Workspace: `C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile`  
App: `SIBiSC`  
Tipo: reuniao de planejamento da sprint atual para fechamento final do prototipo.

## 1. Contexto e objetivo

O SIBiSC/Feltrim Agents chega a esta sprint final com Sprints 0, 1, 2 e 3 integradas em `main`, configuracao de deploy documentada, matriz comparativa versionada, testes manuais executados e veredito consolidado:

- **GO** para apresentacao publica controlada como prototipo academico demonstrativo.
- **NO-GO** para produto operacional, release sem ressalvas, declaracao de acessibilidade final ou uso como sistema real de biblioteca.

O objetivo desta sprint final e fechar as ressalvas que hoje separam o prototipo demonstravel de uma entrega mais confiavel para apresentacao publica controlada, reduzindo risco de promessa operacional, regressao mobile, declaracao indevida de acessibilidade, fragilidade de deploy/headers e barreira de feedback.

## 2. Participantes simulados e papel na reuniao

| Papel | Responsabilidade na reuniao |
| --- | --- |
| PO | Defender proposta de valor, limites do produto, priorizacao por impacto no usuario e criterios de aceite de comunicacao. |
| PM | Fechar escopo da sprint, sequenciamento, riscos, dependencias e expectativa de Go/No-Go. |
| GP | Garantir plano executavel, donos, RACI, checkpoints e decisao sobre o que fica fora. |
| TL | Avaliar viabilidade tecnica, ordem de implementacao, deploy, headers, 404 e impacto em arquitetura. |
| Dev Front | Estimar e executar ajustes de UI, microcopy, mobile, acessibilidade estrutural e testes frontend. |
| QA/SDET | Definir regressao manual, criterios de aceite, testes automatizados e evidencias finais. |
| UX/Acessibilidade | Garantir clareza, navegacao por teclado, semantica, contraste e roteiro de leitor de tela. |
| SE | Validar headers, links externos, privacidade, feedback publico e limites de promessa operacional. |
| Sofia | Consolidar feedback qualitativo, riscos de narrativa, aprendizagem e recomendacao para Rafael. |
| Claudia | Cuidar de roteiro publico, linguagem, canal de feedback alternativo e comunicacao com usuarios nao tecnicos. |

## 3. Escopo por prioridade

### P0 - Bloqueadores criticos

Nao ha P0 aberto identificado nos documentos finais. A regra da sprint e: qualquer novo P0 encontrado durante correcao ou validacao bloqueia o fechamento e reabre planejamento.

### P1 - Entra obrigatoriamente na sprint final

1. Tornar a disponibilidade mockada mais clara no catalogo, detalhe e disponibilidade por unidade.
2. Corrigir o bug da bottom nav interceptando o botao `Buscar` em `/home-mobile` no viewport `390x844`.
3. Executar validacao real com NVDA/Narrator/leitor de tela ou, se nao for possivel, registrar roteiro executado manualmente com assistencia humana e limitacao explicita.

### P2 - Entra na sprint final se nao ameaçar P1

1. Configurar headers de seguranca de producao ou documentar limitacao e plano tecnico.
2. Resolver rota inexistente retornando HTTP 200 apesar da UI 404, ou registrar decisao consciente do fallback SPA.
3. Criar alternativa ou plano de contingencia para feedback sem depender de login GitHub.
4. Ajustar progresso da Jornada do leitor acima da meta (`7/5`, `7/6`, `7/3`) para estado de meta superada.
5. Trocar microcopy da acao `Renovar` para deixar claro que e demonstrativa.
6. Marcar o topo do Perfil como demonstrativo.
7. Corrigir acessibilidade estrutural ja mapeada: `h1` em listagens, `aria-controls` das abas do Perfil e descoberta do Perfil no desktop.

### P3 - Entra apenas como acabamento controlado

1. Padronizar links externos com `rel="noopener noreferrer"`.
2. Medir contraste formalmente antes de qualquer declaracao WCAG.
3. Padronizar acentos e microcopy institucional.
4. Revisar tamanho de CTAs secundarios.
5. Simplificar roteiro de apresentacao mobile.
6. Confirmar evidencia do dashboard Vercel e organizar limpeza de branches em tarefa futura separada.

## 4. Itens que entram e nao entram

### Entram na sprint final

- Correcoes pequenas e direcionadas de UI, microcopy, layout mobile, acessibilidade estrutural, headers, 404, feedback e validacao.
- Testes automatizados ou scripts de QA quando cobrirem diretamente os riscos P1/P2.
- Evidencias finais em documentos de QA e produto.
- Ajustes de narrativa de demonstracao para impedir promessa de dado real, reserva real, IA generativa real ou acessibilidade final nao validada.

### Nao entram na sprint final

- Backend real, banco de dados real, reserva real, renovacao oficial ou integracao com SIBI/PHL.
- IA generativa, chat aberto, automacao de atendimento ou agente autonomo real.
- Redesign amplo da Home, Catalogo, Perfil ou Jornada.
- Novo sistema de autenticacao.
- Limpeza de branches sem autorizacao explicita de Rafael.
- Mudancas em portfolio ou repositorios fora de `SIBiSC`.
- Declaracao de conformidade WCAG AA sem validacao assistiva e medicao formal.

## 5. Historias e tarefas propostas

### SF-01 - Aviso persistente de disponibilidade mockada

**Prioridade:** P1  
**Donos:** PO, Dev Front, TL  
**Objetivo:** impedir que usuario interprete numeros de disponibilidade como inventario real.

**Escopo:**

- Adicionar aviso visivel proximo de cada numero/status de disponibilidade no catalogo, detalhe e lista por unidade.
- Reforcar que a disponibilidade e demonstrativa/mockada e deve ser confirmada com a biblioteca.
- Garantir que a mensagem tambem exista para usuarios que entram direto em `/catalogo` ou `/catalogo/:id`.

**Criterios de aceite:**

- `/catalogo` exibe aviso de disponibilidade demonstrativa antes ou junto dos cards.
- `/catalogo/:id` exibe aviso junto do total de exemplares e junto da disponibilidade por unidade.
- Nenhum texto sugere reserva, retirada ou estoque real sem ressalva proxima.
- QA confirma que o fluxo direto do catalogo nao depende da Home para entender o limite.

### SF-02 - Corrigir bottom nav interceptando `Buscar`

**Prioridade:** P1  
**Donos:** Dev Front, QA/SDET  
**Objetivo:** garantir que CTAs visiveis em mobile sejam acionaveis.

**Escopo:**

- Ajustar area segura, padding inferior, scroll margin ou posicionamento para impedir sobreposicao da bottom nav fixa.
- Reproduzir o caso em `/home-mobile`, viewport `390x844`, pergunta `Eventos de leitura`, busca `Sapiens`.
- Criar ou atualizar teste mobile para clique no botao `Buscar`.

**Criterios de aceite:**

- O centro do botao `Buscar` nao cai sobre a bottom nav no viewport `390x844`.
- O clique em `Buscar` e acionado sem timeout.
- O layout nao cria overflow horizontal.
- Regressao manual confirma bottom nav funcional apos o ajuste.

### SF-03 - Validacao assistiva real

**Prioridade:** P1  
**Donos:** QA/SDET, UX/Acessibilidade, Claudia, Dev Front  
**Objetivo:** substituir suposicao automatizada por evidencia real com leitor de tela.

**Escopo:**

- Executar roteiro com NVDA ou Narrator em Windows, ou leitor equivalente com pessoa validadora.
- Validar Home, perguntas guiadas, busca, catalogo, detalhe, eventos, Perfil e tabs.
- Registrar evidencia textual, limitacoes e recomendacao final.

**Criterios de aceite:**

- Existe documento de evidencia com ferramenta, data, ambiente, roteiro, resultado e pendencias.
- Regiao `aria-live`, `role=status`, headings, landmarks e tabs foram verificados.
- Se a execucao real nao for possivel, o documento explicita a limitacao e mantem NO-GO para acessibilidade final.
- Nenhuma comunicacao final declara acessibilidade pronta sem essa evidencia.

### SF-04 - Acessibilidade estrutural de listagens e Perfil

**Prioridade:** P2  
**Donos:** Dev Front, QA/SDET, UX/Acessibilidade  
**Objetivo:** corrigir lacunas semanticas que atrapalham navegacao por tecnologia assistiva.

**Escopo:**

- Garantir `h1` apropriado em Catalogo, Noticias e Eventos.
- Corrigir `aria-controls` das abas do Perfil para apontar sempre para paineis existentes ou ajustar a semantica.
- Melhorar descoberta do Perfil no desktop ou documentar caminho de acesso na demonstracao.

**Criterios de aceite:**

- Cada pagina de listagem tem um `h1` unico e coerente.
- Nenhum `aria-controls` ativo aponta para elemento inexistente.
- Navegacao por teclado nas tabs permanece funcional.
- QA registra resultado em checklist de acessibilidade.

### SF-05 - Headers de seguranca e semantica 404

**Prioridade:** P2  
**Donos:** TL, SE, Dev Front  
**Objetivo:** elevar hardening de producao e reduzir falso positivo de rotas inexistentes.

**Escopo:**

- Configurar headers basicos no deploy quando viavel: CSP com `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e equivalente de anti-clickjacking.
- Decidir se a rota inexistente tera HTTP 404 real via deploy/edge/function ou se a limitacao SPA sera documentada formalmente.

**Criterios de aceite:**

- `curl -I` ou ferramenta equivalente confirma os headers esperados em `/` e rota interna relevante, ou registra limitacao tecnicamente justificada.
- Rota inexistente retorna HTTP 404 real ou existe decisao documentada aprovada por Rafael/TL mantendo HTTP 200 por fallback SPA.
- A decisao nao quebra reload direto de rotas validas como `/catalogo/b1`, `/eventos/e1`, `/noticias/n1`, `/perfil` e `/home-mobile`.

### SF-06 - Feedback sem barreira exclusiva de GitHub

**Prioridade:** P2  
**Donos:** Sofia, Claudia, PO, Dev Front  
**Objetivo:** permitir feedback de usuario nao tecnico sem exigir conta GitHub como unico caminho.

**Escopo:**

- Definir alternativa de feedback: formulario externo, email institucional, formulario assistido por Claudia/Sofia ou plano de contingencia em apresentacao.
- Manter aviso de privacidade e nao envio de dados sensiveis.
- Explicar que GitHub Issues pode ser publico.

**Criterios de aceite:**

- Ha pelo menos um caminho de feedback sem login GitHub ou uma decisao documentada de contingencia para a apresentacao.
- O texto orienta claramente sobre privacidade.
- Claudia aprova a linguagem para publico nao tecnico.

### SF-07 - Renovacao demonstrativa e Perfil demonstrativo

**Prioridade:** P2  
**Donos:** PO, Dev Front, SE  
**Objetivo:** remover ambiguidade operacional em Perfil e emprestimos.

**Escopo:**

- Trocar mensagem da acao `Renovar` para explicitar que a renovacao e simulada/mockada.
- Adicionar aviso no topo do Perfil informando que nome, email, historico, favoritos e emprestimos sao demonstrativos.

**Criterios de aceite:**

- A mensagem apos `Renovar` nao parece renovacao real.
- O topo do Perfil comunica o carater demonstrativo antes de dados pessoais ficticios.
- SE aprova a reducao de risco de privacidade/oficialidade.

### SF-08 - Jornada do leitor com meta superada

**Prioridade:** P2  
**Donos:** Dev Front, PO, QA/SDET  
**Objetivo:** evitar que progresso acima da meta pareca erro.

**Escopo:**

- Trocar exibicao `7/5`, `7/6`, `7/3` por "meta superada", `5/5 +2` ou outro padrao aprovado.
- Manter progressbar limitado a 100% e informacao complementar compreensivel.

**Criterios de aceite:**

- Nenhuma meta aparece como fracao acima do denominador sem explicacao.
- O estado de meta superada e claro visual e semanticamente.
- QA valida `/perfil` em desktop e mobile.

### SF-09 - Acabamento de seguranca, contraste e microcopy

**Prioridade:** P3  
**Donos:** Dev Front, SE, UX/Acessibilidade, Claudia  
**Objetivo:** melhorar polimento sem ampliar escopo funcional.

**Escopo:**

- Padronizar links externos com `noopener noreferrer`.
- Medir contraste de textos/acents criticos e registrar resultado.
- Revisar acentos e microcopy institucional.
- Revisar CTAs secundarios pequenos quando o ajuste for simples.

**Criterios de aceite:**

- Links externos principais seguem padrao.
- Medicao de contraste fica registrada; se houver falha, entra como pendencia com severidade.
- Claudia aprova microcopy critica da apresentacao.

## 6. Plano de validacao

### Validacao manual

1. Reexecutar o caso mobile de `/home-mobile` em `390x844`: pergunta `Eventos de leitura`, busca `Sapiens`, clique em `Buscar`.
2. Abrir diretamente `/catalogo` e `/catalogo/b7` sem passar pela Home, confirmando que disponibilidade mockada esta clara.
3. Abrir `/perfil`, validar aviso demonstrativo, acao `Renovar` e Jornada do leitor com meta superada.
4. Navegar por teclado em Home, Catalogo, Eventos, Noticias e Perfil.
5. Executar roteiro de leitor de tela com NVDA/Narrator ou registrar execucao assistida.
6. Validar GitHub Issues e alternativa de feedback sem login GitHub.
7. Validar rotas inexistentes pela UI e por status HTTP.
8. Conferir headers de producao com `curl -I` ou ferramenta equivalente.

### Validacao automatizada

1. Rodar `npm run qa:repo`.
2. Rodar `npm run qa:ci`.
3. Rodar `vite build` se nao estiver coberto por `qa:ci`.
4. Adicionar ou atualizar teste e2e mobile para o botao `Buscar` em `/home-mobile`, se a suite do projeto comportar isso.
5. Adicionar checagem de contrato para textos de mock/disponibilidade, se o `qa-guard` permitir evolucao simples.
6. Rodar Lighthouse/axe nas rotas principais se houver tempo, sem substituir validacao real de leitor de tela.

## 7. RACI por frente

| Frente | R | A | C | I |
| --- | --- | --- | --- | --- |
| Disponibilidade mockada | Dev Front | PO | TL, SE, QA | Rafael, PM |
| Bug mobile bottom nav | Dev Front | TL | QA/SDET, UX | PO, PM |
| Leitor de tela real | QA/SDET | UX/Acessibilidade | Claudia, Dev Front | Rafael, PO |
| Acessibilidade estrutural | Dev Front | UX/Acessibilidade | QA/SDET, TL | PO |
| Headers e 404 | TL | SE | Dev Front, PM | Rafael |
| Feedback alternativo | Claudia | Sofia | PO, Dev Front, SE | Rafael, PM |
| Renovar e Perfil demonstrativo | Dev Front | PO | SE, QA | Rafael |
| Jornada do leitor | Dev Front | PO | QA/SDET, UX | PM |
| Microcopy e roteiro publico | Claudia | PO | Sofia, PM, UX | Rafael |
| Evidencias finais e Go/No-Go | QA/SDET | PM | PO, TL, Sofia | Rafael |

Legenda: R = responsavel por executar; A = aprovador final; C = consultado; I = informado.

## 8. Ordem recomendada de execucao tecnica

1. **SF-01 Disponibilidade mockada**: reduz o maior risco de usuario tomar decisao real com dado demonstrativo.
2. **SF-07 Renovar e Perfil demonstrativo**: fecha a mesma classe de risco operacional no Perfil.
3. **SF-02 Bottom nav mobile**: corrige falha funcional reproduzida em viewport comum.
4. **SF-04 Acessibilidade estrutural**: prepara base antes de validar leitor de tela.
5. **SF-03 Validacao assistiva real**: gera evidencia final e define se acessibilidade segue NO-GO ou vira GO com ressalvas menores.
6. **SF-05 Headers e 404**: endurece producao e decide semantica HTTP sem quebrar SPA.
7. **SF-08 Jornada do leitor**: melhora polimento de produto e reduz percepcao de bug.
8. **SF-06 Feedback alternativo**: reduz barreira para publico nao tecnico e fecha roteiro Claudia/Sofia.
9. **SF-09 Acabamentos P3**: executa apenas o que couber sem atrasar P1/P2.

## 9. Definition of Done final

A sprint final so pode ser considerada fechada quando:

- Todos os P1 estiverem corrigidos ou, no caso do leitor de tela, validados com evidencia real ou mantidos explicitamente como NO-GO de acessibilidade final.
- P2 selecionados estiverem corrigidos, decididos ou documentados com aceite do dono responsavel.
- `qa:repo` e `qa:ci` estiverem verdes no ambiente local/CI aplicavel.
- Build de producao estiver verde.
- Regressao manual cobrir Home, `/home-mobile`, Catalogo, Detalhe, Eventos, Noticias, Perfil, feedback e rotas invalidas.
- Evidencias finais estiverem registradas em `docs/qa` ou `docs/product`.
- Roteiro publico deixar claro: dados mockados, sem reserva real, sem backend/IA generativa real, sem disponibilidade operacional e sem declaracao de acessibilidade final sem validacao.
- Rafael aprovar decisoes pendentes que afetem narrativa publica, 404/headers ou canal de feedback.

## 10. Go/No-Go esperado apos a sprint

### Resultado esperado se P1 e P2 criticos fecharem

- **GO** para apresentacao publica controlada como prototipo demonstrativo, com menos ressalvas.
- **GO condicionado** para comunicar maior maturidade tecnica do prototipo, desde que headers/404/feedback estejam corrigidos ou documentados.
- **NO-GO** para produto operacional enquanto nao houver backend real, integracao oficial, reserva real, persistencia real e governanca de dados.

### Resultado esperado para acessibilidade

- **GO com ressalvas** apenas se o roteiro com leitor de tela real for executado sem bloqueadores e as pendencias estruturais forem corrigidas.
- **NO-GO para acessibilidade final** se leitor de tela nao for validado, se contraste nao for medido ou se persistirem problemas de headings/tabs.

## 11. Riscos e mitigacoes

| Risco | Impacto | Mitigacao |
| --- | --- | --- |
| Ajustes de mock ficarem discretos demais | Usuario continua interpretando disponibilidade como real | Colocar aviso junto dos numeros e validar por fluxo direto. |
| Correcao da bottom nav criar regressao visual | Mobile perde navegacao ou cria rolagem ruim | Testar viewport `390x844`, outros tamanhos comuns e bottom nav apos correcao. |
| Leitor de tela nao estar disponivel | Acessibilidade final continua sem evidencia | Registrar limitacao, executar roteiro assistido quando possivel e manter NO-GO honesto. |
| Headers/CSP quebrarem assets ou rotas | Site falha em producao | Comecar com politica conservadora, testar reload direto e links externos. |
| 404 real quebrar fallback SPA | Rotas internas deixam de abrir por URL direta | Validar todas as rotas conhecidas antes de aceitar mudanca. |
| Feedback alternativo coletar dados sensiveis | Risco de privacidade e moderacao | Manter aviso explicito, formulario minimo e triagem por Claudia/Sofia. |
| Escopo P3 atrasar P1/P2 | Sprint perde foco de fechamento | GP bloqueia novos refinamentos ate P1/P2 estarem validados. |
| Comunicacao publica exagerar maturidade | Perda de credibilidade academica | Roteiro aprovado por PO, Sofia e Claudia com disclaimers obrigatorios. |

## 12. Decisoes pendentes para Rafael

1. **404 HTTP real:** Rafael deve decidir se quer investir agora em 404 real no deploy ou aceitar documentar a limitacao do fallback SPA para esta apresentacao.
2. **Canal de feedback alternativo:** Rafael deve escolher o caminho preferido sem login GitHub: formulario, email, coleta assistida por Claudia/Sofia ou apenas plano de contingencia para apresentacao.
3. **Acessibilidade final:** Rafael deve confirmar se havera pessoa/ambiente para validar NVDA/Narrator antes de qualquer comunicacao de acessibilidade.
4. **Texto publico de disponibilidade:** Rafael deve aprovar a frase padrao de disclaimer para catalogo/detalhe.
5. **Escopo da apresentacao:** Rafael deve manter o enquadramento de prototipo academico demonstrativo e evitar qualquer promessa de produto operacional.

## 13. Decisao final da reuniao de planejamento

O time aceita iniciar a sprint final com foco em fechamento, nao em expansao. A prioridade maxima e remover ambiguidade operacional nos fluxos de catalogo/detalhe/perfil, corrigir a regressao mobile reproduzida e gerar evidencia honesta de acessibilidade.

Sofia e Claudia reforcam que a narrativa publica deve continuar disciplinada: o projeto esta forte para demonstrar valor academico e experiencia de produto, mas so deve evoluir para discurso de produto pronto depois de corrigir P1/P2, validar leitor de tela real e fechar as decisoes de deploy, feedback e seguranca.
