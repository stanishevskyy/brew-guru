import { IMaskInput } from 'react-imask';

import styles from './UserProfile.module.scss';

//eslint-disable-next-line
import ArrowDown from '../../../../assets/icons/form-icons-validation/arrow-down.svg';
import { useEffect, useState } from 'react';

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

export const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <>
      <form className={styles.user}>
        <fieldset className={styles.user__fieldset}>
          <p className={styles.user__legend}>Your data</p>

          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="firstName">
              First name
            </label>
            {isLoading ? (
              <div className={styles.user__inputSkeleton}></div>
            ) : (
              <input
                type="text"
                id="firstName"
                className={styles.user__input}
                defaultValue="Wade"
              />
            )}
          </div>

          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="lastName">
              Last name
            </label>
            {isLoading ? (
              <div className={styles.user__inputSkeleton}></div>
            ) : (
              <input
                type="text"
                id="lastName"
                className={styles.user__input}
                defaultValue="Warren"
              />
            )}
          </div>

          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="phone">
              Phone number
            </label>
            <div className={styles.user__phone}>
              {isLoading ? (
                <div className={styles.user__inputSkeletonSpec}></div>
              ) : (
                <IMaskInput
                  mask="+{38} 000 000 00 00"
                  unmask={true}
                  lazy={true} // без ___
                  id="phone"
                  className={styles.user__input}
                  placeholder="+38"
                  // onAccept={value => console.log(value)}
                  aria-label="Phone number"
                />
              )}
              <button
                type="button"
                className={styles.user__changeBtn}
                aria-label="Change phone number"
              >
                Change number
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.user__fieldset}>
          <p className={styles.user__legend}>Account details</p>

          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="email">
              E-mail
            </label>
            <div className={styles.user__phone}>
              {isLoading ? (
                <div className={styles.user__inputSkeletonSpec}></div>
              ) : (
                <input
                  type="email"
                  id="email"
                  className={styles.user__input}
                  defaultValue="Name@example.com"
                />
              )}
              <button
                type="button"
                className={styles.user__changeBtn}
                aria-label="Change e-mail"
              >
                Change e-mail
              </button>
            </div>
          </div>

          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="password">
              Password
            </label>
            <div className={styles.user__phone}>
              {isLoading ? (
                <div className={styles.user__inputSkeletonSpec}></div>
              ) : (
                <input
                  type="password"
                  id="password"
                  className={styles.user__input}
                  defaultValue="********"
                />
              )}
              <button
                type="button"
                className={styles.user__changeBtn}
                aria-label="Change password"
              >
                Change password
              </button>
            </div>
          </div>
          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="country">
              Country/region
            </label>

            {isLoading ? (
              <div className={styles.user__inputSkeleton}></div>
            ) : (
              <div className={styles.user__wrapper}>
                <button
                  type="button"
                  id="country"
                  role="combobox"
                  aria-controls="country-listbox"
                  aria-haspopup="listbox"
                  className={styles.user__countryBtn}
                >
                  {'Country'}
                  <img src={ArrowDown} alt="" aria-hidden="true" />
                </button>

                {false && (
                  <ul
                    id="country-listbox"
                    role="listbox"
                    className={styles.user__list}
                  >
                    {countries.map(country => (
                      <li
                        key={country}
                        role="option"
                        tabIndex={0}
                        className={styles.user__item}
                      >
                        {country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </fieldset>
      </form>

      <div className={styles.user__bottom}>
        <div className={styles.user__twoFactor}>
          <div className={styles.user__twoFactorText}>
            <p className={styles.user__twoFactorTitle}>
              Two-factor authentication
            </p>
            <p className={styles.user__twoFactorDescription}>
              Add an extra layer of security to your account by requiring a
              verification code in addition to your password
            </p>
          </div>

          <label className={styles.user__switch}>
            <input
              type="checkbox"
              className={styles.user__checkbox}
              aria-checked="false"
            />
            <span
              className={`${styles.user__slider} ${styles.user__round}`}
            ></span>
          </label>
        </div>

        <button className={styles.user__saveBtn}>Save changes</button>
      </div>
    </>
  );
};
