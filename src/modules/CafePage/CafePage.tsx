import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import classNames from 'classnames';

import styles from './CafePage.module.scss';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
// eslint-disable-next-line max-len
import {
  fetchCafeDetailsThunk,
  updateCafeDetailsThunk,
} from '../../store/cafeDetailsSlice/cafeDetailsSlice';
import { fetchCafeReviewsThunk } from '../../store/reviewsSlice/reviewsSlice';

// eslint-disable-next-line max-len
import { fetchCafeMenuThunk } from '../../store/menuSlice/menuSlice';
// eslint-disable-next-line max-len
import { addUserReservationThunk } from '../../store/userReservationsSlice/userReservationsSlice';
// eslint-disable-next-line max-len
import { resetReservation } from '../../store/tableReservationSlice/tableReservationSlice';
import { clearOrder } from '../../store/menuOrderSlice/menuOrderSlice';

import { openPlace } from './utils/onPlace';

import { CafeMenu } from './components/CafeMenu';
import { Details } from '../../shared/components/Details';
import { CafeReviews } from './components/CafeReviews';

import ArrowLeft from '../../assets/icons/search-icons/left-arrow.svg';
//eslint-disable-next-line
import CardImage from '../../assets/images/cafe-images/cafe-image/cafe-image-mobile.png';
//eslint-disable-next-line
import CardImageTablet from '../../assets/images/cafe-images/cafe-image/cafe-image-tablet.png';
//eslint-disable-next-line
import CardImageDesktop from '../../assets/images/cafe-images/cafe-image/cafe-image-desktop.png';

import CheckIcon from '../../assets/icons/cafe-icons/check-icon.svg';
import SeatsIcon from '../../assets/icons/cafe-icons/seats-icon.svg';
import DateIcon from '../../assets/icons/cafe-icons/date-icon.svg';
import TimeIcon from '../../assets/icons/cafe-icons/time-icon.svg';

import { BackSkeleton } from '../../shared/components/BackSkeleton';
import { CafeHeaderSkeleton } from '../../shared/components/CafeHeaderSkeleton';
import { CafeMenuSkeleton } from '../../shared/components/CafeMenuSkeleton';
//eslint-disable-next-line
import { CafeReviewsSkeleton } from '../../shared/components/CafeReviewsSkeleton';

import { Reservation } from '../../shared/types/reservations/reservation';
import { Customer } from '../../shared/types/reservations/customer';

export const CafePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { slug } = useParams();
  const cafeId = slug?.split('-').pop();

  const cafeState = useAppSelector(state => state.cafeDetails);

  const reviewsState = useAppSelector(state => state.reviews);
  const dispatch = useAppDispatch();

  const currentDayIndex = ((new Date().getDay() + 6) % 7) + 1;

  const currentDayWorking = cafeState.cafe?.openingHours.find(
    el => el.weekday === currentDayIndex,
  );
  const openTime = currentDayWorking?.openTime
    ? currentDayWorking.openTime.slice(0, 5)
    : '';
  const closeTime = currentDayWorking?.closeTime
    ? currentDayWorking.closeTime.slice(0, 5)
    : '';

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (cafeId) {
      dispatch(fetchCafeDetailsThunk(+cafeId));
      dispatch(fetchCafeReviewsThunk(+cafeId));
      dispatch(fetchCafeMenuThunk({ cafeId: +cafeId }));
    }
  }, [cafeId, dispatch]);

  const menuState = useAppSelector(state => state.menuOrder);
  const userState = useAppSelector(state => state.user.user);
  const tableReservation = useAppSelector(state => state.tableReservation);

  const [isLoading, setIsLoading] = useState(false);

  const [book, setBook] = useState(false);

  const handleBook = async () => {
    const selected = tableReservation.selectedTable;
    const user = userState;
    const cafe = cafeState.cafe;

    if (
      !selected ||
      !selected.date ||
      !selected.startTime ||
      !selected.endTime ||
      !selected.tableId ||
      !selected.seats
    ) {
      throw new Error('Missing reservation data');
    }

    if (!user) {
      throw new Error('Missing user data');
    }

    if (!cafe) {
      throw new Error('Missing cafe data');
    }

    // 2. RESERVATION
    const reservation: Reservation = {
      id: `${Date.now()}`,
      date: selected.date,
      startTime: selected.startTime,
      endTime: selected.endTime,
      guestsCount: selected.seats,
      tableNumber: selected.tableId,
      status: 'confirmed',
    };

    // 3. CUSTOMER (100% SAFE)
    const customer: Customer = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || '',
      email: user.email,
    };

    // 4. CAFE (SAFE)
    const cafeData = {
      id: cafe.id,
      name: cafe.name,
      img: cafe.img,
      address: cafe.address,
      phone: cafe.phone,
    };

    // 5. PREORDER
    const preorder = {
      items: menuState.map(el => ({
        id: el.menuOrder.id,
        name: el.menuOrder.name,
        quantity: el.quantity ?? 0,
        price: el.menuOrder.price,
      })),

      totalAmount: menuState.reduce(
        (acc, el) => acc + el.menuOrder.price * (el.quantity ?? 0),
        0,
      ),

      currency: 'UAH',
    };

    // 6. API CALL
    try {
      setIsLoading(true);

      await dispatch(
        addUserReservationThunk({
          reservation,
          customer,
          cafe: cafeData,
          preorder,
        }),
      );

      await dispatch(
        updateCafeDetailsThunk({
          cafeId: cafe.id,
          newDate: reservation.date,
          newTableId: reservation.tableNumber,
          newStartTime: reservation.startTime,
        }),
      );

      dispatch(resetReservation());
      dispatch(clearOrder());
    } finally {
      setIsLoading(false);
      setBook(false);
    }
  };

  return (
    <div className={styles.cafe}>
      {cafeState.loading ? (
        <BackSkeleton />
      ) : (
        <button
          className={styles.cafe__back}
          aria-label="Back to prev page"
          onClick={() => navigate('/')}
        >
          <img src={ArrowLeft} alt="" aria-hidden="true" />
          Back
        </button>
      )}

      <div className={styles.cafe__container}>
        {cafeState.loading ? (
          <CafeHeaderSkeleton />
        ) : (
          <section className={styles.cafe__header}>
            <div className={styles.cafe__image}>
              <picture>
                <source media="(min-width: 639px)" srcSet={CardImageTablet} />
                <source media="(min-width: 1023px)" srcSet={CardImageDesktop} />

                <img
                  loading="lazy"
                  className={styles.cafe__mainImage}
                  src={CardImage}
                  alt="Cafe image"
                />
              </picture>
              <span className={styles.cafe__label}>See all photos</span>
            </div>

            <div className={styles.cafe__info}>
              <div className={styles.cafe__details}>
                <h2 className={styles.cafe__title}>{cafeState.cafe?.name}</h2>
                <div className={styles.cafe__infoWrapper}>
                  <div className={styles.cafe__detailsWrapper}>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconStar}></span>
                      {`${cafeState.cafe?.rating} (${reviewsState.reviews.length} reviews)`}
                    </p>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconClcok}></span>{' '}
                      {currentDayWorking?.openTime &&
                      currentDayWorking.closeTime
                        ? `${openTime}-${closeTime}`
                        : 'Closed'}
                    </p>
                  </div>
                  <div className={styles.cafe__detailsWrapper}>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconPin}></span>
                      {cafeState.cafe?.address}
                    </p>
                    <p className={styles.cafe__information}>
                      <span className={styles.cafe__iconPhone}></span>
                      {cafeState.cafe?.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.cafe__descriptions}>
                <article
                  className={classNames(`${styles.cafe__descriptionsDetails}`, {
                    [styles.cafe__descriptionsDetailsActive]: isDescriptionOpen,
                  })}
                >
                  {cafeState.cafe?.description}
                </article>
                <button
                  className={styles.cafe__viewAll}
                  onClick={() => setIsDescriptionOpen(prev => !prev)}
                >
                  VIew all
                </button>
              </div>

              <button
                className={styles.cafe__viewOnMap}
                onClick={() => openPlace(`${cafeState.cafe?.address}`)}
              >
                View on map
              </button>
            </div>
          </section>
        )}

        {cafeState.loading ? (
          <CafeMenuSkeleton />
        ) : (
          <CafeMenu
            cafeName={cafeState.cafe?.name as string}
            cafeId={cafeState.cafe?.id as number}
          />
        )}

        <div className={styles.cafe__reservations} id="reservation">
          <Details isModifiedDetails={true} cafeId={cafeId} />
          <button
            className={styles.cafe__apply}
            onClick={() => setBook(true)}
            disabled={menuState.length === 0}
          >
            Book
          </button>
        </div>

        {cafeState.loading ? (
          <CafeReviewsSkeleton />
        ) : (
          <CafeReviews
            cafeId={cafeState.cafe?.id as number}
            reviews={reviewsState.reviews}
            isLoadingState={reviewsState.loading}
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        {book && (
          <motion.div
            className={styles.test__Details}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className={styles.test__modal}
              initial={{ y: 60, scale: 0.96 }}
              animate={{ y: 0, scale: 0.98 }}
              exit={{ y: 60, scale: 0.96 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
              }}
            >
              <div className={styles.test}>
                <div className={styles.test__header}>
                  <img src={CheckIcon} alt="" className={styles.test__img} />
                  <p className={styles.test__title}>Booking details</p>
                </div>

                <p className={styles.test__info}>
                  You book table at Cafe Name.
                </p>

                <ul className={styles.test__list}>
                  <li className={styles.test__item}>
                    <img
                      src={SeatsIcon}
                      alt=""
                      className={styles.test__itemImg}
                    />
                    <p className={styles.test__itemInfo}>1 seat</p>
                  </li>
                  <li className={styles.test__item}>
                    <img
                      src={DateIcon}
                      alt=""
                      className={styles.test__itemImg}
                    />
                    <p className={styles.test__itemInfo}>Date: Sat, Jan 3</p>
                  </li>
                  <li className={styles.test__item}>
                    <img
                      src={TimeIcon}
                      alt=""
                      className={styles.test__itemImg}
                    />
                    <p className={styles.test__itemInfo}>Time: 12:45</p>
                  </li>
                </ul>

                <div className={styles.test__buttons}>
                  <button
                    className={styles.test__primary}
                    onClick={handleBook}
                    disabled={isLoading}
                  >
                    Done
                  </button>
                  <button
                    className={styles.test__secondary}
                    onClick={() => setBook(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
