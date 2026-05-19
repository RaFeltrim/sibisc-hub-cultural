# Evidencias da sprint final de fechamento - SIBiSC/Feltrim Agents

Data: 2026-05-19  
Branch: `fix/sibisc-final-closure`  
Base: `origin/main`  
Escopo: fechamento dos itens `SF-01` a `SF-09` do plano aprovado.

## Resumo executivo

A sprint final corrigiu os riscos principais de comunicacao operacional: disponibilidade mockada agora aparece junto do catalogo, detalhe e unidades; Perfil informa que os dados sao demonstrativos; a acao de renovacao foi renomeada para simulacao; e a Jornada do leitor nao exibe mais fracoes acima da meta visual.

Tambem foram corrigidos pontos estruturais de acessibilidade, o bug mobile do botao `Buscar` em `/home-mobile`, a alternativa de feedback sem login GitHub, headers de seguranca em `vercel.json` e a configuracao de rotas validas sem catch-all global.

## Evidencia por item

### SF-01 - Disponibilidade mockada clara

Status: corrigido.

- `/catalogo` exibe aviso "Disponibilidade mockada" antes da busca e dos cards.
- Cards de livro exibem aviso junto da contagem de exemplares.
- `/catalogo/:id` exibe ressalva junto do total de exemplares, da unidade mais proxima e da disponibilidade por unidade.
- `AvailabilityTable` atualiza o `aria-label` para explicitar exemplares demonstrativos.

### SF-07 - Renovacao e Perfil demonstrativos

Status: corrigido.

- O topo de `/perfil` informa que nome, e-mail, preferencias, historico, favoritos, emprestimos e notificacoes sao mocks locais.
- A acao visivel passou de `Renovar` para `Simular renovacao`.
- O status apos clique informa que nenhuma operacao oficial foi enviada a biblioteca.

### SF-02 - Bottom nav mobile

Status: corrigido e validado localmente.

- `AppLayout` recebeu padding inferior mobile para criar area segura acima da bottom nav fixa.
- O botao do `SearchField` recebeu `scroll-margin-bottom` para manter alvo acionavel quando focado/rolado.
- Smoke Playwright/Edge em viewport `390x844` confirmou clique em `Buscar` apos selecionar `Eventos de leitura` e preencher `Sapiens`.

Resultado do smoke:

```text
/home-mobile search -> clickedBuscar: true
statusText: Busca aplicada: 1 resultado no catálogo local. Abra um item para ver disponibilidade.
```

### SF-04 - Acessibilidade estrutural

Status: corrigido.

- `CatalogPage`, `NewsPage` e `EventsPage` usam `SectionHeader` com `headingLevel={1}`.
- `SectionHeader` preserva `h2` como padrao para secoes internas.
- A navegacao desktop inclui `Perfil`.
- Os tres paineis de abas do Perfil permanecem no DOM com `hidden`, eliminando `aria-controls` apontando para elementos inexistentes.

### SF-03 - Leitor de tela real

Status: evidencia honesta criada; validacao real permanece pendente.

Ambiente verificado:

```text
Narrator.exe: encontrado
NVDA: nao encontrado no PATH
```

Decisao: nao foi feita validacao auditiva real nesta sessao, porque a automacao nao oferece canal confiavel para confirmar anuncios, ordem de leitura e comportamento de leitor de tela com uma pessoa usuaria. O roteiro permanece abaixo para execucao assistida antes de qualquer declaracao de acessibilidade final.

Roteiro recomendado:

1. Abrir `/` e navegar por headings e landmarks.
2. Ativar uma pergunta guiada do Feltrim Agents e confirmar anuncio da regiao `aria-live`.
3. Buscar `carolina` ou `Sapiens` e confirmar anuncio do status.
4. Abrir `/catalogo`, entrar em `/catalogo/b1` e verificar leitura dos avisos de disponibilidade demonstrativa.
5. Abrir `/perfil`, navegar pelas abas por teclado e confirmar estados, nomes e paineis.
6. Confirmar que `Simular renovacao` e o status resultante nao soam como operacao real.
7. Repetir em viewport mobile, validando bottom nav e rolagem.

Resultado de release: continua **NO-GO para declarar acessibilidade final/conformidade completa** ate validacao humana com leitor de tela.

### SF-05 - Headers e 404

Status: parcialmente corrigido, com limitacao documentada.

- `vercel.json` passou a configurar:
  - `Content-Security-Policy` com `frame-ancestors 'none'`;
  - `X-Content-Type-Options: nosniff`;
  - `X-Frame-Options: DENY`;
  - `Referrer-Policy: strict-origin-when-cross-origin`;
  - `Permissions-Policy` restritiva.
- O rewrite global `/(.*)` foi removido.
- Foram mantidos rewrites explicitos para as rotas validas do prototipo e IDs mockados (`b1`-`b8`, `e1`-`e7`, `n1`-`n4`).

Validacao local:

```text
vercel.json parseado com sucesso
headers: 1
rewrites: 8
hasCatchAll: false
```

Limitacao: `vite preview` local ainda retorna HTTP 200 para rota inexistente por fallback local da ferramenta, embora a UI 404 renderize corretamente. A confirmacao de HTTP 404 real e headers deve ser feita no deploy preview Vercel, pois `vite preview` nao aplica `vercel.json`.

### SF-08 - Jornada do leitor

Status: corrigido.

- `ProgressMeter` limita `aria-valuenow` e largura visual ao alvo.
- Valores acima da meta aparecem como `5/5 concluído` e texto complementar, por exemplo `7 registros, meta 5 concluída`.
- O `aria-label` explicita meta concluida quando aplicavel.

### SF-06 - Feedback sem GitHub

Status: corrigido sem backend.

- Home desktop e mobile mantem GitHub Issues como canal oficial.
- Foi adicionada alternativa sem login: copiar roteiro local de feedback.
- A alternativa nao envia dados automaticamente e reforca a instrucao de nao incluir dados pessoais sensiveis.

Decisao: nao foi criado `mailto:` porque nao ha e-mail publico aprovado nos documentos lidos.

### SF-09 - Acabamentos P3

Status: aplicado no escopo seguro.

- Link externo de noticia usa `rel="noopener noreferrer"`.
- Microcopy pontual foi ajustada em catalogo, Perfil, feedback e Jornada.
- Contraste formal com ferramenta dedicada nao foi medido nesta sessao; permanece pendencia antes de declaracao WCAG.

## Validacoes executadas

### Diagnosticos de editor

Resultado: sem erros nos arquivos editados via `ReadLints`.

### `npm run qa:repo`

Primeira execucao: falhou porque o guard textual exigia a frase historica sem acentos no aviso de privacidade.  
Acao: preservado o contrato do guard em `SOFIA_CLAUDIA_PRIVACY_NOTICE`.

Resultado final:

```text
QA repository guard passou: estrutura minima, docs, rotas criticas e IDs canonicos estao consistentes.
```

### `npm run qa:ci`

Resultado final:

```text
QA repository guard passou: estrutura minima, docs, rotas criticas e IDs canonicos estao consistentes.
vite v8.0.0 building client environment for production...
84 modules transformed.
dist/index.html 1.00 kB
dist/assets/index-C82j9rOs.css 61.62 kB
dist/assets/index-DGsi3R_d.js 321.82 kB
built in 923ms
```

### Smoke Playwright/Edge

Ambiente:

- `npm run preview -- --host 127.0.0.1 --port 4173`
- `playwright-cli` com `--browser msedge`
- viewport `390x844`

Rotas verificadas:

```text
/ -> 200, renderizado
/home-mobile -> 200, renderizado
/catalogo -> 200, renderizado
/catalogo/b1 -> 200, renderizado
/perfil -> 200, renderizado
/__qa_rota_inexistente_404__ -> 200 local, UI 404 renderizada
/home-mobile search -> clickedBuscar true
```

Observacao: o status HTTP 200 da rota inexistente e resultado do preview local, nao do deploy Vercel com `vercel.json`.

## Pendencias remanescentes

- Executar validacao humana real com Narrator/NVDA antes de declarar acessibilidade final.
- Confirmar headers e HTTP 404 real no deploy preview Vercel/PR.
- Medir contraste formalmente antes de qualquer declaracao WCAG AA.
- Rafael deve aprovar o canal definitivo de feedback sem GitHub caso queira algo alem do roteiro local.
