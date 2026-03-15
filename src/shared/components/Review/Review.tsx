import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Review.module.scss';

import { ReviewSkeleton } from '../ReviewSkeleton';
import { ReviewHeader } from './components/ReviewHeader';
import { ReviewFooter } from './components/ReviewFooter';

import { UserReview } from '../../types/user/user-review.type';

//eslint-disable-next-line
import Arrow from '../../../assets/icons/reviews-icons/arrow-down.svg';
import { ReviewForm } from './components/ReviewForm';

type Props = {
  review: UserReview;
};

export const Review: React.FC<Props> = ({ review }) => {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timerId);
  }, [pathname]);

  if (isLoading) {
    return <ReviewSkeleton />;
  }

  return (
    <article className={styles.review}>
      {/* header of review */}
      <ReviewHeader
        firstName={review.user.firstName}
        lastName={review.user.lastName}
        rating={review.rating}
        createdAt={review.createdAt}
      />

      {/* review text */}
      <p className={styles.review__comment}>{review.comment}</p>

      {/* actions */}
      <ReviewFooter
        like={review.like}
        dislike={review.dislike}
        replies={review.replies!}
      />

      {isAnswerOpen && (
        <article className={styles.reviewAsnwer}>
          {/* header of answer */}
          <ReviewHeader
            firstName={review.user.firstName}
            lastName={review.user.lastName}
            rating={review.rating}
            createdAt={review.createdAt}
          />

          {/* answer text */}
          <p className={styles.review__comment}>
            I agree but when I sat under the air conditioner it was very hot. I
            do not recommend these seats.
          </p>

          {/* actions */}
          <ReviewFooter
            like={review.like}
            dislike={review.dislike}
            replies={review.replies!}
          />
        </article>
      )}

      {false && <ReviewForm />}

      <button
        type="button"
        aria-label={isAnswerOpen ? 'Hide answer' : 'Show answer'}
        className={styles.review__answer}
        onClick={() => setIsAnswerOpen(!isAnswerOpen)}
      >
        <span>1 answer</span>
        <img
          src={Arrow}
          className={classNames(`${styles.review__answerIcon}`, {
            [styles.review__answerIconActive]: isAnswerOpen,
          })}
          alt=""
          aria-hidden="true"
        />
      </button>
    </article>
  );
};
