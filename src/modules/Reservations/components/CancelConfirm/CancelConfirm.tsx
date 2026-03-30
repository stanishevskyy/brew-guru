import React, { useEffect } from 'react';
import styles from './Cancel.module.scss';

import { useAppDispatch } from '../../../../store/hooks';
// eslint-disable-next-line max-len
import { deleteUserReservationThunk } from '../../../../store/userReservationsSlice/userReservationsSlice';

import DeleteIcon from '../../../../assets/icons/cancel-icons/delete-icon.svg';
import { DetailsType } from '../../../../shared/types/DetailsType';
import { Booking } from '../../../../shared/types/reservations/booking';

type Props = {
  onClose: (value: React.SetStateAction<DetailsType>) => void;
  reserv: Booking;
};

export const CancelConfirm: React.FC<Props> = ({ onClose, reserv }) => {
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

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(deleteUserReservationThunk(reserv.id));
  };

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
            onClick={() => {
              onClose(null);
              handleClick();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
