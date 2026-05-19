import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import { getNewsById } from '../services/newsService';
import { formatLongDate } from '../utils/formatters';
import styles from './NewsDetailPage.module.css';

function NewsDetailPage() {
  const { newsId } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [item, setItem] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDetail() {
      setLoading(true);
      setLoadError('');

      try {
        const newsItem = await getNewsById(newsId);

        if (!isMounted) return;

        setItem(newsItem);
      } catch {
        if (isMounted) {
          setItem(null);
          setLoadError('Não foi possível carregar esta notícia do protótipo.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDetail();

    return () => {
      isMounted = false;
    };
  }, [newsId]);

  if (loading) {
    return <LoadingState label="Buscando notícia completa..." />;
  }

  if (loadError) {
    return <ErrorState title="Notícia indisponível" message={loadError} />;
  }

  if (!item) {
    return (
      <ErrorState
        title="Notícia não encontrada"
        message="O item procurado não existe mais ou ainda não foi publicado."
      />
    );
  }

  return (
    <article className={styles.article} data-testid="news-detail">
      <Link className={styles.backLink} to="/noticias">
        Voltar para notícias
      </Link>

      <div className={styles.meta}>
        <span>{item.category}</span>
        <span>{formatLongDate(item.date)}</span>
      </div>

      <h1>{item.title}</h1>
      <p className={styles.summary}>{item.summary}</p>

      {item.sourceLabel && item.sourceUrl ? (
        <div className={styles.sourceBox}>
          <strong>Origem</strong>
          <a
            className={styles.sourceLink}
            href={item.sourceUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {item.sourceLabel}
          </a>
        </div>
      ) : null}

      <div className={styles.body}>
        {item.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

export default NewsDetailPage;
