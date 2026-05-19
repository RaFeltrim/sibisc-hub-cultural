// Serviço de Profile do Usuário — com delay simulado para mock
import {
  mockUser,
  mockLoans,
  mockLoanHistory,
  mockFavorites,
  mockNotificationPreferences,
  formatDate,
  daysUntilDue,
} from '../mocks/userProfile.js';
import { bookItems } from '../mocks/books.js';

// Delay simulado para API (ms)
const MOCK_API_DELAY = 300;

const profileLoans = mockLoans.map((loan) => ({ ...loan }));
const profileLoanHistory = mockLoanHistory.map((historyItem) => ({ ...historyItem }));
const profileFavorites = mockFavorites.map((favorite) => ({ ...favorite }));
const profileNotificationPreferences = { ...mockNotificationPreferences };

const cloneUserProfile = () => ({
  ...mockUser,
  readingPreferences: {
    ...mockUser.readingPreferences,
    categories: [...mockUser.readingPreferences.categories],
    authors: [...mockUser.readingPreferences.authors],
    topics: [...mockUser.readingPreferences.topics],
  },
});

// Simula uma chamada de API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getBookAvailability = (book) => ({
  availableCount: book.inventory.reduce((sum, item) => sum + item.available, 0),
  totalCount: book.inventory.reduce((sum, item) => sum + item.total, 0),
});

const getCatalogBookById = (bookId) => bookItems.find((book) => book.id === bookId);

export { formatDate, daysUntilDue };

const getRecommendationScore = (book, preferences) => {
  let score = 0;

  if (preferences.authors.includes(book.author)) score += 3;
  if (preferences.categories.includes(book.category)) score += 2;
  if (
    preferences.topics.some((topic) =>
      `${book.title} ${book.category} ${book.summary}`.toLowerCase().includes(topic.toLowerCase())
    )
  ) {
    score += 1;
  }

  return score;
};

const getRecommendationReason = (book, preferences) => {
  if (preferences.authors.includes(book.author)) {
    return `Autor presente nas preferências do cadastro: ${book.author}.`;
  }

  if (preferences.categories.includes(book.category)) {
    return `Categoria alinhada ao perfil de leitura: ${book.category}.`;
  }

  return 'Disponível no acervo mockado e próximo aos interesses informados.';
};

/**
 * Busca dados do perfil do usuário
 * @returns {Promise<Object>} Dados do usuário
 */
export const getUserProfile = async () => {
  await delay(MOCK_API_DELAY);
  return {
    ...cloneUserProfile(),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    isVerified: true,
  };
};

/**
 * Busca empréstimos ativos do usuário
 * @returns {Promise<Array>} Lista de empréstimos
 */
export const getUserLoans = async () => {
  await delay(MOCK_API_DELAY);
  return profileLoans.map((loan) => ({ ...loan }));
};

/**
 * Busca histórico de empréstimos
 * @param {number} limit - Número máximo de resultados
 * @param {number} offset - Deslocamento para paginação
 * @returns {Promise<Array>} Histórico de empréstimos
 */
export const getLoanHistory = async (limit = 10, offset = 0) => {
  await delay(MOCK_API_DELAY);
  return profileLoanHistory.slice(offset, offset + limit).map((historyItem) => ({ ...historyItem }));
};

/**
 * Busca livros favoritos
 * @returns {Promise<Array>} Lista de favoritos
 */
export const getUserFavorites = async () => {
  await delay(MOCK_API_DELAY);
  return profileFavorites.map((favorite) => ({ ...favorite }));
};

/**
 * Busca preferências de notificação
 * @returns {Promise<Object>} Preferências
 */
export const getNotificationPreferences = async () => {
  await delay(MOCK_API_DELAY);
  return { ...profileNotificationPreferences };
};

/**
 * Atualiza preferências de notificação
 * @param {Object} preferences - Novo objeto de preferências
 * @returns {Promise<Object>} Preferências atualizadas
 */
export const updateNotificationPreferences = async (preferences) => {
  await delay(MOCK_API_DELAY);
  Object.assign(profileNotificationPreferences, preferences);
  return { ...profileNotificationPreferences };
};

/**
 * Renova um empréstimo
 * @param {string} loanId - ID do empréstimo
 * @returns {Promise<Object>} Empréstimo renovado ou erro
 */
export const renewLoan = async (loanId) => {
  await delay(MOCK_API_DELAY);
  const loan = profileLoans.find((l) => l.id === loanId);

  if (!loan) {
    throw new Error('Empréstimo não encontrado');
  }

  if (!loan.canRenew) {
    throw new Error('Este empréstimo não pode ser renovado');
  }

  loan.renewalCount += 1;
  loan.dueDate = new Date(loan.dueDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  loan.canRenew = loan.renewalCount < 2;

  return { ...loan };
};

/**
 * Adiciona um livro aos favoritos
 * @param {string} bookId - ID do livro
 * @param {Object} bookData - Dados do livro
 * @returns {Promise<Object>} Favorito criado
 */
export const addFavorite = async (bookId, bookData) => {
  await delay(MOCK_API_DELAY);

  // Verifica se já existe
  if (profileFavorites.some((f) => f.bookId === bookId)) {
    throw new Error('Este livro já está nos favoritos');
  }

  const catalogBook = getCatalogBookById(bookId);
  const availability = catalogBook
    ? getBookAvailability(catalogBook)
    : { availableCount: 0, totalCount: 0 };

  const newFavorite = {
    id: `fav-${Date.now()}`,
    bookId,
    ...bookData,
    addedDate: new Date(),
    available: availability.availableCount > 0,
    availableCount: availability.availableCount,
    totalCount: availability.totalCount,
  };

  profileFavorites.push(newFavorite);
  return { ...newFavorite };
};

/**
 * Remove um livro dos favoritos
 * @param {string} favoriteId - ID do favorito
 * @returns {Promise<boolean>} Sucesso da operação
 */
export const removeFavorite = async (favoriteId) => {
  await delay(MOCK_API_DELAY);
  const index = profileFavorites.findIndex((f) => f.id === favoriteId);

  if (index === -1) {
    throw new Error('Favorito não encontrado');
  }

  profileFavorites.splice(index, 1);
  return true;
};

/**
 * Busca estatísticas do usuário
 * @returns {Promise<Object>} Estatísticas
 */
export const getUserStatistics = async () => {
  await delay(MOCK_API_DELAY);

  const totalBorrowed = profileLoanHistory.length;
  const totalDaysReading = profileLoanHistory.reduce((sum, item) => sum + item.daysHeld, 0);
  const averageDaysPerBook = Math.round(totalDaysReading / totalBorrowed);

  return {
    totalBorrowed,
    totalDaysReading,
    averageDaysPerBook,
    currentLoans: profileLoans.length,
    totalFavorites: profileFavorites.length,
    memberSince: new Date('2023-01-15'),
    daysAsMember: Math.floor((Date.now() - new Date('2023-01-15')) / (1000 * 60 * 60 * 24)),
  };
};

/**
 * Simula uma busca de livros favoritos com status de disponibilidade
 * @returns {Promise<Array>} Favoritos com status atual
 */
export const getFavoritesWithStatus = async () => {
  await delay(MOCK_API_DELAY);

  return profileFavorites.map((fav) => {
    const catalogBook = getCatalogBookById(fav.bookId);

    if (!catalogBook) {
      return {
        ...fav,
        available: false,
        availableCount: 0,
        totalCount: 0,
      };
    }

    const { availableCount, totalCount } = getBookAvailability(catalogBook);

    return {
      ...fav,
      available: availableCount > 0,
      availableCount,
      totalCount,
    };
  });
};

/**
 * Busca recomendações baseadas em histórico
 * @returns {Promise<Array>} Livros recomendados
 */
export const getRecommendations = async () => {
  await delay(MOCK_API_DELAY);

  const preferences = mockUser.readingPreferences;

  return bookItems
    .map((book) => {
      const availability = getBookAvailability(book);

      return {
        ...book,
        ...availability,
        score: getRecommendationScore(book, preferences),
      };
    })
    .filter((book) => book.availableCount > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      if (right.availableCount !== left.availableCount) return right.availableCount - left.availableCount;
      return left.title.localeCompare(right.title, 'pt-BR');
    })
    .slice(0, 3)
    .map(({ id, title, author, isbn, category, summary, availableCount, totalCount }) => ({
      id,
      bookId: id,
      title,
      author,
      isbn,
      category,
      reason: getRecommendationReason({ title, author, category, summary }, preferences),
      similarTo: mockLoanHistory.find((item) => item.author === author || item.bookId === id)?.title ?? null,
      availableCount,
      totalCount,
      source: 'catalogo-mock',
    }));
};

/**
 * Exporta dados do perfil como JSON
 * @returns {Promise<Object>} Dados completos do perfil
 */
export const exportProfileData = async () => {
  const [user, loans, history, favorites, prefs, stats] = await Promise.all([
    getUserProfile(),
    getUserLoans(),
    getLoanHistory(100, 0),
    getUserFavorites(),
    getNotificationPreferences(),
    getUserStatistics(),
  ]);

  return {
    user,
    loans,
    history,
    favorites,
    preferences: prefs,
    statistics: stats,
    exportDate: new Date().toISOString(),
  };
};
