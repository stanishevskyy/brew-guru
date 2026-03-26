import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './users/userSlice';
import { registrationSlice } from './registration/registrationSlice';
import { settingsSlice } from './settingsSlice/settingsSlice';
import { historySlice } from './historySlice/historySlice';
import { reviewsSlice } from './reviewsSlice/reviewsSlice';
import { reportsSlice } from './reportsSlice/reportsSlice';
import { cafesSlice } from './cafesSlice/cafesSlice';
import { favoritesSlice } from './favoritesSlice/favoritesSlice';
import { cafeDetailsSlice } from './cafeDetailsSlice/cafeDetailsSlice';
import { menuSlice } from './menuSlice/menuSlice';
import { menuOrderSlice } from './menuOrderSlice/menuOrderSlice';
// eslint-disable-next-line max-len
import { tableReservationSlice } from './tableReservationSlice/tableReservationSlice';
// eslint-disable-next-line max-len
import { userReservationsSlice } from './userReservationsSlice/userReservationsSlice';

const rootReducer = combineSlices(
  userSlice,
  registrationSlice,
  settingsSlice,
  historySlice,
  reviewsSlice,
  reportsSlice,
  cafesSlice,
  favoritesSlice,
  cafeDetailsSlice,
  menuSlice,
  menuOrderSlice,
  tableReservationSlice,
  userReservationsSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
