import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './CreateUser.module.scss';

//eslint-disable-next-line
import ArrowDown from '../../../assets/icons/form-icons-validation/arrow-down.svg';
import ErrorIcon from '../../../assets/icons/form-icons-validation/error.svg';

import { UserInfo } from '../../../shared/types/UserInfo';

const countries = [
  'Ukraine',
  'Poland',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'United Kingdom',
  'United States',
];

export const CreateUser = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({ mode: 'onSubmit' });

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const onSubmit = (data: UserInfo) => {};

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          initial={{ y: 60, scale: 0.96 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 60, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <section
            className={styles.create}
            aria-labelledby="create-user-title"
          >
            <h2 id="create-user-title" className={styles.create__title}>
              Enter your information
            </h2>

            <form
              className={styles.create__form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Full Name */}
              <fieldset className={styles.create__fullName}>
                <div className={styles.create__field}>
                  <label htmlFor="firstName" className={styles.create__label}>
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Dianne"
                    autoComplete="given-name"
                    className={classNames(styles.create__input, {
                      [styles.create__inputError]: errors.firstName,
                    })}
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                  />
                  {errors.firstName && (
                    <p className={styles.create__errorMessage}>
                      <img
                        src={ErrorIcon}
                        alt="Іконка помилки"
                        className={styles.create__errorIcon}
                      />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className={styles.create__field}>
                  <label htmlFor="lastName" className={styles.create__label}>
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Russell"
                    autoComplete="family-name"
                    className={classNames(styles.create__input, {
                      [styles.create__inputError]: errors.lastName,
                    })}
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                  />
                  {errors.lastName && (
                    <p className={styles.create__errorMessage}>
                      <img
                        src={ErrorIcon}
                        alt="Іконка помилки"
                        className={styles.create__errorIcon}
                      />
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </fieldset>

              {/* Country */}
              <Controller
                name="country"
                control={control}
                defaultValue="Ukraine"
                rules={{ required: 'Country is required' }}
                render={({ field }) => (
                  <div className={styles.create__countryWrapper}>
                    <p className={styles.create__label}>Country/region</p>
                    <div className={styles.create__wrapper}>
                      <button
                        type="button"
                        role="combobox"
                        aria-expanded={isCountryOpen}
                        aria-controls="country-listbox"
                        aria-haspopup="listbox"
                        className={styles.create__btn}
                        onClick={() => setIsCountryOpen(prev => !prev)}
                      >
                        {field.value ?? 'Country'}
                        <img src={ArrowDown} alt="" aria-hidden="true" />
                      </button>

                      {isCountryOpen && (
                        <ul
                          id="country-listbox"
                          role="listbox"
                          className={styles.create__list}
                        >
                          {countries.map(country => (
                            <li
                              key={country}
                              role="option"
                              aria-selected={field.value === country}
                              tabIndex={0}
                              onClick={() => {
                                field.onChange(country);
                                setIsCountryOpen(false);
                              }}
                              onKeyDown={e => {
                                if (e.key === 'Enter') {
                                  field.onChange(country);
                                  setIsCountryOpen(false);
                                }
                              }}
                              className={styles.create__item}
                            >
                              {country}
                            </li>
                          ))}
                        </ul>
                      )}

                      {errors.country && (
                        <p className={styles.create__errorMessage}>
                          <img
                            src={ErrorIcon}
                            alt="Іконка помилки"
                            className={styles.create__errorIcon}
                          />
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              />

              {/* Date of Birth */}
              <fieldset className={styles.create__dates}>
                <legend className={styles.create__label}>Date of birth</legend>
                <div className={styles.create__dateRow}>
                  {/* Day */}
                  <Controller
                    name="day"
                    control={control}
                    rules={{ required: 'Day is required' }}
                    defaultValue={null}
                    render={({ field }) => (
                      <div className={styles.create__wrapper}>
                        <button
                          type="button"
                          role="combobox"
                          aria-expanded={isDayOpen}
                          aria-controls="day-listbox"
                          aria-haspopup="listbox"
                          className={styles.create__btn}
                          onClick={() => setIsDayOpen(prev => !prev)}
                        >
                          {field.value ?? 'Day'}
                          <img src={ArrowDown} alt="" aria-hidden="true" />
                        </button>

                        {isDayOpen && (
                          <ul
                            id="day-listbox"
                            role="listbox"
                            className={styles.create__list}
                          >
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(
                              day => (
                                <li
                                  key={day}
                                  role="option"
                                  aria-selected={field.value === day.toString()}
                                  tabIndex={0}
                                  onClick={() => {
                                    field.onChange(day);
                                    setIsDayOpen(false);
                                  }}
                                  onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                      field.onChange(day);
                                      setIsDayOpen(false);
                                    }
                                  }}
                                  className={styles.create__item}
                                >
                                  {day}
                                </li>
                              ),
                            )}
                          </ul>
                        )}

                        {errors.day && (
                          <p className={styles.create__errorMessage}>
                            <img
                              src={ErrorIcon}
                              alt="Іконка помилки"
                              className={styles.create__errorIcon}
                            />
                            {errors.day.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  {/* Month */}
                  <Controller
                    name="month"
                    control={control}
                    rules={{ required: 'Month is required' }}
                    defaultValue={null}
                    render={({ field }) => (
                      <div className={styles.create__wrapper}>
                        <button
                          type="button"
                          role="combobox"
                          aria-expanded={isMonthOpen}
                          aria-controls="month-listbox"
                          aria-haspopup="listbox"
                          className={styles.create__btn}
                          onClick={() => setIsMonthOpen(prev => !prev)}
                        >
                          {field.value ?? 'Month'}
                          <img src={ArrowDown} alt="" aria-hidden="true" />
                        </button>

                        {isMonthOpen && (
                          <ul
                            id="month-listbox"
                            role="listbox"
                            className={styles.create__list}
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                              month => (
                                <li
                                  key={month}
                                  role="option"
                                  aria-selected={
                                    field.value === month.toString()
                                  }
                                  tabIndex={0}
                                  onClick={() => {
                                    field.onChange(month);
                                    setIsMonthOpen(false);
                                  }}
                                  onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                      field.onChange(month);
                                      setIsMonthOpen(false);
                                    }
                                  }}
                                  className={styles.create__item}
                                >
                                  {month}
                                </li>
                              ),
                            )}
                          </ul>
                        )}

                        {errors.month && (
                          <p className={styles.create__errorMessage}>
                            <img
                              src={ErrorIcon}
                              alt="Іконка помилки"
                              className={styles.create__errorIcon}
                            />
                            {errors.month.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  {/* Year */}
                  <Controller
                    name="year"
                    control={control}
                    rules={{ required: 'Year is required' }}
                    defaultValue={null}
                    render={({ field }) => (
                      <div className={styles.create__wrapper}>
                        <button
                          type="button"
                          role="combobox"
                          aria-expanded={isYearOpen}
                          aria-controls="year-listbox"
                          aria-haspopup="listbox"
                          className={styles.create__btn}
                          onClick={() => setIsYearOpen(prev => !prev)}
                        >
                          {field.value ?? 'Year'}
                          <img src={ArrowDown} alt="" aria-hidden="true" />
                        </button>

                        {isYearOpen && (
                          <ul
                            id="year-listbox"
                            role="listbox"
                            className={styles.create__list}
                          >
                            {Array.from({ length: 100 }, (_, i) => {
                              const year = currentYear - i;

                              return (
                                <li
                                  key={year}
                                  role="option"
                                  aria-selected={
                                    field.value === year.toString()
                                  }
                                  tabIndex={0}
                                  onClick={() => {
                                    field.onChange(year);
                                    setIsYearOpen(false);
                                  }}
                                  onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                      field.onChange(year);
                                      setIsYearOpen(false);
                                    }
                                  }}
                                  className={styles.create__item}
                                >
                                  {year}
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {errors.year && (
                          <p className={styles.create__errorMessage}>
                            <img
                              src={ErrorIcon}
                              alt="Іконка помилки"
                              className={styles.create__errorIcon}
                            />
                            {errors.year.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </fieldset>

              {/* Buttons */}
              <fieldset className={styles.create__buttons}>
                <button
                  type="button"
                  className={styles.create__buttonSecondary}
                >
                  Back
                </button>
                <button className={styles.create__buttonPrimary} type="submit">
                  Continue
                </button>
              </fieldset>
            </form>

            <div
              className={styles.create__bottom}
              aria-describedby="login-help"
            >
              <p id="login-help" className={styles.create__isAccount}>
                You may already have an account?
              </p>

              <Link to="/auth/login" className={styles.create__signIn}>
                Log in
              </Link>
            </div>
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
