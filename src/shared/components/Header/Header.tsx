import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Header.module.scss';

import { getClassLink } from '../../utils/getActiveClass';

// eslint-disable-next-line
import HamburgerIcon from '../../../assets/icons/header-icons/hamburger-icon.svg';
import LogoIcon from '../../../assets/icons/header-icons/logo-icon.svg';
// eslint-disable-next-line
import FavoritesIcon from '../../../assets/icons/header-icons/favorites-icon.svg';
import ProfileIcon from '../../../assets/icons/header-icons/profile-icon.svg';

type Props = {
  isFavoritesOpen: boolean;
  isOrdersOpen: boolean;
  setIsFavoritesOpen: (value: boolean) => void;
  setIsSidebarOpen: (value: boolean) => void;
};

export const Header: React.FC<Props> = ({
  isFavoritesOpen,
  isOrdersOpen,
  setIsFavoritesOpen,
  setIsSidebarOpen,
}) => {
  return (
    <header
      className={classNames(`${styles.header}`, {
        [styles.headerActive]: isFavoritesOpen || isOrdersOpen,
      })}
    >
      <div className={styles.header__container}>
        <div className={styles.header__wrapperMenuLogo}>
          <button
            className={styles.header__menuLink}
            aria-label="Open menu"
            aria-expanded={isOrdersOpen || isFavoritesOpen}
            aria-controls="sidebar-menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            <img
              src={HamburgerIcon}
              alt=""
              className={styles.header__menuImg}
              aria-hidden="true"
            />
          </button>

          <Link
            to="/"
            className={styles.header__logoLink}
            aria-label="Go to homepage"
          >
            <img
              src={LogoIcon}
              alt=""
              className={styles.header__logo}
              aria-hidden="true"
            />
          </Link>
        </div>

        <nav
          className={styles.header__nav}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className={styles.header__list}>
            <li className={styles.header__item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                HOME
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/reservations"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                RESERVATIONS
              </NavLink>
            </li>
            <li className={styles.header__item}>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.header__link,
                    activeClass: styles.header__linkActive,
                  })
                }
              >
                ABOUT US
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.header__wrapper}>
          <button
            className={classNames(`${styles.header__favoritesBtn}`, {
              [styles.header__favoritesBtnActive]: isFavoritesOpen,
            })}
            aria-label="Open favorite cafes"
            aria-pressed={isFavoritesOpen}
            onClick={() => setIsFavoritesOpen(true)}
          >
            <img
              src={FavoritesIcon}
              alt=""
              className={styles.header__favoritesBtnImg}
              aria-hidden="true"
            />
          </button>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              getClassLink({
                isActive,
                baseClass: styles.header__profileLink,
                activeClass: styles.header__profileLinkActive,
              })
            }
            aria-label="Go to profile"
          >
            <img
              src={ProfileIcon}
              alt=""
              className={styles.header__profileImg}
              aria-hidden="true"
            />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
