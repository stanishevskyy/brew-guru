import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames';

import styles from './CafePage.module.scss';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
// eslint-disable-next-line max-len
import { fetchCafeDetailsThunk } from '../../store/cafeDetailsSlice/cafeDetailsSlice';
import { fetchCafeReviewsThunk } from '../../store/reviewsSlice/reviewsSlice';

import { openPlace } from './utils/onPlace';

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

export const CafePage = () => {
  const navigate = useNavigate();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { slug } = useParams();
  const cafeId = slug?.split('-').pop();

  const cafeState = useAppSelector(state => state.cafeDetails);

  const reviewsState = useAppSelector(state => state.reviews);
  const dispatch = useAppDispatch();

  const currentDayIndex = ((new Date().getDay() + 6) % 7) + 1;

  const currentDayWorking = cafeState.cafe?.openingHours.find(
    el => el.weekday === currentDayIndex,
  );
  const openTime = currentDayWorking?.openTime
    ? currentDayWorking.openTime.slice(0, 5)
    : '';
  const closeTime = currentDayWorking?.closeTime
    ? currentDayWorking.closeTime.slice(0, 5)
    : '';

  useEffect(() => {
    if (cafeId) {
      dispatch(fetchCafeDetailsThunk(+cafeId));
      dispatch(fetchCafeReviewsThunk(+cafeId));
    }
  }, [cafeId, dispatch]);

  return (
    <div className={styles.cafe}>
      {cafeState.loading ? (
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
        {cafeState.loading ? (
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
                <h2 className={styles.cafe__title}>{cafeState.cafe?.name}</h2>
                <div className={styles.cafe__infoWrapper}>
                  <div className={styles.cafe__detailsWrapper}>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconStar}></span>
                      {`${cafeState.cafe?.rating} (${reviewsState.reviews.length} reviews)`}
                    </p>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconClcok}></span>{' '}
                      {currentDayWorking?.openTime &&
                      currentDayWorking.closeTime
                        ? `${openTime}-${closeTime}`
                        : 'Closed'}
                    </p>
                  </div>
                  <div className={styles.cafe__detailsWrapper}>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconPin}></span>
                      {cafeState.cafe?.address}
                    </p>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconPhone}></span>
                      {cafeState.cafe?.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.cafe__descriptions}>
                <article
                  className={classNames(`${styles.cafe__descriptionsDetails}`, {
                    [styles.cafe__descriptionsDetailsActive]: isDescriptionOpen,
                  })}
                >
                  {cafeState.cafe?.description}
                </article>
                <button
                  className={styles.cafe__viewAll}
                  onClick={() => setIsDescriptionOpen(prev => !prev)}
                >
                  VIew all
                </button>
              </div>

              <button
                className={styles.cafe__viewOnMap}
                onClick={() => openPlace(`${cafeState.cafe?.address}`)}
              >
                View on map
              </button>
            </div>
          </section>
        )}

        {cafeState.loading ? (
          <CafeMenuSkeleton />
        ) : (
          <CafeMenu cafeId={cafeState.cafe?.id as number} />
        )}

        <div className={styles.cafe__reservations}>
          <Details isModifiedDetails={true} />
          <button className={styles.cafe__apply}>Book</button>
        </div>

        {cafeState.loading ? (
          <CafeReviewsSkeleton />
        ) : (
          <CafeReviews
            cafeId={cafeState.cafe?.id as number}
            reviews={reviewsState.reviews}
            isLoadingState={reviewsState.loading}
          />
        )}
      </div>
    </div>
  );
};
