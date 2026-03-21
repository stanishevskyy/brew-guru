import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './CardCafe.module.scss';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { CafeCardInfo } from '../../types/shared/cafeCardInfo';

import CardImage from '../../../assets/images/card-images/card-image.png';
//eslint-disable-next-line
import LoactionIcon from '../../../assets/icons/cart-icons/location-pin-icon.svg';
import ClockIcon from '../../../assets/icons/cart-icons/clock-icon.svg';
import FavoritesIcon from '../../../assets/icons/cart-icons/favorites-icon.svg';
import FavoritesActiveIcon from '../../../assets/icons/cart-icons/like.svg';
import BinIcon from '../../../assets/icons/cafe-icons/bin-icon.svg';
// eslint-disable-next-line max-len
import {
  addUserFavoritesCafeThunk,
  deleteUserFavoritesCafeThunk,
} from '../../../store/favoritesSlice/favoritesSlice';

type Props = {
  cafe: CafeCardInfo;
  isFavoritesOpen?: boolean;
};

export const CardCafe: React.FC<Props> = ({
  cafe,
  isFavoritesOpen = false,
}) => {
  const userId = useAppSelector(state => state.user.user?.id);
  const favoritesState = useAppSelector(
    state => state.favorites.userFavorite?.favorites,
  );
  const dispatch = useAppDispatch();
  const isInFavoritesList = favoritesState?.find(
    favoriteCafe => favoriteCafe.id === cafe.id,
  );

  const currentDayIndex = ((new Date().getDay() + 6) % 7) + 1;

  const currentDayWorking = cafe?.openingHours.find(
    el => el.weekday === currentDayIndex,
  );
  const openTime = currentDayWorking?.openTime
    ? currentDayWorking.openTime.slice(0, 5)
    : '';
  const closeTime = currentDayWorking?.closeTime
    ? currentDayWorking.closeTime.slice(0, 5)
    : '';

  return (
    <article className={styles.cardCafe__card}>
      <NavLink
        to="/cafeId"
        className={styles.cardCafe__cardLink}
        aria-label={`Go to ${cafe?.name} cafe page`}
      >
        <img
          src={CardImage}
          alt="Facade of Black Honey cafe"
          className={styles.cardCafe__cardImg}
        />
        <span
          className={styles.cardCafe__cardOverlay}
          aria-hidden="true"
        ></span>
      </NavLink>

      <div className={styles.cardCafe__bottom}>
        <p className={styles.cardCafe__cardTitle}>{cafe?.name}</p>

        <div className={styles.cardCafe__wrappInfo}>
          <div className={styles.cardCafe__wrappLocation}>
            <img
              src={LoactionIcon}
              alt="Cafe location"
              className={styles.cardCafe__locationIcon}
            />
            <p className={styles.cardCafe__locationInfo}>{cafe?.address}</p>
          </div>
          <div className={styles.cardCafe__wrappTime}>
            <img
              src={ClockIcon}
              alt="Cafe opening hours"
              className={styles.cardCafe__timeIcon}
            />
            <p className={styles.cardCafe__timeInfo}>
              {currentDayWorking?.openTime && currentDayWorking.closeTime
                ? `${openTime}-${closeTime}`
                : 'The cafe is closed today'}
            </p>
          </div>
        </div>

        <div className={styles.cardCafe__buttons}>
          <Link
            to="/cafeId"
            className={styles.cardCafe__button}
            aria-label="Book a table at Black Honey cafe"
          >
            Book now
          </Link>

          {isFavoritesOpen ? (
            <button
              className={styles.cardCafe__deleteBtn}
              aria-label="Remove Black Honey from favorites"
              onClick={() => {
                if (!userId) {
                  return;
                }

                dispatch(
                  deleteUserFavoritesCafeThunk({
                    userId,
                    favoriteId: cafe.id,
                  }),
                );
              }}
            >
              <img
                src={BinIcon}
                alt=""
                className={styles.cardCafe__deleteBtnImg}
                aria-hidden="true"
              />
            </button>
          ) : (
            <button
              className={styles.cardCafe__favoriteBtn}
              aria-label="Add Black Honey to favorites"
              onClick={() => {
                if (!userId) {
                  return;
                }

                if (!isInFavoritesList) {
                  dispatch(
                    addUserFavoritesCafeThunk({
                      userId,
                      favoriteCafe: {
                        id: cafe.id,
                        name: cafe.name,
                        img: cafe.img,
                        address: cafe.address,
                        rating: cafe.rating,
                        averageCheck: cafe.averageCheck,
                        openingHours: cafe.openingHours,
                      },
                    }),
                  );
                } else {
                  dispatch(
                    deleteUserFavoritesCafeThunk({
                      userId,
                      favoriteId: cafe.id,
                    }),
                  );
                }
              }}
            >
              <img
                src={isInFavoritesList ? FavoritesActiveIcon : FavoritesIcon}
                alt=""
                className={styles.cardCafe__favoriteBtnImg}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
