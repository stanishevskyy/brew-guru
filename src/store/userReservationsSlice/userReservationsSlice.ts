/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userReservations } from '../../services/userReservations';

import { Booking } from '../../shared/types/reservations/booking';
import { Reservation } from '../../shared/types/reservations/reservation';

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

export const addUserReservationThunk = createAsyncThunk<
  Booking,
  Omit<Booking, 'id'>,
  { rejectValue: string }
>(
  'userReservations/addReservation',
  async (newReservation, { rejectWithValue }) => {
    try {
      return await userReservations.addUserReservations(newReservation);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to add reservation',
      );
    }
  },
);

export const updateUserReservationThunk = createAsyncThunk<
  Booking,
  Reservation,
  { rejectValue: string }
>(
  'userReservations/updateReservation',
  async (updatedReservation, { rejectWithValue }) => {
    try {
      return await userReservations.updateUserReservations(updatedReservation);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update reservation',
      );
    }
  },
);

export const deleteUserReservationThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'userReservations/deleteReservation',
  async (reservationId, { rejectWithValue }) => {
    try {
      return await userReservations.deleteUserReservations(reservationId);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete reservation',
      );
    }
  },
);

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
      })
      .addCase(addUserReservationThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserReservationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
      })
      .addCase(addUserReservationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      })
      .addCase(updateUserReservationThunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.reservations.findIndex(
          r => r.id === action.payload.id,
        );

        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
      })
      .addCase(deleteUserReservationThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserReservationThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.reservations = state.reservations.filter(
          r => r.id !== action.payload,
        );
      })
      .addCase(deleteUserReservationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});
