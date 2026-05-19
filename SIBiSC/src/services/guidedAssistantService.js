import { bookItems } from '../mocks/books.js';
import { eventItems } from '../mocks/events.js';
import { newsItems } from '../mocks/news.js';
import { mockUser } from '../mocks/userProfile.js';

export const GUIDED_ASSISTANT_LIMIT_NOTICE =
  'Esta resposta usa dados locais do prototipo. A disponibilidade nao substitui confirmacao oficial da biblioteca e ainda nao ha reserva real nesta versao.';

const catalogById = new Map(bookItems.map((book) => [book.id, book]));
const eventById = new Map(eventItems.map((event) => [event.id, event]));
const newsById = new Map(newsItems.map((news) => [news.id, news]));

function getAvailability(book) {
  return book.inventory.reduce(
    (totals, item) => ({
      availableCount: totals.availableCount + item.available,
      totalCount: totals.totalCount + item.total,
    }),
    { availableCount: 0, totalCount: 0 }
  );
}

function createBookRecommendation(bookId, reason) {
  const book = catalogById.get(bookId);

  if (!book) {
    throw new Error(`Pergunta guiada referencia livro inexistente: ${bookId}`);
  }

  const availability = getAvailability(book);

  return {
    id: book.id,
    bookId: book.id,
    title: book.title,
    author: book.author,
    category: book.category,
    reason,
    availableCount: availability.availableCount,
    totalCount: availability.totalCount,
    source: 'catalogo-mock',
    limit: 'Disponibilidade mockada do catalogo local; confirme com a biblioteca antes de se deslocar.',
    nextAction: {
      label: 'Ver detalhe no catalogo',
      to: `/catalogo/${book.id}`,
    },
  };
}

function createEventReference(eventId, reason) {
  const event = eventById.get(eventId);

  if (!event) {
    throw new Error(`Pergunta guiada referencia evento inexistente: ${eventId}`);
  }

  return {
    id: event.id,
    title: event.title,
    reason,
    source: 'agenda local mockada',
    limit: 'Agenda de prototipo; horarios e inscricao devem ser confirmados nos canais oficiais.',
    nextAction: {
      label: 'Ver evento',
      to: `/eventos/${event.id}`,
    },
  };
}

function createNewsReference(newsId, reason) {
  const news = newsById.get(newsId);

  if (!news) {
    throw new Error(`Pergunta guiada referencia noticia inexistente: ${newsId}`);
  }

  return {
    id: news.id,
    title: news.title,
    reason,
    source: news.sourceLabel ?? 'noticias locais mockadas',
    limit: 'Conteudo editorial do prototipo; consulte a fonte oficial quando precisar de confirmacao institucional.',
    nextAction: {
      label: 'Ler noticia',
      to: `/noticias/${news.id}`,
    },
  };
}

export const guidedAssistantQuestions = [
  {
    id: 'literatura-brasileira',
    label: 'Quero uma leitura de literatura brasileira',
    shortLabel: 'Literatura brasileira',
    category: 'Leitura',
    answer: {
      title: 'Sugestoes de literatura brasileira',
      summary:
        'Usei autores e categorias presentes nas preferencias demonstrativas do perfil para priorizar livros reais do catalogo local.',
      recommendations: [
        createBookRecommendation('b7', 'Autor presente nas preferencias do cadastro: Graciliano Ramos.'),
        createBookRecommendation('b3', 'Autor presente nas preferencias do cadastro: Machado de Assis.'),
      ],
      source: 'catalogo-mock + preferencias demonstrativas',
      limit: GUIDED_ASSISTANT_LIMIT_NOTICE,
      nextAction: {
        label: 'Explorar catalogo',
        to: '/catalogo',
      },
    },
  },
  {
    id: 'machado-de-assis',
    label: 'Tenho interesse em Machado de Assis',
    shortLabel: 'Machado de Assis',
    category: 'Autor',
    answer: {
      title: 'Caminho por autor',
      summary: 'O catalogo local possui obras de Machado de Assis com exemplares mockados disponiveis.',
      recommendations: [
        createBookRecommendation('b3', 'Autor corresponde diretamente ao interesse informado.'),
        createBookRecommendation('b1', 'Autor corresponde diretamente ao interesse informado.'),
      ],
      source: 'catalogo-mock',
      limit: GUIDED_ASSISTANT_LIMIT_NOTICE,
      nextAction: {
        label: 'Buscar Machado no catalogo',
        to: '/catalogo',
      },
    },
  },
  {
    id: 'cidade-sociedade',
    label: 'Procuro temas de cidade e sociedade',
    shortLabel: 'Cidade e sociedade',
    category: 'Tema',
    answer: {
      title: 'Leituras sobre cidade, desigualdade e convivencia',
      summary: 'Comparei o tema com resumos e categorias do catalogo local, sem consultar base oficial externa.',
      recommendations: [
        createBookRecommendation('b2', 'Resumo aborda desigualdade, cidade e sobrevivencia.'),
        createBookRecommendation('b5', 'Resumo aborda cidade, habitacao coletiva e tensoes sociais.'),
      ],
      source: 'catalogo-mock',
      limit: GUIDED_ASSISTANT_LIMIT_NOTICE,
      nextAction: {
        label: 'Ver livros do catalogo',
        to: '/catalogo',
      },
    },
  },
  {
    id: 'confirmar-disponibilidade',
    label: 'Como vejo disponibilidade sem reservar?',
    shortLabel: 'Disponibilidade',
    category: 'Orientacao',
    answer: {
      title: 'Disponibilidade nesta versao',
      summary:
        'A disponibilidade exibida e demonstrativa e vem do inventario local do prototipo. Ela ajuda a escolher uma unidade, mas nao confirma retirada oficial.',
      recommendations: [
        createBookRecommendation('b7', 'Exemplo com maior contagem mockada para demonstrar a consulta por unidade.'),
      ],
      source: 'inventario local mockado',
      limit: GUIDED_ASSISTANT_LIMIT_NOTICE,
      nextAction: {
        label: 'Abrir catalogo para conferir detalhes',
        to: '/catalogo',
      },
    },
  },
  {
    id: 'eventos-leitura',
    label: 'Quais eventos combinam com leitura?',
    shortLabel: 'Eventos de leitura',
    category: 'Agenda',
    answer: {
      title: 'Eventos ligados a leitura',
      summary: 'Selecionei eventos locais que mencionam leitura, clube do livro ou rodas culturais.',
      references: [
        createEventReference('e3', 'Evento conectado a Vidas Secas, livro existente no catalogo local.'),
        createEventReference('e7', 'Roda de leitura com foco em poesia brasileira.'),
      ],
      source: 'agenda local mockada',
      limit: 'Agenda do prototipo; confirme data, horario, inscricao e local nos canais oficiais antes de participar.',
      nextAction: {
        label: 'Ver agenda completa',
        to: '/eventos',
      },
    },
  },
  {
    id: 'noticias-servicos',
    label: 'Quero entender novidades e servicos',
    shortLabel: 'Noticias e servicos',
    category: 'Noticias',
    answer: {
      title: 'Noticias para acompanhar o prototipo',
      summary: 'Separei conteudos editoriais locais sobre servicos digitais, acervo e programacao.',
      references: [
        createNewsReference('n1', 'Explica a orientacao digital e reforca que a disponibilidade e mockada.'),
        createNewsReference('n2', 'Contextualiza ampliacao de acervo e catalogacao.'),
      ],
      source: 'noticias locais mockadas',
      limit: 'As noticias aparecem como conteudo de prototipo e nao substituem comunicados oficiais.',
      nextAction: {
        label: 'Abrir noticias',
        to: '/noticias',
      },
    },
  },
  {
    id: 'preferencias',
    label: 'Minhas preferencias sao editaveis?',
    shortLabel: 'Preferencias',
    category: 'Perfil',
    answer: {
      title: 'Preferencias nesta versao',
      summary: `As preferencias de ${mockUser.name.split(' ')[0]} sao demonstrativas: ${mockUser.readingPreferences.categories.join(', ')}. Elas ajudam a explicar recomendacoes, mas ainda nao ha edicao simples ou persistencia real nesta Sprint.`,
      source: 'perfil mockado local',
      limit: 'Preferencias demonstrativas; nenhuma mudanca e salva em backend real nesta versao.',
      nextAction: {
        label: 'Ver perfil',
        to: '/perfil',
      },
    },
  },
  {
    id: 'sem-reserva-real',
    label: 'Posso reservar ou renovar pelo assistente?',
    shortLabel: 'Reserva e renovacao',
    category: 'Limite',
    answer: {
      title: 'Sem reserva real pelo assistente',
      summary:
        'O Feltrim Agents orienta caminhos no prototipo, mas nao executa reserva, pre-reserva, renovacao oficial ou contato com SIBI/PHL.',
      source: 'contrato Sprint 1',
      limit: GUIDED_ASSISTANT_LIMIT_NOTICE,
      nextAction: {
        label: 'Consultar detalhes no catalogo',
        to: '/catalogo',
      },
    },
  },
  {
    id: 'fora-do-escopo',
    label: 'Tenho outra duvida fora desta lista',
    shortLabel: 'Fora do escopo',
    category: 'Fallback',
    answer: {
      title: 'Resposta honesta do prototipo',
      summary:
        'Ainda nao tenho chat aberto, IA generativa, catalogo oficial em tempo real ou integracao com atendimento. Posso orientar pelos caminhos fechados desta tela, catalogo, eventos, noticias e perfil.',
      source: 'escopo funcional Sprint 1',
      limit: 'Nao vou inventar disponibilidade, horario, reserva, fonte oficial ou integracao que nao existe nesta versao.',
      nextAction: {
        label: 'Explorar catalogo',
        to: '/catalogo',
      },
    },
  },
];

export function getGuidedAssistantQuestion(questionId) {
  return guidedAssistantQuestions.find((question) => question.id === questionId) ?? guidedAssistantQuestions[0];
}
