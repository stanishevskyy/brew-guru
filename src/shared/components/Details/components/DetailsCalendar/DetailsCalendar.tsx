import React from 'react';
import classNames from 'classnames';

import styles from './DetailsCalendar.module.scss';

import { Calendar } from '../../../Calendar/Calendar';

type Props = {
  date: string;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (value: boolean) => void;
};

export const DetailsCalendar: React.FC<Props> = ({
  date,
  isCalendarOpen,
  setIsCalendarOpen,
}) => {
  const formattedDate = (date ? new Date(date) : new Date()).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

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
        {formattedDate}
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
        <Calendar setIsCalendarOpen={setIsCalendarOpen} />
      </div>
    </div>
  );
};
