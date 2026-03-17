# Plano MVP para Jira

## Objetivo

Traduzir o MVP do SIBiSC para uma estrutura operacional clara no Jira, com hierarquia de `epicos`, `USs`, `tasks` e `subtasks` pronta para um time com pouca experiencia.

## Como Ler Este Documento

- `Epico`: grande bloco de valor ou de infraestrutura necessaria ao MVP
- `US`: necessidade do usuario ou do time interno
- `Task`: entrega concreta que pode ser atribuida a um aluno
- `Subtask`: passo menor e objetivo para reduzir duvida e retrabalho

## Regras para Times Iniciantes

- cada `task` deve gerar um resultado visivel ou verificavel
- cada `subtask` deve caber em um bloco curto de trabalho
- sempre quebrar a implementacao em partes pequenas quando houver risco tecnico
- evitar subtasks com descricao vaga como `fazer tela` ou `arrumar backend`
- preferir cards que ajudem o aluno a aprender um conceito por vez

## Escopo do MVP

O MVP entregavel cobre:

- noticias publicas
- eventos publicos
- busca de livros
- disponibilidade por unidade
- unidade mais proxima com fallback de geolocalizacao
- operacao minima para manter unidades e conteudos publicos coerentes
- QA e documentacao suficientes para demonstrar o sistema

## EPICO EP-MVP-00 - Fundacao do Projeto

### US-MVP-BASE-001

Como time de desenvolvimento, queremos uma base unica de projeto para trabalhar com menos atrito e mais consistencia.

#### Task T-BASE-001 - Configurar ambiente principal do projeto

Subtasks:

- criar app base Web com estrutura inicial
- configurar variaveis de ambiente locais
- documentar como rodar o projeto
- validar build inicial sem erros

#### Task T-BASE-002 - Configurar Supabase para o MVP

Subtasks:

- conectar o projeto ao Supabase criado
- definir tabelas iniciais do MVP
- registrar regras basicas de acesso
- documentar o fluxo de leitura publica

#### Task T-BASE-003 - Criar layout base e navegacao principal

Subtasks:

- criar cabecalho e menu principal
- criar navegacao entre noticias, eventos e acervo
- definir estados vazios iniciais
- validar uso em mobile e desktop

#### Task T-BASE-004 - Organizar padrao documental e feedback

Subtasks:

- validar uso da pasta `docs`
- registrar relacao entre Jira e Markdown
- preparar pasta de feedback por card
- revisar definicao de pronto para alunos

## EPICO EP-MVP-01 - Noticias

### US-NOT-001

Como cidadao, quero ver noticias recentes do SIBiSC para me manter informado.

#### Task T-NOT-001 - Criar listagem publica de noticias

Subtasks:

- definir card de noticia
- criar pagina de listagem
- buscar noticias da base
- tratar loading, erro e vazio

#### Task T-NOT-002 - Criar detalhe de noticia

Subtasks:

- criar rota de detalhe
- renderizar titulo, data, resumo e conteudo
- mostrar origem da noticia quando houver
- revisar leitura em mobile

### US-NOT-002

Como cidadao, quero abrir o detalhe de uma noticia para ler o conteudo completo.

#### Task T-NOT-003 - Integrar a navegacao entre lista e detalhe

Subtasks:

- adicionar links da lista para o detalhe
- validar retorno para a listagem
- revisar parametros de rota
- documentar contrato da tela

## EPICO EP-MVP-02 - Eventos

### US-EVT-001

Como participante, quero ver eventos em lista e calendario para me organizar.

#### Task T-EVT-001 - Criar listagem de eventos

Subtasks:

- definir card de evento
- criar pagina de eventos
- buscar eventos publicados
- tratar loading, erro e vazio

#### Task T-EVT-002 - Criar visao de calendario simplificada

Subtasks:

- definir agrupamento por data
- exibir eventos por dia
- destacar data atual
- validar legibilidade em mobile

### US-EVT-002

Como participante, quero abrir o detalhe do evento para entender local e horario.

#### Task T-EVT-003 - Criar detalhe de evento

Subtasks:

- criar rota de detalhe
- mostrar titulo, data, hora, local e descricao
- exibir unidade relacionada quando houver
- revisar consistencia com a listagem

### US-EVT-003

Como participante, quero adicionar o evento a minha agenda para nao esquecer.

#### Task T-EVT-004 - Implementar acao de agenda com fallback web

Subtasks:

- definir formato de exportacao ou link de agenda
- adicionar botao na tela de detalhe
- validar comportamento em mobile e desktop
- documentar limite do ambiente web

## EPICO EP-MVP-03 - Acervo e Geolocalizacao

### US-ACV-001

Como estudante, quero buscar livros por titulo, autor ou palavra-chave.

#### Task T-ACV-001 - Criar busca publica de livros

Subtasks:

- criar campo de busca
- implementar consulta por termo parcial
- exibir lista de resultados
- tratar loading, erro e vazio

### US-ACV-002

Como estudante, quero ver disponibilidade por unidade.

#### Task T-ACV-002 - Mostrar disponibilidade por biblioteca

Subtasks:

- definir componente de disponibilidade
- listar unidades relacionadas ao livro
- mostrar status de disponivel ou indisponivel
- revisar nomes e endereco das unidades

### US-ACV-003

Como estudante, quero identificar a unidade mais proxima com o livro disponivel.

#### Task T-ACV-003 - Implementar geolocalizacao com fallback manual

Subtasks:

- solicitar permissao de localizacao
- calcular unidade mais proxima
- criar fallback por selecao manual de bairro ou unidade
- documentar comportamento quando permissao for negada

#### Task T-ACV-004 - Integrar detalhe do livro com disponibilidade e proximidade

Subtasks:

- ligar resultado da busca ao detalhe
- mostrar disponibilidade por unidade
- destacar unidade recomendada
- validar fluxo completo no mobile

## EPICO EP-MVP-04 - Operacao Minima e Curadoria

### US-OPS-001

Como bibliotecario, quero manter informacoes publicas das unidades atualizadas.

#### Task T-OPS-001 - Criar base de unidades do sistema

Subtasks:

- cadastrar unidades principais
- registrar horarios, endereco e contato
- validar consistencia de nomes usados no sistema
- documentar estrutura da unidade

#### Task T-OPS-002 - Exibir informacoes publicas da unidade nas telas

Subtasks:

- conectar unidade em eventos
- conectar unidade em disponibilidade de livros
- revisar padrao de exibicao
- validar reutilizacao do componente

### US-OPS-002

Como curador, quero garantir que noticias e eventos publicados estejam coerentes.

#### Task T-OPS-003 - Definir publicacao minima de conteudo

Subtasks:

- definir campos obrigatorios para noticia
- definir campos obrigatorios para evento
- documentar estado de publicado
- revisar consistencia editorial minima

## EPICO EP-MVP-05 - QA, Integracao e Entrega

### US-MVP-QA-001

Como time, queremos validar os fluxos centrais do MVP para demonstrar o produto com seguranca.

#### Task T-QA-001 - Validar fluxo de noticias

Subtasks:

- revisar criterio de aceite de listagem
- revisar criterio de aceite de detalhe
- registrar evidencias do fluxo
- abrir feedback se houver incompatibilidade

#### Task T-QA-002 - Validar fluxo de eventos

Subtasks:

- revisar criterio de aceite da listagem
- revisar criterio de aceite do detalhe
- revisar acao de agenda
- registrar evidencias do fluxo

#### Task T-QA-003 - Validar fluxo de acervo

Subtasks:

- revisar busca por livros
- revisar disponibilidade por unidade
- revisar geolocalizacao e fallback
- registrar evidencias do fluxo

#### Task T-QA-004 - Fechar documentacao do MVP

Subtasks:

- atualizar documentos impactados
- consolidar feedbacks por card
- preencher fechamento de sprint
- revisar coerencia com o blueprint integrado

## Ordem Recomendada de Criacao no Jira

1. criar os epicos `EP-MVP-00` a `EP-MVP-05`
2. criar as USs ligadas a cada epico
3. transformar cada `Task` deste documento em card executavel
4. abrir `Subtasks` apenas quando a task ainda estiver grande demais para um aluno iniciante

## Analise Didatica das Entregas

O backlog acima foi organizado para facilitar aprendizagem rapida porque:

- comeca pela base do projeto antes de cobrar regra de negocio
- separa noticias, eventos e acervo em trilhas de entendimento independente
- evita misturar backend, front e QA no mesmo card sem contexto
- usa tasks com resultado visivel, o que ajuda a motivacao do aluno
- transforma pontos de risco em subtasks pequenas e observaveis

## Criterio de Boa Task para os Meninos

Uma boa task para o time iniciante deve permitir que o aluno consiga dizer, com clareza:

- o que eu preciso construir
- em qual tela ou fluxo isso aparece
- como eu valido que ficou pronto
- qual parte do sistema eu posso quebrar se errar
- qual documento preciso atualizar quando terminar
