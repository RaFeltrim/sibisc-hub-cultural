import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserProfilePage.module.css';
import {
  mockUser,
  mockLoans,
  mockLoanHistory,
  mockFavorites,
  mockNotificationPreferences,
  formatDate,
  daysUntilDue,
  renewBook,
  removeFavorite,
} from '../mocks/userProfile';

function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('reservas');
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    mockNotificationPreferences.dueDate
  );
  const [loans, setLoans] = useState(mockLoans);
  const [favorites, setFavorites] = useState(mockFavorites);

  const activeLoans = loans.filter((l) => l.status === 'active').length;

  const handleRenew = (loanId) => {
    if (renewBook(loanId)) {
      setLoans([...loans]);
    }
  };

  const handleRemoveFavorite = (favoriteId) => {
    if (removeFavorite(favoriteId)) {
      setFavorites([...favorites]);
    }
  };

  return (
    <div className={styles.container}>
      {/* User Header */}
      <section className={styles.userHeader}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>{mockUser.avatar}</div>
          <div className={styles.userInfo}>
            <h1>{mockUser.name}</h1>
            <p className={styles.userUnit}>{mockUser.unit}</p>
            <p className={styles.userEmail}>{mockUser.email}</p>
            <p className={styles.userSince}>Membro desde {mockUser.joinDate}</p>
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
          <p className={styles.settingHint}>
            Receberá alerta {mockNotificationPreferences.dueDate_days} dias antes da devolução
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className={styles.tabsNav}>
        <button
          className={`${styles.tab} ${activeTab === 'reservas' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('reservas')}
        >
          Empréstimos
          {activeLoans > 0 && <span className={styles.badge}>{activeLoans}</span>}
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
          {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
        </button>
      </div>

      {/* Tab Content - Empréstimos Ativos */}
      {activeTab === 'reservas' && (
        <section className={styles.tabContent}>
          <div className={styles.stack}>
            {loans.map((loan) => {
              const daysLeft = daysUntilDue(loan.dueDate);
              const isOverdue = daysLeft < 0;

              return (
                <div key={loan.id} className={`${styles.loanCard} ${isOverdue ? styles.loanCardOverdue : ''}`}>
                  <Link
                    to={`/catalogo/${loan.bookId}`}
                    className={styles.loanCardLink}
                  >
                    <div className={styles.loanCover} style={{ backgroundColor: loan.coverColor }} />
                    <div className={styles.loanInfo}>
                      <h3>{loan.title}</h3>
                      <p className={styles.author}>{loan.author}</p>
                      <p className={styles.isbn}>ISBN: {loan.isbn}</p>
                      <div
                        className={`${styles.dueBadge} ${
                          isOverdue ? styles.dueBadgeOverdue : styles.dueBadgeActive
                        }`}
                      >
                        {isOverdue
                          ? `⚠️ Atrasado por ${Math.abs(daysLeft)} dias`
                          : `📅 Devolve em ${daysLeft} dias`}
                      </div>
                      <p className={styles.dueDate}>{formatDate(loan.dueDate)}</p>
                    </div>
                  </Link>
                  {loan.canRenew && (
                    <button
                      className={styles.renewBtn}
                      onClick={() => handleRenew(loan.id)}
                      title="Renovar empréstimo por mais 14 dias"
                    >
                      🔄
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Tab Content - Histórico */}
      {activeTab === 'historico' && (
        <section className={styles.tabContent}>
          <div className={styles.timeline}>
            {mockLoanHistory.map((item) => (
              <Link
                key={item.id}
                to={`/catalogo/${item.bookId}`}
                className={styles.timelineItem}
              >
                <div className={styles.timelineMarker} />
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  <p className={styles.author}>{item.author}</p>
                  <p className={styles.isbn}>ISBN: {item.isbn}</p>
                  <div className={styles.timlineMeta}>
                    <span>📍 {item.unit}</span>
                    <span>📅 {formatDate(item.returnedDate)}</span>
                    <span>📚 {item.daysHeld} dias</span>
                    {item.status === 'returned_late' && (
                      <span className={styles.lateTag}>⚠️ Atrasado ({item.daysLate}d)</span>
                    )}
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
          {favorites.length > 0 ? (
            <div className={styles.favoritesList}>
              {favorites.map((fav) => (
                <Link
                  key={fav.id}
                  to={`/catalogo/${fav.bookId}`}
                  className={styles.favoriteCard}
                >
                  <div className={styles.favoriteInfo}>
                    <h3>{fav.title}</h3>
                    <p className={styles.author}>{fav.author}</p>
                    <p className={styles.isbn}>ISBN: {fav.isbn}</p>
                    <div className={styles.availabilityInfo}>
                      <div
                        className={`${styles.availabilityBadge} ${
                          fav.available ? styles.available : styles.unavailable
                        }`}
                      >
                        {fav.available
                          ? `✓ ${fav.availableCount} de ${fav.totalCount} disponíveis`
                          : `⏳ Indisponível (${fav.totalCount} total)`}
                      </div>
                      {fav.lastBorrowed && (
                        <p className={styles.lastBorrowed}>
                          Pego em {formatDate(fav.lastBorrowed)}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className={styles.favoriteBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFavorite(fav.id);
                    }}
                    title="Remover de favoritos"
                  >
                    ♥️
                  </button>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>📚 Nenhum favorito ainda</p>
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
