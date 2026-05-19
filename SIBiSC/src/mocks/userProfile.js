// Mock data para UserProfilePage
export const mockUser = {
  id: 'user-001',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  unit: 'Biblioteca Central',
  joinDate: 'Janeiro de 2023',
  avatar: 'JS',
  phone: '(16) 3307-9400',
  membershipStatus: 'Ativo',
  readingPreferences: {
    categories: ['Romance', 'Naturalismo', 'Memorialismo'],
    authors: ['Machado de Assis', 'Graciliano Ramos', 'Carolina Maria de Jesus'],
    topics: ['literatura brasileira', 'cidade e sociedade', 'clássicos nacionais'],
    preferredUnit: 'Biblioteca Central',
  },
};

export const mockLoans = [
  {
    id: 'loan-001',
    bookId: 'b5',
    title: 'O Cortiço',
    author: 'Aluísio Azevedo',
    isbn: '978-85-359-0418-4',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dias
    borrowedDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 dias atrás
    status: 'active',
    coverColor: '#e8d5c4',
    unit: 'Biblioteca Cidade Aracy',
    renewalCount: 0,
    canRenew: true,
  },
  {
    id: 'loan-002',
    bookId: 'b3',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    isbn: '978-85-359-0376-7',
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
    bookId: 'b1',
    title: 'Memórias Póstumas de Brás Cubas',
    author: 'Machado de Assis',
    isbn: '978-85-359-0277-7',
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
    bookId: 'b6',
    title: 'Ensaio sobre a Cegueira',
    author: 'José Saramago',
    isbn: '978-85-359-0706-2',
    returnedDate: new Date('2026-03-15'),
    borrowedDate: new Date('2026-02-28'),
    daysHeld: 14,
    unit: 'Biblioteca Vila Prado',
    status: 'returned_on_time',
  },
  {
    id: 'hist-002',
    bookId: 'b2',
    title: 'Quarto de Despejo',
    author: 'Carolina Maria de Jesus',
    isbn: '978-85-333-0285-9',
    returnedDate: new Date('2026-02-28'),
    borrowedDate: new Date('2026-02-07'),
    daysHeld: 21,
    unit: 'Biblioteca Cidade Aracy',
    status: 'returned_on_time',
  },
  {
    id: 'hist-003',
    bookId: 'b4',
    title: 'Grande Sertao: Veredas',
    author: 'Joao Guimaraes Rosa',
    isbn: '978-85-209-1441-9',
    returnedDate: new Date('2026-02-10'),
    borrowedDate: new Date('2026-01-11'),
    daysHeld: 30,
    unit: 'BibCom UFSCar',
    status: 'returned_late',
    daysLate: 5,
  },
  {
    id: 'hist-004',
    bookId: 'b8',
    title: 'Sapiens: Uma Breve Historia da Humanidade',
    author: 'Yuval Noah Harari',
    isbn: '978-85-8057-469-3',
    returnedDate: new Date('2026-01-08'),
    borrowedDate: new Date('2025-12-15'),
    daysHeld: 24,
    unit: 'Biblioteca Central',
    status: 'returned_on_time',
  },
  {
    id: 'hist-005',
    bookId: 'b7',
    title: 'Vidas Secas',
    author: 'Graciliano Ramos',
    isbn: '978-85-359-0211-1',
    returnedDate: new Date('2025-12-10'),
    borrowedDate: new Date('2025-11-20'),
    daysHeld: 20,
    unit: 'Biblioteca Central',
    status: 'returned_on_time',
  },
];

export const mockFavorites = [
  {
    id: 'fav-001',
    bookId: 'b7',
    title: 'Vidas Secas',
    author: 'Graciliano Ramos',
    isbn: '978-85-359-0211-1',
    available: true,
    availableCount: 7,
    totalCount: 7,
    addedDate: new Date('2026-01-20'),
    lastBorrowed: new Date('2025-11-10'),
    coverColor: '#b8a89c',
  },
  {
    id: 'fav-002',
    bookId: 'b2',
    title: 'Quarto de Despejo',
    author: 'Carolina Maria de Jesus',
    isbn: '978-85-333-0285-9',
    available: true,
    availableCount: 3,
    totalCount: 3,
    addedDate: new Date('2025-12-15'),
    lastBorrowed: null,
    coverColor: '#a89080',
  },
  {
    id: 'fav-003',
    bookId: 'b4',
    title: 'Grande Sertao: Veredas',
    author: 'Joao Guimaraes Rosa',
    isbn: '978-85-209-1441-9',
    available: true,
    availableCount: 3,
    totalCount: 3,
    addedDate: new Date('2025-11-30'),
    lastBorrowed: new Date('2025-09-15'),
    coverColor: '#d4c4b8',
  },
  {
    id: 'fav-004',
    bookId: 'b8',
    title: 'Sapiens: Uma Breve Historia da Humanidade',
    author: 'Yuval Noah Harari',
    isbn: '978-85-8057-469-3',
    available: true,
    availableCount: 4,
    totalCount: 6,
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
