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
  const [loadError, setLoadError] = useState('');
  const [event, setEvent] = useState(null);
  const [calendarStatus, setCalendarStatus] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadEvent() {
      setLoading(true);
      setLoadError('');

      try {
        const item = await getEventById(eventId);

        if (!isMounted) return;

        setEvent(item);
      } catch {
        if (isMounted) {
          setEvent(null);
          setLoadError('Não foi possível buscar os detalhes do evento neste protótipo.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEvent();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  if (loading) {
    return <LoadingState label="Buscando detalhes do evento..." />;
  }

  if (loadError) {
    return <ErrorState title="Evento indisponível" message={loadError} />;
  }

  if (!event) {
    return (
      <ErrorState
        title="Evento não encontrado"
        message="O evento procurado não está mais disponível na agenda."
      />
    );
  }

  const calendarUrl = createGoogleCalendarUrl(event);

  return (
    <article className={styles.article} data-testid="event-detail">
      <Link className={styles.backLink} to="/eventos">
        Voltar para agenda
      </Link>

      <span className={styles.category}>{event.category}</span>
      <h1>{event.title}</h1>

      <div className={styles.infoGrid}>
        <div>
          <strong>Data e horário</strong>
          <p>{formatWeekdayDate(event.date)}</p>
          <p>{formatEventTimeRange(event.startTime, event.endTime)}</p>
        </div>
        <div>
          <strong>Local</strong>
          <p>{event.locationName}</p>
          <p>{event.locationAddress}</p>
        </div>
        <div>
          <strong>Público</strong>
          <p>{event.audience}</p>
        </div>
        <div>
          <strong>Inscrição</strong>
          <p>{event.signup}</p>
        </div>
      </div>

      <p className={styles.description}>{event.description}</p>

      <div className={styles.calendarBox}>
        <div>
          <strong>Adicionar ao seu calendário</strong>
          <p>Abra o evento no Google Calendar para salvar o lembrete com data, horário e local.</p>
        </div>
        <button
          data-testid="event-add-calendar"
          className={styles.calendarButton}
          type="button"
          onClick={() => {
            const calendarWindow = window.open(calendarUrl, '_blank', 'noopener,noreferrer');
            setCalendarStatus(
              calendarWindow
                ? 'Google Calendar aberto em uma nova aba.'
                : 'Google Calendar solicitado em uma nova aba. Se nada abrir, permita pop-ups para salvar o evento.'
            );
          }}
        >
          Abrir Google Calendar
        </button>
        {calendarStatus ? (
          <p className={styles.calendarStatus} role="status" aria-live="polite">
            {calendarStatus}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export default EventDetailPage;
