import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActiveFABProvider } from '../ActiveFABContext';
import FeedbackFAB from './FeedbackFAB';

function renderFAB() {
  return render(
    <ActiveFABProvider>
      <FeedbackFAB />
    </ActiveFABProvider>,
  );
}

describe('FeedbackFAB', () => {
  it('renders the floating button without crash', () => {
    renderFAB();
    expect(
      screen.getByRole('button', { name: /abrir painel de feedback sobre o sibisc/i }),
    ).toBeInTheDocument();
  });

  it('button has an accessible aria-label', () => {
    renderFAB();
    const fab = screen.getByRole('button', { name: /abrir painel de feedback sobre o sibisc/i });
    expect(fab).toHaveAttribute('aria-label');
  });

  it('popup is closed by default (aria-expanded false, no dialog)', () => {
    renderFAB();
    const fab = screen.getByRole('button', { name: /abrir painel de feedback sobre o sibisc/i });
    expect(fab).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('clicking the FAB opens the popup (aria-expanded true, dialog visible)', async () => {
    const user = userEvent.setup();
    renderFAB();
    const fab = screen.getByRole('button', { name: /abrir painel de feedback sobre o sibisc/i });
    await user.click(fab);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(fab).toHaveAttribute('aria-expanded', 'true');
  });

  it('popup has the expected title', async () => {
    const user = userEvent.setup();
    renderFAB();
    await user.click(screen.getByRole('button', { name: /abrir painel de feedback/i }));
    expect(
      screen.getByText('Tem um feedback sobre o SIBiSC? Nos envie!'),
    ).toBeInTheDocument();
  });

  it('popup contains the GitHub Issues link', async () => {
    const user = userEvent.setup();
    renderFAB();
    await user.click(screen.getByRole('button', { name: /abrir painel de feedback/i }));
    const link = screen.getByRole('link', { name: /github issues/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('github.com'));
  });

  it('close button (X) inside the dialog closes the popup', async () => {
    const user = userEvent.setup();
    renderFAB();
    await user.click(screen.getByRole('button', { name: /abrir painel de feedback/i }));
    const dialog = screen.getByRole('dialog');
    const closeBtn = within(dialog).getByRole('button', { name: /fechar painel de feedback/i });
    await user.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('pressing Escape closes the popup', async () => {
    const user = userEvent.setup();
    renderFAB();
    await user.click(screen.getByRole('button', { name: /abrir painel de feedback/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
