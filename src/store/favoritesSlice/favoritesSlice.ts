/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Favorites } from '../../shared/types/favorites/favorites';
import { userFavoritesService } from '../../services/userFavoritesService';

export interface FavoritesState {
  userFavorite: Favorites | null;
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  userFavorite: null,
  loading: false,
  error: null,
};

export const fetchUserFavoritesCafe = createAsyncThunk<
  Favorites | null,
  number,
  { rejectValue: string }
>('favorites/fetchFavorites', async (userId, { rejectWithValue }) => {
  try {
    return await userFavoritesService.getUserFavorites(userId);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : 'Failed to fetch user favorite cafe',
    );
  }
});

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserFavoritesCafe.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFavoritesCafe.fulfilled, (state, action) => {
        state.loading = false;
        state.userFavorite = action.payload;
      })
      .addCase(fetchUserFavoritesCafe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});
