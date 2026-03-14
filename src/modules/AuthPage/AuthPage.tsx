import { Outlet } from 'react-router-dom';
import styles from './AuthPage.module.scss';

export const AuthPage = () => {
  return (
    <div className={styles.auth}>
      <Outlet />
    </div>
  );
};
