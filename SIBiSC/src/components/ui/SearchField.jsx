import styles from './SearchField.module.css';

function SearchField({
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
  inputTestId,
  buttonTestId,
  buttonLabel = 'Buscar',
}) {
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      <label className={styles.label}>
        <span>{label}</span>
        <div className={styles.inputWrap}>
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6.8" />
              <path d="M16.2 16.2 20 20" />
            </svg>
          </span>
          <input
            data-testid={inputTestId}
            className={styles.input}
            type="search"
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      </label>
      <button data-testid={buttonTestId} className={styles.button} type="submit">
        {buttonLabel}
      </button>
    </form>
  );
}

export default SearchField;
