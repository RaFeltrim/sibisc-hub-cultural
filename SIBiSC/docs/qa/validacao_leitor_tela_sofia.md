# Validacao de leitor de tela real - Sofia

Data: 2026-05-19  
Validadora real de leitura de tela: Sofia, por decisao do Rafael  
Dominio publico validado: `https://sibisc-hub-cultural.vercel.app`  
Escopo: SIBiSC/Feltrim Agents como prototipo academico demonstrativo

## 1. Papel da Sofia

Por decisao do Rafael, Sofia foi tratada nesta rodada como **leitora de tela real** e validadora humana da experiencia assistiva do SIBiSC/Feltrim Agents.

Esta validacao substitui a pendencia generica de "leitor de tela real por pessoa validadora" para fins do Go/No-Go do prototipo demonstrativo. Ela nao declara execucao de NVDA, Narrator ou VoiceOver quando isso nao foi tecnicamente executado com avaliacao auditiva direta.

## 2. Metodo de validacao

A validacao combinou:

- leitura assistiva conduzida por Sofia, como validadora real definida pelo Rafael;
- navegacao por teclado nas rotas principais;
- verificacao dos nomes acessiveis de links, botoes, campos, abas e CTAs principais;
- verificacao de headings, landmarks e ordem de leitura esperada;
- exercicio do fluxo guiado do Feltrim Agents em `/home-mobile`;
- exercicio da busca por `Sapiens` em `/home-mobile`;
- exercicio da acao `Simular renovacao` em `/perfil`;
- evidencia auxiliar por Playwright CLI/Edge, DOM renderizado, sequencia de foco por `Tab`, texto visivel, status HTTP e regioes `role=status`/`aria-live`.

Limitacao honesta: nao houve execucao auditiva real de NVDA, Narrator ou VoiceOver nesta sessao. As evidencias automatizadas apoiam a decisao da Sofia, mas nao devem ser apresentadas como teste de leitor de tela de fornecedor especifico.

## 3. Rotas validadas

| Rota | Resultado Sofia | Evidencia principal |
| --- | --- | --- |
| `/` | Passou | `h1` claro, landmarks presentes, foco inicia pela marca/navegacao e segue para CTAs, busca e perguntas guiadas. |
| `/home-mobile` | Passou | `h1` `Feltrim Agents`, perguntas guiadas focaveis, busca `Sapiens` anunciou `Busca aplicada: 1 resultado no catalogo local.` |
| `/catalogo` | Passou | `h1` `Catalogo`, campo de busca e botao `Buscar`, aviso `Disponibilidade mockada` e cards com disponibilidade demonstrativa textual. |
| `/catalogo/b1` | Passou | `h1` do livro, CTA `Voltar ao catalogo`, texto `Contagem demonstrativa/mockada` e botoes de unidade focaveis. |
| `/perfil` | Passou com ressalva leve | `h1` do perfil, abas com nomes/estados, `Simular renovacao demonstrativa por mais 14 dias` e status de renovacao demonstrativa compreensivel. |
| `/eventos` | Passou | `h1` `Eventos`, lista navegavel e CTAs `Ver detalhes`; conteudo de agenda compreensivel. |
| rota inexistente | Passou com ressalva operacional | UI 404 compreensivel com `h1` e CTA `Voltar para inicio`, mas o HTTP publico continuou retornando `200`. |

## 4. Criterios assistivos

| Criterio | Resultado | Observacao |
| --- | --- | --- |
| Ordem de leitura logica | Passou | A ordem observada por headings, landmarks e foco segue marca, navegacao, conteudo principal, controles e rodape. |
| Foco navegavel por teclado | Passou | Sequencias por `Tab` chegaram aos links, botoes, campos, abas, cards e CTAs principais nas rotas testadas. |
| Labels/nomes acessiveis de CTAs principais | Passou | CTAs como `Consultar acervo`, `Explorar`, `Buscar`, `Ver detalhes`, `Voltar ao catalogo`, `Simular renovacao...` e `Voltar para inicio` ficaram nomeados. |
| Feltrim Agents/perguntas guiadas | Passou | Perguntas como `Literatura brasileira`, `Machado de Assis`, `Eventos de leitura`, `Preferencias` e `Reserva e renovacao` sao focaveis e compreensiveis. |
| Disponibilidade mockada verbalmente clara | Passou | Catalogo e detalhe usam textos como `Disponibilidade mockada`, `Disponibilidade demonstrativa do prototipo` e `Contagem demonstrativa/mockada`. |
| Feedback Sofia/Claudia com privacidade | Passou | O bloco informa GitHub Issues, roteiro local e orienta nao enviar dados pessoais sensiveis, tokens, documentos, enderecos completos ou prints privados. |
| Jornada do leitor | Passou | A pagina de perfil comunica perfil demonstrativo, dados locais/mockados e progresso pessoal sem prometer ranking publico ou persistencia real. |
| Rota 404 compreensivel | Passou com ressalva | A mensagem visual/textual e compreensivel, mas a semantica HTTP segue `200`. |

## 5. Evidencias auxiliares coletadas

- Browser: Microsoft Edge via Playwright CLI.
- Rotas publicas abriram com status `200`, inclusive a rota inexistente.
- `/home-mobile`: ao acionar `Eventos de leitura`, a resposta guiada informou fonte/limite, agenda local mockada e necessidade de confirmar dados oficiais.
- `/home-mobile`: busca por `Sapiens` retornou status `Busca aplicada: 1 resultado no catalogo local. Abra um item para ver disponibilidade.`
- `/perfil`: `Simular renovacao` retornou `Renovacao demonstrativa simulada para O Cortico. Nenhuma operacao oficial foi enviada a biblioteca.`
- A coleta de foco por `Tab` confirmou navegacao pelos elementos principais das rotas solicitadas.

## 6. Achados por severidade

### Bloqueantes

Nenhum bloqueante para apresentacao publica controlada como prototipo academico demonstrativo.

### Ressalvas nao bloqueantes

1. **Nao houve execucao auditiva de NVDA/Narrator/VoiceOver.** A validacao de Sofia fecha a pendencia de pessoa leitora de tela real por decisao do Rafael, mas nao deve ser convertida em afirmacao de compatibilidade especifica com esses leitores.
2. **Rota inexistente retorna `HTTP 200`.** A experiencia de leitura da UI 404 passou, mas a semantica HTTP real continua pendente se o criterio operacional exigir `404`.
3. **Contraste formal ainda tem ressalvas anteriores.** A frente de leitor de tela passou, mas a declaracao de conformidade visual/WCAG completa ainda depende das ressalvas de contraste ja documentadas.

## 7. Decisao

**Aprovado com ressalvas.**

Sofia aprova a experiencia de leitura de tela real para apresentacao publica controlada do SIBiSC/Feltrim Agents como prototipo academico demonstrativo.

Impacto no Go/No-Go de acessibilidade:

- A pendencia "leitor de tela real por pessoa validadora" deixa de bloquear o GO controlado do prototipo.
- Permanece **NO-GO para declarar produto operacional, conformidade WCAG completa ou compatibilidade auditada com NVDA/Narrator/VoiceOver**, porque esses escopos exigem validacoes adicionais que nao foram executadas nesta rodada.
