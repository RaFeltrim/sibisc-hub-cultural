# Ambientes e Variaveis

## Objetivo

Registrar como o projeto sera configurado entre desenvolvimento, preview e producao.

## Ambientes Esperados

- local
- preview
- producao

## Variaveis Iniciais da Stack Recomendada

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- segredos server-side quando o backend exigir

## Regras

- segredos nunca devem ser comitados
- `.env.example` deve refletir apenas variaveis necessarias e seguras de documentar
- qualquer mudanca em variavel de ambiente deve impactar tambem onboarding e pipeline
- credenciais privadas como senha do banco e `service role key` devem ficar fora do frontend
