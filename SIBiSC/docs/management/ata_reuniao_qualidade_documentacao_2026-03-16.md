# Ata de Reuniao - Qualidade de Documentacao e Fluxo de Feedback

## Contexto

Esta reuniao foi realizada para definir como a documentacao do projeto deve ajudar alunos com pouca experiencia a trabalhar com mais autonomia, menor dependencia de alinhamentos orais e menos risco de incompatibilidade entre entregas.

O principio central acordado foi: cada entrega deve se encaixar no sistema como uma peca de lego. Para isso, toda `task` e `subtask` precisa carregar contexto suficiente para que outra pessoa consiga entender o que foi feito, como conectar a entrega ao restante do software e quais ajustes ainda faltam.

## Data

- `2026-03-16`

## Participantes

- `PM`
- `PO`
- `TL`
- `Backend`
- `Frontend`
- `Mobile`
- `Data`
- `QA`
- `DevOps`

## Objetivo da Reuniao

- alinhar um padrao de documentacao simples e repetivel para alunos
- definir como o Jira sera refletido na documentacao em Markdown
- estabelecer o fluxo de feedback por `task/subtask`
- definir como a sprint sera fechada com historico, explicacao e metricas de evolucao

## Diagnostico Compartilhado

- alunos iniciantes costumam implementar sem registrar premissas, o que dificulta revisao e integracao
- quando o contexto fica apenas em conversa, o time perde rastreabilidade e repete erros
- cards tecnicos sem criterio documental claro aumentam retrabalho
- faltava um formato oficial para registrar feedback de ajuste por item entregue
- faltava um documento de fechamento de sprint que mostrasse nao so o que foi concluido, mas como o time evoluiu

## Decisoes Aprovadas

### 1. Documentacao como parte da entrega

Nenhuma `task` ou `subtask` sera considerada pronta apenas porque o codigo funciona localmente. O item precisa vir acompanhado da documentacao minima exigida para revisao e integracao.

### 2. Estrutura de trabalho entre Jira e repositorio

O Jira sera a porta de entrada da execucao, mas o repositorio sera a fonte oficial de contexto tecnico e historico.

Fluxo acordado:

1. o card nasce no Jira com vinculo claro a `epico`, `US`, `task` ou `subtask`
2. o aluno implementa a funcionalidade e registra o que fez nos arquivos Markdown do projeto
3. a entrega e revisada como peca de lego: contrato, dependencias, nomenclatura, impacto e compatibilidade
4. se houver ajuste, o feedback e registrado em documento proprio por `task/subtask`
5. quando o item for aprovado, a documentacao fica como historico da decisao e da integracao

### 3. Documentacao minima por item

Cada `task` ou `subtask` deve responder, de forma objetiva:

- qual problema esta resolvendo
- qual card do Jira esta sendo atendido
- quais arquivos ou modulos foram alterados
- quais contratos foram criados ou impactados
- quais premissas foram adotadas
- como validar que a entrega funciona
- quais limites conhecidos ainda permanecem

### 4. Feedback formal por card

Todo ajuste solicitado apos revisao deve virar documentacao de feedback por `task/subtask`, evitando correcao vaga em chat ou comentario disperso.

Esse feedback deve indicar:

- o que foi entregue
- o que estava esperado
- onde houve desvio
- qual risco de compatibilidade foi identificado
- qual ajuste concreto deve ser feito
- qual evidencias precisam voltar na proxima rodada

### 5. Fechamento de sprint como documento de aprendizado

Ao final da sprint, o time vai consolidar um documento unico com:

- o que foi entregue
- o que precisou de ajuste
- como os blocos foram encaixados no sistema
- quais metricas mostraram evolucao do time
- quais debitos e riscos seguiram para a sprint seguinte

## Definicao de Pronto para Alunos

Um card so pode ser marcado como concluido quando atender aos pontos abaixo:

- implementacao funcional entregue
- documentacao da alteracao atualizada
- evidencias de validacao registradas
- dependencias e impactos explicitos
- feedbacks anteriores resolvidos ou formalmente aceitos
- compatibilidade com o restante do sistema revisada

## Modelo de Reuniao de Revisao de Entrega

Foi acordado que cada revisao tecnica deve seguir esta ordem:

1. contexto do card
2. demonstracao do que foi feito
3. verificacao de contratos e dependencias
4. verificacao de documentacao e rastreabilidade
5. apontamento de ajustes
6. definicao do status: `aprovado`, `aprovado com ajustes`, `revisao necessaria`

## Responsabilidades

- `PO`: garantir que as USs tenham contexto suficiente para nao gerar interpretacao ambigua
- `PM`: organizar Jira e cobrar consistencia entre card e documentacao
- `TL`: validar se a entrega se conecta corretamente ao sistema como um todo
- `QA`: verificar se ha criterio suficiente para testar e reproduzir o fluxo
- `Devs`: documentar a propria entrega com clareza e atualizar o historico quando houver ajuste

## Riscos Observados

- cards muito grandes podem gerar documentacao superficial
- alunos podem tentar documentar apenas no final, perdendo detalhes importantes
- feedback sem padrao pode virar historico confuso
- se a TL centralizar tudo sozinha, o time nao desenvolve autonomia

## Diretivas Operacionais

- quebrar itens grandes em partes menores e testaveis
- manter o feedback por `task/subtask`, nao apenas por `US`
- exigir vinculo entre ajuste solicitado e impacto no sistema
- registrar decisoes em Markdown no mesmo dia da revisao
- usar os documentos de sprint para medir evolucao real do time e nao apenas volume de cards fechados

## Acoes Imediatas

1. criar padrao oficial de feedback por `task/subtask`
2. criar modelo de fechamento de sprint com metricas
3. atualizar o padrao documental para incluir essa governanca
4. manter uma rotina de revisao por entrega com foco em compatibilidade entre pecas

## Encerramento

O time concordou que a documentacao nao sera tratada como burocracia, mas como mecanismo de autonomia. O objetivo nao e escrever mais; e escrever o suficiente para que cada entrega possa ser entendida, revisada, conectada e evoluida sem depender de memoria oral.
