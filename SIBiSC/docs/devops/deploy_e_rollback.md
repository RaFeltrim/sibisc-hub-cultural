# Deploy e Rollback

## Objetivo

Definir como publicar e reverter mudanças com segurança.

## Regras

- deploy só com documentação coerente
- mudanças de banco devem prever rollback ou mitigação
- incidentes de produção devem gerar registro em documentação
- publicar sem plano de reversão deve ser exceção explicitamente aprovada

## Caminho Esperado

- validar build e testes
- aplicar mudanças necessárias de ambiente
- publicar aplicação
- monitorar comportamento inicial
- registrar qualquer incidente relevante

## Status

Procedimento detalhado será preenchido quando a infraestrutura estiver ativa.
