import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import classNames from 'classnames';

import styles from './ProfilePage.module.scss';

import { getClassLink } from '../../shared/utils/getActiveClass';

//eslint-disable-next-line
import { ProfileDropDownSkeleton } from '../../shared/components/ProfileDropDownSkeleton';
//eslint-disable-next-line
import { ProfileAccountSkeleton } from '../../shared/components/ProfileAccountSkeleton';

import AvatarMobile from '../../assets/images/profile-images/avatar-mobile.png';
//eslint-disable-next-line
import AvatarAll from '../../assets/images/profile-images/avatar-tablet-more.png';
import { ChangePhotoModal } from './components/ChangePhotoModal';

export const ProfilePage = () => {
  const [isNavSelectOpen, setIsNavSelectOpen] = useState(false);
  const [isChangePhotoOpen, setIsChangePhotoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (isChangePhotoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isChangePhotoOpen]);

  return (
    <main className={styles.profile}>
      <section className={styles.profile__header}>
        {/* Mobile dropdown */}
        {isLoading ? (
          <ProfileDropDownSkeleton />
        ) : (
          <article className={styles.profile__dropDown}>
            <button
              className={styles.profile__select}
              onClick={() => setIsNavSelectOpen(prev => !prev)}
              aria-haspopup="menu"
              aria-expanded={isNavSelectOpen}
              aria-label="Open profile navigation menu"
            >
              Profile
              <span
                className={classNames(`${styles.profile__selectIcon}`, {
                  [styles.profile__selectIconActive]: isNavSelectOpen,
                })}
              />
            </button>

            {isNavSelectOpen && (
              <nav
                className={styles.profile__navSelectMobile}
                role="menu"
                aria-label="Profile menu"
              >
                <ul className={styles.profile__listSelect}>
                  <li role="none" className={styles.profile__itemSelect}>
                    <NavLink
                      to="/profile"
                      end
                      role="menuitem"
                      className={({ isActive }) =>
                        getClassLink({
                          isActive,
                          baseClass: styles.profile__linkSelect,
                          activeClass: styles.profile__linkSelectMobileActive,
                        })
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li role="none" className={styles.profile__itemSelect}>
                    <NavLink
                      to="/profile/reviews"
                      end
                      role="menuitem"
                      className={({ isActive }) =>
                        getClassLink({
                          isActive,
                          baseClass: styles.profile__linkSelect,
                          activeClass: styles.profile__linkSelectMobileActive,
                        })
                      }
                    >
                      Reviews
                    </NavLink>
                    {false && (
                      <div className={styles.profile__message}>
                        This tab will become active when you have history.
                      </div>
                    )}
                  </li>
                  <li role="none" className={styles.profile__itemSelect}>
                    <NavLink
                      to="/profile/history"
                      end
                      role="menuitem"
                      className={({ isActive }) =>
                        getClassLink({
                          isActive,
                          baseClass: styles.profile__linkSelect,
                          activeClass: styles.profile__linkSelectMobileActive,
                        })
                      }
                    >
                      History
                    </NavLink>
                    {false && (
                      <div className={styles.profile__message}>
                        This tab will become active when you have history.
                      </div>
                    )}
                  </li>
                  <li role="none" className={styles.profile__itemSelect}>
                    <NavLink
                      to="/profile/settings"
                      end
                      role="menuitem"
                      className={({ isActive }) =>
                        getClassLink({
                          isActive,
                          baseClass: styles.profile__linkSelect,
                          activeClass: styles.profile__linkSelectMobileActive,
                        })
                      }
                    >
                      Settings
                    </NavLink>
                  </li>
                </ul>
              </nav>
            )}
          </article>
        )}

        {/* Desktop navigation */}
        <nav className={styles.profile__navSelectDesktop}>
          <ul className={styles.profile__listSelect}>
            <li className={styles.profile__itemSelect}>
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.profile__linkSelect,
                    activeClass: styles.profile__linkSelectActive,
                  })
                }
              >
                Profile
              </NavLink>
            </li>
            <li className={styles.profile__itemSelect}>
              <NavLink
                to="/profile/reviews"
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.profile__linkSelect,
                    activeClass: styles.profile__linkSelectActive,
                  })
                }
              >
                Reviews
              </NavLink>
              {false && (
                <div className={styles.profile__message}>
                  This tab will become active when you have history.
                </div>
              )}
            </li>
            <li className={styles.profile__itemSelect}>
              <NavLink
                to="/profile/history"
                end
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.profile__linkSelect,
                    activeClass: styles.profile__linkSelectActive,
                  })
                }
              >
                History
              </NavLink>
              {false && (
                <div className={styles.profile__message}>
                  This tab will become active when you have history.
                </div>
              )}
            </li>
            <li className={styles.profile__itemSelect}>
              <NavLink
                to="/profile/settings"
                end
                className={({ isActive }) =>
                  getClassLink({
                    isActive,
                    baseClass: styles.profile__linkSelect,
                    activeClass: styles.profile__linkSelectActive,
                  })
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Account info */}
        {isLoading ? (
          <ProfileAccountSkeleton />
        ) : (
          <article className={styles.profile__accountInfo}>
            <img
              src={AvatarMobile}
              srcSet={`${AvatarAll} 640w, ${AvatarAll} 1200w`}
              sizes="(max-width: 640px) 100vw, 1200px"
              alt="User avatar"
              className={styles.profile__img}
            />

            <div className={styles.profile__acoountWprapper}>
              <p className={styles.profile__accountName}>
                <span>Wade</span> <span>Warren</span>
              </p>
              <p className={styles.profile__accountEmail}>name@example.com</p>
              <button
                className={styles.profile__changePhoto}
                onClick={() => setIsChangePhotoOpen(true)}
              >
                Change photo
              </button>
            </div>
          </article>
        )}
      </section>
      {isChangePhotoOpen && <ChangePhotoModal />}

      <Outlet />
    </main>
  );
};
