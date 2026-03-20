import React from 'react';
import { Link, SetURLSearchParams } from 'react-router-dom';

import styles from './Pagination.module.scss';

import LeftArrow from '../../../assets/icons/search-icons/left-arrow.svg';
import RightArrow from '../../../assets/icons/search-icons/right-arrow.svg';
import { getSearchWith } from '../../utils/getSearchWith';
import { getClassLink } from '../../utils/getActiveClass';

type Props = {
  currentPage: string;
  pagesPerPage: number[];
  visilbePages: number[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  pagesPerPage,
  visilbePages,
  searchParams,
  setSearchParams,
}) => {
  const handleClickButton = (type: 'left' | 'right') => {
    const current = Number(currentPage);
    let nextPage = current;

    if (type === 'left' && current > 1) {
      nextPage = current - 1;
    }

    if (type === 'right' && current < pagesPerPage.length) {
      nextPage = current + 1;
    }

    const params = getSearchWith(searchParams, {
      page: nextPage.toString(),
    });

    setSearchParams(params);
    scrollTo(0, 0);
  };

  return (
    <div
      className={styles.pagination}
      role="navigation"
      aria-label="Pagination"
    >
      <button
        aria-label="Go to previous page"
        className={styles.pagination__LeftBtn}
        disabled={+currentPage === 1}
        onClick={() => handleClickButton('left')}
      >
        <img
          src={LeftArrow}
          alt=""
          className={styles.pagination__BtnImg}
          aria-hidden="true"
        />
      </button>

      {visilbePages.map(page => (
        <Link
          to={{
            search: getSearchWith(searchParams, { page: page.toString() }),
          }}
          className={getClassLink({
            isActive: page === +currentPage,
            baseClass: styles.pagination__paginationNums,
            activeClass: styles.pagination__paginationNumsActive,
          })}
          onClick={() => scrollTo(0, 0)}
          key={page}
        >
          {page}
        </Link>
      ))}

      <button
        className={styles.pagination__rightBtn}
        aria-label="Go to next page"
        onClick={() => handleClickButton('right')}
      >
        <img
          src={RightArrow}
          alt=""
          className={styles.pagination__BtnImg}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};
