import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import classNames from 'classnames';

import styles from './Reviews.module.scss';

import { useAppSelector } from '../../../../store/hooks';

import ArrowIcon from '../../../../assets/icons/reviews-icons/arrow-down.svg';

import { RatingSkeleton } from '../../../../shared/components/RatingSkeleton';
import { Review } from '../../../../shared/components/Review';
import { UserReports } from '../UserReports';
import { ReviewSkeleton } from '../../../../shared/components/ReviewSkeleton';

export const Reviews = () => {
  const [isSectionOpen, setIsSectionOpen] = useState({
    reviews: true,
    reports: false,
  });
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const reviewsState = useAppSelector(state => state.reviews);
  const reportsState = useAppSelector(state => state.reports);

  const [deletedReview, setDeletedReview] = useState<number | null>(null);

  //logic
  const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const totalReviews = reviewsState.reviews.length;

  reviewsState.reviews.forEach(r => {
    const rating = Math.round(r.rating!);

    ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
  });

  const ratingPercentages: Record<number, number> = {};

  for (let i = 1; i <= 5; i++) {
    ratingPercentages[i] = totalReviews
      ? (ratingCounts[i] / totalReviews) * 100
      : 0;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  if (reviewsState.reviews.length === 0) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className={styles.reviews}>
      <div className={styles.reviews__header}>
        <button
          className={classNames(`${styles.reviews__button}`, {
            [styles.reviews__buttonActive]: isRatingOpen,
          })}
          onClick={() => setIsRatingOpen(prev => !prev)}
        >
          Rating
          <img
            src={ArrowIcon}
            alt=""
            className={classNames(`${styles.reviews__buttonIcon}`, {
              [styles.reviews__buttonIconActive]: isRatingOpen,
            })}
          />
        </button>

        {isLoading ? (
          <RatingSkeleton />
        ) : (
          <div
            className={classNames(`${styles.reviews__summary}`, {
              [styles.reviews__summaryActive]: isRatingOpen,
            })}
          >
            <p className={styles.reviews__title}>Rating</p>

            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className={styles.reviews__rating}>
                <div className={styles.reviews__wrapper}>
                  <p className={styles.reviews__score}>
                    {Math.round(ratingPercentages[star])}%
                    <span className={styles.reviews__count}>
                      ({ratingCounts[star]} Reviews)
                    </span>
                  </p>

                  <Rating
                    name={`cafe-rating-${star}`}
                    value={star}
                    precision={0.5}
                    readOnly
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={<StarIcon fontSize="inherit" />}
                    size="medium"
                    getLabelText={v => `${v} зірок`}
                    sx={{
                      color: '#FFCA00',
                      '& .MuiRating-iconEmpty': { color: '#BBBBC9' },
                    }}
                  />
                </div>
                <div className={styles.reviews__divider}>
                  <div
                    className={styles.reviews__fill}
                    style={{ width: `${ratingPercentages[star]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.reviews__reviewsWrapper}>
        <nav className={styles.reviews__nav}>
          <ul className={styles.reviews__list}>
            <li className={styles.reviews__item}>
              <div
                className={classNames(`${styles.reviews__link}`, {
                  [styles.reviews__linkActive]: isSectionOpen.reviews,
                })}
                onClick={() =>
                  setIsSectionOpen(() => ({
                    reports: false,
                    reviews: true,
                  }))
                }
              >
                My reviews
              </div>
            </li>
            <li className={styles.reviews__item}>
              <div
                className={classNames(`${styles.reviews__link}`, {
                  [styles.reviews__linkActive]: isSectionOpen.reports,
                })}
                onClick={() =>
                  setIsSectionOpen(() => ({
                    reports: true,
                    reviews: false,
                  }))
                }
              >
                Reports
              </div>
            </li>
          </ul>
        </nav>
        {isSectionOpen.reviews &&
          reviewsState.reviews.map(review =>
            deletedReview === review.id ? (
              <ReviewSkeleton key={review.id} />
            ) : (
              <Review
                key={review.id}
                isLoadingState={reviewsState.loading}
                review={review}
                setDeletedReview={setDeletedReview}
              />
            ),
          )}
        {isSectionOpen.reports &&
          reportsState.reports.map(report => (
            <UserReports key={report.id} report={report} />
          ))}
      </div>
    </section>
  );
};
