# Plano de Execucao Sprint 1 - Assistente Guiado SIBiSC/Feltrim Agents

Data: 2026-05-19  
Projeto: SIBiSC/Feltrim Agents  
Formato: reuniao de proximos passos para iniciar Sprint 1  
Base: Sprint 0 consolidada como baseline local/prototipo guiado; PR #45 aberto, mergeable e com checks remotos verdes.  
Restricao desta tarefa: preparar plano operacional, sem implementar codigo da Sprint 1.

## 1. Objetivo da Sprint 1

Entregar o Feltrim Agents como assistente guiado de descoberta, usando dados locais verificaveis para ajudar o usuario a encontrar livros, entender recomendacoes, consultar disponibilidade mockada, acessar eventos/noticias e navegar pelo perfil sem prometer IA real, backend real, reserva real ou integracao oficial com SIBI/PHL.

A sprint deve produzir um incremento demonstravel, pequeno e testavel. O foco e clareza, confianca, explicabilidade e rastreabilidade de feedback.

## 2. Decisoes fechadas para inicio

| Tema | Decisao |
| --- | --- |
| Escopo principal | Assistente guiado |
| Linguagem | Seguir o que ja existe no produto, com assistente guiado/prototipo e limites claros |
| Feedback Sofia/Claudia | GitHub Issues |
| Disponibilidade | Mock rotulado como dado de prototipo |
| PR #45 | Aberto, revisado, confirmado e mergeable |
| Continuidade | GO para continuar |
| QA + Dev pairing | Obrigatorio por historia |

## 3. Escopo fechado

Entra na Sprint 1:

- Assistente guiado com perguntas ou cards de orientacao.
- Recomendacoes explicaveis baseadas no catalogo local e preferencias mockadas.
- Fallback honesto para perguntas fora do escopo ou sem dado seguro.
- Comunicacao de fonte, motivo, limite e proxima acao em recomendacoes.
- Disponibilidade mockada com linguagem de prototipo.
- GitHub Issues como canal operacional de feedback Sofia/Claudia.
- QA + Dev pairing desde refinamento ate revalidacao.
- Evidencias por historia: passos, esperado, obtido, prints/video quando util, comandos e status de revalidacao.

Nao entra na Sprint 1:

- IA generativa, chat aberto ou backend real.
- Integracao real com SIBI/PHL, PHL, Supabase oficial ou catalogo em tempo real.
- Reserva real, pre-reserva ou renovacao transacional real.
- Gamificacao avancada, ranking, conquistas persistidas ou pontuacao.
- Coleta de dados pessoais reais, analytics sensivel ou automacao sem revisao de privacidade.
- Expansao de catalogo fora do contrato sem atualizar guard/fixtures.

## 4. Historias priorizadas

| ID sugerido | Historia | Prioridade | Donos principais | Resultado esperado |
| --- | --- | --- | --- | --- |
| S1-01 | Como usuario, quero entender rapidamente o que o Feltrim Agents faz para saber como comecar. | P0 | PO + UX + Front + Sofia | Hero/painel explica assistente guiado em ate 1 minuto. |
| S1-02 | Como usuario, quero escolher uma pergunta guiada para encontrar livros, eventos ou orientacoes. | P0 | Front + Dados + TL | Lista de perguntas principais aciona respostas baseadas em dados locais. |
| S1-03 | Como usuario, quero receber recomendacoes com motivo, fonte e proxima acao. | P0 | Front + Dados + PO + Sofia | Toda recomendacao aponta para livro real, motivo especifico e link valido. |
| S1-04 | Como usuario, quero saber quando a disponibilidade e apenas do prototipo. | P0 | Front + PO + QA | Disponibilidade mockada aparece rotulada nos pontos de decisao. |
| S1-05 | Como usuario, quero receber resposta honesta quando o assistente nao souber responder. | P1 | Front + QA + PO | Fallback nao inventa disponibilidade, reserva, horario, fonte ou integracao. |
| S1-06 | Como Sofia/Claudia, quero registrar feedback em GitHub Issues com campos minimos. | P1 | Sofia + Claudia + QA + GP | Feedback vira item rastreavel, com severidade, dono, status e criterio de fechamento. |
| S1-07 | Como QA, quero uma matriz de 10 cenarios principais do assistente para validar o MVP guiado. | P1 | QA + Dev + TL | Casos felizes, bordas, mobile, acessibilidade e respostas proibidas documentados. |
| S1-08 | Como TL, quero preservar contrato e guards para evitar regressao dos IDs e recomendacoes. | P1 | TL + Dados + QA | `qa:repo` e `qa:ci` continuam protegendo livros, rotas e recomendacoes. |
| S1-09 | Como usuario, quero entender se minhas preferencias sao demonstrativas ou editaveis. | P2 | PO + Front + SE + Sofia | UI declara preferencias mockadas ou entrega edicao simples se couber sem risco. |

## 5. Tarefas por frente

### Front/UX

- Definir composicao do assistente guiado na Home ou em area dedicada ja existente.
- Selecionar 8 a 10 perguntas principais com linguagem simples.
- Criar ou ajustar cards/botoes de pergunta guiada sem parecer chat aberto.
- Exibir resposta com motivo, fonte, limite e proxima acao.
- Reforcar mensagens de prototipo perto de recomendacao, disponibilidade e ausencia de reserva.
- Garantir estados acessiveis: foco visivel, teclado, `aria-live` para retorno e area touch adequada em mobile.
- Manter consistencia entre Home desktop/mobile se ambos forem afetados.

### Dados/Mocks

- Mapear perguntas guiadas para dados locais existentes: livros, categorias, autores, eventos, noticias e perfil.
- Garantir que recomendacoes usem apenas `bookId` valido do catalogo local.
- Manter disponibilidade como mock, com `source`/texto de origem quando exibida.
- Definir fallback de dados quando nao houver match seguro.
- Evitar adicionar `b9+` sem atualizar contrato e guard.
- Documentar qualquer novo mock ou fixture usado pelo assistente.

### QA

- Refinar criterios de aceite com Dev antes de cada historia.
- Criar matriz minima de 10 cenarios do assistente guiado.
- Cobrir cenarios felizes, termo inexistente, pergunta fora do escopo, disponibilidade mockada, ausencia de reserva, recomendacao sem match forte, mobile, teclado e regressao de link.
- Rodar `ReadLints` nos arquivos alterados quando aplicavel.
- Rodar `npm run qa:repo` a cada mudanca de codigo/dados.
- Rodar `npm run qa:ci` quando houver codigo/dados relevantes.
- Executar smoke manual/Playwright dos fluxos alterados.
- Registrar evidencia e revalidacao antes de mover historia para `done`.

### Sofia/Claudia

- Criar template de GitHub Issue para feedback operacional.
- Definir labels sugeridas: `feedback`, `sofia`, `claudia`, `qa`, `p0`, `p1`, `p2`, `ux`, `dados`, `acessibilidade`, `recomendacao`.
- Registrar campos minimos: rota, dispositivo, navegador, passos, esperado, observado, evidencia, tipo, impacto, severidade sugerida, dono, status e retorno.
- Sofia classifica impacto percebido e linguagem de devolutiva.
- Claudia garante registro operacional, reproducao inicial, status e SLA.
- Rodar piloto interno com 3 a 5 avaliadores se houver tempo.

### TL/SE

- Revisar se a implementacao preserva o contrato multiagente e o baseline da Sprint 0.
- Bloquear qualquer tentativa de backend real, IA generativa, reserva real ou catalogo oficial sem novo contrato.
- Validar privacidade do feedback: nao coletar dados pessoais desnecessarios, mascarar evidencias quando necessario e evitar prints sensiveis.
- Confirmar que GitHub Issues nao recebe token, dado privado ou informacao pessoal sem necessidade.
- Avaliar se duplicacao entre Home desktop/mobile precisa de util compartilhado ou se pode ficar simples na Sprint 1.
- Revisar alteracoes de guard/testes antes de fechar historias P0/P1.

## 6. QA + Dev pairing

O pairing QA + Dev e gate obrigatorio da Sprint 1.

Fluxo por historia:

1. Refinamento com PO, TL, Dev e QA antes de codar.
2. QA e Dev escrevem criterios de aceite e casos de teste da historia.
3. Dev implementa incremento pequeno e testavel.
4. QA valida em local/preview assim que houver comportamento testavel.
5. Bugs sao corrigidos e revalidados no mesmo ciclo.
6. Historia so vai para `done` com evidencia e status "QA validado com Dev".

Evidencia minima por historia:

- ID da historia ou GitHub Issue.
- Passos executados.
- Resultado esperado.
- Resultado obtido.
- Comandos rodados.
- Prints ou video curto quando ajudar.
- Bugs encontrados e revalidacao.
- Decisao final: aprovado, aprovado com ressalva ou bloqueado.

## 7. Criterios de aceite da Sprint 1

A Sprint 1 pode ser aceita se:

- Usuario entende que Feltrim Agents e assistente guiado/prototipo em ate 1 minuto.
- Existem 8 a 10 perguntas principais ou jornadas guiadas definidas e validadas.
- Cada recomendacao exibida aponta para livro real do catalogo local.
- Cada recomendacao informa motivo, fonte/limite e proxima acao.
- Disponibilidade e comunicada como mock/prototipo nos pontos de decisao.
- O assistente nao inventa disponibilidade, reserva, horario, catalogo oficial, backend ou IA real.
- Perguntas fora do escopo recebem fallback honesto e orientacao util.
- GitHub Issues fica definido como canal operacional Sofia/Claudia, com template e labels sugeridas.
- QA valida no minimo 10 cenarios principais do assistente.
- `qa:repo` passa apos mudancas de codigo/dados.
- `qa:ci` passa quando houver codigo/dados relevantes.
- Nenhum P0/P1 conhecido fica aberto sem dono, decisao ou mitigacao.
- Todas as historias concluidas possuem "QA validado com Dev".

## 8. Respostas proibidas e limites do assistente

O assistente nao deve:

- Dizer que consultou SIBI/PHL, PHL, backend, IA real ou catalogo oficial.
- Confirmar disponibilidade oficial em tempo real.
- Prometer reserva, pre-reserva, retirada garantida ou renovacao real.
- Inventar horario, unidade, evento, noticia, exemplar, ISBN ou fonte.
- Sugerir que preferencias sao persistidas como dado real se forem mockadas.
- Coletar ou pedir dado pessoal para feedback sem necessidade.

Texto base recomendado:

> "Esta resposta usa dados locais do prototipo. A disponibilidade nao substitui confirmacao oficial da biblioteca e ainda nao ha reserva real nesta versao."

## 9. GitHub Issues sugeridas

Estas issues devem ser criadas posteriormente, antes ou no inicio da implementacao. Esta tarefa apenas prepara a sugestao.

| Issue sugerida | Tipo | Prioridade | Criterio de fechamento |
| --- | --- | --- | --- |
| `S1-01 Definir matriz de perguntas guiadas do Feltrim Agents` | Produto/UX | P0 | 8 a 10 perguntas aprovadas por PO/Sofia/QA/TL |
| `S1-02 Implementar painel de assistente guiado` | Front | P0 | Perguntas acionam respostas baseadas em dados locais e acessiveis |
| `S1-03 Exibir motivo, fonte e proxima acao nas recomendacoes` | Front/Dados | P0 | Recomendacoes validas, explicaveis e navegaveis |
| `S1-04 Comunicar disponibilidade mockada e ausencia de reserva real` | UX/QA | P0 | Pontos de decisao exibem limite de prototipo |
| `S1-05 Criar fallback honesto para perguntas fora do escopo` | Front/QA | P1 | Respostas proibidas nao aparecem nos 10 cenarios QA |
| `S1-06 Criar template de feedback Sofia/Claudia em GitHub Issues` | Operacao | P1 | Template, labels, status, SLA e donos definidos |
| `S1-07 Montar matriz QA dos 10 cenarios do assistente` | QA | P1 | Casos documentados e executados com evidencia |
| `S1-08 Preservar guards e contrato de dados na Sprint 1` | TL/QA | P1 | `qa:repo`/`qa:ci` verdes apos mudancas |
| `S1-09 Decidir preferencias demonstrativas ou edicao simples` | Produto/Front | P2 | Decisao registrada e UI sem ambiguidade |

## 10. Plano de validacao

### Antes de codar

- Confirmar PR #45 como baseline aceito.
- Criar ou selecionar branch da Sprint 1 sem misturar alteracoes do PR #45.
- Criar GitHub Issues sugeridas ou registrar decisao de criacao posterior.
- Refinar criterios de aceite de S1-01 a S1-05 com QA + Dev.
- Aprovar matriz inicial de perguntas com PO/Sofia/TL.

### Durante a sprint

- Trabalhar uma historia pequena por vez.
- Rodar `ReadLints` nos arquivos alterados quando aplicavel.
- Rodar `npm run qa:repo` apos mudancas de codigo/dados.
- Rodar `npm run qa:ci` antes de abrir PR ou ao concluir lote funcional.
- Fazer smoke dos fluxos alterados em Home/Feltrim Agents, Catalogo, Detalhe e Perfil quando impactados.
- Registrar cada bug em issue ou checklist com severidade e dono.

### Review da Sprint 1

Demonstrar:

- Usuario entende o que o assistente faz.
- Usuario escolhe pergunta guiada.
- Usuario recebe recomendacao explicavel.
- Usuario abre detalhe de livro valido.
- Usuario entende disponibilidade mockada e ausencia de reserva real.
- Usuario recebe fallback honesto para pergunta fora do escopo.
- Sofia/Claudia registram feedback via GitHub Issue.
- QA apresenta matriz dos 10 cenarios e resultado.

### Go/No-Go da Sprint 1

GO se:

- Todos os P0 estao fechados.
- P1 estao fechados, mitigados ou com dono e decisao aceita.
- Assistente guiado nao promete capacidades fora do escopo.
- GitHub Issues esta operacional como canal de feedback.
- QA + Dev pairing esta registrado nas historias.
- Checks locais/remotos relevantes estao verdes.

NO-GO se:

- Alguma recomendacao aponta para livro inexistente.
- A UI promete IA real, backend real, reserva real ou disponibilidade oficial.
- Feedback Sofia/Claudia fica sem template, dono ou status.
- `qa:repo` ou `qa:ci` falha sem decisao formal.
- Smoke principal Home/Feltrim Agents -> recomendacao -> detalhe falha.

## 11. Cadencia sugerida

| Momento | Participantes | Objetivo |
| --- | --- | --- |
| Kickoff Sprint 1 | PO, PM, GP, TL, QA, Dev, Sofia, Claudia | Confirmar escopo, issues e criterios de aceite |
| Pairing por historia | Dev + QA + TL quando necessario | Combinar casos, dados e evidencia |
| Checkpoint diario curto | PM/GP + frente ativa | Remover bloqueios e controlar P0/P1 |
| Triage Sofia/Claudia | Sofia + Claudia + QA + PO | Classificar feedbacks e converter em backlog |
| Review | Time completo | Demonstrar incremento e evidencias |
| Go/No-Go | Rafael + PO/QA/GP/TL | Decidir fechamento da Sprint 1 |

## 12. Recomendacao operacional

O time recomenda iniciar a implementacao da Sprint 1 apos fechar a decisao operacional sobre o PR #45 como baseline e criar as issues iniciais. O plano esta pronto para execucao com escopo controlado.

A primeira historia a implementar deve ser S1-01/S1-02 em conjunto: matriz de perguntas guiadas e painel de assistente guiado. Em paralelo, Sofia/Claudia devem preparar o template de GitHub Issues para que feedbacks da Sprint 1 ja nascam rastreaveis.

## 13. Encerramento da reuniao de proximos passos

Com a Sprint 0 revisada e as decisoes do Rafael resolvidas, a Sprint 1 pode comecar como incremento de produto bem delimitado. O objetivo nao e aumentar a ambicao tecnica; e transformar o baseline confiavel em uma experiencia guiada, explicavel e validavel.

Implementacao de codigo da Sprint 1 nao foi iniciada neste documento.
