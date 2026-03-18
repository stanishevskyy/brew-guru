import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import classNames from 'classnames';

import styles from './CreateAccount.module.scss';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

//eslint-disable-next-line
import ErrorIcon from '../../../assets/icons/form-icons-validation/error.svg';

import { AccountType } from '../../../shared/types/AccountType';
import {
  resetRegistration,
  updateData,
} from '../../../store/registration/registrationSlice';
import { authService } from '../../../services/authService';

export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isValidating },
  } = useForm<AccountType>({ mode: 'onChange' });
  const navigate = useNavigate();
  const userData = useAppSelector(state => state.registration);
  const dispatch = useAppDispatch();

  const handleBackButton = () => {
    dispatch(resetRegistration());
    navigate('/auth/login');
  };

  const onSubmit = async (data: AccountType) => {
    dispatch(updateData({ ...data }));

    navigate('/auth/register/confirm-email');
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
                  defaultValue={userData.data.email ? userData.data?.email : ''}
                  {...register('email', {
                    required: 'Email is required',
                    maxLength: { value: 254, message: 'Maximum length 254' },
                    pattern: {
                      value: /^\S+@\S+\.\S+$/i,
                      message: 'Email must be in the format example@mail.com',
                    },
                    validate: async value => {
                      const emailRegex = /^\S+@\S+\.\S+$/i;

                      if (!value || !emailRegex.test(value)) {
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

                {errors.email && (
                  <p className={styles.account__errorMessage}>
                    <img src={ErrorIcon} alt="" />
                    {errors.email?.message}
                  </p>
                )}
              </fieldset>

              <fieldset className={styles.account__buttons}>
                <button
                  type="button"
                  className={styles.account__buttonSecondary}
                  onClick={handleBackButton}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={classNames(styles.account__buttonPrimary, {
                    [styles.account__buttonPrimaryLoading]: isValidating,
                  })}
                  disabled={!isValid || isValidating}
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
