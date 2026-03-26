/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userReservations } from '../../services/userReservations';

import { Booking } from '../../shared/types/reservations/booking';

export interface ReservationsState {
  reservations: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationsState = {
  reservations: [],
  loading: false,
  error: null,
};

export const fetchUserReservationsThunk = createAsyncThunk<
  Booking[],
  number,
  { rejectValue: string }
>('userReservations/fetchReservations', async (userId, { rejectWithValue }) => {
  try {
    return await userReservations.getUserReservations(userId);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed load users reservations',
    );
  }
});

export const userReservationsSlice = createSlice({
  name: 'userReservations',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserReservationsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReservationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reservations = action.payload;
      })
      .addCase(fetchUserReservationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});
