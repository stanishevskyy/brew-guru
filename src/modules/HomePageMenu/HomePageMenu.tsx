/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';

import styles from './HomePageMenu.module.scss';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCafeMenuThunk } from '../../store/menuSlice/menuSlice';

import useMediaQuery from '../../shared/hooks/useMediaQuery';

import { getPageNumber } from '../../shared/utils/pagination.ts/getPageNumber';
import { getVisiblePages } from '../../shared/utils/pagination.ts/getVisiblePages';
import { getItemPerPage } from '../../shared/utils/pagination.ts/getItemPerPage';

import { SortBy } from '../../shared/constants/SortBy';
import { menuFilters } from '../../shared/constants/menuFilters';

import { Pagination } from '../../shared/components/Pagination';
import { MenuCard } from '../../shared/components/MenuCard';
import { MenuInfo } from '../../shared/components/MenuCard/components/MenuInfo';
import { Filters } from '../../shared/components/Filters';
import { FormWrapper } from '../../shared/components/FormWrapper';
import { CurrentView } from '../../shared/components/CurrentView';
import { MenuSkeleton } from '../../shared/components/MenuSkeleton';

import ArrowLeft from '../../assets/icons/search-icons/left-arrow.svg';
import { NoResults } from '../../shared/components/NoResults';

export const HomePageMenu = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const cafeId = slug?.split('-').pop();
  const [isSideFiltersOpen, setIsSideFiltersOpen] = useState(false);
  const [isInfoMenuOpen, setIsInfoMenuOpen] = useState<number | null>(null);
  const { setIsOrdersOpen }: { setIsOrdersOpen: (value: boolean) => void } =
    useOutletContext();

  const menuState = useAppSelector(state => state.menu);
  const menuInOrders = useAppSelector(state => state.menuOrder);
  const dispatch = useAppDispatch();

  const totalMenu = menuInOrders.length;
  const totalPrice = menuInOrders.reduce((acc, el) => {
    const price = el.menuOrder.discount
      ? Math.trunc(
          el.menuOrder.price * (1 - (el.menuOrder.discount ?? 0) / 100),
        )
      : el.menuOrder.price;

    return acc + price * el.quantity;
  }, 0);

  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1022px)');
  const isDesktop = useMediaQuery('(min-width: 1023px)');

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const sortBy = (searchParams.get('sortBy') as SortBy) || SortBy.Popular;
  const filters = useMemo(() => {
    return searchParams.getAll('filter');
  }, [searchParams]);
  const filtersKey = filters.join(',');
  const currentPage = searchParams.get('page') || '1';
  const perPage =
    searchParams.get('perPage') || +getItemPerPage('menu', isTablet, isDesktop);

  const pagesPerPage = getPageNumber(
    menuState.menuInfo?.totalPages ? menuState.menuInfo.totalPages : 1,
  );
  const visilbePages = getVisiblePages(currentPage, pagesPerPage);

  const menuDescription =
    menuState.menuInfo?.menu.items.find(m => m.id === isInfoMenuOpen) || null;

  const handleNavigateUser = () => {
    navigate(`/${slug}`);
  };

  useEffect(() => {
    dispatch(
      fetchCafeMenuThunk({
        cafeId: +cafeId!,
        params: {
          query,
          sortBy,
          page: +currentPage,
          perPage: +perPage,
          filter: filters,
        },
      }),
    );
  }, [query, sortBy, currentPage, perPage, filtersKey, slug]);

  return (
    <div className={styles.searchPage} role="main">
      <button
        className={styles.searchPage__back}
        aria-label="Go back to previous page"
        onClick={() => handleNavigateUser()}
      >
        <img src={ArrowLeft} alt="" aria-hidden="true" />
        Back
      </button>

      <div className={styles.searchPage__container}>
        <section
          className={classNames(`${styles.searchPage__filters}`, {
            [styles.searchPage__filtersActive]: isSideFiltersOpen,
          })}
          aria-label="Filters"
        >
          <Filters
            filters={filters}
            isSideFiltersOpen={isSideFiltersOpen}
            currentFilters={menuFilters}
            setIsSideFiltersOpen={setIsSideFiltersOpen}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </section>

        <section className={styles.searchPage__form} aria-label="Search form">
          <FormWrapper
            query={query}
            sortBy={sortBy}
            perPage={perPage}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setIsSideFiltersOpen={setIsSideFiltersOpen}
          />
        </section>

        <section
          className={classNames(`${styles.searchPage__currentView}`, {
            [styles.searchPage__currentViewExist]: filters.length !== 0,
          })}
          aria-label="Current view settings"
        >
          <CurrentView
            filters={filters}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </section>

        {menuState.loading ? (
          Array.from({ length: +perPage }).map((_, index) => (
            <div
              key={index}
              className={styles.searchPage__cafe}
              role="button"
              tabIndex={0}
              aria-label="Open menu details"
            >
              <MenuSkeleton />
            </div>
          ))
        ) : menuState.menuInfo?.menu.items.length === 0 ? (
          <NoResults page={'menu'} />
        ) : (
          menuState.menuInfo?.menu.items.map(menuItem => (
            <div
              key={menuItem.id}
              className={styles.searchPage__cafe}
              role="button"
              tabIndex={0}
              aria-label="Open menu details"
              onClick={() => setIsInfoMenuOpen(menuItem?.id)}
            >
              <MenuCard orderId={menuItem.id} menuItem={menuItem} />
            </div>
          ))
        )}

        {isInfoMenuOpen && (
          <div
            className={styles.searchPage__modal}
            role="dialog"
            aria-modal="true"
            aria-label="Menu details"
          >
            <MenuInfo
              menuDescription={menuDescription}
              setIsInfoMenuOpen={setIsInfoMenuOpen}
            />
          </div>
        )}

        {menuState.menuInfo?.menu.items.length !== 0 && (
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

        {totalMenu !== 0 && (
          <button
            className={styles.searchPage__ordersButton}
            onClick={() => setIsOrdersOpen(true)}
            aria-label="Open orders panel, 1 item, total 11.50 dollars"
          >
            <span
              className={styles.searchPage__order}
            >{`In order: ${totalMenu}`}</span>
            <span
              className={styles.searchPage__totalPrice}
            >{`${totalPrice}₴`}</span>
          </button>
        )}
      </div>
    </div>
  );
};
