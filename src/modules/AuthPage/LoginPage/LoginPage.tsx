import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import classNames from 'classnames';

import styles from './LoginPage.module.scss';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { LoginType } from '../../../shared/types/LoginType';

//eslint-disable-next-line
import ErrorIcon from '../../../assets/icons/form-icons-validation/error.svg';
import { clearError, loginUserThunk } from '../../../store/users/userSlice';
import { useEffect } from 'react';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginType>({ mode: 'onChange' });
  const location = useLocation();
  const from = location.state?.from || '/';
  const navigate = useNavigate();
  const userState = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleBackButton = () => {
    navigate('/');
  };

  const onSubmit = async (data: LoginType) => {
    await dispatch(loginUserThunk(data));
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  if (userState.user) {
    return <Navigate to={from} replace />;
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
                    [styles.login__inputError]: errors.email || userState.error,
                  })}
                  type="email"
                  id="email"
                  placeholder="Name@example.com"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/i,
                      message: 'Email must be in the format example@mail.com',
                    },
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
                    [styles.login__inputError]:
                      errors.password || userState.error,
                  })}
                  type="password"
                  id="password"
                  placeholder="Type here"
                  autoComplete="current-password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {(errors.password || userState.error) && (
                  <p className={styles.login__errorMessage}>
                    <img
                      src={ErrorIcon}
                      alt="Іконка помилки"
                      className={styles.login__errorIcon}
                    />
                    {errors.password?.message || userState.error}
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
                <button
                  type="button"
                  className={styles.login__buttonSecondary}
                  onClick={handleBackButton}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={classNames(`${styles.login__buttonPrimary}`, {
                    [styles.login__buttonPrimaryLoading]: userState.loading,
                  })}
                  disabled={!isValid || userState.loading}
                >
                  Continue
                </button>
              </fieldset>
            </form>

            <div className={styles.login__bottom} id="login-help">
              <p className={styles.login__isRegister}>
                Don&apos;t have an account?
              </p>
              <Link to="/auth/register" className={styles.login__signup}>
                Create an account
              </Link>
            </div>
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
