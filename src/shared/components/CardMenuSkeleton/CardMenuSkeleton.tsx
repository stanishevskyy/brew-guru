import styles from './CardMenuSkeleton.module.scss';

export const CardMenuSkeleton = () => {
  return (
    <article className={styles.menu}>
      <div className={styles.card__image}></div>

      <p className={styles.menu__dish}></p>
    </article>
  );
};
