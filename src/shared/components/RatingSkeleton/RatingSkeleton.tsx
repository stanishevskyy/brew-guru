import styles from './RatingSkeleton.module.scss';

export const RatingSkeleton = () => {
  return (
    <div className={styles.reviews__summary}>
      <p className={styles.reviews__title}></p>
      <div className={styles.reviews__rating}>
        <div className={styles.reviews__wrapper}>
          <p className={styles.reviews__score}></p>

          <div className={styles.reviews__stars}></div>
        </div>
        <div className={styles.reviews__divider}></div>
      </div>
      <div className={styles.reviews__rating}>
        <div className={styles.reviews__wrapper}>
          <p className={styles.reviews__score}></p>

          <div className={styles.reviews__stars}></div>
        </div>
        <div className={styles.reviews__divider}></div>
      </div>
      <div className={styles.reviews__rating}>
        <div className={styles.reviews__wrapper}>
          <p className={styles.reviews__score}></p>

          <div className={styles.reviews__stars}></div>
        </div>
        <div className={styles.reviews__divider}></div>
      </div>
      <div className={styles.reviews__rating}>
        <div className={styles.reviews__wrapper}>
          <p className={styles.reviews__score}></p>

          <div className={styles.reviews__stars}></div>
        </div>
        <div className={styles.reviews__divider}></div>
      </div>
      <div className={styles.reviews__rating}>
        <div className={styles.reviews__wrapper}>
          <p className={styles.reviews__score}></p>
          <div className={styles.reviews__stars}></div>
        </div>
        <div className={styles.reviews__divider}></div>
      </div>
    </div>
  );
};
