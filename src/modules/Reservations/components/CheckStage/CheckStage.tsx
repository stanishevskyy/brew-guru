import React, { useEffect } from 'react';
import styles from './CheckStage.module.scss';

import CloseIcon from '../../../../assets/icons/check-icons/close-icon.svg';
import { DetailsType } from '../../../../shared/types/DetailsType';

type Props = {
  onClose: (value: React.SetStateAction<DetailsType>) => void;
};

export const CheckStage: React.FC<Props> = ({ onClose }) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(null);
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Step data
  const steps = [
    'Receiving booking request',
    'Availability check',
    'Assigning table',
    'Payment & guarantee processing',
  ];

  return (
    <div
      className={styles.check}
      role="dialog"
      aria-modal="true"
      aria-labelledby="check-title"
    >
      <div className={styles.check__container}>
        <div className={styles.check__header}>
          <h4 id="check-title" className={styles.check__title}>
            Reservation progress
          </h4>
          <button
            className={styles.check__icon}
            aria-label="Close reservation progress"
            onClick={() => onClose(null)}
          >
            <img src={CloseIcon} alt="" />
          </button>
        </div>

        <div role="list" aria-label="Reservation steps">
          {steps.map((step, index) => {
            const isCurrent = index === 0; // example: first step is active
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step}
                className={
                  isLast
                    ? styles.check__informationBottom
                    : styles.check__information
                }
                role="listitem"
                aria-current={isCurrent ? 'step' : undefined}
              >
                <div className={styles.check__ready}>
                  <span className={styles.check__line}></span>
                </div>
                <p className={styles.check__description}>{step}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
