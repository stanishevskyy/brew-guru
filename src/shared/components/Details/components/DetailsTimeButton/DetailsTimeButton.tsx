import React from 'react';

import classNames from 'classnames';

import styles from './DetailsTimeButton.module.scss';
import { IMask, IMaskInput } from 'react-imask';

type Props = {
  time: string;
  setTime: (value: string) => void;
  isTimeOpen: boolean;
  setIsTimeOpen: (value: boolean) => void;
};

export const DetailsTimeButton: React.FC<Props> = ({
  time,
  setTime,
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
        {time || 'Choose your time'}
        <span
          className={classNames(`${styles.times__icon}`, {
            [styles.times__iconActive]: isTimeOpen,
          })}
        ></span>
      </button>

      <div className={styles.times__wrapper}>
        <IMaskInput
          mask="HH:MM"
          definitions={{
            H: /[0-2]/,
            M: /[0-5]/,
          }}
          blocks={{
            HH: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 23,
              maxLength: 2,
            },
            MM: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 59,
              maxLength: 2,
            },
          }}
          placeholder="12:00"
          value={time}
          onAccept={(value: string) => setTime(value)}
          className={classNames(styles.times__input, {
            [styles.times__inputActive]: isTimeOpen,
          })}
          aria-label="Select reservation time"
          aria-expanded={false}
          aria-controls="time-options"
        />
      </div>
    </div>
  );
};
