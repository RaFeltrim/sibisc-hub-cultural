import { useEffect, useState } from 'react';
import NewsCard from '../components/cards/NewsCard';
import EventCard from '../components/cards/EventCard';
import BookCard from '../components/cards/BookCard';
import SectionHeader from '../components/ui/SectionHeader';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import { getNews } from '../services/newsService';
import { getEvents } from '../services/eventsService';
import { searchBooks } from '../services/catalogService';
import FeedbackFAB from '../components/feedback/FeedbackFAB';
import FeltrimAgentsFAB from '../components/feltrim-agents/FeltrimAgentsFAB';
import { ActiveFABProvider } from '../components/ActiveFABContext';
import styles from './HomePage.module.css';

function HomePage() {
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
          setLoadError('Não foi possível montar a Home no momento. Tente recarregar a página.');
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
    return <LoadingState label="Montando a vitrine principal do SIBiSC..." />;
  }

  if (loadError) {
    return <ErrorState title="Home indisponível" message={loadError} />;
  }

  return (
    <>
      <ActiveFABProvider>
        <FeedbackFAB />
        <FeltrimAgentsFAB />
      </ActiveFABProvider>

      <div className={styles.container}>
        {news.length > 0 && (
          <section className={styles.contentSection}>
            <SectionHeader
              eyebrow="Editorial"
              title="Últimas notícias"
              description="Atualizações sobre serviços, acervo e vida cultural das bibliotecas."
              descriptionDesktopOnly
              linkTo="/noticias"
              linkLabel="Ver todas"
            />
            <div className={styles.grid}>
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
              description="Atividades pensadas para estudo, comunidade e circulação cultural."
              descriptionDesktopOnly
              linkTo="/eventos"
              linkLabel="Ver agenda"
            />
            <div className={styles.eventGrid}>
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
      </div>
    </>
  );
}

export default HomePage;
