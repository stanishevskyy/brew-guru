import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, replace } from 'react-router-dom';

import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './LoginPage.module.scss';

import { LoginType } from '../../../shared/types/LoginType';

//eslint-disable-next-line
import ErrorIcon from '../../../assets/icons/form-icons-validation/error.svg';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginType>({ mode: 'onChange' });
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: LoginType) => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return <Navigate to="/search" replace />;
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
          <section className={styles.login} aria-labelledby="login-title">
            <h3 id="login-title" className={styles.login__title}>
              <span>Log in with your </span>
              <span>CafeMatch account</span>
            </h3>

            <form
              className={styles.login__form}
              noValidate
              aria-describedby="login-help"
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset className={styles.login__email}>
                <label htmlFor="email" className={styles.login__label}>
                  Email
                </label>
                <input
                  className={classNames(`${styles.login__input}`, {
                    [styles.login__inputError]: errors.email,
                  })}
                  type="email"
                  id="email"
                  placeholder="Name@example.com"
                  required
                  autoComplete="off"
                  aria-required="true"
                  {...register('email', {
                    required: "Email обов'язковий",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/i,
                      message: 'Email має бути у форматі example@mail.com',
                    },
                    // validate: async value => {
                    //   const exists = await checkEmailExists(value);

                    //   return !exists || 'Email вже зайнятий';
                    // },
                  })}
                />
                {errors.email && (
                  <p className={styles.login__errorMessage}>
                    <img
                      src={ErrorIcon}
                      alt="Іконка помилки"
                      className={styles.login__errorIcon}
                    />
                    {errors.email.message}
                  </p>
                )}
              </fieldset>

              <fieldset className={styles.login__password}>
                <label htmlFor="password" className={styles.login__label}>
                  Password
                </label>
                <input
                  className={classNames(`${styles.login__input}`, {
                    [styles.login__inputError]: errors.password,
                  })}
                  type="password"
                  id="password"
                  placeholder="Type here"
                  autoComplete="current-password"
                  aria-required="true"
                  {...register('password', {
                    required: "Пароль обов'язковий",
                    // pattern: {
                    //   value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                    //   message:
                    //     'Пароль має містити мінімум 6 символів,та одну велику літеру',
                    // },
                  })}
                />
                {errors.password && (
                  <p className={styles.login__errorMessage}>
                    <img
                      src={ErrorIcon}
                      alt="Іконка помилки"
                      className={styles.login__errorIcon}
                    />
                    {errors.password.message}
                  </p>
                )}
              </fieldset>
              <a href="/" className={styles.login__forgot}>
                Forgot your password?
              </a>

              <fieldset className={styles.login__stayLogged}>
                <label
                  htmlFor="stay-logged-in"
                  className={styles.login__checkboxLabel}
                >
                  <input
                    type="checkbox"
                    id="stay-logged-in"
                    className={styles.login__checkbox}
                    {...register('stayLoggedIn')}
                  />
                  Stay logged in
                </label>
              </fieldset>

              <fieldset className={styles.login__buttons}>
                <button type="button" className={styles.login__buttonSecondary}>
                  Back
                </button>
                <button
                  type="submit"
                  className={styles.login__buttonPrimary}
                  disabled={!isValid}
                >
                  Continue
                </button>
              </fieldset>
            </form>

            <div className={styles.login__bottom} id="login-help">
              <p className={styles.login__isRegister}>
                Don&apos;t have an account?
              </p>
              <Link
                to="/auth/register"
                {...replace}
                className={styles.login__signup}
              >
                Create an account
              </Link>
            </div>
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
