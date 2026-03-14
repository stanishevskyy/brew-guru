import styles from './Pagination.module.scss';

import LeftArrow from '../../../assets/icons/search-icons/left-arrow.svg';
import RightArrow from '../../../assets/icons/search-icons/right-arrow.svg';

export const Pagination = () => {
  return (
    <div
      className={styles.pagination}
      role="navigation"
      aria-label="Pagination"
    >
      <button
        aria-label="Go to previous page"
        className={styles.pagination__LeftBtn}
      >
        <img
          src={LeftArrow}
          alt=""
          className={styles.pagination__BtnImg}
          aria-hidden="true"
        />
      </button>

      <a
        href="#"
        className={styles.pagination__paginationNums}
        aria-current="page"
      >
        1
      </a>
      <a href="#" className={styles.pagination__paginationNums}>
        2
      </a>
      <a href="#" className={styles.pagination__paginationNums}>
        3
      </a>
      <a href="#" className={styles.pagination__paginationNums}>
        4
      </a>

      <button
        className={styles.pagination__rightBtn}
        aria-label="Go to next page"
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
