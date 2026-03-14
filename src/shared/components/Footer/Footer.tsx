import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

import CopyIcon from '../../../assets/icons/footer-icons/copy-icon.svg';
import FacebookIcon from '../../../assets/icons/footer-icons/facebook-icon.svg';
// eslint-disable-next-line
import InstagramIcon from '../../../assets/icons/footer-icons/instagram-icon.svg';
import TelegramIcon from '../../../assets/icons/footer-icons/telegram-icon.svg';

export const Footer = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optional: you can add a toast/alert for confirmation
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__contact}>
          <h4 className={styles.footer__contactTitle}>Contact us</h4>
          <p className={styles.footer__contactDesc}>
            Let’s discuss your vision with us
          </p>

          <div className={styles.footer__contactMailWrapper}>
            <div className={styles.footer__contactMailInfo}>
              CafeMatch@example.com
            </div>
            <button
              className={styles.footer__contactMailCopy}
              onClick={() => handleCopy('CafeMatch@example.com')}
              aria-label="Copy email address"
            >
              <img
                src={CopyIcon}
                alt=""
                className={styles.footer__contactMailCopyImg}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className={styles.footer__infoWrapper}>
          <div className={styles.footer__links}>
            <h3 className={styles.footer__linksTitle}>Quick links</h3>
            <nav
              className={styles.footer__navLinks}
              aria-label="Quick links navigation"
            >
              <ul className={styles.footer__list}>
                <li className={styles.footer__item}>
                  <Link to="/" className={styles.footer__link}>
                    Home
                  </Link>
                </li>
                <li className={styles.footer__item}>
                  <Link to="/search" className={styles.footer__link}>
                    Search
                  </Link>
                </li>
                <li className={styles.footer__item}>
                  <Link to="/map" className={styles.footer__link}>
                    Map
                  </Link>
                </li>
                <li className={styles.footer__item}>
                  <Link to="/reservations" className={styles.footer__link}>
                    Reservations
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.footer__info}>
            <p className={styles.footer__infoTitle}>Information</p>
            <nav
              className={styles.footer__navInfo}
              aria-label="Information navigation"
            >
              <ul className={styles.footer__list}>
                <li className={styles.footer__item}>
                  <a href="/" className={styles.footer__link}>
                    Privacy policy
                  </a>
                </li>
                <li className={styles.footer__item}>
                  <a href="/" className={styles.footer__link}>
                    About us
                  </a>
                </li>
                <li className={styles.footer__item}>
                  <a href="/" className={styles.footer__link}>
                    Terms
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className={styles.footer__down}>
        <hr className={styles.footer__hr} />
        <div className={styles.footer__downWrapper}>
          <p className={styles.footer__desc}>CafeMatch All rights reserved</p>

          <nav className={styles.footer__nav} aria-label="Social media links">
            <ul className={styles.footer__navSocial}>
              <li className={styles.footer__socialLinkItem}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footer__socialLink}
                  aria-label="Visit our Facebook page"
                >
                  <img
                    src={FacebookIcon}
                    alt=""
                    className={styles.footer__socialLinkImg}
                    aria-hidden="true"
                  />
                </a>
              </li>

              <li className={styles.footer__socialLinkItem}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footer__socialLink}
                  aria-label="Visit our Instagram page"
                >
                  <img
                    src={InstagramIcon}
                    alt=""
                    className={styles.footer__socialLinkImg}
                    aria-hidden="true"
                  />
                </a>
              </li>

              <li className={styles.footer__socialLinkItem}>
                <a
                  href="https://telegram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footer__socialLink}
                  aria-label="Visit our Telegram channel"
                >
                  <img
                    src={TelegramIcon}
                    alt=""
                    className={styles.footer__socialLinkImg}
                    aria-hidden="true"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
