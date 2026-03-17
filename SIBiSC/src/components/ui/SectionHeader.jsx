import { Link } from 'react-router-dom';
import styles from './SectionHeader.module.css';

function SectionHeader({ eyebrow, title, description, linkTo, linkLabel }) {
  return (
    <div className={styles.wrap}>
      <div>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {linkTo && linkLabel ? (
        <Link className={styles.link} to={linkTo}>
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}

export default SectionHeader;
