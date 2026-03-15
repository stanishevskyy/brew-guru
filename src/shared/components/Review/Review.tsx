import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Review.module.scss';

import { ReviewSkeleton } from '../ReviewSkeleton';
import { ReviewHeader } from './components/ReviewHeader';
import { ReplyHeader } from './components/ReplyHeader';
import { ReviewFooter } from './components/ReviewFooter';
import { ReplyFooter } from './components/ReplyFooter';
import { ReviewForm } from './components/ReviewForm';

import { UserReview } from '../../types/user/user-review.type';

//eslint-disable-next-line
import Arrow from '../../../assets/icons/reviews-icons/arrow-down.svg';

type Props = {
  isLoadingState: boolean;
  review: UserReview;
  setDeletedReview: (value: number | null) => void;
};

export const Review: React.FC<Props> = ({
  review,
  isLoadingState,
  setDeletedReview,
}) => {
  const { pathname } = useLocation();
  const isVisibleButton = pathname === '/profile/reviews';

  const [isLoading, setIsLoading] = useState(true);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [deletedReply, setDeletedReply] = useState<number | null>(null);

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
      <ReviewHeader review={review} />

      {/* review text */}
      <p className={styles.review__comment}>{review.comment}</p>

      {/* actions */}
      <ReviewFooter review={review} setDeletedReview={setDeletedReview} />

      {isAnswerOpen &&
        review.replies?.map(reply =>
          deletedReply === reply.id || isLoadingState ? (
            <ReviewSkeleton key={reply.id} />
          ) : (
            <article className={styles.reviewAsnwer} key={reply.id}>
              {/* header of answer */}
              <ReplyHeader review={reply} />

              {/* answer text */}
              <p className={styles.review__comment}>{reply.comment}</p>

              {/* actions */}
              <ReplyFooter
                review={reply}
                setIsCommentFormOpen={setIsCommentFormOpen}
                setDeletedReply={setDeletedReply}
              />
            </article>
          ),
        )}

      {isCommentFormOpen && (
        <ReviewForm
          reviewId={review.id}
          setIsCommentFormOpen={setIsCommentFormOpen}
        />
      )}

      <div className={styles.review__buttons}>
        {review.replies?.length !== 0 && (
          <button
            type="button"
            aria-label={isAnswerOpen ? 'Hide answer' : 'Show answer'}
            className={styles.review__answer}
            onClick={() => setIsAnswerOpen(!isAnswerOpen)}
          >
            <span>{`${review.replies?.length} answer`}</span>
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
        {isVisibleButton && (
          <button type="button" className={styles.review__viewOnPage}>
            View on Page
          </button>
        )}
      </div>
    </article>
  );
};
