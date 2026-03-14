import styles from './CafeHeaderSkeleton.module.scss';

export const CafeHeaderSkeleton = () => {
  return (
    <section className={styles.cafe__header}>
      <div className={styles.cafe__image}></div>

      <div className={styles.cafe__info}>
        <div className={styles.cafe__details}>
          <h2 className={styles.cafe__title}></h2>
          <div className={styles.cafe__infoWrapper}>
            <div className={styles.cafe__detailsWrapper}>
              <p className={styles.cafe__information}></p>
              <p className={styles.cafe__information}></p>
            </div>
            <div className={styles.cafe__detailsWrapper}>
              <p className={styles.cafe__information}></p>
              <p className={styles.cafe__information}></p>
            </div>
          </div>
        </div>

        <div className={styles.cafe__descriptions}>
          <article className={styles.cafe__descriptionsDetails}></article>
          <button className={styles.cafe__viewAll}></button>
        </div>

        <button className={styles.cafe__viewOnMap}></button>
      </div>
    </section>
  );
};
