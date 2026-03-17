import { Link } from 'react-router-dom';
import styles from './BookCard.module.css';

function BookCard({ book }) {
  const availabilityLabel =
    book.totalAvailable === 1 ? '1 exemplar disponivel' : `${book.totalAvailable} exemplares disponiveis`;

  return (
    <Link className={styles.card} to={`/catalogo/${book.id}`}>
      <div>
        <p className={styles.category}>{book.category}</p>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <code>{book.isbn}</code>
      </div>
      <strong>{availabilityLabel}</strong>
    </Link>
  );
}

export default BookCard;
