import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './users/userSlice';
import { registrationSlice } from './registration/registrationSlice';

const rootReducer = combineSlices(userSlice, registrationSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
