# Correção de Regressões Visuais

## Problemas corrigidos

- O bloco global de bibliotecas deixou de competir com a Home como uma segunda seção hero. O texto foi reescrito e o rodapé passou a ser um bloco compacto de unidades, horários e contatos.
- O espaçamento excessivo antes e depois do rodapé foi reduzido, mantendo folga suficiente para a navegação inferior fixa em mobile.
- Os cards de bibliotecas passaram a usar grid responsivo com largura mínima, evitando colunas espremidas em desktop/tablet.
- O cabeçalho mobile foi compactado: a faixa superior é ocultada em telas pequenas, o badge diminuiu e a ribbon de fatos não empurra mais o conteúdo no mobile.
- A Home mobile passou a escopar os estilos de seções em classes locais, evitando vazamento de CSS para outros `section`.
- O bottom nav mobile ficou mais leve e baixo, com menor largura, sombra e altura.
- O hero desktop da Home foi compactado: tipografia menor, console menos alto e painel guiado com rolagem interna controlada em desktop.

## Validação

- Edge/Playwright CLI em `1366x900` na rota `/`: hero desktop medido em aproximadamente `944px`, cards do rodapé com largura estável de `283px`.
- Edge/Playwright CLI em `820x1180` na rota `/`: header com `105px`, bottom nav visível e cards do rodapé em uma coluna larga sem compressão.
- Edge/Playwright CLI em `390x844` na rota `/home-mobile`: header com `53px`, primeira seção iniciando em `64px`, perguntas guiadas abaixo da introdução e bottom nav com `54px`.
- Edge/Playwright CLI em `390x844` no fim da rota `/home-mobile`: rodapé termina acima do bottom nav, com cerca de `77px` de respiro documental abaixo do conteúdo.
- `ReadLints` não encontrou erros nos arquivos editados.
- `npm run qa:repo` passou.
- `npm run qa:ci` passou, incluindo `vite build`.

## Riscos residuais

- A rota `/` continua sendo uma Home rica em conteúdo também em viewport mobile; a rota `/home-mobile` permanece como experiência mobile dedicada.
- O painel guiado da Home desktop usa rolagem interna a partir de desktop largo para manter a composição do hero sob controle sem remover conteúdo de Feltrim Agents.
