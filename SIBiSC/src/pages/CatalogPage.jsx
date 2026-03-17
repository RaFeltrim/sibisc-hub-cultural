import { useEffect, useMemo, useState } from 'react';
import BookCard from '../components/cards/BookCard';
import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import SearchField from '../components/ui/SearchField';
import SectionHeader from '../components/ui/SectionHeader';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { neighborhoodOptions } from '../mocks/units';
import { searchBooks } from '../services/catalogService';
import styles from './CatalogPage.module.css';

function CatalogPage() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const debouncedQuery = useDebouncedValue(query, 220);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      const items = await searchBooks(debouncedQuery);
      setBooks(items);
      setLoading(false);
    }

    loadBooks();
  }, [debouncedQuery]);

  const hasQuery = useMemo(() => debouncedQuery.trim().length > 0, [debouncedQuery]);

  return (
    <section>
      <SectionHeader
        eyebrow="Acervo"
        title="Catalogo"
        description="Busque livros por titulo, autor ou ISBN e descubra onde retirar o exemplar."
      />

      <SearchField
        label="Buscar no catalogo"
        placeholder="Ex.: Vidas Secas, Carolina Maria de Jesus, 978..."
        value={query}
        onChange={setQuery}
        onSubmit={() => {}}
        inputTestId="catalog-search-input"
        buttonTestId="catalog-search-button"
      />

      {hasQuery ? (
        <div className={styles.geoFallback} data-testid="geo-fallback">
          <div>
            <strong>Localizacao nao disponivel</strong>
            <p>Escolha seu bairro para ver a unidade mais proxima nos detalhes do livro.</p>
          </div>
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
      ) : null}

      {loading ? <LoadingState label="Consultando disponibilidade no catalogo..." /> : null}

      {!loading && books.length ? (
        <div className={styles.results} data-testid="catalog-results">
          {books.map((book) => (
            <BookCard key={book.id} book={book} selectedNeighborhood={selectedNeighborhood} />
          ))}
        </div>
      ) : null}

      {!loading && !books.length ? (
        <EmptyState
          title="Nenhum livro encontrado"
          message="Revise o termo digitado ou tente buscar por outro autor."
        />
      ) : null}
    </section>
  );
}

export default CatalogPage;
