import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Dish } from '../../shared/types/menu/menuItem';

export interface MenuOrderItem {
  id: number;
  quantity: number;
  menuOrder: Dish;
}

export type MenuOrderState = MenuOrderItem[];

const initialState: MenuOrderState = [];

export const menuOrderSlice = createSlice({
  name: 'menuOrder',
  initialState,
  reducers: {
    addMenuToOrder: (state, action: PayloadAction<MenuOrderItem>) => {
      const existingItem = state.find(
        item => item.menuOrder.id === action.payload.menuOrder.id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    deleteMenuInOrder: (state, action: PayloadAction<number>) => {
      return state.filter(cart => cart.id !== action.payload);
    },
    updateMenuQuantity: (
      state,
      action: PayloadAction<{ id: number; amount: number }>,
    ) => {
      const item = state.find(cart => cart.menuOrder.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.amount;
      }
    },
    clearOrder: () => {
      return [];
    },
  },
});

export const {
  addMenuToOrder,
  deleteMenuInOrder,
  updateMenuQuantity,
  clearOrder,
} = menuOrderSlice.actions;

export default menuOrderSlice.reducer;
