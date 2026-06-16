import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AvailabilityTable from '../components/ui/AvailabilityTable';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import { neighborhoodOptions } from '../mocks/units';
import { useAuth } from '../hooks/useAuth';
import { getBookById, getNearestAvailableInventory } from '../services/catalogService';
import {
  addFavorite,
  isBookFavorited,
  removeFavoriteByBookId,
} from '../services/userProfileService';
import styles from './BookDetailPage.module.css';

function BookDetailPage() {
  const { bookId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [book, setBook] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Centro');
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadBook() {
      setLoading(true);
      setLoadError('');

      try {
        const item = await getBookById(bookId);

        if (!isMounted) return;

        setBook(item);
      } catch {
        if (isMounted) {
          setBook(null);
          setLoadError('Não foi possível buscar os detalhes do livro.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadBook();

    return () => {
      isMounted = false;
    };
  }, [bookId]);

  useEffect(() => {
    let isMounted = true;

    async function loadFavoriteStatus() {
      if (!bookId || !user) {
        if (isMounted) {
          setIsFavorited(false);
        }
        return;
      }

      try {
        const favorited = await isBookFavorited(bookId);
        if (isMounted) {
          setIsFavorited(favorited);
        }
      } catch {
        if (isMounted) {
          setIsFavorited(false);
        }
      }
    }

    loadFavoriteStatus();

    return () => {
      isMounted = false;
    };
  }, [bookId, user]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      setFavoriteStatus('Faça login para salvar favoritos.');
      return;
    }

    setFavoriteLoading(true);
    setFavoriteStatus('');

    try {
      if (isFavorited) {
        await removeFavoriteByBookId(bookId);
        setIsFavorited(false);
        setFavoriteStatus('Livro removido dos favoritos.');
      } else {
        await addFavorite(bookId, {
          title: book.title,
          author: book.author,
          isbn: book.isbn,
        });
        setIsFavorited(true);
        setFavoriteStatus('Livro adicionado aos favoritos.');
      }
    } catch (err) {
      setFavoriteStatus(err.message || 'Não foi possível atualizar os favoritos.');
    } finally {
      setFavoriteLoading(false);
    }
  };

  const nearestInventory = useMemo(() => {
    if (!book) {
      return null;
    }

    return getNearestAvailableInventory(book, selectedNeighborhood);
  }, [book, selectedNeighborhood]);

  if (loading) {
    return <LoadingState label="Buscando detalhes do livro..." />;
  }

  if (loadError) {
    return <ErrorState title="Detalhe indisponível" message={loadError} />;
  }

  if (!book) {
    return (
      <ErrorState
        title="Livro não encontrado"
        message="Esse item não está disponível no catálogo atual."
      />
    );
  }

  return (
    <article className={styles.article} data-testid="book-detail">
      <Link className={styles.backLink} to="/catalogo">
        Voltar ao catálogo
      </Link>

      <div className={styles.heading}>
        <div>
          <span className={styles.category}>{book.category}</span>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
        </div>
        <div className={styles.availabilityBox}>
          <strong className={styles.availability}>{book.totalAvailable} exemplares disponíveis</strong>
          <p>Confirme a disponibilidade atual na unidade correspondente.</p>
          <div className={styles.favoriteActions}>
            {user ? (
              <button
                type="button"
                className={isFavorited ? styles.favoriteBtnActive : styles.favoriteBtn}
                onClick={handleFavoriteToggle}
                disabled={favoriteLoading}
                aria-pressed={isFavorited}
              >
                {favoriteLoading
                  ? 'Salvando...'
                  : isFavorited
                    ? 'Remover dos favoritos'
                    : 'Adicionar aos favoritos'}
              </button>
            ) : (
              <Link to="/login" className={styles.favoriteLoginLink}>
                Entrar para favoritar
              </Link>
            )}
            {favoriteStatus ? (
              <p className={styles.favoriteStatus} role="status">
                {favoriteStatus}
              </p>
            ) : null}
          </div>
        </div>
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
          <strong>Páginas</strong>
          <p>{book.pages}</p>
        </div>
      </div>

      <p className={styles.summary}>{book.summary}</p>

      <div className={styles.neighborhoodBox}>
        <strong>Escolha um bairro para priorizar a unidade mais próxima</strong>
        <div className={styles.pills} aria-label="Bairros para priorização de unidade">
          {neighborhoodOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={
                option === selectedNeighborhood ? `${styles.pill} ${styles.pillActive}` : styles.pill
              }
              aria-pressed={option === selectedNeighborhood}
              onClick={() => setSelectedNeighborhood(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {nearestInventory ? (
        <div className={styles.highlight}>
          <p>Mais próxima com disponibilidade</p>
          <strong>{nearestInventory.unit.name}</strong>
          <span>
            {nearestInventory.distanceByNeighborhood[selectedNeighborhood]} de distância, chamada {nearestInventory.callNumber}, {nearestInventory.shelf}
          </span>
          <small>Unidade sugerida com base na distância informada.</small>
        </div>
      ) : null}

      <div>
        <h2>Disponibilidade por unidade</h2>
        <p className={styles.mockNotice}>
          Consulte o horário de funcionamento de cada unidade antes de visitá-la.
        </p>
        <AvailabilityTable inventory={book.inventory} selectedNeighborhood={selectedNeighborhood} />
      </div>
    </article>
  );
}

export default BookDetailPage;
