import React from 'react';

import styles from './ReservationCard.module.scss';

//eslint-disable-next-line
import CardImage from '../../../../assets/images/reservations-images/reservations-image.png';
//eslint-disable-next-line
import CardImageTablet from '../../../../assets/images/reservations-images/reservations-image-tablet.png';
//eslint-disable-next-line
import CardImageDesktop from '../../../../assets/images/reservations-images/reservations-image-desktop.png';
//eslint-disable-next-line
import CheckMarkIcon from '../../../../assets/icons/reservations-icons/check-mark-icon.svg';
//eslint-disable-next-line
import LocationIcon from '../../../../assets/icons/reservations-icons/location-pin-icon.svg';
//eslint-disable-next-line
import ClockIcon from '../../../../assets/icons/reservations-icons/clock-icon.svg';
//eslint-disable-next-line
import SeatIcon from '../../../../assets/icons/reservations-icons/seat-icon.svg';

import { DetailsType } from '../../../../shared/types/DetailsType';

type Props = {
  onOpenDetails: (value: React.SetStateAction<DetailsType>) => void;
  onOpenCancelConfirm: (value: React.SetStateAction<DetailsType>) => void;
  onOpenCancelDetails: (value: React.SetStateAction<DetailsType>) => void;
  onOpenCheckStage: (value: React.SetStateAction<DetailsType>) => void;
};

export const ReservationCard: React.FC<Props> = ({
  onOpenDetails,
  onOpenCancelConfirm,
  // onOpenCancelDetails,
  // onOpenCheckStage,
}) => {
  return (
    <article className={styles.reserv}>
      <a href="/cartProduct" className={styles.reserv__cardLink}>
        <picture>
          <source media="(min-width: 639px)" srcSet={CardImageTablet} />
          <source media="(min-width: 1023px)" srcSet={CardImageDesktop} />

          <img
            loading="lazy"
            src={CardImage}
            alt="Зображення кафе"
            className={styles.reserv__cardImg}
          />
        </picture>
        <span className={styles.reserv__cardOverlay} aria-hidden="true"></span>
        {/* <span className={styles.reserv__cardLabel}>15% OFF</span> */}
      </a>

      <div className={styles.reserv__bottom}>
        <div className={styles.reserv__cardTitleWrap}>
          <h3 className={styles.reserv__cardTitle}>Cafe name</h3>
          <div className={styles.reserv__infoWrap}>
            <img
              src={CheckMarkIcon}
              alt=""
              aria-hidden="true"
              className={styles.reserv__infoImg}
            />
            <p className={styles.reserv__infoDesc} aria-live="polite">
              Reserved
            </p>
          </div>
        </div>

        <hr className={styles.reserv__hr} />

        <div className={styles.reserv__wrapInfo}>
          <div className={styles.reserv__wrapIcon}>
            <img
              src={LocationIcon}
              alt=""
              aria-hidden="true"
              className={styles.reserv__icon}
            />
            <p className={styles.reserv__iconInfo}>
              <span className={styles.reserv__iconTitle}>Location</span>
              <span className={styles.reserv__iconDesc}>Zolota, 1</span>
            </p>
          </div>

          <div className={styles.reserv__wrapIcon}>
            <img
              src={ClockIcon}
              alt=""
              aria-hidden="true"
              className={styles.reserv__icon}
            />
            <p className={styles.reserv__iconInfo}>
              <span className={styles.reserv__iconTitle}>Reservation time</span>
              <span className={styles.reserv__iconDesc}>17:00-18:00</span>
            </p>
          </div>

          <div className={styles.reserv__wrapIcon}>
            <img
              src={SeatIcon}
              alt=""
              aria-hidden="true"
              className={styles.reserv__icon}
            />
            <p className={styles.reserv__iconInfo}>
              <span className={styles.reserv__iconTitle}>Table number</span>
              <span className={styles.reserv__iconDesc}>№21</span>
            </p>
          </div>
        </div>

        <hr className={styles.reserv__hr} />

        <div className={styles.reserv__buttons}>
          <button type="button" className={styles.reserv__button}>
            See on map
          </button>
          <button
            type="button"
            className={styles.reserv__button}
            aria-haspopup="dialog"
            onClick={() => onOpenDetails('details')}
          >
            Change details
          </button>
          <button
            type="button"
            className={styles.reserv__buttonCancel}
            aria-haspopup="dialog"
            onClick={() => onOpenCancelConfirm('cancelConfirm')}
          >
            Cancel reservation
          </button>
        </div>
      </div>
    </article>
  );
};
