import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../components/cards/NewsCard';
import EventCard from '../components/cards/EventCard';
import SearchField from '../components/ui/SearchField';
import SectionHeader from '../components/ui/SectionHeader';
import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import { getNews } from '../services/newsService';
import { getEvents } from '../services/eventsService';
import { searchBooks } from '../services/catalogService';
import useDebouncedValue from '../hooks/useDebouncedValue';
import styles from './HomePage.module.css';

function HomePage() {
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
      setBooks(bookItems.slice(0, 5));
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

  if (loading) {
    return <LoadingState label="Montando a vitrine principal do SIBiSC..." />;
  }

  return (
    <>
      <section className={styles.hero} data-testid="home-hero">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Rede municipal de bibliotecas</p>
          <h1>O conhecimento da sua cidade, organizado.</h1>
          <p className={styles.description}>
            Noticias, agenda cultural e consulta de livros em uma experiencia mobile-first pensada para Sao Carlos.
          </p>
          <div className={styles.metrics}>
            <span>4 unidades conectadas</span>
            <span>agenda cultural viva</span>
            <span>acervo com busca rapida</span>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <SearchField
            label="Busca rapida no catalogo"
            placeholder="Digite titulo, autor ou ISBN"
            value={query}
            onChange={setQuery}
            onSubmit={() => {}}
            buttonLabel="Explorar"
          />

          {query.trim() ? (
            <div className={styles.quickResults}>
              {quickMatches.length ? (
                quickMatches.slice(0, 4).map((book) => (
                  <Link key={book.id} className={styles.quickResult} to={`/catalogo/${book.id}`}>
                    <strong>{book.title}</strong>
                    <span>{book.author}</span>
                  </Link>
                ))
              ) : (
                <EmptyState
                  title="Nenhum livro encontrado"
                  message="Tente outro termo para a busca rapida."
                />
              )}
            </div>
          ) : (
            <div className={styles.heroNote}>
              <strong>Comece pelo que voce precisa agora.</strong>
              <p>Procure um livro, veja a agenda da semana ou acompanhe as ultimas noticias da rede.</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Editorial"
          title="Ultimas noticias"
          description="Atualizacoes sobre servicos, acervo e vida cultural das bibliotecas."
          linkTo="/noticias"
          linkLabel="Ver todas"
        />
        <div className={styles.grid}>
          {news.map((item) => (
            <NewsCard key={item.id} item={item} compact />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Agenda"
          title="Proximos encontros"
          description="Atividades pensadas para estudo, comunidade e circulacao cultural."
          linkTo="/eventos"
          linkLabel="Ver agenda"
        />
        <div className={styles.eventGrid}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
