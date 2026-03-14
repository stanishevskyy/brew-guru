import styles from './ReportsSkeleton.module.scss';

export const ReportsSkeleton = () => {
  return (
    <article className={styles.report}>
      <header className={styles.report__header}>
        <p className={styles.report__title}></p>

        <div className={styles.report__meta}>
          <time className={styles.report__date}></time>

          <div className={styles.report__status}></div>
        </div>
      </header>

      <div className={styles.report__body}>
        <p className={styles.report__reviewText}></p>

        <div className={styles.report__details}>
          <p className={styles.report__reason}></p>

          <p className={styles.report__systemMessage}></p>
        </div>
      </div>

      {true && (
        <footer className={styles.report__footer}>
          <div className={styles.report__actions}>
            <div className={styles.report__actionBtnSecondary}></div>
            <div className={styles.report__actionBtnPrimary}></div>
          </div>
        </footer>
      )}
    </article>
  );
};
