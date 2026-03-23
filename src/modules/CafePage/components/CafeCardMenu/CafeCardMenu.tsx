import React from 'react';

import styles from './CafeCardMenu.module.scss';

import { Dish } from '../../../../shared/types/menu/menuItem';

//eslint-disable-next-line
import DishMobile from '../../../../assets/images/cafe-images/dish-image/dish-image-mobile.png';
//eslint-disable-next-line
import DishTablet from '../../../../assets/images/cafe-images/dish-image/dish-image-tablet.png';
//eslint-disable-next-line
import DishTabletDesktop from '../../../../assets/images/cafe-images/dish-image/dish-image-desktop.png';

type Props = {
  menuItem: Dish;
};

export const CafeCardMenu: React.FC<Props> = ({ menuItem }) => {
  return (
    <article className={styles.menu}>
      <picture>
        <source media="(min-width: 639px)" srcSet={DishTablet} />
        <source media="(min-width: 1023px)" srcSet={DishTabletDesktop} />

        <img
          loading="lazy"
          className={styles.card__image}
          src={DishMobile}
          alt="Menu image"
        />
      </picture>

      {/* <img
        className={styles.card__image}
        src={menuItem.imageUrl}
        alt="Menu image"
      /> */}

      <p className={styles.menu__dish}>{menuItem.name}</p>
    </article>
  );
};
