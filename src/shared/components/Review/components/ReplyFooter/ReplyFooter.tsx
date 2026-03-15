/* eslint-disable max-len */
import React, { useState } from 'react';

import styles from './ReplyFooter.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';

import { Reply } from '../../../../types/user/user-replies.type';

import HeartIcon from '../../../../../assets/icons/reviews-icons/heart-icon.svg';
import HeartBrokenIcon from '../../../../../assets/icons/reviews-icons/heart-broken-icon.svg';
import CommentIcon from '../../../../../assets/icons/reviews-icons/comment-icon.svg';
import DotsIcon from '../../../../../assets/icons/reviews-icons/dots-icon.svg';
import FlagIcon from '../../../../../assets/icons/reviews-icons/flag-outline-icon.svg';
import PencilIcon from '../../../../../assets/icons/reviews-icons/pencil-icon.svg';
import BinIcon from '../../../../../assets/icons/reviews-icons/bin-icon.svg';
import { deleteReplyThunk } from '../../../../../store/reviewsSlice/reviewsSlice';

type Props = {
  review: Reply;
  setIsCommentFormOpen: (value: boolean) => void;
  setDeletedReply: (value: number | null) => void;
};

export const ReplyFooter: React.FC<Props> = ({
  review,
  setIsCommentFormOpen,
  setDeletedReply,
}) => {
  const userId = useAppSelector(state => state.user.user?.id);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    setDeletedReply(review.id);
    await dispatch(
      deleteReplyThunk({ reviewId: review.reviewId, replyId: review.id }),
    );
    setDeletedReply(null);
  };

  return (
    <footer className={styles.review}>
      <button
        type="button"
        className={styles.review__actionInfo}
        aria-label="Like review"
      >
        <img
          src={HeartIcon}
          alt=""
          className={styles.review__actionIcon}
          aria-hidden="true"
        />
        {review.like.length || 0}
      </button>

      <button
        type="button"
        className={styles.review__actionInfo}
        aria-label="Dislike review"
      >
        <img
          src={HeartBrokenIcon}
          alt=""
          className={styles.review__actionIcon}
          aria-hidden="true"
        />
        {review.dislike.length || 0}
      </button>

      <button
        type="button"
        className={styles.review__actionInfo}
        aria-label="Comment on review"
        onClick={() => setIsCommentFormOpen(true)}
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
          aria-label="Open review actions menu"
          onClick={() => {
            if (!isReplyModalOpen) {
              setIsReplyModalOpen(review.id);
            } else {
              setIsReplyModalOpen(null);
            }
          }}
          onBlur={() => setIsReplyModalOpen(null)}
        >
          <img src={DotsIcon} alt="" aria-hidden="true" />
        </button>
        {isReplyModalOpen === review.id &&
          (userId === review.user.id ? (
            <div className={styles.review__menu} role="menu">
              <ul>
                <li>
                  <button role="menuitem" className={styles.review__menuItem}>
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
