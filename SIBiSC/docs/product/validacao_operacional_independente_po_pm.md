# Validação operacional independente - SIBiSC/Feltrim Agents

Data: 19/05/2026  
Papel da avaliação: PO + PM sênior  
Site validado: [SIBiSC/Feltrim Agents](https://sibisc-hub-cultural.vercel.app)  
Escopo: valor percebido, clareza, aderência ao escopo, apresentação pública e experiência mobile.

## Declaração de independência

Esta validação foi executada diretamente no site público, sem consulta a relatórios ou conclusões de validações anteriores. Não houve alteração de código do produto.

## Veredito

**Aprovado com ressalvas.**

O produto está operacionalmente apresentável para demonstração pública: o usuário entende a proposta do SIBiSC, identifica o Feltrim Agents como protótipo guiado, encontra recomendações explicáveis, percebe a disponibilidade como mockada e consegue navegar por notícias, eventos, catálogo, perfil e feedback. As ressalvas são de polimento de comunicação pública, não de bloqueio de aceite.

## Evidências de navegação

Rotas e fluxos percorridos:

- Página inicial: proposta do SIBiSC, apresentação do Feltrim Agents, perguntas guiadas, recomendações e feedback operacional.
- Catálogo: busca, listagem de obras, disponibilidade demonstrativa e aviso de confirmação com a biblioteca.
- Detalhe de livro: disponibilidade por unidade, priorização por bairro, chamada/estante e aviso de que não há reserva, retirada ou renovação oficial.
- Notícias: listagem editorial, filtros por categoria e acesso a detalhes.
- Eventos: agenda por data, público, local, vagas/entrada e links de detalhe.
- Perfil: dados demonstrativos, preferências, empréstimos, favoritos, histórico e jornada do leitor.
- Mobile: inspeção em viewport 390 x 844 nas páginas inicial e catálogo.

## Aceite por cenário

**Usuário entende o que é SIBiSC: aprovado.**  
A marca aparece como rede municipal de bibliotecas de São Carlos, com foco em horários, agenda, acervo, notícias, eventos e catálogo. O rodapé reforça unidades, endereços, horários e contatos.

**Usuário entende o Feltrim Agents como assistente guiado/protótipo: aprovado.**  
A home apresenta o Feltrim Agents como "assistente guiado" e "protótipo", deixando claro que as respostas usam dados locais de catálogo, eventos, notícias e perfil. O fallback também limita o escopo ao afirmar que não há chat aberto, IA generativa, catálogo oficial em tempo real ou integração com atendimento.

**Usuário encontra recomendação e entende motivo/fonte/próxima ação: aprovado.**  
As recomendações exibem obra sugerida, motivo ligado às preferências demonstrativas, fonte/limite e próxima ação. O link para detalhe de catálogo torna o caminho operacional claro.

**Usuário entende disponibilidade mockada e ausência de reserva real: aprovado.**  
O catálogo e o detalhe de livro repetem que a disponibilidade é demonstrativa e deve ser confirmada com a biblioteca. O fluxo "Reserva e renovação" explicita que o assistente não executa reserva, pré-reserva, renovação oficial ou contato com sistemas externos.

**Usuário encontra eventos/notícias/catálogo/perfil: aprovado.**  
As rotas estão presentes na navegação desktop e na navegação mobile. O conteúdo de cada área é encontrável sem depender de login.

**Usuário entende jornada do leitor como pessoal/demonstrativa: aprovado.**  
O perfil abre com aviso de que nome, e-mail, preferências, histórico, favoritos, empréstimos e notificações são mocks locais. A jornada do leitor também informa que não há ranking público, pontuação competitiva ou persistência real.

**Usuário encontra feedback operacional e entende privacidade: aprovado com ressalva leve.**  
O bloco de feedback oferece GitHub Issues com template e alternativa local sem login. A orientação de privacidade é clara ao pedir que não sejam enviados dados pessoais sensíveis, tokens, documentos, endereços completos ou prints com informações privadas. A ressalva é que o texto usa nomes/personas internas no título do bloco, o que pode exigir contextualização para público externo.

**Experiência mobile é apresentável: aprovado com ressalva leve.**  
Em viewport 390 x 844, a hierarquia principal continua legível, a navegação inferior aparece com Início, Notícias, Eventos, Catálogo e Perfil, e o catálogo permanece utilizável. A ressalva é que a página inicial é longa e densa; para apresentação pública mobile, a experiência se beneficiaria de microcopy mais enxuta ou melhor priorização visual nas primeiras dobras.

## Ressalvas e recomendações

1. **Polir linguagem para público externo.** Alguns trechos ainda parecem orientados ao time/protótipo interno. Recomenda-se explicar nomes/personas internas quando aparecerem ou substituir por uma chamada mais universal, como "Ajude a melhorar o protótipo".

2. **Revisar acentuação e consistência textual.** Há ocorrências sem acentos em textos de interface, como "nao", "catalogo", "renovacao", "prototipo" e similares. Para apresentação pública em português, isso reduz percepção de acabamento.

3. **Reduzir densidade mobile na primeira experiência.** A versão mobile é funcional e navegável, mas concentra muito conteúdo antes das seções editoriais. Para demonstração, vale priorizar: proposta, recomendação explicável, limite de reserva e CTA de catálogo.

4. **Manter avisos de limite sempre próximos das ações.** A comunicação atual já é forte. Em futuras evoluções, qualquer novo CTA de reserva, renovação ou atendimento deve repetir o limite operacional junto da ação para evitar expectativa de serviço real.

## Conclusão PO/PM

O site cumpre o objetivo de demonstrar valor público do SIBiSC e do Feltrim Agents sem prometer capacidades inexistentes. A experiência é clara o suficiente para aceite operacional como protótipo público/demonstrativo, desde que as ressalvas de acabamento textual e enquadramento de comunicação sejam tratadas como melhorias de apresentação.
