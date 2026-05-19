import styles from './AvailabilityTable.module.css';

function AvailabilityTable({ inventory, selectedNeighborhood }) {
  return (
    <div className={styles.list} data-testid="unit-list">
      {inventory.map((item) => (
        <article key={`${item.unitId}-${item.callNumber}`} className={styles.card}>
          <div className={styles.rowTop}>
            <div>
              <strong>{item.unit.name}</strong>
              <p>
                {selectedNeighborhood
                  ? `${item.distanceByNeighborhood[selectedNeighborhood]} de distância, ${item.unit.neighborhood}`
                  : item.unit.neighborhood}
              </p>
            </div>
            <span
              className={styles.stock}
              aria-label={`${item.available} de ${item.total} exemplares ${item.available > 0 ? 'disponíveis' : 'indisponíveis'}`}
            >
              {item.available}/{item.total}
            </span>
          </div>
          <div className={styles.meta}>
            <code>{item.callNumber}</code>
            <span>{item.shelf}</span>
          </div>
          <p>{item.available > 0 ? 'Disponível para retirada no protótipo local.' : 'Sem exemplares disponíveis nesta unidade.'}</p>
          <p>{item.unit.hours}</p>
        </article>
      ))}
    </div>
  );
}

export default AvailabilityTable;
