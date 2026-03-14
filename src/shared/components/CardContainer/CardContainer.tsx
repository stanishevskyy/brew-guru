import { Link } from 'react-router-dom';

import styles from './CardContainer.module.scss';

import { CardCafe } from '../CardCafe';

import ArrowIcon from '../../../assets/icons/cart-icons/arrow-icon.svg';

export const CardContainer = () => {
  return (
    <section className={styles.cardContainer}>
      <div className={styles.cardContainer__wrapper}>
        <h4 className={styles.cardContainer__title}>Cafes of the week</h4>

        <Link to="/search" className={styles.cardContainer__btnWrapper}>
          <p className={styles.cardContainer__btnInfo}>See all</p>
          <img
            src={ArrowIcon}
            alt="Cafe"
            className={styles.cardContainer__btnInfoImage}
          />
        </Link>
      </div>
      <div className={styles.cardContainer__cards}>
        <CardCafe />
        <CardCafe />
        <CardCafe />
        <CardCafe />
      </div>
    </section>
  );
};
