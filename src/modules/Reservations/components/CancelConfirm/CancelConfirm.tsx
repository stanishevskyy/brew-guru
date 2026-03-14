import React, { useEffect } from 'react';
import styles from './Cancel.module.scss';

import DeleteIcon from '../../../../assets/icons/cancel-icons/delete-icon.svg';
import { DetailsType } from '../../../../shared/types/DetailsType';

type Props = {
  onClose: (value: React.SetStateAction<DetailsType>) => void;
};

export const CancelConfirm: React.FC<Props> = ({ onClose }) => {
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
      role="dialog"
      aria-modal="true"
      aria-describedby="cancel-desc"
    >
      <div className={styles.cancel__container}>
        <img
          className={styles.cancel__icon}
          src={DeleteIcon}
          alt=""
          aria-hidden="true"
        />

        <p id="cancel-desc" className={styles.cancel__text}>
          Are you sure you want to cancel this reservation?
        </p>

        <div className={styles.cancel__buttons}>
          <button
            type="button"
            className={styles.cancel__btnCancel}
            aria-label="Keep reservation"
            onClick={() => onClose(null)}
          >
            No
          </button>

          <button
            type="button"
            className={styles.cancel__btnConfirm}
            aria-label="Confirm cancellation"
            onClick={() => onClose(null)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
