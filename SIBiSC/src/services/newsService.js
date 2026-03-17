import { newsItems } from '../mocks/news';

export async function getNews() {
  return [...newsItems].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getNewsById(newsId) {
  return newsItems.find((item) => item.id === newsId) ?? null;
}

export async function getNewsCategories() {
  return [...new Set(newsItems.map((item) => item.category))];
}
