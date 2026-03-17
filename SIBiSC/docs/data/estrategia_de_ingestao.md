# Estratégia de Ingestão

## Objetivo

Definir como o SIBiSC consolidará dados externos em uma base confiável e consultável.

## Fontes Esperadas

- notícias
- eventos
- acervo
- metadados das unidades

## Ordem de Preferência

1. API oficial ou exportação estruturada
2. integração institucional com planilha ou arquivo controlado
3. scraping controlado com revisão e rastreamento

## Diretrizes

- priorizar API oficial quando existir
- usar jobs ou scrapers controlados quando necessário
- nunca depender de scraping sob demanda para buscas do usuário
- registrar última atualização e status da coleta para cada domínio importante
- prever falha parcial sem derrubar a experiência pública por completo
