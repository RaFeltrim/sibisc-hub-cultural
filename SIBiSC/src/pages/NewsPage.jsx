import { useEffect, useMemo, useState } from 'react';
import NewsCard from '../components/cards/NewsCard';
import SectionHeader from '../components/ui/SectionHeader';
import FilterPills from '../components/ui/FilterPills';
import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import { getNews, getNewsCategories } from '../services/newsService';
import styles from './NewsPage.module.css';

function NewsPage() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState('Todas');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadNewsPage() {
      setLoading(true);
      const [items, availableCategories] = await Promise.all([getNews(), getNewsCategories()]);
      setNews(items);
      setCategories(['Todas', ...availableCategories]);
      setLoading(false);
    }

    loadNewsPage();
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
        title="Noticias"
        description="Atualizacoes sobre servicos, eventos, inclusao e circulacao do acervo."
      />
      <FilterPills options={categories} value={filter} onChange={setFilter} />

      {filteredNews.length ? (
        <div className={styles.list} data-testid="news-list">
          {filteredNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhuma noticia encontrada"
          message="A categoria escolhida ainda nao tem itens publicados."
        />
      )}
    </section>
  );
}

export default NewsPage;
