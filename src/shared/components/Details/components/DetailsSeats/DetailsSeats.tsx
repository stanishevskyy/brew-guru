/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';

import classNames from 'classnames';

import { useAppDispatch } from '../../../../../store/hooks';
import { setSeats } from '../../../../../store/tableReservationSlice/tableReservationSlice';

import styles from './DetailsSeats.module.scss';

type Props = {
  seats: number;
  isSeatsOpen: boolean;
  setIsSeatsOpen: (value: boolean) => void;
};

export const DetailsSeats: React.FC<Props> = ({
  seats,
  isSeatsOpen,
  setIsSeatsOpen,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsSeatsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.seats} ref={wrapperRef}>
      <p className={styles.seats__title} id="seats-label">
        Seats amount
      </p>

      <button
        type="button"
        className={classNames(`${styles.seats__button}`, {
          [styles.seats__buttonActive]: isSeatsOpen,
        })}
        onClick={() => setIsSeatsOpen(!isSeatsOpen)}
        aria-label="Select number of seats"
        aria-expanded={isSeatsOpen}
        aria-controls="seats-options"
      >
        {`${seats} seat`}
        <span
          className={classNames(`${styles.seats__icon}`, {
            [styles.seats__iconActive]: isSeatsOpen,
          })}
        ></span>
      </button>

      <div
        id="seats-options"
        className={classNames(`${styles.seats__radios}`, {
          [styles.seats__radiosActive]: isSeatsOpen,
        })}
        role="radiogroup"
        aria-labelledby="seats-label"
      >
        {['1 seat', '2 seat', '3 seat'].map(seat => {
          const seatNumber = parseInt(seat);

          return (
            <label key={seat} className={styles.seats__label}>
              <input
                type="radio"
                name="seats"
                checked={seats === seatNumber}
                className={styles.seats__radio}
                value={seat}
                onChange={() => {
                  dispatch(setSeats(seatNumber));
                  setIsSeatsOpen(false);
                }}
              />
              {seat}
            </label>
          );
        })}
      </div>
    </div>
  );
};
