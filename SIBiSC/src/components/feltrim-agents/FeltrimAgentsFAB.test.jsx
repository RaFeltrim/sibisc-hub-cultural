import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ActiveFABProvider } from '../ActiveFABContext';
import FeltrimAgentsFAB from './FeltrimAgentsFAB';

vi.mock('../../services/catalogService', () => ({
  searchBooks: vi.fn().mockResolvedValue([]),
}));

vi.mock('../../services/userProfileService', () => ({
  getUserProfile: vi.fn().mockResolvedValue({
    name: 'Rafael Teste',
    readingPreferences: { categories: [], authors: [], topics: [] },
  }),
  getRecommendations: vi.fn().mockResolvedValue([]),
}));

function renderFAB() {
  return render(
    <MemoryRouter>
      <ActiveFABProvider>
        <FeltrimAgentsFAB />
      </ActiveFABProvider>
    </MemoryRouter>,
  );
}

describe('FeltrimAgentsFAB', () => {
  it('renders the floating button without crash', () => {
    renderFAB();
    expect(
      screen.getByRole('button', { name: /feltrim agents — assistente guiado/i }),
    ).toBeInTheDocument();
  });

  it('button has an accessible aria-label', () => {
    renderFAB();
    const fab = screen.getByRole('button', { name: /feltrim agents — assistente guiado/i });
    expect(fab).toHaveAttribute('aria-label');
  });

  it('popup is closed by default (aria-expanded false, no dialog)', () => {
    renderFAB();
    const fab = screen.getByRole('button', { name: /feltrim agents — assistente guiado/i });
    expect(fab).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('clicking the FAB opens the popup (aria-expanded true, dialog visible)', async () => {
    const user = userEvent.setup();
    renderFAB();
    const fab = screen.getByRole('button', { name: /feltrim agents — assistente guiado/i });
    await user.click(fab);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(fab).toHaveAttribute('aria-expanded', 'true');
  });

  it('popup shows the guided questions section', async () => {
    const user = userEvent.setup();
    renderFAB();
    await user.click(screen.getByRole('button', { name: /feltrim agents — assistente guiado/i }));
    expect(screen.getByText('Perguntas guiadas')).toBeInTheDocument();
  });

  it('popup shows a search field', async () => {
    const user = userEvent.setup();
    renderFAB();
    await user.click(screen.getByRole('button', { name: /feltrim agents — assistente guiado/i }));
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('close button inside the dialog closes the popup', async () => {
    const user = userEvent.setup();
    renderFAB();
    await user.click(screen.getByRole('button', { name: /feltrim agents — assistente guiado/i }));
    const dialog = screen.getByRole('dialog');
    const closeBtn = within(dialog).getByRole('button', { name: /fechar feltrim agents/i });
    await user.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('pressing Escape closes the popup', async () => {
    const user = userEvent.setup();
    renderFAB();
    await user.click(screen.getByRole('button', { name: /feltrim agents — assistente guiado/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
