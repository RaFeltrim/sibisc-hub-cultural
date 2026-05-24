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
    source: 'catalogo',
    limit: 'Confirme a disponibilidade atual na unidade antes de se deslocar.',
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
    source: 'agenda',
    limit: 'Horários e inscrições devem ser confirmados nos canais oficiais.',
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
    source: news.sourceLabel ?? 'notícias',
    limit: 'Consulte os canais de atendimento oficiais para esclarecer quaisquer dúvidas.',
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
        'Sugestões baseadas nas preferências do seu perfil e nos livros mais buscados do catálogo.',
      recommendations: [
        createBookRecommendation('b7', 'Autor presente nas preferências do cadastro: Graciliano Ramos.'),
        createBookRecommendation('b3', 'Autor presente nas preferências do cadastro: Machado de Assis.'),
      ],
      source: 'catálogo + preferências',
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
      summary: 'O acervo possui as seguintes obras disponíveis de Machado de Assis.',
      recommendations: [
        createBookRecommendation('b3', 'Autor corresponde diretamente ao interesse informado.'),
        createBookRecommendation('b1', 'Autor corresponde diretamente ao interesse informado.'),
      ],
      source: 'catálogo',
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
      summary: 'Sugestões de obras que abordam dinâmicas urbanas, desigualdade e convivência social.',
      recommendations: [
        createBookRecommendation('b2', 'Resumo aborda desigualdade, cidade e sobrevivência.'),
        createBookRecommendation('b5', 'Resumo aborda cidade, habitação coletiva e tensões sociais.'),
      ],
      source: 'catálogo',
      limit: GUIDED_ASSISTANT_LIMIT_NOTICE,
      nextAction: {
        label: 'Ver livros do catalogo',
        to: '/catalogo',
      },
    },
  },
  {
    id: 'confirmar-disponibilidade',
    label: 'Como vejo a disponibilidade dos livros?',
    shortLabel: 'Disponibilidade',
    category: 'Orientação',
    answer: {
      title: 'Verificar disponibilidade',
      summary:
        'A disponibilidade exibida reflete os exemplares cadastrados em cada unidade. Você pode conferir os números específicos ao abrir a página de detalhes de cada livro.',
      recommendations: [
        createBookRecommendation('b7', 'Exemplo de livro com disponibilidade detalhada por unidade.'),
      ],
      source: 'inventário',
      limit: GUIDED_ASSISTANT_LIMIT_NOTICE,
      nextAction: {
        label: 'Abrir catálogo para conferir detalhes',
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
      source: 'agenda',
      limit: 'Confirme data, horário, inscrição e local nos canais oficiais antes de participar.',
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
      title: 'Últimas notícias e serviços',
      summary: 'Confira as novidades recentes sobre serviços digitais, acervo e programação cultural.',
      references: [
        createNewsReference('n1', 'Explicação sobre a orientação digital e serviços do acervo.'),
        createNewsReference('n2', 'Contextualização sobre a ampliação do acervo.'),
      ],
      source: 'notícias',
      limit: 'Consulte os canais oficiais de comunicação para mais informações.',
      nextAction: {
        label: 'Abrir noticias',
        to: '/noticias',
      },
    },
  },
  {
    id: 'preferencias',
    label: 'Como posso alterar minhas preferências?',
    shortLabel: 'Preferências',
    category: 'Perfil',
    answer: {
      title: 'Editar preferências de leitura',
      summary: `Suas preferências de leitura atuais são: ${mockUser.readingPreferences.categories.join(', ')}. Elas são utilizadas para personalizar suas recomendações de livros. Você pode revisá-las em seu perfil de usuário.`,
      source: 'perfil do usuário',
      limit: 'Para atualizar seu cadastro de interesses, entre em contato com o atendimento da biblioteca.',
      nextAction: {
        label: 'Ver perfil',
        to: '/perfil',
      },
    },
  },
  {
    id: 'sem-reserva-real',
    label: 'Como fazer reservas e renovações?',
    shortLabel: 'Reserva e renovação',
    category: 'Serviços',
    answer: {
      title: 'Reservar ou renovar obras',
      summary:
        'Você pode renovar seus empréstimos ativos diretamente pela aba de empréstimos do seu Perfil de Usuário. Para reservas de novas obras, consulte a disponibilidade no catálogo e dirija-se à unidade correspondente.',
      source: 'serviços do usuário',
      limit: GUIDED_ASSISTANT_LIMIT_NOTICE,
      nextAction: {
        label: 'Ir para o perfil de usuário',
        to: '/perfil',
      },
    },
  },
  {
    id: 'fora-do-escopo',
    label: 'Tenho outras dúvidas sobre a biblioteca',
    shortLabel: 'Outras dúvidas',
    category: 'Ajuda',
    answer: {
      title: 'Canais de atendimento e suporte',
      summary:
        'Se você tiver dúvidas sobre multas, doações, uso de salas de estudo ou acesso aos computadores, recomendamos consultar a central de atendimento ou falar diretamente com a recepção da sua unidade.',
      source: 'suporte ao leitor',
      limit: 'Informações sobre outros serviços podem ser obtidas presencialmente ou por telefone.',
      nextAction: {
        label: 'Explorar catálogo',
        to: '/catalogo',
      },
    },
  },
];

export function getGuidedAssistantQuestion(questionId) {
  return guidedAssistantQuestions.find((question) => question.id === questionId) ?? guidedAssistantQuestions[0];
}
