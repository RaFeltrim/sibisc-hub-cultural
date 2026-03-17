# Fechamento de Sprint e Metricas de Evolucao

## Objetivo

Definir como a sprint sera encerrada documentalmente, de forma que qualquer pessoa consiga entender:

- o que foi entregue
- o que precisou de ajuste
- como as partes foram integradas
- como o time evoluiu em autonomia, qualidade e previsibilidade

## Principio

O fechamento de sprint nao deve ser apenas uma lista de cards concluidos. Ele deve explicar a historia da sprint: o plano inicial, as entregas realizadas, os ajustes que garantiram compatibilidade e as metricas que mostram amadurecimento do time.

## Quando Produzir

- ao final de cada sprint
- em revisoes intermediarias, se a sprint for longa ou tiver alto risco de integracao

## Responsaveis

- `PM`: consolida panorama da sprint
- `TL`: explica integracao tecnica e compatibilidade entre entregas
- `QA`: consolida qualidade, cobertura e riscos remanescentes
- `Devs`: alimentam evidencias e historico das tasks revisadas

## Estrutura Obrigatoria do Documento Final

### 1. Resumo Executivo

- objetivo da sprint
- resultado geral
- status: `concluida`, `concluida com debitos`, `parcial`

### 2. Escopo Planejado

- epicos e USs previstos
- tasks e subtasks planejadas
- dependencias criticas esperadas

### 3. Escopo Entregue

- itens finalizados
- itens parcialmente concluidos
- itens adiados

### 4. Integracao das Entregas

Descrever como os blocos foram encaixados entre:

- dados
- backend
- frontend
- QA
- documentacao

### 5. Ajustes Realizados Durante a Sprint

Consolidar os feedbacks mais relevantes:

- o que precisou ser corrigido
- por que o ajuste foi necessario
- qual risco foi evitado

### 6. Metricas de Evolucao

#### Metricas de Fluxo

- total de cards planejados
- total de cards entregues
- taxa de conclusao da sprint
- cards concluidos sem replanejamento

#### Metricas de Qualidade

- taxa de aprovacao em primeira revisao
- media de feedbacks por card
- total de bloqueios por compatibilidade
- total de bugs detectados antes de merge

#### Metricas de Documentacao

- percentual de cards entregues com documentacao completa
- percentual de ajustes que geraram feedback formal
- documentos atualizados na sprint

#### Metricas de Autonomia do Time

- cards resolvidos sem intervencao sincrona intensa
- tipos de erro mais repetidos
- areas em que os alunos mostraram maior autonomia
- areas que ainda exigem acompanhamento proximo

### 7. Riscos e Debitos Remanescentes

- riscos aceitos
- debitos tecnicos
- debitos documentais
- dependencias empurradas para a proxima sprint

### 8. Aprendizados da Sprint

- o que funcionou bem
- o que precisa mudar no processo
- quais padroes devem virar pratica recorrente

### 9. Proximos Passos

- foco da sprint seguinte
- cards prioritarios
- reforcos necessarios de documentacao ou arquitetura

## Template Base

```md
# Fechamento da Sprint <IDENTIFICACAO>

## Resumo Executivo

## Escopo Planejado

## Escopo Entregue

## Integracao das Entregas

## Ajustes Realizados Durante a Sprint

## Metricas de Evolucao

### Fluxo

### Qualidade

### Documentacao

### Autonomia

## Riscos e Debitos Remanescentes

## Aprendizados da Sprint

## Proximos Passos
```

## Regras para as Metricas

- usar numeros simples e consistentes entre sprints
- nao inventar indicador que o time nao consegue medir
- sempre contextualizar o numero com uma leitura qualitativa
- comparar a sprint atual com a anterior quando ja houver base historica

## Resultado Esperado

Ao final de cada sprint, o time deve conseguir responder com clareza:

- o que construimos
- como encaixamos as entregas
- onde tivemos friccao
- onde evoluimos
- o que precisa mudar para a proxima iteracao
