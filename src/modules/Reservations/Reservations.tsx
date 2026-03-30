import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Reservations.module.scss';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
// eslint-disable-next-line max-len
import { fetchUserReservationsThunk } from '../../store/userReservationsSlice/userReservationsSlice';

import { DetailsType } from '../../shared/types/DetailsType';

import { Details } from '../../shared/components/Details';
import { CancelConfirm } from './components/CancelConfirm';
import { ReservationCard } from './components/ReservationCard';
import { CancelDetails } from './components/CancelDetails';
import { CheckStage } from './components/CheckStage';
//eslint-disable-next-line
import { ReservationsSkeleton } from '../../shared/components/ReservationsSkeleton';

export const Reservations: React.FC = () => {
  const [openDetails, setOpenDetails] = useState<DetailsType>(null);

  const userId = useAppSelector(state => state.user.user?.id);
  const reservationsState = useAppSelector(state => state.userReservations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserReservationsThunk(userId as number));
  }, []);

  const [openModal, setOpenModal] = useState<number | null>(null);

  const reserv = reservationsState.reservations.find(r => +r.id === openModal);

  return (
    <div className={styles.reserv} style={{ position: 'relative' }}>
      <div className={styles.reserv__container}>
        <h3 className={styles.reserv__Title}>Your reservations</h3>
        {reservationsState.reservations.map(reservations =>
          reservationsState.loading ? (
            <ReservationsSkeleton key={reservations.id} />
          ) : (
            <ReservationCard
              key={reservations.id}
              reservations={reservations}
              onOpenDetails={() => setOpenDetails('details')}
              onOpenCancelConfirm={() => setOpenDetails('cancelConfirm')}
              onOpenCancelDetails={() => setOpenDetails('cancelDetails')}
              onOpenCheckStage={() => setOpenDetails('checkStage')}
              setOpenModal={setOpenModal}
            />
          ),
        )}
      </div>

      <AnimatePresence mode="wait">
        {openDetails && (
          <motion.div
            className={styles.reserv__Details}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className={styles.reser__modal}
              initial={{ y: 60, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 60, scale: 0.96 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
              }}
            >
              {openDetails === 'details' && (
                <Details
                  cafeId={reserv?.cafe.id.toString()}
                  onClose={() => setOpenDetails(null)}
                  isModifiedDetails={false}
                  reserv={reserv}
                />
              )}
              {openDetails === 'cancelConfirm' && (
                <CancelConfirm onClose={() => setOpenDetails(null)} />
              )}
              {openDetails === 'cancelDetails' && (
                <CancelDetails onClose={() => setOpenDetails(null)} />
              )}
              {openDetails === 'checkStage' && reserv && (
                <CheckStage onClose={() => setOpenDetails(null)} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
