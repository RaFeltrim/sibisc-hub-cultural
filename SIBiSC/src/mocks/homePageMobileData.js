// Mock data para HomePageMobile — dados já são carregados via services
// Este arquivo serve como referência do que é renderizado

export const mockHomeContent = {
  sections: [
    {
      id: 'hero',
      type: 'hero',
      title: 'Feltrim Agents',
      subtitle: 'Assistente guiado em protótipo para dúvidas, recomendações e orientação no SIBiSC.',
    },
    {
      id: 'quick-actions',
      type: 'actions',
      actions: [
        { id: 'catalog', code: 'CAT', label: 'Catálogo', path: '/catalogo' },
        { id: 'events', code: 'AGE', label: 'Agenda', path: '/eventos' },
        { id: 'news', code: 'NOT', label: 'Notícias', path: '/noticias' },
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
      id: 'b5',
      title: 'O Cortiço',
      author: 'Aluísio Azevedo',
      isbn: '978-85-359-0418-4',
      year: 1890,
      available: true,
      availableCount: 1,
    },
    {
      id: 'b3',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      isbn: '978-85-359-0376-7',
      year: 1899,
      available: true,
      availableCount: 5,
    },
    {
      id: 'b1',
      title: 'Memórias Póstumas de Brás Cubas',
      author: 'Machado de Assis',
      isbn: '978-85-359-0277-7',
      year: 1881,
      available: true,
      availableCount: 3,
    },
    {
      id: 'b4',
      title: 'Grande Sertao: Veredas',
      author: 'Joao Guimaraes Rosa',
      isbn: '978-85-209-1441-9',
      year: 1956,
      available: true,
      availableCount: 3,
    },
  ],

  upcomingEvents: [
    {
      id: 'e1',
      title: 'Hora do Conto Infantil',
      date: new Date('2026-06-03'),
      time: '14:00',
      location: 'Biblioteca Central',
      category: 'Infantil',
      attendees: 25,
    },
    {
      id: 'e2',
      title: 'Letramento Digital para a Terceira Idade',
      date: new Date('2026-06-05'),
      time: '18:30',
      location: 'Biblioteca Vila Prado',
      category: 'Educação',
      attendees: 15,
    },
    {
      id: 'e3',
      title: 'Clube do Livro: Vidas Secas',
      date: new Date('2026-06-09'),
      time: '10:00',
      location: 'Biblioteca Central',
      category: 'Clube do Livro',
      attendees: 12,
    },
  ],

  latestNews: [
    {
      id: 'n1',
      title: 'SIBiSC testa orientação digital para retirada de livros',
      excerpt: 'Usuários das bibliotecas de São Carlos podem consultar disponibilidade e receber orientação no protótipo.',
      date: new Date('2026-05-18'),
      category: 'Serviços',
      featured: true,
    },
    {
      id: 'n2',
      title: 'Biblioteca Central recebe doação de 3.000 volumes da USP',
      excerpt: 'Acervo técnico e científico amplia o acesso a obras de referência.',
      date: new Date('2026-05-14'),
      category: 'Acervo',
      featured: false,
    },
    {
      id: 'n3',
      title: 'Programação cultural de junho 2026 é divulgada',
      excerpt: 'Atividades gratuitas aproximam leitura, escolas e bibliotecas.',
      date: new Date('2026-05-11'),
      category: 'Eventos',
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
