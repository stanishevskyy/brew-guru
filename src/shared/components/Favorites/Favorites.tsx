/* eslint-disable max-len */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import styles from './Favorites.module.scss';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserFavoritesCafe } from '../../../store/favoritesSlice/favoritesSlice';

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
  const userId = useAppSelector(state => state.user.user?.id);
  const favoritesState = useAppSelector(state => state.favorites);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(fetchUserFavoritesCafe(userId as number));
  }, [favoritesState.userFavorite]);

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

        {favoritesState.userFavorite === null ? (
          <NotFavoritesYet />
        ) : (
          <div className={styles.favourites__gridLayout}>
            {favoritesState.userFavorite.favorites.map(favoriteCafe => (
              <div className={styles.favourites__cafe} key={favoriteCafe.id}>
                <CardCafe
                  cafe={favoriteCafe}
                  isFavoritesOpen={isFavoritesOpen}
                  key={favoriteCafe.id}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
