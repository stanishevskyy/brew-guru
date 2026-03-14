import styles from './AboutUsPage.module.scss';

import Mobile from '../../assets/images/about-us-images/about-us-tablet.png';
import Tablet from '../../assets/images/about-us-images/about-us-tablet.png';
import Desktop from '../../assets/images/about-us-images/about-us-desktop.png';
//eslint-disable-next-line
import DesktopExtra from '../../assets/images/about-us-images/about-us-desktop-extra.png';
import Wifi from '../../assets/icons/about-us-icons/wifi-icon.svg';
import Socket from '../../assets/icons/about-us-icons/socket-icon.svg';
import Chair from '../../assets/images/about-us-images/chair.png';
import Coffee from '../../assets/images/about-us-images/coffee.png';
import Laptop from '../../assets/images/about-us-images/laptop.png';

export const AboutUsPage = () => {
  return (
    <div className={styles.aboutUs} role="main">
      <header className={styles.aboutUs__content}>
        <h1 className={styles.aboutUs__title}>
          Cafe booking service{' '}
          <span className={styles.aboutUs__titleSpec}>
            for the modern people
          </span>
        </h1>

        <div className={styles.aboutUs__mainImage}>
          <picture>
            <source media="(min-width: 639px)" srcSet={Tablet} />
            <source media="(min-width: 1023px)" srcSet={Desktop} />
            <source media="(min-width: 1440px)" srcSet={DesktopExtra} />

            <img
              loading="lazy"
              className={styles.cafe__image}
              src={Mobile}
              alt="Cafe image"
            />
          </picture>
          <div className={styles.aboutUs__label}>
            <p className={styles.aboutUs__text}>Reserved for Alex!</p>
            <ul className={styles.aboutUs__list}>
              <li className={styles.aboutUs__item}>
                <img src={Wifi} alt="" className={styles.aboutUs__itemIcon} />
                Fast WI-FI
              </li>
              <li className={styles.aboutUs__item}>
                <img src={Socket} alt="" className={styles.aboutUs__itemIcon} />
                Sockets
              </li>
            </ul>
          </div>
        </div>

        <p className={styles.aboutUs__description}>
          Looking for a cafe booking service with guaranteed seating, smart
          workspace filters and hassle-free reservations?
        </p>

        <div className={styles.aboutUs__cardsContainer}>
          <p className={styles.aboutUs__cardsTitle}>Why Book with CafeMatch?</p>

          <section className={styles.aboutUs__cards}>
            <article className={styles.aboutUs__card}>
              <img src={Chair} alt="" className={styles.aboutUs__cardImage} />

              <div className={styles.aboutUs__cardInfo}>
                <p className={styles.aboutUs__cardTitle}>Guaranteed Seating</p>
                <p className={styles.aboutUs__cardDescription}>
                  Filter cafes based on your specific needs, such as Wi-Fi,
                  available outlets, quiet areas, or pet-friendly areas
                </p>
              </div>
            </article>
            <article className={styles.aboutUs__card}>
              <img src={Coffee} alt="" className={styles.aboutUs__cardImage} />

              <div className={styles.aboutUs__cardInfo}>
                <p className={styles.aboutUs__cardTitle}>Business support</p>
                <p className={styles.aboutUs__cardDescription}>
                  Book a table in advance. Never worry about wandering around
                  looking for a free seat again.
                </p>
              </div>
            </article>
            <article className={styles.aboutUs__card}>
              <img src={Laptop} alt="" className={styles.aboutUs__cardImage} />

              <div className={styles.aboutUs__cardInfo}>
                <p className={styles.aboutUs__cardTitle}>Workspaces</p>
                <p className={styles.aboutUs__cardDescription}>
                  Discover hidden neighborhood gems and help support independent
                  coffee shops in your city.
                </p>
              </div>
            </article>
          </section>
        </div>
      </header>
      <footer className={styles.aboutUs__footer}>
        <p className={styles.aboutUs__footerTitle}>Are You a Cafe Owner ?</p>
        <p className={styles.aboutUs__footerDescription}>
          Join the CafeMatch to optimize your seating, attract remote workers
          during off-peak hours, and grow your local community
        </p>
        <button className={styles.aboutUs__button}>Partner With Us</button>
      </footer>
    </div>
  );
};
