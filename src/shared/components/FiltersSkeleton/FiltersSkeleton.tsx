import React, { useEffect } from 'react';

import styles from './FiltersSkeleton.module.scss';

import { FiltersType } from '../../types/FiltersType';

type Props = {
  isSideFiltersOpen: boolean;
  currentFilters: FiltersType;
};

export const FiltersSkeleton: React.FC<Props> = ({
  isSideFiltersOpen,
  currentFilters,
}) => {
  useEffect(() => {
    if (isSideFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSideFiltersOpen]);

  return (
    <div className={styles.filters}>
      <div className={styles.filters__header}>
        <h3 className={styles.filters__title}></h3>
        <div className={styles.filters__closeBtn}></div>
      </div>

      {Object.entries(currentFilters).map(([category]) => {
        const groupId = `${category.replace(/\s+/g, '-').toLowerCase()}-filters`;

        return (
          <div className={styles.filters__filterBy} key={category}>
            <div
              className={styles.filters__filterTitleBtn}
              aria-controls={groupId}
            ></div>
            <span className={styles.filters__filterIcon}></span>
          </div>
        );
      })}

      <div className={styles.filters__buttons}>
        <div className={styles.filters__btnApply}></div>
      </div>
    </div>
  );
};
