/* eslint-disable max-len */
import React, { useState } from 'react';

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import styles from './CafeReviews.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import { Review as ReviewList } from '../../../../shared/types/reviews/review.type';
import { Reply } from '../../../../shared/types/reviews/replies.type';

import { Review } from '../../../../shared/components/Review';

//eslint-disable-next-line
import PersonImage from '../../../../assets/images/cafe-images/cafe-reviews-image/Picture.png';
import { ReviewSkeleton } from '../../../../shared/components/ReviewSkeleton';
import { addUserReviewThunk } from '../../../../store/reviewsSlice/reviewsSlice';

type Props = {
  cafeId: number;
  reviews: ReviewList[];
  isLoadingState: boolean;
};

export const CafeReviews: React.FC<Props> = ({
  cafeId,
  reviews,
  isLoadingState,
}) => {
  const [value, setValue] = useState(3.5);
  const [newCommentValue, setNewCommentValue] = useState('');
  const [deletedReview, setDeletedReview] = useState<number | null>(null);

  const userState = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const avarageRating = (
    reviews.reduce((acc, el) => acc + (el.rating ?? 0), 0) / reviews.length
  ).toFixed(1);
  const reviewsCount = reviews.length;

  const handleAddNewComment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userState?.id) {
      return;
    }

    if (!newCommentValue && value) {
      return;
    }

    const newComment = {
      cafeId,
      user: {
        id: userState?.id,
        img: userState?.img ?? '',
        firstName: userState?.firstName,
        lastName: userState?.lastName,
      },
      rating: value,
      createdAt: new Date().toISOString(),
      comment: newCommentValue,
      like: [] as number[],
      dislike: [] as number[],
      replies: [] as Reply[],
    };

    await dispatch(addUserReviewThunk(newComment));

    setNewCommentValue('');
  };

  return (
    <section className={styles.reviews} aria-labelledby="reviews-title">
      <div className={styles.reviews__container}>
        <div className={styles.reviews__info}>
          <h2 id="reviews-title" className={styles.reviews__title}>
            Reviews
          </h2>
          <p className={styles.reviews__rating}>
            <span className={styles.reviews__icon} aria-hidden="true"></span>
            {`${isNaN(+avarageRating) ? 0 : avarageRating} (${reviewsCount} reviews)`}
          </p>
        </div>

        <article className={styles.reviews__header}>
          <div className={styles.reviews__details}>
            <img
              src={PersonImage}
              alt={`${userState?.firstName} ${userState?.lastName}`}
              className={styles.reviews__avatar}
            />
            <div className={styles.review__wrapper}>
              <p
                className={styles.reviews__name}
              >{`${userState?.firstName} ${userState?.lastName}`}</p>
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
          <form
            className={styles.reviews__form}
            aria-label="Додати відгук"
            onSubmit={handleAddNewComment}
          >
            <div className={styles.reviews__wrapper}>
              <input
                type="text"
                name="review"
                className={styles.reviews__comment}
                placeholder="Type here"
                required
                value={newCommentValue}
                onChange={e => setNewCommentValue(e.target.value)}
              />
              <button
                type="submit"
                className={styles.reviews__confirm}
              ></button>
            </div>
            <button type="submit" className={styles.reviews__button}>
              Post
            </button>
          </form>
        </article>

        <ul className={styles.reviews__comments}>
          {reviews.map(review =>
            deletedReview === review.id ? (
              <li className={styles.reviews__downComment} key={review.id}>
                <ReviewSkeleton />
              </li>
            ) : (
              <li className={styles.reviews__downComment} key={review.id}>
                <Review
                  isLoadingState={isLoadingState}
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
