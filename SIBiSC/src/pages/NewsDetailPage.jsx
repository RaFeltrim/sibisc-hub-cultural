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
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      setLoading(true);
      const newsItem = await getNewsById(newsId);
      setItem(newsItem);
      setLoading(false);
    }

    loadDetail();
  }, [newsId]);

  if (loading) {
    return <LoadingState label="Buscando noticia completa..." />;
  }

  if (!item) {
    return (
      <ErrorState
        title="Noticia nao encontrada"
        message="O item procurado nao existe mais ou ainda nao foi publicado."
      />
    );
  }

  return (
    <article className={styles.article} data-testid="news-detail">
      <Link className={styles.backLink} to="/noticias">
        Voltar para Noticias
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
            rel="noreferrer"
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
