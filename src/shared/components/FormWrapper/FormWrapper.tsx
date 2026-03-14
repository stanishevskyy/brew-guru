import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import styles from './FormWrapper.module.scss';

import { getSearchWith } from '../../utils/getSearchWith';
import { SortBy } from '../../constants/SortBy';
import { SeacrhParams } from '../../types/SeacrhParams';
import { sortLabels } from '../../constants/SortLabels';

import FilterIcon from '../../../assets/icons/search-icons/filter-icon.svg';
import SortIcon from '../../../assets/icons/search-icons/sort-icon.svg';

type Props = {
  setIsSideFiltersOpen: (value: boolean) => void;
};

export const FormWrapper: React.FC<Props> = ({ setIsSideFiltersOpen }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Work with SEARCH PARAMS
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '3';
  const query = searchParams.get('query') || '';
  const city = searchParams.get('city') || 'Kyiv';
  const rating = searchParams.get('rating') || '';
  const sortBy = searchParams.get('sort_by') || SortBy.Popular;
  const sortOrder = searchParams.get('sort_order') || '';

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = getSearchWith(searchParams, {
      page,
      perPage,
      query: event.target.value,
      city,
      rating,
      sort_by: sortBy,
      sort_order: sortOrder,
    });

    setSearchParams(newSearch);
  };

  const handleSort = (value: SortBy) => {
    const newParams: SeacrhParams = {
      page,
      perPage,
      query,
      city,
      rating,
      sort_by: sortBy,
      sort_order: sortOrder,
    };

    switch (value) {
      case SortBy.FromLower:
        newParams.sort_by = 'price';
        newParams.sort_order = 'asc';
        break;
      case SortBy.FromHigher:
        newParams.sort_by = 'price';
        newParams.sort_order = 'desc';
        break;
      default:
        newParams.sort_by = value;
        newParams.sort_order = '';
        break;
    }

    const newSearch = getSearchWith(searchParams, newParams);

    setSearchParams(newSearch);
  };

  const isSortActive = (value: string) => {
    if (value === SortBy.FromLower) {
      return sortBy === 'price' && sortOrder === 'asc';
    }

    if (value === SortBy.FromHigher) {
      return sortBy === 'price' && sortOrder === 'desc';
    }

    return sortBy === value;
  };

  return (
    <form className={styles.form}>
      <input
        type="text"
        className={styles.form__input}
        placeholder="Search"
        aria-label="Search cafes"
        value={query}
        onChange={handleQuery}
      />

      {/* Desktop sorting */}
      <button
        type="button"
        className={styles.form__sortBtnDesktop}
        aria-label="Sort cafes by popularity"
        aria-expanded={isSortOpen}
        aria-controls="sort-menu-desktop"
        onClick={() => setIsSortOpen(prev => !prev)}
      >
        By popularity
        <span
          className={classNames(`${styles.form__arrowSort}`, {
            [styles.form__arrowSortActive]: isSortOpen,
          })}
        ></span>
        <div
          id="sort-menu-desktop"
          className={classNames(styles.form__sortBy, {
            [styles.form__sortByActive]: isSortOpen,
          })}
          role="menu"
          aria-label="Cafe sorting options"
        >
          <ul className={styles.form__sortList}>
            {Object.entries(sortLabels).map(([value, label]) => {
              const radioId = `sort-${value}-desktop`;

              return (
                <li
                  key={value}
                  className={styles.form__sortItem}
                  role="menuitemradio"
                  aria-checked={isSortActive(value)}
                >
                  <label htmlFor={radioId} className={styles.form__labelRadio}>
                    <input
                      type="radio"
                      id={radioId}
                      name="sort"
                      value={value}
                      className={styles.form__labelInput}
                      checked={isSortActive(value)}
                      onChange={() => {
                        handleSort(value as SortBy);
                        setIsSortOpen(false);
                      }}
                    />
                    {label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </button>

      {/* Filter button */}
      <button
        type="button"
        className={styles.form__filterBtn}
        aria-label="Open filters"
        onClick={() => setIsSideFiltersOpen(true)}
      >
        <img
          src={FilterIcon}
          alt=""
          className={styles.form__filterImg}
          aria-hidden="true"
        />
      </button>

      {/* Mobile sorting */}
      <button
        type="button"
        className={styles.form__sortBtn}
        aria-label="Open sorting menu"
        aria-expanded={isSortOpen}
        aria-controls="sort-menu-mobile"
        onClick={() => setIsSortOpen(prev => !prev)}
      >
        <img
          src={SortIcon}
          alt=""
          className={styles.form__sortImg}
          aria-hidden="true"
        />

        <div
          id="sort-menu-mobile"
          className={classNames(styles.form__sortByMobile, {
            [styles.form__sortByMobileActive]: isSortOpen,
          })}
          role="menu"
          aria-label="Cafe sorting options"
        >
          <ul className={styles.form__sortList}>
            {Object.entries(sortLabels).map(([value, label]) => {
              const radioId = `sort-${value}-mobile`;

              return (
                <li
                  key={value}
                  className={styles.form__sortItem}
                  role="menuitemradio"
                  aria-checked={isSortActive(value)}
                >
                  <label htmlFor={radioId} className={styles.form__labelRadio}>
                    <input
                      type="radio"
                      id={radioId}
                      name="sort-mobile"
                      value={value}
                      className={styles.form__labelInput}
                      checked={isSortActive(value)}
                      onChange={() => {
                        handleSort(value as SortBy);
                        setIsSortOpen(false);
                      }}
                    />
                    {label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </button>
    </form>
  );
};
