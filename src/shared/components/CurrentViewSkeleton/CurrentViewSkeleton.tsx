import styles from './CurrentViewSkeleton.module.scss';

export const CurrentViewSkeleton = () => {
  return (
    <div
      className={styles.currentView}
      role="region"
      aria-label="Current view settings"
    >
      <div className={styles.currentView__applied}>
        <p className={styles.currentView__appliedInfo}></p>
        <div className={styles.currentView__appliedClear}></div>
      </div>

      <div className={styles.currentView__location}>
        <p className={styles.currentView__locationInfo}></p>
        <div className={styles.currentView__locationChange}></div>
      </div>
    </div>
  );
};
