Aqui está a  **Documentação Master Consolidada V1.1** , integrada com todos os elementos técnicos, a lógica de negócio detalhada e os componentes de "última milha" (Seed, Env e CI/CD) necessários para a autonomia total do **Antigravity** sob o  **Feltrim’s Framework** .

Este conteúdo deve ser guardado no ficheiro `_docs/STUDY_SYNC_MASTER.md` do teu projeto.

---

# 🎓 STUDY-SYNC: DOCUMENTAÇÃO MASTER (V1.1)

**Projeto:** Ecossistema de Produtividade "Single-Player to Multiplayer"

**Contexto:** Disciplina SSC0961 - ICMC-USP | Profa. Dra. Lina Garcés

**Líder Técnico/QA:** Rafael Feltrim (Sub.)

---

## 1. 🎯 VISÃO E REQUISITOS

O **Study-Sync** resolve a desorganização e a procrastinação académica ao tornar visível o impacto do esforço individual no sucesso coletivo.

### Requisitos Funcionais (MVP)

* **RF01 (Timer de Foco):** Pomodoro reativo que isola distrações (Blur effect).
* **RF02 (Cálculo de Criticidade):** Algoritmo que identifica gargalos de projeto.
* **RF03 (Alertas de Impacto):** Mensagens: "Adiar isto hoje atrasará o grupo em X horas".
* **RF05 (Sync de Progresso Passivo):** Avatares com efeito *Glow* em tempo real.
* **RF06 (Merge de Calendários):** Agendamento inteligente com sigilo de dados privados.
* **RF07 (Dashboard de Saúde):** Indicador visual de "Fôlego" (Ritmo vs. Prazo).

---

## 🏗️ 2. ARQUITETURA E STACK TÉCNICA

* **Frontend:** React 19 (React Compiler) + TypeScript + CSS Modules.
* **Design System:** Liquid Glass (Glassmorphism), Thumb Zone (44px), Progressive Disclosure.
* **Backend:** Supabase Edge Functions (Deno/TS).
* **Base de Dados:** PostgreSQL com RLS (Row Level Security).
* **Realtime:** Supabase Realtime (WebSockets) via `postgres_changes`.

---

## 🗄️ 3. ESQUEMA DE BASE DE DADOS (DDL)

**SQL**

```
-- Extensões e Tipos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE task_status AS ENUM ('backlog', 'todo', 'doing', 'done');

-- Tabelas
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.tasks (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  parent_task_id uuid REFERENCES tasks(id) ON DELETE SET NULL, 
  title text NOT NULL,
  status task_status DEFAULT 'todo',
  due_date timestamp with time zone NOT NULL,
  criticality_score float DEFAULT 0,
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.focus_sessions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  is_active boolean DEFAULT true,
  start_at timestamp with time zone DEFAULT now()
);

-- Segurança e Realtime
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks, public.focus_sessions;
```

---

## 🧠 4. INTELIGÊNCIA DE FLUXO (EDGE FUNCTION)

**Lógica de Cálculo (`criticality_score`):**

* **Peso de Gargalo (60%):** Contagem de tarefas dependentes (`parent_task_id`).
* **Peso de Urgência (40%):** Proximidade do `due_date`.
* **Output:** Score entre 0.0 e 1.0 que define a cor do card (Verde -> Vermelho).

---

## 🧪 5. ESTRATÉGIA DE QUALIDADE (QA)

* **Stress Test:** Validado para 50 atualizações simultâneas com latência < 800ms E2E.
* **Cenário BDD Principal:**
  * *Dado* que um membro ativa o timer;
  * *Quando* o evento chega via WebSocket;
  * *Então* o avatar no Dashboard emite o efeito Glow em < 100ms.

---

## 🚀 6. ÚLTIMA MILHA (CONFIGURAÇÃO E DEPLOY)

### Variáveis de Ambiente (`.env.example`)

**Bash**

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
VITE_EDGE_FUNCTION_URL=https://seu-projeto.functions.supabase.co
```

### Script de Seed (Demonstração Lina)

**SQL**

```
INSERT INTO public.tasks (group_id, title, status, due_date, criticality_score)
VALUES 
  ('grp-usp-001', 'Análise de Requisitos', 'done', now() - interval '2 days', 0.1),
  ('grp-usp-001', 'Implementação Realtime', 'doing', now() + interval '4 hours', 0.92),
  ('grp-usp-001', 'Apresentação Final', 'todo', '2026-03-10 08:00:00', 0.98);
```

---

## 🤖 7. PROTOCOLO ANTIGRAVITY (FELTRIM'S FRAMEWORK)

**Prompt de Execução:**

> "Ativa o **Modo Turbo** sob o  **Feltrim’s Framework** . Executa o projeto **Study-Sync** com autonomia total baseada no `STUDY_SYNC_MASTER.md`.
>
> 1. Cria a branch `delivery/2-arquitetura-db`, executa as migrations e o seed.
> 2. Cria a branch `delivery/3-desenvolvimento-teste`, implementa o Dashboard React 19 e a Edge Function.
> 3. Realiza o Auto-QA: corre a suíte de testes e o stress test. Se falhar, corrige antes do commit.
> 4. Merge final para a `main` e gera o relatório de latência para a Profa. Lina."

---

## ✅ CHECKLIST FINAL DE QA (PARA O RAFAEL)

* [ ] Migrations aplicadas com sucesso no Supabase.
* [ ] Políticas de RLS impedem acesso a dados de outros grupos.
* [ ] Edge Function atualiza o `criticality_score` no `INSERT`.
* [ ] Dashboard exibe efeito Glow nos avatares via Realtime.
* [ ] O botão "Nova Reunião" respeita a Thumb Zone (mínimo 44px).
* [ ] O Relatório de Stress Test aponta latência < 1s.

---

**Com isto, o plano está fechado.** O Antigravity tem agora todos os dados técnicos, de infraestrutura e de qualidade para terminar o projeto de forma autónoma hoje.

**Desejas que eu fique em standby enquanto disparas o primeiro comando no VS Code?**
