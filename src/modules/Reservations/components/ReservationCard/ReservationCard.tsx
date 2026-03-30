import React from 'react';

import styles from './ReservationCard.module.scss';

import { Booking } from '../../../../shared/types/reservations/booking';

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
// eslint-disable-next-line max-len
import { ReservationStatus } from '../../../../shared/constants/reservationStatus';

import ErrorIcon from '../../../../assets/icons/reports-icons/error-icon.svg';
// eslint-disable-next-line max-len
import WarningIcon from '../../../../assets/icons/reports-icons/warning-icon.svg';
// eslint-disable-next-line max-len
import CheckIcon from '../../../../assets/icons/reports-icons/check-mark-icon.svg';
import { openPlace } from '../../../CafePage/utils/onPlace';

type Props = {
  reservations: Booking;
  onOpenDetails: (value: React.SetStateAction<DetailsType>) => void;
  onOpenCancelConfirm: (value: React.SetStateAction<DetailsType>) => void;
  onOpenCancelDetails: (value: React.SetStateAction<DetailsType>) => void;
  onOpenCheckStage: (value: React.SetStateAction<DetailsType>) => void;
  setOpenModal: (value: number | null) => void;
};

export const ReservationCard: React.FC<Props> = ({
  reservations,
  onOpenDetails,
  onOpenCancelConfirm,
  onOpenCancelDetails,
  onOpenCheckStage,
  setOpenModal,
}) => {
  const getStatusProps = (status: string) => {
    switch (status) {
      case ReservationStatus.Cancelled:
        return {
          icon: ErrorIcon,
          style: 'reserv__status-error',
          label: 'Cancelled',
        };
      case ReservationStatus.Pending:
        return {
          icon: WarningIcon,
          style: 'reserv__status-warning',
          label: 'Pending',
        };
      case ReservationStatus.Confirmed:
        return {
          icon: CheckIcon,
          style: 'reserv__status-check',
          label: 'Reserved',
        };
      default:
        return {
          icon: ErrorIcon,
          style: 'reserv__status-error',
          label: 'Cancelled',
        };
    }
  };

  const reservStatus = getStatusProps(reservations.reservation.status);

  return (
    <article className={styles.reserv}>
      <a href="/cartProduct" className={styles.reserv__cardLink}>
        {!reservations?.cafe?.img ? (
          <img
            loading="lazy"
            src={reservations?.cafe?.img}
            alt="Зображення кафе"
            className={styles.reserv__cardImg}
          />
        ) : (
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
        )}
        <span className={styles.reserv__cardOverlay} aria-hidden="true"></span>
        {/* <span className={styles.reserv__cardLabel}>15% OFF</span> */}
      </a>

      <div className={styles.reserv__bottom}>
        <div className={styles.reserv__cardTitleWrap}>
          <h3 className={styles.reserv__cardTitle}>
            {reservations?.cafe?.name}
          </h3>
          <div
            // className={styles.reserv__infoWrap}
            className={`${styles.reserv__infoWrap} ${styles[reservStatus.style]}`}
          >
            <img
              src={reservStatus.icon}
              alt=""
              aria-hidden="true"
              className={styles.reserv__infoImg}
            />
            <p
              // className={styles.reserv__infoDesc}
              className={`${styles.reserv__infoDesc} ${styles[`${reservStatus.style}-info`]}`}
              aria-live="polite"
            >
              {reservStatus.label}
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
              <span className={styles.reserv__iconDesc}>
                {reservations?.cafe?.address}
              </span>
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
              <span
                className={styles.reserv__iconDesc}
              >{`${reservations.reservation.startTime}-${reservations.reservation.endTime}`}</span>
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
              <span
                className={styles.reserv__iconDesc}
              >{`№${reservations.reservation.tableNumber}`}</span>
            </p>
          </div>
        </div>

        <hr className={styles.reserv__hr} />

        {reservations.reservation.status === 'confirmed' && (
          <div className={styles.reserv__buttons}>
            <button
              type="button"
              className={styles.reserv__button}
              onClick={() => openPlace(`${reservations?.cafe?.address}`)}
            >
              See on map
            </button>
            <button
              type="button"
              className={styles.reserv__button}
              aria-haspopup="dialog"
              onClick={() => {
                onOpenDetails('details');
                setOpenModal(+reservations.id);
              }}
            >
              Change details
            </button>
            <button
              type="button"
              className={styles.reserv__buttonCancel}
              aria-haspopup="dialog"
              onClick={() => {
                onOpenCancelConfirm('cancelConfirm');
                setOpenModal(+reservations.id);
              }}
            >
              Cancel reservation
            </button>
          </div>
        )}

        {reservations.reservation.status === 'pending' && (
          <button
            className={styles.reserv__button}
            onClick={() => {
              setOpenModal(+reservations.id);
              onOpenCheckStage('checkStage');
            }}
          >
            Check reservation stage
          </button>
        )}

        {reservations.reservation.status === 'cancelled' && (
          <button
            className={styles.reserv__button}
            onClick={() => onOpenCancelDetails('cancelDetails')}
          >
            Cancellation details
          </button>
        )}
      </div>
    </article>
  );
};
