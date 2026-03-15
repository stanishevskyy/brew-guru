/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserReview } from '../../shared/types/user/user-review.type';
import { userReviewsService } from '../../services/userReviewsService';
import { Reply } from '../../shared/types/user/user-replies.type';

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

export const addUserReplyThunk = createAsyncThunk<
  Reply,
  Reply,
  { rejectValue: string }
>('reviews/addUserReply', async (reply, { rejectWithValue }) => {
  try {
    return await userReviewsService.addUserReply(reply);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to add reply',
    );
  }
});

export const updateUserReviewThunk = createAsyncThunk<
  UserReview,
  UserReview,
  { rejectValue: string }
>('reviews/updateUserReview', async (review, { rejectWithValue }) => {
  try {
    return await userReviewsService.updateUserReview(review);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to update review',
    );
  }
});

export const deleteReviewThunk = createAsyncThunk<
  number, // повертаємо reviewId
  number, // приймаємо reviewId
  { rejectValue: string }
>('reviews/deleteReview', async (reviewId, { rejectWithValue }) => {
  try {
    await userReviewsService.deleteReview(reviewId);

    return reviewId;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to delete review',
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
      })
      .addCase(addUserReplyThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserReplyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newReply = action.payload;

        const parentReview = state.reviews.find(
          r => r.id === newReply.reviewId,
        );

        if (parentReview) {
          if (!parentReview.replies) {
            parentReview.replies = [];
          }

          parentReview.replies.push(newReply);
        }
      })
      .addCase(addUserReplyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add reply';
      })
      .addCase(deleteReviewThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReviewThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reviews = state.reviews.filter(r => r.id !== action.payload);
      })
      .addCase(deleteReviewThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete review';
      });
  },
});
