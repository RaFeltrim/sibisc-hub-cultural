# Reuniao final - Vereditos dos testes manuais SIBiSC/Feltrim Agents

Data: 2026-05-19  
Produto: SIBiSC / Feltrim Agents  
Base: quatro testes manuais reais executados em producao publica e repo local de apoio.

## 1. Participantes/agentes e papel

| Participante/agente | Papel na avaliacao | Relatorio base |
| --- | --- | --- |
| Rafael-QA SDET | Validacao funcional manual, navegacao, rotas, fluxos principais, regressao visual basica e evidencias de navegador. | `SIBiSC/docs/qa/teste_manual_funcional_rafael_qa.md` |
| UX/Acessibilidade | Avaliacao de UX, navegacao por teclado, semantica basica, foco, landmarks/headings e pendencias de leitor de tela. | `SIBiSC/docs/qa/teste_manual_ux_acessibilidade.md` |
| TL/SE | Revisao tecnica e de seguranca: runtime, rede, rotas SPA, headers, links externos, promessas de produto e hardening. | `SIBiSC/docs/qa/teste_manual_tl_seguranca.md` |
| PO/PM | Aceite de produto, clareza de proposta de valor, riscos de comunicacao, prontidao para apresentacao publica e discurso de release. | `SIBiSC/docs/product/aceite_manual_po_pm.md` |
| Sofia | Consolidacao executiva e recomendacao final para Rafael. | Este documento e `SIBiSC/docs/product/conclusao_sofia_reuniao_testes_manuais.md` |
| Claudia | Dono sugerido para comunicacao, roteiro de apresentacao, canal de feedback e linguagem publica. | Consolidacao da reuniao |

## 2. Veredito individual

| Avaliador | Veredito | Sintese |
| --- | --- | --- |
| Rafael-QA SDET | Aprovado com ressalvas | Fluxos principais de Home, mobile, noticias, eventos, catalogo, perfil e rotas invalidas funcionam. Ressalva alta: bottom nav intercepta o clique do botao `Buscar` em `/home-mobile` no viewport `390x844`. Ressalva baixa: Jornada do leitor mostra progresso acima da meta, como `7/5` e `7/6`. |
| UX/Acessibilidade | UX GO com ressalvas; acessibilidade NO-GO para declarar pronta | A experiencia e compreensivel e navegavel, mas nao deve ser comunicada como acessibilidade pronta. Ha P2 em headings, tabs do perfil, descoberta do Perfil no desktop e conteudo mobile encoberto/denso; leitor de tela real nao foi validado. |
| TL/SE | Aprovado com ressalvas importantes | Sem P0 tecnico, console/rede/build/guards locais aprovados. P1: catalogo e detalhe nao deixam disponibilidade claramente mockada no fluxo direto. P2: headers incompletos, rota inexistente retorna HTTP 200, microcopy de Renovar pode parecer operacional. P3: link externo de noticia sem `noopener` explicito. |
| PO/PM | Aprovado com ressalvas para apresentacao publica como prototipo | A proposta de valor esta clara e os fluxos essenciais estao prontos para demonstracao academica controlada. Nao deve ser vendido como produto operacional; gaps principais sao mock/disponibilidade no detalhe, dependencia de GitHub para feedback, gamificacao acima da meta e topo do Perfil sem aviso demonstrativo. |

## 3. Achados consolidados por severidade

### P0 - Bloqueadores criticos

Nenhum P0 foi encontrado nos quatro testes manuais.

### P1 - Corrigir antes de ampliar comunicacao publica ou declarar prontidao operacional

| ID | Achado consolidado | Evidencia | Impacto | Dono sugerido |
| --- | --- | --- | --- | --- |
| P1-01 | Disponibilidade de catalogo/detalhe ainda pode ser lida como real no fluxo direto. | TL/SE encontrou `catalog.hasMockOrPrototypeNotice: false` e `bookDetail.textHasMock: false`; PO/PM reforcou que termos como "exemplares disponiveis" e "Disponivel para retirada" podem parecer operacionais. | Usuario real pode se deslocar ou tomar decisao baseada em dado mockado. | PO + Dev + TL |
| P1-02 | Bottom nav intercepta o botao `Buscar` em `/home-mobile` no viewport `390x844`. | Rafael-QA reproduziu timeout de clique; hit target caiu no item `Eventos` da bottom nav. | CTA visivel fica inacessivel por toque em um estado real de mobile. | Dev + QA |
| P1-03 | Leitor de tela real nao foi validado. | UX/Acessibilidade nao conseguiu validar NVDA/Narrator com canal assistivo confiavel. | Impede qualquer declaracao honesta de compatibilidade com leitor de tela. | QA + Claudia + Dev |

### P2 - Corrigir antes de release final sem ressalvas

| ID | Achado consolidado | Evidencia | Impacto | Dono sugerido |
| --- | --- | --- | --- | --- |
| P2-01 | Pendencias de acessibilidade estrutural. | Listagens sem `h1`; `aria-controls` quebrado em tabs desmontadas do Perfil; descoberta do Perfil fraca no desktop; conteudo critico mobile abaixo da dobra. | Reduz orientacao por tecnologias assistivas e qualidade de navegacao. | Dev + QA |
| P2-02 | Headers de seguranca incompletos em producao. | TL/SE confirmou HSTS, mas ausencia de CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` e `Permissions-Policy`. | Menor defesa em profundidade contra clickjacking, sniffing, vazamento de referrer e XSS. | TL + Dev |
| P2-03 | Rota inexistente retorna HTTP 200 apesar da UI 404. | `curl -I` retornou `HTTP/1.1 200 OK` para rota inexistente; UI mostra 404. | Monitores, crawlers e QA podem tratar URL quebrada como sucesso. | TL + Dev |
| P2-04 | Acao `Renovar` pode parecer renovacao real. | Status atual: `Emprestimo renovado: O Cortico. Confira a nova data de devolucao.` | Usuario pode interpretar como operacao real de biblioteca. | PO + Dev |
| P2-05 | Feedback depende de login GitHub. | PO/PM confirmou template correto, mas com barreira de conta para publico geral. | Reduz participacao de usuarios nao tecnicos e pode interromper coleta de feedback. | Sofia + Claudia + PO |
| P2-06 | Perfil nao marca dados demonstrativos no topo. | PO/PM observou nome, e-mail e historico demonstrativos sem aviso proximo ao cabecalho. | Pode gerar ruido de privacidade/oficialidade em apresentacao publica. | PO + Dev |
| P2-07 | Gamificacao mostra contadores acima da meta. | QA e PO/PM observaram `7/5`, `7/6`, `7/3`. | Parece erro de regra e enfraquece acabamento do prototipo. | Dev + PO |

### P3 - Melhorias de acabamento e consistencia

| ID | Achado consolidado | Evidencia | Impacto | Dono sugerido |
| --- | --- | --- | --- | --- |
| P3-01 | Link externo de noticia usa `noreferrer` sem `noopener` explicito. | TL/SE encontrou `target="_blank"` com `rel="noreferrer"` em noticia. | Risco pratico baixo, mas padronizacao de seguranca inconsistente. | Dev + TL |
| P3-02 | Alguns CTAs/links secundarios parecem pequenos. | UX citou `Ler detalhe`, `Ver detalhes` e links de secao. | Menor precisao para usuarios com baixa motricidade. | Dev + QA |
| P3-03 | Contraste de acentos ainda precisa medicao formal. | UX apontou boa percepcao visual, mas sem medicao WCAG AA formal. | Nao bloqueia demonstracao, mas bloqueia declaracao de conformidade. | QA + Dev |
| P3-04 | Microcopy e acentos variam. | PO/PM citou strings como `Catalogo`, `Noticias`, `Preferencias`, `Nao Ficcao`. | Reduz polimento em apresentacao institucional. | Claudia + PO + Dev |
| P3-05 | Home mobile e densa para apresentacao rapida. | UX e PO/PM observaram conteudo longo e informacoes abaixo da dobra. | Pode dificultar entendimento rapido em mobile. | Sofia + Claudia + PO |

## 4. Convergencias e conflitos entre avaliacoes

### Convergencias

- Todos os avaliadores convergem que os fluxos principais funcionam e que nao ha P0 conhecido.
- Todos convergem que a apresentacao publica e possivel apenas com enquadramento explicito de prototipo demonstrativo.
- QA, UX e PO/PM convergem que mobile precisa ajuste: o problema varia de densidade/espaco visual ate interceptacao real do CTA.
- TL/SE e PO/PM convergem que disponibilidade e renovacao precisam reforcar o carater mockado nos fluxos diretos, nao apenas na Home/Feltrim Agents.
- UX e TL/SE convergem que a release nao deve declarar acessibilidade ou robustez final sem correcoes e revalidacao.
- QA e PO/PM convergem que a gamificacao acima da meta deve virar estado "meta superada" ou equivalente.

### Tensoes e diferencas de leitura

- Rafael-QA marcou rotas invalidas como aprovadas pela UI de erro controlada; TL/SE marcou ressalva porque o HTTP real retorna 200. As duas leituras sao corretas: UX do usuario esta controlada, semantica tecnica ainda falha.
- UX observou que a linguagem do Feltrim Agents deixa limites claros na Home; TL/SE e PO/PM apontaram que o fluxo direto de catalogo/detalhe nao recebe o mesmo nivel de aviso. A decisao consolidada e tratar o fluxo direto como lacuna real.
- QA classificou disponibilidade no detalhe como rotulada porque havia texto de prototipo local; TL/SE e PO/PM consideraram insuficiente para usuario real. A decisao consolidada e reforcar aviso proximo de cada numero de disponibilidade.
- PO/PM aprovou release/apresentacao como prototipo; UX deu NO-GO para declarar acessibilidade pronta. Nao ha conflito de decisao: sao escopos diferentes.

## 5. Decisao do time

| Escopo de decisao | Go/No-Go | Decisao consolidada |
| --- | --- | --- |
| Apresentacao publica controlada | GO com ressalvas | Pode apresentar como prototipo academico avancado, desde que o roteiro declare: dados mockados, sem reserva real, sem backend/IA generativa real, sem disponibilidade operacional e feedback com cuidado de privacidade. |
| Release final sem ressalvas / produto operacional | NO-GO | Nao deve ser comunicado como produto pronto para uso real de biblioteca ate corrigir P1/P2, revalidar mobile, disponibilidade, renovacao, headers, semantica 404 e acessibilidade estrutural. |
| Declaracao de acessibilidade final/conformidade completa | NO-GO | Nao declarar acessibilidade pronta, WCAG AA ou compatibilidade com leitor de tela ate corrigir P2 de acessibilidade, medir contraste formalmente e executar validacao com NVDA/Narrator ou leitor de tela real. |

## 6. Acoes corretivas por prioridade

### P0

Nao ha acao P0 aberta.

### P1

1. Adicionar aviso persistente de disponibilidade mockada no catalogo, detalhe do livro e lista por unidade. Donos: PO, Dev, TL.
2. Corrigir area segura da bottom nav em `/home-mobile`, garantindo que o botao `Buscar` e outros CTAs fiquem clicaveis em `390x844`. Donos: Dev, QA.
3. Executar roteiro com leitor de tela real apos as correcoes estruturais de acessibilidade. Donos: QA, Claudia, Dev.

### P2

1. Corrigir headings das listagens para terem `h1` adequado. Donos: Dev, QA.
2. Corrigir tabs do Perfil para `aria-controls` apontar sempre para paineis existentes ou ajustar a semantica de renderizacao. Donos: Dev, QA.
3. Melhorar descoberta do Perfil no desktop ou documentar claramente o caminho de acesso durante a apresentacao. Donos: PO, Dev.
4. Configurar headers de seguranca no deploy. Donos: TL, Dev.
5. Decidir e implementar tratamento HTTP 404 real, ou registrar a limitacao tecnica do fallback SPA. Donos: TL, Dev.
6. Trocar microcopy de `Renovar` para deixar claro que e uma renovacao demonstrativa. Donos: PO, Dev.
7. Reduzir dependencia de GitHub login para feedback, ou preparar alternativa/formulario em apresentacao publica. Donos: Sofia, Claudia, PO.
8. Marcar o topo do Perfil como demonstrativo. Donos: PO, Dev.
9. Ajustar contadores de gamificacao acima da meta para "meta superada", `5/5 +2` ou equivalente. Donos: Dev, PO.

### P3

1. Padronizar links externos como `rel="noopener noreferrer"`. Donos: Dev, TL.
2. Revisar tamanho de links/CTAs secundarios. Donos: Dev, QA.
3. Medir contraste formalmente antes de qualquer declaracao WCAG. Donos: QA, Dev.
4. Padronizar acentos e microcopy. Donos: Claudia, PO, Dev.
5. Simplificar roteiro de demonstracao mobile para reduzir rolagem e densidade. Donos: Sofia, Claudia, PO.

## 7. Ordem recomendada de correcao

1. Corrigir disponibilidade mockada no catalogo/detalhe e microcopy de renovacao, pois sao os riscos mais diretos para usuario real.
2. Corrigir o bug mobile da bottom nav interceptando `Buscar`, por ser uma falha funcional reproduzida em viewport comum.
3. Corrigir P2 de acessibilidade estrutural: `h1`, tabs do Perfil, descoberta do Perfil e espacamento/ordem de conteudo mobile.
4. Revalidar com leitor de tela real e registrar evidencias.
5. Ajustar headers de seguranca e decidir tratamento HTTP 404.
6. Corrigir Perfil demonstrativo e gamificacao acima da meta.
7. Ajustar feedback Sofia/Claudia para reduzir dependencia de GitHub ou preparar alternativa de apresentacao.
8. Fechar P3 de links externos, contraste formal, microcopy, acentos e refinamento de CTA.

## 8. Conclusao da reuniao

O time aprova o SIBiSC/Feltrim Agents para apresentacao publica controlada como prototipo demonstrativo, com discurso honesto e limites bem explicitados. O time nao aprova a declaracao de produto operacional, release final sem ressalvas ou acessibilidade final enquanto os P1/P2 nao forem corrigidos e revalidados.

Para Rafael, a mensagem central e: o produto esta forte para demonstrar valor academico, mas a confianca do usuario real depende de corrigir os pontos de mock, mobile, acessibilidade, seguranca de headers e microcopy operacional antes de qualquer comunicacao de prontidao plena.
