import styles from './ReviewForm.module.scss';

// eslint-disable-next-line max-len
import CloseIcon from '../../../../../assets/icons/reviews-icons/close-icon.svg';

export const ReviewForm = () => {
  return (
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
  );
};
