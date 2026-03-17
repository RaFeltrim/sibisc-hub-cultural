import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const navItems = [
  { to: '/', label: 'Inicio', testId: 'nav-home' },
  { to: '/noticias', label: 'Noticias', testId: 'nav-news' },
  { to: '/eventos', label: 'Eventos', testId: 'nav-events' },
  { to: '/catalogo', label: 'Catalogo', testId: 'nav-catalog' },
];

function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Navegacao mobile">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          data-testid={item.testId}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
