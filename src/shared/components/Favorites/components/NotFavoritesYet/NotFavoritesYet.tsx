import styles from './NotFavoritesYet.module.scss';

//eslint-disable-next-line
import NotFavoritesIcon from '../../../../../assets/icons/favourites-icons/not-favorites-icon.svg';

export const NotFavoritesYet = () => {
  return (
    <section
      className={styles.notFavorites}
      aria-labelledby="no-favorites-title"
    >
      <img
        src={NotFavoritesIcon}
        alt="Empty favorites illustration"
        className={styles.notFavorites__img}
      />

      <div className={styles.notFavorites__wrapper}>
        <h3 id="no-favorites-title" className={styles.notFavorites__title}>
          No favorite places yet?
        </h3>

        <p className={styles.notFavorites__description}>
          Save places you like to quickly access them later.
        </p>
      </div>
    </section>
  );
};
