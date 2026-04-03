import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import BookCard from '../components/cards/BookCard';
import styles from './UserProfilePage.module.css';

// Mock user data
const mockUserData = {
  id: 'user-001',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  unit: 'Biblioteca Central',
  joinDate: 'Janeiro de 2023',
  avatar: '👤',
};

// Mock reservas (empréstimos ativos)
const mockReservas = [
  {
    id: 'loan-001',
    bookId: '1',
    title: 'O Cortiço',
    author: 'Aluísio Azevedo',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dias de agora
    status: 'active',
    coverColor: '#e8d5c4',
  },
  {
    id: 'loan-002',
    bookId: '2',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 dias de agora
    status: 'active',
    coverColor: '#d4a574',
  },
  {
    id: 'loan-003',
    bookId: '3',
    title: 'Memórias Póstumas de Brás Cubas',
    author: 'Machado de Assis',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrasado
    status: 'overdue',
    coverColor: '#c4a4a4',
  },
];

// Mock histórico
const mockHistorico = [
  {
    id: 'hist-001',
    bookId: '4',
    title: 'Quincas Borba',
    author: 'Machado de Assis',
    returnedDate: new Date('2026-03-15'),
    daysHeld: 14,
  },
  {
    id: 'hist-002',
    bookId: '5',
    title: 'Capitães da Areia',
    author: 'Jorge Amado',
    returnedDate: new Date('2026-02-28'),
    daysHeld: 21,
  },
  {
    id: 'hist-003',
    bookId: '6',
    title: 'Grande Sertão Veredas',
    author: 'Guimarães Rosa',
    returnedDate: new Date('2026-02-10'),
    daysHeld: 30,
  },
];

// Mock favoritos
const mockFavoritos = [
  {
    id: 'fav-001',
    bookId: '7',
    title: 'O Alienista',
    author: 'Machado de Assis',
    available: true,
    addedDate: new Date('2026-01-20'),
  },
  {
    id: 'fav-002',
    bookId: '8',
    title: 'Vidas Secas',
    author: 'Graciliano Ramos',
    available: false,
    addedDate: new Date('2025-12-15'),
  },
  {
    id: 'fav-003',
    bookId: '9',
    title: 'São Bernardo',
    author: 'Graciliano Ramos',
    available: true,
    addedDate: new Date('2025-11-30'),
  },
];

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function daysUntilDue(dueDate) {
  const now = new Date();
  const diffTime = dueDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('reservas');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className={styles.container}>
      {/* User Header */}
      <section className={styles.userHeader}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>{mockUserData.avatar}</div>
          <div className={styles.userInfo}>
            <h1>{mockUserData.name}</h1>
            <p className={styles.userUnit}>{mockUserData.unit}</p>
            <p className={styles.userEmail}>{mockUserData.email}</p>
            <p className={styles.userSince}>Membro desde {mockUserData.joinDate}</p>
          </div>
        </div>

        {/* Settings Card */}
        <div className={styles.settingsCard}>
          <label className={styles.settingItem}>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className={styles.checkbox}
            />
            <span>Receber notificações de devoluções</span>
          </label>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className={styles.tabsNav}>
        <button
          className={`${styles.tab} ${activeTab === 'reservas' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('reservas')}
        >
          Empréstimos Ativos
          {mockReservas.filter((r) => r.status === 'active').length > 0 && (
            <span className={styles.badge}>
              {mockReservas.filter((r) => r.status === 'active').length}
            </span>
          )}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'historico' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('historico')}
        >
          Histórico
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'favoritos' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('favoritos')}
        >
          Favoritos
          {mockFavoritos.length > 0 && <span className={styles.badge}>{mockFavoritos.length}</span>}
        </button>
      </div>

      {/* Tab Content - Empréstimos Ativos */}
      {activeTab === 'reservas' && (
        <section className={styles.tabContent}>
          <div className={styles.stack}>
            {mockReservas.map((reserva) => {
              const daysLeft = daysUntilDue(reserva.dueDate);
              const isOverdue = daysLeft < 0;

              return (
                <Link
                  key={reserva.id}
                  to={`/catalogo/${reserva.bookId}`}
                  className={`${styles.loanCard} ${isOverdue ? styles.loanCardOverdue : ''}`}
                >
                  <div className={styles.loanCover} style={{ backgroundColor: reserva.coverColor }} />
                  <div className={styles.loanInfo}>
                    <h3>{reserva.title}</h3>
                    <p className={styles.author}>{reserva.author}</p>
                    <div
                      className={`${styles.dueBadge} ${
                        isOverdue ? styles.dueBadgeOverdue : styles.dueBadgeActive
                      }`}
                    >
                      {isOverdue
                        ? `Atrasado por ${Math.abs(daysLeft)} dias`
                        : `Devolve em ${daysLeft} dias`}
                    </div>
                    <p className={styles.dueDate}>{formatDate(reserva.dueDate)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Tab Content - Histórico */}
      {activeTab === 'historico' && (
        <section className={styles.tabContent}>
          <div className={styles.timeline}>
            {mockHistorico.map((item) => (
              <Link
                key={item.id}
                to={`/catalogo/${item.bookId}`}
                className={styles.timelineItem}
              >
                <div className={styles.timelineMarker} />
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  <p className={styles.author}>{item.author}</p>
                  <div className={styles.timlineMeta}>
                    <span>Devolvido em {formatDate(item.returnedDate)}</span>
                    <span>Mantido por {item.daysHeld} dias</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Tab Content - Favoritos */}
      {activeTab === 'favoritos' && (
        <section className={styles.tabContent}>
          {mockFavoritos.length > 0 ? (
            <div className={styles.favoritesList}>
              {mockFavoritos.map((fav) => (
                <Link
                  key={fav.id}
                  to={`/catalogo/${fav.bookId}`}
                  className={styles.favoriteCard}
                >
                  <div className={styles.favoriteInfo}>
                    <h3>{fav.title}</h3>
                    <p className={styles.author}>{fav.author}</p>
                    <div
                      className={`${styles.availabilityBadge} ${
                        fav.available ? styles.available : styles.unavailable
                      }`}
                    >
                      {fav.available ? '✓ Disponível' : '⏳ Indisponível'}
                    </div>
                  </div>
                  <button className={styles.favoriteBtn} onClick={(e) => e.preventDefault()}>
                    ♥️
                  </button>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Nenhum favorito ainda</p>
              <Link to="/catalogo" className={styles.emptyStateLink}>
                Explorar catálogo
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default UserProfilePage;
