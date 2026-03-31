/* eslint-disable max-len */
import React, { useState } from 'react';

import styles from './ReviewFooter.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import {
  deleteReviewThunk,
  updateUserReviewThunk,
} from '../../../../../store/reviewsSlice/reviewsSlice';

import { CommentFormOpen, EditType } from '../../Review';

import HeartIcon from '../../../../../assets/icons/reviews-icons/heart-icon.svg';
import LikeIcon from '../../../../../assets/icons/reviews-icons/like.svg';
import HeartBrokenIcon from '../../../../../assets/icons/reviews-icons/heart-broken-icon.svg';
import DislikeIcon from '../../../../../assets/icons/reviews-icons/dislike.svg';
import CommentIcon from '../../../../../assets/icons/reviews-icons/comment-icon.svg';
import DotsIcon from '../../../../../assets/icons/reviews-icons/dots-icon.svg';
import FlagIcon from '../../../../../assets/icons/reviews-icons/flag-outline-icon.svg';
import PencilIcon from '../../../../../assets/icons/reviews-icons/pencil-icon.svg';
import BinIcon from '../../../../../assets/icons/reviews-icons/bin-icon.svg';
import { Review } from '../../../../types/reviews/review.type';

type Props = {
  review: Review;
  setDeletedReview: (value: number | null) => void;
  setIsEdit: React.Dispatch<React.SetStateAction<EditType | null>>;
  setIsCommentFormOpen: (value: CommentFormOpen) => void;
};

export const ReviewFooter: React.FC<Props> = ({
  review,
  setDeletedReview,
  setIsEdit,
  setIsCommentFormOpen,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);

  const userId = useAppSelector(state => state.user.user?.id);
  const dispatch = useAppDispatch();

  const [localLike, setLocalLike] = useState(review.like);
  const [localDislike, setLocalDislike] = useState(review.dislike);

  const handleLike = async () => {
    if (!userId) {
      return;
    }

    const newLike = localLike.includes(userId)
      ? localLike.filter(id => id !== userId)
      : [...localLike, userId];

    const newDislike = localDislike.filter(id => id !== userId);

    setLocalLike(newLike);
    setLocalDislike(newDislike);

    const updatedReview = { ...review, like: newLike, dislike: newDislike };

    await dispatch(updateUserReviewThunk(updatedReview));
  };

  const handleDislike = async () => {
    if (!userId) {
      return;
    }

    const newDislike = localDislike.includes(userId)
      ? localDislike.filter(id => id !== userId)
      : [...localDislike, userId];

    const newLike = localLike.filter(id => id !== userId);

    setLocalDislike(newDislike);
    setLocalLike(newLike);

    const updatedReview: Review = {
      ...review,
      like: newLike,
      dislike: newDislike,
    };

    await dispatch(updateUserReviewThunk(updatedReview));
  };

  const handleDelete = async () => {
    setDeletedReview(review.id);
    await dispatch(deleteReviewThunk(review.id));

    setDeletedReview(null);
    setIsModalOpen(null);
  };

  return (
    <footer className={styles.review}>
      <button
        type="button"
        className={styles.review__actionInfo}
        aria-label="Like review"
        onClick={handleLike}
      >
        <img
          src={userId && localLike.includes(userId) ? LikeIcon : HeartIcon}
          alt=""
          className={styles.review__actionIcon}
          aria-hidden="true"
        />
        {localLike.length}
      </button>

      <button
        type="button"
        className={styles.review__actionInfo}
        aria-label="Dislike review"
        onClick={handleDislike}
      >
        <img
          src={
            userId && localDislike.includes(userId)
              ? DislikeIcon
              : HeartBrokenIcon
          }
          alt=""
          className={styles.review__actionIcon}
          aria-hidden="true"
        />
        {localDislike.length}
      </button>

      <button
        type="button"
        className={styles.review__actionInfo}
        aria-label="Comment on review"
        onClick={() => setIsCommentFormOpen({ type: 'review', id: review.id })}
      >
        <img
          src={CommentIcon}
          alt=""
          className={styles.review__actionIcon}
          aria-hidden="true"
        />
        {review.replies?.length !== 0 ? review.replies?.length : ''}
      </button>

      <div className={styles.review__dropWrapper}>
        <button
          type="button"
          className={styles.review__dropDown}
          aria-haspopup="menu"
          aria-expanded={false}
          aria-label="Open review actions menu"
          onClick={() => {
            if (!isModalOpen) {
              setIsModalOpen(review.id);
            } else {
              setIsModalOpen(null);
            }
          }}
          onBlur={() => setIsModalOpen(null)}
        >
          <img src={DotsIcon} alt="" aria-hidden="true" />
        </button>
        {isModalOpen === review.id &&
          (userId === review.user.id ? (
            <div className={styles.review__menu} role="menu">
              <ul>
                <li>
                  <button
                    role="menuitem"
                    className={styles.review__menuItem}
                    onMouseDown={() =>
                      setIsEdit({ type: 'review', id: review.id })
                    }
                  >
                    <img
                      src={PencilIcon}
                      alt=""
                      className={styles.review__iconItem}
                    />
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    role="menuitem"
                    className={styles.review__menuItem}
                    onMouseDown={handleDelete}
                  >
                    <img
                      src={BinIcon}
                      alt=""
                      className={styles.review__iconItem}
                    />
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className={styles.review__menu} role="menu">
              <ul>
                <li>
                  <button role="menuitem" className={styles.review__menuItem}>
                    <img
                      src={FlagIcon}
                      alt=""
                      className={styles.review__iconItem}
                    />
                    Report
                  </button>
                </li>
              </ul>
            </div>
          ))}
      </div>
    </footer>
  );
};
