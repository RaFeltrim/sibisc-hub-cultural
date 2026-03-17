import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const repoRoot = path.resolve(projectRoot, '..');

const requiredFiles = [
  'README.md',
  'docs/INDEX.md',
  'docs/devops/pipeline_ci_cd.md',
  'docs/qa/estrategia_shift_left.md',
  'docs/frontend/handoff_figma_lovable.md',
  'docs/governance/fluxo_de_branches_e_commits.md',
  'src/routes/AppRouter.jsx',
  'src/lib/supabaseClient.js',
  '.env.example',
];

const failures = [];

function assertFile(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`arquivo obrigatorio ausente: ${relativePath}`);
  }
}

requiredFiles.forEach(assertFile);

const envExamplePath = path.join(projectRoot, '.env.example');
if (fs.existsSync(envExamplePath)) {
  const envContent = fs.readFileSync(envExamplePath, 'utf8');
  for (const variable of ['VITE_SUPABASE_URL=', 'VITE_SUPABASE_PUBLISHABLE_KEY=']) {
    if (!envContent.includes(variable)) {
      failures.push(`variavel obrigatoria ausente em .env.example: ${variable}`);
    }
  }
}

const routerPath = path.join(projectRoot, 'src/routes/AppRouter.jsx');
if (fs.existsSync(routerPath)) {
  const routerContent = fs.readFileSync(routerPath, 'utf8');
  for (const route of ['/noticias', '/eventos', '/catalogo']) {
    if (!routerContent.includes(route)) {
      failures.push(`rota critica nao encontrada em AppRouter.jsx: ${route}`);
    }
  }
}

const indexDocPath = path.join(projectRoot, 'docs/INDEX.md');
if (fs.existsSync(indexDocPath)) {
  const indexContent = fs.readFileSync(indexDocPath, 'utf8');
  for (const doc of [
    'governance/fluxo_de_branches_e_commits.md',
    'devops/pipeline_ci_cd.md',
    'qa/estrategia_shift_left.md',
  ]) {
    if (!indexContent.includes(doc)) {
      failures.push(`documentacao nao indexada: ${doc}`);
    }
  }
}

const prTemplatePath = path.join(repoRoot, '.github/PULL_REQUEST_TEMPLATE.md');
if (fs.existsSync(prTemplatePath)) {
  const prTemplateContent = fs.readFileSync(prTemplatePath, 'utf8');
  for (const token of ['Priority', 'npm run qa:ci', 'Jira card']) {
    if (!prTemplateContent.includes(token)) {
      failures.push(`pull request template sem campo esperado: ${token}`);
    }
  }
} else {
  failures.push('template de PR ausente em .github/PULL_REQUEST_TEMPLATE.md');
}

if (failures.length) {
  console.error('\nQA repository guard falhou:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('QA repository guard passou: estrutura minima, docs e rotas criticas estao consistentes.');
