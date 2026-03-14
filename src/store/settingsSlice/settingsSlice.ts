/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserSettings } from '../../shared/types/user/user-settings.type';
import { userSettingsService } from '../../services/userSettingsService';

export interface SettingsState {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null,
};

export const fetchUserSettingsThunk = createAsyncThunk<
  UserSettings | null,
  number,
  { rejectValue: string }
>('settings/fetchUserSettings', async (userId, { rejectWithValue }) => {
  try {
    const settings = await userSettingsService.getUserSettings(userId);

    if (!settings) {
      return userSettingsService.createUserSettings(userId);
    }

    return settings;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch user settings',
    );
  }
});

export const updateUserSettingsThunk = createAsyncThunk<
  UserSettings,
  UserSettings,
  { rejectValue: string }
>(
  'settings/updateUserSettings',
  async (updatedSettings, { rejectWithValue }) => {
    try {
      return await userSettingsService.updateSettings(updatedSettings);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to update user settings',
      );
    }
  },
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserSettingsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSettingsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.settings = action.payload;
      })
      .addCase(fetchUserSettingsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      })
      .addCase(updateUserSettingsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserSettingsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.error = null;
      })
      .addCase(updateUserSettingsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});
