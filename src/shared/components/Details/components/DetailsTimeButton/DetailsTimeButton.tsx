import React from 'react';

import classNames from 'classnames';

import styles from './DetailsTimeButton.module.scss';

type Props = {
  isTimeOpen: boolean;
  setIsTimeOpen: (value: boolean) => void;
};

export const DetailsTimeButton: React.FC<Props> = ({
  isTimeOpen,
  setIsTimeOpen,
}) => {
  return (
    <div className={styles.times}>
      <p className={styles.times__title} id="time-label">
        Time
      </p>

      <button
        type="button"
        className={classNames(`${styles.times__button}`, {
          [styles.times__buttonActive]: isTimeOpen,
        })}
        onClick={() => setIsTimeOpen(!isTimeOpen)}
        aria-label="Select reservation time"
        aria-expanded={isTimeOpen}
        aria-controls="time-options"
      >
        12:00
        <span
          className={classNames(`${styles.times__icon}`, {
            [styles.times__iconActive]: isTimeOpen,
          })}
        ></span>
      </button>

      <div className={styles.times__wrapper}>
        <input
          type="text"
          defaultValue="12:00"
          className={classNames(styles.times__input, {
            [styles.times__inputActive]: isTimeOpen,
          })}
          aria-label="Select reservation time"
          aria-expanded={isTimeOpen}
          aria-controls="time-options"
        />
      </div>

      {isTimeOpen && (
        <div
          id="time-options"
          className={classNames(`${styles.times__container}`, {
            [styles.times__containerActive]: isTimeOpen,
          })}
          role="list"
          aria-labelledby="time-label"
        >
          {['1 seat', '2 seat', '3 seat', '4 seat'].map(seats => (
            <button
              key={seats}
              type="button"
              className={styles.times__avaibleButton}
              aria-label={`Select time 11:45 for ${seats}`}
              role="listitem"
            >
              11:45 <span className={styles.times__buttonSpec}>Table №11</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
