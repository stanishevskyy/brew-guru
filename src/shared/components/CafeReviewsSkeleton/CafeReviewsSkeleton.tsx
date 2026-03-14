import { ReviewSkeleton } from '../ReviewSkeleton';
import styles from './CafeReviewsSkeleton.module.scss';

export const CafeReviewsSkeleton = () => {
  return (
    <section className={styles.reviews}>
      <div className={styles.reviews__container}>
        <div className={styles.reviews__info}>
          <h2 className={styles.reviews__title}>Reviews</h2>
          <p className={styles.reviews__rating}></p>
        </div>

        <article className={styles.reviews__header}>
          <div className={styles.reviews__details}>
            <div className={styles.reviews__avatar}></div>
            <div className={styles.review__wrapper}>
              <p className={styles.reviews__name}></p>

              <div className={styles.reviews__stars}></div>
            </div>
          </div>
          <div className={styles.reviews__form}>
            <div className={styles.reviews__comment}></div>
            <div className={styles.reviews__button}></div>
          </div>
        </article>

        <ul className={styles.reviews__comments}>
          <li className={styles.reviews__downComment}>
            <ReviewSkeleton />
          </li>
        </ul>
      </div>
    </section>
  );
};
