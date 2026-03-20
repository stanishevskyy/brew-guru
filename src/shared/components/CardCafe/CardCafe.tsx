import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './CardCafe.module.scss';

import { Cafe } from '../../types/user/user-cafe-history.type';

import CardImage from '../../../assets/images/card-images/card-image.png';
//eslint-disable-next-line
import LoactionIcon from '../../../assets/icons/cart-icons/location-pin-icon.svg';
import ClockIcon from '../../../assets/icons/cart-icons/clock-icon.svg';
import FavoritesIcon from '../../../assets/icons/cart-icons/favorites-icon.svg';
import BinIcon from '../../../assets/icons/cafe-icons/bin-icon.svg';

type Props = {
  cafe: Cafe;
  isFavoritesOpen?: boolean;
};

export const CardCafe: React.FC<Props> = ({
  cafe,
  isFavoritesOpen = false,
}) => {
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
            >
              <img
                src={FavoritesIcon}
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
