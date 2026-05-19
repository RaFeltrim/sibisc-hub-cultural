# Release Go/No-Go - Sprint 3 SIBiSC/Feltrim Agents

Data: 2026-05-19  
Branch avaliada: `release/sibisc-hardening-sprint3`  
Destino previsto: PR #59 contra `main`  
Documento de evidencia: `docs/qa/sprint3_hardening_release.md`

## Decisao

**GO tecnico para merge controlado do PR #59 quando o PR estiver `MERGEABLE/CLEAN` e os checks remotos principais estiverem verdes.**  
**Leitor de tela real permanece como pendencia operacional recomendada para a release final irrestrita, nao como bloqueador tecnico absoluto do merge neste ambiente.**

Atualizacao de 2026-05-19: a branch foi atualizada com `origin/main` apos o merge do PR #61, sem conflitos. As correcoes visuais do PR #61 e as configuracoes de deploy do PR #60 foram incorporadas ao PR #59, e o hardening local foi revalidado com `ReadLints`, `npm run qa:repo`, `npm run qa:ci` e smoke Playwright/Edge nas rotas principais.

## Criterios de release

| Criterio | Status | Evidencia |
| --- | --- | --- |
| Branch separada e atualizada com `origin/main` | Aprovado | `release/sibisc-hardening-sprint3`, merge de `origin/main` apos PR #61 |
| Nenhum P0/P1 conhecido aberto | Aprovado localmente | Regressao e Lighthouse sem bloqueador funcional |
| `npm run qa:repo` | Aprovado | Guard passou |
| `npm run qa:ci` | Aprovado | Guard + build Vite passaram |
| Smoke Edge nas rotas principais | Aprovado | Screenshots Sprint 3 em `docs/qa/` |
| Lighthouse acessibilidade | Aprovado | 100/100 em Home, Home mobile, Catalogo, Detalhe, Perfil e Eventos |
| Console sem erro critico | Aprovado localmente | Lighthouse `errors-in-console`: sem erros |
| GitHub Actions Node 20 warning | Recomendacao documentada | Atualizacao segura identificada para `checkout@v5`, `setup-node@v5`, `upload-artifact@v6`, mas nao aplicada porque o token atual nao tem escopo `workflow` |
| Leitor de tela real | Recomendacao operacional pos-release | Roteiro manual definido em `docs/qa/sprint3_hardening_release.md`; recomendado antes de aprovacao final irrestrita |
| Checks remotos do PR | Gate tecnico obrigatorio | Confirmar QA Gate, Vercel e preview Netlify antes do merge |
| Netlify preview | Gate remoto observado | Tratar Header/Pages `NEUTRAL` como skip operacional do provider; Redirect e deploy preview devem permanecer verdes |

## Escopo aceito

- O SIBiSC segue como prototipo academico avancado com dados locais.
- Feltrim Agents segue como assistente guiado, sem promessa de IA generativa real.
- Disponibilidade segue mockada/local, sem catalogo oficial em tempo real.
- Nao ha reserva real.
- Feedback Sofia/Claudia segue por GitHub Issues.
- Gamificacao segue demonstrativa, individual, sem ranking publico e sem persistencia real.

## Riscos aceitos para review

- Performance Lighthouse local ficou como baseline, nao como gate numerico bloqueante.
- Best Practices local foi impactado por auditoria em HTTP no `127.0.0.1`; preview final deve ser validado em HTTPS.
- Netlify deve permanecer verde no deploy preview; checks Header/Pages `NEUTRAL` indicam regras sem alteracao aplicavel e nao bloqueiam por si so.
- Leitor de tela real ainda nao foi executado por limitacao operacional do ambiente, mas fica recomendado como validacao humana pos-merge/pre-release publica.
- O aviso de Node 20 em GitHub Actions ainda depende de alteracao futura por alguem com permissao `workflow`.

## Recomendacao final

Antes do merge em `main`, confirmar:

1. QA Gate remoto verde.
2. Review humano das correcoes e evidencias.
3. Providers de preview sem falhas obrigatorias.

Com esses itens atendidos, a release fica **GO tecnico para merge do PR #59**. A validacao NVDA/VoiceOver/manual segue como pendencia operacional recomendada para aprovacao final irrestrita da release publica.
