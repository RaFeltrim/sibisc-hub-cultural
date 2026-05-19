import { Link } from 'react-router-dom';
import { getNearestAvailableInventory } from '../../services/catalogService';
import styles from './BookCard.module.css';

function BookCard({ book, selectedNeighborhood = 'Centro' }) {
  const effectiveNeighborhood = selectedNeighborhood || 'Centro';
  const availabilityLabel =
    book.totalAvailable === 1 ? '1 exemplar disponível' : `${book.totalAvailable} exemplares disponíveis`;
  const nearestInventory = getNearestAvailableInventory(book, effectiveNeighborhood);

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
            {nearestInventory.unit.name}, {nearestInventory.distanceByNeighborhood[effectiveNeighborhood]} de distância
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export default BookCard;
