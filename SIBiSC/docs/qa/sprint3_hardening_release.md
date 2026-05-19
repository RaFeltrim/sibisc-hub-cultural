# Sprint 3 - Hardening, acessibilidade, regressao e release

Data: 2026-05-19  
Branch: `release/sibisc-hardening-sprint3`  
Base: `origin/main`  
Escopo: hardening final do SIBiSC/Feltrim Agents antes de PR de release contra `main`.

## 1. Resumo executivo

Status tecnico: **GO condicional para PR e review de release**.

A Sprint 3 executou revisao de acessibilidade, regressao automatizada, smoke Playwright/Edge, Lighthouse local nas rotas principais, avaliacao do aviso de GitHub Actions em Node 20 e documentacao de Go/No-Go. Foram corrigidos problemas reais P2 de acessibilidade encontrados pelo Lighthouse e aplicado hardening pequeno de `prefers-reduced-motion`.

Atualizacao apos PR #61: a branch `release/sibisc-hardening-sprint3` foi atualizada com `origin/main` depois do merge das correcoes visuais em `main`. O merge nao teve conflitos; os arquivos compartilhados de Home/Home mobile/estilos mantiveram as correcoes visuais do PR #61 junto com o hardening deste PR.

Nao foi feito merge final neste momento do registro original. A validacao com leitor de tela real permanece como pendencia operacional recomendada antes da aprovacao final irrestrita da release publica, mas nao como bloqueador tecnico absoluto do merge quando os demais gates reais estiverem verdes.

## 2. Correcoes aplicadas

| Area | Arquivo | Correcao |
| --- | --- | --- |
| Acessibilidade | `src/pages/HomePage.jsx` | Removido `role="list"` de um grupo de botoes guiados, pois Lighthouse indicou filhos sem `role="listitem"`. |
| Acessibilidade | `src/pages/HomePage.jsx` | Ajustado o nome acessivel do link de feedback para incluir o texto visivel "Enviar feedback via GitHub Issues". |
| Acessibilidade | `src/pages/HomePageMobile.jsx` | Ajustado o nome acessivel do link de feedback para incluir o texto visivel "Enviar feedback". |
| Acessibilidade | `src/pages/UserProfilePage.jsx` | Avatar visual do Perfil recebeu `role="img"` com nome acessivel explicito. |
| Movimento reduzido | `src/styles/globals.css` | Adicionado hardening global para `prefers-reduced-motion: reduce`, desativando scroll suave, animacoes e transicoes. |
| CI/GitHub Actions | `.github/workflows/qa-gate.yml` | Workflow inspecionado. A atualizacao para actions com runtime Node 24 foi considerada segura, mas ficou como recomendacao documentada porque o token atual nao tem escopo `workflow` para publicar alteracao em `.github/workflows`. |

## 3. Acessibilidade

### Revisao estrutural

Telas revisadas: Home, Home mobile, Catalogo, Detalhe de livro, Perfil e Eventos.

Pontos verificados:

- Campos de busca possuem `label` visivel e status com `role="status"`/`aria-live`.
- Botoes de perguntas guiadas usam `aria-pressed` e atualizam resposta com `aria-live`.
- Filtros e pills de bairro usam `aria-pressed`.
- Perfil usa `tablist`, `tab`, `tabpanel`, `aria-selected` e `aria-controls`.
- Barras da jornada do leitor usam `role="progressbar"` com valores min/max/now.
- Feedback e acoes externas usam nomes acessiveis coerentes e `noopener noreferrer`.
- Foco visivel global esta definido para links, botoes e inputs.
- `prefers-reduced-motion` agora cobre animacoes/transicoes globalmente.

### Achados corrigidos

Lighthouse apontou:

- `aria-required-children` na Home por uso de `role="list"` em container de botoes sem filhos `listitem`.
- `label-content-name-mismatch` nos links de feedback da Home e Home mobile porque o `aria-label` nao continha o texto visivel.

Ambos foram corrigidos e revalidados. Resultado final de acessibilidade Lighthouse: **100/100 em todas as rotas auditadas**.

### Leitor de tela real

Nao foi tecnicamente possivel executar NVDA/VoiceOver com usuario real neste ambiente de automacao. A pendencia permanece operacional e recomendada para a aprovacao final irrestrita, nao para bloquear tecnicamente o merge do PR se checks, previews e revisao estiverem verdes.

Roteiro manual recomendado:

1. Abrir a preview da branch em Windows com NVDA e navegador Edge.
2. Navegar por teclado em `/`, `/home-mobile`, `/catalogo`, `/catalogo/b1`, `/perfil` e `/eventos`.
3. Confirmar que o leitor anuncia titulo da pagina/secao, links principais, campo de busca, botoes guiados e estado selecionado.
4. Na Home, alternar perguntas guiadas e confirmar anuncio da nova resposta pelo live region.
5. No Catalogo, buscar por `vidas` e confirmar anuncio do status da busca.
6. No Detalhe, navegar pelas unidades e confirmar disponibilidade por unidade.
7. No Perfil, alternar abas Emprestimos/Historico/Favoritos e confirmar relacao tab/painel.
8. No Perfil, acionar Renovar e Remover favorito, confirmando mensagem `role="status"`.
9. No Eventos, abrir detalhe e acionar Google Calendar, confirmando aviso de nova aba.
10. Repetir fluxo principal em mobile ou emulacao estreita, validando BottomNav e ausencia de armadilha de foco.

Critério de aceite do teste real: nenhuma armadilha de foco, nenhum controle sem nome acessivel, estados selecionados compreensiveis e fluxos principais concluiveis sem mouse.

## 4. Regressao e smokes

Comandos executados em `Web_Mobile/SIBiSC`:

| Validacao | Resultado |
| --- | --- |
| `ReadLints` nos arquivos alterados | Aprovado, sem erros reportados |
| `npm run qa:repo` | Aprovado |
| `npm run qa:ci` | Aprovado; `qa:repo` + `vite build`, 84 modulos transformados |
| Preview local | Aprovado em `http://127.0.0.1:4174/` via `npm run preview -- --host 127.0.0.1 --port 4174` |
| Playwright CLI + Edge | Aprovado nas rotas principais com screenshots |
| Console critico | Lighthouse `errors-in-console`: sem erros nas rotas auditadas |
| Revalidacao pos-PR #61 | Aprovado localmente; `ReadLints`, `npm run qa:repo`, `npm run qa:ci` e smoke Edge reexecutados apos merge de `origin/main` |

Screenshots gerados:

- `docs/qa/sprint3-smoke-home.png`
- `docs/qa/sprint3-smoke-home-mobile.png`
- `docs/qa/sprint3-smoke-catalogo.png`
- `docs/qa/sprint3-smoke-detalhe.png`
- `docs/qa/sprint3-smoke-perfil.png`
- `docs/qa/sprint3-smoke-eventos.png`

Rotas cobertas pelo smoke Edge:

- `/`
- `/home-mobile`
- `/catalogo`
- `/catalogo/b1`
- `/perfil`
- `/eventos`
- `/eventos/e1` na revalidacao pos-PR #61

Observacao: a tentativa de usar `@playwright/test` para capturar console diretamente nao foi mantida porque o pacote nao e dependencia do projeto. Para evitar introduzir dependencia nova no hardening final, a validacao de console ficou coberta pelo Lighthouse local e os smokes visuais pelo Playwright CLI com `--channel=msedge`.

## 5. Lighthouse

Ferramenta: `npx lighthouse` 13.3.0 com Edge via `CHROME_PATH` e flags `--headless=new --no-sandbox`.  
Categorias auditadas: Performance, Accessibility e Best Practices.  
Ambiente: preview local HTTP, build Vite de producao.

Relatorios JSON gerados:

- `docs/qa/sprint3-lighthouse-home.json`
- `docs/qa/sprint3-lighthouse-catalogo.json`
- `docs/qa/sprint3-lighthouse-detalhe.json`
- `docs/qa/sprint3-lighthouse-perfil.json`
- `docs/qa/sprint3-lighthouse-eventos.json`
- `docs/qa/sprint3-lighthouse-home-mobile.json`

| Rota | Performance | Acessibilidade | Best Practices | Console | Contraste |
| --- | ---: | ---: | ---: | --- | --- |
| `/` | 57 | 100 | 81 | Sem erros | OK |
| `/catalogo` | 81 | 100 | 81 | Sem erros | OK |
| `/catalogo/b1` | 58 | 100 | 81 | Sem erros | OK |
| `/perfil` | 74 | 100 | 81 | Sem erros | OK |
| `/eventos` | 59 | 100 | 81 | Sem erros | OK |
| `/home-mobile` | 74 | 100 | 81 | Sem erros | OK |

Leitura dos resultados:

- Acessibilidade final ficou 100/100 nas rotas auditadas apos as correcoes P2.
- Best Practices ficou 81 principalmente por auditoria local em HTTP, esperado para `127.0.0.1` e nao bloqueante para preview HTTPS/Vercel.
- Performance registrou baseline mobile local entre 57 e 81. Os principais fatores residuais sao render-blocking de fontes/recursos, JavaScript nao minificado segundo heuristica do Lighthouse local e CLS em rotas com conteudo visual carregando. Nao foi feito refactor de performance nesta Sprint 3 para preservar escopo e evitar risco de regressao.
- Nao foram encontrados erros criticos de console nas rotas auditadas.

## 6. GitHub Actions Node 20 warning

Workflow revisado: `.github/workflows/qa-gate.yml`.

Recomendacao segura identificada:

- `actions/checkout@v4` -> `actions/checkout@v5`
- `actions/setup-node@v4` -> `actions/setup-node@v5`
- `actions/upload-artifact@v4` -> `actions/upload-artifact@v6`

Justificativa: as versoes novas das actions oficiais migram para runtime Node 24 e reduzem o risco do aviso de futura depreciacao de actions em Node 20.

Decisao desta branch: **nao alterar o workflow no PR publicavel**. Uma tentativa inicial de publicar a branch com essa mudanca foi rejeitada pelo GitHub porque o token atual nao possui escopo `workflow`. Para nao bloquear a Sprint 3, a alteracao ficou como recomendacao operacional e deve ser aplicada por Rafael ou por um token com permissao adequada.

Risco residual: enquanto o workflow permanecer em `@v4`, o aviso de deprecacao Node 20 pode continuar aparecendo. A futura atualizacao tambem deve confirmar runner GitHub Actions moderno.

## 7. Go/No-Go

### GO para PR de release

Justificativa:

- Branch separada criada a partir de `origin/main`.
- `ReadLints`, `npm run qa:repo` e `npm run qa:ci` passaram.
- Smokes Playwright/Edge passaram nas rotas principais.
- Lighthouse final ficou com acessibilidade 100/100 nas rotas auditadas.
- Sem erros criticos de console reportados pelo Lighthouse.
- Correcoes foram pequenas, localizadas e coerentes com hardening.
- Workflow foi inspecionado e a atualizacao para actions oficiais novas ficou documentada como recomendacao por limite de permissao `workflow`.

### Condicoes para merge final controlado

Conferencias antes do merge:

- PR `MERGEABLE/CLEAN` contra `main`.
- QA Gate remoto verde.
- Vercel e deploy preview Netlify sem falha obrigatoria.
- Review humano/confirmacao final, conforme regra operacional.
- Teste com leitor de tela real recomendado para a release final irrestrita.
- O aviso de Node 20 em GitHub Actions ainda precisa ser tratado por alguem com permissao `workflow`.

## 8. Pendencias finais reais

- Executar roteiro com NVDA/VoiceOver/leitor real e registrar evidencia humana antes da aprovacao final irrestrita.
- Confirmar checks remotos do PR antes do merge, especialmente QA Gate no workflow atual.
- Confirmar Netlify deploy preview verde; Header/Pages `NEUTRAL` podem ser tratados como skip operacional do provider quando Redirect/deploy preview passam.
- Tratar performance/CLS como backlog pos-release se a disciplina exigir meta numerica de Lighthouse Performance acima do baseline atual.
- Fazer review final do PR antes de qualquer merge em `main`.
