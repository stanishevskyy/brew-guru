/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Slot = {
  date: string;
  tableId: number;
  tableName: string;
  seats: number;
  startTime: string;
  endTime: string;
};

export interface ReservationState {
  seats: number;
  date: string;
  time: string;
  selectedTable: Slot | null;
}

const initialState: ReservationState = {
  seats: 1,
  date: '',
  time: '',
  selectedTable: null,
};

export const tableReservationSlice = createSlice({
  name: 'tableReservation',
  initialState,
  reducers: {
    setSeats: (state, action: PayloadAction<number>) => {
      if (state.seats === action.payload) {
        return;
      }

      state.seats = action.payload;

      state.time = '';
      state.selectedTable = null;
    },

    setDate: (state, action: PayloadAction<string>) => {
      if (state.date === action.payload) {
        return;
      }

      state.date = action.payload;

      state.time = '';
      state.selectedTable = null;
    },

    setTime: (state, action: PayloadAction<string>) => {
      if (state.time === action.payload) {
        return;
      }

      state.time = action.payload;

      state.selectedTable = null;
    },

    setSelectedTable: (state, action: PayloadAction<Slot | null>) => {
      state.selectedTable = action.payload;
    },
    resetReservation: () => initialState,
  },
});

export const {
  setSeats,
  setDate,
  setTime,
  setSelectedTable,
  resetReservation,
} = tableReservationSlice.actions;

export default tableReservationSlice.reducer;
