import styles from './FormSkeleton.module.scss';

export const FormSkeleton = () => {
  return (
    <div className={styles.form}>
      <div className={styles.form__input}></div>
      <div className={styles.form__sortBtnDesktop}></div>
      <div className={styles.form__filterBtn}></div>
      <div className={styles.form__sortBtn}></div>
    </div>
  );
};
