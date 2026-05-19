# Evidencias de Validacao - Sprint 2 SIBiSC/Feltrim Agents

Data: 2026-05-19  
Branch: `feature/sibisc-feedback-gamification-sprint2`  
Escopo: feedback Sofia/Claudia operacionalizado via GitHub Issues e gamificacao leve demonstrativa no Perfil.

## 1. Resumo QA + Dev

Status: validacao automatizada aprovada e smoke Playwright por screenshots aprovado nas rotas afetadas.

Incrementos cobertos:

- CTA de feedback em Home desktop e Home mobile apontando para GitHub Issues com template Sofia/Claudia.
- Aviso para nao enviar dados pessoais sensiveis, tokens, documentos, enderecos completos ou prints privados.
- Jornada do leitor no Perfil com trilhas culturais, selos demonstrativos e metas individuais.
- Jornada calculada por `getReaderJourney()` a partir de mocks locais e IDs canonicos do catalogo.
- Guard de repositorio validando feedback, privacidade, `publicRanking: false`, estrutura de trilhas, selos e metas.

## 2. Matriz QA dos cenarios da Sprint 2

| Caso | Passos | Esperado | Status |
| --- | --- | --- | --- |
| 1. CTA de feedback na Home | Abrir `/`, localizar "Feedback operacional" | Usuario entende canal Sofia/Claudia e ve link para GitHub Issues | Aprovado por smoke Playwright |
| 2. Link seguro de feedback | Inspecionar link/acionar CTA | URL abre GitHub Issues com `feedback_sofia_claudia.md`, nova aba e `noopener noreferrer` | Aprovado por `qa:repo` e review do diff |
| 3. Privacidade do feedback | Ler aviso do CTA | UI orienta nao enviar dados pessoais sensiveis, tokens ou prints privados | Aprovado por `qa:repo` e smoke |
| 4. CTA no mobile | Abrir `/home-mobile` em viewport 375x812 | Card de feedback aparece em mobile | Aprovado por smoke Playwright |
| 5. Perfil com jornada | Abrir `/perfil` | Secao "Jornada do leitor" aparece antes das abas do perfil | Aprovado por smoke Playwright |
| 6. Trilhas culturais | Conferir trilhas no Perfil | Trilhas exibem progresso pessoal com `progressbar` acessivel | Aprovado por build e review do diff |
| 7. Selos demonstrativos | Conferir selos no Perfil | Selos indicam "Liberado" ou "Em progresso", sem ranking publico | Aprovado por `qa:repo` |
| 8. Metas individuais | Conferir metas no Perfil | Metas sao individuais, privadas e baseadas em mocks locais | Aprovado por `qa:repo` |
| 9. Regressao Feltrim Agents | Usar pergunta guiada na Home | Assistente segue explicavel, com dados locais e sem prometer IA/backend real | Aprovado por `qa:ci` e smoke Home |
| 10. Regressao Perfil | Abrir Perfil com jornada e abas existentes | Perfil renderiza jornada e mantem estrutura de tabs | Aprovado por build e smoke Perfil |

## 3. Comandos e validacoes

Executar a partir de `Web_Mobile/SIBiSC`:

| Validacao | Resultado |
| --- | --- |
| `ReadLints` nos arquivos editados | Aprovado, sem erros reportados |
| `npm run qa:repo` | Aprovado; guard validou feedback, privacidade, rotas, IDs canonicos e gamificacao leve |
| `npm run qa:ci` | Aprovado; `qa:repo` + `vite build`, 84 modulos transformados |
| Smoke Playwright `/` | Aprovado via `npx playwright screenshot --channel=msedge --wait-for-selector "text=Feedback operacional"` |
| Smoke Playwright `/perfil` | Aprovado via `npx playwright screenshot --channel=msedge --wait-for-selector "text=Jornada do leitor"` |
| Smoke Playwright `/home-mobile` | Aprovado via `npx playwright screenshot --channel=msedge --viewport-size=375,812 --wait-for-selector "text=Feedback Sofia/Claudia"` |

Observacao: a primeira tentativa com Chromium padrao falhou porque o browser gerenciado do Playwright nao estava instalado. A validacao foi reexecutada com o canal local `msedge` e passou.

## 4. Evidencia por arquivo

- `src/services/feedbackService.js`: URL oficial do template Sofia/Claudia, aviso de privacidade e fluxo operacional.
- `src/pages/HomePage.jsx`: CTA desktop para feedback via GitHub Issues.
- `src/pages/HomePageMobile.jsx`: CTA mobile para feedback via GitHub Issues.
- `src/services/userProfileService.js`: `getReaderJourney()` com trilhas, selos, metas e `publicRanking: false`.
- `src/pages/UserProfilePage.jsx`: renderizacao acessivel da jornada do leitor e barras de progresso.
- `scripts/qa-guard.mjs`: validacoes automatizadas de feedback e gamificacao leve.
- `docs/qa/sprint2-smoke-home.png`: evidencia visual da Home com CTA de feedback.
- `docs/qa/sprint2-smoke-perfil.png`: evidencia visual do Perfil com jornada do leitor.
- `docs/qa/sprint2-smoke-home-mobile.png`: evidencia visual de `/home-mobile` com CTA de feedback.

## 5. Pendencias ate fechamento

- PR #57 aberto contra `dev` e revisado por QA/TL/SE.
- Reforco P3 aplicado no template Sofia/Claudia para evitar prints privados e dados sensiveis.
- `qa-guard` atualizado para validar existencia e conteudo minimo do template Sofia/Claudia.
- Validacao com leitor de tela real continua recomendada antes da release final.
