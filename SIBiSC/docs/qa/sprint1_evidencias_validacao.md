# Evidencias de Validacao - Sprint 1 SIBiSC/Feltrim Agents

Data: 2026-05-19  
Branch: `feature/sibisc-guided-assistant-sprint1`  
Escopo inicial: P0/P1 essenciais do assistente guiado.

## 1. Resumo QA + Dev

Status inicial: validacao automatizada aprovada e smoke Playwright aprovado nos fluxos principais do assistente guiado.

Incrementos cobertos:

- Painel de assistente guiado com 9 perguntas fechadas, sem chat aberto.
- Respostas com motivo, fonte/limite e proxima acao.
- Comunicacao explicita de dados locais do prototipo, disponibilidade mockada e ausencia de reserva real.
- Fallback honesto para pergunta fora do escopo.
- Preferencias tratadas como demonstrativas; edicao simples fica fora deste incremento.
- Template de GitHub Issue para feedback Sofia/Claudia.
- Guard de repositorio reforcado para validar perguntas guiadas e IDs canonicos.

## 2. Matriz QA dos 10 cenarios

| Caso | Issue | Passos | Esperado | Status inicial |
| --- | --- | --- | --- | --- |
| 1. Entender assistente em ate 1 minuto | #47 | Abrir `/` e ler hero/painel | Usuario entende assistente guiado, dados locais e limites | Aprovado no smoke |
| 2. Selecionar pergunta de literatura | #46 #47 #48 | Em `/`, acionar "Literatura brasileira" | Resposta mostra `b7`/`b3`, motivo, fonte/limite e proxima acao | Aprovado por guard e smoke do painel |
| 3. Selecionar pergunta por autor | #46 #48 | Acionar "Machado de Assis" | Resposta aponta `b3`/`b1`, sem IDs inexistentes | Aprovado por guard |
| 4. Tema cidade e sociedade | #46 #48 | Acionar "Cidade e sociedade" | Resposta aponta `b2`/`b5` com motivo especifico | Aprovado no smoke |
| 5. Disponibilidade mockada | #49 | Acionar "Disponibilidade" | Texto declara dados locais, disponibilidade nao oficial e sem reserva real | Aprovado no smoke |
| 6. Eventos e noticias | #46 #48 | Acionar "Eventos de leitura" e "Noticias e servicos" | Referencias possuem motivo, fonte/limite e links validos | Aprovado por guard |
| 7. Preferencias demonstrativas | #54 | Acionar "Preferencias" e abrir `/perfil` | UI declara preferencias demonstrativas e sem persistencia real | Aprovado no smoke de Perfil |
| 8. Fallback honesto | #50 | Acionar "Fora do escopo" | Resposta nao inventa IA, backend, SIBI/PHL, horario, reserva ou fonte oficial | Aprovado no smoke |
| 9. Mobile e touch | #47 #52 | Abrir `/home-mobile`, acionar perguntas | Painel permanece responsivo, sem scroll horizontal e com area touch adequada | Aprovado no smoke mobile 375x812 |
| 10. Teclado, foco e aria-live | #47 #52 | Navegar por Tab/Enter nas perguntas | Foco visivel, botoes com `aria-pressed`, resposta em regiao `aria-live` | Aprovado por estrutura e smoke automatizado; leitor de tela real pendente |

## 3. Comandos planejados

Executar a partir de `Web_Mobile/SIBiSC`:

| Comando/validacao | Resultado obtido |
| --- | --- |
| `ReadLints` nos arquivos editados | Aprovado, sem erros reportados |
| `npm run qa:repo` | Aprovado; guard validou estrutura, docs, rotas, IDs canonicos e perguntas guiadas |
| `npm run qa:ci` | Aprovado; `qa:repo` + `vite build`, 83 modulos transformados |
| Smoke Home/Feltrim Agents, Catalogo, Detalhe e Perfil | Aprovado via Playwright CLI em `http://127.0.0.1:5177/` |
| Smoke `/home-mobile` | Aprovado via Playwright CLI, viewport 375x812, sem overflow horizontal detectado |

Observacao: uma primeira tentativa de smoke com `node -e` falhou por quoting do PowerShell antes de abrir o app. A validacao foi reexecutada com `playwright-cli open` + `playwright-cli run-code --filename` e passou.

## 4. Evidencia por issue

- #46: `docs/product/matriz_perguntas_guiadas_sprint1.md` e `src/services/guidedAssistantService.js`.
- #47: painel de perguntas em `HomePage.jsx` e `HomePageMobile.jsx`.
- #48: cards de resposta/recomendacao exibem motivo, fonte/limite e proxima acao.
- #49: texto base e respostas comunicam disponibilidade mockada e ausencia de reserva real.
- #50: pergunta `fora-do-escopo` implementa fallback honesto.
- #51: `.github/ISSUE_TEMPLATE/feedback_sofia_claudia.md`.
- #52: matriz QA dos 10 cenarios neste documento.
- #53: `scripts/qa-guard.mjs` valida perguntas guiadas e contrato de IDs.
- #54: preferencias documentadas e comunicadas como demonstrativas.

## 5. Pendencias ate o fechamento

- Teste com leitor de tela real ainda recomendado antes de release.
- Anexar prints ou video curto se o time exigir evidencia visual para review.
