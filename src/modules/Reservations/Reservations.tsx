import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Reservations.module.scss';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <div className={styles.reserv} style={{ position: 'relative' }}>
      <div className={styles.reserv__container}>
        <h3 className={styles.reserv__Title}>Your reservations</h3>
        {isLoading ? (
          <ReservationsSkeleton />
        ) : (
          <ReservationCard
            onOpenDetails={() => setOpenDetails('details')}
            onOpenCancelConfirm={() => setOpenDetails('cancelConfirm')}
            onOpenCancelDetails={() => setOpenDetails('cancelDetails')}
            onOpenCheckStage={() => setOpenDetails('checkStage')}
          />
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
                  onClose={() => setOpenDetails(null)}
                  isModifiedDetails={false}
                />
              )}
              {openDetails === 'cancelConfirm' && (
                <CancelConfirm onClose={() => setOpenDetails(null)} />
              )}
              {openDetails === 'cancelDetails' && (
                <CancelDetails onClose={() => setOpenDetails(null)} />
              )}
              {openDetails === 'checkStage' && (
                <CheckStage onClose={() => setOpenDetails(null)} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
