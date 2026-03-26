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
import useMediaQuery from '../../hooks/useMediaQuery';

type Props = {
  cafe: CafeDetails | null;
  isModifiedDetails: boolean;
  onClose?: (value: React.SetStateAction<DetailsType>) => void;
};

export const Details: React.FC<Props> = ({
  cafe,
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

  const isMobileOrTablet = useMediaQuery(
    '(min-width: 320px) and (max-width: 1022px)',
  );

  // const [filteredTables, setFilteredTables] = useState<any>(null);

  // const tablesFromDate =
  //   seats && date ? cafe?.availableTables?.find(el => el.date === date) : null;

  // const filteringTables = (value: string) => {
  //   if (!tablesFromDate) {
  //     return;
  //   }

  //   const p = toMinutes(value);

  //   const result = tablesFromDate.tables.map(table => ({
  //     ...table,
  //     availableSlots: table.availableSlots.filter(slot => {
  //       const start = toMinutes(slot.startTime);

  //       return Math.abs(p - start) <= 60; // 60 хв
  //     }),
  //   }));

  //   setFilteredTables(result);
  // };

  // useEffect(() => {
  //   if (time.length === 5) {
  //     filteringTables(time);
  //   }
  // }, [time]);

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

    // 1️⃣ Фільтруємо по даті
    const tablesForDate = currentCafe?.availableTables?.find(
      el => el.date === currentDate,
    );

    if (!tablesForDate) {
      return [];
    }

    // 2️⃣ Фільтруємо по кількості місць
    const tablesMatchingSeats = tablesForDate.tables.filter(
      el => el.seats === currentSeats,
    );

    if (tablesMatchingSeats.length === 0) {
      return [];
    }

    // 3️⃣ Фільтруємо слоти по часу та доступності
    const result = tablesMatchingSeats.flatMap(table => {
      const selectedTime = currentTime ? toMinutes(currentTime) : null;

      const slots = table.availableSlots?.filter(slot => {
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

  const availableTimeSlots = getAvailableSlots(cafe!, date, seats, time);

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

          {((time && !isMobileOrTablet) || isTimeOpen) && (
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
                    onClick={() => setTime(timeSlots.startTime)}
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

          <DetailsButtons isModifiedDetails={isModifiedDetails} />
        </form>
      </div>
    </section>
  );
};
