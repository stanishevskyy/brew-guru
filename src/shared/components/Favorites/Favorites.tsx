import React, { useEffect } from 'react';
import classNames from 'classnames';

import styles from './Favorites.module.scss';

import { CardCafe } from '../CardCafe';

//eslint-disable-next-line
import CloseFavourites from '../../../assets/icons/favourites-icons/close-favourites-icon.svg';
import { NotFavoritesYet } from './components/NotFavoritesYet';

type Props = {
  isFavoritesOpen: boolean;
  setIsFavoritesOpen: (value: boolean) => void;
};

export const Favorites: React.FC<Props> = ({
  isFavoritesOpen,
  setIsFavoritesOpen,
}) => {
  useEffect(() => {
    if (isFavoritesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isFavoritesOpen]);

  return (
    <div
      className={classNames(`${styles.favourites}`, {
        [styles.favouritesActive]: isFavoritesOpen,
      })}
      role="dialog"
      aria-label="Favorites panel"
      aria-modal={true}
    >
      <div className={styles.favourites__container}>
        <div className={styles.favourites__wrapper}>
          <h3 className={styles.favourites__title}>Favorites</h3>

          <button
            className={styles.favourites__closeBtn}
            aria-label="Close favorites panel"
            onClick={() => setIsFavoritesOpen(false)}
          >
            <img
              src={CloseFavourites}
              alt=""
              className={styles.favourites__closeImg}
              aria-hidden="true"
            />
          </button>
        </div>

        {false ? (
          <NotFavoritesYet />
        ) : (
          <div className={styles.favourites__gridLayout}>
            <div className={styles.favourites__cafe}>
              <CardCafe isFavoritesOpen={isFavoritesOpen} />
            </div>
            <div className={styles.favourites__cafe}>
              <CardCafe isFavoritesOpen={isFavoritesOpen} />
            </div>
            <div className={styles.favourites__cafe}>
              <CardCafe isFavoritesOpen={isFavoritesOpen} />
            </div>
            <div className={styles.favourites__cafe}>
              <CardCafe isFavoritesOpen={isFavoritesOpen} />
            </div>
            <div className={styles.favourites__cafe}>
              <CardCafe isFavoritesOpen={isFavoritesOpen} />
            </div>
            <div className={styles.favourites__cafe}>
              <CardCafe isFavoritesOpen={isFavoritesOpen} />
            </div>
            <div className={styles.favourites__cafe}>
              <CardCafe isFavoritesOpen={isFavoritesOpen} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
