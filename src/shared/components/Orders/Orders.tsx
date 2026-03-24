/* eslint-disable @typescript-eslint/indent */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import styles from './Orders.module.scss';

import { useAppSelector } from '../../../store/hooks';

import { MenuCard } from '../MenuCard';

//eslint-disable-next-line
import CloseFavourites from '../../../assets/icons/favourites-icons/close-favourites-icon.svg';

type Props = {
  isOrdersOpen: boolean;
  setIsOrdersOpen: (value: boolean) => void;
};

export const Orders: React.FC<Props> = ({ isOrdersOpen, setIsOrdersOpen }) => {
  const menuInOrders = useAppSelector(state => state.menuOrder);
  const totalPrice = menuInOrders.reduce((acc, el) => {
    const price = el.menuOrder.discount
      ? Math.trunc(
          el.menuOrder.price * (1 - (el.menuOrder.discount ?? 0) / 100),
        )
      : el.menuOrder.price;

    return acc + price * el.quantity;
  }, 0);

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
          {menuInOrders.map(menuItem => (
            <div className={styles.favourites__cafe} key={menuItem.id}>
              <MenuCard
                isOrdersOpen={isOrdersOpen}
                menuItem={menuItem.menuOrder}
              />
            </div>
          ))}
        </div>

        <div className={styles.favourites__footer}>
          <p className={styles.favourites__total}>
            <span className={styles.favourites__label}>Total amount due:</span>
            <span className={styles.favourites__value}>{`${totalPrice}₴`}</span>
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
