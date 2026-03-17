import { Link } from 'react-router-dom';
import styles from './NewsCard.module.css';

function NewsCard({ item, compact = false }) {
  return (
    <article className={compact ? `${styles.card} ${styles.compact}` : styles.card} data-testid="news-card">
      <div className={styles.meta}>
        <span>{item.category}</span>
        <span>{item.date.split('-').reverse().join('/')}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <Link className={styles.link} to={`/noticias/${item.id}`}>
        Ler detalhe
      </Link>
    </article>
  );
}

export default NewsCard;
