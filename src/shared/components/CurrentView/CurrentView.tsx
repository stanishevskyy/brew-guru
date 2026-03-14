import React from 'react';
import styles from './CurrentView.module.scss';

type Props = {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

export const CurrentView: React.FC<Props> = ({ filters, setFilters }) => {
  const appliedFilters = filters.join(' | ');

  return (
    <>
      {appliedFilters.length !== 0 && (
        <div
          className={styles.currentView}
          role="region"
          aria-label="Current view settings"
        >
          <div className={styles.currentView__applied}>
            <p className={styles.currentView__appliedInfo}>
              APPLIED FILTERS:
              <span className={styles.currentView__appliedSpec}>
                {appliedFilters}
              </span>
            </p>
            <button
              className={styles.currentView__appliedClear}
              role="button"
              aria-label="Clear applied filters"
              onClick={() => setFilters([])}
            >
              Clear
            </button>
          </div>

          {false && (
            <div className={styles.currentView__location}>
              <p className={styles.currentView__locationInfo}>
                CURRENT LOCATION:
                <span className={styles.currentView__locationSpec}>
                  Kyiv, Zoloti Vorota 4
                </span>
              </p>
              <a
                href="/"
                className={styles.currentView__locationChange}
                role="button"
                aria-label="Change location on map"
              >
                Change on map
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};
