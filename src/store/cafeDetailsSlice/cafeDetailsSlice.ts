/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CafeDetails } from '../../shared/types/cafeDetails/cafeDetails';
import { cafeDetailsService } from '../../services/cafeDetailsService';

export interface CafesState {
  cafe: CafeDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: CafesState = {
  cafe: null,
  loading: false,
  error: null,
};

export const fetchCafeDetailsThunk = createAsyncThunk<
  CafeDetails | null,
  number,
  { rejectValue: string }
>('cafeDetails/fetchCafeDetails', async (cafeId, { rejectWithValue }) => {
  try {
    return await cafeDetailsService.getCafeDetails(cafeId);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed load cafe details',
    );
  }
});

export const updateCafeDetailsThunk = createAsyncThunk<
  CafeDetails | undefined,
  {
    cafeId: number;
    date: string;
    tableId: number;
    startTime: string;
  },
  { rejectValue: string }
>('cafeDetails/updateCafeDetails', async (params, { rejectWithValue }) => {
  try {
    return await cafeDetailsService.updateCafeDetails(
      params.cafeId,
      params.date,
      params.tableId,
      params.startTime,
    );
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to update cafe details',
    );
  }
});

export const cafeDetailsSlice = createSlice({
  name: 'cafeDetails',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCafeDetailsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCafeDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cafe = action.payload;
      })
      .addCase(fetchCafeDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      })

      // 🔥 NEW
      .addCase(updateCafeDetailsThunk.fulfilled, (state, action) => {
        state.cafe = action.payload ?? null;
      });
  },
});
