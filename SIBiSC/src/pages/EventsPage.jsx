import { useEffect, useMemo, useState } from 'react';
import EventCard from '../components/cards/EventCard';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingState from '../components/ui/LoadingState';
import { getEvents } from '../services/eventsService';
import { formatWeekdayDate, groupEventsByDay } from '../utils/formatters';
import styles from './EventsPage.module.css';

function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      const items = await getEvents();
      setEvents(items);
      setLoading(false);
    }

    loadEvents();
  }, []);

  const groupedEvents = useMemo(() => groupEventsByDay(events), [events]);

  if (loading) {
    return <LoadingState label="Carregando agenda e oficinas..." />;
  }

  return (
    <section data-testid="events-list">
      <SectionHeader
        eyebrow="Agenda cultural"
        title="Eventos"
        description="Oficinas, encontros, clubes de leitura e atividades distribuidas pela rede."
      />

      <div className={styles.groups} data-testid="events-calendar">
        {Object.entries(groupedEvents).map(([date, items]) => (
          <section key={date} className={styles.group}>
            <h3>{formatWeekdayDate(date)}</h3>
            <div className={styles.list}>
              {items.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default EventsPage;
