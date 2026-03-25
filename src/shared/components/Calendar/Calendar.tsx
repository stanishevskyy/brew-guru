import React, { useEffect, useState } from 'react';

import styles from './Calendar.module.scss';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

import ArroLeft from '../../../assets/icons/calendar-icons/arrow-left.svg';
import ArroRigth from '../../../assets/icons/calendar-icons/arrow-right.svg';

type Props = {
  setDate: (value: string) => void;
  setIsCalendarOpen: (value: boolean) => void;
};

export const Calendar: React.FC<Props> = ({ setDate, setIsCalendarOpen }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  // Перший день місяця (0 = Sunday)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Переводимо 0 (Sun) -> 6, 1 (Mon) -> 0, … щоб почати з понеділка
  const firstDayIndex = (firstDayOfMonth + 6) % 7;

  // Назви днів динамічно зміщуємо
  const shiftedWeekdays = [
    ...WEEKDAYS.slice(firstDayIndex),
    ...WEEKDAYS.slice(0, firstDayIndex),
  ];

  // Дні поточного місяця
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarCells: { day: number; type?: string }[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({ day: d });
  }

  // Дні наступного місяця, щоб заповнити останній рядок
  const totalCells = Math.ceil(calendarCells.length / 7) * 7;
  const nextMonthDays = totalCells - calendarCells.length;

  for (let d = 1; d <= nextMonthDays; d++) {
    calendarCells.push({ day: d, type: 'next' });
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  useEffect(() => {
    // Формуємо дату у форматі YYYY-MM-DD
    const formattedMonth = String(month + 1).padStart(2, '0'); // місяць 01-12
    const formattedDay = String(today.getDate()).padStart(2, '0'); // день 01-31

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    // setDate(formattedDate); // зберігаємо у батьківський state
    setDate(formattedDate);
  }, []);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__header}>
        <button onClick={prevMonth} className={styles.calendar__navBtn}>
          <img src={ArroLeft} alt="" className={styles.calendar__btnImg} />
        </button>
        <span className={styles.calendar__title}>
          {currentDate.toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button onClick={nextMonth} className={styles.calendar__navBtn}>
          <img src={ArroRigth} alt="" className={styles.calendar__btnImg} />
        </button>
      </div>

      {/* Weekdays */}
      <div className={styles.calendar__weekdays}>
        {shiftedWeekdays.map(day => (
          <div key={day} className={styles.calendar__weekdayCell}>
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className={styles.calendar__daysGrid}>
        {calendarCells.map((cell, idx) => {
          const isToday =
            cell.day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          const isSelected = cell.day === selectedDay;

          const isNextMonth = cell.type === 'next';

          return (
            <div
              key={idx}
              className={`
          ${styles.calendar__dayCell}
          ${isToday ? styles.calendar__today : ''}
          ${isSelected ? styles.calendar__selected : ''}
          ${isNextMonth ? styles.calendar__inactive : ''}
        `}
              onClick={() => {
                if (!isNextMonth) {
                  setSelectedDay(cell.day);

                  // Формуємо дату у форматі YYYY-MM-DD
                  const formattedMonth = String(month + 1).padStart(2, '0'); // місяць 01-12
                  const formattedDay = String(cell.day).padStart(2, '0'); // день 01-31

                  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

                  // setDate(formattedDate); // зберігаємо у батьківський state

                  setDate(formattedDate);
                  setIsCalendarOpen(false);
                }
              }}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
};
