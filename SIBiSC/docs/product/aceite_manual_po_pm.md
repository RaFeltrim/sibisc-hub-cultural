# Aceite manual PO/PM - SIBiSC/Feltrim Agents

Data: 2026-05-19  
Ambiente testado: producao publica em <https://sibisc-hub-cultural.vercel.app>  
Repo local de referencia: `C:\Users\Rafael Feltrim\Downloads\Web e Mobile - USP\Web_Mobile`  
Perfil de avaliacao: PO + PM senior, aceite manual real de produto  
Escopo: validacao de proposta de valor, clareza de comunicacao, navegacao funcional, riscos de promessa e prontidao para apresentacao publica.

## 1. Decisao executiva

**Aceite: APROVADO COM RESSALVAS para apresentacao publica como prototipo academico avancado.**

O produto cumpre a proposta central esperada: o usuario entende rapidamente que o SIBiSC agrega catalogo, noticias, eventos e perfil em uma experiencia mobile-first, e que Feltrim Agents e um assistente guiado/prototipo que recomenda livros com base em dados locais, preferencias demonstrativas e disponibilidade mockada. A experiencia nao promete backend real, IA generativa real ou reserva real quando o usuario passa pelas mensagens principais da Home.

Nao recomendo reprovar a release para demonstracao publica, porque os fluxos P0 de entendimento, descoberta de livro, detalhe, eventos, noticias, perfil, gamificacao pessoal e feedback estao concluidos. Recomendo, porem, manter o discurso de release como **prototipo demonstrativo**, nao como produto operacional de biblioteca, ate corrigir os riscos de comunicacao apontados abaixo.

## 2. Metodo de teste

Validacao feita em navegador real via Playwright CLI contra o site publico. Foram percorridas as rotas e fluxos principais:

- `/`
- `/catalogo`
- `/catalogo/b7`
- `/eventos`
- `/eventos/e3`
- `/noticias`
- `/noticias/n1`
- `/perfil`
- fluxo externo Google Calendar
- fluxo externo GitHub Issues
- viewport mobile `390x844`

Tambem foram verificados console do navegador e navegacao responsiva. O console nao apresentou erros ou warnings da aplicacao durante a sessao. As falhas de rede observadas eram chamadas injetadas por extensao/antivirus local, fora do dominio da aplicacao.

## 3. Resultado por cenario de aceite

| # | Cenario | Status | Evidencia PO/PM |
| --- | --- | --- | --- |
| 1 | Usuario entende em ate 1 minuto o que e o SIBiSC e o Feltrim Agents | Aprovado | A Home comunica "Rede municipal de bibliotecas", "Noticias, eventos e catalogo" e "Assistente guiado do SIBiSC". O hero explica que Feltrim Agents ajuda a encontrar leitura e usa dados locais do catalogo, eventos, noticias e perfil. |
| 2 | Usuario consegue encontrar uma recomendacao de livro e abrir detalhe valido | Aprovado | A Home exibiu recomendacoes como `Vidas Secas`, `Dom Casmurro` e `Memorias Postumas de Bras Cubas`; o clique em `Vidas Secas` abriu `/catalogo/b7` com titulo, autor, ISBN, editora, paginas, disponibilidade e unidades. |
| 3 | Usuario entende por que uma recomendacao apareceu | Aprovado | As recomendacoes exibem "Motivo" e "Fonte/limite", por exemplo autor presente nas preferencias do cadastro e catalogo mock/local. |
| 4 | Usuario entende que disponibilidade e prototipo/mock e que nao ha reserva real | Aprovado com ressalva | A Home e as perguntas guiadas deixam claro "catalogo-mock", "disponibilidade mockada", "nao ha backend de IA ou reserva real". A noticia detalhada tambem reforca isso. Ressalva: o detalhe de livro ainda usa microcopy como "exemplares disponiveis" e "Disponivel para retirada" com menor destaque para o carater mock. |
| 5 | Usuario encontra eventos e adiciona/abre Calendar quando aplicavel | Aprovado | `/eventos` lista agenda por data; `/eventos/e3` exibe data, horario, local, publico e inscricao. O botao "Abrir Google Calendar" abriu nova aba do Google Calendar com titulo, datas, local e descricao do evento. |
| 6 | Usuario le noticia e retorna a navegacao | Aprovado | `/noticias` lista noticias e filtros; `/noticias/n1` abriu detalhe com origem e conteudo; retorno por historico voltou para `/noticias`. |
| 7 | Usuario entende perfil, favoritos, emprestimos e jornada do leitor | Aprovado | `/perfil` mostra usuario demonstrativo, biblioteca, preferencias, notificacao de devolucao, abas de emprestimos/historico/favoritos, links para catalogo e jornada do leitor. |
| 8 | Usuario entende que gamificacao e pessoal, sem ranking publico | Aprovado | A secao "Progresso pessoal e trilhas culturais" afirma que a jornada e demonstrativa, com mocks locais, sem ranking publico, pontuacao competitiva ou persistencia real. |
| 9 | Usuario consegue abrir canal de feedback Sofia/Claudia e entende privacidade | Aprovado com ressalva | A Home explica Sofia/Claudia, processo de triagem e alerta para nao enviar dados pessoais sensiveis. O link abriu GitHub Issues com template `feedback_sofia_claudia`. Ressalva: usuarios sem conta GitHub caem em tela de login, o que pode interromper feedback em apresentacao publica. |
| 10 | Experiencia mobile e aceitavel para apresentacao publica | Aprovado com ressalva | Em `390x844`, a Home manteve hierarquia, bottom nav apareceu e navegou para Perfil. Nao houve overflow horizontal (`scrollWidth` igual a `clientWidth`). Ressalva: a Home mobile e longa/densa; feedback e detalhes de limite ficam abaixo da dobra. |

## 4. Gaps de produto

1. **Detalhe de livro nao reforca o limite com a mesma clareza da Home.** A tela de detalhe mostra "7 exemplares disponiveis" e "Disponivel para retirada no prototipo local", mas o usuario pode interpretar como disponibilidade operacional. O ideal e repetir no detalhe: "mock demonstrativo, confirme com a biblioteca, sem reserva real".

2. **Feedback depende de conta GitHub.** O canal Sofia/Claudia abre o template correto, mas para o publico geral a barreira de login GitHub pode reduzir participacao. Para release academica e aceitavel; para uso real, precisa canal alternativo ou formulario proprio.

3. **Gamificacao tem contadores acima da meta.** Indicadores como `7/5`, `7/6` e `7/3` comunicam progresso, mas podem parecer erro de regra. Melhor exibir "meta concluida" ou limitar visualmente a 100% com contagem complementar.

4. **Perfil usa dados pessoais demonstrativos sem aviso proximo ao topo.** O usuario informado ve nome, e-mail e historico de Joao Silva. A pagina deixa claro que a jornada e mockada, mas o aviso vem na secao de progresso. Para evitar ruído, o topo deveria marcar "perfil demonstrativo".

5. **Acentos e microcopy ainda variam.** Foram observadas strings sem acento, como "Catalogo", "Noticias", "Preferencias", "Nao Ficcao", "Programacao". Nao bloqueia aceite, mas enfraquece acabamento de apresentacao publica.

6. **Home mobile concentra muita informacao.** A proposta fica clara, mas a combinacao de hero, cards, perguntas guiadas, recomendacoes, feedback, noticias e agenda cria uma rolagem longa para uma apresentacao rapida.

## 5. Riscos de comunicacao

- **Risco de promessa operacional:** termos como "retirada", "exemplares disponiveis" e "origem Portal Oficial" podem ser lidos como informacao oficial em tempo real se apresentados fora do contexto de prototipo.

- **Risco de promessa de IA:** o nome "Feltrim Agents" e a frase "assistente inteligente" sao fortes. O produto mitiga bem com "prototipo", "respostas usam dados locais" e "nao ha backend de IA", mas o apresentador precisa repetir esse enquadramento.

- **Risco de reserva real:** a Home e a pergunta "Reserva e renovacao" resolvem bem o limite, mas um usuario que entra direto pelo detalhe do livro pode nao ver a explicacao completa.

- **Risco de privacidade:** o canal de feedback orienta a nao enviar dados sensiveis, o que e positivo. Ainda assim, GitHub Issues e publico por natureza; a comunicacao deve dizer explicitamente que o feedback pode ficar visivel no GitHub.

- **Risco de oficialidade institucional:** como ha links e mencoes a prefeitura/SIBiSC, a apresentacao deve distinguir prototipo academico de canal oficial da rede.

## 6. Recomendacoes de release

### Release recomendada

**Liberar para apresentacao publica controlada como prototipo demonstrativo.**  
Posicionamento recomendado: "SIBiSC/Feltrim Agents e uma camada de experiencia e orientacao sobre catalogo, eventos, noticias e perfil, usando dados locais demonstrativos, sem substituir sistemas oficiais da biblioteca."

### Antes da apresentacao

1. Abrir a apresentacao pela Home e destacar, verbalmente, que:
   - o assistente e guiado, nao chat/IA generativa;
   - os dados sao locais/mock;
   - nao existe reserva real;
   - feedback deve evitar dados pessoais sensiveis.

2. Demonstrar o fluxo principal nesta ordem:
   - Home -> recomendacao explicavel -> detalhe do livro;
   - pergunta "Reserva e renovacao" para mostrar limite;
   - Eventos -> detalhe -> Google Calendar;
   - Noticias -> detalhe -> retorno;
   - Perfil -> jornada pessoal/sem ranking -> favoritos/emprestimos;
   - feedback Sofia/Claudia.

3. Evitar afirmar "disponibilidade real", "integrado ao SIBI/PHL", "IA real", "reserva online" ou "dados persistidos".

### Melhorias recomendadas pos-release

1. Adicionar aviso persistente ou badge em detalhes de livro: "disponibilidade mockada, sem reserva real".
2. Marcar o topo do Perfil como "perfil demonstrativo".
3. Ajustar contadores de gamificacao acima da meta para estado "concluido".
4. Criar canal de feedback alternativo sem login GitHub para usuarios nao tecnicos.
5. Padronizar acentos e microcopy antes de uma apresentacao institucional.
6. Fazer teste humano com leitor de tela real antes de declarar release publica irrestrita.

## 7. Conclusao

O SIBiSC/Feltrim Agents esta **aprovado para release/apresentacao como prototipo**. A proposta de valor esta compreensivel e os fluxos essenciais funcionam no site publico. A principal condicao de release e manter a narrativa honesta: assistente guiado, dados mockados, gamificacao pessoal e feedback por GitHub Issues, sem promessa de backend, IA generativa, integracao oficial ou reserva real.
