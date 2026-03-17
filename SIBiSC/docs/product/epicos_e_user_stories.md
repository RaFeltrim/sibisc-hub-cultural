# Épicos e User Stories

## Objetivo

Centralizar o backlog funcional do SIBiSC em linguagem de negócio, pronto para refinamento de esforço com TL, devs e QA.

## Regras de Organização

- cada US possui ID único
- cada US aponta para persona, release e prioridade
- jornadas públicas e internas não devem ser misturadas na mesma US
- enablers técnicos ficam em seção separada para facilitar rastreio

## EP01 - Notícias

### US-NOT-001

Como cidadão, quero visualizar as notícias mais recentes do SIBiSC para me manter informado sobre o ecossistema cultural local.

- Persona: `Cidadão`
- Prioridade: `Must`
- Release: `R1`

### US-NOT-002

Como cidadão, quero abrir o detalhe de uma notícia para ler o conteúdo completo com contexto e origem.

- Persona: `Cidadão`
- Prioridade: `Must`
- Release: `R1`

### US-NOT-003

Como cidadão, quero filtrar notícias por categoria ou tema para localizar assuntos relevantes com menos esforço.

- Persona: `Cidadão`
- Prioridade: `Should`
- Release: `R1.1`

### US-NOT-004

Como curador, quero revisar, editar e publicar notícias para garantir consistência editorial e confiabilidade das informações públicas.

- Persona: `Curador de conteúdo`
- Prioridade: `Should`
- Release: `R1.1`

## EP02 - Eventos

### US-EVT-001

Como participante, quero ver a agenda de eventos em formato de lista e calendário para me organizar com antecedência.

- Persona: `Participante de eventos`
- Prioridade: `Must`
- Release: `R1`

### US-EVT-002

Como participante, quero abrir o detalhe de um evento para entender local, horário, descrição e público-alvo.

- Persona: `Participante de eventos`
- Prioridade: `Must`
- Release: `R1`

### US-EVT-003

Como participante, quero adicionar um evento à minha agenda para não esquecer o compromisso.

- Persona: `Participante de eventos`
- Prioridade: `Must`
- Release: `R1`

### US-EVT-004

Como curador, quero cadastrar, editar e cancelar eventos para manter a agenda pública confiável.

- Persona: `Curador de conteúdo`
- Prioridade: `Should`
- Release: `R1.1`

## EP03 - Acervo e Geolocalização

### US-ACV-001

Como estudante, quero buscar livros por título, autor ou palavra-chave para localizar rapidamente obras de interesse.

- Persona: `Estudante/Pesquisador`
- Prioridade: `Must`
- Release: `R1`

### US-ACV-002

Como estudante, quero ver a disponibilidade de um livro por unidade para decidir onde realizar a busca física.

- Persona: `Estudante/Pesquisador`
- Prioridade: `Must`
- Release: `R1`

### US-ACV-003

Como estudante, quero identificar a unidade mais próxima com o livro disponível para reduzir meu esforço de deslocamento.

- Persona: `Estudante/Pesquisador`
- Prioridade: `Must`
- Release: `R1`

### US-ACV-004

Como bibliotecário, quero atualizar dados operacionais do acervo para manter a consulta pública coerente com a realidade.

- Persona: `Bibliotecário`
- Prioridade: `Could`
- Release: `R2`

## EP04 - Engajamento

### US-ENG-001

Como cidadão, quero favoritar livros e eventos para voltar facilmente ao que me interessa.

- Persona: `Cidadão`
- Prioridade: `Could`
- Release: `R2`

### US-ENG-002

Como cidadão, quero receber lembretes e notificações sobre conteúdos ou eventos relevantes para manter engajamento ativo.

- Persona: `Cidadão`
- Prioridade: `Could`
- Release: `R2`

### US-ENG-003

Como gestão, quero acompanhar sinais de interesse do público para orientar decisões futuras de comunicação e operação.

- Persona: `Gestão SIBiSC`
- Prioridade: `Could`
- Release: `R2`

## EP05 - Operação Interna

### US-OPS-001

Como bibliotecário, quero gerenciar unidades, horários e informações públicas para manter o serviço atualizado.

- Persona: `Bibliotecário`
- Prioridade: `Must`
- Release: `R1`

### US-OPS-002

Como curador, quero validar conteúdos importados de fontes externas para evitar publicação de dados incorretos.

- Persona: `Curador de conteúdo`
- Prioridade: `Should`
- Release: `R1.1`

### US-OPS-003

Como gestão, quero consultar o histórico de sincronizações e falhas para acompanhar a saúde operacional do sistema.

- Persona: `Gestão SIBiSC`
- Prioridade: `Should`
- Release: `R1.1`

## EP06 - Enablers de Plataforma

- `EN-001`: estruturar banco unificado no Supabase com RLS e leitura pública controlada
- `EN-002`: implementar estratégia de ingestão para notícias, eventos e acervo
- `EN-003`: suportar consultas geoespaciais para unidade mais próxima
- `EN-004`: manter pipeline documental com geração de PDFs espelho
- `EN-005`: implantar estratégia QA shift-left e cobertura dos fluxos críticos

## Status do Backlog

- backlog base consolidado
- detalhamento técnico pendente de refinamento com TL, devs e QA
- esforços e riscos serão ligados a este arquivo durante o planejamento de sprint
