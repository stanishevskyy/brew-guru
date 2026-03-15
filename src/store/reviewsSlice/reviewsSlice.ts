/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserReview } from '../../shared/types/user/user-review.type';
import { userReviewsService } from '../../services/userReviewsService';

export interface ReviewsState {
  reviews: UserReview[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchUserReviewsThunk = createAsyncThunk<
  UserReview[],
  number,
  { rejectValue: string }
>('reviews/fetchUserReviews', async (userId, { rejectWithValue }) => {
  try {
    return await userReviewsService.getUserReviews(userId);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch reviews',
    );
  }
});

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserReviewsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReviewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reviews = action.payload;
      })
      .addCase(fetchUserReviewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});
