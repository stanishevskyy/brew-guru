import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import styles from './History.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
//eslint-disable-next-line
import {
  deleteHistoryItemThunk,
  fetchUserHistoryThunk,
} from '../../../../store/historySlice/historySlice';

import { getWeekdayFromDate } from './utils/getWeekdayFromDate';
import { getOpeningHour } from './utils/getOpeningHour';
import { formatTime } from '../../../../shared/utils/formatTime';

import CardImage from '../../../../assets/images/history-images/card-image.png';
//eslint-disable-next-line
import CardImageLarge from '../../../../assets/images/history-images/card-image-tablet-more.png';
//eslint-disable-next-line
import LocationIcon from '../../../../assets/icons/history-icons/location-pin-icon.svg';
//eslint-disable-next-line
import ClockIcon from '../../../../assets/icons/history-icons/clock-icon.svg';
//eslint-disable-next-line
import BinIcon from '../../../../assets/icons/history-icons/bin-icon.svg';
//eslint-disable-next-line
import { HistoryCafeSkeleton } from '../../../../shared/components/HistoryCafeSkeleton';

export const History = () => {
  const userState = useAppSelector(state => state.user.user);
  const userHistories = useAppSelector(state => state.history);
  const dispatch = useAppDispatch();

  const handleDeleteHistory = async (id: number) => {
    await dispatch(deleteHistoryItemThunk(id));
  };

  useEffect(() => {
    dispatch(fetchUserHistoryThunk(userState?.id as number));
  }, []);

  if (userHistories.history.length === 0) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      {userHistories.history.map(history => (
        <section className={styles.history} key={history.id}>
          <h4
            className={styles.history__date}
          >{`${getWeekdayFromDate(history.date)}, ${history.date}`}</h4>
          <div className={styles.history__cards}>
            {history.items.map(item =>
              userHistories.loading ? (
                <HistoryCafeSkeleton key={item.id} />
              ) : (
                <article
                  key={item.id}
                  className={styles.history__card}
                  role="article"
                  aria-labelledby={`history-${item}-title`}
                  aria-describedby={`history-${item}-desc`}
                >
                  <div className={styles.history__cardLink}>
                    {!item.cafe.img ? (
                      <img
                        src={item.cafe.img}
                        alt="Exterior of Black Honey cafe"
                        className={styles.history__cardImg}
                      />
                    ) : (
                      <picture>
                        <source
                          media="(min-width: 639px)"
                          srcSet={CardImageLarge}
                        />
                        <img
                          src={CardImage}
                          alt="Exterior of Black Honey cafe"
                          className={styles.history__cardImg}
                        />
                      </picture>
                    )}
                    <span
                      className={styles.history__cardOverlay}
                      aria-hidden="true"
                    ></span>
                  </div>

                  <div className={styles.history__bottom}>
                    <div className={styles.history__wrapper}>
                      <p
                        id={`history-${item}-title`}
                        className={styles.history__cardTitle}
                      >
                        {item.cafe.name}
                      </p>
                      <button
                        className={styles.history__btnBin}
                        aria-label="Delete history entry"
                        onClick={() => handleDeleteHistory(item.id)}
                      >
                        <img
                          src={BinIcon}
                          alt=""
                          aria-hidden="true"
                          className={styles.history__bin}
                        />
                      </button>
                    </div>

                    <div
                      id={`history-${item}-desc`}
                      className={styles.history__wrappInfo}
                    >
                      <div className={styles.history__wrappLocation}>
                        <img
                          src={LocationIcon}
                          alt="Cafe location"
                          className={styles.history__locationIcon}
                        />
                        <p className={styles.history__locationInfo}>
                          {item.cafe.address}
                        </p>
                      </div>
                      <div className={styles.history__wrappTime}>
                        <img
                          src={ClockIcon}
                          alt="Cafe hours"
                          className={styles.history__timeIcon}
                        />
                        <p className={styles.history__timeInfo}>
                          {getOpeningHour(item.cafe.openingHours)}
                        </p>
                      </div>
                    </div>

                    <div className={styles.history__buttons}>
                      <button
                        className={styles.history__button}
                        aria-label="Go to Black Honey cafe page"
                      >
                        Go to cafe page
                      </button>
                      <p className={styles.history__time}>
                        {formatTime(item.time)}
                      </p>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>
      ))}
    </>
  );
};
