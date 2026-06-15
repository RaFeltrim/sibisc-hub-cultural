import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import styles from './UserProfilePage.module.css';
import {
  getFavoritesWithStatus,
  getLoanHistory,
  getNotificationPreferences,
  getReaderJourney,
  getUserLoans,
  getUserProfile,
  formatDate,
  daysUntilDue,
  removeFavorite,
  renewLoan,
  updateNotificationPreferences,
} from '../services/userProfileService';
import { useAuth } from '../hooks/useAuth';

function getBookInitials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function ProgressMeter({ label, progress, target, progressPercent }) {
  const isComplete = progress >= target;
  const clampedProgress = Math.min(progress, target);
  const displayValue = isComplete ? `${target}/${target} concluído` : `${progress}/${target}`;
  const statusText = isComplete && progress > target ? `${progress} registros, meta ${target} concluída.` : '';

  return (
    <div className={styles.progressMeter}>
      <div className={styles.progressMeta}>
        <span>{label}</span>
        <strong>{displayValue}</strong>
      </div>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label={`${label}: ${progress} de ${target}${isComplete ? ', meta concluída' : ''}`}
        aria-valuemin="0"
        aria-valuemax={target}
        aria-valuenow={clampedProgress}
      >
        <span style={{ width: `${Math.min(progressPercent, 100)}%` }} />
      </div>
      {statusText ? <small className={styles.progressComplete}>{statusText}</small> : null}
    </div>
  );
}

function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('reservas');
  const [user, setUser] = useState(null);
  const [notificationPreferences, setNotificationPreferences] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loanHistory, setLoanHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [readerJourney, setReaderJourney] = useState(null);
  const [actionStatus, setActionStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const { user: authUser, signOut } = useAuth();

  const activeLoans = loans.filter((l) => l.status === 'active').length;

  useEffect(() => {
    let isMounted = true;

    async function loadProfileData() {
      setLoading(true);
      setLoadError('');

      try {
        const [profile, loanItems, historyItems, favoriteItems, preferences, journey] = await Promise.all([
          getUserProfile(),
          getUserLoans(),
          getLoanHistory(100, 0),
          getFavoritesWithStatus(),
          getNotificationPreferences(),
          getReaderJourney(),
        ]);

        if (!isMounted) return;

        setUser(profile);
        setLoans(loanItems);
        setLoanHistory(historyItems);
        setFavorites(favoriteItems);
        setNotificationPreferences(preferences);
        setReaderJourney(journey);
      } catch {
        if (isMounted) {
          setLoadError('Não foi possível carregar o perfil no momento.');
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
          ? 'Notificações de devolução ativadas com sucesso.'
          : 'Notificações de devolução desativadas com sucesso.'
      );
    } catch {
      setActionStatus('Não foi possível atualizar as notificações.');
    }
  };

  const handleRenew = async (loanId) => {
    const loan = loans.find((item) => item.id === loanId);

    try {
      const renewedLoan = await renewLoan(loanId);
      setLoans((currentLoans) =>
        currentLoans.map((item) => (item.id === renewedLoan.id ? { ...renewedLoan } : item))
      );
      setActionStatus(
        `Empréstimo de "${loan?.title ?? 'livro selecionado'}" renovado com sucesso.`
      );
      return;
    } catch {
      setActionStatus('Não foi possível renovar este empréstimo.');
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
      setActionStatus('Não foi possível remover este favorito.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch {
      setActionStatus('Erro ao fazer logout.');
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
        <div className={styles.profileHero}>
          <div className={styles.avatar} role="img" aria-label={`Perfil de ${user.name}`}>
            {user.avatar}
          </div>
          <div className={styles.profileIdentity}>
            <span className={styles.profileEyebrow}>Perfil do leitor</span>
            <h1>{user.name}</h1>
            <p className={styles.userUnit}>{user.unit}</p>
          </div>
        </div>

        <div className={styles.profilePanels}>
          <div className={`${styles.profilePanel} ${styles.panelContact}`}>
            <span className={styles.panelLabel}>Contato e vínculo</span>
            <p className={styles.userEmail}>{authUser?.email || user.email}</p>
            <p className={styles.userSince}>Membro desde {user.joinDate}</p>
            <button type="button" onClick={handleLogout} className={styles.logoutBtn} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--border-radius-md)', color: '#b91c1c', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}>
              Sair da Conta
            </button>
          </div>

          <div
            className={`${styles.profilePanel} ${styles.panelPreferences}`}
            aria-label="Preferências de leitura cadastradas"
          >
            <span className={styles.panelLabel}>Preferências para recomendações</span>
            <div className={styles.preferenceChips}>
              {user.readingPreferences.categories.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
          </div>

          <div className={`${styles.profilePanel} ${styles.settingsPanel}`}>
            <span className={styles.panelLabel}>Notificações</span>
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
        </div>
      </section>

      {actionStatus ? (
        <p className={styles.actionStatus} role="status" aria-live="polite">
          {actionStatus}
        </p>
      ) : null}

      {readerJourney ? (
        <section className={styles.readerJourney} aria-labelledby="reader-journey-title">
          <div className={styles.journeyHeader}>
            <p className={styles.journeyEyebrow}>Jornada do leitor</p>
            <h2 id="reader-journey-title">Progresso pessoal e trilhas culturais</h2>
            <p>Acompanhe seu progresso de leitura e conquistas com base nas suas atividades recentes.</p>
          </div>

          <div className={styles.journeyGrid} aria-label="Trilhas culturais pessoais">
            {readerJourney.trails.map((trail) => (
              <article key={trail.id} className={styles.journeyCard}>
                <h3>{trail.title}</h3>
                <p>{trail.description}</p>
                <ProgressMeter
                  label={trail.title}
                  progress={trail.progress}
                  target={trail.target}
                  progressPercent={trail.progressPercent}
                />
              </article>
            ))}
          </div>

          <div className={styles.badgesAndGoals}>
            <div className={styles.badgePanel}>
              <h3>Conquistas</h3>
              <div className={styles.badgeList}>
                {readerJourney.badges.map((badge) => (
                  <article key={badge.id} className={styles.badgeCard}>
                    <span className={badge.unlocked ? styles.badgeUnlocked : styles.badgePending}>
                      {badge.unlocked ? 'Liberado' : 'Em progresso'}
                    </span>
                    <h4>{badge.title}</h4>
                    <p>{badge.description}</p>
                    <ProgressMeter
                      label={badge.title}
                      progress={badge.progress}
                      target={badge.target}
                      progressPercent={badge.progressPercent}
                    />
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.goalPanel}>
              <h3>Metas individuais</h3>
              <div className={styles.goalList}>
                {readerJourney.personalGoals.map((goal) => (
                  <article key={goal.id} className={styles.goalCard}>
                    <h4>{goal.title}</h4>
                    <p>{goal.description}</p>
                    <ProgressMeter
                      label={goal.title}
                      progress={goal.progress}
                      target={goal.target}
                      progressPercent={goal.progressPercent}
                    />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.profileTabs} aria-label="Empréstimos, histórico e favoritos">
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

        <div
          id="profile-panel-loans"
          className={styles.tabContent}
          role="tabpanel"
          aria-labelledby="profile-tab-loans"
          hidden={activeTab !== 'reservas'}
        >
          <div className={styles.stack}>
            {loans.map((loan) => {
              const daysLeft = daysUntilDue(loan.dueDate);
              const isOverdue = daysLeft < 0;

              return (
                <article
                  key={loan.id}
                  className={`${styles.loanCard} ${isOverdue ? styles.loanCardOverdue : ''}`}
                >
                  <Link to={`/catalogo/${loan.bookId}`} className={styles.loanCardLink}>
                    <div className={styles.loanCover} aria-hidden="true">
                      {getBookInitials(loan.title)}
                    </div>
                    <div className={styles.loanInfo}>
                      <h2>{loan.title}</h2>
                      <p className={styles.author}>{loan.author}</p>
                      <p className={styles.isbn}>ISBN {loan.isbn}</p>
                      <div className={styles.loanMeta}>
                        <span
                          className={`${styles.dueBadge} ${
                            isOverdue ? styles.dueBadgeOverdue : styles.dueBadgeActive
                          }`}
                        >
                          {isOverdue
                            ? `Atrasado por ${Math.abs(daysLeft)} dias`
                            : `Devolve em ${daysLeft} dias`}
                        </span>
                        <span className={styles.dueDate}>{formatDate(loan.dueDate)}</span>
                      </div>
                    </div>
                  </Link>
                  {loan.canRenew ? (
                    <button
                      type="button"
                      className={styles.renewBtn}
                      onClick={() => handleRenew(loan.id)}
                      title="Renovar empréstimo por mais 14 dias"
                    >
                      Renovar empréstimo
                    </button>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>

        <div
          id="profile-panel-history"
          className={styles.tabContent}
          role="tabpanel"
          aria-labelledby="profile-tab-history"
          hidden={activeTab !== 'historico'}
        >
          <div className={styles.timeline}>
            {loanHistory.map((item) => (
              <Link
                key={item.id}
                to={`/catalogo/${item.bookId}`}
                className={styles.timelineItem}
              >
                <div className={styles.timelineRail} aria-hidden="true">
                  <span className={styles.timelineMarker} />
                </div>
                <div className={styles.timelineContent}>
                  <h2>{item.title}</h2>
                  <p className={styles.author}>{item.author}</p>
                  <p className={styles.isbn}>ISBN {item.isbn}</p>
                  <div className={styles.timelineMeta}>
                    <span>Unidade: {item.unit}</span>
                    <span>Devolução: {formatDate(item.returnedDate)}</span>
                    <span>Período: {item.daysHeld} dias</span>
                    {item.status === 'returned_late' ? (
                      <span className={styles.lateTag}>Atrasado ({item.daysLate}d)</span>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          id="profile-panel-favorites"
          className={styles.tabContent}
          role="tabpanel"
          aria-labelledby="profile-tab-favorites"
          hidden={activeTab !== 'favoritos'}
        >
          {favorites.length > 0 ? (
            <div className={styles.favoritesList}>
              {favorites.map((fav) => (
                <article key={fav.id} className={styles.favoriteCard}>
                  <Link to={`/catalogo/${fav.bookId}`} className={styles.favoriteLink}>
                    <div className={styles.favoriteInfo}>
                      <h2>{fav.title}</h2>
                      <p className={styles.author}>{fav.author}</p>
                      <p className={styles.isbn}>ISBN {fav.isbn}</p>
                      <div className={styles.availabilityInfo}>
                        <span
                          className={`${styles.availabilityBadge} ${
                            fav.available ? styles.available : styles.unavailable
                          }`}
                        >
                          {fav.available
                            ? `Disponível: ${fav.availableCount} de ${fav.totalCount}`
                            : `Indisponível (${fav.totalCount})`}
                        </span>
                        {fav.lastBorrowed ? (
                          <p className={styles.lastBorrowed}>
                            Retirado em {formatDate(fav.lastBorrowed)}
                          </p>
                        ) : null}
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
        </div>
      </section>
    </div>
  );
}

export default UserProfilePage;
