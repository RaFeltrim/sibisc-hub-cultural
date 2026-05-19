# Release Go/No-Go - Sprint 3 SIBiSC/Feltrim Agents

Data: 2026-05-19  
Branch avaliada: `release/sibisc-hardening-sprint3`  
Destino previsto: PR #59 contra `main`  
Documento de evidencia: `docs/qa/sprint3_hardening_release.md`

## Decisao

**GO tecnico condicional para manter o PR #59 pronto para review/merge apos atualizacao contra `main`.**  
**NO-GO para merge final sem review humano, checks remotos verdes e validacao com leitor de tela real.**

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
| Leitor de tela real | Pendente operacional | Roteiro manual definido em `docs/qa/sprint3_hardening_release.md` |
| Checks remotos do PR | Pendente apos push | Aguardar nova execucao do QA Gate e providers de preview apos a atualizacao da branch |
| Netlify preview | Pendente remoto | Nao bloquear localmente sem nova evidencia remota; confirmar se e required check/processo obrigatorio |

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
- Netlify deve ser reavaliado apos o novo push do PR #59; se continuar falhando e nao for canal oficial/required check, tratar como risco operacional documentado.
- Leitor de tela real ainda nao foi executado por limitacao operacional do ambiente.
- O aviso de Node 20 em GitHub Actions ainda depende de alteracao futura por alguem com permissao `workflow`.

## Recomendacao final

Abrir PR contra `main` e aguardar:

1. QA Gate remoto verde.
2. Review humano das correcoes e evidencias.
3. Validacao NVDA/VoiceOver/manual com registro.

Somente depois desses tres itens a release deve ser considerada **GO final para merge**.
