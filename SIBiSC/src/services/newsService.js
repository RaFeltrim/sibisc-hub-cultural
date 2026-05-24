import { newsItems } from '../mocks/news';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';

export async function getNews() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .order('date', { ascending: false });
      if (!error && data) {
        return data.map((item) => ({
          id: item.id,
          category: item.category,
          date: item.date,
          title: item.title,
          sourceLabel: item.source_label,
          sourceUrl: item.source_url,
          summary: item.summary,
          paragraphs: item.paragraphs,
        }));
      }
    } catch {
      // fallback
    }
  }

  return [...newsItems].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getNewsById(newsId) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('id', newsId)
        .single();
      if (!error && data) {
        return {
          id: data.id,
          category: data.category,
          date: data.date,
          title: data.title,
          sourceLabel: data.source_label,
          sourceUrl: data.source_url,
          summary: data.summary,
          paragraphs: data.paragraphs,
        };
      }
    } catch {
      // fallback
    }
  }

  return newsItems.find((item) => item.id === newsId) ?? null;
}

export async function getNewsCategories() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .select('category');
      if (!error && data) {
        return [...new Set(data.map((item) => item.category))];
      }
    } catch {
      // fallback
    }
  }

  return [...new Set(newsItems.map((item) => item.category))];
}
