import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import NewsCard from '../components/cards/NewsCard';
import EventCard from '../components/cards/EventCard';
import BookCard from '../components/cards/BookCard';
import styles from './HomePageMobile.module.css';
import { getNews } from '../services/newsService';
import { getEvents } from '../services/eventsService';
import { searchBooks } from '../services/catalogService';
import FeedbackFAB from '../components/feedback/FeedbackFAB';
import FeltrimAgentsFAB from '../components/feltrim-agents/FeltrimAgentsFAB';
import { ActiveFABProvider } from '../components/ActiveFABContext';

function HomePageMobile() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadHome() {
      setLoading(true);
      setLoadError('');

      try {
        const [newsItems, eventItems, bookItems] = await Promise.all([
          getNews(),
          getEvents(),
          searchBooks(''),
        ]);

        if (!isMounted) return;

        setNews(newsItems.slice(0, 3));
        setEvents(eventItems.slice(0, 3));
        setBooks(bookItems.slice(0, 4));
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

  if (loading) {
    return <LoadingState label="Montando a Home mobile do SIBiSC..." />;
  }

  if (loadError) {
    return <ErrorState title="Home mobile indisponível" message={loadError} />;
  }

  return (
    <div className={styles.container}>
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

      {news.length > 0 && (
        <section className={styles.contentSection}>
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

      {events.length > 0 && (
        <section className={styles.contentSection}>
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

      {books.length > 0 && (
        <section className={styles.contentSection}>
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

      <ActiveFABProvider>
        <FeedbackFAB />
        <FeltrimAgentsFAB />
      </ActiveFABProvider>
    </div>
  );
}

export default HomePageMobile;
