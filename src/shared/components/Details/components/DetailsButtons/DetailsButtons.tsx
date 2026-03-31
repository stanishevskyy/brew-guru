import React from 'react';
import styles from './DetailsButtons.module.scss';
import { Booking } from '../../../../types/reservations/booking';
// eslint-disable-next-line max-len
import {
  ReservationState,
  resetReservation,
} from '../../../../../store/tableReservationSlice/tableReservationSlice';
import { Reservation } from '../../../../types/reservations/reservation';
import { useAppDispatch } from '../../../../../store/hooks';
// eslint-disable-next-line max-len
import { updateUserReservationThunk } from '../../../../../store/userReservationsSlice/userReservationsSlice';
// eslint-disable-next-line max-len
import { updateCafeDetailsThunk } from '../../../../../store/cafeDetailsSlice/cafeDetailsSlice';
import { clearOrder } from '../../../../../store/menuOrderSlice/menuOrderSlice';

import { DetailsType } from '../../../../types/DetailsType';

type Props = {
  isModifiedDetails: boolean;
  reserv: Booking;
  tableReservation: ReservationState;
  onClose?: (value: React.SetStateAction<DetailsType>) => void;
};

export const DetailsButtons: React.FC<Props> = ({
  isModifiedDetails,
  reserv,
  tableReservation,
  onClose = () => {},
}) => {
  const dispatch = useAppDispatch();

  const handleChange = async () => {
    const selected = tableReservation.selectedTable;

    if (
      !selected ||
      !selected.date ||
      !selected.startTime ||
      !selected.endTime ||
      !selected.tableId ||
      !selected.seats
    ) {
      throw new Error('Missing reservation data');
    }

    const reservation: Reservation = {
      id: reserv.id,
      date: selected.date,
      startTime: selected.startTime,
      endTime: selected.endTime,
      guestsCount: selected.seats,
      tableNumber: selected.tableId,
      status: 'confirmed',
    };

    // 6. API CALL
    try {
      onClose(null);

      await dispatch(updateUserReservationThunk(reservation));

      await dispatch(
        updateCafeDetailsThunk({
          cafeId: reserv.cafe.id,

          // NEW
          newDate: selected.date,
          newTableId: selected.tableId,
          newStartTime: selected.startTime,

          // OLD
          oldDate: reserv.reservation.date,
          oldTableId: reserv.reservation.tableNumber,
          oldStartTime: reserv.reservation.startTime,
          oldEndTime: reserv.reservation.endTime,
        }),
      );

      dispatch(resetReservation());
      dispatch(clearOrder());
    } finally {
    }
  };

  return (
    <>
      {!isModifiedDetails && (
        <div className={styles.buttons} role="group" aria-label="Form actions">
          <button
            type="button"
            className={styles.buttons__apply}
            onClick={handleChange}
          >
            Apply
          </button>
          <button
            type="button"
            className={styles.buttons__cancel}
            onClick={() => onClose(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};
