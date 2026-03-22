/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit';

import { CafeDetails } from '../../shared/types/cafeDetails/cafeDetails';

export interface CafesState {
  cafe: CafeDetails;
  loading: boolean;
  error: string | null;
}

const initialState: CafesState = {
  cafe: {} as CafeDetails,
  loading: false,
  error: null,
};

export const cafeDetailsSlice = createSlice({
  name: 'cafeDetails',
  initialState,
  reducers: {},
});
