import React from 'react';
import classNames from 'classnames';

import styles from './DetailsCalendar.module.scss';

import Calendar from '../../../Calendar/Calendar';

type Props = {
  isCalendarOpen: boolean;
  setIsCalendarOpen: (value: boolean) => void;
};

export const DetailsCalendar: React.FC<Props> = ({
  isCalendarOpen,
  setIsCalendarOpen,
}) => {
  return (
    <div className={styles.calendar}>
      <p className={styles.calendar__title}>Date</p>

      <button
        type="button"
        className={classNames(`${styles.calendar__button}`, {
          [styles.calendar__buttonActive]: isCalendarOpen,
        })}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        aria-label="Open calendar"
        aria-expanded={isCalendarOpen}
        aria-controls="calendar-panel"
      >
        January, 13, 2026
        <span
          className={classNames(`${styles.calendar__icon}`, {
            [styles.calendar__iconActive]: isCalendarOpen,
          })}
        ></span>
      </button>

      <div
        id="calendar-panel"
        className={classNames(`${styles.calendar__container}`, {
          [styles.calendar__containerActive]: isCalendarOpen,
        })}
        role="region"
        aria-labelledby="calendar-label"
      >
        <Calendar />
      </div>
    </div>
  );
};
