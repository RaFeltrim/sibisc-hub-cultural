# Estrategia Shift-Left

## Objetivo

Garantir que qualidade seja tratada desde o inicio, e nao apenas no final da implementacao.

## Foco Inicial

- criterios de aceite claros
- riscos criticos mapeados por fluxo
- cobertura dos tres pilares do MVP
- validacao de documentacao antes da automacao
- gates automaticos antes da integracao na `main`

## Riscos Prioritarios

- busca com retorno inconsistente do acervo
- geolocalizacao sem fallback
- agenda desatualizada
- noticia publicada com informacao incompleta
- divergencia entre documentacao e comportamento real

## Papel do QA

- definir o gate de qualidade minimo da branch
- manter a pipeline viva e confiavel
- bloquear integracao quando build, rastreabilidade ou fluxo critico quebrarem
- registrar feedback por `task` e `subtask`

## Gate Minimo Atual

Antes de PR:

```bash
cd SIBiSC
npm run qa:ci
```

Esse comando deve:

- validar a estrutura minima do projeto
- validar a documentacao essencial
- garantir que o front builda

## Responsabilidade Compartilhada

- aluno: cria branch, implementa em commits pequenos e roda o gate local
- QA: protege a integracao com pipeline e evidencia
- TL: revisa compatibilidade tecnica e impacto cruzado

## Regra

Nada entra como pronto sem evidencia de validacao correspondente e sem rastreabilidade ate uma US ou enabler.
