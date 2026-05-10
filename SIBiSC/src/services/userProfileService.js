// Serviço de Profile do Usuário — com delay simulado para mock
import {
  mockUser,
  mockLoans,
  mockLoanHistory,
  mockFavorites,
  mockNotificationPreferences,
} from '../mocks/userProfile';

// Delay simulado para API (ms)
const MOCK_API_DELAY = 300;

// Simula uma chamada de API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Busca dados do perfil do usuário
 * @returns {Promise<Object>} Dados do usuário
 */
export const getUserProfile = async () => {
  await delay(MOCK_API_DELAY);
  return {
    ...mockUser,
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
  return [...mockLoans];
};

/**
 * Busca histórico de empréstimos
 * @param {number} limit - Número máximo de resultados
 * @param {number} offset - Deslocamento para paginação
 * @returns {Promise<Array>} Histórico de empréstimos
 */
export const getLoanHistory = async (limit = 10, offset = 0) => {
  await delay(MOCK_API_DELAY);
  return mockLoanHistory.slice(offset, offset + limit);
};

/**
 * Busca livros favoritos
 * @returns {Promise<Array>} Lista de favoritos
 */
export const getUserFavorites = async () => {
  await delay(MOCK_API_DELAY);
  return [...mockFavorites];
};

/**
 * Busca preferências de notificação
 * @returns {Promise<Object>} Preferências
 */
export const getNotificationPreferences = async () => {
  await delay(MOCK_API_DELAY);
  return { ...mockNotificationPreferences };
};

/**
 * Atualiza preferências de notificação
 * @param {Object} preferences - Novo objeto de preferências
 * @returns {Promise<Object>} Preferências atualizadas
 */
export const updateNotificationPreferences = async (preferences) => {
  await delay(MOCK_API_DELAY);
  Object.assign(mockNotificationPreferences, preferences);
  return { ...mockNotificationPreferences };
};

/**
 * Renova um empréstimo
 * @param {string} loanId - ID do empréstimo
 * @returns {Promise<Object>} Empréstimo renovado ou erro
 */
export const renewLoan = async (loanId) => {
  await delay(MOCK_API_DELAY);
  const loan = mockLoans.find((l) => l.id === loanId);

  if (!loan) {
    throw new Error('Empréstimo não encontrado');
  }

  if (!loan.canRenew) {
    throw new Error('Este empréstimo não pode ser renovado');
  }

  loan.renewalCount += 1;
  loan.dueDate = new Date(loan.dueDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  loan.canRenew = loan.renewalCount < 2;

  return loan;
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
  if (mockFavorites.some((f) => f.bookId === bookId)) {
    throw new Error('Este livro já está nos favoritos');
  }

  const newFavorite = {
    id: `fav-${Date.now()}`,
    bookId,
    ...bookData,
    addedDate: new Date(),
    available: true,
    availableCount: 1,
    totalCount: 1,
  };

  mockFavorites.push(newFavorite);
  return newFavorite;
};

/**
 * Remove um livro dos favoritos
 * @param {string} favoriteId - ID do favorito
 * @returns {Promise<boolean>} Sucesso da operação
 */
export const removeFavorite = async (favoriteId) => {
  await delay(MOCK_API_DELAY);
  const index = mockFavorites.findIndex((f) => f.id === favoriteId);

  if (index === -1) {
    throw new Error('Favorito não encontrado');
  }

  mockFavorites.splice(index, 1);
  return true;
};

/**
 * Busca estatísticas do usuário
 * @returns {Promise<Object>} Estatísticas
 */
export const getUserStatistics = async () => {
  await delay(MOCK_API_DELAY);

  const totalBorrowed = mockLoanHistory.length;
  const totalDaysReading = mockLoanHistory.reduce((sum, item) => sum + item.daysHeld, 0);
  const averageDaysPerBook = Math.round(totalDaysReading / totalBorrowed);

  return {
    totalBorrowed,
    totalDaysReading,
    averageDaysPerBook,
    currentLoans: mockLoans.length,
    totalFavorites: mockFavorites.length,
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

  return mockFavorites.map((fav) => ({
    ...fav,
    // Simula status variável
    available: Math.random() > 0.3,
    availableCount: Math.floor(Math.random() * 5),
  }));
};

/**
 * Busca recomendações baseadas em histórico
 * @returns {Promise<Array>} Livros recomendados
 */
export const getRecommendations = async () => {
  await delay(MOCK_API_DELAY);

  // Simula recomendações baseadas no histórico
  return [
    {
      id: 'rec-001',
      title: 'Iracema',
      author: 'José de Alencar',
      reason: 'Baseado em seu gosto por clássicos brasileiros',
      similarTo: 'O Cortiço',
    },
    {
      id: 'rec-002',
      title: 'A Hora da Estrela',
      author: 'Clarice Lispector',
      reason: 'Leitura rápida que você deve apreciar',
      similarTo: 'Vidas Secas',
    },
    {
      id: 'rec-003',
      title: 'Til',
      author: 'José de Alencar',
      reason: 'Sequência de Iracema',
      similarTo: 'Iracema',
    },
  ];
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
