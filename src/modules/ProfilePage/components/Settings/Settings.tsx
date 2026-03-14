import styles from './Settings.module.scss';

//eslint-disable-next-line
import ArrowDown from '../../../../assets/icons/form-icons-validation/arrow-down.svg';

export const Settings = () => {
  return (
    <section className={styles.settings}>
      <div className={styles.settings__interface}>
        <p className={styles.settings__interfaceTitle}>Interface Language</p>
        <button className={styles.settings__language}>
          Ukraine <img src={ArrowDown} alt="" />
        </button>
      </div>

      <div className={styles.settings__message}>
        <p className={styles.settings__title}>Notifications</p>
        <div className={styles.settings__wrapper}>
          <div className={styles.settings__content}>
            <div className={styles.settings__description}>
              <p className={styles.settings__label}>E-mail notification</p>
              <p className={styles.settings__text}>
                Receive booking details, personalized offers, and important
                service news to your email.
              </p>
            </div>
            <label className={styles.settings__switch}>
              <input
                type="checkbox"
                className={styles.settings__checkbox}
                aria-checked="false"
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
            </label>
          </div>
          <hr className={styles.settings__line} />
          <div className={styles.settings__content}>
            <div className={styles.settings__description}>
              <p className={styles.settings__label}>Push notifications</p>
              <p className={styles.settings__text}>
                Instant notifications on your device screen so you&apos;re
                always up to date with important updates in real time.
              </p>
            </div>
            <label className={styles.settings__switch}>
              <input
                type="checkbox"
                className={styles.settings__checkbox}
                aria-checked="false"
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
            </label>
          </div>
          <hr className={styles.settings__line} />
          <div className={styles.settings__content}>
            <div className={styles.settings__description}>
              <p className={styles.settings__label}>Nearest reservation</p>
              <p className={styles.settings__text}>
                We will send a short reminder about your scheduled visit in
                advance so you don&apos;t forget anything.
              </p>
            </div>
            <label className={styles.settings__switch}>
              <input
                type="checkbox"
                className={styles.settings__checkbox}
                aria-checked="false"
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
            </label>
          </div>
          <hr className={styles.settings__line} />
          <div className={styles.settings__content}>
            <div className={styles.settings__description}>
              <p className={styles.settings__label}>
                Comment reply notification
              </p>
              <p className={styles.settings__text}>
                Be the first to know when new ratings or replies to your
                comments appear.
              </p>
            </div>
            <label className={styles.settings__switch}>
              <input
                type="checkbox"
                className={styles.settings__checkbox}
                aria-checked="false"
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
            </label>
          </div>
        </div>
      </div>
      <div className={styles.settings__message}>
        <p className={styles.settings__title}>Privacy</p>
        <div className={styles.settings__wrapper}>
          <div className={styles.settings__content}>
            <div className={styles.settings__description}>
              <p className={styles.settings__label}>
                Allow analytics collection
              </p>
              <p className={styles.settings__text}>
                Help us work better: Allow the system to collect anonymous data
                about how you use the app. We do not share this data with third
                parties.
              </p>
            </div>
            <label className={styles.settings__switch}>
              <input
                type="checkbox"
                className={styles.settings__checkbox}
                aria-checked="false"
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
            </label>
          </div>
          <hr className={styles.settings__line} />
          <div className={styles.settings__content}>
            <div className={styles.settings__description}>
              <p className={styles.settings__label}>Saved payment methods</p>
              <p className={styles.settings__text}>
                Manage your finances: Here you can securely add, update or
                remove bank cards for quick payments.
              </p>
            </div>
            <label className={styles.settings__switch}>
              <input
                type="checkbox"
                className={styles.settings__checkbox}
                aria-checked="false"
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
            </label>
          </div>
        </div>
      </div>
      <div className={styles.settings__message}>
        <p className={styles.settings__title}>Account management</p>
        <div className={styles.settings__wrapper}>
          <div className={styles.settings__contentBottom}>
            <div className={styles.settings__description}>
              <p className={styles.settings__label}>Delete account</p>
              <p className={styles.settings__text}>
                Permanently delete your profile and all associated data,
                including booking history, reviews, and saved payment methods.
              </p>
            </div>
            <button className={styles.settings__deleteButton}>Delete</button>
          </div>
          <hr className={styles.settings__line} />
          <div className={styles.settings__contentBottom}>
            <div className={styles.settings__description}>
              <p className={styles.settings__label}>Log out</p>
              <p className={styles.settings__text}>
                Safely end your current session on this device. You can sign in
                again at any time, and all your saved data and settings will
                remain intact.
              </p>
            </div>
            <button className={styles.settings__logoutButton}>Log out</button>
          </div>
        </div>
      </div>
    </section>
  );
};
