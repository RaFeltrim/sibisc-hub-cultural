const longDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const weekdayDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
});

export function formatLongDate(value) {
  return longDateFormatter.format(new Date(`${value}T12:00:00`));
}

export function formatWeekdayDate(value) {
  return weekdayDateFormatter.format(new Date(`${value}T12:00:00`));
}

export function formatEventTimeRange(startTime, endTime) {
  return `${startTime} - ${endTime}`;
}

export function groupEventsByDay(events) {
  return events.reduce((groups, event) => {
    const key = event.date;
    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(event);
    return groups;
  }, {});
}

export function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
