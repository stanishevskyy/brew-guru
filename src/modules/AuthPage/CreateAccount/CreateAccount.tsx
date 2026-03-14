import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './CreateAccount.module.scss';

//eslint-disable-next-line
import ErrorIcon from '../../../assets/icons/form-icons-validation/error.svg';

import { AccountType } from '../../../shared/types/AccountType';

export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AccountType>({ mode: 'onChange' });

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: AccountType) => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return <Navigate to="/auth/register/confirm-email" replace />;
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
          <article className={styles.account}>
            <h3 id="account-title" className={styles.account__title}>
              <span>Create a CafeMatch</span>
              <span>account</span>
            </h3>

            <form
              className={styles.account__form}
              noValidate
              aria-describedby="account-help"
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset className={styles.account__email}>
                <label htmlFor="email" className={styles.account__label}>
                  Email
                </label>
                <input
                  className={classNames(styles.account__input, {
                    [styles.account__inputError]: errors.email,
                  })}
                  type="email"
                  id="email"
                  placeholder="Name@example.com"
                  autoComplete="off"
                  {...register('email', {
                    required: "Email обов'язковий",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/i,
                      message: 'Email має бути у форматі example@mail.com',
                    },
                  })}
                />

                {errors.email && (
                  <p className={styles.account__errorMessage}>
                    <img src={ErrorIcon} alt="" />
                    {errors.email.message}
                  </p>
                )}
              </fieldset>

              <fieldset className={styles.account__buttons}>
                <button
                  type="button"
                  className={styles.account__buttonSecondary}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={styles.account__buttonPrimary}
                  disabled={!isValid}
                >
                  Continue
                </button>
              </fieldset>
            </form>

            <div className={styles.account__bottom} id="account-help">
              <p className={styles.account__isRegister}>
                You may already have an account?
              </p>
              <Link to="/auth/login" className={styles.account__signIn}>
                Log in
              </Link>
            </div>
          </article>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
