# Integrated System Blueprint

## Objetivo

Este e o documento integrador mantido pela `Tech Lead`. Ele conecta backlog, arquitetura, dados, integracoes, frontend, backend, QA e operacao.

## Escopo Atual

- produto principal: `SIBiSC`
- experiencia alvo: `Web-App / mobile-first`
- frontend recomendado para onboarding: `Vite + React + JavaScript`
- backend base: `Supabase`
- pilares do MVP: noticias, eventos e acervo com geolocalizacao

## Problema Que o Sistema Resolve

O SIBiSC precisa transformar informacoes fragmentadas sobre acervo, eventos e comunicacao cultural em uma experiencia publica simples, centralizada e confiavel. A arquitetura existe para reduzir dispersao, melhorar acesso movel e criar uma base de dados sustentavel para evolucao futura.

## Visao de Solucao

- conteudo publico acessivel por interface web mobile-first
- dados consolidados em banco unificado
- rotinas de ingestao desacopladas da experiencia do usuario
- curadoria minima para garantir qualidade de noticias e agenda
- rastreabilidade entre negocio, dados, implementacao e teste

## Mapa dos Subdominios

- `Conteudo`: noticias, categorias, fontes e curadoria
- `Agenda`: eventos, unidades, horarios e acoes de lembrete
- `Acervo`: livros, disponibilidade, unidades e proximidade
- `Operacao`: sincronizacoes, validacao interna e consistencia dos dados

## Rastreamento Macro

- backlog de negocio: `docs/product`
- gestao e cronologia: `docs/management`
- arquitetura e integracoes: `docs/architecture`
- modelo de dados e RLS: `docs/data`
- entrega tecnica: `docs/backend`, `docs/frontend`, `docs/devops`
- qualidade: `docs/qa`

## Decisoes Integradoras Iniciais

- o SIBiSC sera tratado como unico produto do repositorio
- documentacao oficial nasce em Markdown dentro de `SIBiSC`
- materiais de apoio e academicos ficam fora da navegacao principal do produto
- a primeira fase tecnica prioriza `Vite + React + Supabase`
- o MVP publico nasce sem login obrigatorio
- ingestao de dados nao deve ficar acoplada a navegacao do usuario
- alunos devem trabalhar com `mock local` antes de depender de integracao real

## Fluxo Macro de Dados

1. fontes externas ou rotinas internas fornecem dados
2. uma camada de sincronizacao normaliza e grava no banco
3. Supabase expoe os dados consolidados para leitura publica controlada
4. frontend consome consultas estaveis para noticias, eventos e acervo
5. QA valida fluxos criticos contra criterios de aceite registrados

## Responsabilidade por Frente

- `PO`: backlog, valor e criterios
- `PM`: releases, dependencias e prazos
- `ARCH`: visao sistemica e trade-offs
- `TL`: integracao entre documentos e execucao tecnica
- `DE/DBA`: modelagem, RLS, tuning e ingestao
- `BACKEND`: contratos, jobs e integracao server-side
- `FRONTEND/MOBILE/UIUX`: experiencia, navegacao e responsividade
- `QA`: rastreabilidade e qualidade
- `DEVOPS`: ambientes, pipeline e entrega

## Dependencias Cruzadas

- frontend depende de contratos de dados e estados bem definidos
- geolocalizacao depende de dados confiaveis das unidades
- QA depende de criterios de aceite e fluxos oficiais registrados
- DevOps depende de variaveis, ambientes e convencoes estabilizadas
- gestao depende de documentacao atualizada para manter o caminho critico visivel

## Responsabilidade da TL

- manter coerencia entre as frentes
- apontar conflitos entre documentos
- garantir que nenhuma camada evolua isolada do restante do sistema
- manter este blueprint atualizado sempre que houver mudanca estrutural relevante
