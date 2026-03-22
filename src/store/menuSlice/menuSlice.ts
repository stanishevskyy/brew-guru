/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Menu } from '../../shared/types/menu/menu';
import { menuService } from '../../services/menuService';

export interface MenuState {
  menu: Menu | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menu: null,
  loading: false,
  error: null,
};

export const fetchCafeMenuThunk = createAsyncThunk<
  Menu | null,
  number,
  { rejectValue: string }
>('menu/fetchMenu', async (cafeId, { rejectWithValue }) => {
  try {
    return await menuService.getMenusByCafe(cafeId);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to load menu',
    );
  }
});

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCafeMenuThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCafeMenuThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.menu = action.payload;
      })
      .addCase(fetchCafeMenuThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});
