import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

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

function importProjectModule(relativePath) {
  return import(pathToFileURL(path.join(projectRoot, relativePath)).href);
}

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

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
  const routerContent = readProjectFile('src/routes/AppRouter.jsx');
  for (const route of [
    '/',
    '/home-mobile',
    '/noticias',
    '/noticias/:newsId',
    '/eventos',
    '/eventos/:eventId',
    '/catalogo',
    '/catalogo/:bookId',
    '/perfil',
  ]) {
    if (!routerContent.includes(route)) {
      failures.push(`rota critica nao encontrada em AppRouter.jsx: ${route}`);
    }
  }
}

const indexHtmlPath = path.join(projectRoot, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const indexHtmlContent = readProjectFile('index.html');
  for (const blockedToken of ['mcp.figma.com', 'html-to-design/capture.js']) {
    if (indexHtmlContent.includes(blockedToken)) {
      failures.push(`index.html contem script externo de captura/design: ${blockedToken}`);
    }
  }
}

const [
  { bookItems },
  { mockLoans, mockLoanHistory, mockFavorites },
  { mockHomeContent },
  { getRecommendations, getReaderJourney },
  { guidedAssistantQuestions, GUIDED_ASSISTANT_LIMIT_NOTICE },
  { SOFIA_CLAUDIA_FEEDBACK_ISSUE_URL, SOFIA_CLAUDIA_PRIVACY_NOTICE },
  { eventItems },
  { newsItems },
  { units },
] = await Promise.all([
  importProjectModule('src/mocks/books.js'),
  importProjectModule('src/mocks/userProfile.js'),
  importProjectModule('src/mocks/homePageMobileData.js'),
  importProjectModule('src/services/userProfileService.js'),
  importProjectModule('src/services/guidedAssistantService.js'),
  importProjectModule('src/services/feedbackService.js'),
  importProjectModule('src/mocks/events.js'),
  importProjectModule('src/mocks/news.js'),
  importProjectModule('src/mocks/units.js'),
]);

const expectedBookIds = new Set(Array.from({ length: 8 }, (_, index) => `b${index + 1}`));
const catalogById = new Map(bookItems.map((book) => [book.id, book]));
const catalogIds = new Set(catalogById.keys());
const unitIds = new Set(units.map((unit) => unit.id));
const routeTargets = new Set(['/catalogo', '/eventos', '/noticias', '/perfil', '/home-mobile']);

for (const expectedId of expectedBookIds) {
  if (!catalogIds.has(expectedId)) {
    failures.push(`catalogo sem ID canonico esperado: ${expectedId}`);
  }
}

for (const bookId of catalogIds) {
  if (!expectedBookIds.has(bookId)) {
    failures.push(`catalogo contem ID fora do contrato b1..b8: ${bookId}`);
  }
}

function getAvailability(book) {
  return book.inventory.reduce(
    (totals, item) => ({
      availableCount: totals.availableCount + item.available,
      totalCount: totals.totalCount + item.total,
    }),
    { availableCount: 0, totalCount: 0 }
  );
}

function assertKnownBookId(source, itemId, bookId) {
  if (!catalogIds.has(bookId)) {
    failures.push(`${source} referencia livro inexistente (${itemId} -> ${bookId})`);
  }
}

function normalizeForContract(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

function assertCatalogFieldsMatch(source, item, catalogBook) {
  for (const field of ['title', 'author', 'isbn']) {
    if (normalizeForContract(item[field]) !== normalizeForContract(catalogBook[field])) {
      failures.push(`${source} ${item.id} tem ${field} divergente do catalogo para ${catalogBook.id}`);
    }
  }
}

for (const book of bookItems) {
  for (const field of ['id', 'title', 'author', 'isbn', 'category', 'summary']) {
    if (!book[field]) {
      failures.push(`livro ${book.id ?? '(sem id)'} sem campo obrigatorio usado pela UI: ${field}`);
    }
  }

  if (!Array.isArray(book.inventory) || book.inventory.length === 0) {
    failures.push(`livro ${book.id} sem inventario para disponibilidade`);
    continue;
  }

  for (const inventoryItem of book.inventory) {
    if (!unitIds.has(inventoryItem.unitId)) {
      failures.push(`inventario do livro ${book.id} referencia unidade inexistente: ${inventoryItem.unitId}`);
    }
    if (inventoryItem.available > inventoryItem.total) {
      failures.push(`inventario do livro ${book.id} tem available maior que total na unidade ${inventoryItem.unitId}`);
    }
    for (const field of ['callNumber', 'shelf', 'distanceByNeighborhood']) {
      if (!inventoryItem[field]) {
        failures.push(`inventario do livro ${book.id} sem campo usado pela UI: ${field}`);
      }
    }
  }
}

for (const loan of mockLoans) {
  assertKnownBookId('emprestimos do perfil', loan.id, loan.bookId);
  const catalogBook = catalogById.get(loan.bookId);
  if (catalogBook) {
    assertCatalogFieldsMatch('emprestimo do perfil', loan, catalogBook);
  }
}

for (const historyItem of mockLoanHistory) {
  assertKnownBookId('historico do perfil', historyItem.id, historyItem.bookId);
  const catalogBook = catalogById.get(historyItem.bookId);
  if (catalogBook) {
    assertCatalogFieldsMatch('historico do perfil', historyItem, catalogBook);
  }
}

for (const favorite of mockFavorites) {
  assertKnownBookId('favoritos do perfil', favorite.id, favorite.bookId);

  const catalogBook = catalogById.get(favorite.bookId);
  if (!catalogBook) continue;

  assertCatalogFieldsMatch('favorito do perfil', favorite, catalogBook);

  const availability = getAvailability(catalogBook);
  if (favorite.availableCount !== availability.availableCount) {
    failures.push(
      `favorito ${favorite.id} tem availableCount ${favorite.availableCount}, esperado ${availability.availableCount}`
    );
  }
  if (favorite.totalCount !== availability.totalCount) {
    failures.push(`favorito ${favorite.id} tem totalCount ${favorite.totalCount}, esperado ${availability.totalCount}`);
  }
  if (favorite.available !== (availability.availableCount > 0)) {
    failures.push(`favorito ${favorite.id} tem status de disponibilidade divergente do catalogo`);
  }
}

for (const featuredBook of mockHomeContent.featuredBooks) {
  assertKnownBookId('destaques da Home mobile', featuredBook.id, featuredBook.id);
}

for (const section of mockHomeContent.sections) {
  if (section.linkTo && !routeTargets.has(section.linkTo)) {
    failures.push(`secao da Home mobile aponta para rota inexistente: ${section.id} -> ${section.linkTo}`);
  }

  for (const action of section.actions ?? []) {
    if (!routeTargets.has(action.path)) {
      failures.push(`acao da Home mobile aponta para rota inexistente: ${action.id} -> ${action.path}`);
    }
  }
}

const recommendations = await getRecommendations();
for (const recommendation of recommendations) {
  const catalogBook = catalogById.get(recommendation.bookId);

  if (recommendation.id !== recommendation.bookId) {
    failures.push(`recomendacao ${recommendation.id} deve usar id igual ao bookId canonico`);
  }

  assertKnownBookId('recomendacoes Feltrim Agents', recommendation.id, recommendation.bookId);

  if (!catalogBook) continue;

  const availability = getAvailability(catalogBook);
  if (recommendation.availableCount <= 0) {
    failures.push(`recomendacao ${recommendation.id} aponta livro sem exemplares disponiveis`);
  }
  if (recommendation.availableCount !== availability.availableCount) {
    failures.push(
      `recomendacao ${recommendation.id} tem availableCount ${recommendation.availableCount}, esperado ${availability.availableCount}`
    );
  }
  if (recommendation.totalCount !== availability.totalCount) {
    failures.push(
      `recomendacao ${recommendation.id} tem totalCount ${recommendation.totalCount}, esperado ${availability.totalCount}`
    );
  }
  if (recommendation.source !== 'catalogo-mock') {
    failures.push(`recomendacao ${recommendation.id} sem source catalogo-mock`);
  }
}

if (
  !SOFIA_CLAUDIA_FEEDBACK_ISSUE_URL.startsWith('https://github.com/RaFeltrim/sibisc-hub-cultural/issues/new') ||
  !SOFIA_CLAUDIA_FEEDBACK_ISSUE_URL.includes('template=feedback_sofia_claudia.md')
) {
  failures.push('URL de feedback Sofia/Claudia deve abrir GitHub Issues com template dedicado');
}

const feedbackTemplatePath = path.join(repoRoot, '.github/ISSUE_TEMPLATE/feedback_sofia_claudia.md');
if (fs.existsSync(feedbackTemplatePath)) {
  const feedbackTemplateContent = fs.readFileSync(feedbackTemplatePath, 'utf8');
  for (const token of [
    'Sofia / Claudia',
    'sem dados pessoais sensiveis',
    'tokens',
    'prints privados',
    'Severidade tecnica sugerida por QA',
  ]) {
    if (!feedbackTemplateContent.includes(token)) {
      failures.push(`template Sofia/Claudia sem aviso/campo esperado: ${token}`);
    }
  }
} else {
  failures.push('template Sofia/Claudia ausente em .github/ISSUE_TEMPLATE/feedback_sofia_claudia.md');
}

if (
  !SOFIA_CLAUDIA_PRIVACY_NOTICE.includes('Nao envie dados pessoais sensiveis') ||
  !SOFIA_CLAUDIA_PRIVACY_NOTICE.includes('tokens')
) {
  failures.push('aviso de privacidade do feedback deve bloquear dados pessoais sensiveis e tokens');
}

const readerJourney = await getReaderJourney();
if (readerJourney.publicRanking !== false) {
  failures.push('jornada do leitor deve declarar publicRanking false');
}

if (
  !readerJourney.prototypeNotice.includes('mocks locais') ||
  !readerJourney.prototypeNotice.includes('Nao ha ranking publico') ||
  !readerJourney.prototypeNotice.includes('persistencia real')
) {
  failures.push('jornada do leitor deve comunicar prototipo local, sem ranking publico e sem persistencia real');
}

for (const collectionName of ['trails', 'badges', 'personalGoals']) {
  const collection = readerJourney[collectionName];
  if (!Array.isArray(collection) || collection.length < 3) {
    failures.push(`jornada do leitor deve conter ao menos 3 itens em ${collectionName}`);
    continue;
  }

  for (const item of collection) {
    for (const field of ['id', 'title', 'description', 'progress', 'target', 'progressPercent']) {
      if (item[field] === undefined || item[field] === null || item[field] === '') {
        failures.push(`item de gamificacao sem campo ${field}: ${collectionName}/${item.id ?? '(sem id)'}`);
      }
    }
    if (item.progressPercent < 0 || item.progressPercent > 100) {
      failures.push(`item de gamificacao com progresso percentual invalido: ${collectionName}/${item.id}`);
    }
    if (collectionName === 'badges' && item.publicRanking !== false) {
      failures.push(`selo deve declarar publicRanking false: ${item.id}`);
    }
  }
}

if (guidedAssistantQuestions.length < 8 || guidedAssistantQuestions.length > 10) {
  failures.push(`assistente guiado deve ter de 8 a 10 perguntas, encontrado: ${guidedAssistantQuestions.length}`);
}

if (
  !GUIDED_ASSISTANT_LIMIT_NOTICE.includes('dados locais do prototipo') ||
  !GUIDED_ASSISTANT_LIMIT_NOTICE.includes('nao ha reserva real')
) {
  failures.push('texto base do assistente guiado deve declarar dados locais do prototipo e ausencia de reserva real');
}

for (const question of guidedAssistantQuestions) {
  for (const field of ['id', 'label', 'shortLabel', 'category', 'answer']) {
    if (!question[field]) {
      failures.push(`pergunta guiada sem campo obrigatorio: ${question.id ?? '(sem id)'} -> ${field}`);
    }
  }

  if (!question.answer?.source || !question.answer?.limit || !question.answer?.nextAction?.to) {
    failures.push(`pergunta guiada ${question.id} sem fonte, limite ou proxima acao`);
  }

  const questionRecommendations = question.answer?.recommendations ?? [];
  for (const item of questionRecommendations) {
    assertKnownBookId('pergunta guiada', question.id, item.bookId);
    const catalogBook = catalogById.get(item.bookId);

    if (!catalogBook) continue;

    const availability = getAvailability(catalogBook);
    if (item.id !== item.bookId) {
      failures.push(`pergunta guiada ${question.id} deve manter id igual ao bookId em ${item.bookId}`);
    }
    if (item.availableCount !== availability.availableCount || item.totalCount !== availability.totalCount) {
      failures.push(`pergunta guiada ${question.id} tem disponibilidade divergente do catalogo em ${item.bookId}`);
    }
    if (!item.reason || !item.source || !item.limit || !item.nextAction?.to?.includes(item.bookId)) {
      failures.push(`pergunta guiada ${question.id} tem recomendacao sem motivo, fonte, limite ou rota valida`);
    }
  }

  const references = question.answer?.references ?? [];
  for (const reference of references) {
    if (!reference.reason || !reference.source || !reference.limit || !reference.nextAction?.to) {
      failures.push(`pergunta guiada ${question.id} tem referencia sem motivo, fonte, limite ou rota`);
    }
  }
}

for (const event of eventItems) {
  for (const field of ['id', 'title', 'date', 'startTime', 'endTime', 'locationName', 'locationAddress', 'description']) {
    if (!event[field]) {
      failures.push(`evento ${event.id ?? '(sem id)'} sem campo obrigatorio para agenda/Calendar: ${field}`);
    }
  }
}

for (const newsItem of newsItems) {
  for (const field of ['id', 'title', 'date', 'category', 'summary', 'paragraphs']) {
    if (!newsItem[field]) {
      failures.push(`noticia ${newsItem.id ?? '(sem id)'} sem campo obrigatorio para UI: ${field}`);
    }
  }
  if (!Array.isArray(newsItem.paragraphs) || newsItem.paragraphs.length === 0) {
    failures.push(`noticia ${newsItem.id} sem paragrafo de detalhe`);
  }
}

const profilePageContent = readProjectFile('src/pages/UserProfilePage.jsx');
if (!profilePageContent.includes('../services/userProfileService')) {
  failures.push('UserProfilePage.jsx deve consumir userProfileService.js');
}
if (profilePageContent.includes('../mocks/userProfile')) {
  failures.push('UserProfilePage.jsx voltou a importar mocks de perfil diretamente');
}

const homePageContent = readProjectFile('src/pages/HomePage.jsx');
const feltrimAgentsFABPath = path.join(projectRoot, 'src/components/feltrim-agents/FeltrimAgentsFAB.jsx');
const feltrimAgentsFABContent = fs.existsSync(feltrimAgentsFABPath)
  ? fs.readFileSync(feltrimAgentsFABPath, 'utf8')
  : '';
if (!homePageContent.includes('getRecommendations') && !feltrimAgentsFABContent.includes('getRecommendations')) {
  failures.push('HomePage.jsx deve renderizar recomendacoes via getRecommendations()');
}

const feedbackFABPath = path.join(projectRoot, 'src/components/feedback/FeedbackFAB.jsx');
const feedbackFABContent = fs.existsSync(feedbackFABPath)
  ? fs.readFileSync(feedbackFABPath, 'utf8')
  : '';

if (!feedbackFABContent.includes('SOFIA_CLAUDIA_FEEDBACK_ISSUE_URL')) {
  failures.push('FeedbackFAB.jsx deve expor CTA de feedback Sofia/Claudia via GitHub Issues');
}

const homePageMobileContent = readProjectFile('src/pages/HomePageMobile.jsx');
const homePageMobileRedirectsHome =
  homePageMobileContent.includes('Navigate') &&
  (homePageMobileContent.includes('to="/"') || homePageMobileContent.includes("to='/'"));

if (!homePageContent.includes('FeedbackFAB')) {
  failures.push('HomePage.jsx deve expor CTA de feedback Sofia/Claudia via GitHub Issues');
}
if (!homePageMobileContent.includes('FeedbackFAB') && !homePageMobileRedirectsHome) {
  failures.push(
    'HomePageMobile.jsx deve expor CTA de feedback Sofia/Claudia via GitHub Issues ou redirecionar para /'
  );
}

if (!profilePageContent.includes('getReaderJourney') || !profilePageContent.includes('readerJourney')) {
  failures.push('UserProfilePage.jsx deve renderizar jornada do leitor demonstrativa');
}

const eventDetailContent = readProjectFile('src/pages/EventDetailPage.jsx');
if (!eventDetailContent.includes('noopener,noreferrer')) {
  failures.push('EventDetailPage.jsx deve abrir Google Calendar com noopener,noreferrer');
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

console.log('QA repository guard passou: estrutura minima, docs, rotas criticas e IDs canonicos estao consistentes.');
