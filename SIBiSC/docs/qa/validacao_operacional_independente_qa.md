# Validacao operacional independente - QA/SDET

**Site validado:** <https://sibisc-hub-cultural.vercel.app>  
**Projeto:** SIBiSC / Feltrim Agents  
**Data:** 19/05/2026  
**Responsavel:** validacao independente de QA/SDET  
**Veredito:** **aprovado com ressalvas**

## Escopo e premissas

Esta validacao foi feita de forma independente, usando o site publico em producao e navegador real via Playwright CLI. O foco foi comportamento funcional observavel: navegacao, busca, interacoes de perfil, dados mockados, feedback visivel, mobile e rota inexistente.

Nao houve alteracao de codigo. O unico arquivo criado foi este relatorio.

## Ambiente e ferramentas

- Sistema operacional: Windows 10.
- Browser: Chrome controlado por Playwright CLI, sessao isolada `qa-independente`.
- Viewports usados:
  - Desktop/headed para fluxos principais.
  - Mobile em `390x844` para `/home-mobile` e bottom nav.
- Checks locais executados:
  - `npm run qa:repo`: passou.
  - `npm run qa:ci`: passou, incluindo `vite build`.

## Resumo executivo

O site em producao esta funcional para apresentacao e navegacao operacional. Home, Feltrim Agents, busca assistida, catalogo, detalhe de livro, disponibilidade mockada, eventos, noticias, perfil, mobile e 404 responderam sem erros de console e sem quebras bloqueantes.

Foram encontradas duas ressalvas:

1. **Media:** a Jornada do leitor nao recalcula seus indicadores apos remocao de favorito, embora a aba Favoritos atualize corretamente.
2. **Baixa/Media:** o botao de Google Calendar abre nova aba e mostra status, mas em uma sessao limpa sem login a aba foi redirecionada para a pagina institucional do Google Calendar, nao para a tela de evento pre-preenchido.

## Evidencias de execucao automatizada local

| Comando | Resultado | Observacao |
| --- | --- | --- |
| `npm run qa:repo` | Passou | Guard validou estrutura minima, docs, rotas criticas e IDs canonicos. |
| `npm run qa:ci` | Passou | `qa:repo` passou e `vite build` gerou build de producao sem falha. |

## Casos executados

### CT-01 - Home desktop

| Campo | Registro |
| --- | --- |
| Passos | Abrir `/`; validar cabecalho, links principais, hero, acoes assistidas, ultimas noticias, proximos encontros e rodape. |
| Esperado | Home renderiza com identidade SIBiSC, Feltrim Agents, links para catalogo/eventos/perfil, noticias e eventos sem erro. |
| Obtido | Home carregou corretamente. Cabecalho, hero, metricas, acoes assistidas, feedback, noticias, eventos e rodape ficaram visiveis. |
| Severidade | Aprovado. |

### CT-02 - Feltrim Agents / perguntas guiadas

| Campo | Registro |
| --- | --- |
| Passos | Na Home, alternar pergunta guiada para "Disponibilidade". |
| Esperado | Resposta guiada muda no mesmo painel, com explicacao, limite/fonte e proxima acao. |
| Obtido | Painel atualizou para "Disponibilidade nesta versao", manteve explicacao sobre dados mockados e ofereceu link para abrir catalogo. |
| Severidade | Aprovado. |

### CT-03 - Busca assistida na Home

| Campo | Registro |
| --- | --- |
| Passos | Digitar `Saramago` na busca assistida da Home e acionar `Explorar`. |
| Esperado | Busca retorna sugestao local relacionada e permite abrir o detalhe do livro. |
| Obtido | Status exibiu "Feltrim Agents encontrou 1 sugestao..." e listou "Ensaio sobre a Cegueira". O link abriu `/catalogo/b6`. |
| Severidade | Aprovado. |

### CT-04 - Catalogo e busca

| Campo | Registro |
| --- | --- |
| Passos | Abrir `/catalogo`; pesquisar `Carolina`; validar status, resultado e refinamento por bairro. |
| Esperado | Catalogo lista resultado compativel, informa disponibilidade mockada e permite priorizar unidade por bairro. |
| Obtido | Busca retornou 1 livro, "Quarto de Despejo". Ao selecionar "Cidade Aracy", o card atualizou para "Biblioteca Cidade Aracy, 0.9km de distancia". |
| Severidade | Aprovado. |

### CT-05 - Detalhe de livro e disponibilidade mockada

| Campo | Registro |
| --- | --- |
| Passos | Abrir `/catalogo/b6`; validar metadados, total disponivel, unidades, aviso mockado e troca de bairro para "Monjolinho". |
| Esperado | Detalhe mostra ISBN, ano, editora, paginas, resumo, disponibilidade por unidade e unidade mais proxima conforme bairro. |
| Obtido | Detalhe exibiu "Ensaio sobre a Cegueira", 3 exemplares disponiveis, tabela por unidade e aviso de dados demonstrativos. Ao escolher Monjolinho, destaque mudou para "BibCom UFSCar, 1.5km". |
| Severidade | Aprovado. |

### CT-06 - Eventos e agrupamento de agenda

| Campo | Registro |
| --- | --- |
| Passos | Abrir `/eventos`; validar lista agrupada por dia e cards com horario, titulo, publico, local e inscricao. |
| Esperado | Eventos aparecem agrupados por data com links de detalhe. |
| Obtido | Agenda exibiu eventos agrupados em 20, 22, 25, 27 e 29 de marco, com dados operacionais e links "Ver detalhes". |
| Severidade | Aprovado. |

### CT-07 - Detalhe de evento e Google Calendar

| Campo | Registro |
| --- | --- |
| Passos | Abrir detalhe de "Hora do Conto Infantil"; clicar em "Abrir Google Calendar"; observar status e aba aberta. |
| Esperado | Detalhe exibe data, horario, local, publico, inscricao e abre Google Calendar em nova aba para salvar o evento. |
| Obtido | Detalhe exibiu dados corretamente e o clique abriu nova aba. A pagina mostrou status informando solicitacao do Google Calendar. Em sessao limpa, a nova aba abriu a pagina institucional do Google Calendar, nao a tela de evento pre-preenchido. |
| Severidade | Baixa/Media. Nao bloqueia a agenda interna, mas pode frustrar o salvamento direto para usuario sem sessao Google ativa. |

### CT-08 - Noticias e detalhe

| Campo | Registro |
| --- | --- |
| Passos | Abrir `/noticias`; filtrar por "Inclusao"; abrir detalhe da noticia filtrada. |
| Esperado | Filtro reduz a lista e o detalhe mostra categoria, data, titulo, resumo, origem e corpo. |
| Obtido | Filtro exibiu noticia de inclusao. O detalhe `/noticias/n4` mostrou titulo, data, origem externa e paragrafos do corpo. |
| Severidade | Aprovado. |

### CT-09 - Perfil, notificacoes e emprestimos

| Campo | Registro |
| --- | --- |
| Passos | Abrir `/perfil`; validar cabecalho, preferencias, Jornada do leitor, aba Emprestimos; desligar notificacao; simular renovacao. |
| Esperado | Perfil mostra dados demonstrativos, checkbox altera estado, renovacao simula nova data e informa que nao houve operacao oficial. |
| Obtido | Perfil carregou com aviso demonstrativo. Checkbox alternou para desligado. Renovacao de "O Cortico" mudou devolucao de 24/05/2026 para 07/06/2026 e exibiu status de simulacao. |
| Severidade | Aprovado. |

### CT-10 - Perfil, Historico

| Campo | Registro |
| --- | --- |
| Passos | Na pagina de perfil, abrir aba "Historico". |
| Esperado | Aba ativa muda e lista historico de emprestimos com unidade, devolucao, periodo e atraso quando aplicavel. |
| Obtido | Aba Historico exibiu itens como "Ensaio sobre a Cegueira", "Quarto de Despejo", "Grande Sertao: Veredas" e marcou atraso em item aplicavel. |
| Severidade | Aprovado. |

### CT-11 - Perfil, Favoritos e Jornada

| Campo | Registro |
| --- | --- |
| Passos | Abrir aba "Favoritos"; remover "Quarto de Despejo"; observar aba, lista, status e indicadores da Jornada. |
| Esperado | Favorito removido desaparece, contador reduz e indicadores dependentes de favoritos permanecem consistentes. |
| Obtido | Item removido desapareceu, status exibiu "Quarto de Despejo removido dos favoritos" e contador da aba mudou de 4 para 3. Porem, a Jornada do leitor continuou exibindo indicadores como "Curador de favoritos 4/4" e "Revisitar favoritos 4/4". |
| Severidade | Media. Estado visivel fica inconsistente apos uma acao funcional do usuario. |

### CT-12 - Home mobile `/home-mobile`

| Campo | Registro |
| --- | --- |
| Passos | Redimensionar para `390x844`; abrir `/home-mobile`; validar hero, perguntas guiadas, busca, feedback, atalhos, noticias, eventos e destaques. |
| Esperado | Home mobile apresenta layout compacto com Feltrim Agents e conteudo navegavel. |
| Obtido | Layout mobile carregou corretamente. Busca por `Machado` retornou 2 resultados com status e links para detalhes. |
| Severidade | Aprovado. |

### CT-13 - Bottom nav mobile

| Campo | Registro |
| --- | --- |
| Passos | Em viewport mobile, acionar bottom nav para `Catalogo`. |
| Esperado | Navegacao inferior permanece visivel e leva a rota escolhida com estado ativo. |
| Obtido | Link `Catalogo` abriu `/catalogo` e apareceu ativo na bottom nav. Demais links estavam visiveis para Inicio, Noticias, Eventos e Perfil. |
| Severidade | Aprovado com observacao: em `/home-mobile`, o item `Inicio` aponta para `/`, nao para `/home-mobile`. Pode ser intencional, mas vale alinhar a expectativa de produto. |

### CT-14 - Feedback operacional visivel

| Campo | Registro |
| --- | --- |
| Passos | Na Home mobile, abrir "Ver roteiro" e clicar em "Copiar roteiro". |
| Esperado | Usuario consegue ver um roteiro local e copiar conteudo para relatar feedback sem login GitHub. |
| Obtido | Roteiro foi exibido e o status confirmou "Roteiro copiado para compartilhar sem login GitHub". Link de envio via GitHub Issues tambem estava visivel. |
| Severidade | Aprovado. |

### CT-15 - Rota inexistente

| Campo | Registro |
| --- | --- |
| Passos | Abrir `/rota-inexistente-qa`. |
| Esperado | Site mostra pagina amigavel de 404 com caminho de retorno. |
| Obtido | Exibiu "404", mensagem "Essa rota ainda nao existe no mapa do SIBiSC" e link "Voltar para inicio". |
| Severidade | Aprovado. |

## Defeitos e ressalvas

### QA-OP-001 - Jornada do leitor nao recalcula apos remocao de favorito

- **Severidade:** Media.
- **Area:** Perfil / Favoritos / Jornada do leitor.
- **Passos:** abrir `/perfil`; ir para `Favoritos`; remover um favorito; observar contador da aba e indicadores da Jornada.
- **Esperado:** contador de favoritos, lista e metas relacionadas a favoritos ficam consistentes.
- **Obtido:** contador da aba mudou de 4 para 3 e item saiu da lista, mas indicadores da Jornada continuaram mostrando metas de favoritos em 4/4.
- **Impacto:** usuario ve estados conflitantes na mesma tela apos uma acao bem-sucedida.
- **Recomendacao:** ao remover favorito, recalcular ou recarregar a Jornada do leitor, ou deixar claro que a Jornada e snapshot estatico da sessao.

### QA-OP-002 - Google Calendar nao abriu evento pre-preenchido em sessao limpa

- **Severidade:** Baixa/Media.
- **Area:** Eventos / detalhe / integracao externa.
- **Passos:** abrir `/eventos/e1`; clicar em `Abrir Google Calendar`.
- **Esperado:** abrir Google Calendar em nova aba pronto para salvar o evento.
- **Obtido:** nova aba abriu, mas em sessao limpa sem login foi redirecionada para pagina institucional do Google Calendar; a pagina do SIBiSC exibiu status de solicitacao.
- **Impacto:** fluxo interno permanece funcional, mas o usuario pode nao chegar diretamente ao formulario de evento.
- **Recomendacao:** validar comportamento com usuario autenticado no Google e, se necessario, ajustar texto para "abrir Google Calendar / fazer login" ou oferecer arquivo `.ics` como alternativa.

## Riscos residuais

- A disponibilidade e todas as acoes de perfil sao mockadas; a validacao confirma apenas o comportamento demonstrativo visivel.
- O fluxo de Google Calendar depende de comportamento externo e de sessao/autenticacao do Google.
- Nao foi validado backend real de reserva, retirada, renovacao oficial ou persistencia de perfil porque a propria UI declara que essas operacoes sao demonstrativas.

## Conclusao

O produto esta **aprovado com ressalvas** para demonstracao operacional. Nao ha bloqueador funcional observado no site publico, e os checks locais passaram. As ressalvas recomendadas para tratamento antes de uma entrega mais polida sao a consistencia da Jornada do leitor apos remover favorito e o alinhamento do comportamento/expectativa do Google Calendar.
