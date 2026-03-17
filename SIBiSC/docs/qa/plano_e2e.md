# Plano E2E

## Fluxos Críticos Iniciais

- navegação por notícias
- visualização de eventos e lembretes
- busca de livro com disponibilidade
- consulta da unidade mais próxima

## Cenários Obrigatórios

- geolocalização concedida
- geolocalização negada
- busca sem resultado
- evento sem imagem ou mídia externa
- falha temporária de dados sincronizados

## Regras

- simular permissão concedida e negada de geolocalização
- validar estados vazios e falhas de integração
- registrar o ambiente usado nas execuções
- manter evidências mínimas para aceite de release

## Execucao Inicial do Front - 2026-03-16

### Ambiente usado

- preview do projeto no Lovable
- navegacao assistida por Playwright MCP
- dados mockados gerados na primeira versao do prototipo

### Fluxos validados

- `Home` carregou com destaque de noticias, eventos e busca rapida
- `Noticias` abriu listagem e detalhe
- `Eventos` abriu listagem agrupada por dia e detalhe
- o fallback `Abrir Google Calendar` abriu corretamente em nova aba
- `Catalogo` abriu listagem, respondeu a busca e mostrou detalhe do livro
- o fallback manual de localizacao apareceu com bairros selecionaveis

### Achados

- a base navegavel do MVP esta funcional para apresentacao e refinamento
- a navegacao principal entre as quatro rotas respondeu como esperado
- o detalhe do catalogo mostrou disponibilidade por unidade e destaque da unidade mais proxima
- houve warnings de React no console da preview do Lovable

### Pendencias para a proxima rodada

- repetir a bateria completa em uma URL publicada ou ambiente exportado
- validar responsividade de forma controlada em viewports mobile e desktop
- verificar `data-testid` por seletor automatizado em todos os fluxos
- confirmar os cenarios de erro, vazio e geolocalizacao negada apos estabilizacao do prototipo
