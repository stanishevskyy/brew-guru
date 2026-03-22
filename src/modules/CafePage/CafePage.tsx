import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames';

import styles from './CafePage.module.scss';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
// eslint-disable-next-line max-len
import { fetchCafeDetailsThunk } from '../../store/cafeDetailsSlice/cafeDetailsSlice';

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cafeId) {
      dispatch(fetchCafeDetailsThunk(+cafeId));
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
                    [styles.cafe__descriptionsDetailsActive]: isDescriptionOpen,
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
                  onClick={() => setIsDescriptionOpen(prev => !prev)}
                >
                  VIew all
                </button>
              </div>

              <button
                className={styles.cafe__viewOnMap}
                onClick={() => openPlace('as')}
              >
                View on map
              </button>
            </div>
          </section>
        )}

        {cafeState.loading ? <CafeMenuSkeleton /> : <CafeMenu />}

        <div className={styles.cafe__reservations}>
          <Details isModifiedDetails={true} />
          <button className={styles.cafe__apply}>Book</button>
        </div>

        {cafeState.loading ? <CafeReviewsSkeleton /> : <CafeReviews />}
      </div>
    </div>
  );
};
