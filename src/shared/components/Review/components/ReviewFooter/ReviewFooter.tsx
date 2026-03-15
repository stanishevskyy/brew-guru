/* eslint-disable max-len */
import React from 'react';

import styles from './ReviewFooter.module.scss';

import { useAppDispatch } from '../../../../../store/hooks';

import { Reply } from '../../../../types/user/user-replies.type';

import HeartIcon from '../../../../../assets/icons/reviews-icons/heart-icon.svg';
import HeartBrokenIcon from '../../../../../assets/icons/reviews-icons/heart-broken-icon.svg';
import CommentIcon from '../../../../../assets/icons/reviews-icons/comment-icon.svg';
import DotsIcon from '../../../../../assets/icons/reviews-icons/dots-icon.svg';
import FlagIcon from '../../../../../assets/icons/reviews-icons/flag-outline-icon.svg';
import PencilIcon from '../../../../../assets/icons/reviews-icons/pencil-icon.svg';
import BinIcon from '../../../../../assets/icons/reviews-icons/bin-icon.svg';

type Props = {
  like: number[];
  dislike: number[];
  replies?: Reply[];
};

export const ReviewFooter: React.FC<Props> = ({
  like,
  dislike,
  replies = [],
}) => {
  const dispatch = useAppDispatch();

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
        {like.length || 0}
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
        {dislike.length || 0}
      </button>

      <button
        type="button"
        className={styles.review__actionInfo}
        aria-label="Comment on review"
      >
        <img
          src={CommentIcon}
          alt=""
          className={styles.review__actionIcon}
          aria-hidden="true"
        />
        {replies?.length !== 0 ? replies?.length : ''}
      </button>

      <div className={styles.review__dropWrapper}>
        <button
          type="button"
          className={styles.review__dropDown}
          aria-haspopup="menu"
          aria-expanded={false}
          aria-label="Open review actions menu"
        >
          <img src={DotsIcon} alt="" aria-hidden="true" />
        </button>
        {false &&
          (false ? (
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
                  <button role="menuitem" className={styles.review__menuItem}>
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
