# Validação operacional independente - Tech Lead + Security Engineer

**Site validado:** [https://sibisc-hub-cultural.vercel.app](https://sibisc-hub-cultural.vercel.app)  
**Projeto local:** `SIBiSC`  
**Data:** 2026-05-19  
**Perfil da validação:** Tech Lead + Security Engineer  
**Independência:** validação feita diretamente em produção e no código operacional necessário. Não foram consultados relatórios ou conclusões de validações paralelas.

## Veredito técnico

**Aprovado com ressalvas P2/P3 para apresentação acadêmica e uso demonstrativo.**  
Não encontrei falhas P0/P1, crashes de navegação, erros críticos de console, promessa enganosa de IA/backend real, persistência real de dados pessoais ou ranking público. O site está coerente com a proposta de protótipo e os guards locais passam.

As ressalvas principais são de hardening e operação: ausência de headers defensivos importantes, rota inexistente retornando HTTP 200 por fallback SPA, um link externo oficial falhando por certificado expirado e pequenos ajustes de privacidade/UX nos fluxos de feedback e Google Calendar.

## Escopo executado

- Navegação Playwright em produção: home, notícias, detalhes de notícia, eventos, detalhes de evento, catálogo, detalhes de livro, perfil, home mobile e rota inexistente.
- Coleta de console warning/error via Playwright CLI.
- Coleta de requests do browser, com separação de ruído local de extensão/antivírus do ambiente.
- Checks HTTP com `curl.exe` para rotas públicas, headers e destinos externos.
- Inspeção de cookies, `localStorage` e `sessionStorage` via Playwright CLI.
- Execução local de `npm run qa:repo` e `npm run qa:ci`.
- Leitura pontual de código operacional para confirmar comportamento de calendário, perfil mockado, Feltrim Agents e Supabase.

## Evidências principais

- `npm run qa:repo`: passou. Mensagem: `QA repository guard passou: estrutura minima, docs, rotas criticas e IDs canonicos estao consistentes.`
- `npm run qa:ci`: passou, incluindo `vite build`.
- Build: `84 modules transformed`, bundle JS `321.83 kB`, gzip `97.26 kB`, build em `818ms`.
- Console Playwright: `Total messages: 0 (Errors: 0, Warnings: 0)` nas rotas amostradas.
- Rotas internas amostradas renderizaram `h1` esperado e status browser `200`: `/`, `/noticias`, `/noticias/n1`, `/noticias/n2`, `/noticias/n3`, `/eventos`, `/eventos/e1`, `/eventos/e2`, `/eventos/e3`, `/catalogo`, `/catalogo/b1`, `/catalogo/b2`, `/catalogo/b7`, `/perfil`, `/home-mobile`, `/rota-inexistente-tl-se`.
- Rota inexistente renderiza fallback visual: `Essa rota ainda não existe no mapa do SIBiSC.`
- Cookies/storage em `/perfil`: nenhum cookie, nenhum item em `localStorage`, nenhum item em `sessionStorage`.
- Google Calendar abriu nova aba e redirecionou para fluxo oficial de login/criação de evento do Google Calendar.
- Link de feedback via GitHub usa `target="_blank"` e `rel="noopener noreferrer"`.
- Supabase existe como cliente opcional, com `persistSession: false`; não observei storage/cookies ativos na navegação validada.

## Achados P0

Nenhum.

## Achados P1

Nenhum.

## Achados P2

### P2-01 - Headers defensivos ausentes em produção

**Evidência:** respostas HTTP do Vercel incluem `Strict-Transport-Security`, mas não retornam `Content-Security-Policy`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy` ou `Permissions-Policy` nas rotas testadas.

**Impacto:** aumenta superfície para clickjacking, vazamento de referrer para destinos externos e falta de contenção caso algum conteúdo externo/script futuro seja adicionado. Hoje o risco é moderado porque o site é estático/demonstrativo e não manipula sessão real.

**Recomendação:** configurar headers no Vercel, preferencialmente:

- `Content-Security-Policy` com `default-src 'self'`, permissões explícitas para assets e destinos necessários.
- `frame-ancestors 'none'` ou `X-Frame-Options: DENY`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` restringindo recursos não usados.

### P2-02 - Rota inexistente retorna HTTP 200

**Evidência:** `https://sibisc-hub-cultural.vercel.app/rota-inexistente-tl-se` retorna `HTTP/1.1 200 OK` no check HTTP, embora a SPA renderize uma página visual de rota inexistente.

**Impacto:** prejudica monitoramento, SEO, auditorias automatizadas e semântica operacional. Um uptime checker ou crawler pode interpretar URLs inválidas como páginas válidas.

**Recomendação:** se a entrega continuar como SPA estática, documentar esta limitação. Se houver oportunidade de hardening, usar camada Vercel/serverless/edge para retornar 404 real quando a rota não corresponder às rotas conhecidas, preservando fallback para deep links válidos.

### P2-03 - Link externo oficial falha TLS

**Evidência:** `https://www.saocarlos.sp.gov.br/` retornou erro de TLS no `curl.exe`: `SEC_E_CERT_EXPIRED`.

**Impacto:** usuário que abre a fonte externa pode receber bloqueio/alerta de certificado, reduzindo confiança no fluxo de notícia. O problema é do destino externo, mas afeta a experiência do site.

**Recomendação:** substituir por URL oficial com certificado válido, usar fonte alternativa confiável ou sinalizar que o link externo está sujeito à disponibilidade do órgão.

## Achados P3

### P3-01 - Feedback via GitHub deveria explicitar publicidade do canal

**Evidência:** a tela orienta não enviar dados pessoais sensíveis e oferece alternativa sem GitHub. O link externo leva ao fluxo de criação de issue do GitHub, que exige login e pode gerar registro público.

**Impacto:** risco residual de usuário inserir dados pessoais em um canal público, mesmo com aviso de não enviar dados sensíveis.

**Recomendação:** ajustar o texto para declarar explicitamente que GitHub Issues pode ser público e vinculado à conta GitHub do usuário. Manter a alternativa local sem envio automático.

### P3-02 - Mensagem do Google Calendar pode parecer incerta mesmo quando abre

**Evidência:** o clique no botão abriu nova aba do Google Calendar, mas a mensagem exibida foi: `Google Calendar solicitado em uma nova aba. Se nada abrir, permita pop-ups para salvar o evento.`

**Impacto:** pequeno atrito de confiança. O comportamento é funcional, mas a mensagem pode sugerir falha mesmo quando a aba foi aberta. Isso ocorre porque `window.open` com `noopener` pode não devolver referência utilizável.

**Recomendação:** manter `noopener,noreferrer` e alterar a mensagem para uma confirmação mais neutra, por exemplo: `Abrimos o Google Calendar em uma nova aba. Se nada aparecer, verifique o bloqueador de pop-ups.`

### P3-03 - `Access-Control-Allow-Origin: *` aparece nas respostas estáticas

**Evidência:** rotas HTML retornam `Access-Control-Allow-Origin: *`.

**Impacto:** para site estático público, o risco prático é baixo. Ainda assim, é uma configuração ampla desnecessária se não houver intenção de liberar leitura cross-origin de todos os recursos.

**Recomendação:** remover ou restringir CORS se não for requisito explícito. Não é bloqueante para a entrega atual.

## Itens validados sem achado bloqueante

### Console e rede

As rotas amostradas não apresentaram warnings/errors no console Playwright. A lista de requests do browser exibiu chamadas para domínio de Kaspersky do ambiente local; tratei isso como ruído de máquina/antivírus, não como tráfego originado pela aplicação.

### Links internos

Links internos representativos renderizaram páginas válidas, com H1 esperado e sem estado de erro. Os detalhes de notícia, evento e livro testados abriram corretamente.

### Links externos

O link de feedback abre GitHub em nova aba com `noopener noreferrer`. O Google Calendar abre em nova aba e preserva título, datas, fuso e localização do evento. O link externo para a Prefeitura apresentou problema TLS no destino.

### Privacidade e persistência

Não foram encontrados cookies, `localStorage` ou `sessionStorage` após navegação em `/perfil`. O perfil informa caráter demonstrativo e ausência de dados reais/persistência oficial. O cliente Supabase está preparado como opcional e com persistência de sessão desativada.

### Disponibilidade mockada

Catálogo e detalhes de livro exibem avisos de disponibilidade mockada/demonstrativa e orientam confirmar disponibilidade real com a biblioteca. Não identifiquei promessa de reserva, renovação ou operação oficial.

### Feltrim Agents

O assistente se apresenta como protótipo/guiado, usa dados locais e informa limites: sem backend de IA, sem reserva real, sem catálogo oficial em tempo real e sem integração de atendimento. Não identifiquei promessa de IA generativa real.

### Jornada do leitor

A jornada do leitor usa mocks locais, informa ausência de ranking público, pontuação competitiva e persistência real. A flag operacional no serviço também marca `publicRanking: false`.

### Google Calendar

O fluxo constrói URL oficial do Google Calendar com título, datas, descrição, local e timezone `America/Sao_Paulo`. A descrição do evento orienta confirmar inscrição/disponibilidade com a biblioteca.

## Conclusão

O site está operacionalmente robusto para demonstração e coerente com o escopo de protótipo. Não há bloqueadores P0/P1. Recomendo corrigir os P2 antes de tratar o site como release pública mais ampla, especialmente headers defensivos e semântica de rota inexistente. Os P3 são melhorias simples de confiança, privacidade e polimento.
