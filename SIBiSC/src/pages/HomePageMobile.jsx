import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SearchField from '../components/ui/SearchField';
import SectionHeader from '../components/ui/SectionHeader';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import NewsCard from '../components/cards/NewsCard';
import EventCard from '../components/cards/EventCard';
import BookCard from '../components/cards/BookCard';
import styles from './HomePageMobile.module.css';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { getNews } from '../services/newsService';
import { getEvents } from '../services/eventsService';
import { searchBooks } from '../services/catalogService';
import { getUserProfile } from '../services/userProfileService';
import {
  GUIDED_ASSISTANT_LIMIT_NOTICE,
  getGuidedAssistantQuestion,
  guidedAssistantQuestions,
} from '../services/guidedAssistantService';

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

function HomePageMobile() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [books, setBooks] = useState([]);
  const [catalogBooks, setCatalogBooks] = useState([]);
  const [profile, setProfile] = useState(null);
  const [query, setQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState(guidedAssistantQuestions[0].id);
  const debouncedQuery = useDebouncedValue(query, 180);

  useEffect(() => {
    let isMounted = true;

    async function loadHome() {
      setLoading(true);
      setLoadError('');

      try {
        const [newsItems, eventItems, bookItems, profileData] = await Promise.all([
          getNews(),
          getEvents(),
          searchBooks(''),
          getUserProfile(),
        ]);

        if (!isMounted) return;

        setNews(newsItems.slice(0, 3));
        setEvents(eventItems.slice(0, 3));
        setBooks(bookItems.slice(0, 4));
        setCatalogBooks(bookItems);
        setProfile(profileData);
      } catch {
        if (isMounted) {
          setLoadError('Não foi possível montar a Home mobile do protótipo agora. Tente recarregar a página.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadHome();

    return () => {
      isMounted = false;
    };
  }, []);

  const quickMatches = useMemo(() => {
    return getQuickMatches(catalogBooks, debouncedQuery);
  }, [catalogBooks, debouncedQuery]);

  const selectedGuide = useMemo(() => getGuidedAssistantQuestion(selectedGuideId), [selectedGuideId]);

  function handleAssistantSearch() {
    const term = query.trim();

    if (!term) {
      setSearchStatus('Digite um título, autor ou ISBN para receber orientação do Feltrim Agents.');
      return;
    }

    const matches = getQuickMatches(catalogBooks, term);
    const countLabel = matches.length === 1 ? '1 resultado' : `${matches.length} resultados`;

    setSearchStatus(
      matches.length
        ? `Busca aplicada: ${countLabel} no catálogo local. Abra um item para ver disponibilidade.`
        : 'Busca aplicada: nenhum item seguro no catálogo local. Tente outro termo ou abra o catálogo completo.'
    );
  }

  if (loading) {
    return <LoadingState label="Montando a Home mobile do SIBiSC..." />;
  }

  if (loadError) {
    return <ErrorState title="Home mobile indisponível" message={loadError} />;
  }

  return (
    <div className={styles.container}>
      {/* Mobile Hero Section */}
      <section className={styles.mobileHero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Feltrim Agents</h1>
          <p className={styles.heroSubtitle}>
            Assistente guiado em protótipo para dúvidas, recomendações de livros disponíveis
            e orientação no SIBiSC, usando dados locais nesta versão.
          </p>
        </div>

        <div className={styles.assistantPreview}>
          <strong>Preferências usadas nas sugestões</strong>
          <span>
            {profile?.readingPreferences.categories.join(' · ') ?? 'Carregando preferências do perfil...'}.
            Preferências demonstrativas, sem edição persistida nesta versão.
          </span>
        </div>

        <div className={styles.assistantGuides} aria-label="Perguntas guiadas do Feltrim Agents">
          {guidedAssistantQuestions.map((guide) => (
            <button
              key={guide.id}
              type="button"
              aria-pressed={guide.id === selectedGuideId}
              aria-controls="mobile-guided-assistant-answer"
              onClick={() => setSelectedGuideId(guide.id)}
            >
              <span>{guide.shortLabel}</span>
              <em>{guide.category}</em>
            </button>
          ))}
        </div>

        <section
          id="mobile-guided-assistant-answer"
          className={styles.guidedAnswer}
          aria-live="polite"
          aria-atomic="true"
          aria-labelledby="mobile-guided-answer-title"
        >
          <span className={styles.answerCategory}>{selectedGuide.category}</span>
          <h2 id="mobile-guided-answer-title">{selectedGuide.answer.title}</h2>
          <p>{selectedGuide.answer.summary}</p>

          {selectedGuide.answer.recommendations?.length ? (
            <div className={styles.answerItems} aria-label="Recomendações explicáveis">
              {selectedGuide.answer.recommendations.map((item) => (
                <Link key={item.id} className={styles.answerItem} to={item.nextAction.to}>
                  <strong>{item.title}</strong>
                  <span>Motivo: {item.reason}</span>
                  <span>
                    Fonte/limite: {item.source}; {item.limit}
                  </span>
                  <em>
                    Próxima ação: {item.nextAction.label}. {item.availableCount} de {item.totalCount} exemplares
                    no inventário local.
                  </em>
                </Link>
              ))}
            </div>
          ) : null}

          {selectedGuide.answer.references?.length ? (
            <div className={styles.answerItems} aria-label="Referências locais explicáveis">
              {selectedGuide.answer.references.map((item) => (
                <Link key={item.id} className={styles.answerItem} to={item.nextAction.to}>
                  <strong>{item.title}</strong>
                  <span>Motivo: {item.reason}</span>
                  <span>
                    Fonte/limite: {item.source}; {item.limit}
                  </span>
                  <em>Próxima ação: {item.nextAction.label}</em>
                </Link>
              ))}
            </div>
          ) : null}

          <p className={styles.limitNotice}>
            <strong>Fonte/limite:</strong> {selectedGuide.answer.source}. {selectedGuide.answer.limit}
          </p>
          <p className={styles.limitNotice}>{GUIDED_ASSISTANT_LIMIT_NOTICE}</p>
          <Link className={styles.answerAction} to={selectedGuide.answer.nextAction.to}>
            {selectedGuide.answer.nextAction.label}
          </Link>
        </section>

        <SearchField
          label="Busca assistida"
          placeholder="Título, autor ou ISBN"
          value={query}
          onChange={(nextValue) => {
            setQuery(nextValue);
            if (!nextValue.trim()) {
              setSearchStatus('');
            }
          }}
          onSubmit={handleAssistantSearch}
          buttonLabel="Buscar"
          statusMessage={searchStatus}
        />

        {query.trim() && quickMatches.length > 0 ? (
          <div className={styles.quickResults}>
            {quickMatches.slice(0, 3).map((book) => (
              <Link key={book.id} className={styles.quickResult} to={`/catalogo/${book.id}`}>
                <strong>{book.title}</strong>
                <span>{book.author}</span>
              </Link>
            ))}
          </div>
        ) : null}

        {query.trim() && !quickMatches.length ? (
          <EmptyState
            title="Nenhum livro encontrado"
            message="Tente outro termo ou use o catálogo completo para navegar por disponibilidade."
          />
        ) : null}
      </section>

      {/* Quick Actions */}
      <section className={styles.quickActions}>
        <Link to="/catalogo" className={styles.actionCard}>
          <span className={styles.actionIcon} aria-hidden="true">CAT</span>
          <span className={styles.actionLabel}>Catálogo</span>
        </Link>
        <Link to="/eventos" className={styles.actionCard}>
          <span className={styles.actionIcon} aria-hidden="true">AGE</span>
          <span className={styles.actionLabel}>Agenda</span>
        </Link>
        <Link to="/noticias" className={styles.actionCard}>
          <span className={styles.actionIcon} aria-hidden="true">NOT</span>
          <span className={styles.actionLabel}>Notícias</span>
        </Link>
      </section>

      {/* News Section */}
      {news.length > 0 && (
        <section>
          <SectionHeader
            eyebrow="Novidades"
            title="Últimas notícias"
            linkTo="/noticias"
            linkLabel="Ver mais"
          />
          <div className={styles.stack}>
            {news.map((item) => (
              <NewsCard key={item.id} item={item} compact />
            ))}
          </div>
        </section>
      )}

      {/* Events Section */}
      {events.length > 0 && (
        <section>
          <SectionHeader
            eyebrow="Agenda"
            title="Próximos encontros"
            linkTo="/eventos"
            linkLabel="Ver agenda"
          />
          <div className={styles.stack}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Books Section */}
      {books.length > 0 && (
        <section>
          <SectionHeader
            eyebrow="Destaques"
            title="Livros em destaque"
            linkTo="/catalogo"
            linkLabel="Explorar catálogo"
          />
          <div className={styles.booksGrid}>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default HomePageMobile;
