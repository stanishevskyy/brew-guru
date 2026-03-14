import styles from './ProfileAccountSkeleton.module.scss';

export const ProfileAccountSkeleton = () => {
  return (
    <article className={styles.profile__accountInfo}>
      <div className={styles.profile__img}></div>

      <div className={styles.profile__acoountWprapper}>
        <p className={styles.profile__accountName}></p>
        <p className={styles.profile__accountEmail}></p>
        <div className={styles.profile__changePhoto}></div>
      </div>
    </article>
  );
};
