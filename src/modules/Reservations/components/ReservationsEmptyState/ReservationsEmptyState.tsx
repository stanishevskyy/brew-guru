import { useNavigate } from 'react-router-dom';

import styles from './ReservationsEmptyState.module.scss';

export const ReservationsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.noResults}>
      <span
        role="img"
        aria-label="sweat smile"
        className={styles.noResults__emoji}
      >
        😅
      </span>
      <p className={styles.noResults__title}>Oops, it looks empty here...</p>
      <p className={styles.noResults__message}>
        We couldn&apos;t find any of your reservations. They may be still being
        processed, or you may not have any.
      </p>
      <button className={styles.noResults__btn} onClick={() => navigate('/')}>
        Back to home page
      </button>
    </section>
  );
};
