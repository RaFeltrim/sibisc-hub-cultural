import { Link } from 'react-router-dom';
import { getNearestAvailableInventory } from '../../services/catalogService';
import styles from './BookCard.module.css';

function BookCard({ book, selectedNeighborhood = 'Centro' }) {
  const availabilityLabel =
    book.totalAvailable === 1 ? '1 exemplar disponivel' : `${book.totalAvailable} exemplares disponiveis`;
  const nearestInventory = getNearestAvailableInventory(book, selectedNeighborhood);

  return (
    <Link className={styles.card} to={`/catalogo/${book.id}`}>
      <div className={styles.content}>
        <p className={styles.category}>{book.category}</p>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <code>{book.isbn}</code>
      </div>
      <div className={styles.footer}>
        <strong>{availabilityLabel}</strong>
        {nearestInventory ? (
          <span>
            {nearestInventory.unit.name} | {nearestInventory.distanceByNeighborhood[selectedNeighborhood]}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export default BookCard;
