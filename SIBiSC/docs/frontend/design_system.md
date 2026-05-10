# Design System

## Objetivo

Servir como referencia pratica da linguagem visual atual do SIBiSC e orientar manutencao do front sem perder coerencia entre mobile, desktop e handoff no Figma.

## Direcao Visual Atual

- tom editorial e acolhedor, mais proximo de uma biblioteca viva do que de um dashboard generico
- leitura priorizada por contraste, hierarquia tipografica clara e espacamento amplo
- identidade local reforcada por azul profundo, terracota e fundo claro quente
- mesmas fundacoes visuais para mobile e desktop, com adaptacao de densidade e navegacao

## Fundacoes

### Tipografia

- display: `Fraunces`
- corpo: `Manrope`
- apoio tecnico e microcopias: `Space Mono`

### Paleta

- texto principal: `#12263f`
- texto secundario: `#4b6078`
- fundo base: `#f5efe2`
- superficie forte: `#fffaf3`
- acento principal: `#d26438`
- acento forte: `#a34320`
- apoio institucional: `#17324f`
- sucesso: `#317a56`

### Tokens

- tokens centralizados em `src/styles/tokens.css`
- estilos globais e atmosfera visual em `src/styles/globals.css`
- espacamentos e raios pensados para cards, pills, hero e navegacao fixa

## Componentes Compartilhados

- cabecalho editorial com marca, navegacao principal e CTA de acervo
- faixa de fatos rapidos logo abaixo do header
- rodape com unidades da rede e horarios
- `BottomNav` mobile com icones e estados ativos
- `SearchField` com icone interno, CTA destacado e uso responsivo
- `SectionHeader` com eyebrow, titulo, descricao e link auxiliar
- cards de noticia, evento e livro com superficies leves e hierarquia forte
- estados de loading, vazio e erro com aparencia consistente

## Regras de Uso

- preferir componentes existentes antes de criar novas variacoes
- manter os tons quentes e o azul institucional como eixo visual principal
- evitar blocos densos ou com excesso de bordas pesadas
- em mobile, priorizar empilhamento vertical, area de toque ampla e leitura sem zoom
- em desktop, aproveitar largura para respiro e agrupamento, sem descaracterizar o fluxo mobile-first

## Relacao com Figma

- o arquivo principal de trabalho atual e `[USP] SIBiSC App`
- capturas de tela para handoff foram geradas a partir do app local usando Figma MCP
- para novas capturas, o script `capture.js` foi mantido em `SIBiSC/index.html`
- evitar duplicidade no Figma: uma captura por rota e por variante de viewport
