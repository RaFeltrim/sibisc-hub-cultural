import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={styles.page}>
      <span>404</span>
      <h1>Essa rota ainda não existe no mapa do SIBiSC.</h1>
      <p>Volte para a navegação principal e siga por notícias, eventos ou catálogo.</p>
      <Link to="/">Voltar para início</Link>
    </section>
  );
}

export default NotFoundPage;
