import React from 'react';

import styles from './MenuInfo.module.scss';

import useMediaQuery from '../../../../hooks/useMediaQuery';

import { Dish } from '../../../../types/menu/menuItem';

import { MenuAddButton } from '../MenuAddButton';

//eslint-disable-next-line
import DishMobile from '../../../../../assets/images/menu-images/menu-dialog/dish-image-tablet.png';
//eslint-disable-next-line
import DishTablet from '../../../../../assets/images/menu-images/menu-dialog/dish-image-tablet.png';
//eslint-disable-next-line
import DishDesktop from '../../../../../assets/images/menu-images/menu-dialog/dish-image-desktop.png';
//eslint-disable-next-line
import CloseIcon from '../../../../../assets/icons/menu-icons/close-icon.svg';
import classNames from 'classnames';

type Props = {
  menuDescription: Dish | null;
  setIsInfoMenuOpen: (value: number | null) => void;
};

export const MenuInfo: React.FC<Props> = ({
  menuDescription,
  setIsInfoMenuOpen,
}) => {
  const isMobile = useMediaQuery('(max-width: 1022px)');
  const isDesktop = useMediaQuery('(min-width: 1023px)');

  const discountedPrice =
    menuDescription?.discount &&
    Math.trunc(
      menuDescription?.price * (1 - (menuDescription?.discount ?? 0) / 100),
    );

  if (!menuDescription) {
    return;
  }

  return (
    <article className={styles.menu}>
      <div className={styles.menu__container}>
        <div className={styles.menu__link}>
          {menuDescription?.imageUrl ? (
            <img
              loading="lazy"
              src={menuDescription?.imageUrl}
              alt="Dish"
              className={styles.menu__img}
            />
          ) : (
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
          )}
          <button
            className={styles.menu__close}
            type="button"
            aria-label="Close menu"
            onClick={() => setIsInfoMenuOpen(null)}
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
          <p className={styles.menu__dish}>{menuDescription.name}</p>
          <div className={styles.menu__infoWrapper}>
            <div>
              <p className={styles.menu__price}>
                <span
                  className={classNames(`${styles.menu__regular}`, {
                    [styles.menu__regularDiscount]: discountedPrice,
                  })}
                >
                  {`${menuDescription?.price}₴`}
                </span>
                {discountedPrice && (
                  <span className={styles.menu__discount}>
                    {`${discountedPrice}₴`}
                  </span>
                )}
              </p>
              <p className={styles.menu__portion}>{menuDescription.portion}</p>
            </div>
            {menuDescription?.discount && (
              <span className={styles.menu__label} aria-hidden="true">
                {`${menuDescription.discount}% OFF`}
              </span>
            )}

            {isDesktop && <MenuAddButton />}
          </div>

          <p className={styles.menu__description}>
            {menuDescription.description}
          </p>

          {isMobile && <MenuAddButton />}
        </div>
      </div>
    </article>
  );
};
