// Serviço para HomePageMobile — carrega dados com delay simulado
import { mockHomeContent } from '../mocks/homePageMobileData';

const MOCK_API_DELAY = 300;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Busca conteúdo da página inicial mobile
 * @returns {Promise<Object>} Conteúdo estruturado
 */
export const getHomepageContent = async () => {
  await delay(MOCK_API_DELAY);
  return { ...mockHomeContent };
};

/**
 * Busca livros em destaque
 * @param {number} limit - Número máximo de livros
 * @returns {Promise<Array>} Lista de livros destacados
 */
export const getFeaturedBooks = async (limit = 4) => {
  await delay(MOCK_API_DELAY);
  return mockHomeContent.featuredBooks.slice(0, limit);
};

/**
 * Busca próximos eventos
 * @param {number} limit - Número máximo de eventos
 * @returns {Promise<Array>} Lista de eventos
 */
export const getUpcomingEvents = async (limit = 3) => {
  await delay(MOCK_API_DELAY);
  return mockHomeContent.upcomingEvents.slice(0, limit);
};

/**
 * Busca últimas notícias
 * @param {number} limit - Número máximo de notícias
 * @returns {Promise<Array>} Lista de notícias
 */
export const getLatestNews = async (limit = 3) => {
  await delay(MOCK_API_DELAY);
  return mockHomeContent.latestNews.slice(0, limit);
};

/**
 * Busca notícias em destaque
 * @returns {Promise<Object>} Notícia principal
 */
export const getFeaturedNews = async () => {
  await delay(MOCK_API_DELAY);
  const featured = mockHomeContent.latestNews.find((n) => n.featured);
  return featured || mockHomeContent.latestNews[0];
};

/**
 * Busca biblioteca stats para hero
 * @returns {Promise<Object>} Estatísticas da rede
 */
export const getLibraryStats = async () => {
  await delay(MOCK_API_DELAY);
  return {
    units: 4,
    totalBooks: 45000,
    digitalBooks: 2000,
    activeMembers: 15000,
    monthlyVisitors: 3500,
  };
};

/**
 * Busca categorias de livros populares
 * @returns {Promise<Array>} Lista de categorias
 */
export const getPopularCategories = async () => {
  await delay(MOCK_API_DELAY);
  return [
    { id: 'fiction', name: 'Ficção', icon: '📖', count: 12000 },
    { id: 'education', name: 'Educação', icon: '📚', count: 8500 },
    { id: 'biography', name: 'Biografia', icon: '👤', count: 3200 },
    { id: 'history', name: 'História', icon: '📜', count: 5600 },
    { id: 'technology', name: 'Tecnologia', icon: '💻', count: 4100 },
    { id: 'children', name: 'Infantil', icon: '🎨', count: 6800 },
  ];
};

/**
 * Busca sugestões de busca
 * @returns {Promise<Array>} Lista de sugestões populares
 */
export const getSearchSuggestions = async () => {
  await delay(MOCK_API_DELAY);
  return [
    'Machado de Assis',
    'Clarice Lispector',
    'Jorge Amado',
    'Paulo Coelho',
    'Graciliano Ramos',
    'Aluísio Azevedo',
    'Guimarães Rosa',
    'Carlos Drummond de Andrade',
  ];
};

/**
 * Simula busca em tempo real
 * @param {string} query - Termo de busca
 * @returns {Promise<Array>} Resultados
 */
export const quickSearch = async (query) => {
  await delay(MOCK_API_DELAY);

  if (!query.trim()) {
    return [];
  }

  // Simula busca em múltiplos campos
  return mockHomeContent.featuredBooks.filter((book) => {
    const q = query.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q) || book.isbn.includes(q)
    );
  });
};

/**
 * Busca banners/destaques da homepage
 * @returns {Promise<Array>} Lista de banners
 */
export const getHomepageBanners = async () => {
  await delay(MOCK_API_DELAY);
  return [
    {
      id: 'banner-1',
      title: 'Leia gratuitamente',
      subtitle: 'Acesso a 2.000+ títulos digitais',
      cta: 'Explorar',
      link: '/catalogo',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 'banner-2',
      title: 'Sua comunidade lê',
      subtitle: 'Veja o que está sendo lido agora',
      cta: 'Ver populares',
      link: '/catalogo?sort=popular',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
  ];
};

/**
 * Busca depoimentos de usuários
 * @returns {Promise<Array>} Lista de depoimentos
 */
export const getUserTestimonials = async () => {
  await delay(MOCK_API_DELAY);
  return [
    {
      id: 'test-1',
      author: 'Maria Silva',
      role: 'Estudante',
      text: 'O SIBiSC facilitou muito meus estudos. Recomendo!',
      rating: 5,
    },
    {
      id: 'test-2',
      author: 'João Pedro',
      role: 'Professor',
      text: 'Ótima plataforma para complementar aulas.',
      rating: 5,
    },
    {
      id: 'test-3',
      author: 'Ana Costa',
      role: 'Aposentada',
      text: 'Descobri novos autores e histórias. Adorei!',
      rating: 4,
    },
  ];
};

/**
 * Busca eventos próximos com detalhes
 * @param {number} daysAhead - Dias à frente para buscar
 * @returns {Promise<Array>} Eventos filtrados
 */
export const getUpcomingEventsWithDetails = async (daysAhead = 30) => {
  await delay(MOCK_API_DELAY);
  const now = new Date();
  const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  return mockHomeContent.upcomingEvents.filter((event) => event.date >= now && event.date <= futureDate);
};
