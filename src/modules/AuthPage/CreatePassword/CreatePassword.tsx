import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import styles from './CreatePassword.module.scss';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { PasswordType } from '../../../shared/types/PasswordType';

import ErrorIcon from '../../../assets/icons/form-icons-validation/error.svg';
import CheckIcon from '../../../assets/icons/form-icons-validation/check.svg';
import CrossIcon from '../../../assets/icons/form-icons-validation/cross.svg';
//eslint-disable-next-line
import WarningIcon from '../../../assets/icons/form-icons-validation/warning.svg';
import { updateData } from '../../../store/registration/registrationSlice';

export const CreatePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector(state => state.registration);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordType>({
    mode: 'onChange',
  });

  const password = watch('password', '');
  const [passwordStrength, setPasswordStrength] = useState('0');
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleBackButton = () => {
    navigate('/auth/register/confirm-email');
  };

  useEffect(() => {
    if (!password) {
      setPasswordStrength('0');

      return;
    }

    const isEightCharacters = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);

    let score = 0;

    if (isEightCharacters) {
      score++;
    }

    if (hasNumber) {
      score++;
    }

    if (hasSpecialCharacter) {
      score++;
    }

    if (hasUppercase) {
      score++;
    }

    const strengthMap: Record<number, string> = {
      1: '20',
      2: '50',
      3: '70',
      4: '100',
    };

    setPasswordStrength(strengthMap[score] || '0');
  }, [password]);

  const onSubmit = (data: PasswordType) => {
    dispatch(updateData({ password: data.password }));
    navigate('/auth/register/create-user');
  };

  if (!userData.data.email) {
    return <Navigate to="/auth/register" />;
  }

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
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 22,
          }}
        >
          <article className={styles.password}>
            <h3 id="password-title" className={styles.password__title}>
              <span>Create account</span>
              <span>password</span>
            </h3>

            <form
              className={styles.password__form}
              noValidate
              aria-describedby="password-help"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Password Field */}
              <fieldset className={styles.password__createPassword}>
                <label htmlFor="password" className={styles.password__label}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Type here"
                  autoComplete="off"
                  aria-required="true"
                  className={classNames(styles.password__input, {
                    [styles.password__inputError]: !!errors.password,
                  })}
                  {...register('password', {
                    required: 'Password is required',
                    maxLength: {
                      value: 72,
                      message: 'Maximum length is 72 characters',
                    },
                    validate: value => {
                      const isEightCharacters = value.length >= 8;
                      const hasNumber = /[0-9]/.test(value);
                      const hasSpecialCharacter = /[^A-Za-z0-9]/.test(value);

                      return (
                        (isEightCharacters &&
                          hasNumber &&
                          hasSpecialCharacter) ||
                        'Password does not meet requirements'
                      );
                    },
                  })}
                />
                {errors.password && (
                  <p
                    className={styles.password__errorMessage}
                    onMouseMove={() => setIsDescriptionOpen(true)}
                    onMouseLeave={() => setIsDescriptionOpen(false)}
                  >
                    <img src={WarningIcon} alt="" />
                    {errors.password.message}
                  </p>
                )}

                {isDescriptionOpen && (
                  <div className={styles.password__wrapperError}>
                    <div className={styles.password__descriptionError}>
                      <p className={styles.password__strength}>
                        Password strength: {passwordStrength}%
                      </p>
                      <div
                        className={classNames(
                          styles[`password__line${passwordStrength}`],
                        )}
                      ></div>
                      <ul className={styles.password__errorList}>
                        <li className={styles.password__errorItem}>
                          <img
                            src={password.length >= 8 ? CheckIcon : CrossIcon}
                            alt=""
                            className={styles.password__icon}
                          />
                          At least 8 characters
                        </li>
                        <li className={styles.password__errorItem}>
                          <img
                            src={/[0-9]/.test(password) ? CheckIcon : CrossIcon}
                            alt=""
                            className={styles.password__icon}
                          />
                          At least 1 number
                        </li>
                        <li className={styles.password__errorItem}>
                          <img
                            src={
                              /[^A-Za-z0-9]/.test(password)
                                ? CheckIcon
                                : CrossIcon
                            }
                            alt=""
                            className={styles.password__icon}
                          />
                          At least 1 special character
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </fieldset>

              {/* Confirm Password Field */}
              <fieldset className={styles.password__confirmPassword}>
                <label
                  htmlFor="confirmPassword"
                  className={styles.password__label}
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Type here"
                  autoComplete="off"
                  aria-required="true"
                  className={classNames(styles.password__input, {
                    [styles.password__inputErrorConfirm]:
                      !!errors.confirmPassword,
                  })}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value =>
                      value === password || 'Passwords do not match',
                  })}
                />
                {errors.confirmPassword && (
                  <p className={styles.password__errorMessageConfirm}>
                    <img src={ErrorIcon} alt="" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </fieldset>

              {/* Buttons */}
              <fieldset className={styles.password__buttons}>
                <button
                  type="button"
                  className={styles.password__buttonSecondary}
                  onClick={handleBackButton}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={styles.password__buttonPrimary}
                  disabled={!isValid}
                >
                  Continue
                </button>
              </fieldset>
            </form>

            <div className={styles.password__bottom} id="password-help">
              <p className={styles.password__isRegister}>
                You may already have an account?
              </p>
              <a href="/" className={styles.password__signIn}>
                Log in
              </a>
            </div>
          </article>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
