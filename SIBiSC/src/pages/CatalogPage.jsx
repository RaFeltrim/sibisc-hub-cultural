import { useEffect, useMemo, useState } from 'react';
import BookCard from '../components/cards/BookCard';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import SearchField from '../components/ui/SearchField';
import SectionHeader from '../components/ui/SectionHeader';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { neighborhoodOptions } from '../mocks/units';
import { searchBooks } from '../services/catalogService';
import styles from './CatalogPage.module.css';

function CatalogPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const debouncedQuery = useDebouncedValue(query, 220);

  useEffect(() => {
    let isMounted = true;

    async function loadBooks() {
      setLoading(true);
      setLoadError('');

      try {
        const items = await searchBooks(debouncedQuery);

        if (!isMounted) return;

        setBooks(items);
      } catch {
        if (isMounted) {
          setBooks([]);
          setLoadError('Não foi possível consultar o catálogo local agora. Tente novamente.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  const hasQuery = useMemo(() => debouncedQuery.trim().length > 0, [debouncedQuery]);

  async function handleCatalogSearch() {
    const term = query.trim();
    setLoadError('');

    if (!term) {
      setLoading(true);
      try {
        const items = await searchBooks('');
        setBooks(items);
        setSearchStatus('Catálogo completo carregado. Digite um termo para refinar por título, autor ou ISBN.');
      } catch {
        setBooks([]);
        setLoadError('Não foi possível recarregar o catálogo completo neste protótipo.');
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const items = await searchBooks(term);
      setBooks(items);

      const countLabel = items.length === 1 ? '1 livro encontrado' : `${items.length} livros encontrados`;
      setSearchStatus(
        items.length
          ? `Busca aplicada: ${countLabel}. Abra um resultado para ver unidades e disponibilidade.`
          : 'Busca aplicada: nenhum livro encontrado no catálogo local. Revise o termo ou tente outro autor.'
      );
    } catch {
      setBooks([]);
      setLoadError('Não foi possível aplicar a busca no catálogo local agora. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <SectionHeader
        eyebrow="Acervo"
        title="Catálogo"
        description="Busque livros por título, autor ou ISBN e descubra onde retirar o exemplar."
      />

      <SearchField
        label="Buscar no catálogo"
        placeholder="Ex.: Vidas Secas, Carolina Maria de Jesus, 978..."
        value={query}
        onChange={(nextValue) => {
          setQuery(nextValue);
          if (!nextValue.trim()) {
            setSearchStatus('');
          }
        }}
        onSubmit={handleCatalogSearch}
        inputTestId="catalog-search-input"
        buttonTestId="catalog-search-button"
        statusMessage={searchStatus}
        statusTestId="catalog-search-status"
      />

      {loadError ? <ErrorState title="Catálogo indisponível" message={loadError} /> : null}

      {hasQuery ? (
        <div className={styles.geoFallback} data-testid="geo-fallback">
          <div>
            <strong>Refine por bairro</strong>
            <p>Escolha uma referência para priorizar a unidade mais próxima nos detalhes do livro.</p>
          </div>
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
      ) : null}

      {loading ? <LoadingState label="Consultando disponibilidade no catalogo..." /> : null}

      {!loading && !loadError && books.length ? (
        <div className={styles.results} data-testid="catalog-results">
          {books.map((book) => (
            <BookCard key={book.id} book={book} selectedNeighborhood={selectedNeighborhood} />
          ))}
        </div>
      ) : null}

      {!loading && !loadError && !books.length ? (
        <EmptyState
          title="Nenhum livro encontrado"
          message={
            hasQuery
              ? 'Revise o termo digitado, tente outro autor ou remova filtros de bairro.'
              : 'O catálogo local ainda não carregou itens para exibição.'
          }
        />
      ) : null}
    </section>
  );
}

export default CatalogPage;
