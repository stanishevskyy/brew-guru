import React from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import styles from './NoResults.module.scss';
import { getSearchWith } from '../../utils/getSearchWith';

type Props = {
  page: 'cafes' | 'menu';
  searchParams: URLSearchParams;
  setSearchValue: (value: string) => void;
  setSearchParams: SetURLSearchParams;
};

export const NoResults: React.FC<Props> = ({
  page,
  searchParams,
  setSearchValue,
  setSearchParams,
}) => {
  return (
    <section className={styles.noResults}>
      <span
        role="img"
        aria-label="sweat smile"
        className={styles.noResults__emoji}
      >
        😅
      </span>
      <p className={styles.noResults__title}>Oops, it looks empty here...</p>
      <p className={styles.noResults__message}>
        {`We couldn't find any ${page} that perfectly match all your filters.
        Try removing a few conditions to see more results.`}
      </p>
      <button
        className={styles.noResults__clearFilters}
        onClick={() => {
          const params = getSearchWith(searchParams, {
            query: '',
            filter: [],
            page: '1',
          });

          setSearchValue('');
          setSearchParams(params);
        }}
      >
        Clear all filters
      </button>
    </section>
  );
};
