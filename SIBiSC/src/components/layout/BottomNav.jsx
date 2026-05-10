import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const navItems = [
  { to: '/', label: 'Inicio', testId: 'nav-home', icon: 'home' },
  { to: '/noticias', label: 'Noticias', testId: 'nav-news', icon: 'news' },
  { to: '/eventos', label: 'Eventos', testId: 'nav-events', icon: 'calendar' },
  { to: '/catalogo', label: 'Catalogo', testId: 'nav-catalog', icon: 'books' },
  { to: '/perfil', label: 'Perfil', testId: 'nav-profile', icon: 'profile' },
];

function NavIcon({ icon }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (icon) {
    case 'news':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path {...common} d="M5 7.5h14" />
          <path {...common} d="M5 12h14" />
          <path {...common} d="M5 16.5h9" />
          <path {...common} d="M4.5 4.5h15v15h-15z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path {...common} d="M7.5 3.5v4" />
          <path {...common} d="M16.5 3.5v4" />
          <path {...common} d="M4.5 8h15" />
          <path {...common} d="M5 5.5h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z" />
          <path {...common} d="M8 12.5h3" />
          <path {...common} d="M8 16h5" />
        </svg>
      );
    case 'books':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path {...common} d="M5 5.5a2 2 0 0 1 2-2h10v16H7a2 2 0 0 0-2 2Z" />
          <path {...common} d="M7 3.5v16" />
          <path {...common} d="M17 5.5h2a1 1 0 0 1 1 1v13" />
        </svg>
      );
    case 'profile':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path {...common} d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path {...common} d="M4 20.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
          <circle {...common} cx="12" cy="12" r="10" />
        </svg>
      );
    default:
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path {...common} d="M4.5 11.5 12 5l7.5 6.5" />
          <path {...common} d="M6.5 10.5v8.5h11v-8.5" />
        </svg>
      );
  }
}

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
          <span className={styles.icon}>
            <NavIcon icon={item.icon} />
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
