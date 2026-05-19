import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import styles from './UserProfilePage.module.css';
import {
  getFavoritesWithStatus,
  getLoanHistory,
  getNotificationPreferences,
  getUserLoans,
  getUserProfile,
  formatDate,
  daysUntilDue,
  removeFavorite,
  renewLoan,
  updateNotificationPreferences,
} from '../services/userProfileService';

function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('reservas');
  const [user, setUser] = useState(null);
  const [notificationPreferences, setNotificationPreferences] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loanHistory, setLoanHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [actionStatus, setActionStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const activeLoans = loans.filter((l) => l.status === 'active').length;

  useEffect(() => {
    let isMounted = true;

    async function loadProfileData() {
      setLoading(true);
      setLoadError('');

      try {
        const [profile, loanItems, historyItems, favoriteItems, preferences] = await Promise.all([
          getUserProfile(),
          getUserLoans(),
          getLoanHistory(100, 0),
          getFavoritesWithStatus(),
          getNotificationPreferences(),
        ]);

        if (!isMounted) return;

        setUser(profile);
        setLoans(loanItems);
        setLoanHistory(historyItems);
        setFavorites(favoriteItems);
        setNotificationPreferences(preferences);
      } catch {
        if (isMounted) {
          setLoadError('Não foi possível carregar o Perfil neste protótipo.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProfileData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNotificationChange = async (checked) => {
    setNotificationPreferences((current) => ({
      ...(current ?? {}),
      dueDate: checked,
    }));

    try {
      const preferences = await updateNotificationPreferences({ dueDate: checked });
      setNotificationPreferences(preferences);
      setActionStatus(
        checked
          ? 'Notificações de devolução ativadas para este perfil de protótipo.'
          : 'Notificações de devolução desativadas para este perfil de protótipo.'
      );
    } catch {
      setActionStatus('Não foi possível atualizar as notificações no protótipo.');
    }
  };

  const handleRenew = async (loanId) => {
    const loan = loans.find((item) => item.id === loanId);

    try {
      const renewedLoan = await renewLoan(loanId);
      setLoans((currentLoans) =>
        currentLoans.map((item) => (item.id === renewedLoan.id ? { ...renewedLoan } : item))
      );
      setActionStatus(`Empréstimo renovado: ${loan?.title ?? 'livro selecionado'}. Confira a nova data de devolução.`);
      return;
    } catch {
      setActionStatus('Não foi possível renovar este empréstimo no protótipo.');
    }
  };

  const handleRemoveFavorite = async (favoriteId) => {
    const favorite = favorites.find((item) => item.id === favoriteId);

    try {
      await removeFavorite(favoriteId);
      const favoriteItems = await getFavoritesWithStatus();
      setFavorites(favoriteItems);
      setActionStatus(`${favorite?.title ?? 'Livro'} removido dos favoritos.`);
      return;
    } catch {
      setActionStatus('Não foi possível remover este favorito no protótipo.');
    }
  };

  if (loading) {
    return <LoadingState label="Carregando dados do perfil..." />;
  }

  if (loadError || !user || !notificationPreferences) {
    return (
      <ErrorState
        title="Perfil indisponível"
        message={loadError || 'Os dados do perfil não estão disponíveis no momento.'}
      />
    );
  }

  return (
    <div className={styles.container}>
      {/* User Header */}
      <section className={styles.userHeader}>
        <div className={styles.userCard}>
          <div className={styles.avatar} aria-label={`Perfil de ${user.name}`}>
            {user.avatar}
          </div>
          <div className={styles.userInfo}>
            <h1>{user.name}</h1>
            <p className={styles.userUnit}>{user.unit}</p>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userSince}>Membro desde {user.joinDate}</p>
            <div className={styles.preferenceSummary} aria-label="Preferências de leitura cadastradas">
              <strong>Preferências para recomendações</strong>
              <div className={styles.preferenceChips}>
                {user.readingPreferences.categories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <div className={styles.settingsCard}>
          <label className={styles.settingItem}>
            <input
              type="checkbox"
              checked={notificationPreferences.dueDate}
              onChange={(e) => handleNotificationChange(e.target.checked)}
              className={styles.checkbox}
            />
            <span>Receber notificações de devoluções</span>
          </label>
          <p className={styles.settingHint}>
            Receberá alerta {notificationPreferences.dueDate_days} dias antes da devolução
          </p>
        </div>
      </section>

      {actionStatus ? (
        <p className={styles.actionStatus} role="status" aria-live="polite">
          {actionStatus}
        </p>
      ) : null}

      {/* Tabs Navigation */}
      <div className={styles.tabsNav} role="tablist" aria-label="Seções do perfil">
        <button
          id="profile-tab-loans"
          type="button"
          role="tab"
          aria-selected={activeTab === 'reservas'}
          aria-controls="profile-panel-loans"
          className={`${styles.tab} ${activeTab === 'reservas' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('reservas')}
        >
          Empréstimos
          {activeLoans > 0 && <span className={styles.badge}>{activeLoans}</span>}
        </button>
        <button
          id="profile-tab-history"
          type="button"
          role="tab"
          aria-selected={activeTab === 'historico'}
          aria-controls="profile-panel-history"
          className={`${styles.tab} ${activeTab === 'historico' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('historico')}
        >
          Histórico
        </button>
        <button
          id="profile-tab-favorites"
          type="button"
          role="tab"
          aria-selected={activeTab === 'favoritos'}
          aria-controls="profile-panel-favorites"
          className={`${styles.tab} ${activeTab === 'favoritos' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('favoritos')}
        >
          Favoritos
          {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
        </button>
      </div>

      {/* Tab Content - Empréstimos Ativos */}
      {activeTab === 'reservas' && (
        <section
          id="profile-panel-loans"
          className={styles.tabContent}
          role="tabpanel"
          aria-labelledby="profile-tab-loans"
        >
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
                      <h2>{loan.title}</h2>
                      <p className={styles.author}>{loan.author}</p>
                      <p className={styles.isbn}>ISBN: {loan.isbn}</p>
                      <div
                        className={`${styles.dueBadge} ${
                          isOverdue ? styles.dueBadgeOverdue : styles.dueBadgeActive
                        }`}
                      >
                        {isOverdue
                          ? `Atrasado por ${Math.abs(daysLeft)} dias`
                          : `Devolve em ${daysLeft} dias`}
                      </div>
                      <p className={styles.dueDate}>{formatDate(loan.dueDate)}</p>
                    </div>
                  </Link>
                  {loan.canRenew && (
                    <button
                      type="button"
                      className={styles.renewBtn}
                      onClick={() => handleRenew(loan.id)}
                      title="Renovar empréstimo por mais 14 dias"
                    >
                      Renovar
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
        <section
          id="profile-panel-history"
          className={styles.tabContent}
          role="tabpanel"
          aria-labelledby="profile-tab-history"
        >
          <div className={styles.timeline}>
            {loanHistory.map((item) => (
              <Link
                key={item.id}
                to={`/catalogo/${item.bookId}`}
                className={styles.timelineItem}
              >
                <div className={styles.timelineMarker} />
                <div className={styles.timelineContent}>
                  <h2>{item.title}</h2>
                  <p className={styles.author}>{item.author}</p>
                  <p className={styles.isbn}>ISBN: {item.isbn}</p>
                  <div className={styles.timlineMeta}>
                    <span>Unidade: {item.unit}</span>
                    <span>Devolução: {formatDate(item.returnedDate)}</span>
                    <span>Período: {item.daysHeld} dias</span>
                    {item.status === 'returned_late' && (
                      <span className={styles.lateTag}>Atrasado ({item.daysLate}d)</span>
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
        <section
          id="profile-panel-favorites"
          className={styles.tabContent}
          role="tabpanel"
          aria-labelledby="profile-tab-favorites"
        >
          {favorites.length > 0 ? (
            <div className={styles.favoritesList}>
              {favorites.map((fav) => (
                <article key={fav.id} className={styles.favoriteCard}>
                  <Link to={`/catalogo/${fav.bookId}`} className={styles.favoriteLink}>
                    <div className={styles.favoriteInfo}>
                      <h2>{fav.title}</h2>
                      <p className={styles.author}>{fav.author}</p>
                      <p className={styles.isbn}>ISBN: {fav.isbn}</p>
                      <div className={styles.availabilityInfo}>
                        <div
                          className={`${styles.availabilityBadge} ${
                            fav.available ? styles.available : styles.unavailable
                          }`}
                        >
                          {fav.available
                            ? `Disponível: ${fav.availableCount} de ${fav.totalCount}`
                            : `Indisponível: ${fav.totalCount} exemplares`}
                        </div>
                        {fav.lastBorrowed && (
                          <p className={styles.lastBorrowed}>
                            Retirado em {formatDate(fav.lastBorrowed)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                  <button
                    type="button"
                    className={styles.favoriteBtn}
                    onClick={() => handleRemoveFavorite(fav.id)}
                    title="Remover de favoritos"
                  >
                    Remover
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Nenhum favorito cadastrado. Use o catálogo para salvar livros e receber sugestões melhores.</p>
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
