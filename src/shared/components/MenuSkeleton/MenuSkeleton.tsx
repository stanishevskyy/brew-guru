import styles from './MenuSkeleton.module.scss';

export const MenuSkeleton = () => {
  return (
    <article className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__link}></div>

        <div className={styles.card__info}>
          <p className={styles.card__dish}></p>
          <div className={styles.card__wrapper}>
            <div className={styles.card__infoCard}>
              <p className={styles.card__price}></p>
              <p className={styles.card__portion}></p>
            </div>

            <button
              className={styles.card__addDish}
              aria-label="Add dish to cart"
            ></button>
          </div>
        </div>
      </div>
    </article>
  );
};
