import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={styles.page}>
      <span>404</span>
      <h1>Essa rota ainda nao existe no mapa do SIBiSC.</h1>
      <p>Volte para a navegacao principal e siga por noticias, eventos ou catalogo.</p>
      <Link to="/">Voltar para Inicio</Link>
    </section>
  );
}

export default NotFoundPage;
