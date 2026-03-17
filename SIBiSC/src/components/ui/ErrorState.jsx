import styles from './ErrorState.module.css';

function ErrorState({ title, message }) {
  return (
    <div className={styles.state} data-testid="error-state" role="alert">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}

export default ErrorState;
