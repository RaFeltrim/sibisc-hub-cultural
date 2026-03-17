# Riscos e Dependências

## Riscos Iniciais

### R1 - Falta de fonte oficial estável para o acervo

- impacto: alto
- efeito: compromete a confiabilidade da busca pública
- mitigação: trabalhar com ingestão controlada, base sincronizada e rastreio de última atualização

### R2 - Notícias e eventos com origem fragmentada

- impacto: alto
- efeito: agenda e portal ficam dependentes de revisão manual ou coleta heterogênea
- mitigação: padronizar curadoria e registrar origem dos dados

### R3 - Geodados incompletos das unidades

- impacto: alto
- efeito: geolocalização perde precisão ou quebra a confiança do usuário
- mitigação: validar coordenadas antes de ativar cálculo de proximidade

### R4 - Baixa experiência do time com MVP full-stack

- impacto: médio
- efeito: risco de superengenharia ou atraso por indecisão técnica
- mitigação: manter escopo enxuto, documentação forte e decisões progressivas

## Dependências Críticas

- schema Supabase antes de integrações públicas
- estratégia de ingestão antes da busca com dados reais
- contratos de dados antes da implementação do frontend
- critérios de aceite antes da automação de QA
- definição de ambientes antes da entrega contínua

## Regra de Gestão

Cada risco relevante deve ganhar dono, impacto, status e plano de mitigação conforme o projeto evolui.
