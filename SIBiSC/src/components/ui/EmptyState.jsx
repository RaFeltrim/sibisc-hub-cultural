import styles from './EmptyState.module.css';

function EmptyState({ title, message }) {
  return (
    <div className={styles.state} data-testid="empty-state">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
