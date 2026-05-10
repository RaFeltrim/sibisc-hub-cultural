// Mock data para HomePageMobile — dados já são carregados via services
// Este arquivo serve como referência do que é renderizado

export const mockHomeContent = {
  sections: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Bem-vindo ao SIBiSC',
      subtitle: 'Sua biblioteca municipal ao alcance da mão',
    },
    {
      id: 'quick-actions',
      type: 'actions',
      actions: [
        { id: 'catalog', icon: '📚', label: 'Catálogo', path: '/catalogo' },
        { id: 'events', icon: '📅', label: 'Agenda', path: '/eventos' },
        { id: 'news', icon: '📰', label: 'Notícias', path: '/noticias' },
      ],
    },
    {
      id: 'news-section',
      type: 'section',
      eyebrow: 'Novidades',
      title: 'Últimas notícias',
      linkTo: '/noticias',
      linkLabel: 'Ver mais',
    },
    {
      id: 'events-section',
      type: 'section',
      eyebrow: 'Agenda',
      title: 'Próximos encontros',
      linkTo: '/eventos',
      linkLabel: 'Ver agenda',
    },
    {
      id: 'books-section',
      type: 'section',
      eyebrow: 'Destaques',
      title: 'Livros em destaque',
      linkTo: '/catalogo',
      linkLabel: 'Explorar catálogo',
    },
  ],

  // Dados de exemplo que seriam carregados
  featuredBooks: [
    {
      id: '1',
      title: 'O Cortiço',
      author: 'Aluísio Azevedo',
      isbn: '978-8525406555',
      year: 1890,
      available: true,
      availableCount: 2,
    },
    {
      id: '2',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      isbn: '978-8525404362',
      year: 1899,
      available: true,
      availableCount: 3,
    },
    {
      id: '3',
      title: 'Memórias Póstumas de Brás Cubas',
      author: 'Machado de Assis',
      isbn: '978-8525406570',
      year: 1881,
      available: false,
      availableCount: 0,
    },
    {
      id: '4',
      title: 'Quincas Borba',
      author: 'Machado de Assis',
      isbn: '978-8525406588',
      year: 1891,
      available: true,
      availableCount: 1,
    },
  ],

  upcomingEvents: [
    {
      id: '1',
      title: 'Roda de leitura: Machado de Assis',
      date: new Date('2026-04-10'),
      time: '19:00',
      location: 'Biblioteca Central',
      category: 'Discussion',
      attendees: 12,
    },
    {
      id: '2',
      title: 'Workshop de Catalogação',
      date: new Date('2026-04-15'),
      time: '14:00',
      location: 'Biblioteca Estadual',
      category: 'Workshop',
      attendees: 8,
    },
    {
      id: '3',
      title: 'Sessão de Contação de Histórias',
      date: new Date('2026-04-12'),
      time: '10:30',
      location: 'Biblioteca Municipal',
      category: 'Children',
      attendees: 25,
    },
  ],

  latestNews: [
    {
      id: '1',
      title: 'Nova ala de leitura infantil abre na Biblioteca Central',
      excerpt: 'Com mais de 500 títulos, espaço foi designed para crianças até 12 anos.',
      date: new Date('2026-04-01'),
      category: 'Infrastructure',
      featured: true,
    },
    {
      id: '2',
      title: 'Programa de Leitura para Idosos ganha novos voluntários',
      excerpt: 'Iniciativa busca conectar livros e pessoas em comunidades de Sao Carlos.',
      date: new Date('2026-03-28'),
      category: 'Programs',
      featured: false,
    },
    {
      id: '3',
      title: 'Acervo digital do SIBiSC cresce 40% em 2026',
      excerpt: 'Base de dados agora conta com mais de 2.000 títulos em formato eletrônico.',
      date: new Date('2026-03-25'),
      category: 'Announcements',
      featured: false,
    },
  ],
};

// Função para formatar data
export const formatEventDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Função para formatar hora
export const formatEventTime = (timeString) => {
  return timeString; // Já vem formatado no mock
};
