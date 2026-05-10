# 🔒 Audit de Segurança — SIBiSC Repository

**Data:** 03 de Abril de 2026  
**Status:** ⚠️ **PROBLEMAS CRÍTICOS ENCONTRADOS**

---

## 🚨 Vulnerabilidades Críticas

### 1. CRÍTICO: `.env.example` com Credenciais Reais

**Severidade:** 🔴 CRÍTICA  
**Arquivo:** `SIBiSC/.env.example`  
**Problema:** Contém chave Supabase real publicada no repositório

```
VITE_SUPABASE_URL=https://vuhfazknlyqnphriilkw.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_UklsEfW9sJJP5ScGJItGVw_OhJRQ2Kf
```

**Impacto:**
- ⚠️ Chave Publishable exposta (usável para exploração de RLS)
- ⚠️ URL do projeto Supabase identificável
- ⚠️ Disponível em histórico Git públicamente

**Remediação:** IMEDIATA
1. [ ] Revogar credenciais Supabase no painel
2. [ ] Gerar novas credenciais
3. [ ] Atualizar `.env.example` com valores fictícios
4. [ ] Remover do histórico Git
5. [ ] Notificar segurança Supabase

---

### 2. SÉRIO: `node_modules/` Rastreado no Git

**Severidade:** 🟠 SÉRIO  
**Problema:** Diretório node_modules está sendo versionado

```
git ls-files SIBiSC/node_modules → 23,000+ arquivos
```

**Impacto:**
- 📦 Repo size inflado (provavelmente 100MB+)
- 🐛 Dificulta identificação de dependências reais
- 🔐 Possível vetor de ataque (malware em deps)
- 🐌 Clone/pull muito lento

**Status:** ✅ Já no `.gitignore` corretamente  
**Ação:** Remover do histórico

---

### 3. SÉRIO: `dist/` (Build Artifacts) Rastreado

**Severidade:** 🟠 SÉRIO  
**Problema:** Diretório dist/ está sendo versionado

```
git ls-files SIBiSC/dist → arquivos compilados
```

**Impacto:**
- 📁 Artifacts de build desnecessários no repo
- 🔄 Conflitos de merge em CI/CD
- ⚡ Desempenho ruim

**Status:** ✅ Já no `.gitignore` corretamente  
**Ação:** Remover do histórico

---

## ⚠️ Vulnerabilidades Médias

### 4. Sem Verificação Automatizada de Secrets

**Severidade:** 🟡 MÉDIO  
**Problema:** Não há TruffleHog ou similar na pipeline

**Impacto:**
- Difícil detectar secrets acidentalmente commitados
- Sem pre-commit hooks

**Solução:**
```bash
npm install -D husky lint-staged detect-secrets
npx husky install
```

---

### 5. Sem CODEOWNERS

**Severidade:** 🟡 MÉDIO  
**Problema:** Não há controle de quem revisa PRs sensíveis

**Solução:** Criar `.github/CODEOWNERS`

---

## ✅ Itens Seguros

| Aspecto | Status | Nota |
|---------|--------|------|
| `.env` ignorado | ✅ Correto | Arquivo real não commitado |
| `.env.local` ignorado | ✅ Correto | - |
| No `.gitignore` | ✅ Atualizado | (vimos agora) |
| API Keys em código | ✅ Nenhuma encontrada | Usa `import.meta.env` |
| Supabase client config | ✅ Seguro | Usa variáveis de ambiente |
| Senhas em código | ✅ Nenhuma encontrada | - |
| Private keys (*.pem, *.key) | ✅ Nenhuma encontrada | - |

---

## 🛠️ Ações Imediatas Necessárias

### Passo 1: Revogar Credenciais Supabase (URGENTE)
```bash
1. Abrir: https://app.supabase.com/
2. Project Settings → API
3. Revogar VITE_SUPABASE_PUBLISHABLE_KEY
4. Gerar nova chave
5. Atualizar em variáveis de ambiente reais
```

### Passo 2: Atualizar `.env.example` com valores fictícios
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_[PLACEHOLDER]
```

### Passo 3: Remover Credencial do Git History (BFG)
```bash
# Usar BFG Repo-Cleaner (mais seguro que git filter-branch)
bfg --replace-text credentials.txt --no-blob-protection .
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

**⚠️ Aviso:** Isto reescreve histórico. Notificar team.

### Passo 4: Instalar Detecção de Secrets
```bash
npm install -D detect-secrets husky pre-commit
npx husky install
echo "npm run detect-secrets" > .husky/pre-commit
```

### Passo 5: Criar CODEOWNERS
```bash
# .github/CODEOWNERS
* @RaFeltrim
src/lib/supabaseClient.js @RaFeltrim
.env* @RaFeltrim
```

---

## 📋 Security Checklist

### Código
- [x] Sem senhas em comentários
- [x] Sem API keys hardcoded
- [x] Sem tokens em código
- [x] Sem credenciais em variáveis globais
- [ ] Detectar-secrets instalado
- [ ] Pre-commit hooks configurado

### Repositório
- [x] `.env` ignorado
- [x] `.env.local` ignorado
- [ ] `.env.example` sem credenciais reais
- [ ] node_modules removido do histórico
- [ ] dist/ removido do histórico
- [ ] CODEOWNERS configurado
- [ ] Branch protection em main

### Dependências
- [ ] npm audit executado
- [ ] Vulnerabilidades críticas zeradas
- [ ] Dependências obsoletas atualizadas
- [ ] Lockfile versionado (package-lock.json)

### CI/CD
- [ ] Secrets em GitHub Secrets, não em código
- [ ] TruffleHog na pipeline
- [ ] npm audit na pipeline
- [ ] SAST (SonarQube/Snyk) configurado

---

## 🔐 Configuração Recomendada

### 1. GitHub Branch Protection (main)
```
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- Include administrators
```

### 2. GitHub Secrets
```
SUPABASE_URL = https://...
SUPABASE_ANON_KEY = sb_publishable_...
SUPABASE_SERVICE_KEY = [privado]
```

### 3. `.github/workflows/security.yml`
```yaml
name: Security Checks
on: [push, pull_request]
jobs:
  secrets:
    runs-on: ubuntu-latest
    steps:
      - uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
```

### 4. `package.json` scripts
```json
{
  "scripts": {
    "security:audit": "npm audit --audit-level=moderate",
    "security:check": "detect-secrets scan --baseline .secrets.baseline"
  }
}
```

---

## 📞 Próximos Passos

**IMEDIATO (hoje):**
1. [ ] Revogar Supabase credentials
2. [ ] Gerar novas credentials
3. [ ] Atualizar `.env.example`

**CURTO PRAZO (esta semana):**
1. [ ] Remover credencial do Git history
2. [ ] Remover node_modules do histórico
3. [ ] Remover dist/ do histórico
4. [ ] Instalar detect-secrets

**MÉDIO PRAZO (próximas 2 semanas):**
1. [ ] Configurar GitHub branch protection
2. [ ] Criar CODEOWNERS
3. [ ] Adicionar GitHub Secrets
4. [ ] Configurar CI/CD security checks

---

## 📚 Referências

- [GitHub: Managing Sensitive Data](https://docs.github.com/en/code-security)
- [TruffleHog: Secrets Detection](https://trufflesecurity.com/)
- [OWASP: Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Supabase: Security Best Practices](https://supabase.com/docs/guides/self-hosting)

---

**Auditoria realizada por:** Claude Code  
**Data:** 03 de Abril de 2026  
**Status:** Pendente de remediação
