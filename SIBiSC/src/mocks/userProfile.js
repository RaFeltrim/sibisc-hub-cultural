// Mock data para UserProfilePage
export const mockUser = {
  id: 'user-001',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  unit: 'Biblioteca Central',
  joinDate: 'Janeiro de 2023',
  avatar: '👤',
  phone: '(16) 3307-9400',
  membershipStatus: 'Ativo',
};

export const mockLoans = [
  {
    id: 'loan-001',
    bookId: '1',
    title: 'O Cortiço',
    author: 'Aluísio Azevedo',
    isbn: '978-8525406555',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dias
    borrowedDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 dias atrás
    status: 'active',
    coverColor: '#e8d5c4',
    unit: 'Biblioteca Central',
    renewalCount: 0,
    canRenew: true,
  },
  {
    id: 'loan-002',
    bookId: '2',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    isbn: '978-8525404362',
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 dias
    borrowedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 dias atrás
    status: 'active',
    coverColor: '#d4a574',
    unit: 'Biblioteca Central',
    renewalCount: 1,
    canRenew: false,
  },
  {
    id: 'loan-003',
    bookId: '3',
    title: 'Memórias Póstumas de Brás Cubas',
    author: 'Machado de Assis',
    isbn: '978-8525406570',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrasado
    borrowedDate: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000), // 23 dias atrás
    status: 'overdue',
    coverColor: '#c4a4a4',
    unit: 'Biblioteca Central',
    renewalCount: 0,
    canRenew: false,
  },
];

export const mockLoanHistory = [
  {
    id: 'hist-001',
    bookId: '4',
    title: 'Quincas Borba',
    author: 'Machado de Assis',
    isbn: '978-8525406588',
    returnedDate: new Date('2026-03-15'),
    borrowedDate: new Date('2026-02-28'),
    daysHeld: 14,
    unit: 'Biblioteca Central',
    status: 'returned_on_time',
  },
  {
    id: 'hist-002',
    bookId: '5',
    title: 'Capitães da Areia',
    author: 'Jorge Amado',
    isbn: '978-8501051438',
    returnedDate: new Date('2026-02-28'),
    borrowedDate: new Date('2026-02-07'),
    daysHeld: 21,
    unit: 'Biblioteca Estadual',
    status: 'returned_on_time',
  },
  {
    id: 'hist-003',
    bookId: '6',
    title: 'Grande Sertão Veredas',
    author: 'Guimarães Rosa',
    isbn: '978-8535929935',
    returnedDate: new Date('2026-02-10'),
    borrowedDate: new Date('2026-01-11'),
    daysHeld: 30,
    unit: 'Biblioteca Municipal',
    status: 'returned_late',
    daysLate: 5,
  },
  {
    id: 'hist-004',
    bookId: '7',
    title: 'O Alienista',
    author: 'Machado de Assis',
    isbn: '978-8525406606',
    returnedDate: new Date('2026-01-08'),
    borrowedDate: new Date('2025-12-15'),
    daysHeld: 24,
    unit: 'Biblioteca Central',
    status: 'returned_on_time',
  },
  {
    id: 'hist-005',
    bookId: '8',
    title: 'Vidas Secas',
    author: 'Graciliano Ramos',
    isbn: '978-8525060024',
    returnedDate: new Date('2025-12-10'),
    borrowedDate: new Date('2025-11-20'),
    daysHeld: 20,
    unit: 'Biblioteca Estadual',
    status: 'returned_on_time',
  },
];

export const mockFavorites = [
  {
    id: 'fav-001',
    bookId: '9',
    title: 'São Bernardo',
    author: 'Graciliano Ramos',
    isbn: '978-8525060031',
    available: true,
    availableCount: 3,
    totalCount: 5,
    addedDate: new Date('2026-01-20'),
    lastBorrowed: new Date('2025-11-10'),
    coverColor: '#b8a89c',
  },
  {
    id: 'fav-002',
    bookId: '10',
    title: 'Vidas Secas',
    author: 'Graciliano Ramos',
    isbn: '978-8525060048',
    available: false,
    availableCount: 0,
    totalCount: 2,
    addedDate: new Date('2025-12-15'),
    lastBorrowed: null,
    coverColor: '#a89080',
  },
  {
    id: 'fav-003',
    bookId: '11',
    title: 'Macunaíma',
    author: 'Mário de Andrade',
    isbn: '978-8535914702',
    available: true,
    availableCount: 2,
    totalCount: 3,
    addedDate: new Date('2025-11-30'),
    lastBorrowed: new Date('2025-09-15'),
    coverColor: '#d4c4b8',
  },
  {
    id: 'fav-004',
    bookId: '12',
    title: 'O Auto da Compadecida',
    author: 'Ariano Suassuna',
    isbn: '978-8535931266',
    available: true,
    availableCount: 4,
    totalCount: 4,
    addedDate: new Date('2025-10-05'),
    lastBorrowed: new Date('2025-08-20'),
    coverColor: '#c8b8b0',
  },
];

export const mockNotificationPreferences = {
  dueDate: true,
  dueDate_days: 3, // Notificar 3 dias antes
  overdue: true,
  availableBook: true,
  newsAndEvents: false,
  recommendations: false,
  email: true,
  sms: false,
  push: true,
};

// Função auxiliar para formatar datas
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

// Função auxiliar para calcular dias até devolução
export const daysUntilDue = (dueDate) => {
  const now = new Date();
  const diffTime = dueDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Função para simular busca de histórico
export const getHistoryByYear = (year) => {
  return mockLoanHistory.filter((item) => item.returnedDate.getFullYear() === year);
};

// Função para simular renovação (mock)
export const renewBook = (loanId) => {
  const loan = mockLoans.find((l) => l.id === loanId);
  if (loan && loan.canRenew) {
    loan.renewalCount += 1;
    loan.dueDate = new Date(loan.dueDate.getTime() + 14 * 24 * 60 * 60 * 1000); // +14 dias
    loan.canRenew = loan.renewalCount < 2; // Max 2 renovações
    return true;
  }
  return false;
};

// Função para simular adição de favorito
export const addFavorite = (bookId, bookData) => {
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

// Função para simular remoção de favorito
export const removeFavorite = (favoriteId) => {
  const index = mockFavorites.findIndex((f) => f.id === favoriteId);
  if (index > -1) {
    mockFavorites.splice(index, 1);
    return true;
  }
  return false;
};
