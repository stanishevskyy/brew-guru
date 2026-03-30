import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import styles from './Details.module.scss';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
// eslint-disable-next-line max-len
import {
  setSelectedTable,
  setTime,
} from '../../../store/tableReservationSlice/tableReservationSlice';
// eslint-disable-next-line max-len
import { fetchCafeDetailsThunk } from '../../../store/cafeDetailsSlice/cafeDetailsSlice';

import useMediaQuery from '../../hooks/useMediaQuery';

import { DetailsHeader } from './components/DetailsHeader';
import { DetailsButtons } from './components/DetailsButtons';
import { DetailsSeats } from './components/DetailsSeats';
import { DetailsCalendar } from './components/DetailsCalendar';
import { DetailsTimeButton } from './components/DetailsTimeButton';

import { DetailsType } from '../../types/DetailsType';
import { CafeDetails } from '../../types/cafeDetails/cafeDetails';
import { Booking } from '../../types/reservations/booking';

type Props = {
  cafeId: string | undefined;
  isModifiedDetails: boolean;
  onClose?: (value: React.SetStateAction<DetailsType>) => void;
  reserv?: Booking;
};

export const Details: React.FC<Props> = ({
  cafeId,
  onClose = () => {},
  isModifiedDetails,
  reserv,
}) => {
  const [isSeatsOpen, setIsSeatsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const isMobileOrTablet = useMediaQuery(
    '(min-width: 320px) and (max-width: 1022px)',
  );

  const toMinutes = (chooseTime: string) => {
    const [h, m] = chooseTime.split(':').map(Number);

    return h * 60 + m;
  };

  const getAvailableSlots = (
    currentCafe: CafeDetails,
    currentDate: string,
    currentSeats: number | null,
    currentTime: string,
  ) => {
    if (!currentDate || !currentSeats) {
      return [];
    }

    const tablesForDate = currentCafe?.availableTables?.find(
      el => el.date === currentDate,
    );

    if (!tablesForDate) {
      return [];
    }

    const tablesMatchingSeats = tablesForDate.tables.filter(
      el => el.seats === currentSeats,
    );

    if (tablesMatchingSeats.length === 0) {
      return [];
    }

    const result = tablesMatchingSeats.flatMap(table => {
      const selectedTime = currentTime ? toMinutes(currentTime) : null;

      const slots = table.availableSlots?.filter(slot => {
        if (isMobileOrTablet) {
          return true;
        }

        if (!selectedTime) {
          return true;
        }

        const slotTime = toMinutes(slot.startTime);

        return Math.abs(selectedTime - slotTime) <= 60;
      });

      return slots.map(slot => ({
        date: tablesForDate.date,
        tableId: table.id,
        tableName: table.name,
        seats: table.seats,
        startTime: slot.startTime,
        endTime: slot.endTime,
      }));
    });

    return result;
  };

  const tableReservation = useAppSelector(state => state.tableReservation);
  const cafe = useAppSelector(state => state.cafeDetails.cafe);
  const dispatch = useAppDispatch();
  const availableTimeSlots = getAvailableSlots(
    cafe!,
    tableReservation.date,
    tableReservation.seats,
    tableReservation.time,
  );

  useEffect(() => {
    dispatch(fetchCafeDetailsThunk(+cafeId!));
  }, [cafeId]);

  return (
    <section
      className={classNames(`${styles.details}`, {
        [styles.detailsActive]: isSeatsOpen || isCalendarOpen || isTimeOpen,
        [styles.detailsOnCafePage]: isModifiedDetails,
      })}
      role="region"
      aria-labelledby="details-section-title"
    >
      <div className={styles.details__container}>
        <DetailsHeader
          isModifiedDetails={isModifiedDetails}
          onClose={onClose}
        />

        <form
          className={styles.details__form}
          onSubmit={e => e.preventDefault()}
        >
          <div className={styles.details__wrapper}>
            <DetailsSeats
              seats={tableReservation.seats}
              isSeatsOpen={isSeatsOpen}
              setIsSeatsOpen={setIsSeatsOpen}
            />
            <DetailsCalendar
              date={tableReservation.date}
              isCalendarOpen={isCalendarOpen}
              setIsCalendarOpen={setIsCalendarOpen}
            />
            <DetailsTimeButton
              time={tableReservation.time}
              isTimeOpen={isTimeOpen}
              setIsTimeOpen={setIsTimeOpen}
            />
          </div>

          {/* {((time && !isMobileOrTablet) || isTimeOpen) && (
            <div className={styles.details__times}>
              <h3
                id="details-section-title"
                className={styles.details__timesTitle}
              >
                Closest time slots
              </h3>

              <div
                className={styles.details__timesContainer}
                role="list"
                aria-labelledby="details-section-title"
              >
                {availableTimeSlots?.map((timeSlots, index) => (
                  <button
                    key={`${timeSlots.startTime}-${index}`}
                    type="button"
                    className={styles.details__button}
                    aria-label={`${timeSlots.startTime}, Table №${timeSlots.tableId}`}
                    onClick={() => {
                      setTime(timeSlots.startTime);
                      setIsTimeOpen(false);
                    }}
                  >
                    {timeSlots.startTime}
                    <span className={styles.details__buttonSpec}>
                      {`Table №${timeSlots.tableId}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {((tableReservation.time && !isMobileOrTablet) || isTimeOpen) && (
            <div className={styles.details__times}>
              <h3
                id="details-section-title"
                className={styles.details__timesTitle}
              >
                Closest time slots
              </h3>

              <div
                className={styles.details__timesContainer}
                role="list"
                aria-labelledby="details-section-title"
              >
                {availableTimeSlots?.map((timeSlots, index) => (
                  <button
                    key={`${timeSlots.startTime}-${index}`}
                    type="button"
                    className={classNames(styles.details__button, {
                      [styles.details__buttonActive]:
                        tableReservation.selectedTable?.startTime ===
                        timeSlots.startTime,
                    })}
                    aria-label={`${timeSlots.startTime}, Table №${timeSlots.tableId}`}
                    onClick={() => {
                      dispatch(setTime(timeSlots.startTime));
                      dispatch(setSelectedTable(timeSlots));
                      setIsTimeOpen(false);
                    }}
                  >
                    {timeSlots.startTime}
                    <span className={styles.details__buttonSpec}>
                      {`Table №${timeSlots.tableId}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <hr className={styles.details__line} />

          <DetailsButtons
            isModifiedDetails={isModifiedDetails}
            reserv={reserv!}
            tableReservation={tableReservation}
          />
        </form>
      </div>
    </section>
  );
};
