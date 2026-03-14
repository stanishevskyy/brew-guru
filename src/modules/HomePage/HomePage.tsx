import styles from './HomePage.module.scss';

import { CardContainer } from '../../shared/components/CardContainer';
import { Pagination } from '../../shared/components/Pagination';

export const HomePage = () => {
  return (
    <div className={styles.homePage} role="main">
      <div
        className={styles.homePage__mainImage}
        role="img"
        aria-label="Main banner with 'Find Your Perfect Coffee & Workspace'"
      >
        <h1 className={styles.homePage__title}>
          <span className={styles.homePage__titleFirstPart}>
            Find Your Perfect
          </span>
          <span className={styles.homePage__titleSecondPart}>
            Coffee & Workspace
          </span>
        </h1>
        <p className={styles.homePage__desc}>
          <span>Explore top-rated cafes </span>
          <span>for relaxation, work, or meetings</span>
        </p>
      </div>
      <div className={styles.homePage__container}>
        <CardContainer aria-label="Cafe card 1" />
        <CardContainer aria-label="Cafe card 2" />
        <CardContainer aria-label="Cafe card 3" />

        <nav aria-label="Pagination navigation">
          <Pagination />
        </nav>
      </div>
    </div>
  );
};
