import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './users/userSlice';
import { registrationSlice } from './registration/registrationSlice';
import { settingsSlice } from './settingsSlice/settingsSlice';
import { historySlice } from './historySlice/historySlice';

const rootReducer = combineSlices(
  userSlice,
  registrationSlice,
  settingsSlice,
  historySlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
