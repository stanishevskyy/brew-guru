/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Favorites } from '../../shared/types/favorites/favorites';
import { userFavoritesService } from '../../services/userFavoritesService';
import { CafeCardInfo } from '../../shared/types/shared/cafeCardInfo';

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

export const addUserFavoritesCafeThunk = createAsyncThunk<
  Favorites | null,
  { userId: number; favoriteCafe: CafeCardInfo },
  { rejectValue: string }
>(
  'favorites/addFavorite',
  async ({ userId, favoriteCafe }, { rejectWithValue }) => {
    try {
      return await userFavoritesService.addUserFavorite(userId, favoriteCafe);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to add user favorite cafe',
      );
    }
  },
);

export const deleteUserFavoritesCafeThunk = createAsyncThunk<
  Favorites | null,
  { userId: number; favoriteId: number },
  { rejectValue: string }
>(
  'favorites/deleteFavorite',
  async ({ userId, favoriteId }, { rejectWithValue }) => {
    try {
      return await userFavoritesService.deleteUserFavorite(userId, favoriteId);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to delete user favorite cafe',
      );
    }
  },
);

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
      })
      .addCase(addUserFavoritesCafeThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserFavoritesCafeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userFavorite = action.payload;
      })
      .addCase(addUserFavoritesCafeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add favorite';
      })
      .addCase(deleteUserFavoritesCafeThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserFavoritesCafeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userFavorite = action.payload;
      })
      .addCase(deleteUserFavoritesCafeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete favorite';
      });
  },
});
