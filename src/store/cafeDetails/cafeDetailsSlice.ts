/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CafeDetails } from '../../shared/types/cafeDetails/cafeDetails';
import { Menu } from '../../shared/types/menu/menu';

import { cafeDetailsService } from '../../services/cafeDetailsService';
import { UserReview } from '../../shared/types/user/user-review.type';
import { CafeResponse } from '../../shared/types/cafeResponse/cafeResponse';

export interface CafesState {
  cafe: CafeDetails;
  menu: Menu | null;
  reviews: UserReview[];
  loading: boolean;
  error: string | null;
}

const initialState: CafesState = {
  cafe: {} as CafeDetails,
  menu: null,
  reviews: [],
  loading: false,
  error: null,
};

export const fetchCafeDetailsThunk = createAsyncThunk<
  CafeResponse,
  number,
  { rejectValue: string }
>('cafeDetails/fetchCafeDetails', async (cafeId, { rejectWithValue }) => {
  try {
    return await cafeDetailsService.getCafeDetails(cafeId);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch cafes details',
    );
  }
});

export const cafeDetailsSlice = createSlice({
  name: 'cafeDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCafeDetailsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCafeDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cafe = action.payload.cafe;
        state.menu = action.payload.menu;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchCafeDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});
