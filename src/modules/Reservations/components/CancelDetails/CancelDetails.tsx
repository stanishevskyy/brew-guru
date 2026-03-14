import React, { useEffect } from 'react';
import styles from './CancelDetails.module.scss';

import ErrorIcon from '../../../../assets/icons/cancel-icons/error-icon.svg';
import { DetailsType } from '../../../../shared/types/DetailsType';

type Props = {
  onClose: (value: React.SetStateAction<DetailsType>) => void;
};

export const CancelDetails: React.FC<Props> = ({ onClose }) => {
  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(null);
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className={styles.cancel}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="cancel-error-title"
      aria-describedby="cancel-error-desc"
    >
      <div className={styles.cancel__container}>
        <div className={styles.cancel__wrapper}>
          <img
            className={styles.cancel__icon}
            src={ErrorIcon}
            alt=""
            aria-hidden="true"
          />
          <p id="cancel-error-title" className={styles.cancel__errorMessage}>
            Reservation Cancelled
          </p>
        </div>

        <p id="cancel-error-desc" className={styles.cancel__text}>
          Due to a sudden staff shortage, your reservation has been canceled.
        </p>

        <button
          type="button"
          className={styles.cancel__btnConfirm}
          aria-label="Close cancellation message"
          onClick={() => onClose(null)}
        >
          OK
        </button>
      </div>
    </div>
  );
};
