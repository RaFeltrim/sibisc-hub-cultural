# Validação operacional independente UX/acessibilidade - SIBiSC/Feltrim Agents

Data: 2026-05-19  
Site validado: [https://sibisc-hub-cultural.vercel.app](https://sibisc-hub-cultural.vercel.app)  
Escopo: Home desktop/mobile, header/nav/bottom nav, Feltrim Agents, feedback operacional, catálogo/detalhe, disponibilidade mockada, eventos, notícias, perfil, jornada do leitor e rota inexistente.

## Independência da validação

Esta validação foi executada de forma independente. Não foram lidos, usados ou citados relatórios ou conclusões anteriores de Sofia, incluindo arquivos com nomes relacionados a `sofia`, `conclusao_sofia`, `validacao_operacional_sofia` ou `validacao_leitor_tela_sofia`.

## Veredito

**GO condicional para UX/acessibilidade do protótipo.**

O site está operacionalmente navegável em desktop e mobile, os principais fluxos funcionam, o foco visível existe, CTAs principais são compreensíveis e as respostas do Feltrim Agents deixam claros os limites do protótipo e da disponibilidade mockada. Não encontrei bloqueador crítico para uso demonstrativo.

O GO é condicional porque há riscos de acessibilidade e refinamentos importantes antes de considerar a experiência fechada: navegação mobile por teclado muito tardia para o bottom nav, ausência de atalho de pular conteúdo/navegação, uma ocorrência de conteúdo fora de landmarks no axe completo e contraste não plenamente verificável por ferramenta automática em áreas com gradiente.

## Ambiente e método

- Navegador automatizado: Playwright CLI em Chromium.
- Desktop: viewport 1440 x 900.
- Mobile: viewport 390 x 844.
- Teclado: Tab, Shift+Tab e Enter em links, botões, busca, perguntas guiadas e abas de perfil.
- Ferramenta automatizada: `axe-core` CLI 4.11.4.
- Varredura WCAG A/AA com axe: home, catálogo, perfil e rota inexistente.
- Limitação: não houve validação com leitor de tela real, nem medição manual de contraste pixel a pixel. O axe sinalizou contrastes como incompletos em alguns pontos por causa de fundos com gradiente.

## Resultado por fluxo

### Home, header e navegação

- Desktop apresenta header com navegação principal clara: Início, Notícias, Eventos, Catálogo e Perfil.
- Mobile apresenta header compacto com marca e bottom nav com cinco destinos.
- Tab e Shift+Tab funcionaram sem aprisionamento de foco.
- Foco visível foi observado nos links e botões, normalmente com outline laranja de 3px.
- Ponto de atenção: no mobile, o bottom nav aparece visualmente fixo, mas entra no final da ordem de foco. Em teste, só aparece após cerca de 30 elementos focáveis da home.

### Feltrim Agents

- Perguntas guiadas alteram corretamente a resposta ativa.
- Enter em pergunta guiada com foco ativou a resposta.
- As respostas são compreensíveis, explicáveis e informam fonte/limite.
- O fallback fora de escopo é honesto: não promete IA generativa, catálogo oficial em tempo real, reserva real ou integração de atendimento inexistente.
- A busca assistida mostra feedback operacional em `status`, por exemplo indicando quantidade de sugestões encontradas.
- Ponto de melhoria: o CTA "Explorar" é curto e genérico; "Buscar no catálogo" ou "Explorar no catálogo" reduziria ambiguidade.

### Feedback operacional

- O link externo para GitHub Issues é claro.
- A alternativa local "Copiar roteiro de feedback" exibe status visível após acionamento.
- O detalhe "Ver roteiro" é acessível por teclado e expõe um roteiro compreensível.
- O texto orienta o usuário a não enviar dados pessoais sensíveis.

### Catálogo e detalhe

- Catálogo mostra busca, lista de livros, autor, ISBN, disponibilidade e unidade.
- A busca sem resultado exibe feedback operacional claro em `status`: nenhum livro encontrado e sugestão para revisar termo ou autor.
- O detalhe do livro mostra título, metadados, disponibilidade demonstrativa, unidades, distâncias e aviso para confirmar estoque/retirada com a biblioteca.
- Disponibilidade mockada está bem sinalizada e não induz reserva real.

### Eventos, notícias e perfil

- Listagens de eventos e notícias têm títulos e links de detalhe compreensíveis.
- Detalhes de evento e notícia têm retorno claro para a listagem.
- Perfil informa que os dados são demonstrativos e locais.
- Checkbox de notificações tem nome acessível.
- Abas do perfil usam papéis de tablist/tab/tabpanel e Enter ativou a aba Favoritos.
- Jornada do leitor e progressos têm labels expostos, mas alguns textos como "7 de 5" podem soar estranhos; melhor limitar visual e semanticamente ao máximo concluído.

### Rota inexistente

- Rota inexistente apresenta mensagem 404 clara.
- Há CTA único e compreensível para voltar ao início.
- Não houve quebra de layout ou navegação.

## Resultado do axe-core

- Home com filtros WCAG A/AA: **0 violações**.
- Catálogo com filtros WCAG A/AA: **0 violações**.
- Perfil com filtros WCAG A/AA: **0 violações**.
- Rota inexistente com filtros WCAG A/AA: **0 violações**.
- Home em varredura completa sem filtro WCAG: **1 item moderado de best practice** para conteúdo da faixa/ribbon fora de landmarks.
- Incompletos relevantes: o axe não conseguiu determinar alguns contrastes por causa de fundos com gradiente, principalmente em bottom nav/footer. Isso não confirma falha, mas impede declarar contraste aprovado somente pela ferramenta.

## Achados priorizados

### UX-A11Y-01 - Bottom nav mobile tardio na ordem de foco

Severidade: média.  
Impacto: usuários de teclado em viewport mobile precisam percorrer grande parte da página antes de chegar à navegação fixa inferior. Visualmente a navegação parece imediata, mas semanticamente fica tarde.

Recomendação: inserir um link "Pular para navegação" ou "Pular para conteúdo", avaliar posicionamento do landmark mobile no DOM e garantir caminho rápido para as rotas principais.

### UX-A11Y-02 - Conteúdo fora de landmark na faixa informativa

Severidade: baixa/média.  
Impacto: o axe completo apontou que a faixa com "4 unidades conectadas / agenda cultural viva / acervo com busca rápida" não está contida por landmark.

Recomendação: mover a faixa para dentro de `header`, `main` ou outro landmark apropriado, ou envolver com região nomeada quando fizer sentido.

### UX-A11Y-03 - Contraste em gradientes exige conferência manual

Severidade: média como risco de validação.  
Impacto: o axe reportou análise incompleta de contraste em elementos sobre gradientes, incluindo itens de bottom nav/footer. A inspeção operacional não indicou bloqueio óbvio, mas a ferramenta não conseguiu provar conformidade.

Recomendação: medir contraste dos estados normal, hover, active e focus dos textos sobre gradientes e ajustar tokens se qualquer combinação ficar abaixo de 4.5:1 para texto normal.

### UX-01 - Microcopy com acentuação irregular

Severidade: baixa.  
Impacto: aparecem textos como "catalogo", "nao", "orientacao" e "Navegacao" sem acentos. Isso não bloqueia uso, mas reduz polimento, naturalidade em português e pode piorar pronúncia em tecnologias assistivas.

Recomendação: normalizar acentuação nos textos visíveis e labels acessíveis.

### UX-02 - Progresso acima da meta pode confundir

Severidade: baixa.  
Impacto: textos como "7 de 5, meta concluída" comunicam excesso de meta, mas podem parecer erro numérico.

Recomendação: manter o dado bruto se útil, mas mostrar a meta como concluída de forma clamped, por exemplo "Meta concluída: 5/5; 7 registros no total".

## Conclusão

O SIBiSC/Feltrim Agents passa na validação operacional independente para demonstração: os fluxos centrais são utilizáveis, a navegação não quebra, o teclado aciona controles relevantes e os limites do protótipo estão bem comunicados.

Para um aceite mais rigoroso de UX/acessibilidade, recomendo tratar primeiro a navegação mobile por teclado, adicionar atalhos de pular conteúdo/navegação, corrigir o landmark da faixa informativa e confirmar contraste sobre gradientes com medição manual.
