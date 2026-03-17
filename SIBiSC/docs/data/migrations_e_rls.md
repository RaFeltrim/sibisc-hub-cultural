# Migrations e RLS

## Objetivo

Registrar como o banco será versionado e protegido ao longo do projeto.

## Regras Base

- migrations sempre versionadas em `SIBiSC/supabase`
- `RLS` habilitado desde o nascimento das tabelas
- políticas públicas apenas quando estritamente necessárias para leitura
- nenhuma mudança estrutural crítica deve existir só no painel visual
- alterações em produção exigem backup prévio e documentação da intenção

## Política Inicial de Acesso

- leitura pública controlada para notícias, eventos, unidades e consultas de acervo necessárias ao MVP
- escrita bloqueada para clientes públicos
- tabelas operacionais e de sincronização não devem ser expostas sem necessidade

## Checklist de Revisão

- schema criado
- policies criadas
- acesso público revisado
- rollback ou mitigação definidos
- impacto em frontend e QA documentado
