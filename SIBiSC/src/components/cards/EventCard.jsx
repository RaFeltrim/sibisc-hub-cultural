import { Link } from 'react-router-dom';
import { formatWeekdayDate } from '../../utils/formatters';
import styles from './EventCard.module.css';

function EventCard({ event }) {
  return (
    <article className={styles.card}>
      <div className={styles.timeBlock}>{event.startTime}</div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{event.category}</span>
          <span>{formatWeekdayDate(event.date)}</span>
        </div>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div className={styles.footer}>
          <span>{event.locationName}</span>
          <span>{event.audience}</span>
        </div>
        <Link className={styles.link} to={`/eventos/${event.id}`}>
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
