import { eventItems } from '../mocks/events';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';

export async function getEvents() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .order('start_time', { ascending: true });
      if (!error && data) {
        return data.map((item) => ({
          id: item.id,
          category: item.category,
          date: item.date,
          startTime: item.start_time,
          endTime: item.end_time,
          title: item.title,
          audience: item.audience,
          locationName: item.location_name,
          locationAddress: item.location_address,
          signup: item.signup,
          description: item.description,
        }));
      }
    } catch {
      // fallback
    }
  }

  return [...eventItems].sort((a, b) => {
    const left = `${a.date} ${a.startTime}`;
    const right = `${b.date} ${b.startTime}`;
    return left > right ? 1 : -1;
  });
}

export async function getEventById(eventId) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();
      if (!error && data) {
        return {
          id: data.id,
          category: data.category,
          date: data.date,
          startTime: data.start_time,
          endTime: data.end_time,
          title: data.title,
          audience: data.audience,
          locationName: data.location_name,
          locationAddress: data.location_address,
          signup: data.signup,
          description: data.description,
        };
      }
    } catch {
      // fallback
    }
  }

  return eventItems.find((item) => item.id === eventId) ?? null;
}
