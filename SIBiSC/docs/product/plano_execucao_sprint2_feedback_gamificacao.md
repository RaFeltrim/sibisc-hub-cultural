# Plano de Execucao Sprint 2 - Feedback e Gamificacao Leve

Data: 2026-05-19  
Projeto: SIBiSC/Feltrim Agents  
Branch: `feature/sibisc-feedback-gamification-sprint2`  
Base: Sprint 0 e Sprint 1 promovidas, QA Gate/Vercel/Netlify verdes no PR #56.

## 1. Objetivo

Entregar um incremento pequeno, seguro e testavel para operacionalizar o feedback Sofia/Claudia no app e apresentar uma gamificacao leve do perfil do leitor, sem ranking competitivo, exposicao publica, backend real ou persistencia real.

## 2. Escopo entregue

- Home desktop e Home mobile exibem CTA discreto para GitHub Issues usando o template `feedback_sofia_claudia.md`.
- O texto do app explica que Sofia classifica impacto percebido e Claudia organiza rota, passos, evidencias, status e SLA para QA reproduzir.
- O CTA orienta a nao enviar dados pessoais sensiveis, tokens, documentos, enderecos completos ou prints privados.
- Perfil exibe a secao "Jornada do leitor" com trilhas culturais, selos demonstrativos e metas individuais.
- A jornada usa apenas mocks locais de perfil, historico, emprestimos, favoritos e catalogo canonico `b1..b8`.
- O `qa:repo` valida canal de feedback, aviso de privacidade, ausencia de ranking publico e estrutura minima da jornada.

## 3. Fora de escopo

- Chat aberto, IA generativa, backend real, analytics real ou persistencia real.
- Ranking publico, pontuacao competitiva, comparacao entre leitores ou exposicao de conquistas.
- Coleta de dados pessoais pelo app.
- Reserva real, renovacao oficial ou disponibilidade oficial em tempo real.

## 4. Criterios de aceite

- Usuario encontra caminho claro para enviar feedback por GitHub Issues.
- O canal de feedback informa template, rota, passos, esperado, observado, severidade, status e criterio de fechamento.
- Sofia/Claudia aparecem como papeis operacionais, sem prometer automacao real.
- Feedback nao solicita dado pessoal sensivel.
- Perfil mostra progresso pessoal, trilhas, selos e metas como prototipo demonstrativo.
- Toda gamificacao deriva de IDs validos do catalogo local e declara `publicRanking: false`.
- `ReadLints`, `npm run qa:repo`, `npm run qa:ci` e smoke dos fluxos afetados passam ou registram ressalva.

## 5. QA + Dev pairing

Historias cobertas:

| Historia | Resultado esperado | Gate |
| --- | --- | --- |
| S2-01 Feedback Sofia/Claudia visivel no app | CTA em Home desktop/mobile abre GitHub Issues com template | QA validado com Dev |
| S2-02 Privacidade do feedback | UI avisa para nao enviar dados pessoais sensiveis | QA validado com Dev |
| S2-03 Jornada do leitor no Perfil | Trilhas, selos e metas aparecem sem ranking publico | QA validado com Dev |
| S2-04 Guard de contrato | `qa:repo` cobre feedback e gamificacao leve | QA validado com Dev |

## 6. Riscos e mitigacoes

- GitHub Issues e canal externo: mitigado com CTA claro, `target="_blank"` e `rel="noopener noreferrer"`.
- Usuario interpretar gamificacao como dado real: mitigado por texto de prototipo local e sem persistencia.
- Competicao indevida: mitigada por ausencia de ranking, ausencia de pontos publicos e validação `publicRanking: false`.
- Feedback conter dado sensivel por engano: mitigado por aviso na UI e no template.

## 7. Evidencias

As evidencias de validacao estao em `docs/qa/sprint2_evidencias_validacao.md`.
