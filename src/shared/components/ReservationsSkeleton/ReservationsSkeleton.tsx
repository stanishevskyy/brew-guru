import styles from './ReservationsSkeleton.module.scss';

export const ReservationsSkeleton = () => {
  return (
    <article className={styles.reserv}>
      <div className={styles.reserv__cardLink}></div>

      <div className={styles.reserv__bottom}>
        <div className={styles.reserv__cardTitleWrap}>
          <h3 className={styles.reserv__cardTitle}></h3>
          <div className={styles.reserv__infoWrap}></div>
        </div>

        <hr className={styles.reserv__hr} />

        <div className={styles.reserv__wrapInfo}>
          <div className={styles.reserv__wrapIcon}>
            <p className={styles.reserv__iconInfo}></p>
            <div className={styles.reserv__description}></div>
          </div>

          <div className={styles.reserv__wrapIcon}>
            <p className={styles.reserv__iconInfo}></p>
            <div className={styles.reserv__description}></div>
          </div>

          <div className={styles.reserv__wrapIcon}>
            <p className={styles.reserv__iconInfo}></p>
            <div className={styles.reserv__description}></div>
          </div>
        </div>

        <hr className={styles.reserv__hr} />

        <div className={styles.reserv__buttons}>
          <div className={styles.reserv__button}></div>
          <div className={styles.reserv__button}></div>
          <div className={styles.reserv__buttonCancel}></div>
        </div>
      </div>
    </article>
  );
};
