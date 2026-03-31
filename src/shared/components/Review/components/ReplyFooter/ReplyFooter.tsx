/* eslint-disable max-len */
import React, { useState } from 'react';

import styles from './ReplyFooter.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import {
  deleteReplyThunk,
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
import { Reply } from '../../../../types/reviews/replies.type';

type Props = {
  review: Review;
  reply: Reply;
  setIsCommentFormOpen: (value: CommentFormOpen | null) => void;
  setDeletedReply: (value: number | null) => void;
  setIsEdit: React.Dispatch<React.SetStateAction<EditType | null>>;
};

export const ReplyFooter: React.FC<Props> = ({
  review,
  reply,
  setIsCommentFormOpen,
  setDeletedReply,
  setIsEdit,
}) => {
  const userId = useAppSelector(state => state.user.user?.id);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const [localLike, setLocalLike] = useState(reply.like);
  const [localDislike, setLocalDislike] = useState(reply.dislike);

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

    const updatedReplies = review.replies?.map(r =>
      r.id === reply.id ? { ...r, like: newLike, dislike: newDislike } : r,
    );

    const updatedReview: Review = { ...review, replies: updatedReplies };

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

    const updatedReplies = review.replies?.map(r =>
      r.id === reply.id ? { ...r, like: newLike, dislike: newDislike } : r,
    );

    const updatedReview: Review = { ...review, replies: updatedReplies };

    await dispatch(updateUserReviewThunk(updatedReview));
  };

  const handleDelete = async () => {
    setDeletedReply(reply.id);
    await dispatch(
      deleteReplyThunk({ reviewId: reply.reviewId, replyId: reply.id }),
    );
    setDeletedReply(null);
  };

  return (
    <footer className={styles.review}>
      <button
        type="button"
        className={styles.review__actionInfo}
        aria-label="Like reply"
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
        aria-label="Dislike reply"
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
        aria-label="Comment on reply"
        onClick={() => setIsCommentFormOpen({ type: 'reply', id: reply.id })}
      >
        <img
          src={CommentIcon}
          alt=""
          className={styles.review__actionIcon}
          aria-hidden="true"
        />
      </button>

      <div className={styles.review__dropWrapper}>
        <button
          type="button"
          className={styles.review__dropDown}
          aria-haspopup="menu"
          aria-expanded={false}
          aria-label="Open reply actions menu"
          onClick={() => {
            if (!isReplyModalOpen) {
              setIsReplyModalOpen(reply.id);
            } else {
              setIsReplyModalOpen(null);
            }
          }}
          onBlur={() => setIsReplyModalOpen(null)}
        >
          <img src={DotsIcon} alt="" aria-hidden="true" />
        </button>
        {isReplyModalOpen === reply.id &&
          (userId === reply.user.id ? (
            <div className={styles.review__menu} role="menu">
              <ul>
                <li>
                  <button
                    role="menuitem"
                    className={styles.review__menuItem}
                    onMouseDown={() => {
                      setIsEdit({ type: 'reply', id: reply.id });
                      setIsCommentFormOpen({ type: 'reply', id: reply.id });
                    }}
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
