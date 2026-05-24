import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { units } from '../../mocks/units';
import BottomNav from './BottomNav';
import styles from './AppLayout.module.css';

const desktopItems = [
  { to: '/', label: 'Início' },
  { to: '/noticias', label: 'Notícias' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/perfil', label: 'Perfil' },
];

const headlineFacts = ['4 unidades conectadas', 'agenda cultural viva', 'acervo com busca rápida'];

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [location.pathname]);

  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#conteudo-principal">
        Pular para conteúdo principal
      </a>
      <div className={styles.backgroundGlow} />

      <header className={styles.header}>
        <div className={styles.topline}>
          <p>Rede municipal de bibliotecas de São Carlos</p>
          <span>horários, agenda e acervo em uma experiência única</span>
        </div>

        <div className={styles.headerInner}>
          <div className={styles.brandWrap}>
            <NavLink to="/" className={styles.brandLink}>
              <span className={styles.brandBadge}>SB</span>
              <div className={styles.brandCopy}>
                <strong>SIBiSC</strong>
                <span>Notícias, eventos e catálogo da cidade</span>
              </div>
            </NavLink>
          </div>

          <nav className={styles.desktopNav} aria-label="Navegação principal">
            {desktopItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                viewTransition
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <span className={styles.statusPill}>São Carlos / SP</span>
            <NavLink className={styles.ctaLink} to="/catalogo" viewTransition>
              Consultar acervo
            </NavLink>
          </div>
        </div>
      </header>

      <BottomNav />

      <aside className={styles.ribbon} aria-label="Resumo da rede SIBiSC">
        <div className={styles.ribbonInner}>
          {headlineFacts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </div>
      </aside>

      <main id="conteudo-principal" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>

      <footer className={styles.footer} aria-labelledby="sibisc-footer-title">
        <div className={styles.footerIntro}>
          <span className={styles.footerEyebrow}>Bibliotecas da rede</span>
          <h2 id="sibisc-footer-title">Unidades, horários e contatos em um bloco compacto.</h2>
          <p>
            Consulte horários, descubra eventos por bairro e encontre o melhor ponto de retirada
            para cada livro.
          </p>
        </div>

        <div className={styles.footerGrid}>
          {units.map((unit) => (
            <article key={unit.id} className={styles.footerCard}>
              <span className={styles.footerNeighborhood}>{unit.neighborhood}</span>
              <strong>{unit.name}</strong>
              <p>{unit.address}</p>
              <div className={styles.footerMeta}>
                <span>{unit.hours}</span>
                <span>{unit.contact}</span>
              </div>
            </article>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
