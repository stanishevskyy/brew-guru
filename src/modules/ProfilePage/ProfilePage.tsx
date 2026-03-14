import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';

import styles from './ProfilePage.module.scss';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserHistoryThunk } from '../../store/historySlice/historySlice';

import { getClassLink } from '../../shared/utils/getActiveClass';

//eslint-disable-next-line
import { ProfileDropDownSkeleton } from '../../shared/components/ProfileDropDownSkeleton';
//eslint-disable-next-line
import { ProfileAccountSkeleton } from '../../shared/components/ProfileAccountSkeleton';
import { ChangePhotoModal } from './components/ChangePhotoModal';

import AvatarMobile from '../../assets/images/profile-images/avatar-mobile.png';
//eslint-disable-next-line
import AvatarAll from '../../assets/images/profile-images/avatar-tablet-more.png';

export const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const userState = useAppSelector(state => state.user);
  const userHistories = useAppSelector(state => state.history.history);
  const dispatch = useAppDispatch();

  const [isNavSelectOpen, setIsNavSelectOpen] = useState(false);
  const [isChangePhotoOpen, setIsChangePhotoOpen] = useState(false);

  const isHistoryDisabled = userHistories.length === 0;
  const [isHistoryLabelOpen, setIsHistoryLabelOpen] = useState(false);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUserHistoryThunk(userState.user?.id as number));
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
                      onClick={() => setIsNavSelectOpen(false)}
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
                      onClick={() => setIsNavSelectOpen(false)}
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
                    {isHistoryDisabled ? (
                      <div
                        className={styles.profile__disableItem}
                        onClick={() => {
                          setIsHistoryLabelOpen(true);

                          const timer = setTimeout(() => {
                            setIsHistoryLabelOpen(false);
                          }, 1500);

                          return () => clearTimeout(timer);
                        }}
                      >
                        History
                      </div>
                    ) : (
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
                        onClick={() => setIsNavSelectOpen(false)}
                      >
                        History
                      </NavLink>
                    )}
                    {isHistoryLabelOpen && (
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
                      onClick={() => setIsNavSelectOpen(false)}
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
              {isHistoryDisabled ? (
                <div
                  className={styles.profile__disableItem}
                  onMouseOver={() => setIsHistoryLabelOpen(true)}
                  onMouseLeave={() => setIsHistoryLabelOpen(false)}
                >
                  History
                </div>
              ) : (
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
              )}
              {isHistoryLabelOpen && (
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
        {isLoading || userState.loading ? (
          <ProfileAccountSkeleton />
        ) : (
          <article className={styles.profile__accountInfo}>
            {userState.user?.img ? (
              <img
                src={userState.user?.img}
                alt="User avatar1221421"
                className={styles.profile__img}
              />
            ) : (
              <img
                src={AvatarMobile}
                srcSet={`${AvatarAll} 640w, ${AvatarAll} 1200w`}
                sizes="(max-width: 640px) 100vw, 1200px"
                alt="User avatar"
                className={styles.profile__img}
              />
            )}

            <div className={styles.profile__acoountWprapper}>
              <p className={styles.profile__accountName}>
                <span>{userState.user?.firstName}</span>{' '}
                <span>{userState.user?.lastName}</span>
              </p>
              <p className={styles.profile__accountEmail}>
                {userState.user?.email}
              </p>
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
      {isChangePhotoOpen && (
        <ChangePhotoModal setIsChangePhotoOpen={setIsChangePhotoOpen} />
      )}

      <Outlet />
    </main>
  );
};
