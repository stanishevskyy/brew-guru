/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UserHistory } from '../../shared/types/user/user-history.type';
import { userHistoryService } from '../../services/userHistoryService';

export interface HistoryState {
  history: UserHistory[];
  loading: boolean;
  error: string | null;
}

const initialState: HistoryState = {
  history: [],
  loading: false,
  error: null,
};

export const fetchUserHistoryThunk = createAsyncThunk<
  UserHistory[],
  number,
  { rejectValue: string }
>('history/fetchUserHistory', async (userId, { rejectWithValue }) => {
  try {
    return await userHistoryService.getUserHistory(userId);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch user history',
    );
  }
});

export const addHistoryItemThunk = createAsyncThunk<
  UserHistory,
  UserHistory,
  { rejectValue: string }
>('history/addHistoryItem', async (item, { rejectWithValue }) => {
  try {
    return await userHistoryService.addHistoryItem(item);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to add history item',
    );
  }
});

export const deleteHistoryItemThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('history/deleteHistoryItem', async (id, { rejectWithValue }) => {
  try {
    await userHistoryService.deleteHistoryItem(id);

    return id;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to delete history item',
    );
  }
});

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserHistoryThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserHistoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.history = action.payload;
      })
      .addCase(fetchUserHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      })
      .addCase(addHistoryItemThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHistoryItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.history.push(action.payload);
      })
      .addCase(addHistoryItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      })
      .addCase(deleteHistoryItemThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHistoryItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const itemId = action.payload;

        state.history = state.history
          .map(history => ({
            ...history,
            items: history.items.filter(item => item.id !== itemId),
          }))
          .filter(history => history.items.length > 0);
      })
      .addCase(deleteHistoryItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});
