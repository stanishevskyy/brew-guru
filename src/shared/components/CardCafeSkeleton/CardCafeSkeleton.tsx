import styles from './CardCafeSkeleton.module.scss';

export const CardCafeSkeleton = () => {
  return (
    <article className={styles.cardCafe__card}>
      <div className={styles.cardCafe__cardLink}></div>

      <div className={styles.cardCafe__bottom}>
        <p className={styles.cardCafe__cardTitle}></p>

        <div className={styles.cardCafe__wrappInfo}>
          <div className={styles.cardCafe__wrappLocation}></div>
          <div className={styles.cardCafe__wrappTime}></div>
        </div>

        <div className={styles.cardCafe__buttons}></div>
      </div>
    </article>
  );
};
