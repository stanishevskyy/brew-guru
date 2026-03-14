import React, { useEffect } from 'react';
import classNames from 'classnames';

import styles from './Orders.module.scss';

//eslint-disable-next-line
import CloseFavourites from '../../../assets/icons/favourites-icons/close-favourites-icon.svg';
import { MenuCard } from '../MenuCard';

type Props = {
  isOrdersOpen: boolean;
  setIsOrdersOpen: (value: boolean) => void;
};

export const Orders: React.FC<Props> = ({ isOrdersOpen, setIsOrdersOpen }) => {
  useEffect(() => {
    if (isOrdersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOrdersOpen]);

  return (
    <div
      className={classNames(`${styles.favourites}`, {
        [styles.favouritesActive]: isOrdersOpen,
      })}
      role="dialog"
      aria-modal="true"
      aria-labelledby="orders-title"
    >
      <div className={styles.favourites__container}>
        <div className={styles.favourites__wrapper}>
          <h3 className={styles.favourites__title} id="orders-title">
            In order
          </h3>

          <button
            className={styles.favourites__closeBtn}
            aria-label="Close orders"
            onClick={() => setIsOrdersOpen(false)}
          >
            <img
              src={CloseFavourites}
              alt=""
              className={styles.favourites__closeImg}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className={styles.favourites__gridLayout}>
          <div className={styles.favourites__cafe}>
            <MenuCard isOrdersOpen={isOrdersOpen} />
          </div>
          <div className={styles.favourites__cafe}>
            <MenuCard isOrdersOpen={isOrdersOpen} />
          </div>
        </div>

        <div className={styles.favourites__footer}>
          <p className={styles.favourites__total}>
            <span className={styles.favourites__label}>Total amount due:</span>
            <span className={styles.favourites__value}>11.50$</span>
          </p>

          <button
            className={styles.favourites__orderBtn}
            aria-label="Place order for all items"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};
