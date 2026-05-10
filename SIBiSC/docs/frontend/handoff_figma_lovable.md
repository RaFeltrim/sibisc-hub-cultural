# Handoff Figma e Lovable

## Objetivo

Registrar como o planejamento visual e o uso de ferramentas de prototipacao apoiam o desenvolvimento do front do SIBiSC.

## Papel do Figma

- organizar wireframes e fluxos do MVP
- validar navegacao com o time antes da implementacao
- servir como referencia visual para responsividade, naming e handoff

## Papel do Lovable

- apoiar exploracao inicial de layout e estrutura
- acelerar a primeira versao navegavel do front
- gerar uma base visual que depois sera refinada pelo time
- nunca substituir decisoes registradas em backlog, arquitetura e docs

## Regras

- o Figma e ferramenta de prototipacao e alinhamento visual
- o Lovable pode apoiar exploracao de interface e boilerplate
- a documentacao oficial de produto e frontend continua em `SIBiSC/docs`
- qualquer decisao derivada dessas ferramentas deve voltar para os `.md`
- QA e TL avaliam o que foi gerado antes de transformar a base em referencia oficial para o time
- capturas feitas por MCP devem evitar duplicidade: uma rota por variante de viewport

## Artefatos Criados em 2026-03-16

### Lovable

- projeto criado: `Sao Carlos Library Hub`
- link do projeto: `https://lovable.dev/projects/c261c475-0e93-404b-8049-8119506366d9`
- status: primeira versao navegavel gerada com sucesso

### Figma

- arquivo criado: `SIBiSC Front MVP`
- link do arquivo: `https://www.figma.com/design/0SpIMtB671SxHWvUjj2OhB/SIBiSC-Front-MVP`
- status: arquivo base criado e estruturado para handoff

## Atualizacao em 2026-03-23

### Arquivo ativo no Figma

- arquivo usado para captura: `[USP] SIBiSC App`
- link do arquivo: `https://www.figma.com/design/7HlVm9sJ0ffToiUwO69QO6/-USP--SIBiSC-App`
- metodo de captura: `Figma MCP + Playwright + app local em http://localhost:5173`

### Telas adicionadas ao arquivo ativo

- `Home Desktop`
- `Noticias Desktop`
- `Noticia Detalhe Desktop`
- `Eventos Desktop`
- `Evento Detalhe Desktop`
- `Catalogo Desktop`
- `Livro Detalhe Desktop`
- `Home Mobile`
- `Noticias Mobile`
- `Eventos Mobile`
- `Catalogo Mobile`

### Observacoes do fluxo

- o link inicial do Figma abriu um frame vazio na sessao automatizada, entao o handoff foi consolidado a partir do app funcional no repositorio
- a captura foi feita por rota publica, preservando o estado mais representativo de cada tela
- o script `https://mcp.figma.com/mcp/html-to-design/capture.js` foi mantido em `SIBiSC/index.html` para permitir novas capturas
- para evitar poluicao do arquivo, a regra operacional passou a ser: nao recapturar uma rota que ja exista no arquivo para a mesma largura

### Organizacao web validada no arquivo ativo

- pagina limpa de consolidacao web criada no arquivo ativo
- link da pagina organizada: `https://www.figma.com/design/7HlVm9sJ0ffToiUwO69QO6?node-id=53-2`
- capturas web consolidadas sem duplicidade:
- `Home` em `53:2`
- `Noticias` em `56:2`
- `Noticia Detalhe` em `57:2`
- `Eventos` em `58:2`
- `Evento Detalhe` em `59:2`
- `Catalogo` em `60:2`
- `Livro Detalhe` em `61:2`

### Cobertura de rotas e detalhes

- rotas publicas confirmadas no app web: `/`, `/noticias`, `/noticias/:newsId`, `/eventos`, `/eventos/:eventId`, `/catalogo`, `/catalogo/:bookId`
- os CTAs `Ler detalhe` e `Ver detalhes` ja possuem telas web capturadas no Figma para noticia, evento e livro
- a rota `*` existe como `NotFoundPage`, mas ficou fora da captura organizada porque nao faz parte do fluxo principal de `ver mais`

## Estrutura Criada no Figma

### Paginas

- `00 Foundations`
- `01 Components`
- `02 Screens Mobile`
- `03 Screens Desktop`
- `04 Prototype`

### Frames mobile criados

- `Home`
- `Noticias`
- `Eventos`
- `Acervo`

### Frames desktop criados

- `Home Desktop`
- `Noticias Desktop`
- `Eventos Desktop`
- `Acervo Desktop`

## Escopo Gerado no Lovable

### Rotas confirmadas

- `Home`
- `Noticias`
- `Eventos`
- `Catalogo`

### Conteudos confirmados

- destaque editorial na home
- listagem e detalhe de noticias
- agenda de eventos agrupada por dia
- detalhe de evento com fallback para Google Calendar
- catalogo com busca, resultado, detalhe e disponibilidade por unidade
- fallback manual para localizacao por bairro

### Direcao visual aplicada

- tipografia editorial com hierarquia clara
- paleta institucional com azul profundo, terracota e fundo claro
- interface mobile-first
- linguagem visual mais acolhedora do que dashboard generico

## Validacao Inicial

### Validado manualmente com navegador + Playwright MCP

- abertura da `Home`
- navegacao para `Noticias`
- abertura de detalhe de noticia
- navegacao para `Eventos`
- abertura de detalhe de evento
- acionamento do fallback `Abrir Google Calendar`
- navegacao para `Catalogo`
- busca por `sapiens`
- exibicao do fallback manual de localizacao
- abertura de detalhe do livro com disponibilidade por unidade

### Evidencias observadas

- o link de calendario abriu corretamente o `Google Calendar` em nova aba
- a busca no catalogo respondeu com filtro coerente
- o detalhe do livro mostrou unidade mais proxima, classificacao e estante
- a navegacao principal entre as quatro rotas ficou funcional

## Pontos de Atencao

- o Lovable exibiu warnings de React no console durante a execucao da preview
- esses warnings nao bloquearam a navegacao principal, mas devem ser revistos antes de transformar essa base em codigo de referencia
- a organizacao visual do Figma esta pronta, mas o detalhamento de componentes ainda precisa ser refinado a partir do que o Lovable gerou
- o fluxo de captura por MCP pode retornar `pending` antes de concluir; manter o mesmo `captureId` ate a confirmacao evita duplicidade

## Integracao com o Repositorio

- a base inicial do front foi traduzida para o repositorio em `SIBiSC`, usando `Vite + React + React Router`
- o codigo entrou com rotas reais, mocks locais, services e `data-testid` para QA
- em `2026-03-23`, a camada visual compartilhada foi refinada em layout, navegacao, busca, cards e estados
- o build local do front passou com sucesso apos a atualizacao visual

## Proximos Passos

- revisar a base gerada com a TL
- transformar os melhores trechos do prototipo em referencia para as `tasks` do time
- detalhar `Components` e `Foundations` no Figma com base na primeira versao navegavel
- rodar nova bateria de validacao apos os primeiros ajustes visuais e estruturais
