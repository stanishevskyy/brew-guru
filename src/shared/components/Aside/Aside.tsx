import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import classNames from 'classnames';

import styles from './Aside.module.scss';

import { getClassLink } from '../../utils/getActiveClass';

import LogoIcon from '../../../assets/icons/header-icons/logo-icon.svg';
import CloseIcon from '../../../assets/icons/header-icons/close-icon.svg';

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

export const Aside: React.FC<Props> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  return (
    <aside
      className={classNames(`${styles.aside}`, {
        [styles.asideActive]: isSidebarOpen,
      })}
    >
      <header className={styles.aside__header}>
        <Link to="/" className={styles.aside__logoLink}>
          <img src={LogoIcon} alt="Logo" className={styles.aside__logo} />
        </Link>

        <button
          className={styles.header__close}
          aria-label="Close menu"
          onClick={() => setIsSidebarOpen(false)}
        >
          <img
            src={CloseIcon}
            alt="Close menu"
            className={styles.header__closeImg}
            aria-hidden="true"
          />
        </button>
      </header>
      <nav className={styles.aside__nav}>
        <ul className={styles.aside__list}>
          <li className={styles.aside__item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                getClassLink({
                  isActive,
                  baseClass: styles.aside__link,
                  activeClass: styles.aside__linkActive,
                })
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              HOME
            </NavLink>
          </li>
          <li className={styles.aside__item}>
            <NavLink
              to="/reservations"
              className={({ isActive }) =>
                getClassLink({
                  isActive,
                  baseClass: styles.aside__link,
                  activeClass: styles.aside__linkActive,
                })
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              RESERVATIONS
            </NavLink>
          </li>
          <li className={styles.aside__item}>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                getClassLink({
                  isActive,
                  baseClass: styles.aside__link,
                  activeClass: styles.aside__linkActive,
                })
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              ABOUT US
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
