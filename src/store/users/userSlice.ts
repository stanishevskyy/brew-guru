/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../shared/types/user/user.type';

import { authService } from '../../services/authService';
import { userService } from '../../services/userService';

import {
  getCurrentUserFromStorage,
  removeCurrentUserFromStorage,
  saveCurrentUser,
} from '../../shared/utils/storage';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  stayLoggedIn: boolean;
}
const { user, stayLoggedIn } = getCurrentUserFromStorage();

const initialState: UserState = {
  user,
  loading: false,
  error: null,
  stayLoggedIn,
};

export const registerUserThunk = createAsyncThunk<
  {
    user: User;
    stayLoggedIn: boolean;
  },
  { newUser: Omit<User, 'id'>; stayLoggedIn: boolean },
  { rejectValue: string }
>(
  'user/registerUser',
  async ({ newUser, stayLoggedIn: stayLoggedInValue }, { rejectWithValue }) => {
    try {
      const userData = await authService.register(newUser);

      saveCurrentUser(userData, stayLoggedInValue);

      return { user: userData, stayLoggedIn: stayLoggedInValue };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to register user',
      );
    }
  },
);

export const loginUserThunk = createAsyncThunk<
  { user: User; stayLoggedIn: boolean },
  { email: string; password: string; stayLoggedIn: boolean },
  { rejectValue: string }
>(
  'auth/loginUser',
  async (
    { email, password, stayLoggedIn: stayLoggedInValue },
    { rejectWithValue },
  ) => {
    try {
      const userData = await authService.login(email, password);

      saveCurrentUser(userData, stayLoggedInValue);

      return { user: userData, stayLoggedIn: stayLoggedInValue };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to login user',
      );
    }
  },
);

export const updateUserThunk = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>('user/updateUser', async (currentUser: User, { rejectWithValue }) => {
  try {
    const updated = await userService.updateUser(currentUser);

    saveCurrentUser(updated, true);

    return updated;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to update user',
    );
  }
});

export const deleteUserThunk = createAsyncThunk<
  null,
  number,
  { rejectValue: string }
>('user/deleteUser', async (id: number, { rejectWithValue }) => {
  try {
    await userService.deleteUser(id);

    removeCurrentUserFromStorage();

    return null;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to delete user',
    );
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.stayLoggedIn = false;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('currentUser');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUserThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.stayLoggedIn = action.payload.stayLoggedIn;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      })
      .addCase(loginUserThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.stayLoggedIn = action.payload.stayLoggedIn;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      })
      .addCase(updateUserThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.stayLoggedIn = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      })
      .addCase(deleteUserThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.stayLoggedIn = false;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});

export const { clearError, logout } = userSlice.actions;

export default userSlice.reducer;
