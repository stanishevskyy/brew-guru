/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Review.module.scss';

import { ReviewSkeleton } from '../ReviewSkeleton';
import { ReviewHeader } from './components/ReviewHeader';
import { ReplyHeader } from './components/ReplyHeader';
import { ReviewFooter } from './components/ReviewFooter';
import { ReplyFooter } from './components/ReplyFooter';
import { ReviewForm } from './components/ReviewForm';

//eslint-disable-next-line
import Arrow from '../../../assets/icons/reviews-icons/arrow-down.svg';
import { Review as ReviewList } from '../../types/reviews/review.type';
import { cafeDetailsService } from '../../../services/cafeDetailsService';

export type CommentFormOpen = { type: 'review' | 'reply'; id: number };

export type EditType = {
  type: 'review' | 'reply';
  id: number;
};

export type LoadingType = {
  reviewId: number | null;
  replyId: number | null;
};

type Props = {
  isLoadingState: boolean;
  review: ReviewList;
  setDeletedReview: (value: number | null) => void;
};

export const Review: React.FC<Props> = ({
  review,
  isLoadingState,
  setDeletedReview,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isVisibleButton = pathname === '/profile/reviews';

  const [isLoading, setIsLoading] = useState(true);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] =
    useState<CommentFormOpen | null>(null);
  const [isEdit, setIsEdit] = useState<EditType | null>(null);
  const [isEditLoading, setIsEditLoading] = useState<LoadingType>({
    reviewId: null,
    replyId: null,
  });
  const [deletedReply, setDeletedReply] = useState<number | null>(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timerId);
  }, [pathname]);

  const handleViewOnPage = async () => {
    const cafeDetails = await cafeDetailsService.getCafeDetails(review.cafeId);
    const url = cafeDetails ? `${cafeDetails.name}-${cafeDetails.id}` : '/';

    navigate(`/${url}`, { state: { scrollTo: `${review.id}` } });
  };

  if (isLoading || isEditLoading.reviewId === review.id) {
    return <ReviewSkeleton />;
  }

  return (
    <article className={styles.review}>
      {/* header of review */}
      <ReviewHeader review={review} />

      {/* review text */}
      <p className={styles.review__comment}>{review.comment}</p>

      {/* actions */}
      <ReviewFooter
        review={review}
        setDeletedReview={setDeletedReview}
        setIsEdit={setIsEdit}
        setIsCommentFormOpen={setIsCommentFormOpen}
      />

      {((isCommentFormOpen?.id === review.id &&
        isCommentFormOpen.type === 'review') ||
        (isEdit?.type === 'review' && isEdit?.id === review.id)) && (
        <ReviewForm
          reviewId={review.id}
          setIsCommentFormOpen={setIsCommentFormOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setIsEditLoading={setIsEditLoading}
        />
      )}

      {isAnswerOpen &&
        review.replies?.map(reply =>
          deletedReply === reply.id ||
          isLoadingState ||
          isEditLoading?.replyId === reply.id ? (
            <ReviewSkeleton key={reply.id} />
          ) : (
            <article className={styles.reviewAsnwer} key={reply.id}>
              {/* header of answer */}
              <ReplyHeader review={reply} />

              {/* answer text */}
              <p className={styles.review__comment}>{reply.comment}</p>

              {/* actions */}
              <ReplyFooter
                review={review}
                reply={reply}
                setIsCommentFormOpen={setIsCommentFormOpen}
                setDeletedReply={setDeletedReply}
                setIsEdit={setIsEdit}
              />

              {((isCommentFormOpen?.id === reply.id &&
                isCommentFormOpen.type === 'reply') ||
                (isEdit?.type === 'reply' && isEdit?.id === reply.id)) && (
                <ReviewForm
                  reviewId={review.id}
                  setIsCommentFormOpen={setIsCommentFormOpen}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  setIsEditLoading={setIsEditLoading}
                />
              )}
            </article>
          ),
        )}

      <div className={styles.review__buttons}>
        {review.replies && review.replies?.length !== 0 && (
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
          <button
            type="button"
            className={styles.review__viewOnPage}
            onClick={handleViewOnPage}
          >
            View on Page
          </button>
        )}
      </div>
    </article>
  );
};
