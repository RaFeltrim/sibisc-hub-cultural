import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../components/cards/NewsCard';
import EventCard from '../components/cards/EventCard';
import SearchField from '../components/ui/SearchField';
import SectionHeader from '../components/ui/SectionHeader';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import { getNews } from '../services/newsService';
import { getEvents } from '../services/eventsService';
import { searchBooks } from '../services/catalogService';
import { getRecommendations, getUserProfile } from '../services/userProfileService';
import {
  GUIDED_ASSISTANT_LIMIT_NOTICE,
  getGuidedAssistantQuestion,
  guidedAssistantQuestions,
} from '../services/guidedAssistantService';
import {
  SOFIA_CLAUDIA_FEEDBACK_FLOW,
  SOFIA_CLAUDIA_FEEDBACK_ISSUE_URL,
  SOFIA_CLAUDIA_PRIVACY_NOTICE,
} from '../services/feedbackService';
import useDebouncedValue from '../hooks/useDebouncedValue';
import styles from './HomePage.module.css';

const assistantActions = [
  { to: '/catalogo', label: 'Encontrar leitura', detail: 'livros disponíveis por interesse' },
  { to: '/eventos', label: 'Orientar agenda', detail: 'atividades alinhadas ao perfil' },
  { to: '/perfil', label: 'Revisar preferências', detail: 'dados usados nas sugestões' },
];

const assistantCapabilities = [
  {
    name: 'Ajuda durante o uso',
    status: 'Explica busca, perfil, empréstimos e disponibilidade.',
    detail: 'apoio contextual',
  },
  {
    name: 'Recomendações de leitura',
    status: 'Cruza interesses cadastrados com exemplares disponíveis.',
    detail: 'baseado no cadastro',
  },
  {
    name: 'Orientação cultural',
    status: 'Sugere caminhos entre notícias, eventos e acervo.',
    detail: 'rede SIBiSC',
  },
];

function getQuickMatches(books, searchTerm) {
  const normalizedTerm = searchTerm.trim().toLowerCase();

  if (!normalizedTerm) {
    return [];
  }

  return books.filter((book) => {
    const haystack = `${book.title} ${book.author} ${book.isbn}`.toLowerCase();
    return haystack.includes(normalizedTerm);
  });
}

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [catalogBooks, setCatalogBooks] = useState([]);
  const [profile, setProfile] = useState(null);
  const [assistantRecommendations, setAssistantRecommendations] = useState([]);
  const [query, setQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState(guidedAssistantQuestions[0].id);
  const debouncedQuery = useDebouncedValue(query, 180);

  useEffect(() => {
    let isMounted = true;

    async function loadHome() {
      setLoading(true);
      setLoadError('');

      try {
        const [newsItems, eventItems, bookItems, profileData, recommendationItems] = await Promise.all([
          getNews(),
          getEvents(),
          searchBooks(''),
          getUserProfile(),
          getRecommendations(),
        ]);

        if (!isMounted) return;

        setNews(newsItems.slice(0, 3));
        setEvents(eventItems.slice(0, 3));
        setCatalogBooks(bookItems);
        setProfile(profileData);
        setAssistantRecommendations(recommendationItems.slice(0, 2));
      } catch {
        if (isMounted) {
          setLoadError('Não foi possível montar a Home do protótipo agora. Tente recarregar a página.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadHome();

    return () => {
      isMounted = false;
    };
  }, []);

  const quickMatches = useMemo(() => {
    return getQuickMatches(catalogBooks, debouncedQuery);
  }, [catalogBooks, debouncedQuery]);

  const selectedGuide = useMemo(() => getGuidedAssistantQuestion(selectedGuideId), [selectedGuideId]);

  const assistantMetrics = [
    { value: profile?.readingPreferences.categories.length ?? 0, label: 'interesses' },
    { value: assistantRecommendations.length, label: 'sugestões agora' },
    { value: '4', label: 'unidades' },
  ];

  function handleAssistantSearch() {
    const term = query.trim();

    if (!term) {
      setSearchStatus('Digite um título, autor, ISBN ou tema para o Feltrim Agents orientar a busca.');
      return;
    }

    const matches = getQuickMatches(catalogBooks, term);
    const countLabel = matches.length === 1 ? '1 sugestão' : `${matches.length} sugestões`;

    setSearchStatus(
      matches.length
        ? `Feltrim Agents encontrou ${countLabel} no catálogo local. Abra um resultado para ver disponibilidade.`
        : 'Feltrim Agents não encontrou uma sugestão segura no catálogo local. Tente outro termo ou explore o catálogo completo.'
    );
  }

  if (loading) {
    return <LoadingState label="Montando a vitrine principal do SIBiSC..." />;
  }

  if (loadError) {
    return <ErrorState title="Home indisponível" message={loadError} />;
  }

  return (
    <>
      <section className={styles.hero} data-testid="home-hero">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Assistente guiado do SIBiSC</p>
          <h1>Feltrim Agents ajuda você a encontrar a próxima leitura.</h1>
          <p className={styles.description}>
            Protótipo de assistente inteligente para tirar dúvidas, orientar a navegação
            e recomendar livros disponíveis a partir dos interesses informados no cadastro.
            Nesta versão, as respostas usam dados locais do catálogo, eventos, notícias e perfil.
          </p>
          <div className={styles.metrics}>
            <span>preferências do cadastro</span>
            <span>recomendações disponíveis</span>
            <span>apoio durante a navegação</span>
          </div>

          <div className={styles.commandLinks} aria-label="Ações assistidas do SIBiSC">
            {assistantActions.map((action) => (
              <Link key={action.to} className={styles.commandLink} to={action.to}>
                <strong>{action.label}</strong>
                <span>{action.detail}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.heroVisual} aria-label="Prévia do assistente guiado do SIBiSC">
          <div className={styles.console}>
            <div className={styles.consoleChrome}>
              <span />
              <span />
              <span />
              <strong>assistente/sibisc</strong>
            </div>

            <div className={styles.consoleHeader}>
              <div>
                <p>Assistente em protótipo</p>
                <strong>Feltrim Agents</strong>
              </div>
              <span className={styles.liveBadge}>prévia</span>
            </div>

            <div className={styles.pipelineList}>
              {assistantCapabilities.map((capability) => (
                <div key={capability.name} className={styles.pipelineItem}>
                  <span className={styles.pipelineDot} aria-hidden="true" />
                  <div>
                    <strong>{capability.name}</strong>
                    <p>{capability.status}</p>
                  </div>
                  <em>{capability.detail}</em>
                </div>
              ))}
            </div>

            <div className={styles.consoleMetrics}>
              {assistantMetrics.map((metric) => (
                <span key={metric.label}>
                  <strong>{metric.value}</strong>
                  {metric.label}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.heroPanel}>
            <SearchField
              label="Busca assistida no catálogo"
              placeholder="Digite título, autor ou ISBN"
              value={query}
              onChange={(nextValue) => {
                setQuery(nextValue);
                if (!nextValue.trim()) {
                  setSearchStatus('');
                }
              }}
              onSubmit={handleAssistantSearch}
              buttonLabel="Explorar"
              statusMessage={searchStatus}
            />

            <div className={styles.guideList} aria-label="Perguntas que o Feltrim Agents orienta nesta versão">
              <strong>Perguntas guiadas</strong>
              <div className={styles.guideButtons}>
                {guidedAssistantQuestions.map((guide) => (
                  <button
                    key={guide.id}
                    type="button"
                    className={styles.guideButton}
                    aria-pressed={guide.id === selectedGuideId}
                    aria-controls="guided-assistant-answer"
                    onClick={() => setSelectedGuideId(guide.id)}
                  >
                    <span>{guide.shortLabel}</span>
                    <em>{guide.category}</em>
                  </button>
                ))}
              </div>
            </div>

            <section
              id="guided-assistant-answer"
              className={styles.guidedAnswer}
              aria-live="polite"
              aria-atomic="true"
              aria-labelledby="guided-answer-title"
            >
              <span className={styles.answerCategory}>{selectedGuide.category}</span>
              <h2 id="guided-answer-title">{selectedGuide.answer.title}</h2>
              <p>{selectedGuide.answer.summary}</p>

              {selectedGuide.answer.recommendations?.length ? (
                <div className={styles.answerItems} aria-label="Recomendações explicáveis">
                  {selectedGuide.answer.recommendations.map((item) => (
                    <Link key={item.id} className={styles.answerItem} to={item.nextAction.to}>
                      <strong>{item.title}</strong>
                      <span>Motivo: {item.reason}</span>
                      <span>
                        Fonte/limite: {item.source}; {item.limit}
                      </span>
                      <em>
                        Próxima ação: {item.nextAction.label}. {item.availableCount} de {item.totalCount} exemplares
                        no inventário local.
                      </em>
                    </Link>
                  ))}
                </div>
              ) : null}

              {selectedGuide.answer.references?.length ? (
                <div className={styles.answerItems} aria-label="Referências locais explicáveis">
                  {selectedGuide.answer.references.map((item) => (
                    <Link key={item.id} className={styles.answerItem} to={item.nextAction.to}>
                      <strong>{item.title}</strong>
                      <span>Motivo: {item.reason}</span>
                      <span>
                        Fonte/limite: {item.source}; {item.limit}
                      </span>
                      <em>Próxima ação: {item.nextAction.label}</em>
                    </Link>
                  ))}
                </div>
              ) : null}

              <p className={styles.limitNotice}>
                <strong>Fonte/limite:</strong> {selectedGuide.answer.source}. {selectedGuide.answer.limit}
              </p>
              <Link className={styles.answerAction} to={selectedGuide.answer.nextAction.to}>
                {selectedGuide.answer.nextAction.label}
              </Link>
            </section>

            {query.trim() ? (
              <div className={styles.quickResults}>
                {quickMatches.length ? (
                  quickMatches.slice(0, 4).map((book) => (
                    <Link key={book.id} className={styles.quickResult} to={`/catalogo/${book.id}`}>
                      <strong>{book.title}</strong>
                      <span>{book.author}</span>
                    </Link>
                  ))
                ) : (
                  <EmptyState
                    title="Nenhum livro encontrado"
                    message="Tente outro termo para a busca rápida ou abra o catálogo completo para explorar por disponibilidade."
                  />
                )}
              </div>
            ) : (
              <div className={styles.heroNote}>
                <strong>Recomendado pelo assistente</strong>
                <p>
                  Sugestões baseadas nas preferências cadastradas de {profile?.name.split(' ')[0] ?? 'leitor'}{' '}
                  e na disponibilidade mockada do acervo. Não há backend de IA ou reserva real nesta prévia.
                </p>
                <p className={styles.limitNotice}>{GUIDED_ASSISTANT_LIMIT_NOTICE}</p>
                <div className={styles.recommendationList}>
                  {assistantRecommendations.slice(0, 1).map((book) => (
                    <Link key={book.id} className={styles.recommendationItem} to={`/catalogo/${book.bookId}`}>
                      <strong>{book.title}</strong>
                      <span>Motivo: {book.reason}</span>
                      <em>
                        Abrir detalhe. {book.availableCount} exemplares disponíveis no catálogo local.
                      </em>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.feedbackPanel} aria-labelledby="feedback-sofia-claudia-title">
        <div>
          <p className={styles.feedbackEyebrow}>Feedback operacional</p>
          <h2 id="feedback-sofia-claudia-title">Ajude Sofia e Claudia a melhorar o protótipo</h2>
          <p>
            Use o canal oficial em GitHub Issues para relatar dúvida, bug, recomendação pouco útil,
            problema de acessibilidade ou sugestão. O registro usa template com rota, passos,
            esperado, observado, severidade, status e critério de fechamento.
          </p>
          <p className={styles.feedbackPrivacy}>{SOFIA_CLAUDIA_PRIVACY_NOTICE}</p>
        </div>
        <div className={styles.feedbackFlow} aria-label="Como o feedback será tratado">
          {SOFIA_CLAUDIA_FEEDBACK_FLOW.map((step, index) => (
            <span key={step}>
              <strong>{index + 1}</strong>
              {step}
            </span>
          ))}
        </div>
        <a
          className={styles.feedbackAction}
          href={SOFIA_CLAUDIA_FEEDBACK_ISSUE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enviar feedback via GitHub Issues com o template de feedback Sofia e Claudia"
        >
          Enviar feedback via GitHub Issues
        </a>
      </section>

      <section>
        <SectionHeader
          eyebrow="Editorial"
          title="Últimas notícias"
          description="Atualizações sobre serviços, acervo e vida cultural das bibliotecas."
          linkTo="/noticias"
          linkLabel="Ver todas"
        />
        <div className={styles.grid}>
          {news.map((item) => (
            <NewsCard key={item.id} item={item} compact />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Agenda"
          title="Próximos encontros"
          description="Atividades pensadas para estudo, comunidade e circulação cultural."
          linkTo="/eventos"
          linkLabel="Ver agenda"
        />
        <div className={styles.eventGrid}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
