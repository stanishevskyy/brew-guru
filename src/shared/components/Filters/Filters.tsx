import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Filters.module.scss';

//eslint-disable-next-line
import CloseIcon from '../../../assets/icons/search-icons/close-favourites-icon.svg';
import { FiltersType } from '../../types/FiltersType';

type Props = {
  filters: string[];

  isSideFiltersOpen: boolean;
  currentFilters: FiltersType;
  setIsSideFiltersOpen: (value: boolean) => void;
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

export const Filters: React.FC<Props> = ({
  filters,
  isSideFiltersOpen,
  currentFilters,
  setIsSideFiltersOpen,
  setFilters,
}) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {},
  );

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

  const chooseFilters = (value: string) => {
    if (filters.includes(value)) {
      setFilters(prev => prev.filter(el => el !== value));
    } else {
      setFilters(prev => [...prev, value]);
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className={styles.filters} role="region" aria-label="Filters panel">
      <div className={styles.filters__header}>
        <h3 className={styles.filters__title}>Filters</h3>
        <button
          className={styles.filters__closeBtn}
          onClick={() => setIsSideFiltersOpen(false)}
          aria-label="Close filters panel"
        >
          <img
            src={CloseIcon}
            alt=""
            className={styles.filters__closeBtnIcon}
            aria-hidden="true"
          />
        </button>
        {/* <button
          className={styles.filters__closeBtnDesktop}
          onClick={() => setFilters([])}
          aria-label="Close filters panel"
        >
          <img
            src={CloseIcon}
            alt=""
            className={styles.filters__closeBtnIconDesktop}
            aria-hidden="true"
          />
        </button> */}
      </div>

      {Object.entries(currentFilters).map(([category, options]) => {
        const groupId = `${category.replace(/\s+/g, '-').toLowerCase()}-filters`;
        const isOpen = !!openCategories[category];

        return (
          <div className={styles.filters__filterBy} key={category}>
            <button
              className={styles.filters__filterTitleBtn}
              aria-expanded={isOpen}
              aria-controls={groupId}
              onClick={() => toggleCategory(category)}
            >
              {category}
              <span
                className={classNames(styles.filters__filterIcon, {
                  [styles.filters__filterIconActive]: isOpen,
                })}
              ></span>
            </button>

            <div
              id={groupId}
              className={classNames(styles.filters__filterCheckBox, {
                [styles.filters__active]: isOpen,
              })}
              role="group"
              aria-label={`${category} filters`}
            >
              {options.map(option => {
                const optionId = `${groupId}-${option.replace(/\s+/g, '-').toLowerCase()}`;

                return (
                  <div
                    className={styles.filters__filterCheckBoxWrapp}
                    key={optionId}
                  >
                    <input
                      type="checkbox"
                      checked={filters.includes(option)}
                      className={styles.filters__checkBox}
                      id={optionId}
                      onChange={() => chooseFilters(option)}
                    />
                    <label
                      htmlFor={optionId}
                      className={styles.filters__checkBoxText}
                    >
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className={styles.filters__buttons}>
        <button
          className={styles.filters__btnClear}
          aria-label="Clear selected filters"
        >
          Clear
        </button>
        <button
          className={styles.filters__btnApply}
          aria-label="Apply selected filters"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
