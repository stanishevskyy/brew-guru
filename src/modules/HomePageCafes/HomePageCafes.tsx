import { useEffect, useState } from 'react';

import classNames from 'classnames';

import styles from './HomePageCafes.module.scss';

import { cardFilters } from '../../shared/constants/cardFilters';

import { Filters } from '../../shared/components/Filters';
import { FormWrapper } from '../../shared/components/FormWrapper';
import { CurrentView } from '../../shared/components/CurrentView';
import { FormSkeleton } from '../../shared/components/FormSkeleton';
import { CardCafeSkeleton } from '../../shared/components/CardCafeSkeleton';
import { FiltersSkeleton } from '../../shared/components/FiltersSkeleton';
import { CardCafe } from '../../shared/components/CardCafe';
import { Pagination } from '../../shared/components/Pagination';

export const HomePageCafes = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [isSideFiltersOpen, setIsSideFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <div className={styles.searchPage} role="main">
      <div className={styles.searchPage__container}>
        <section
          className={classNames(`${styles.searchPage__filters}`, {
            [styles.searchPage__filtersActive]: isSideFiltersOpen,
          })}
          aria-label="Filters"
        >
          {isLoading ? (
            <FiltersSkeleton
              isSideFiltersOpen={isSideFiltersOpen}
              currentFilters={cardFilters}
            />
          ) : (
            <Filters
              filters={filters}
              isSideFiltersOpen={isSideFiltersOpen}
              currentFilters={cardFilters}
              setIsSideFiltersOpen={setIsSideFiltersOpen}
              setFilters={setFilters}
            />
          )}
        </section>

        <section className={styles.searchPage__form} aria-label="Search form">
          {isLoading ? (
            <FormSkeleton />
          ) : (
            <FormWrapper setIsSideFiltersOpen={setIsSideFiltersOpen} />
          )}
        </section>

        <section
          className={classNames(`${styles.searchPage__currentView}`, {
            [styles.searchPage__currentViewExist]: filters.length !== 0,
          })}
          aria-label="Current view settings"
        >
          <CurrentView filters={filters} setFilters={setFilters} />
        </section>

        {isLoading ? (
          <div className={styles.searchPage__cafe} aria-label="Cafe card 1">
            <CardCafeSkeleton />
          </div>
        ) : (
          <div className={styles.searchPage__cafe} aria-label="Cafe card 1">
            <CardCafe />
          </div>
        )}

        <nav
          className={styles.searchPage__pagination}
          aria-label="Pagination navigation"
        >
          <Pagination />
        </nav>
      </div>
    </div>
  );
};
