import { useEffect, useState } from 'react';

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import styles from './Reviews.module.scss';

import ArrowIcon from '../../../../assets/icons/reviews-icons/arrow-down.svg';
import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import { getClassLink } from '../../../../shared/utils/getActiveClass';
import { RatingSkeleton } from '../../../../shared/components/RatingSkeleton';

export const Reviews = () => {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <section className={styles.reviews}>
      <div className={styles.reviews__header}>
        <button
          className={classNames(`${styles.reviews__button}`, {
            [styles.reviews__buttonActive]: isRatingOpen,
          })}
          onClick={() => setIsRatingOpen(prev => !prev)}
        >
          Rating
          <img
            src={ArrowIcon}
            alt=""
            className={classNames(`${styles.reviews__buttonIcon}`, {
              [styles.reviews__buttonIconActive]: isRatingOpen,
            })}
          />
        </button>

        {isLoading ? (
          <RatingSkeleton />
        ) : (
          <div
            className={classNames(`${styles.reviews__summary}`, {
              [styles.reviews__summaryActive]: isRatingOpen,
            })}
          >
            <p className={styles.reviews__title}>Rating</p>
            <div className={styles.reviews__rating}>
              <div className={styles.reviews__wrapper}>
                <p className={styles.reviews__score}>
                  92%
                  <span className={styles.reviews__count}>(23 Reviews)</span>
                </p>

                <Rating
                  name="cafe-rating-dianne"
                  value={5}
                  precision={0.5}
                  readOnly
                  icon={<StarIcon fontSize="inherit" />}
                  emptyIcon={<StarIcon fontSize="inherit" />}
                  size="medium"
                  getLabelText={(v: number) => `${v} зірок`}
                  sx={{
                    color: '#FFCA00',
                    '& .MuiRating-iconEmpty': { color: '#BBBBC9' },
                  }}
                />
              </div>
              <div className={styles.reviews__divider}></div>
            </div>
            <div className={styles.reviews__rating}>
              <div className={styles.reviews__wrapper}>
                <p className={styles.reviews__score}>
                  92%
                  <span className={styles.reviews__count}>(23 Reviews)</span>
                </p>

                <Rating
                  name="cafe-rating-dianne"
                  value={4}
                  precision={0.5}
                  readOnly
                  icon={<StarIcon fontSize="inherit" />}
                  emptyIcon={<StarIcon fontSize="inherit" />}
                  size="medium"
                  getLabelText={(v: number) => `${v} зірок`}
                  sx={{
                    color: '#FFCA00',
                    '& .MuiRating-iconEmpty': { color: '#BBBBC9' },
                  }}
                />
              </div>
              <div className={styles.reviews__divider}></div>
            </div>
            <div className={styles.reviews__rating}>
              <div className={styles.reviews__wrapper}>
                <p className={styles.reviews__score}>
                  92%
                  <span className={styles.reviews__count}>(23 Reviews)</span>
                </p>

                <Rating
                  name="cafe-rating-dianne"
                  value={3}
                  precision={0.5}
                  readOnly
                  icon={<StarIcon fontSize="inherit" />}
                  emptyIcon={<StarIcon fontSize="inherit" />}
                  size="medium"
                  getLabelText={(v: number) => `${v} зірок`}
                  sx={{
                    color: '#FFCA00',
                    '& .MuiRating-iconEmpty': { color: '#BBBBC9' },
                  }}
                />
              </div>
              <div className={styles.reviews__divider}></div>
            </div>
            <div className={styles.reviews__rating}>
              <div className={styles.reviews__wrapper}>
                <p className={styles.reviews__score}>
                  92%
                  <span className={styles.reviews__count}>(23 Reviews)</span>
                </p>

                <Rating
                  name="cafe-rating-dianne"
                  value={2}
                  precision={0.5}
                  readOnly
                  icon={<StarIcon fontSize="inherit" />}
                  emptyIcon={<StarIcon fontSize="inherit" />}
                  size="medium"
                  getLabelText={(v: number) => `${v} зірок`}
                  sx={{
                    color: '#FFCA00',
                    '& .MuiRating-iconEmpty': { color: '#BBBBC9' },
                  }}
                />
              </div>
              <div className={styles.reviews__divider}></div>
            </div>
            <div className={styles.reviews__rating}>
              <div className={styles.reviews__wrapper}>
                <p className={styles.reviews__score}>
                  92%
                  <span className={styles.reviews__count}>(23 Reviews)</span>
                </p>

                <Rating
                  name="cafe-rating-dianne"
                  value={1}
                  precision={0.5}
                  readOnly
                  icon={<StarIcon fontSize="inherit" />}
                  emptyIcon={<StarIcon fontSize="inherit" />}
                  size="medium"
                  getLabelText={(v: number) => `${v} зірок`}
                  sx={{
                    color: '#FFCA00',
                    '& .MuiRating-iconEmpty': { color: '#BBBBC9' },
                  }}
                />
              </div>
              <div className={styles.reviews__divider}></div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.reviews__reviewsWrapper}>
        <nav className={styles.reviews__nav}>
          <ul className={styles.reviews__list}>
            <li className={styles.reviews__item}>
              <NavLink
                to="/profile/reviews"
                end
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.reviews__link,
                    activeClass: styles.reviews__linkActive,
                  })
                }
              >
                My reviews
              </NavLink>
            </li>
            <li className={styles.reviews__item}>
              <NavLink
                to="/profile/reviews/answer"
                end
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.reviews__link,
                    activeClass: styles.reviews__linkActive,
                  })
                }
              >
                Answer
              </NavLink>
            </li>
            <li className={styles.reviews__item}>
              <NavLink
                to="/profile/reviews/reports"
                end
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.reviews__link,
                    activeClass: styles.reviews__linkActive,
                  })
                }
              >
                Reports
              </NavLink>
            </li>
          </ul>
        </nav>

        <Outlet />
      </div>
    </section>
  );
};
