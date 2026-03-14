import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './users/userSlice';
import { registrationSlice } from './registration/registrationSlice';
import { settingsSlice } from './settingsSlice/settingsSlice';

const rootReducer = combineSlices(userSlice, registrationSlice, settingsSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
