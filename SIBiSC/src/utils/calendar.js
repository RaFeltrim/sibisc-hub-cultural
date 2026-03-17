export function createGoogleCalendarUrl(event) {
  const start = `${event.date.replace(/-/g, '')}T${event.startTime.replace(':', '')}00`;
  const end = `${event.date.replace(/-/g, '')}T${event.endTime.replace(':', '')}00`;
  const params = new URLSearchParams({
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.locationName,
    pli: '1',
  });

  return `https://calendar.google.com/calendar/u/0/r/eventedit?${params.toString()}`;
}
