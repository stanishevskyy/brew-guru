import styles from './ReviewForm.module.scss';

// eslint-disable-next-line max-len
import CloseIcon from '../../../../../assets/icons/reviews-icons/close-icon.svg';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
// eslint-disable-next-line max-len
import { addUserReplyThunk } from '../../../../../store/reviewsSlice/reviewsSlice';

type Props = {
  reviewId: number;
  setIsCommentFormOpen: (value: boolean) => void;
};

export const ReviewForm: React.FC<Props> = ({
  reviewId,
  setIsCommentFormOpen,
}) => {
  const [newComment, setNewComment] = useState('');
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

    setIsCommentFormOpen(false);

    await dispatch(addUserReplyThunk(comment));

    setNewComment('');
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
        onClick={() => setIsCommentFormOpen(false)}
      >
        <img src={CloseIcon} alt="" />
      </button>
      <button className={styles.reviews__primary}>Post</button>
      <button
        type="button"
        className={styles.reviews__secondary}
        onClick={() => setIsCommentFormOpen(false)}
      >
        Cancel
      </button>
    </form>
  );
};
