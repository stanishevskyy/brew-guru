import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import classNames from 'classnames';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './CreatePassword.module.scss';

import { PasswordType } from '../../../shared/types/PasswordType';

import ErrorIcon from '../../../assets/icons/form-icons-validation/error.svg';
//eslint-disable-next-line
import WarningIcon from '../../../assets/icons/form-icons-validation/warning.svg';
import CheckIcon from '../../../assets/icons/form-icons-validation/check.svg';
import CrossIcon from '../../../assets/icons/form-icons-validation/cross.svg';

export const CreatePassword = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { register, handleSubmit } = useForm<PasswordType>({
    mode: 'onChange',
  });

  const [passwordStrength, setPasswordStrength] = useState('0');
  const [errorPassword, setErrorPassword] = useState({
    isEightCharacters: false,
    hasNumber: false,
    hasSpecialCharacter: false,
  });
  const [isError, setIsError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    let score = 0;

    if (!value) {
      setPasswordStrength('0');
      setErrorPassword({
        isEightCharacters: false,
        hasNumber: false,
        hasSpecialCharacter: false,
      });

      return;
    }

    if (value.length >= 8) {
      score++;
    }

    if (/[0-9]/.test(value)) {
      score++;
    }

    if (/[^A-Za-z0-9]/.test(value)) {
      score++;
    }

    if (/[A-Z]/.test(value)) {
      score++;
    }

    const strengthMap: Record<number, string> = {
      1: '20',
      2: '50',
      3: '70',
      4: '100',
    };

    setPasswordStrength(strengthMap[score] || '0');

    setErrorPassword({
      isEightCharacters: value.length >= 8,
      hasNumber: /[0-9]/.test(value),
      hasSpecialCharacter: /[^A-Za-z0-9]/.test(value),
    });
  };

  const onSubmit = async (data: PasswordType) => {
    const hasPasswordError = Object.values(errorPassword).some(value => !value);

    const passwordsDoNotMatch = data.password !== data.confirmPassword;

    if (hasPasswordError || passwordsDoNotMatch) {
      setIsError(true);

      return;
    }

    setIsError(false);
  };

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
              <span>Create password</span>
              <span>password</span>
            </h3>

            <form
              className={styles.password__form}
              noValidate
              aria-describedby="password-help"
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset className={styles.password__createPassword}>
                <label
                  htmlFor="current-password"
                  className={styles.password__label}
                >
                  Password
                </label>
                <input
                  className={classNames(`${styles.password__input}`, {
                    [styles.password__inputError]: isError,
                  })}
                  type="text"
                  id="current-password"
                  placeholder="Type here"
                  required
                  autoComplete="off"
                  aria-required="true"
                  {...register('password')}
                  onChange={handleChange}
                />
                {isError && (
                  <p
                    className={styles.password__errorMessage}
                    onMouseMove={() => setIsDescriptionOpen(true)}
                    onMouseLeave={() => setIsDescriptionOpen(false)}
                  >
                    <img src={WarningIcon} alt="" />
                    The password does not match
                  </p>
                )}

                {isDescriptionOpen && (
                  <div className={styles.password__wrapperError}>
                    <div className={styles.password__descriptionError}>
                      <p className={styles.password__strength}>
                        Password strength: {`${passwordStrength}`}%
                      </p>
                      <div
                        className={classNames(
                          styles[`password__line${passwordStrength}`],
                        )}
                      ></div>
                      <ul className={styles.password__errorList}>
                        <li className={styles.password__errorItem}>
                          <img
                            src={
                              errorPassword.isEightCharacters
                                ? CheckIcon
                                : CrossIcon
                            }
                            alt=""
                            className={styles.password__icon}
                          />
                          At least 8 characters
                        </li>
                        <li className={styles.password__errorItem}>
                          <img
                            src={
                              errorPassword.hasNumber ? CheckIcon : CrossIcon
                            }
                            alt=""
                            className={styles.password__icon}
                          />
                          At least 1 number
                        </li>
                        <li className={styles.password__errorItem}>
                          <img
                            src={
                              errorPassword.hasSpecialCharacter
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
              <fieldset className={styles.password__confirmPassword}>
                <label
                  htmlFor="confirm-password"
                  className={styles.password__label}
                >
                  Confirm password
                </label>
                <input
                  className={classNames(`${styles.password__input}`, {
                    [styles.password__inputErrorConfirm]: isError,
                  })}
                  type="text"
                  id="confirm-password"
                  placeholder="Type here"
                  required
                  autoComplete="off"
                  aria-required="true"
                  {...register('confirmPassword')}
                />
                {isError && (
                  <p className={styles.password__errorMessageConfirm}>
                    <img src={ErrorIcon} alt="" />
                    The password does not match
                  </p>
                )}
              </fieldset>

              <fieldset className={styles.password__buttons}>
                <button className={styles.password__buttonSecondary}>
                  Back
                </button>
                <button className={styles.password__buttonPrimary}>
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
