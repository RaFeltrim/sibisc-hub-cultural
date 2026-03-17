import { bookItems } from '../mocks/books';
import { units } from '../mocks/units';
import { normalizeText } from '../utils/formatters';

function hydrateInventory(book) {
  return book.inventory.map((item) => ({
    ...item,
    unit: units.find((unit) => unit.id === item.unitId),
  }));
}

export function getNearestAvailableInventory(book, neighborhood = 'Centro') {
  const hydrated = hydrateInventory(book)
    .filter((item) => item.available > 0)
    .sort((left, right) => {
      const leftDistance = Number.parseFloat(left.distanceByNeighborhood[neighborhood]);
      const rightDistance = Number.parseFloat(right.distanceByNeighborhood[neighborhood]);
      return leftDistance - rightDistance;
    });

  return hydrated[0] ?? null;
}

export async function getBooks() {
  return bookItems.map((book) => ({
    ...book,
    totalAvailable: book.inventory.reduce((sum, item) => sum + item.available, 0),
  }));
}

export async function searchBooks(query) {
  const normalizedQuery = normalizeText(query || '');
  const books = await getBooks();

  if (!normalizedQuery) {
    return books.sort((a, b) => b.totalAvailable - a.totalAvailable);
  }

  return books.filter((book) => {
    const haystack = normalizeText(`${book.title} ${book.author} ${book.isbn}`);
    return haystack.includes(normalizedQuery);
  });
}

export async function getBookById(bookId) {
  const book = bookItems.find((item) => item.id === bookId);

  if (!book) {
    return null;
  }

  return {
    ...book,
    totalAvailable: book.inventory.reduce((sum, item) => sum + item.available, 0),
    inventory: hydrateInventory(book),
  };
}
