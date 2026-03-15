import React from 'react';

import styles from './ReviewHeader.module.scss';

import { timeAgo } from '../../utils/timeAgo';

//eslint-disable-next-line
import PersonImage from '../../../../../assets/images/cafe-images/cafe-reviews-image/Picture.png';

type Props = {
  firstName: string;
  lastName: string;
  rating: number | undefined;
  createdAt: string;
};

export const ReviewHeader: React.FC<Props> = ({
  firstName,
  lastName,
  rating,
  createdAt,
}) => {
  const preparedRating = rating
    ? Number.isInteger(rating)
      ? `${rating}.0`
      : rating.toString()
    : '';

  return (
    <header className={styles.review}>
      <img
        src={PersonImage}
        alt="User avatar Darlene Robertson"
        className={styles.review__img}
      />

      <div className={styles.review__userInfo}>
        <p className={styles.review__user}>{`${firstName} ${lastName}`}</p>

        <div className={styles.review__userRate}>
          <p className={styles.review__rate}>
            <span className={styles.review__icon} aria-hidden="true"></span>
            {preparedRating}
          </p>

          <time
            className={styles.review__rateDate}
            dateTime={timeAgo(createdAt)}
          >
            {timeAgo(createdAt)}
          </time>
        </div>
      </div>
    </header>
  );
};
