import { bookItems } from '../mocks/books';
import { units } from '../mocks/units';
import { normalizeText } from '../utils/formatters';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';

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
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*, book_inventory(*, library_units(*))');
      
      if (!error && data) {
        return data.map((b) => {
          const inventory = (b.book_inventory || []).map((item) => ({
            unitId: item.unit_id,
            available: item.available,
            total: item.total,
            callNumber: item.call_number,
            shelf: item.shelf,
            distanceByNeighborhood: item.distance_by_neighborhood,
            unit: item.library_units ? {
              id: item.library_units.id,
              name: item.library_units.name,
              neighborhood: item.library_units.neighborhood,
              address: item.library_units.address,
              hours: item.library_units.hours,
              contact: item.library_units.contact,
              latitude: item.library_units.latitude,
              longitude: item.library_units.longitude,
            } : null,
          }));
          return {
            id: b.id,
            category: b.category,
            title: b.title,
            author: b.author,
            isbn: b.isbn,
            year: b.year,
            publisher: b.publisher,
            pages: b.pages,
            summary: b.summary,
            inventory,
            totalAvailable: inventory.reduce((sum, item) => sum + item.available, 0),
          };
        });
      }
    } catch {
      // fallback
    }
  }

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
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*, book_inventory(*, library_units(*))')
        .eq('id', bookId)
        .single();
      
      if (!error && data) {
        const inventory = (data.book_inventory || []).map((item) => ({
          unitId: item.unit_id,
          available: item.available,
          total: item.total,
          callNumber: item.call_number,
          shelf: item.shelf,
          distanceByNeighborhood: item.distance_by_neighborhood,
          unit: item.library_units ? {
            id: item.library_units.id,
            name: item.library_units.name,
            neighborhood: item.library_units.neighborhood,
            address: item.library_units.address,
            hours: item.library_units.hours,
            contact: item.library_units.contact,
            latitude: item.library_units.latitude,
            longitude: item.library_units.longitude,
          } : null,
        }));
        return {
          id: data.id,
          category: data.category,
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          year: data.year,
          publisher: data.publisher,
          pages: data.pages,
          summary: data.summary,
          inventory,
          totalAvailable: inventory.reduce((sum, item) => sum + item.available, 0),
        };
      }
    } catch {
      // fallback
    }
  }

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
