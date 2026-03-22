import { useEffect, useState } from 'react';

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import styles from './CafeReviews.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
// eslint-disable-next-line max-len
import { fetchCafeReviewsThunk } from '../../../../store/reviewsSlice/reviewsSlice';

import { Review } from '../../../../shared/components/Review';

//eslint-disable-next-line
import PersonImage from '../../../../assets/images/cafe-images/cafe-reviews-image/Picture.png';
import { ReviewSkeleton } from '../../../../shared/components/ReviewSkeleton';

export const CafeReviews = () => {
  const [value, setValue] = useState(3.5);
  const [deletedReview, setDeletedReview] = useState<number | null>(null);
  const reviewsState = useAppSelector(state => state.reviews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCafeReviewsThunk(1));
  }, []);

  return (
    <section className={styles.reviews} aria-labelledby="reviews-title">
      <div className={styles.reviews__container}>
        <div className={styles.reviews__info}>
          <h2 id="reviews-title" className={styles.reviews__title}>
            Reviews
          </h2>
          <p className={styles.reviews__rating}>
            <span className={styles.reviews__icon} aria-hidden="true"></span>
            4.5 (3 reviews)
          </p>
        </div>

        <article className={styles.reviews__header}>
          <div className={styles.reviews__details}>
            <img
              src={PersonImage}
              alt="Dianne Russell"
              className={styles.reviews__avatar}
            />
            <div className={styles.review__wrapper}>
              <p className={styles.reviews__name}>Dianne Russell</p>
              <Rating
                name="cafe-rating-dianne"
                value={value}
                precision={0.5}
                onChange={(_, newValue) => setValue(newValue || 0)}
                icon={<StarIcon fontSize="inherit" />}
                emptyIcon={<StarIcon fontSize="inherit" />}
                size="medium"
                getLabelText={(v: number) => `${v} зірок`}
                sx={{
                  color: '#0A0A0C',
                  '& .MuiRating-iconEmpty': { color: '#BBBBC9' },
                }}
              />
            </div>
          </div>
          <form className={styles.reviews__form} aria-label="Додати відгук">
            <input
              type="text"
              name="review"
              className={styles.reviews__comment}
              placeholder="Type here"
              required
            />
            <button type="submit" className={styles.reviews__button} disabled>
              Post
            </button>
          </form>
        </article>

        <ul className={styles.reviews__comments}>
          {reviewsState.reviews.map(review =>
            deletedReview === review.id ? (
              <li className={styles.reviews__downComment} key={review.id}>
                <ReviewSkeleton />
              </li>
            ) : (
              <li className={styles.reviews__downComment} key={review.id}>
                <Review
                  isLoadingState={reviewsState.loading}
                  review={review}
                  setDeletedReview={setDeletedReview}
                />
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
};
