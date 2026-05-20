# Fechamento tecnico do deploy Vercel/Netlify - SIBiSC

Data: 2026-05-19  
Repositorio: `Web_Mobile`  
Projeto: `SIBiSC`  
URL publica validada: <https://sibisc-hub-cultural.vercel.app>

## Resumo executivo

O ciclo final de deploy do SIBiSC foi concluido apos ajustes na estrategia de instalacao de dependencias usada pelo GitHub Actions, Vercel e Netlify. O problema principal estava relacionado ao uso de `npm ci` com um `package-lock.json` gerado em Windows, que nao continha dependencias opcionais necessarias no ambiente Linux da pipeline, especialmente `@emnapi/core` e `@emnapi/runtime`.

A correcao final substituiu `npm ci` por `npm install` com flags de baixo ruido operacional nos ambientes automatizados. A validacao final registrou GitHub Actions verde, Vercel Production Deployment verde no commit `5613133`, URL publica respondendo `200 OK` e headers de seguranca presentes.

Este fechamento documenta apenas a conclusao tecnica do deploy. O status de produto permanece o mesmo ja registrado nos documentos finais: Total GO academico/controlado para apresentacao demonstrativa, sem elevar o projeto a produto operacional real.

## Contexto funcional recente

Antes do fechamento de deploy, o repositorio recebeu um conjunto de melhorias de produto, QA e documentacao:

- novas features de FABs para Feedback e Feltrim Agents;
- testes Vitest para aumentar a cobertura dos fluxos recentes;
- documentacao de Total GO academico/controlado;
- ajustes de mocks, incluindo dados e copys alinhados ao roteiro final.

Essas mudancas aumentaram a importancia de fechar a esteira automatizada, pois a entrega final dependia de CI e deploy reproduziveis nos provedores.

## Linha do tempo dos erros e correcoes

1. **Falha inicial no GitHub Actions**
   - O workflow `.github/workflows/qa-gate.yml` usava `npm ci`.
   - O Actions roda em Linux, mas o `package-lock.json` havia sido gerado em Windows.
   - Dependencias opcionais esperadas no Linux, como `@emnapi/core` e `@emnapi/runtime`, nao estavam materializadas no lockfile de forma compativel com o ambiente da pipeline.

2. **Tentativa intermediaria com `npm ci --omit=optional`**
   - A tentativa buscava ignorar dependencias opcionais.
   - Ainda falhou porque `npm ci` valida a consistencia do lockfile antes de concluir a instalacao.
   - Portanto, omitir opcionais nao resolvia a incompatibilidade de lockfile.

3. **Correcao final no GitHub Actions**
   - O workflow `.github/workflows/qa-gate.yml` passou a usar:

   ```bash
   npm install --no-audit --no-fund --prefer-offline
   ```

   - A troca manteve instalacao reprodutivel o suficiente para o contexto academico/controlado e evitou a validacao rigida que bloqueava o CI.

4. **Falha posterior no Vercel**
   - O `vercel.json` ainda declarava:

   ```bash
   npm ci --prefix SIBiSC
   ```

   - O mesmo problema de lockfile foi reproduzido no build do Vercel.

5. **Falha equivalente no Netlify**
   - O `netlify.toml` ainda usava:

   ```bash
   npm ci && npm run build
   ```

   - A instalacao continuava sujeita ao mesmo comportamento rigido de `npm ci`.

6. **Correcao final dos provedores**
   - `vercel.json` passou a usar:

   ```bash
   npm install --prefix SIBiSC --no-audit --no-fund
   ```

   - `netlify.toml` passou a usar:

   ```bash
   npm install --no-audit --no-fund && npm run build
   ```

7. **Compatibilidade de engine Node**
   - `SIBiSC/package.json` foi ajustado de `engines.node >=22` para `engines.node >=18`.
   - A decisao reduziu atrito com o ambiente do Vercel sem exigir runtime exclusivo de Node 22 para uma aplicacao Vite/React compativel com Node 18+.

8. **Validacao final**
   - GitHub Actions passou.
   - Vercel Production Deployment passou no commit `5613133`.
   - A URL publica <https://sibisc-hub-cultural.vercel.app> respondeu `200 OK`.
   - Headers de seguranca foram observados no deploy final.
   - Git local ficou limpo e sincronizado.

## Causa raiz

A causa raiz foi a combinacao de:

- `package-lock.json` gerado em Windows;
- execucao de CI/deploy em Linux;
- dependencias opcionais de pacotes nativos esperadas no ambiente Linux;
- uso de `npm ci`, que exige aderencia estrita entre `package.json`, `package-lock.json` e o conjunto de pacotes resolvidos para o ambiente.

Nesse projeto, a rigidez do `npm ci` deixou de ser benefica porque o lockfile nao estava estabilizado entre sistemas operacionais. A pipeline falhava antes de chegar ao build/teste, mesmo com a aplicacao funcional.

## Arquivos alterados

- `.github/workflows/qa-gate.yml`
  - Substituiu `npm ci` por `npm install --no-audit --no-fund --prefer-offline` nos jobs `P0 Repository Guard` e `P1 Frontend Build`.
  - Manteve cache npm e `cache-dependency-path: SIBiSC/package-lock.json`.

- `vercel.json`
  - Substituiu `installCommand` para `npm install --prefix SIBiSC --no-audit --no-fund`.
  - Preservou `buildCommand: npm run build --prefix SIBiSC` e `outputDirectory: SIBiSC/dist`.
  - Preservou headers de seguranca e rewrites SPA.

- `netlify.toml`
  - Substituiu o comando de build para `npm install --no-audit --no-fund && npm run build`.
  - Preservou `base = "SIBiSC"` e `publish = "dist"`.
  - Preservou headers e redirects SPA.

- `SIBiSC/package.json`
  - Ajustou `engines.node` de `>=22` para `>=18`.
  - Manteve scripts de build, teste e QA.

## Evidencias finais

### CI

- GitHub Actions: sucesso apos correcao do workflow.
- Workflow validado: `.github/workflows/qa-gate.yml`.
- Jobs esperados:
  - `P0 Repository Guard`;
  - `P1 Frontend Build`.

### Vercel

- Production Deployment: sucesso.
- Commit validado: `5613133`.
- URL publica: <https://sibisc-hub-cultural.vercel.app>.
- Resposta observada: `200 OK`.

### Headers principais

Os headers de seguranca configurados para Vercel e Netlify foram preservados:

- `Content-Security-Policy`;
- `X-Content-Type-Options: nosniff`;
- `X-Frame-Options: DENY`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`.

## Commits de referencia

- `22ce849`: inicio da sequencia recente de features, testes e documentacao do fechamento.
- `78a7dc9`: continuidade dos ajustes de produto/QA/documentacao ligados ao ciclo final.
- `830588f`: consolidacao de ajustes recentes antes da estabilizacao da esteira.
- `931956e`: tentativa intermediaria de resolver o CI com `npm ci --omit=optional`.
- `15568c5`: correcao do GitHub Actions para usar `npm install` no QA Gate.
- `5613133`: fechamento final com ajustes de Vercel, Netlify e engine Node, validado em producao.

## Decisao tecnica: `npm install` em vez de `npm ci`

Para projetos com lockfile plenamente estavel e gerado de forma compativel com o ambiente de execucao, `npm ci` costuma ser a opcao preferida em CI por ser mais estrito e previsivel.

Neste caso especifico, a prioridade era garantir que a pipeline academica/controlada conseguisse instalar dependencias em Linux mesmo com lockfile gerado em Windows. Como o problema estava na validacao estrita do lockfile antes da instalacao, `npm ci --omit=optional` nao era suficiente.

A decisao final foi usar `npm install` nos ambientes automatizados porque:

- reavalia dependencias opcionais conforme o ambiente real de execucao;
- evita a falha prematura causada pela ausencia de opcionais Linux no lockfile;
- mantem a instalacao simples para GitHub Actions, Vercel e Netlify;
- reduz ruido operacional com `--no-audit --no-fund`;
- usa `--prefer-offline` no GitHub Actions para aproveitar cache quando disponivel.

Essa decisao e adequada para o fechamento atual, mas deve ser revisitada se o projeto passar a exigir garantia operacional mais rigida de supply chain.

## Riscos e observacoes futuras

- `npm install` pode atualizar o `package-lock.json` se executado localmente; revisar diffs de lockfile antes de commitar.
- Se dependencias nativas crescerem, gerar/validar lockfile em Linux ou em ambiente padrao de CI pode voltar a ser necessario.
- A pipeline ainda usa Node 22 no GitHub Actions, enquanto `package.json` aceita Node `>=18`; manter essa diferenca documentada.
- O status Total GO continua academico/controlado; backend real, autenticacao, persistencia, integracoes oficiais e acessibilidade formal seguem fora do fechamento operacional.
- Se houver mudanca de provedores ou versoes de Node, revalidar Actions, Vercel e Netlify juntos.

## Checklist para proximas alteracoes de dependencias

- Rodar localmente `npm install` dentro de `SIBiSC` antes de abrir PR.
- Revisar `SIBiSC/package.json` e `SIBiSC/package-lock.json` no mesmo diff.
- Conferir se novas dependencias possuem opcionais nativas por sistema operacional.
- Evitar alternar entre `npm ci` e `npm install` sem atualizar esta decisao.
- Validar `npm run test` e `npm run build` antes de pedir revisao.
- Confirmar GitHub Actions verde apos push.
- Confirmar deploy preview/production no Vercel quando a mudanca afetar build, dependencias, rotas ou headers.
- Conferir Netlify quando `netlify.toml`, headers ou redirects forem alterados.
- Registrar novo incidente de deploy em `SIBiSC/docs/devops/` quando houver falha relevante.
