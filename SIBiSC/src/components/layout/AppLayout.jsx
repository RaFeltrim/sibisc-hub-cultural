import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { units } from '../../mocks/units';
import BottomNav from './BottomNav';
import styles from './AppLayout.module.css';

const desktopItems = [
  { to: '/', label: 'Inicio' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/catalogo', label: 'Catalogo' },
];

const headlineFacts = ['4 unidades conectadas', 'agenda cultural viva', 'acervo com busca rapida'];

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className={styles.shell}>
      <div className={styles.backgroundGlow} />

      <header className={styles.header}>
        <div className={styles.topline}>
          <p>Rede municipal de bibliotecas de Sao Carlos</p>
          <span>horarios, agenda e acervo em uma experiencia unica</span>
        </div>

        <div className={styles.headerInner}>
          <div className={styles.brandWrap}>
            <NavLink to="/" className={styles.brandLink}>
              <span className={styles.brandBadge}>SB</span>
              <div className={styles.brandCopy}>
                <strong>SIBiSC</strong>
                <span>Noticias, eventos e catalogo da cidade</span>
              </div>
            </NavLink>
          </div>

          <nav className={styles.desktopNav} aria-label="Navegacao principal">
            {desktopItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <span className={styles.statusPill}>Sao Carlos / SP</span>
            <NavLink className={styles.ctaLink} to="/catalogo">
              Consultar acervo
            </NavLink>
          </div>
        </div>
      </header>

      <div className={styles.ribbon}>
        <div className={styles.ribbonInner}>
          {headlineFacts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </div>
      </div>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerIntro}>
          <span className={styles.footerEyebrow}>Rede ativa</span>
          <h2>As bibliotecas do SIBiSC continuam proximas da rotina da cidade.</h2>
          <p>
            Consulte horarios, descubra eventos por bairro e encontre o melhor ponto de retirada
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

      <BottomNav />
    </div>
  );
}

export default AppLayout;
