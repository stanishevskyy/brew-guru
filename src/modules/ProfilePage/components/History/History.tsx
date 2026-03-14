import { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

import styles from './History.module.scss';

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
  const historyItems = [1, 2, 3, 4]; // Example data array
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <section className={styles.history}>
      <h4 className={styles.history__date}>Monday, 02.02.2026</h4>
      <div className={styles.history__cards}>
        {historyItems.map(item =>
          isLoading ? (
            <HistoryCafeSkeleton key={item} />
          ) : (
            <article
              key={item}
              className={styles.history__card}
              role="article"
              aria-labelledby={`history-${item}-title`}
              aria-describedby={`history-${item}-desc`}
            >
              <NavLink
                to="/search/cafeId"
                className={styles.history__cardLink}
                aria-label="Go to Black Honey cafe page"
              >
                <picture>
                  <source media="(min-width: 639px)" srcSet={CardImageLarge} />
                  <img
                    src={CardImage}
                    alt="Exterior of Black Honey cafe"
                    className={styles.history__cardImg}
                  />
                </picture>
                <span
                  className={styles.history__cardOverlay}
                  aria-hidden="true"
                ></span>
                <span className={styles.history__cardLabel} aria-hidden="true">
                  15% OFF
                </span>
              </NavLink>

              <div className={styles.history__bottom}>
                <div className={styles.history__wrapper}>
                  <p
                    id={`history-${item}-title`}
                    className={styles.history__cardTitle}
                  >
                    Black Honey
                  </p>
                  <button
                    className={styles.history__btnBin}
                    aria-label="Delete history entry"
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
                      Kryva Lypa, 3
                    </p>
                  </div>
                  <div className={styles.history__wrappTime}>
                    <img
                      src={ClockIcon}
                      alt="Cafe hours"
                      className={styles.history__timeIcon}
                    />
                    <p className={styles.history__timeInfo}>9:00-21:00</p>
                  </div>
                </div>

                <div className={styles.history__buttons}>
                  <button
                    className={styles.history__button}
                    aria-label="Go to Black Honey cafe page"
                  >
                    Go to cafe page
                  </button>
                  <p className={styles.history__time}>12:42</p>
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
};
