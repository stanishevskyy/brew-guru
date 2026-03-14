import React from 'react';
import styles from './DetailsButtons.module.scss';

type Props = {
  isModifiedDetails: boolean;
};

export const DetailsButtons: React.FC<Props> = ({ isModifiedDetails }) => {
  return (
    <>
      {!isModifiedDetails && (
        <div className={styles.buttons} role="group" aria-label="Form actions">
          <button type="button" className={styles.buttons__apply}>
            Apply
          </button>
          <button type="button" className={styles.buttons__cancel}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};
