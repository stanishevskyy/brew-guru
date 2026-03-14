import styles from './ReviewSkeleton.module.scss';

export const ReviewSkeleton = () => {
  return (
    <article className={styles.review}>
      {/* header of review */}
      <header className={styles.review__info}>
        <div className={styles.review__img}></div>

        <div className={styles.review__userInfo}>
          <p className={styles.review__user}></p>

          <div className={styles.review__userRate}>
            <p className={styles.review__rate}></p>

            <div className={styles.review__rateDate}></div>
          </div>
        </div>
      </header>

      {/* review text */}
      <p className={styles.review__comment}></p>

      {/* actions */}
      <footer className={styles.review__action}>
        <div className={styles.review__actionInfo}></div>

        <div className={styles.review__actionInfo}></div>

        <div className={styles.review__actionInfo}></div>

        <div className={styles.review__dropWrapper}></div>
      </footer>
    </article>
  );
};
