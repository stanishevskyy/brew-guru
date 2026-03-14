import { Outlet } from 'react-router-dom';

import styles from './Register.module.scss';

export const Register = () => {
  return (
    <section className={styles.register} aria-labelledby="register-title">
      <Outlet />
    </section>
  );
};
