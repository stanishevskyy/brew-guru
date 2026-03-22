import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';

import styles from './CafePage.module.scss';

import { CafeMenu } from './components/CafeMenu';
import { Details } from '../../shared/components/Details';
import { CafeReviews } from './components/CafeReviews';

import ArrowLeft from '../../assets/icons/search-icons/left-arrow.svg';
//eslint-disable-next-line
import CardImage from '../../assets/images/cafe-images/cafe-image/cafe-image-mobile.png';
//eslint-disable-next-line
import CardImageTablet from '../../assets/images/cafe-images/cafe-image/cafe-image-tablet.png';
//eslint-disable-next-line
import CardImageDesktop from '../../assets/images/cafe-images/cafe-image/cafe-image-desktop.png';
import { BackSkeleton } from '../../shared/components/BackSkeleton';
import { CafeHeaderSkeleton } from '../../shared/components/CafeHeaderSkeleton';
import { CafeMenuSkeleton } from '../../shared/components/CafeMenuSkeleton';
//eslint-disable-next-line
import { CafeReviewsSkeleton } from '../../shared/components/CafeReviewsSkeleton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCafeMenuThunk } from '../../store/menuSlice/menuSlice';

export const CafePage = () => {
  const navigate = useNavigate();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const placeId = 'ChIJp9ELiGzdOkcRjRrpNz4JwL0';

  const openPlace = () => {
    const url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // const openPlace = url => {
  //   const placeId = extractPlaceId(url);
  //   if (placeId) {
  //     window.open(
  //       `https://www.google.com/maps/place/?q=place_id:${placeId}`,
  //       '_blank',
  //     );
  //   } else {
  //     alert('Не вдалося знайти Place ID');
  //   }
  // };

  const menuState = useAppSelector(state => state.menu);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchCafeMenuThunk({
        cafeId: 1,
        params: { filter: ['Hot Drinks'], sortBy: 'price_asc' },
      }),
    );
  }, []);

  console.log(menuState);

  return (
    <div className={styles.cafe}>
      {isLoading ? (
        <BackSkeleton />
      ) : (
        <button
          className={styles.cafe__back}
          aria-label="Back to prev page"
          onClick={() => navigate(-1)}
        >
          <img src={ArrowLeft} alt="" aria-hidden="true" />
          Back
        </button>
      )}

      <div className={styles.cafe__container}>
        {isLoading ? (
          <CafeHeaderSkeleton />
        ) : (
          <section className={styles.cafe__header}>
            <div className={styles.cafe__image}>
              <picture>
                <source media="(min-width: 639px)" srcSet={CardImageTablet} />
                <source media="(min-width: 1023px)" srcSet={CardImageDesktop} />

                <img
                  loading="lazy"
                  className={styles.cafe__mainImage}
                  src={CardImage}
                  alt="Cafe image"
                />
              </picture>
              <span className={styles.cafe__label}>See all photos</span>
            </div>

            <div className={styles.cafe__info}>
              <div className={styles.cafe__details}>
                <h2 className={styles.cafe__title}>Cafe name</h2>
                <div className={styles.cafe__infoWrapper}>
                  <div className={styles.cafe__detailsWrapper}>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconStar}></span>
                      4.5 (25 reviews)
                    </p>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconClcok}></span>9:00-21:00
                    </p>
                  </div>
                  <div className={styles.cafe__detailsWrapper}>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconPin}></span>3605 Parker
                      Rd.
                    </p>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconPhone}></span>+380 99
                      999 9999
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.cafe__descriptions}>
                <article
                  className={classNames(`${styles.cafe__descriptionsDetails}`, {
                    [styles.cafe__descriptionsDetailsActive]: isCommentsOpen,
                  })}
                >
                  Step into a thoughtfully designed thematic café inspired by
                  art, creativity, and slow living. Every detail — from the
                  interior to the menu — is carefully curavted to create a
                  unique atmosphere where guests can truly disconnect from the
                  rush of everyday life. The space combines warm lighting,
                  natural materials, and subtle artistic elements that reflect
                  the café’s concept. Each area is designed for a different
                  mood: cozy nooks with velvet armchairs offer a sanctuary for
                  quiet reflection or deep work, while open, light-filled spaces
                  invite conversation and shared inspiration. The air is always
                  filled with the comforting aroma of freshly roasted beans and
                  the soft backdrop of ambient music. Our menu is an extension
                  of this artistic vision, featuring seasonal, locally sourced
                  ingredients transformed into dishes that are as visually
                  stunning as they are delicious. Here, coffee is not just a
                  drink, but a daily ritual that invites you to pause and find
                  beauty in the present moment.
                </article>
                <button
                  className={styles.cafe__viewAll}
                  onClick={() => setIsCommentsOpen(prev => !prev)}
                >
                  VIew all
                </button>
              </div>

              <button
                className={styles.cafe__viewOnMap}
                onClick={() => openPlace()}
              >
                View on map
              </button>
            </div>
          </section>
        )}

        {isLoading ? <CafeMenuSkeleton /> : <CafeMenu />}

        <div className={styles.cafe__reservations}>
          <Details isModifiedDetails={true} />
          <button className={styles.cafe__apply}>Book</button>
        </div>

        {isLoading ? <CafeReviewsSkeleton /> : <CafeReviews />}
      </div>
    </div>
  );
};
