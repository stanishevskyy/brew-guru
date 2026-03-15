import React from 'react';

import styles from './ReviewFooter.module.scss';

import { Reply } from '../../../../types/user/user-replies.type';

//eslint-disable-next-line
import HeartIcon from '../../../../../assets/icons/reviews-icons/heart-icon.svg';
//eslint-disable-next-line
import HeartBrokenIcon from '../../../../../assets/icons/reviews-icons/heart-broken-icon.svg';
//eslint-disable-next-line
import CommentIcon from '../../../../../assets/icons/reviews-icons/comment-icon.svg';
//eslint-disable-next-line
import DotsIcon from '../../../../../assets/icons/reviews-icons/dots-icon.svg';
//eslint-disable-next-line
import FlagIcon from '../../../../../assets/icons/reviews-icons/flag-outline-icon.svg';

type Props = {
  like: number[];
  dislike: number[];
  replies: Reply[];
};

export const ReviewFooter: React.FC<Props> = ({ like, dislike, replies }) => {
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
        {replies?.length}
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
        {false && (
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
        )}
      </div>
    </footer>
  );
};
