/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../shared/types/user/user.type';

export interface RegistrationState {
  data: Partial<User>;
}

const initialState: RegistrationState = {
  data: {},
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    updateData(state, action: PayloadAction<Partial<User>>) {
      state.data = { ...state.data, ...action.payload };
    },
    resetRegistration(state) {
      state.data = {};
    },
  },
});

export const { updateData, resetRegistration } = registrationSlice.actions;

export default registrationSlice.reducer;
