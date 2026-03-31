/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';

import styles from './ReviewForm.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
// eslint-disable-next-line max-len
import {
  addUserReplyThunk,
  updateUserReviewThunk,
} from '../../../../../store/reviewsSlice/reviewsSlice';
import { CommentFormOpen, EditType, LoadingType } from '../../Review';

// eslint-disable-next-line max-len
import CloseIcon from '../../../../../assets/icons/reviews-icons/close-icon.svg';
import { Review } from '../../../../types/reviews/review.type';

type Props = {
  reviewId: number;
  setIsCommentFormOpen: (value: CommentFormOpen | null) => void;
  isEdit: EditType | null;
  setIsEdit: React.Dispatch<React.SetStateAction<EditType | null>>;
  setIsEditLoading: React.Dispatch<React.SetStateAction<LoadingType>>;
};

export const ReviewForm: React.FC<Props> = ({
  reviewId,
  setIsCommentFormOpen,
  isEdit,
  setIsEdit,
  setIsEditLoading,
}) => {
  const [newComment, setNewComment] = useState('');
  const reviews = useAppSelector(state => state.reviews.reviews);
  const userState = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const handleAddComment = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!userState?.id) {
      return;
    }

    if (!newComment) {
      return;
    }

    if (!isEdit) {
      const id = +Date.now();
      const comment = {
        id,
        reviewId,
        user: {
          id: userState?.id,
          img: userState?.img || '',
          firstName: userState?.firstName,
          lastName: userState?.lastName,
        },
        createdAt: new Date().toISOString(),
        comment: newComment,
        like: [],
        dislike: [],
      };

      setIsCommentFormOpen(null);

      await dispatch(addUserReplyThunk(comment));

      setNewComment('');
    } else {
      if (isEdit.type === 'review') {
        setIsEditLoading(prev => ({ ...prev, reviewId: isEdit.id }));
        const currentReview = reviews.find(r => r.id === reviewId);

        if (!currentReview) {
          return;
        }

        const updatedReview: Review = {
          ...currentReview,
          comment: newComment,
        };

        setIsCommentFormOpen(null);

        await dispatch(updateUserReviewThunk(updatedReview));

        setNewComment('');
        setIsEdit(null);
        setIsEditLoading(prev => ({ ...prev, reviewId: null }));
      }

      if (isEdit.type === 'reply') {
        setIsEditLoading(prev => ({ ...prev, replyId: isEdit.id }));

        const currentReview = reviews.find(r => r.id === reviewId);

        if (!currentReview) {
          return;
        }

        const updatedReplies = currentReview.replies?.map(r =>
          r.id === isEdit.id ? { ...r, comment: newComment } : r,
        );

        const updatedReview: Review = {
          ...currentReview,
          replies: updatedReplies,
        };

        setIsCommentFormOpen(null);

        await dispatch(updateUserReviewThunk(updatedReview));

        setNewComment('');
        setIsEdit(null);
        setIsEditLoading(prev => ({ ...prev, replyId: null }));
      }
    }
  };

  return (
    <form
      className={styles.reviews}
      aria-label="Додати відгук"
      onSubmit={handleAddComment}
    >
      <div className={styles.reviews__wrapper}>
        <input
          type="text"
          name="review"
          className={styles.reviews__comment}
          placeholder="Type here"
          required
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button className={styles.reviews__confirm}></button>
      </div>
      <button
        type="button"
        className={styles.reviews__cancel}
        onClick={() => {
          setIsCommentFormOpen(null);
          setIsEdit(null);
        }}
      >
        <img src={CloseIcon} alt="" />
      </button>
      <button className={styles.reviews__primary}>
        {isEdit ? 'Save' : 'Post'}
      </button>
      <button
        type="button"
        className={styles.reviews__secondary}
        onClick={() => {
          setIsCommentFormOpen(null);
          setIsEdit(null);
        }}
      >
        Cancel
      </button>
    </form>
  );
};
