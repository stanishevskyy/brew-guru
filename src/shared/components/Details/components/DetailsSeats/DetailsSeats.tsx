import React from 'react';

import classNames from 'classnames';

import styles from './DetailsSeats.module.scss';

type Props = {
  isSeatsOpen: boolean;
  setIsSeatsOpen: (value: boolean) => void;
};

export const DetailsSeats: React.FC<Props> = ({
  isSeatsOpen,
  setIsSeatsOpen,
}) => {
  return (
    <div className={styles.seats}>
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
        1 seat
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
        {['1 seat', '2 seat', '3 seat'].map(seats => (
          <label key={seats} className={styles.seats__label}>
            <input
              type="radio"
              name="seats"
              className={styles.seats__radio}
              value={seats}
            />
            {seats}
          </label>
        ))}
      </div>
    </div>
  );
};
