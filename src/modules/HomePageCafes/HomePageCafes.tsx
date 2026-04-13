/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import styles from './HomePageCafes.module.scss';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCafesThunk } from '../../store/cafesSlice/cafesSlice';
import useMediaQuery from '../../shared/hooks/useMediaQuery';

import { getPageNumber } from '../../shared/utils/pagination.ts/getPageNumber';
import { getVisiblePages } from '../../shared/utils/pagination.ts/getVisiblePages';

// eslint-disable-next-line max-len
import { getItemPerPage } from '../../shared/utils/pagination.ts/getItemPerPage';

import { cardFilters } from '../../shared/constants/cardFilters';

import { Filters } from '../../shared/components/Filters';
import { FormWrapper } from '../../shared/components/FormWrapper';
import { CurrentView } from '../../shared/components/CurrentView';
import { FormSkeleton } from '../../shared/components/FormSkeleton';
import { CardCafeSkeleton } from '../../shared/components/CardCafeSkeleton';
import { FiltersSkeleton } from '../../shared/components/FiltersSkeleton';
import { CardCafe } from '../../shared/components/CardCafe';
import { Pagination } from '../../shared/components/Pagination';
import { SortBy } from '../../shared/constants/SortBy';
import { NoResults } from '../../shared/components/NoResults';
import { Cafe } from '../../shared/types/shared/cafe';
import { HistoryItem } from '../../shared/types/user/user-history-item';
import { addHistoryItemThunk } from '../../store/historySlice/historySlice';

export const HomePageCafes = () => {
  const [isSideFiltersOpen, setIsSideFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userState = useAppSelector(state => state.user.user);
  const cafesState = useAppSelector(state => state.cafes);
  const dispatch = useAppDispatch();

  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1022px)');
  const isDesktop = useMediaQuery('(min-width: 1023px)');

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const query = searchParams.get('query') || '';

  const sortBy = (searchParams.get('sortBy') as SortBy) || SortBy.Popular;
  const filters = useMemo(() => {
    return searchParams.getAll('filter');
  }, [searchParams]);
  const [chooseUserFilters, setChooseUserFilters] = useState<string[]>([]);
  const currentPage = searchParams.get('page') || '1';
  const perPage =
    searchParams.get('perPage') || +getItemPerPage('cafe', isTablet, isDesktop);

  const pagesPerPage = getPageNumber(cafesState.totalPages);
  const visilbePages = getVisiblePages(currentPage, pagesPerPage);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    dispatch(
      fetchCafesThunk({
        query,
        sortBy,
        page: +currentPage,
        perPage: +perPage,
        filter: filters,
      }),
    );
  }, [query, sortBy, currentPage, perPage, filters]);

  const [isSideMessage, setIsSideMessage] = useState(false);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setIsSideMessage(false);
    }, 1300);

    return () => clearTimeout(timeId);
  }, [isSideMessage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddUserHistory = (cafe: Cafe) => {
    const formattedDate = new Date().toLocaleDateString('en-CA');

    const { id, img, name, address, openingHours } = cafe;

    const historyItem: HistoryItem = {
      id: Date.now(),
      cafe: {
        id,
        img,
        name,
        address,
        openingHours,
      },
      time: new Date().toISOString(),
    };

    dispatch(
      addHistoryItemThunk({
        userId: userState?.id as number,
        date: formattedDate,
        item: historyItem,
      }),
    );
  };

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
              isSideFiltersOpen={isSideFiltersOpen}
              currentFilters={cardFilters}
              searchParams={searchParams}
              chooseUserFilters={chooseUserFilters}
              setChooseUserFilters={setChooseUserFilters}
              setSearchParams={setSearchParams}
              setIsSideFiltersOpen={setIsSideFiltersOpen}
            />
          )}
        </section>

        <section className={styles.searchPage__form} aria-label="Search form">
          {isLoading ? (
            <FormSkeleton />
          ) : (
            <FormWrapper
              query={query}
              sortBy={sortBy}
              perPage={perPage}
              searchParams={searchParams}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setSearchParams={setSearchParams}
              setIsSideFiltersOpen={setIsSideFiltersOpen}
            />
          )}
        </section>

        <section
          className={classNames(`${styles.searchPage__currentView}`, {
            [styles.searchPage__currentViewExist]: filters.length !== 0,
          })}
          aria-label="Current view settings"
        >
          <CurrentView
            filters={filters}
            setChooseUserFilters={setChooseUserFilters}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </section>

        {cafesState.loading ? (
          Array.from({ length: +perPage }).map((_, index) => (
            <div
              className={styles.searchPage__cafe}
              aria-label={`Cafe card skeleton ${index + 1}`}
              key={index}
            >
              <CardCafeSkeleton />
            </div>
          ))
        ) : cafesState.cafes.length === 0 && !cafesState.loading ? (
          <NoResults
            page={'cafes'}
            searchParams={searchParams}
            setChooseUserFilters={setChooseUserFilters}
            setSearchValue={setSearchValue}
            setSearchParams={setSearchParams}
          />
        ) : (
          cafesState.cafes.map(cafe => (
            <div
              className={styles.searchPage__cafe}
              aria-label={`Cafe card ${cafe.id}`}
              key={cafe.id}
              onClick={() => handleAddUserHistory(cafe)}
            >
              <CardCafe cafe={cafe} setIsSideMessage={setIsSideMessage} />
            </div>
          ))
        )}

        {visilbePages.length !== 0 && (
          <nav
            className={styles.searchPage__pagination}
            aria-label="Pagination navigation"
          >
            <Pagination
              currentPage={currentPage}
              pagesPerPage={pagesPerPage}
              visilbePages={visilbePages}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </nav>
        )}
      </div>

      <div
        className={classNames(`${styles.searchPage__authMessage}`, {
          [styles.searchPage__authMessageActive]: isSideMessage,
        })}
      >
        Only authorized users can add to favorites
      </div>
    </div>
  );
};
