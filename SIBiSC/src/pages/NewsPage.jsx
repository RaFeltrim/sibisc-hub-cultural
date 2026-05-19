import { useEffect, useMemo, useState } from 'react';
import NewsCard from '../components/cards/NewsCard';
import SectionHeader from '../components/ui/SectionHeader';
import FilterPills from '../components/ui/FilterPills';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import { getNews, getNewsCategories } from '../services/newsService';
import styles from './NewsPage.module.css';

function NewsPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState('Todas');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadNewsPage() {
      setLoading(true);
      setLoadError('');

      try {
        const [items, availableCategories] = await Promise.all([getNews(), getNewsCategories()]);

        if (!isMounted) return;

        setNews(items);
        setCategories(['Todas', ...availableCategories]);
      } catch {
        if (isMounted) {
          setNews([]);
          setCategories(['Todas']);
          setLoadError('Não foi possível carregar as notícias do protótipo agora.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadNewsPage();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredNews = useMemo(() => {
    if (filter === 'Todas') {
      return news;
    }

    return news.filter((item) => item.category === filter);
  }, [filter, news]);

  if (loading) {
    return <LoadingState label="Carregando a editoria do SIBiSC..." />;
  }

  return (
    <section>
      <SectionHeader
        eyebrow="Editorial"
        title="Notícias"
        description="Atualizações sobre serviços, eventos, inclusão e circulação do acervo."
        headingLevel={1}
      />
      <FilterPills
        options={categories}
        value={filter}
        onChange={setFilter}
        ariaLabel="Filtrar notícias por categoria"
      />

      {loadError ? <ErrorState title="Notícias indisponíveis" message={loadError} /> : null}

      {!loadError && filteredNews.length ? (
        <div className={styles.list} data-testid="news-list">
          {filteredNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : null}

      {!loadError && !filteredNews.length ? (
        <EmptyState
          title="Nenhuma notícia encontrada"
          message="A categoria escolhida ainda não tem itens publicados. Selecione Todas para voltar à lista completa."
        />
      ) : null}
    </section>
  );
}

export default NewsPage;
