import styles from './CafeCardMenu.module.scss';

//eslint-disable-next-line
import DishMobile from '../../../../assets/images/cafe-images/dish-image/dish-image-mobile.png';
//eslint-disable-next-line
import DishTablet from '../../../../assets/images/cafe-images/dish-image/dish-image-tablet.png';
//eslint-disable-next-line
import DishTabletDesktop from '../../../../assets/images/cafe-images/dish-image/dish-image-desktop.png';

export const CafeCardMenu = () => {
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

      <p className={styles.menu__dish}>Vegan Salad</p>
    </article>
  );
};
