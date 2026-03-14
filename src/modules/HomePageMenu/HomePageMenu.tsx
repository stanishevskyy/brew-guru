import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import classNames from 'classnames';

import styles from './HomePageMenu.module.scss';

import { Pagination } from '../../shared/components/Pagination';
import { MenuCard } from '../../shared/components/MenuCard';
import { MenuInfo } from '../../shared/components/MenuCard/components/MenuInfo';
import { Filters } from '../../shared/components/Filters';
import { FormWrapper } from '../../shared/components/FormWrapper';
import { CurrentView } from '../../shared/components/CurrentView';

import { menuFilters } from '../../shared/constants/menuFilters';

import ArrowLeft from '../../assets/icons/search-icons/left-arrow.svg';

export const HomePageMenu = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [isSideFiltersOpen, setIsSideFiltersOpen] = useState(false);
  const [isInfoMenuOpen, setIsInfoMenuOpen] = useState(false);
  const { setIsOrdersOpen }: { setIsOrdersOpen: (value: boolean) => void } =
    useOutletContext();

  return (
    <div className={styles.searchPage} role="main">
      <button
        className={styles.searchPage__back}
        aria-label="Go back to previous page"
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
            setFilters={setFilters}
          />
        </section>

        <section className={styles.searchPage__form} aria-label="Search form">
          <FormWrapper setIsSideFiltersOpen={setIsSideFiltersOpen} />
        </section>

        <section
          className={classNames(`${styles.searchPage__currentView}`, {
            [styles.searchPage__currentViewExist]: filters.length !== 0,
          })}
          aria-label="Current view settings"
        >
          <CurrentView filters={filters} setFilters={setFilters} />
        </section>

        <div
          className={styles.searchPage__cafe}
          role="button"
          tabIndex={0}
          aria-label="Open menu details"
          onClick={() => setIsInfoMenuOpen(true)}
          onKeyDown={e => e.key === 'Enter' && setIsInfoMenuOpen(true)}
        >
          <MenuCard />
        </div>

        {isInfoMenuOpen && (
          <div
            className={styles.searchPage__modal}
            role="dialog"
            aria-modal="true"
            aria-label="Menu details"
          >
            <MenuInfo setIsInfoMenuOpen={setIsInfoMenuOpen} />
          </div>
        )}

        <nav
          className={styles.searchPage__pagination}
          aria-label="Pagination navigation"
        >
          <Pagination />
        </nav>

        <button
          className={styles.searchPage__ordersButton}
          onClick={() => setIsOrdersOpen(true)}
          aria-label="Open orders panel, 1 item, total 11.50 dollars"
        >
          <span className={styles.searchPage__order}>In order: 1</span>
          <span className={styles.searchPage__totalPrice}>11.50$</span>
        </button>
      </div>
    </div>
  );
};
