import { Link } from 'react-router-dom';
import styles from './SectionHeader.module.css';

function SectionHeader({ eyebrow, title, description, linkTo, linkLabel, headingLevel = 2 }) {
  const HeadingTag = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <div className={styles.wrap}>
      <div>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
        <HeadingTag>{title}</HeadingTag>
        {description ? <p>{description}</p> : null}
      </div>
      {linkTo && linkLabel ? (
        <Link className={styles.link} to={linkTo} viewTransition>
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}

export default SectionHeader;
