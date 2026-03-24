import React, { useEffect, useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import styles from './Filters.module.scss';

//eslint-disable-next-line
import CloseIcon from '../../../assets/icons/search-icons/close-favourites-icon.svg';
import { FiltersType } from '../../types/FiltersType';
import { getSearchWith } from '../../utils/getSearchWith';

type Props = {
  isSideFiltersOpen: boolean;
  currentFilters: FiltersType;
  searchParams: URLSearchParams;
  chooseUserFilters: string[];
  setChooseUserFilters: (value: string[]) => void;
  setSearchParams: SetURLSearchParams;
  setIsSideFiltersOpen: (value: boolean) => void;
};

export const Filters: React.FC<Props> = ({
  isSideFiltersOpen,
  currentFilters,
  searchParams,
  chooseUserFilters,
  setChooseUserFilters,
  setSearchParams,
  setIsSideFiltersOpen,
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
    let newFilters: string[];

    if (chooseUserFilters.includes(value)) {
      newFilters = chooseUserFilters.filter(f => f !== value);
    } else {
      newFilters = [...chooseUserFilters, value];
    }

    setChooseUserFilters(newFilters);
  };

  const handleClearFilters = () => {
    const params = getSearchWith(searchParams, {
      filter: [],
      page: '1',
    });

    setChooseUserFilters([]);
    setIsSideFiltersOpen(false);
    setSearchParams(params);
  };

  const handleApplyFilters = () => {
    const params = getSearchWith(searchParams, {
      filter: chooseUserFilters,
      page: '1',
    });

    setIsSideFiltersOpen(false);
    setSearchParams(params);
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
                      checked={chooseUserFilters.includes(option)}
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
          onClick={handleClearFilters}
        >
          Clear
        </button>
        <button
          className={styles.filters__btnApply}
          aria-label="Apply selected filters"
          onClick={handleApplyFilters}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
