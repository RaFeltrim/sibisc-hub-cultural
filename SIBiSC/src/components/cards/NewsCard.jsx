import { Link } from 'react-router-dom';
import { formatLongDate } from '../../utils/formatters';
import styles from './NewsCard.module.css';

function NewsCard({ item, compact = false }) {
  return (
    <article className={compact ? `${styles.card} ${styles.compact}` : styles.card} data-testid="news-card">
      <div className={styles.meta}>
        <span>{item.category}</span>
        <span>{formatLongDate(item.date)}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      {item.sourceLabel ? <span className={styles.source}>{item.sourceLabel}</span> : null}
      <Link className={styles.link} to={`/noticias/${item.id}`}>
        Ler detalhe
      </Link>
    </article>
  );
}

export default NewsCard;
