import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import { getEventById } from '../services/eventsService';
import { createGoogleCalendarUrl } from '../utils/calendar';
import { formatEventTimeRange, formatWeekdayDate } from '../utils/formatters';
import styles from './EventDetailPage.module.css';

function EventDetailPage() {
  const { eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function loadEvent() {
      setLoading(true);
      const item = await getEventById(eventId);
      setEvent(item);
      setLoading(false);
    }

    loadEvent();
  }, [eventId]);

  if (loading) {
    return <LoadingState label="Buscando detalhes do evento..." />;
  }

  if (!event) {
    return (
      <ErrorState
        title="Evento nao encontrado"
        message="O evento procurado nao esta mais disponivel na agenda."
      />
    );
  }

  const calendarUrl = createGoogleCalendarUrl(event);

  return (
    <article className={styles.article} data-testid="event-detail">
      <Link className={styles.backLink} to="/eventos">
        Voltar para Agenda
      </Link>

      <span className={styles.category}>{event.category}</span>
      <h1>{event.title}</h1>

      <div className={styles.infoGrid}>
        <div>
          <strong>Data e horario</strong>
          <p>{formatWeekdayDate(event.date)}</p>
          <p>{formatEventTimeRange(event.startTime, event.endTime)}</p>
        </div>
        <div>
          <strong>Local</strong>
          <p>{event.locationName}</p>
          <p>{event.locationAddress}</p>
        </div>
        <div>
          <strong>Publico</strong>
          <p>{event.audience}</p>
        </div>
        <div>
          <strong>Inscricao</strong>
          <p>{event.signup}</p>
        </div>
      </div>

      <p className={styles.description}>{event.description}</p>

      <div className={styles.calendarBox}>
        <div>
          <strong>Adicionar ao seu calendario</strong>
          <p>Abra o evento no Google Calendar para salvar o lembrete.</p>
        </div>
        <button
          data-testid="event-add-calendar"
          className={styles.calendarButton}
          type="button"
          onClick={() => window.open(calendarUrl, '_blank', 'noopener,noreferrer')}
        >
          Abrir Google Calendar
        </button>
      </div>
    </article>
  );
}

export default EventDetailPage;
