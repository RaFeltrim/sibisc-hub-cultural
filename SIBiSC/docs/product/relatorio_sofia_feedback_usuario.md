# Relatorio Sofia - Feedback do Usuario e Experiencia de Uso

Ultima atualizacao: 2026-05-18  
Projeto: SIBiSC/Feltrim Agents  
Responsavel: Sofia, feedbacks do usuario e experiencia de uso

## 1. Sumario executivo da Sofia

Como Sofia, minha leitura e que o SIBiSC/Feltrim Agents esta em um bom ponto para demonstracao como prototipo avancado, mas ainda nao deve ser comunicado como produto integrado, IA real ou servico bibliotecario transacional. A experiencia atual ja mostra valor: Home com assistente guiado, catalogo navegavel, perfil do leitor, eventos, noticias, recomendacoes locais e comunicacao mais honesta sobre mocks. Esse valor, porem, depende de uma promessa clara: o Feltrim Agents hoje orienta o usuario com dados locais, nao conversa com um backend inteligente nem consulta uma fonte oficial em tempo real.

O impacto real para usuarios esta concentrado em quatro riscos: confiar em uma disponibilidade que ainda e mockada, esperar uma reserva que nao existe, interpretar o assistente como IA aberta e nao receber retorno estruturado quando algo der errado. Antes do beta, recomendo tratar esses pontos como parte da experiencia, nao apenas como detalhes tecnicos.

Minha recomendacao executiva e aprovar uma fase curta de estabilizacao e pesquisa com usuarios. O beta deve ser apresentado como assistente guiado de descoberta, com avisos claros de prototipo, coleta de feedback rastreavel por Sofia/Claudia e validacao pratica das tarefas principais: encontrar livro, entender recomendacao, usar perfil, favoritar/remover e encontrar evento.

## 2. Fontes consultadas

Este relatorio consolida as seguintes bases:

- `docs/product/feltrim_agents_analise_completa_e_backlog.md`
- `docs/product/reuniao_sincrona_relatorios_executivos.md`
- `docs/product/multiagent_execution_log.md`
- `docs/product/multiagent_integration_contract.md`
- `docs/product/frontend_integration_notes.md`
- `docs/product/multiagent_round_consolidation.md`
- `docs/qa/plano_completo_testes_zero_problemas.md`
- `docs/qa/multiagent_validation_plan.md`
- Conferencia leve de UX em `src/pages/HomePage.jsx`, `src/pages/CatalogPage.jsx`, `src/pages/UserProfilePage.jsx` e `src/routes/AppRouter.jsx`.

## 3. Papel da Sofia no ciclo de produto

Meu papel e transformar percepcao de usuario em decisao de produto rastreavel. Isso inclui capturar relatos, classificar impacto, ajudar QA a reproduzir problemas, orientar prioridade com PO/PM/GP e garantir devolutiva clara ao usuario.

Atuacao no ciclo:

1. Captura: receber feedback por teste moderado, conversa, formulario futuro ou canal operacional.
2. Classificacao: separar bug, duvida, sugestao, acessibilidade, recomendacao inadequada, dado incorreto, desempenho e conteudo.
3. Reproducao: garantir que Claudia registre rota, dispositivo, navegador, passos, esperado, observado e evidencia.
4. Priorizacao: ajudar PO/QA a distinguir impacto percebido, severidade tecnica e valor de produto.
5. Backlog: converter feedback validado em item P0/P1/P2 com criterio de aceite.
6. Validacao: confirmar com QA se a correcao resolveu a dor original.
7. Devolutiva: retornar ao usuario com status compreensivel: recebido, em analise, planejado, corrigido, contornado ou nao aplicavel.

## 4. Leitura da Sofia por frente

### 4.1 Produto, PO, PM e GP

Valor percebido:

- O posicionamento do SIBiSC como camada mobile-first de descoberta e orientacao e forte.
- O Feltrim Agents pode reduzir atrito para usuarios que nao sabem pesquisar por termos bibliograficos.
- A combinacao de acervo, eventos, noticias e perfil cria uma jornada cultural mais rica que uma busca tradicional.

Decisoes que afetam o usuario:

- Apresentar o MVP como assistente guiado primeiro reduz frustracao e risco de promessa excessiva.
- Tratar reserva real como escopo futuro evita expectativa transacional indevida.
- Manter gamificacao como P2 protege o foco em confiabilidade, recomendacoes e acessibilidade.

Riscos para usuario:

- Se o produto usar "IA" sem explicar limites, o usuario pode esperar conversa aberta, memoria e resposta sempre correta.
- Se a disponibilidade mockada parecer oficial, o usuario pode se deslocar a uma unidade com expectativa errada.
- Se feedback nao tiver retorno, a percepcao sera de canal simbolico, nao de melhoria real.

Recomendacao da Sofia:

- Usar a narrativa "assistente guiado de descoberta em prototipo" ate existir backend, fonte oficial e avaliacao de respostas.
- Fechar na reuniao sincrona um Go/No-Go simples: P0 zerado, P1 mitigado, dados mockados rotulados e fluxo de feedback definido.

### 4.2 Dados e Back

Valor percebido:

- O contrato multiagente ja estabelece IDs canonicos, recomendacoes baseadas em livros reais e limites de disponibilidade.
- A correcao de IDs e recomendacoes reduz um risco central de confianca: clicar em algo e cair em livro inexistente.

Riscos para usuario:

- Preferencias continuam mockadas e nao editaveis; o usuario pode nao entender por que recebeu determinada recomendacao.
- Disponibilidade ainda nao tem fonte oficial, timestamp, SLA de sincronizacao ou reconciliacao.
- O Perfil ainda precisa evoluir para consumir service unico, evitando divergencia entre tela, mock e futura integracao.

Recomendacao da Sofia:

- Toda recomendacao deve mostrar motivo, origem dos dados e proxima acao.
- Disponibilidade deve ser comunicada como "dados locais de prototipo" ate haver fonte oficial.
- Quando nao houver dado seguro, o assistente deve orientar busca manual em vez de inventar resposta.

### 4.3 Front e UX

Avancos observados:

- A Home ja comunica "assistente guiado" e "prototipo".
- A busca assistida e o catalogo possuem retorno em `aria-live`/mensagem de status.
- O Perfil ja usa `tablist`, `tab`, `tabpanel` e feedback de acao para renovar/remover.
- O botao Remover em Favoritos aparece separado do link do livro.
- O Catalogo usa `aria-pressed` nos bairros para priorizacao.

Riscos restantes:

- Ainda nao existe feedback in-app para Sofia/Claudia.
- Preferencias aparecem, mas nao podem ser editadas pelo usuario.
- A jornada de recomendacao ainda depende de mocks locais.
- O usuario pode confundir "disponivel" com disponibilidade oficial se a UI nao repetir o limite nos pontos criticos.
- O app precisa continuar validado em mobile real, teclado, foco visivel e leitor de tela.

Recomendacao da Sofia:

- Colocar mensagens de limite perto da acao, nao apenas no texto introdutorio.
- Priorizar microcopy simples: "previsao do prototipo", "dados locais", "sem reserva real nesta versao".
- Validar por teste moderado se usuarios entendem o que aconteceu apos clicar em Buscar, Abrir detalhe, Favoritar, Remover e Abrir Google Calendar.

### 4.4 QA e SDET

Valor percebido:

- O plano de QA ja trata "zero problemas" como meta operacional, nao promessa absoluta.
- Os fluxos E2E prioritarios estao bem alinhados ao impacto real: Home, Catalogo, Perfil, Eventos, recomendacoes e feedback.
- O plano multiagente reforca IDs, ARIA, CTAs, disponibilidade e feedback Sofia/Claudia.

Riscos encontrados:

- Qualquer P0/P1 conhecido em link, disponibilidade, acessibilidade ou feedback deve bloquear beta.
- Sem evidencia de smoke manual ou automatizado, a experiencia pode parecer pronta apenas pela aparencia visual.
- Se feedback nao for reproduzivel, o backlog vira opiniao sem criterio de fechamento.

Recomendacao da Sofia:

- QA deve validar as tarefas que usuarios reais executarao, nao apenas rotas isoladas.
- Todo feedback P0/P1 precisa de severidade, dono, criterio de fechamento e devolutiva.
- O beta deve ter uma matriz simples de "tarefa concluiu, travou, confundiu, desistiu".

### 4.5 Claudia e Sofia

Divisao recomendada:

- Sofia e responsavel por impacto percebido, linguagem de retorno, classificacao da dor do usuario e recomendacao de prioridade pela experiencia.
- Claudia e responsavel por registro operacional, evidencia, reproducao inicial, status, issue/backlog e controle de SLA.

Como nos complementamos:

- Sofia qualifica o que o usuario sentiu e o que isso significa para confianca, clareza e valor.
- Claudia garante que o relato nao se perca: transforma em item rastreavel com passos, ambiente e responsavel.
- QA valida tecnicamente, PO prioriza valor, PM/GP acompanha prazo e risco.

## 5. Jornada de feedback do usuario

Fluxo recomendado:

1. Recebimento: usuario relata problema, duvida ou sugestao por formulario futuro, teste moderado ou canal combinado.
2. Triagem: Sofia classifica tipo e impacto percebido; Claudia registra contexto minimo.
3. Reproducao: QA tenta reproduzir com rota, dispositivo, navegador, dados usados e passos.
4. Severidade: QA define P0/P1/P2/P3; Sofia complementa com impacto na confianca e na conclusao da tarefa.
5. Backlog: PO decide prioridade e Claudia cria item com dono, criterio de aceite e evidencia.
6. Validacao: QA reexecuta o caso; Sofia confirma se a dor original foi respondida.
7. Retorno ao usuario: Sofia/Claudia comunicam status em linguagem simples.

Status sugeridos:

- Recebido: relato registrado.
- Em analise: time esta tentando reproduzir ou entender impacto.
- Planejado: entrou no backlog com prioridade definida.
- Corrigido: validado por QA.
- Contornado: existe orientacao temporaria.
- Nao aplicavel: nao sera implementado, com justificativa clara.

## 6. Taxonomia de feedbacks

| Tipo | Exemplo no SIBiSC | Dono principal |
| --- | --- | --- |
| Bug funcional | Link do Perfil abre livro inexistente ou botao nao executa acao. | QA + Front/Dados |
| Duvida de uso | Usuario nao entende como buscar por autor, ISBN ou tema. | Sofia + UX |
| Sugestao | Usuario pede filtro, ordenacao, salvar busca ou novas categorias. | Sofia + PO |
| Acessibilidade | Falta foco visivel, estado ativo sem semantica ou problema por teclado. | QA + UX + Front |
| Recomendacao inadequada | Livro sugerido nao parece relacionado a preferencia. | Sofia + Dados + PO |
| Dados incorretos | Disponibilidade, unidade, ISBN, evento ou noticia inconsistentes. | Dados + QA |
| Desempenho | Tela demora, busca parece travada ou mobile fica pesado. | QA + Front |
| Conteudo e eventos | Evento antigo, texto ambiguo, fonte ausente ou informacao incompleta. | PO + Conteudo |

## 7. Perguntas de pesquisa com usuarios

Perguntas para validar Feltrim Agents:

1. O que voce entende que o Feltrim Agents faz nesta tela?
2. Em algum momento voce achou que estava falando com uma IA real?
3. A recomendacao pareceu util? Por que?
4. Voce entendeu por que aquele livro foi recomendado?
5. Voce percebeu que os dados de disponibilidade sao de prototipo?
6. O que voce esperaria acontecer ao clicar em "Renovar", "Remover" ou "Abrir Google Calendar"?
7. Voce encontrou o caminho para editar ou revisar preferencias? O que esperava encontrar?
8. O texto "sem reserva real nesta previa" ficou claro ou gerou duvida?
9. O que faria voce confiar mais na recomendacao?
10. Se algo desse errado, onde voce esperaria enviar feedback?
11. Que retorno voce esperaria depois de enviar feedback?
12. Em mobile, qual parte pareceu mais facil e qual pareceu mais confusa?

## 8. Roteiro de entrevista e teste moderado

Formato sugerido:

- Duracao: 35 a 45 minutos por usuario.
- Perfil: estudante, leitor frequente, leitor casual, usuario de eventos culturais e pessoa com baixa familiaridade com catalogos.
- Ambiente: mobile primeiro, depois desktop se houver tempo.
- Metodo: pensar em voz alta, sem explicar a interface antes da tarefa.

Introducao ao participante:

"Este e um prototipo do SIBiSC com Feltrim Agents. Queremos observar se a experiencia ajuda voce a encontrar livros, entender recomendacoes e usar informacoes de eventos e perfil. Nao estamos testando voce; estamos testando a clareza do sistema."

Tarefas praticas:

1. Encontrar livro:
   - "Procure um livro de Machado de Assis ou outro autor que voce conheca."
   - Observar: entende busca, resultados, detalhe, disponibilidade e proxima acao.

2. Receber recomendacao:
   - "Na Home, veja as recomendacoes do Feltrim Agents e escolha uma."
   - Observar: entende motivo, disponibilidade, limite de prototipo e link para detalhe.

3. Entender preferencia:
   - "Descubra quais preferencias o sistema esta usando para recomendar."
   - Observar: encontra Perfil, entende chips de preferencia e sente falta de edicao.

4. Favoritar/remover:
   - "Abra Favoritos no Perfil e remova um item."
   - Observar: acao tem retorno, nao navega por acidente, usuario entende resultado.

5. Achar evento:
   - "Encontre um evento e tente salvar na agenda."
   - Observar: entende data, horario, local, Google Calendar e feedback de nova aba.

6. Usar perfil:
   - "Veja seus emprestimos e tente entender quando precisa devolver um livro."
   - Observar: clareza de datas, status, renovacao e link para livro.

7. Enviar feedback hipotetico:
   - "Se uma recomendacao nao fizer sentido, onde voce tentaria avisar o time?"
   - Observar: necessidade de canal in-app e expectativa de retorno.

Registro por tarefa:

- Concluiu sem ajuda.
- Concluiu com duvida.
- Travou.
- Desistiu.
- Comentario literal do usuario.
- Severidade Sofia: bloqueia, atrapalha, confunde, melhoria ou elogio.

## 9. Riscos prioritarios vistos pela Sofia

| Prioridade | Risco | Impacto no usuario | Mitigacao recomendada |
| --- | --- | --- | --- |
| P0 | Feedback critico sem dono ou retorno | Usuario perde confianca no canal e no produto | Definir template, SLA, Claudia como operacao e Sofia como devolutiva |
| P0 | Link ou recomendacao para item inexistente | Usuario quebra a jornada principal | Manter auditoria de IDs e smoke Perfil/Home -> Detalhe |
| P1 | Disponibilidade mockada parecer oficial | Usuario pode tomar decisao errada de deslocamento | Rotular prototipo e origem dos dados nos pontos de decisao |
| P1 | Promessa de IA acima da entrega | Frustracao e comparacao com chat real | Usar "assistente guiado" ate existir IA/backend |
| P1 | Preferencias nao editaveis | Usuario nao controla personalizacao | Indicar que preferencias sao mockadas ou criar edicao simples |
| P1 | Acessibilidade regredir | Usuarios por teclado/leitor ficam excluidos | Validar ARIA, foco, semantica e reduced motion |
| P1 | CTAs externos ou silenciosos confundirem | Usuario repete acao ou acha que falhou | Mensagens de status para buscar, remover, renovar e calendario |
| P2 | Falta de metricas de uso | Time decide por impressao, nao evidencia | Instrumentar busca, recomendacao, detalhe, favorito e feedback |
| P2 | Gamificacao antes de confiabilidade | Engajamento vira ruído sobre base instavel | Manter gamificacao como evolucao inclusiva |

## 10. Recomendacoes antes do beta

### Precisa estar corrigido ou validado

- Nenhum link critico do Perfil, Home ou recomendacao pode abrir livro inexistente.
- Recomendacoes devem apontar para livros reais do catalogo local ou exibir fallback honesto.
- CTAs principais precisam de retorno perceptivel.
- Tabs, filtros, botoes e navegacao mobile precisam manter semantica acessivel.
- O fluxo Sofia/Claudia precisa ter template, SLA e responsavel.
- O texto da UI deve deixar claro que nao ha reserva real, backend de IA ou catalogo oficial em tempo real.

### Pode ir como prototipo

- Assistente guiado com busca local e recomendacoes por preferencias mockadas.
- Preferencias exibidas no Perfil sem edicao, desde que declaradas como dados de prototipo.
- Disponibilidade por unidade usando mock local.
- Google Calendar como acao externa, desde que tenha feedback e limite conhecido.
- Gamificacao apenas como conceito de roadmap, nao como funcionalidade de beta.

### Deve ter disclaimer

- "As recomendacoes usam dados locais do prototipo."
- "A disponibilidade exibida nao substitui confirmacao oficial da biblioteca."
- "Nao ha reserva real nesta versao."
- "Feltrim Agents ainda nao e chat aberto nem IA integrada a backend."
- "Preferencias do perfil sao demonstrativas nesta rodada."

## 11. Metricas de sucesso de feedback

Metricas operacionais:

- Tempo de primeira resposta por severidade.
- Tempo de reproducao do feedback.
- Taxa de feedbacks reproduzidos.
- Taxa de feedbacks sem dono apos triagem.
- Bugs por severidade e por modulo.
- Tempo medio ate validacao da correcao.

Metricas de experiencia:

- CSAT simples apos tarefa: "Esta experiencia ajudou voce?" de 1 a 5.
- NPS simples para beta interno, se houver volume suficiente.
- Taxa de recomendacao util: recomendacoes avaliadas como "ajudou".
- Taxa de tarefas concluidas sem ajuda.
- Tempo ate encontrar um livro disponivel.
- Taxa de abandono em busca sem resultado.
- Percentual de usuarios que entenderam o limite de prototipo.

Metricas de produto:

- Busca com clique em detalhe.
- Recomendacao exibida -> detalhe aberto.
- Detalhe aberto -> favorito, evento ou proxima acao.
- Termos mais buscados sem resultado.
- Feedbacks por rota: Home, Catalogo, Perfil, Eventos e Noticias.

## 12. Backlog recomendado pela Sofia

### P0

- Criar e aprovar o template operacional Sofia/Claudia para feedback com status e SLA.
- Garantir que nenhum link critico ou recomendacao aponte para ID inexistente.
- Definir criterio Go/No-Go do beta: P0 zerado, P1 mitigado e feedback triado.
- Validar com QA o fluxo Home -> recomendacao -> detalhe e Perfil -> livro.

### P1

- Inserir ou reforcar disclaimers nos pontos de decisao: recomendacao, disponibilidade, reserva e preferencias.
- Criar entrada simples de feedback in-app ou, no minimo, um canal visivel documentado.
- Validar mobile e acessibilidade das tarefas principais com usuarios reais ou avaliadores internos.
- Padronizar microcopy de "assistente guiado", "prototipo", "dados locais", "disponibilidade" e "reserva".
- Planejar edicao simples de preferencias no Perfil ou declarar explicitamente que preferencias sao fixas no prototipo.
- Instrumentar eventos basicos: busca, recomendacao clicada, detalhe aberto, favorito removido e feedback enviado.

### P2

- Criar painel ou documento de metricas Sofia/Claudia por semana.
- Desenhar feedback por recomendacao: ajudou, nao ajudou, motivo.
- Evoluir recomendacoes com diversidade, explicabilidade e alternativas quando nao houver sugestao segura.
- Preparar fonte oficial, timestamp e reconciliacao de disponibilidade.
- Prototipar gamificacao inclusiva somente apos confiabilidade e feedback estarem estaveis.

## 13. Plano de 7 dias da Sofia

### Dia 1 - Alinhamento e template

- Aprovar taxonomia de feedbacks.
- Fechar template Sofia/Claudia com campos obrigatorios.
- Definir SLA por severidade.

### Dia 2 - Microcopy critica

- Revisar textos de assistente, prototipo, disponibilidade, reserva e recomendacao.
- Marcar onde disclaimers precisam aparecer na UI.
- Validar linguagem com PO/UX.

### Dia 3 - Pesquisa com usuarios

- Preparar roteiro moderado.
- Selecionar 3 a 5 participantes ou avaliadores internos.
- Rodar primeira sessao piloto.

### Dia 4 - Triagem dos achados

- Classificar feedbacks por tipo, impacto e severidade sugerida.
- Separar problemas de entendimento de bugs tecnicos.
- Entregar lista P0/P1 para QA/PO.

### Dia 5 - Revalidacao com QA

- Acompanhar reproducao dos achados prioritarios.
- Confirmar se criterios de aceite respondem a dor real.
- Atualizar backlog recomendado.

### Dia 6 - Devolutiva e metricas

- Escrever mensagens padrao de retorno ao usuario.
- Consolidar CSAT simples e taxa de conclusao das tarefas.
- Identificar top 5 confusoes de experiencia.

### Dia 7 - Recomendacao Go/No-Go

- Emitir resumo Sofia para reuniao de decisao.
- Recomendar Go, Go com ressalvas ou No-Go.
- Registrar decisoes pendentes de Rafael.

## 14. Decisoes que Rafael precisa aprovar

1. Linguagem oficial: "assistente guiado", "assistente IA" ou "camada inteligente de descoberta".
2. MVP do Feltrim Agents: painel guiado primeiro ou chat conversacional real.
3. Reserva: fora do escopo atual, orientacao de retirada ou integracao futura.
4. Fonte de verdade futura: SIBI/PHL, Supabase, API propria, importacao controlada ou mock academico.
5. Preferencias: manter mockadas no beta ou implementar edicao simples no Perfil.
6. Canal de feedback: formulario in-app, documento, issue, Notion/Jira ou outro quadro.
7. SLA de resposta por severidade para feedbacks Sofia/Claudia.
8. Criterio Go/No-Go do beta.
9. Gamificacao: manter P2 apos confiabilidade ou antecipar apenas como prototipo visual.
10. Nivel de disclaimer aceitavel na demonstracao para professor/avaliadores e usuarios reais.

## 15. Recomendacao para reuniao sincrona

Minha recomendacao e que a reuniao feche tres blocos de decisao:

1. Promessa do produto:
   - Aprovar Feltrim Agents como assistente guiado de descoberta nesta fase.
   - Declarar que IA real, reserva real, catalogo oficial e gamificacao sao evolucoes condicionadas.

2. Prontidao para beta:
   - Confirmar P0 zerado.
   - Mitigar P1 de acessibilidade, microcopy, CTAs e disponibilidade.
   - Aprovar template de feedback e SLA Sofia/Claudia.

3. Pesquisa e aprendizado:
   - Rodar teste moderado com tarefas reais.
   - Medir conclusao de tarefas, utilidade da recomendacao e compreensao dos limites.
   - Transformar achados em backlog, nao apenas em comentarios.

## 16. Conclusao da Sofia

O SIBiSC/Feltrim Agents tem uma proposta forte porque responde a uma dor real: usuarios nem sempre sabem como transformar interesse de leitura, disponibilidade de acervo e agenda cultural em uma acao simples. A experiencia atual ja permite demonstrar esse caminho, desde que seja comunicada como prototipo guiado com dados locais.

Para mim, o ponto mais importante antes do beta e confianca. Confianca vem de recomendacoes que levam a livros reais, limites bem explicados, acessibilidade sem barreiras, acoes com retorno e feedback do usuario tratado com dono, SLA e devolutiva. Se Rafael aprovar as decisoes pendentes e o time executar o plano de 7 dias, a proxima rodada pode validar valor real com usuarios sem prometer mais do que o sistema entrega hoje.

## 17. Validacao leve deste relatorio

- Documentos obrigatorios e opcionais existentes foram lidos.
- Telas principais foram conferidas de forma leve para confirmar pontos de UX.
- O relatorio nao altera codigo, nao executa build e nao cria commit.
- `ReadLints` foi executado neste Markdown sem erros reportados.
