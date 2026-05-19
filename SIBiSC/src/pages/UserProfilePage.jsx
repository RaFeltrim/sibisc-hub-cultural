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
      setActionStatus(
        `Renovação demonstrativa simulada para ${loan?.title ?? 'livro selecionado'}. Nenhuma operação oficial foi enviada à biblioteca.`
      );
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
        <div className={styles.prototypeNotice} role="note">
          <strong>Perfil demonstrativo</strong>
          <p>
            Nome, e-mail, preferências, histórico, favoritos, empréstimos e notificações são mocks locais
            para apresentação. Não há dados pessoais reais, persistência ou operação oficial de biblioteca.
          </p>
        </div>

        <div className={styles.userCard}>
          <div className={styles.avatar} role="img" aria-label={`Perfil de ${user.name}`}>
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

      {readerJourney ? (
        <section className={styles.readerJourney} aria-labelledby="reader-journey-title">
          <div className={styles.journeyHeader}>
            <p className={styles.journeyEyebrow}>Jornada do leitor</p>
            <h2 id="reader-journey-title">Progresso pessoal e trilhas culturais</h2>
            <p>{readerJourney.prototypeNotice}</p>
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
              <h3>Selos demonstrativos</h3>
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
      <section
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
                      title="Simular renovação demonstrativa por mais 14 dias"
                    >
                      Simular renovação
                    </button>
                  )}
                </div>
              );
            })}
          </div>
      </section>

      {/* Tab Content - Histórico */}
      <section
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

      {/* Tab Content - Favoritos */}
      <section
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
                      <p className={styles.isbn}>ISBN: {fav.isbn}</p>
                      <div className={styles.availabilityInfo}>
                        <div
                          className={`${styles.availabilityBadge} ${
                            fav.available ? styles.available : styles.unavailable
                          }`}
                        >
                          {fav.available
                            ? `Demo: ${fav.availableCount} de ${fav.totalCount}`
                            : `Demo: indisponível (${fav.totalCount})`}
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
    </div>
  );
}

export default UserProfilePage;
