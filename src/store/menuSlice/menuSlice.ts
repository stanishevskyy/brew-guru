/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { menuService } from '../../services/menuService';
import { MenuQueryParams } from '../../shared/types/menu/menuQueryParams';
import { MenuResponse } from '../../shared/types/menu/menuResponse';

export interface MenuState {
  menuInfo: MenuResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menuInfo: null,
  loading: false,
  error: null,
};

export const fetchCafeMenuThunk = createAsyncThunk<
  MenuResponse | null,
  { cafeId: number; params?: MenuQueryParams },
  { rejectValue: string }
>('menu/fetchMenu', async ({ cafeId, params }, { rejectWithValue }) => {
  try {
    return await menuService.getMenusByCafe(cafeId, params);
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
        state.menuInfo = action.payload;
      })
      .addCase(fetchCafeMenuThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});
