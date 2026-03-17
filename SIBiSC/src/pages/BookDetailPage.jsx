import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AvailabilityTable from '../components/ui/AvailabilityTable';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import { neighborhoodOptions } from '../mocks/units';
import { getBookById, getNearestAvailableInventory } from '../services/catalogService';
import styles from './BookDetailPage.module.css';

function BookDetailPage() {
  const { bookId } = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Centro');

  useEffect(() => {
    async function loadBook() {
      setLoading(true);
      const item = await getBookById(bookId);
      setBook(item);
      setLoading(false);
    }

    loadBook();
  }, [bookId]);

  const nearestInventory = useMemo(() => {
    if (!book) {
      return null;
    }

    return getNearestAvailableInventory(book, selectedNeighborhood);
  }, [book, selectedNeighborhood]);

  if (loading) {
    return <LoadingState label="Buscando detalhes do livro..." />;
  }

  if (!book) {
    return (
      <ErrorState
        title="Livro nao encontrado"
        message="Esse item nao esta disponivel no catalogo atual."
      />
    );
  }

  return (
    <article className={styles.article} data-testid="book-detail">
      <Link className={styles.backLink} to="/catalogo">
        Voltar ao Catalogo
      </Link>

      <div className={styles.heading}>
        <div>
          <span className={styles.category}>{book.category}</span>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
        </div>
        <strong className={styles.availability}>{book.totalAvailable} exemplares disponiveis</strong>
      </div>

      <div className={styles.metaGrid}>
        <div>
          <strong>ISBN</strong>
          <p>{book.isbn}</p>
        </div>
        <div>
          <strong>Ano</strong>
          <p>{book.year}</p>
        </div>
        <div>
          <strong>Editora</strong>
          <p>{book.publisher}</p>
        </div>
        <div>
          <strong>Paginas</strong>
          <p>{book.pages}</p>
        </div>
      </div>

      <p className={styles.summary}>{book.summary}</p>

      <div className={styles.neighborhoodBox}>
        <strong>Escolha um bairro para priorizar a unidade mais proxima</strong>
        <div className={styles.pills}>
          {neighborhoodOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={
                option === selectedNeighborhood ? `${styles.pill} ${styles.pillActive}` : styles.pill
              }
              onClick={() => setSelectedNeighborhood(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {nearestInventory ? (
        <div className={styles.highlight}>
          <p>Mais proxima com disponibilidade</p>
          <strong>{nearestInventory.unit.name}</strong>
          <span>
            {nearestInventory.distanceByNeighborhood[selectedNeighborhood]} | {nearestInventory.callNumber} | {nearestInventory.shelf}
          </span>
        </div>
      ) : null}

      <div>
        <h2>Disponibilidade por unidade</h2>
        <AvailabilityTable inventory={book.inventory} selectedNeighborhood={selectedNeighborhood} />
      </div>
    </article>
  );
}

export default BookDetailPage;
