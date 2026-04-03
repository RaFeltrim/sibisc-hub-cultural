import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchField from '../components/ui/SearchField';
import SectionHeader from '../components/ui/SectionHeader';
import NewsCard from '../components/cards/NewsCard';
import EventCard from '../components/cards/EventCard';
import BookCard from '../components/cards/BookCard';
import { getNews } from '../services/newsService';
import { getEvents } from '../services/eventsService';
import { searchBooks } from '../services/catalogService';
import styles from './HomePageMobile.module.css';
import { useEffect, useMemo } from 'react';
import useDebouncedValue from '../hooks/useDebouncedValue';

function HomePageMobile() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 180);

  useEffect(() => {
    async function loadHome() {
      setLoading(true);
      const [newsItems, eventItems, bookItems] = await Promise.all([
        getNews(),
        getEvents(),
        searchBooks(''),
      ]);

      setNews(newsItems.slice(0, 3));
      setEvents(eventItems.slice(0, 3));
      setBooks(bookItems.slice(0, 4));
      setLoading(false);
    }

    loadHome();
  }, []);

  const quickMatches = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }

    return books.filter((book) => {
      const haystack = `${book.title} ${book.author} ${book.isbn}`.toLowerCase();
      return haystack.includes(debouncedQuery.toLowerCase());
    });
  }, [books, debouncedQuery]);

  return (
    <div className={styles.container}>
      {/* Mobile Hero Section */}
      <section className={styles.mobileHero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Bem-vindo ao SIBiSC</h1>
          <p className={styles.heroSubtitle}>Sua biblioteca municipal ao alcance da mão</p>
        </div>

        <SearchField
          label="Buscar livro"
          placeholder="Título, autor ou ISBN"
          value={query}
          onChange={setQuery}
          onSubmit={() => {}}
          buttonLabel="Buscar"
        />

        {query.trim() && quickMatches.length > 0 && (
          <div className={styles.quickResults}>
            {quickMatches.slice(0, 3).map((book) => (
              <Link key={book.id} className={styles.quickResult} to={`/catalogo/${book.id}`}>
                <strong>{book.title}</strong>
                <span>{book.author}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className={styles.quickActions}>
        <Link to="/catalogo" className={styles.actionCard}>
          <span className={styles.actionIcon}>📚</span>
          <span className={styles.actionLabel}>Catálogo</span>
        </Link>
        <Link to="/eventos" className={styles.actionCard}>
          <span className={styles.actionIcon}>📅</span>
          <span className={styles.actionLabel}>Agenda</span>
        </Link>
        <Link to="/noticias" className={styles.actionCard}>
          <span className={styles.actionIcon}>📰</span>
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
