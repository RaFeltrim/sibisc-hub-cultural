# Integrações

## Objetivo

Registrar integrações internas e externas do projeto, reduzindo ambiguidades de escopo.

## Integrações Previstas

### Supabase

- papel: armazenamento, leitura pública controlada e base para lógica de dados
- atenção: políticas de acesso, modelagem e versionamento de migrations

### Web APIs de geolocalização

- papel: obter localização do usuário para ordenar unidades por proximidade
- atenção: permissão negada, precisão variável e necessidade de fallback manual

### Fontes externas de notícias e eventos

- papel: abastecer o portal e a agenda
- atenção: origem heterogênea, qualidade de dados e revisão editorial

### Rotinas de sincronização do acervo

- papel: consolidar disponibilidade em base local controlada
- atenção: latência entre fonte e banco, falhas de coleta e observabilidade

## Regras

- toda integração deve explicitar origem, frequência, falhas esperadas e fallback
- integrações sem API oficial devem registrar estratégia de mitigação
- nenhuma integração crítica deve ficar apenas implícita em conversa ou código
