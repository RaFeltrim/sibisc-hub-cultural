import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchBooks } from '../../services/catalogService';
import { getRecommendations, getUserProfile } from '../../services/userProfileService';
import {
  GUIDED_ASSISTANT_LIMIT_NOTICE,
  getGuidedAssistantQuestion,
  guidedAssistantQuestions,
} from '../../services/guidedAssistantService';
import SearchField from '../ui/SearchField';
import { useActiveFAB } from '../ActiveFABContext';
import styles from './FeltrimAgentsFAB.module.css';

function getQuickMatches(books, searchTerm) {
  const normalizedTerm = searchTerm.trim().toLowerCase();

  if (!normalizedTerm) {
    return [];
  }

  return books.filter((book) => {
    const haystack = `${book.title} ${book.author} ${book.isbn}`.toLowerCase();
    return haystack.includes(normalizedTerm);
  });
}

function FeltrimAgentsFAB() {
  const { activeFAB, setActiveFAB } = useActiveFAB();
  const isOpen = activeFAB === 'agents';
  const [catalogBooks, setCatalogBooks] = useState([]);
  const [profile, setProfile] = useState(null);
  const [assistantRecommendations, setAssistantRecommendations] = useState([]);
  const [query, setQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState(guidedAssistantQuestions[0].id);

  const fabRef = useRef(null);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const [bookItems, profileData, recommendationItems] = await Promise.all([
          searchBooks(''),
          getUserProfile(),
          getRecommendations(),
        ]);

        if (!isMounted) return;

        setCatalogBooks(bookItems);
        setProfile(profileData);
        setAssistantRecommendations(recommendationItems.slice(0, 2));
      } catch {
        // silent fail — FAB is a progressive enhancement
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setActiveFAB(null);
        fabRef.current?.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, setActiveFAB]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

    function onKeyDown(e) {
      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll(focusableSelectors)
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const quickMatches = useMemo(
    () => getQuickMatches(catalogBooks, query),
    [catalogBooks, query]
  );

  const selectedGuide = useMemo(
    () => getGuidedAssistantQuestion(selectedGuideId),
    [selectedGuideId]
  );

  function handleAssistantSearch() {
    const term = query.trim();

    if (!term) {
      setSearchStatus('Digite um título, autor, ISBN ou tema para orientação do Feltrim Agents.');
      return;
    }

    const matches = getQuickMatches(catalogBooks, term);
    const countLabel = matches.length === 1 ? '1 sugestão' : `${matches.length} sugestões`;

    setSearchStatus(
      matches.length
        ? `Feltrim Agents encontrou ${countLabel} no catálogo local. Abra um resultado para ver disponibilidade.`
        : 'Feltrim Agents não encontrou sugestão segura no catálogo local. Tente outro termo ou explore o catálogo completo.'
    );
  }

  function handleClose() {
    setActiveFAB(null);
    fabRef.current?.focus();
  }

  function handleToggle() {
    if (isOpen) {
      handleClose();
    } else {
      setQuery('');
      setSearchStatus('');
      setActiveFAB('agents');
    }
  }

  function handleLinkClick() {
    handleClose();
  }

  return (
    <div className={`${styles.root}${isOpen ? ` ${styles.rootOpen}` : ''}`}>
      {isOpen && (
        <div
          ref={panelRef}
          id="fab-agents-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fab-agents-title"
          className={styles.panel}
        >
          <div className={styles.panelHeader}>
            <p id="fab-agents-title" className={styles.panelTitle}>
              Feltrim Agents
            </p>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.closeBtn}
              aria-label="Fechar Feltrim Agents"
              onClick={handleClose}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <p className={styles.panelSubtitle}>
            Assistente guiado — dados do catálogo, eventos e perfil do leitor.
          </p>

          <SearchField
            label="Busca assistida no catálogo"
            placeholder="Título, autor ou ISBN"
            value={query}
            onChange={(nextValue) => {
              setQuery(nextValue);
              if (!nextValue.trim()) {
                setSearchStatus('');
              }
            }}
            onSubmit={handleAssistantSearch}
            buttonLabel="Explorar"
            statusMessage={searchStatus}
          />

          {query.trim() ? (
            <div className={styles.quickResults}>
              {quickMatches.slice(0, 4).map((book) => (
                <Link
                  key={book.id}
                  className={styles.quickResult}
                  to={`/catalogo/${book.id}`}
                  onClick={handleLinkClick}
                >
                  <strong>{book.title}</strong>
                  <span>{book.author}</span>
                </Link>
              ))}
              {!quickMatches.length && (
                <p className={styles.noResults}>
                  Nenhum livro encontrado no catálogo local. Tente outro termo.
                </p>
              )}
            </div>
          ) : (
            <>
              <div
                className={styles.guideList}
                aria-label="Tópicos de orientação rápida"
              >
                <strong className={styles.guideListLabel}>Perguntas guiadas</strong>
                <div className={styles.guideButtons}>
                  {guidedAssistantQuestions.map((guide) => (
                    <button
                      key={guide.id}
                      type="button"
                      className={styles.guideButton}
                      aria-pressed={guide.id === selectedGuideId}
                      aria-controls="fab-agents-answer"
                      onClick={() => setSelectedGuideId(guide.id)}
                    >
                      <span>{guide.shortLabel}</span>
                      <em>{guide.category}</em>
                    </button>
                  ))}
                </div>
              </div>

              <section
                id="fab-agents-answer"
                className={styles.guidedAnswer}
                aria-live="polite"
                aria-labelledby="fab-agents-answer-title"
              >
                <span className={styles.answerCategory}>{selectedGuide.category}</span>
                <h2 id="fab-agents-answer-title" className={styles.answerTitle}>
                  {selectedGuide.answer.title}
                </h2>
                <p className={styles.answerSummary}>{selectedGuide.answer.summary}</p>

                {selectedGuide.answer.recommendations?.length ? (
                  <div className={styles.answerItems} aria-label="Recomendações explicáveis">
                    {selectedGuide.answer.recommendations.map((item) => (
                      <Link
                        key={item.id}
                        className={styles.answerItem}
                        to={item.nextAction.to}
                        onClick={handleLinkClick}
                      >
                        <strong>{item.title}</strong>
                        <span>Motivo: {item.reason}</span>
                        <em>
                          {item.availableCount} de {item.totalCount} exemplares disponíveis
                        </em>
                      </Link>
                    ))}
                  </div>
                ) : null}

                {selectedGuide.answer.references?.length ? (
                  <div className={styles.answerItems} aria-label="Referências locais explicáveis">
                    {selectedGuide.answer.references.map((item) => (
                      <Link
                        key={item.id}
                        className={styles.answerItem}
                        to={item.nextAction.to}
                        onClick={handleLinkClick}
                      >
                        <strong>{item.title}</strong>
                        <span>Motivo: {item.reason}</span>
                      </Link>
                    ))}
                  </div>
                ) : null}

                <Link
                  className={styles.answerAction}
                  to={selectedGuide.answer.nextAction.to}
                  onClick={handleLinkClick}
                >
                  {selectedGuide.answer.nextAction.label}
                </Link>
              </section>

              {assistantRecommendations.length > 0 && (
                <div className={styles.recommendedNote}>
                  <strong>Sugerido pelo perfil</strong>
                  <p>
                    Para {profile?.name.split(' ')[0] ?? 'leitor'}, baseado nas preferências cadastradas.
                  </p>
                  {assistantRecommendations.slice(0, 1).map((book) => (
                    <Link
                      key={book.id}
                      className={styles.quickResult}
                      to={`/catalogo/${book.bookId}`}
                      onClick={handleLinkClick}
                    >
                      <strong>{book.title}</strong>
                      <span>{book.reason}</span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      <button
        ref={fabRef}
        type="button"
        className={styles.fab}
        aria-label={isOpen ? 'Fechar Feltrim Agents' : 'Feltrim Agents — assistente guiado'}
        aria-expanded={isOpen}
        aria-controls="fab-agents-panel"
        onClick={handleToggle}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M10 1L11.85 7.15H18L13 11.1L14.85 17.25L10 13.3L5.15 17.25L7 11.1L2 7.15H8.15L10 1Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

export default FeltrimAgentsFAB;
