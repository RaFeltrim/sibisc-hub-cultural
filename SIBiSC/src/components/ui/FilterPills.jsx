import styles from './FilterPills.module.css';

function FilterPills({ options, value, onChange, ariaLabel = 'Filtros disponíveis' }) {
  return (
    <div className={styles.wrap} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            className={active ? `${styles.pill} ${styles.pillActive}` : styles.pill}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default FilterPills;
