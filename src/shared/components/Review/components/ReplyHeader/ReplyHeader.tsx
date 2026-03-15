import React from 'react';

import styles from './ReplyHeader.module.scss';

import { Reply } from '../../../../types/user/user-replies.type';

import { timeAgo } from '../../utils/timeAgo';

//eslint-disable-next-line
import PersonImage from '../../../../../assets/images/cafe-images/cafe-reviews-image/Picture.png';

type Props = {
  review: Reply;
};

export const ReplyHeader: React.FC<Props> = ({ review }) => {
  return (
    <header className={styles.review}>
      {!review.user.img ? (
        <img
          src={review.user.img}
          alt="User avatar Darlene Robertson"
          className={styles.review__img}
        />
      ) : (
        <img
          src={PersonImage}
          alt="User avatar Darlene Robertson"
          className={styles.review__img}
        />
      )}

      <div className={styles.review__userInfo}>
        <p
          className={styles.review__user}
        >{`${review.user.firstName} ${review.user.lastName}`}</p>

        <div className={styles.review__userRate}>
          <time
            className={styles.review__rateDate}
            dateTime={timeAgo(review.createdAt)}
          >
            {timeAgo(review.createdAt)}
          </time>
        </div>
      </div>
    </header>
  );
};
