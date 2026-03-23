/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { cafesService } from '../../services/cafesService';

import { Cafe } from '../../shared/types/shared/cafe';
import { Cafes } from '../../shared/types/cafe/cafes';
import { CafeQueryParams } from '../../shared/types/cafe/cafeQueryParams';

export interface CafesState {
  cafes: Cafe[];
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

export const initialState: CafesState = {
  cafes: [],
  prevPage: null,
  nextPage: null,
  totalPages: 0,
  totalItems: 0,
  loading: false,
  error: null,
};

export const fetchCafesThunk = createAsyncThunk<
  Cafes,
  CafeQueryParams,
  { rejectValue: string }
>('cafes/fetchCafes', async (params, { rejectWithValue }) => {
  try {
    return await cafesService.getCafes(params);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch cafes',
    );
  }
});

export const cafesSlice = createSlice({
  name: 'cafes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCafesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCafesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cafes = action.payload.cafes;
        state.prevPage = action.payload.prevPage;
        state.nextPage = action.payload.nextPage;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCafesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch cafes';
      });
  },
});
