import React from 'react';

import styles from './MenuCard.module.scss';

import { Dish } from '../../types/menu/menuItem';

//eslint-disable-next-line
import DishMobile from '../../../assets/images/menu-images/menu-card/dish-image-mobile.png';
//eslint-disable-next-line
import DishTablet from '../../../assets/images/menu-images/menu-card/dish-image-tablet.png';
//eslint-disable-next-line
import DishDesktop from '../../../assets/images/menu-images/menu-card/dish-image-desktop.png';
//eslint-disable-next-line
import DishDesktopExtra from '../../../assets/images/menu-images/menu-card/dish-image-deskop-extra.png';
import AddIcon from '../../../assets/icons/search-icons/add-icon.svg';
import classNames from 'classnames';

type Props = {
  menuItem: Dish;
  isOrdersOpen?: boolean;
};

export const MenuCard: React.FC<Props> = ({ menuItem, isOrdersOpen }) => {
  const discountedPrice =
    menuItem?.discount &&
    Math.trunc(menuItem?.price * (1 - (menuItem?.discount ?? 0) / 100));

  return (
    <article className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__link} aria-label="Open dish modal">
          {menuItem?.imageUrl ? (
            <img
              className={styles.card__img}
              src={menuItem?.imageUrl}
              alt="Dish"
            />
          ) : (
            <picture>
              <source media="(min-width: 1440px)" srcSet={DishDesktopExtra} />
              <source media="(min-width: 1200px)" srcSet={DishDesktop} />
              <source media="(min-width: 641px)" srcSet={DishTablet} />
              <img className={styles.card__img} src={DishMobile} alt="Dish" />
            </picture>
          )}
          <span
            className={styles.cardCafe__cardOverlay}
            aria-hidden="true"
          ></span>
          {menuItem?.discount && (
            <span className={styles.card__label} aria-hidden="true">
              {`${menuItem.discount}% OFF`}
            </span>
          )}
        </div>

        <div className={styles.card__info}>
          <p className={styles.card__dish}>{menuItem?.name}</p>
          <div className={styles.card__wrapper}>
            <div className={styles.card__infoCard}>
              <p className={styles.card__price}>
                <span
                  className={classNames(`${styles.card__regular}`, {
                    [styles.card__regularDiscount]: discountedPrice,
                  })}
                >
                  {`${menuItem?.price}₴`}
                </span>
                {discountedPrice && (
                  <span className={styles.card__discount}>
                    {`${discountedPrice}₴`}
                  </span>
                )}
              </p>
              <p className={styles.card__portion}>{menuItem?.portion}</p>
            </div>

            {!isOrdersOpen && (
              <button
                className={styles.card__addDish}
                aria-label="Add dish to cart"
              >
                <img src={AddIcon} alt="" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
