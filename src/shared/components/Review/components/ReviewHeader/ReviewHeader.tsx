import React from 'react';

import styles from './ReviewHeader.module.scss';

import { timeAgo } from '../../../../utils/timeAgo';

//eslint-disable-next-line
import PersonImage from '../../../../../assets/images/profile-images/avatar-mobile.png';
import { Review } from '../../../../types/reviews/review.type';

type Props = {
  review: Review;
};

export const ReviewHeader: React.FC<Props> = ({ review }) => {
  const preparedRating = review.rating
    ? Number.isInteger(review.rating)
      ? `${review.rating}.0`
      : review.rating.toString()
    : '';

  return (
    <header className={styles.review}>
      {review.user.img ? (
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
          {review.rating && (
            <p className={styles.review__rate}>
              <span className={styles.review__icon} aria-hidden="true"></span>
              {preparedRating}
            </p>
          )}

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
