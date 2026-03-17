import { eventItems } from '../mocks/events';

export async function getEvents() {
  return [...eventItems].sort((a, b) => {
    const left = `${a.date} ${a.startTime}`;
    const right = `${b.date} ${b.startTime}`;
    return left > right ? 1 : -1;
  });
}

export async function getEventById(eventId) {
  return eventItems.find((item) => item.id === eventId) ?? null;
}
