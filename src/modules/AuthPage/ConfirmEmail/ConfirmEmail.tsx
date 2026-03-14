import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './ConfirmEmail.module.scss';

import { useAppSelector } from '../../../store/hooks';

export const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [currentCode, setCurrentCode] = useState<string[]>(Array(6).fill(''));
  const isAvailable = currentCode.every(el => el !== '');
  const userData = useAppSelector(state => state.registration);

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleBackButton = () => {
    navigate('/auth/register');
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    event.preventDefault();

    if (isAvailable && event.key !== 'Backspace') {
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v') {
      inputsRef.current[0].focus();
      try {
        const text = await navigator.clipboard.readText();
        const onlyDigits = /^[0-9]+$/.test(text) ? text.split('') : [];

        if (onlyDigits.length) {
          setCurrentCode(prev => prev.map((val, i) => onlyDigits[i] || val));
        }
      } catch (err) {
        console.error('Clipboard read failed:', err);
      }
    }

    if (event.key === 'Backspace') {
      if (currentCode[currentIndex]) {
        setCurrentCode(prev =>
          prev.map((val, i) => (i === currentIndex ? '' : val)),
        );
      } else {
        inputsRef.current[currentIndex - 1]?.focus();
      }
    }

    if (/^\d$/.test(event.key)) {
      setCurrentCode(prev =>
        prev.map((el, index) => (index === currentIndex ? event.key : el)),
      );

      inputsRef.current[currentIndex + 1]?.focus();
    }
  };

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const staticCode = '123456';

    setCurrentCode(staticCode.split(''));

    if (inputsRef.current[staticCode.length - 1]) {
      inputsRef.current[staticCode.length - 1].focus();
    }
  }, []);

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
          <article className={styles.confirm}>
            <h3 id="login-title" className={styles.login__title}>
              Confirm your E-mail
            </h3>

            <p className={styles.confirm__info}>
              {`A message with a verification code has been sent to
              ${userData.data?.email}. Enter the code to finish this registration`}
            </p>

            <form
              className={styles.login__form}
              noValidate
              aria-describedby="login-help"
              onSubmit={handleSumbit}
            >
              <fieldset className={styles.login__code}>
                {currentCode.map((codeNumber, index: number) => (
                  <input
                    key={index}
                    className={styles.login__input}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    required
                    value={codeNumber}
                    aria-required="true"
                    ref={(el: HTMLInputElement | null) => {
                      if (el) {
                        inputsRef.current[index] = el;
                      }
                    }}
                    // onChange={event => handleChange(event, index)}
                    onKeyDown={event => handleKeyDown(event, index)}
                  />
                ))}
              </fieldset>

              <a href="/" className={styles.login__resend}>
                Don’t get a varification code?
              </a>

              <fieldset className={styles.login__buttons}>
                <button
                  type="button"
                  className={styles.login__buttonSecondary}
                  onClick={handleBackButton}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={styles.login__buttonPrimary}
                  disabled={!isAvailable}
                  onClick={() => navigate('/auth/register/create-password')}
                >
                  Continue
                </button>
              </fieldset>
            </form>
          </article>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
