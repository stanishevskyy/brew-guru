/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';

import styles from './Settings.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
//eslint-disable-next-line
import {
  fetchUserSettingsThunk,
  updateUserSettingsThunk,
} from '../../../../store/settingsSlice/settingsSlice';
import { UserSettings } from '../../../../shared/types/user/user-settings.type';
import { deleteUserThunk, logout } from '../../../../store/users/userSlice';
import classNames from 'classnames';

export const Settings = () => {
  const [isUpdating, setIsUpdating] = useState<keyof UserSettings | null>(null);
  const [isWhatAction, setIsWhatAction] = useState<'delete' | 'logout' | null>(
    null,
  );
  const userState = useAppSelector(state => state.user);
  const userSettings = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();

  const handleCheckboxChange =
    (key: keyof UserSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!userSettings.settings) {
        return;
      }

      setIsUpdating(key);

      dispatch(
        updateUserSettingsThunk({
          ...userSettings.settings,
          [key]: e.target.checked,
        }),
      );
    };

  const handleDeleteAccount = async () => {
    setIsWhatAction('delete');
    await dispatch(deleteUserThunk(userState.user?.id as number));
  };

  const handleLogoutAccount = () => {
    setIsWhatAction('logout');
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchUserSettingsThunk(userState.user?.id as number));
  }, []);

  return (
    <section className={styles.settings}>
      <div className={styles.settings__interface}>
        <p className={styles.settings__interfaceTitle}>Interface Language</p>
        <div className={styles.settings__language}>English</div>
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
                checked={userSettings.settings?.emailNotifications}
                onChange={handleCheckboxChange('emailNotifications')}
                disabled={userSettings.loading}
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
              {userSettings.loading && isUpdating === 'emailNotifications' && (
                <div className={styles.settings__loaderOverlay}></div>
              )}
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
                checked={userSettings.settings?.pushNotifications}
                onChange={handleCheckboxChange('pushNotifications')}
                disabled={userSettings.loading}
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
              {userSettings.loading && isUpdating === 'pushNotifications' && (
                <div className={styles.settings__loaderOverlay}></div>
              )}
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
                checked={userSettings.settings?.nearestReservationReminder}
                onChange={handleCheckboxChange('nearestReservationReminder')}
                disabled={userSettings.loading}
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
              {userSettings.loading &&
                isUpdating === 'nearestReservationReminder' && (
                  <div className={styles.settings__loaderOverlay}></div>
                )}
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
                checked={userSettings.settings?.commentReplyNotification}
                onChange={handleCheckboxChange('commentReplyNotification')}
                disabled={userSettings.loading}
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
              {userSettings.loading &&
                isUpdating === 'commentReplyNotification' && (
                  <div className={styles.settings__loaderOverlay}></div>
                )}
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
                checked={userSettings.settings?.allowAnalytics}
                onChange={handleCheckboxChange('allowAnalytics')}
                disabled={userSettings.loading}
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
              {userSettings.loading && isUpdating === 'allowAnalytics' && (
                <div className={styles.settings__loaderOverlay}></div>
              )}
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
                checked={userSettings.settings?.savedPaymentMethods}
                onChange={handleCheckboxChange('savedPaymentMethods')}
                disabled={userSettings.loading}
              />
              <span
                className={`${styles.settings__slider} ${styles.settings__round}`}
              ></span>
              {userSettings.loading && isUpdating === 'savedPaymentMethods' && (
                <div className={styles.settings__loaderOverlay}></div>
              )}
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
            <button
              className={classNames(`${styles.settings__deleteButton}`, {
                [styles.settings__buttonLoading]:
                  userState.loading && isWhatAction === 'delete',
              })}
              onClick={handleDeleteAccount}
              disabled={userState.loading && isWhatAction === 'delete'}
            >
              Delete
            </button>
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
            <button
              className={classNames(`${styles.settings__logoutButton}`, {
                [styles.settings__buttonLoading]:
                  userState.loading && isWhatAction === 'logout',
              })}
              onClick={handleLogoutAccount}
              disabled={userState.loading && isWhatAction === 'logout'}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
