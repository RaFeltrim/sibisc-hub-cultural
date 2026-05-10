<div align="center">

# SIBiSC — Hub Cultural Digital

**Sistema Integrado de Bibliotecas de São Carlos**

[![Status](https://img.shields.io/badge/status-MVP%20Em%20Desenvolvimento-orange?style=flat-square)](./SIBiSC/README.md)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![USP](https://img.shields.io/badge/USP-SSC0961-003F7D?style=flat-square)](https://uspdigital.usp.br)
[![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA-005A9C?style=flat-square)](./SIBiSC/docs/qa/relatorio_acessibilidade.md)

</div>

---

## Problema

O Sistema Integrado de Bibliotecas de São Carlos (SIBiSC) concentra acervo, eventos e horários em canais fragmentados, com experiência mobile inadequada e baixo engajamento cultural da comunidade.

## Solução

Web-app **mobile-first** que centraliza três pilares de acesso:

| Pilar | Funcionalidade |
|---|---|
| 📰 **Notícias** | Feed de notícias e publicações das bibliotecas da rede |
| 📅 **Eventos** | Calendário de eventos culturais com filtros por unidade |
| 📚 **Catálogo** | Busca de livros com disponibilidade por unidade e geolocalização |

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite 6 + CSS Modules |
| Roteamento | React Router DOM |
| Backend / Auth | Supabase (PostgreSQL + Row Level Security) |
| Mock data | Módulos JS por domínio (livros, eventos, notícias, perfil) |
| CI/CD | GitHub Actions — QA Gate (Playwright E2E) |
| Design | Mobile-first, WCAG 2.1 AA |

## Estrutura do Repositório

```
sibisc-hub-cultural/
├── SIBiSC/                     # Produto principal
│   ├── src/
│   │   ├── components/         # cards, layout, ui
│   │   ├── pages/              # 9 páginas roteadas
│   │   ├── services/           # camada de serviço por domínio
│   │   ├── mocks/              # dados mock completos
│   │   ├── hooks/              # useDebouncedValue
│   │   └── lib/                # supabaseClient
│   ├── docs/
│   │   └── qa/
│   │       ├── casos_de_teste_funcional.md   # Given-When-Then por US
│   │       ├── casos_de_teste_seguranca.md   # auth, XSS, injection
│   │       └── relatorio_acessibilidade.md   # WCAG 2.1 AA
│   └── supabase/               # schema e migrations (planejado)
├── .github/
│   └── workflows/
│       └── qa-gate.yml         # Playwright E2E + PR comment
└── CONTRIBUTING.md
```

## Como Rodar

```bash
git clone https://github.com/RaFeltrim/sibisc-hub-cultural.git
cd sibisc-hub-cultural/SIBiSC
npm install
cp .env.example .env          # preencher VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
npm run dev
```

## QA & Qualidade

O projeto segue gitflow completo (`feature → dev → hom → prd → main`) e inclui documentação de qualidade rastreável:

- **Casos de teste funcional** — cenários Given-When-Then para todos os módulos
- **Casos de teste de segurança** — cobertura de auth, XSS, SQL injection e exposição de dados
- **Relatório de acessibilidade WCAG 2.1 AA** — auditoria com Lighthouse + axe em desktop, tablet e mobile
- **CI/CD com GitHub Actions** — quality gate automático a cada PR

## Equipe (USP SSC0961 — Desenvolvimento Web e Mobile)

| Membro | Papel |
|---|---|
| Rafael Feltrim | Dev + QA Lead + Arquitetura |
| Eduardo Paz e Silva | Dev |
| Matheus Marchi Baron | Dev |
| Pedro Augusto Pereira Magalhães | Dev |
| Pedro Dorigatti Aureo Ferreira | Dev |

---

<div align="center">
<a href="https://linkedin.com/in/rafael-feltrim-me">LinkedIn</a> ·
<a href="https://rafeltrim.github.io/portfolio">Portfolio</a> ·
<a href="./SIBiSC/docs/qa/relatorio_acessibilidade.md">Relatório de Acessibilidade</a>
</div>