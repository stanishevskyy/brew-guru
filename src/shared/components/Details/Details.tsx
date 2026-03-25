import React, { useState } from 'react';

import styles from './Details.module.scss';

import classNames from 'classnames';
import { DetailsHeader } from './components/DetailsHeader';
import { DetailsButtons } from './components/DetailsButtons';
import { DetailsSeats } from './components/DetailsSeats';
import { DetailsCalendar } from './components/DetailsCalendar';
import { DetailsTimeButton } from './components/DetailsTimeButton';

import { DetailsType } from '../../types/DetailsType';
import { CafeDetails } from '../../types/cafeDetails/cafeDetails';

type Props = {
  cafe: CafeDetails | null;
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

  // logic
  const [seats, setSeats] = useState<number>(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

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
              seats={seats}
              setSeats={setSeats}
              isSeatsOpen={isSeatsOpen}
              setIsSeatsOpen={setIsSeatsOpen}
            />
            <DetailsCalendar
              date={date}
              setDate={setDate}
              isCalendarOpen={isCalendarOpen}
              setIsCalendarOpen={setIsCalendarOpen}
            />
            <DetailsTimeButton
              time={time}
              setTime={setTime}
              isTimeOpen={isTimeOpen}
              setIsTimeOpen={setIsTimeOpen}
            />
          </div>

          {isTimeOpen && (
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
                  tablets => (
                    <button
                      key={tablets}
                      type="button"
                      className={styles.details__button}
                      aria-label={`11:45, Table №11, ${tablets}`}
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
          )}

          <hr className={styles.details__line} />

          <DetailsButtons isModifiedDetails={isModifiedDetails} />
        </form>
      </div>
    </section>
  );
};
