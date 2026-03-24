/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';

import styles from './MenuAddButton.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
// eslint-disable-next-line max-len
import {
  addMenuToOrder,
  updateMenuQuantity,
} from '../../../../../store/menuOrderSlice/menuOrderSlice';

import { Dish } from '../../../../types/menu/menuItem';

//eslint-disable-next-line
import MinusIcon from '../../../../../assets/icons/menu-icons/minus-icon.svg';
import PlusIcon from '../../../../../assets/icons/menu-icons/plus-icon.svg';

type Props = {
  menuDescription: Dish;
  setIsInfoMenuOpen: (value: number | null) => void;
};

export const MenuAddButton: React.FC<Props> = ({
  menuDescription,
  setIsInfoMenuOpen,
}) => {
  const [quantity, setQuantity] = useState(1);
  const menuOrderState = useAppSelector(state => state.menuOrder);
  const dispatch = useAppDispatch();
  const menuOrderInState = menuOrderState.find(
    m => m.menuOrder.id === menuDescription.id,
  );
  const priceToAdd = menuDescription?.discount
    ? Math.trunc(
        menuDescription?.price * (1 - (menuDescription?.discount ?? 0) / 100),
      ) * quantity
    : menuDescription.price * quantity;

  const handleMenuOrder = () => {
    if (menuOrderInState && menuOrderInState.quantity !== quantity) {
      dispatch(
        updateMenuQuantity({ id: menuDescription.id, amount: quantity }),
      );
    } else {
      const menuToOrder = {
        id: Date.now(),
        quantity,
        menuOrder: menuDescription,
      };

      dispatch(addMenuToOrder(menuToOrder));
    }

    setIsInfoMenuOpen(null);
  };

  return (
    <div className={styles.menu__orderCounter}>
      <div className={styles.menu__counterControls}>
        <button
          className={styles.menu__decreaseBtn}
          disabled={quantity === 1}
          onClick={() => setQuantity(prev => prev - 1)}
        >
          <img src={MinusIcon} alt="Decrease quantity" />
        </button>

        <p className={styles.menu__quantity}>{quantity}</p>

        <button
          className={styles.menu__increaseBtn}
          onClick={() => setQuantity(prev => prev + 1)}
        >
          <img src={PlusIcon} alt="Increase quantity" />
        </button>
      </div>

      <button className={styles.menu__addBtn} onClick={handleMenuOrder}>
        {`Add: ${priceToAdd}₴`}
      </button>
    </div>
  );
};
