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

    // NEW
    newDate: string;
    newTableId: number;
    newStartTime: string;

    // OLD (optional — тільки для UPDATE)
    oldDate?: string;
    oldTableId?: number;
    oldStartTime?: string;
    oldEndTime?: string;
  },
  { rejectValue: string }
>('cafeDetails/updateCafeDetails', async (params, { rejectWithValue }) => {
  try {
    return await cafeDetailsService.updateCafeDetails(
      params.cafeId,

      // NEW
      params.newDate,
      params.newTableId,
      params.newStartTime,

      // OLD
      params.oldDate,
      params.oldTableId,
      params.oldStartTime,
      params.oldEndTime,
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
