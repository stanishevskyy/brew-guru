import styles from './DetailsHeader.module.scss';

//eslint-disable-next-line
import CloseIcon from '../../../../../assets/icons/details-icons/close-icon.svg';

import { DetailsType } from '../../../../types/DetailsType';
import React from 'react';

type Props = {
  isModifiedDetails: boolean;
  onClose: (value: React.SetStateAction<DetailsType>) => void;
};

export const DetailsHeader: React.FC<Props> = ({
  isModifiedDetails,
  onClose,
}) => {
  return (
    <div className={styles.detailsHeader} role="banner">
      <h4
        className={styles.detailsHeader__Title}
        id="reservation-details-title"
      >
        Reservation details
      </h4>

      {!isModifiedDetails && (
        <button
          type="button"
          className={styles.detailsHeader__btnClose}
          aria-label="Close reservation details"
          onClick={() => onClose(null)}
        >
          <img
            src={CloseIcon}
            alt=""
            className={styles.detailsHeader__btnImg}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
};
