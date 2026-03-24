/* eslint-disable @typescript-eslint/indent */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Orders.module.scss';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { MenuCard } from '../MenuCard';

//eslint-disable-next-line
import CloseFavourites from '../../../assets/icons/favourites-icons/close-favourites-icon.svg';
import { clearOrder } from '../../../store/menuOrderSlice/menuOrderSlice';

type Props = {
  isOrdersOpen: boolean;
  setIsOrdersOpen: (value: boolean) => void;
};

export const Orders: React.FC<Props> = ({ isOrdersOpen, setIsOrdersOpen }) => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const menuInOrders = useAppSelector(state => state.menuOrder);
  const dispatch = useAppDispatch();

  const totalPrice = menuInOrders.reduce((acc, el) => {
    const price = el.menuOrder.discount
      ? Math.trunc(
          el.menuOrder.price * (1 - (el.menuOrder.discount ?? 0) / 100),
        )
      : el.menuOrder.price;

    return acc + price * el.quantity;
  }, 0);

  const handleOrder = () => {
    // navigate(`/${slug}#reservations`);
    navigate(`/${slug}`, { state: { scrollTo: 'reservation' } });
    setIsOrdersOpen(false);
  };

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

  useEffect(() => {
    dispatch(clearOrder());
  }, [slug]);

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

        {menuInOrders.length === 0 ? (
          <div className={styles.favourites__messages}>
            <p className={styles.favourites__messagesTitle}>
              Oops, it looks empty here...
            </p>
            <p className={styles.favourites__messagesDescription}>
              Your cart is currently empty. Choose dishes and add them here.
            </p>
          </div>
        ) : (
          <div className={styles.favourites__gridLayout}>
            {menuInOrders.map(menuItem => (
              <div className={styles.favourites__cafe} key={menuItem.id}>
                <MenuCard
                  orderId={menuItem.id}
                  isOrdersOpen={isOrdersOpen}
                  menuItem={menuItem.menuOrder}
                />
              </div>
            ))}
          </div>
        )}

        <div className={styles.favourites__footer}>
          <p className={styles.favourites__total}>
            <span className={styles.favourites__label}>Total amount due:</span>
            <span className={styles.favourites__value}>{`${totalPrice}₴`}</span>
          </p>

          <button
            className={styles.favourites__orderBtn}
            aria-label="Place order for all items"
            disabled={menuInOrders.length === 0}
            onClick={handleOrder}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};
