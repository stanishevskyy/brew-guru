import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CafeMenu.module.scss';

import { useAppSelector } from '../../../../store/hooks';

import { CafeCardMenu } from '../CafeCardMenu';

import ArrowIcon from '../../../../assets/icons/menu-icons/arrow-icon.svg';

type Props = {
  cafeName: string;
  cafeId: number;
};

export const CafeMenu: React.FC<Props> = ({ cafeName, cafeId }) => {
  const menuState = useAppSelector(state => state.menu);

  return (
    <section className={styles.cardContainer}>
      <div className={styles.cardContainer__wrapper}>
        <div>
          <h4 className={styles.cardContainer__title}>Menu</h4>
          <p className={styles.cardContainer__info}>
            Pre-order is required to reserve a table
          </p>
        </div>

        <Link
          to={`/${cafeName}-${cafeId}/menu`}
          className={styles.cardContainer__btnWrapper}
        >
          <p className={styles.cardContainer__btnInfo}>See all</p>
          <img
            src={ArrowIcon}
            alt="Cafe"
            className={styles.cardContainer__btnInfoImage}
          />
        </Link>
      </div>
      <div className={styles.cardContainer__cards}>
        {menuState.menuInfo?.menu.items.slice(0, 6).map(menuItem => (
          <CafeCardMenu key={menuItem.id} menuItem={menuItem} />
        ))}
      </div>
    </section>
  );
};
