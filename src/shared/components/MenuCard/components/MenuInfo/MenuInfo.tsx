import React from 'react';

import styles from './MenuInfo.module.scss';

import { MenuAddButton } from '../MenuAddButton';

//eslint-disable-next-line
import DishMobile from '../../../../../assets/images/menu-images/menu-dialog/dish-image-tablet.png';
//eslint-disable-next-line
import DishTablet from '../../../../../assets/images/menu-images/menu-dialog/dish-image-tablet.png';
//eslint-disable-next-line
import DishDesktop from '../../../../../assets/images/menu-images/menu-dialog/dish-image-desktop.png';
//eslint-disable-next-line
import CloseIcon from '../../../../../assets/icons/menu-icons/close-icon.svg';
import { useMediaQuery } from '@mui/material';

type Props = {
  setIsInfoMenuOpen: (value: boolean) => void;
};

export const MenuInfo: React.FC<Props> = ({ setIsInfoMenuOpen }) => {
  const isMobile = useMediaQuery('(max-width: 1022px)');
  const isDesktop = useMediaQuery('(min-width: 1023px)');

  return (
    <article className={styles.menu}>
      <div className={styles.menu__container}>
        <div className={styles.menu__link}>
          <picture>
            <source media="(min-width: 639px)" srcSet={DishTablet} />
            <source media="(min-width: 1023px)" srcSet={DishDesktop} />

            <img
              loading="lazy"
              src={DishMobile}
              alt="Dish"
              className={styles.menu__img}
            />
          </picture>
          <button
            className={styles.menu__close}
            type="button"
            aria-label="Close menu"
            onClick={() => setIsInfoMenuOpen(false)}
          >
            <img
              src={CloseIcon}
              alt=""
              aria-hidden="true"
              className={styles.menu__closeIcon}
            />
          </button>
        </div>

        <div className={styles.menu__info}>
          <p className={styles.menu__dish}>Avocado Green Salad</p>
          <div className={styles.menu__infoWrapper}>
            <div>
              <p className={styles.menu__price}>
                <span className={styles.menu__regular}>4.90$</span>
                <span className={styles.menu__discount}>4.18$</span>
              </p>
              <p className={styles.menu__portion}>1 portion / 280g</p>
            </div>
            <span className={styles.menu__label} aria-hidden="true">
              15% OFF
            </span>

            {isDesktop && <MenuAddButton />}
          </div>

          <p className={styles.menu__description}>
            A vibrant medley of crisp seasonal greens and buttery avocado
            slices, tossed with crunchy cucumber and toasted pumpkin seeds.
            Lightly drizzled with our signature lemon-herb vinaigrette for a
            refreshing, zesty finish.
          </p>

          {isMobile && <MenuAddButton />}
        </div>
      </div>
    </article>
  );
};
