import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from './MenuCard.module.scss';

//eslint-disable-next-line
import DishMobile from '../../../assets/images/menu-images/menu-card/dish-image-mobile.png';
//eslint-disable-next-line
import DishTablet from '../../../assets/images/menu-images/menu-card/dish-image-tablet.png';
//eslint-disable-next-line
import DishDesktop from '../../../assets/images/menu-images/menu-card/dish-image-desktop.png';
//eslint-disable-next-line
import DishDesktopExtra from '../../../assets/images/menu-images/menu-card/dish-image-deskop-extra.png';
import AddIcon from '../../../assets/icons/search-icons/add-icon.svg';

type Props = {
  isOrdersOpen?: boolean;
};

export const MenuCard: React.FC<Props> = ({ isOrdersOpen }) => {
  return (
    <article className={styles.card}>
      <div className={styles.card__container}>
        <NavLink
          to="/cafe/menu.id"
          className={styles.card__link}
          aria-label="Open dish modal"
        >
          <picture>
            <source media="(min-width: 1440px)" srcSet={DishDesktopExtra} />
            <source media="(min-width: 1200px)" srcSet={DishDesktop} />
            <source media="(min-width: 641px)" srcSet={DishTablet} />
            <img
              loading="lazy"
              className={styles.card__img}
              src={DishMobile}
              alt="Dish"
            />
          </picture>
          <span
            className={styles.cardCafe__cardOverlay}
            aria-hidden="true"
          ></span>
          <span className={styles.card__label} aria-hidden="true">
            15% OFF
          </span>
        </NavLink>

        <div className={styles.card__info}>
          <p className={styles.card__dish}>Guacamole</p>
          <div className={styles.card__wrapper}>
            <div className={styles.card__infoCard}>
              <p className={styles.card__price}>
                <span className={styles.card__regular}>4.90$</span>
                <span className={styles.card__discount}>4.18$</span>
              </p>
              <p className={styles.card__portion}>1 portion / 280g</p>
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
