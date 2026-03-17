import styles from './AvailabilityTable.module.css';

function AvailabilityTable({ inventory, selectedNeighborhood }) {
  return (
    <div className={styles.list} data-testid="unit-list">
      {inventory.map((item) => (
        <article key={`${item.unitId}-${item.callNumber}`} className={styles.card}>
          <div className={styles.rowTop}>
            <div>
              <strong>{item.unit.name}</strong>
              <p>{selectedNeighborhood ? `${item.distanceByNeighborhood[selectedNeighborhood]} | ${item.unit.neighborhood}` : item.unit.neighborhood}</p>
            </div>
            <span className={styles.stock}>
              {item.available}/{item.total}
            </span>
          </div>
          <div className={styles.meta}>
            <code>{item.callNumber}</code>
            <span>{item.shelf}</span>
          </div>
          <p>{item.unit.hours}</p>
        </article>
      ))}
    </div>
  );
}

export default AvailabilityTable;
