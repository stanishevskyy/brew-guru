import React, { useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import styles from './FormWrapper.module.scss';

import { sortLabels } from '../../constants/SortLabels';

import FilterIcon from '../../../assets/icons/search-icons/filter-icon.svg';
import SortIcon from '../../../assets/icons/search-icons/sort-icon.svg';
import { getSearchWith } from '../../utils/getSearchWith';

type Props = {
  query: string;
  perPage: string | number;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  setIsSideFiltersOpen: (value: boolean) => void;
};

export const FormWrapper: React.FC<Props> = ({
  query,
  perPage,
  searchParams,
  setSearchParams,
  setIsSideFiltersOpen,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const params = getSearchWith(searchParams, {
      query: value,
      page: '1',
      perPage: perPage.toString(),
    });

    setSearchParams(params);
  };

  const handleChangeSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
  };

  return (
    <form className={styles.form}>
      <input
        type="text"
        className={styles.form__input}
        placeholder="Search"
        aria-label="Search cafes"
        value={query}
        onChange={handleChangeQuery}
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
                >
                  <label htmlFor={radioId} className={styles.form__labelRadio}>
                    <input
                      type="radio"
                      id={radioId}
                      name="sort"
                      value={value}
                      className={styles.form__labelInput}
                      onChange={event => {
                        handleChangeSort(event);
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
                >
                  <label htmlFor={radioId} className={styles.form__labelRadio}>
                    <input
                      type="radio"
                      id={radioId}
                      name="sort-mobile"
                      value={value}
                      className={styles.form__labelInput}
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
