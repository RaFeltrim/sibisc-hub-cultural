import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import BottomNav from './BottomNav';
import styles from './AppLayout.module.css';

const desktopItems = [
  { to: '/', label: 'Inicio' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/catalogo', label: 'Catalogo' },
];

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brandWrap}>
          <NavLink to="/" className={styles.brandLink}>
            <span className={styles.brandBadge}>S</span>
            <div>
              <strong>SIBiSC</strong>
              <span>Sao Carlos / SP</span>
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
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

export default AppLayout;
