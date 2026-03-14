import { useEffect, useState } from 'react';

import classNames from 'classnames';

import styles from './Review.module.scss';

import { useLocation } from 'react-router-dom';

//eslint-disable-next-line
import PersonImage from '../../../assets/images/cafe-images/cafe-reviews-image/Picture.png';
//eslint-disable-next-line
import HeartIcon from '../../../assets/icons/reviews-icons/heart-icon.svg';
//eslint-disable-next-line
import HeartBrokenIcon from '../../../assets/icons/reviews-icons/heart-broken-icon.svg';
//eslint-disable-next-line
import CommentIcon from '../../../assets/icons/reviews-icons/comment-icon.svg';
//eslint-disable-next-line
import DotsIcon from '../../../assets/icons/reviews-icons/dots-icon.svg';
//eslint-disable-next-line
import Arrow from '../../../assets/icons/reviews-icons/arrow-down.svg';
//eslint-disable-next-line
import FlagIcon from '../../../assets/icons/reviews-icons/flag-outline-icon.svg';
import CloseIcon from '../../../assets/icons/reviews-icons/close-icon.svg';

import { ReviewSkeleton } from '../ReviewSkeleton';

export const Review = () => {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [pathname]);

  if (isLoading) {
    return <ReviewSkeleton />;
  }

  return (
    <article className={styles.review}>
      {/* header of review */}
      <header className={styles.review__info}>
        <img
          src={PersonImage}
          alt="User avatar Darlene Robertson"
          className={styles.review__img}
        />

        <div className={styles.review__userInfo}>
          <p className={styles.review__user}>Darlene Robertson</p>

          <div className={styles.review__userRate}>
            <p className={styles.review__rate}>
              <span className={styles.review__icon} aria-hidden="true"></span>
              5.0
            </p>

            <time className={styles.review__rateDate} dateTime="2025-01-24">
              2 weeks ago
            </time>
          </div>
        </div>
      </header>

      {/* review text */}
      <p className={styles.review__comment}>Nice staff and good taste!</p>

      {/* actions */}
      <footer className={styles.review__action}>
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
          256
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
          0
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
          2
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

      {isAnswerOpen && (
        <article className={styles.reviewAsnwer}>
          {/* header of answer */}
          <header className={styles.review__info}>
            <img
              src={PersonImage}
              alt="User avatar Darlene Robertson"
              className={styles.review__img}
            />

            <div className={styles.review__userInfo}>
              <p className={styles.review__user}>Darlene Robertson</p>

              <div className={styles.review__userRate}>
                <time className={styles.review__rateDate} dateTime="2025-01-24">
                  1 week ago
                </time>
              </div>
            </div>
          </header>

          {/* answer text */}
          <p className={styles.review__comment}>
            I agree but when I sat under the air conditioner it was very hot. I
            do not recommend these seats.
          </p>

          {/* actions */}
          <footer className={styles.review__action}>
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
              12
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
              0
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
              2
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
                      <button
                        role="menuitem"
                        className={styles.review__menuItem}
                      >
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
        </article>
      )}

      {false && (
        <form className={styles.reviews__form} aria-label="Додати відгук">
          <input
            type="text"
            name="review"
            className={styles.reviews__comment}
            placeholder="Type here"
            required
          />
          <button className={styles.reviews__cancel}>
            <img src={CloseIcon} alt="" />
          </button>
          <button className={styles.reviews__primary}>Post</button>
          <button className={styles.reviews__secondary}>Cancel</button>
        </form>
      )}

      <button
        type="button"
        aria-label={isAnswerOpen ? 'Hide answer' : 'Show answer'}
        className={styles.review__answer}
        onClick={() => setIsAnswerOpen(!isAnswerOpen)}
      >
        <span>1 answer</span>
        <img
          src={Arrow}
          className={classNames(`${styles.review__answerIcon}`, {
            [styles.review__answerIconActive]: isAnswerOpen,
          })}
          alt=""
          aria-hidden="true"
        />
      </button>
    </article>
  );
};
