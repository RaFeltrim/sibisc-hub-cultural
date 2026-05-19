# Teste manual UX e acessibilidade basica - SIBiSC/Feltrim Agents

Data: 2026-05-19  
Ambiente testado: `https://sibisc-hub-cultural.vercel.app`  
Repo local: `C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile`  
Navegador: Microsoft Edge local via Chromium/CDP e Playwright CLI  
Viewports: desktop `1366x900`; mobile `390x844`

## Decisao Go/No-Go

**UX funcional: GO com ressalvas.** Usuarios conseguem entender a proposta geral, navegar entre Home, Catalogo, Noticias, Eventos, Perfil e usar o Feltrim Agents em fluxo guiado. A linguagem deixa claro que disponibilidade, agenda e recomendacoes usam dados locais/mockados.

**Acessibilidade basica: NO-GO para declarar pronto sem ressalvas.** A navegacao por Tab tem foco visivel e ordem em geral logica, mas ha lacunas relevantes: paginas de listagem sem `h1`, referencias `aria-controls` quebradas nas abas do Perfil quando paineis inativos nao estao no DOM, validacao de leitor de tela nao executada, e alguns alvos/links pequenos. Recomendo corrigir os P2 antes de comunicar conformidade basica.

## Evidencias

Capturas salvas em `SIBiSC/docs/qa/teste_manual_ux_acessibilidade_evidencias/`:

- `desktop-home.png`
- `mobile-home-mobile.png`
- `desktop-catalogo.png`
- `desktop-perfil.png`

Coletas executadas:

- Inspecao real em Chromium/Edge por CDP nas rotas `/`, `/home-mobile`, `/catalogo`, detalhe de catalogo, `/eventos`, detalhe de evento, `/noticias`, detalhe de noticia e `/perfil`.
- Sequencia de `Tab`, `Shift+Tab` e `Escape` em desktop e mobile.
- Ativacao por clique real/CDP dos fluxos guiados, filtros, busca, calendario e abas.
- Inspecao de landmarks, headings, `aria-live`, `role=status`, `aria-controls`, labels, foco visivel, overflow horizontal e tamanhos aparentes de alvo.
- Capturas Playwright CLI aguardando conteudo carregado por seletor textual.

Limitacao honesta: a ativacao por `Enter`/`Space` em botoes nativos via CDP direto nao foi conclusiva neste ambiente, porque o protocolo nao sintetizou a ativacao padrao em alguns controles mesmo com foco DOM correto. Como os controles sao `button`, `a` e `input` nativos, a expectativa tecnica e boa, mas a liberacao final deve incluir uma rodada manual headed com teclado fisico ou Playwright Test completo.

## Resultado por fluxo

Home desktop:

- Proposta do Feltrim Agents e clara: assistente guiado, prototipo, dados locais.
- Header tem marca, navegacao principal, CTA de catalogo e foco visivel.
- Ordem de foco observada: marca, links de header, CTA, cards/acoes da hero, campo de busca, botao de busca, perguntas guiadas, respostas e links internos.
- `aria-live="polite"` existe na resposta guiada e status de busca usa `role="status"` quando visivel.
- A resposta guiada mostra motivo, fonte/limite e proxima acao. Em desktop isso e compreensivel, mas a resposta fica densa.

`/home-mobile`:

- Layout mobile carregou em `390x844`, bottom nav visivel e com alvos grandes o suficiente.
- Perguntas guiadas aparecem em chips de duas colunas; foco e contraste aparente sao bons.
- O conteudo da resposta guiada fica parcialmente abaixo da dobra e pode ser encoberto visualmente pelo bottom nav no fim da tela. O usuario precisa rolar para encontrar fonte/limite e proxima acao.

Feltrim Agents:

- Perguntas guiadas testadas: literatura brasileira, Machado de Assis, cidade e sociedade, disponibilidade, eventos de leitura.
- Respostas trazem recomendacoes ou referencias locais, motivo, fonte/limite e proxima acao.
- O limite "disponibilidade mockada / nao substitui confirmacao oficial" aparece e reduz risco de promessa falsa.
- Busca por "carolina" retornou sugestao de catalogo local.

Feedback Sofia/Claudia:

- Home desktop e mobile explicam o canal oficial em GitHub Issues.
- Texto de privacidade orienta nao enviar dados pessoais sensiveis, tokens, documentos, enderecos completos ou prints privados.
- Link aponta para GitHub Issues com template `feedback_sofia_claudia.md` e abre fora do site. UX e clara, mas depende de conta GitHub.

Catalogo e detalhe:

- Busca do catalogo e compreensivel; retorno para "vidas" encontrou "Vidas Secas".
- Detalhe mostra disponibilidade mockada por unidade com texto, contagem e chamada/localizacao, nao apenas cor.
- Nao houve overflow horizontal no mobile (`scrollWidth` igual ao viewport observado).
- A listagem usa `h2` como titulo principal em vez de `h1`, o que prejudica orientacao semantica.

Eventos e Calendar:

- Eventos aparecem agrupados por data, com link "Ver detalhes".
- Detalhe exibe data, horario, local, publico e inscricao.
- Acao "Abrir Google Calendar" retorna mensagem dinamica com `role="status"`/`aria-live="polite"`.
- O status foi honesto quando pop-up nao abriu automaticamente: orientou permitir pop-ups.

Noticias:

- Filtros por categoria sao botoes com `aria-pressed`.
- Cards levam ao detalhe; detalhe preserva origem/fonte quando existe.
- Assim como Catalogo/Eventos, a pagina de listagem usa titulo de secao em `h2` e fica sem `h1`.

Perfil:

- Perfil exibe dados do leitor, preferencias, checkbox de notificacao, Jornada do leitor, selos e metas.
- Barras de progresso usam `role="progressbar"` com `aria-label`, `aria-valuenow` e `aria-valuemax`.
- Abas usam `role="tab"` e `aria-selected`, mas paineis inativos sao desmontados. Com isso, `aria-controls` de "Historico" e "Favoritos" aponta para IDs inexistentes enquanto a aba "Emprestimos" esta ativa.
- Desktop nao tem "Perfil" na navegacao principal do header. A rota existe e aparece no bottom nav/mobile, mas a descoberta em desktop depende de links contextuais.

## Achados por severidade

### P0

Nenhum bloqueador critico encontrado.

### P1

- Validacao com leitor de tela real nao foi executada. NVDA nao foi encontrado nos caminhos padrao do Windows; o Narrator existe no sistema, mas nao foi acionado porque a sessao automatizada nao oferece canal auditivo/controle assistivo confiavel. Isso impede afirmar compatibilidade real com leitor de tela.

### P2

- Paginas de listagem sem `h1`: Catalogo, Noticias e Eventos apresentam o titulo principal via `SectionHeader` como `h2`. Para usuarios de leitor de tela, isso reduz orientacao de pagina e navegacao por headings.
- Abas do Perfil com `aria-controls` quebrado para paineis inativos: "Historico" e "Favoritos" referenciam paineis que nao existem no DOM ate a aba ser ativada.
- Descoberta do Perfil em desktop e fraca: o header desktop lista Inicio, Noticias, Eventos e Catalogo, mas nao Perfil. O acesso fica dependente de caminhos contextuais.
- Mobile Feltrim Agents tem conteudo critico abaixo da dobra: motivo/fonte/limite/proxima acao podem exigir rolagem longa, e o bottom nav pode disputar espaco visual no final da tela.

### P3

- Alguns links inline/CTAs secundarios em cards tem altura visual pequena, especialmente "Ler detalhe", "Ver detalhes" e links de secao. Em desktop isso nao bloqueia, mas piora precisao para usuarios com baixa motricidade.
- O checkbox de notificacao do Perfil tem caixa visual pequena, embora o label aumente a area clicavel.
- Contraste aparente e bom nos textos principais, mas a paleta laranja/accent em textos pequenos merece medicao formal antes de declarar WCAG AA.
- Respostas do Feltrim Agents sao explicaveis, porem densas. Em mobile, o usuario pode entender a recomendacao antes de ver claramente a limitacao.

## Roteiro de leitor de tela pendente

Executar com NVDA ou Narrator em Windows:

1. Abrir `/` e navegar por headings (`H`) confirmando existencia de titulo principal e secoes.
2. Navegar por landmarks (`D`/atalhos equivalentes) confirmando header, nav, main e footer.
3. Usar `Tab` ate as perguntas guiadas do Feltrim Agents.
4. Ativar uma pergunta com `Enter` e confirmar se a regiao `aria-live` anuncia a nova resposta.
5. Confirmar que motivo, fonte/limite e proxima acao sao lidos em ordem compreensivel.
6. Buscar "carolina" e confirmar anuncio do status de resultado.
7. Abrir `/catalogo`, buscar "vidas", entrar no detalhe e verificar leitura da disponibilidade por unidade.
8. Abrir `/eventos`, entrar em detalhe, acionar Google Calendar e confirmar anuncio do status.
9. Abrir `/perfil`, navegar pelas abas com teclado e confirmar nomes, estados selecionados e paineis.
10. Repetir em viewport mobile ou dispositivo real, verificando bottom nav e rolagem.

## Recomendacao final

Liberar apenas como **MVP demonstrativo com ressalvas de acessibilidade**. Para Go de acessibilidade basica, corrigir os P2, medir contraste formalmente e executar o roteiro com leitor de tela real.
