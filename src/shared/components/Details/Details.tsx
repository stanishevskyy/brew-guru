import React, { useState } from 'react';

import styles from './Details.module.scss';

import classNames from 'classnames';
import { DetailsHeader } from './components/DetailsHeader';
import { DetailsButtons } from './components/DetailsButtons';
import { DetailsSeats } from './components/DetailsSeats';
import { DetailsCalendar } from './components/DetailsCalendar';
import { DetailsTimeButton } from './components/DetailsTimeButton';

import { DetailsType } from '../../types/DetailsType';

type Props = {
  isModifiedDetails: boolean;
  onClose?: (value: React.SetStateAction<DetailsType>) => void;
};

export const Details: React.FC<Props> = ({
  onClose = () => {},
  isModifiedDetails,
}) => {
  const [isSeatsOpen, setIsSeatsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

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
              isSeatsOpen={isSeatsOpen}
              setIsSeatsOpen={setIsSeatsOpen}
            />
            <DetailsCalendar
              isCalendarOpen={isCalendarOpen}
              setIsCalendarOpen={setIsCalendarOpen}
            />
            <DetailsTimeButton
              isTimeOpen={isTimeOpen}
              setIsTimeOpen={setIsTimeOpen}
            />
          </div>

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
              {['1 seat', '2 seat', '3 seat', '4 seat', '1', '2', '3'].map(
                seats => (
                  <button
                    key={seats}
                    type="button"
                    className={styles.details__button}
                    aria-label={`11:45, Table №11, ${seats}`}
                  >
                    11:45{' '}
                    <span className={styles.details__buttonSpec}>
                      Table №11
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>

          <DetailsButtons isModifiedDetails={isModifiedDetails} />
        </form>
      </div>
    </section>
  );
};
