import styles from './FilterPills.module.css';

function FilterPills({ options, value, onChange }) {
  return (
    <div className={styles.wrap}>
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            className={active ? `${styles.pill} ${styles.pillActive}` : styles.pill}
            type="button"
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
