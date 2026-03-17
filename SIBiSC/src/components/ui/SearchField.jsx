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
        <input
          data-testid={inputTestId}
          className={styles.input}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <button data-testid={buttonTestId} className={styles.button} type="submit">
        {buttonLabel}
      </button>
    </form>
  );
}

export default SearchField;
