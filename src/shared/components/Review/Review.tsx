import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Review.module.scss';

import { ReviewSkeleton } from '../ReviewSkeleton';
import { ReviewHeader } from './components/ReviewHeader';
import { ReviewFooter } from './components/ReviewFooter';
import { ReviewForm } from './components/ReviewForm';

import { UserReview } from '../../types/user/user-review.type';

//eslint-disable-next-line
import Arrow from '../../../assets/icons/reviews-icons/arrow-down.svg';

type Props = {
  review: UserReview;
};

export const Review: React.FC<Props> = ({ review }) => {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const isVisibeleButton = pathname === '/profile/reviews';

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

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
        img={review.user.img}
        rating={review.rating!}
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

      {isAnswerOpen &&
        review.replies?.map(reply => (
          <article className={styles.reviewAsnwer} key={reply.id}>
            {/* header of answer */}
            <ReviewHeader
              firstName={reply.user.firstName}
              lastName={reply.user.lastName}
              img={reply.user.img}
              rating={null}
              createdAt={reply.createdAt}
            />

            {/* answer text */}
            <p className={styles.review__comment}>{reply.comment}</p>

            {/* actions */}
            <ReviewFooter like={reply.like} dislike={reply.dislike} />
          </article>
        ))}

      {false && <ReviewForm />}

      <div className={styles.review__buttons}>
        {review.replies?.length !== 0 && (
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
        )}
        {isVisibeleButton && (
          <button type="button" className={styles.review__viewOnPage}>
            View on Page
          </button>
        )}
      </div>
    </article>
  );
};
