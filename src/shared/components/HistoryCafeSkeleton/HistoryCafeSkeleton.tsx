import styles from './HistoryCafeSkeleton.module.scss';

export const HistoryCafeSkeleton = () => {
  return (
    <article className={styles.history__card}>
      <div className={styles.history__cardLink}></div>

      <div className={styles.history__bottom}>
        <div className={styles.history__wrapper}>
          <p className={styles.history__cardTitle}></p>
          <div className={styles.history__btnBin}></div>
        </div>

        <div className={styles.history__wrappInfo}>
          <div className={styles.history__wrappLocation}>
            <div className={styles.history__locationIcon}></div>
            <p className={styles.history__locationInfo}></p>
          </div>
          <div className={styles.history__wrappTime}>
            <div className={styles.history__timeIcon}></div>
            <p className={styles.history__timeInfo}></p>
          </div>
        </div>

        <div className={styles.history__buttons}>
          <div className={styles.history__button}></div>
          <p className={styles.history__time}></p>
        </div>
      </div>
    </article>
  );
};
