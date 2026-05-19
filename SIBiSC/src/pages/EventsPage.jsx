import { useEffect, useMemo, useState } from 'react';
import EventCard from '../components/cards/EventCard';
import SectionHeader from '../components/ui/SectionHeader';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import { getEvents } from '../services/eventsService';
import { formatWeekdayDate, groupEventsByDay } from '../utils/formatters';
import styles from './EventsPage.module.css';

function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      setLoading(true);
      setLoadError('');

      try {
        const items = await getEvents();

        if (!isMounted) return;

        setEvents(items);
      } catch {
        if (isMounted) {
          setEvents([]);
          setLoadError('Não foi possível carregar a agenda do protótipo agora.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
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
        description="Oficinas, encontros, clubes de leitura e atividades distribuídas pela rede."
        headingLevel={1}
      />

      {loadError ? <ErrorState title="Agenda indisponível" message={loadError} /> : null}

      {!loadError && events.length ? (
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
      ) : null}

      {!loadError && !events.length ? (
        <EmptyState
          title="Nenhum evento encontrado"
          message="A agenda local ainda não tem eventos para exibir neste protótipo."
        />
      ) : null}
    </section>
  );
}

export default EventsPage;
