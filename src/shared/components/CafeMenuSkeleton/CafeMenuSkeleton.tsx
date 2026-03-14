import { CardMenuSkeleton } from '../CardMenuSkeleton';
import styles from './CafeMenuSkeleton.module.scss';

export const CafeMenuSkeleton = () => {
  return (
    <section className={styles.cardContainer}>
      <div className={styles.cardContainer__wrapper}>
        <div>
          <h4 className={styles.cardContainer__title}></h4>
          <p className={styles.cardContainer__info}></p>
        </div>

        <div className={styles.cardContainer__btnWrapper}></div>
      </div>
      <div className={styles.cardContainer__cards}>
        <CardMenuSkeleton />
        <CardMenuSkeleton />
        <CardMenuSkeleton />
        <CardMenuSkeleton />
        <CardMenuSkeleton />
        <CardMenuSkeleton />
      </div>
    </section>
  );
};
