import styles from './MenuAddButton.module.scss';

//eslint-disable-next-line
import MinusIcon from '../../../../../assets/icons/menu-icons/minus-icon.svg';
import PlusIcon from '../../../../../assets/icons/menu-icons/plus-icon.svg';

export const MenuAddButton = () => {
  return (
    <div className={styles.menu__orderCounter}>
      <div className={styles.menu__counterControls}>
        <button className={styles.menu__decreaseBtn}>
          <img src={MinusIcon} alt="Decrease quantity" />
        </button>

        <p className={styles.menu__quantity}>1</p>

        <button className={styles.menu__increaseBtn}>
          <img src={PlusIcon} alt="Increase quantity" />
        </button>
      </div>

      <button className={styles.menu__addBtn}>Add: 11.50$</button>
    </div>
  );
};
