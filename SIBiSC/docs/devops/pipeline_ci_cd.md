# Pipeline CI/CD

## Objetivo

Descrever a esteira real de validacao e entrega do projeto.

## Principio

A pipeline do SIBiSC existe para impedir que uma branch aparentemente pronta quebre o projeto ao integrar.

## Ordem de Prioridade do Gate

### P0 - Repository Guard

- valida arquivos obrigatorios
- valida documentacao minima
- valida rotas criticas do MVP
- valida variaveis publicas esperadas

Se esse gate falhar, nada segue.

### P1 - Frontend Build

- instala dependencias
- roda o build
- garante que o front ainda sobe para producao

### P2 - Testes E2E

- previsto para a proxima fase
- deve validar navegacao, catalogo, eventos e fallback de localizacao

## Workflow Atual no GitHub Actions

Arquivo:

- `.github/workflows/qa-gate.yml`

Jobs atuais:

- `p0-repository-guard`
- `p1-frontend-build`

## Regras do Pipeline

- falha de guard ou build bloqueia entrega
- branch sem passar no gate nao deve ser mesclada
- PR deve chegar com validacao local previa
- documentacao critica desatualizada deve ser tratada como divida visivel
- o pipeline documental em PDF deve evoluir junto com a documentacao oficial

## Comando Local Equivalente

```bash
cd SIBiSC
npm run qa:ci
```

## Meta

Permitir que o time tenha uma trilha simples de qualidade sem sobrecarregar alunos com infraestrutura excessiva logo no inicio.
