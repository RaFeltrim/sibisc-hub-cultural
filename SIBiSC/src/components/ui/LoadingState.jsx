import styles from './LoadingState.module.css';

function LoadingState({ label = 'Carregando conteudo...' }) {
  return (
    <div className={styles.state} data-testid="loading-state" role="status">
      <div className={styles.bar} />
      <div className={styles.barShort} />
      <p>{label}</p>
    </div>
  );
}

export default LoadingState;
