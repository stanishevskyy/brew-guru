/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import classNames from 'classnames';

import styles from './UserProfile.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { authService } from '../../../../services/authService';
import { updateUserThunk } from '../../../../store/users/userSlice';

import { User } from '../../../../shared/types/user/user.type';

type ProfilePage = Partial<Pick<User, 'email' | 'password' | 'phone'>>;

export const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [changeData, setChangeData] = useState({
    phone: false,
    email: false,
    password: false,
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<ProfilePage>({ mode: 'onSubmit' });

  const userState = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleTwoFactorAuth = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!userState.user) {
      return;
    }

    const updatedUser = {
      ...userState.user,
      twoFactorEnabled: event.target.checked,
    };

    await dispatch(updateUserThunk(updatedUser));

    setChangeData({ phone: false, email: false, password: false });
  };

  const onSubmit = async (data: ProfilePage) => {
    if (!userState.user?.id) {
      return;
    }

    const updatedUser: User = {
      ...userState.user,
      email: data.email ?? userState.user.email,
      password: data.password || userState.user.password,
      phone: data.phone || userState.user.phone,
      updatedAt: new Date().toISOString(),
    };

    await dispatch(updateUserThunk(updatedUser));

    setChangeData({ phone: false, email: false, password: false });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timerId);
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
            {isLoading || userState.loading ? (
              <div className={styles.user__inputSkeleton}></div>
            ) : (
              <div className={styles.user__input}>
                {userState.user?.firstName}
              </div>
            )}
          </div>

          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="lastName">
              Last name
            </label>
            {isLoading || userState.loading ? (
              <div className={styles.user__inputSkeleton}></div>
            ) : (
              <div className={styles.user__input}>
                {userState.user?.lastName}
              </div>
            )}
          </div>

          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="phone">
              Phone number
            </label>
            <div className={styles.user__phone}>
              {isLoading || userState.loading ? (
                <div className={styles.user__inputSkeletonSpec}></div>
              ) : changeData.phone ? (
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={userState.user?.phone || '+380'}
                  rules={{
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+380\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/,
                      message:
                        'Phone number must be in the format +380 XX XXX XX XX',
                    },
                  }}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="+{380} 00 000 00 00"
                      unmask={false}
                      lazy={true}
                      id="phone"
                      className={classNames(`${styles.user__input}`, {
                        [styles.user__inputPhone]: changeData.phone,
                      })}
                      placeholder="+380"
                      autoFocus={changeData.phone}
                      onAccept={(value: string) => field.onChange(value)}
                    />
                  )}
                />
              ) : (
                <div className={styles.user__inputDefault}>
                  {userState.user?.phone || '+380'}
                </div>
              )}

              {!changeData.phone ? (
                <button
                  type="button"
                  className={styles.user__changeBtn}
                  aria-label="Change phone number"
                  onClick={() =>
                    setChangeData(prev => ({ ...prev, phone: true }))
                  }
                >
                  Change number
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.user__changeBtn}
                  aria-label="Cancel change phone"
                  onClick={() => {
                    setChangeData(prev => ({ ...prev, phone: false }));
                    setValue('phone', userState.user?.phone || '');
                    clearErrors('phone');
                  }}
                >
                  Cancel
                </button>
              )}
            </div>

            {errors.phone && (
              <div className={styles.user__error}>{errors.phone.message}</div>
            )}
          </div>
        </fieldset>

        <fieldset className={styles.user__fieldset}>
          <p className={styles.user__legend}>Account details</p>

          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="email">
              E-mail
            </label>
            <div className={styles.user__phone}>
              {isLoading || userState.loading ? (
                <div className={styles.user__inputSkeletonSpec}></div>
              ) : changeData.email ? (
                <input
                  type="email"
                  id="email"
                  className={classNames(`${styles.user__input}`, {
                    [styles.user__inputEmail]: changeData.email,
                  })}
                  defaultValue={userState.user?.email}
                  autoFocus={changeData.email}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/i,
                      message: 'Email must be in the format example@mail.com',
                    },
                    validate: async value => {
                      if (!value) {
                        return true;
                      }

                      if (value === userState.user?.email) {
                        return true;
                      }

                      try {
                        await authService.checkEmailExist(value);

                        return true;
                      } catch (error) {
                        return error instanceof Error
                          ? error.message
                          : 'Email already registered';
                      }
                    },
                  })}
                />
              ) : (
                <div className={styles.user__inputDefault}>
                  {userState.user?.email}
                </div>
              )}
              {!changeData.email ? (
                <button
                  type="button"
                  className={styles.user__changeBtn}
                  aria-label="Change e-mail"
                  onClick={() =>
                    setChangeData(prev => ({ ...prev, email: true }))
                  }
                >
                  Change e-mail
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.user__changeBtn}
                  aria-label="Cancel change e-mail"
                  onClick={() => {
                    setChangeData(prev => ({ ...prev, email: false }));
                    setValue('email', userState.user?.email || '');
                    clearErrors('email');
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
            {errors.email && (
              <div className={styles.user__error}>{errors.email?.message}</div>
            )}
          </div>
          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="password">
              Password
            </label>
            <div className={styles.user__phone}>
              {isLoading || userState.loading ? (
                <div className={styles.user__inputSkeletonSpec}></div>
              ) : changeData.password ? (
                <input
                  type="password"
                  id="password"
                  className={classNames(`${styles.user__input}`, {
                    [styles.user__inputPassword]: changeData.password,
                  })}
                  autoFocus={changeData.password}
                  {...register('password', {
                    required: 'Password is required',
                    validate: (value: string | undefined) => {
                      if (!value) {
                        return 'Password is required';
                      }

                      if (value.length < 8) {
                        return 'Password has less than 8 characters';
                      }

                      if (!/[0-9]/.test(value)) {
                        return 'Password must contain at least one number';
                      }

                      if (!/[^A-Za-z0-9]/.test(value)) {
                        // eslint-disable-next-line max-len
                        return 'Password must contain at least one special character';
                      }

                      return true;
                    },
                  })}
                />
              ) : (
                <div className={styles.user__inputDefault}>********</div>
              )}

              {!changeData.password ? (
                <button
                  type="button"
                  className={styles.user__changeBtn}
                  aria-label="Change password"
                  onClick={() =>
                    setChangeData(prev => ({ ...prev, password: true }))
                  }
                >
                  Change password
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.user__changeBtn}
                  aria-label="Cancel change password"
                  onClick={() => {
                    setChangeData(prev => ({ ...prev, password: false }));
                    setValue('password', '');
                    clearErrors('password');
                  }}
                >
                  Cancel
                </button>
              )}
            </div>

            {errors.password && (
              <div className={styles.user__error}>
                {errors.password.message}
              </div>
            )}
          </div>
          <div className={styles.user__fieldWrapper}>
            <label className={styles.user__label} htmlFor="country">
              Country/region
            </label>

            {isLoading || userState.loading ? (
              <div className={styles.user__inputSkeleton}></div>
            ) : (
              <div className={styles.user__wrapper}>
                <div className={styles.user__countryBtn}>Ukraine</div>
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
              checked={userState?.user?.twoFactorEnabled ?? false}
              onChange={handleTwoFactorAuth}
              disabled={userState.loading}
            />
            <span
              className={`${styles.user__slider} ${styles.user__round}`}
            ></span>
            {userState.loading && (
              <div className={styles.settings__loaderOverlay}></div>
            )}
          </label>
        </div>

        <button
          type="button"
          className={styles.user__saveBtn}
          onClick={handleSubmit(onSubmit)}
          disabled={userState.loading || !isValid}
        >
          Save changes
        </button>
      </div>
    </>
  );
};
