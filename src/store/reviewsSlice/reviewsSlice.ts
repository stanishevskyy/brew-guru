/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userReviewsService } from '../../services/userReviewsService';

import { Review } from '../../shared/types/reviews/review.type';
import { Reply } from '../../shared/types/reviews/replies.type';

export interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchCafeReviewsThunk = createAsyncThunk<
  Review[],
  number,
  { rejectValue: string }
>('reviews/fetchCafeReviews', async (cafeId, { rejectWithValue }) => {
  try {
    return await userReviewsService.getReviewsByCafe(cafeId);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch reviews',
    );
  }
});

export const fetchUserReviewsThunk = createAsyncThunk<
  Review[],
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
  Review,
  Review,
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
  number,
  number,
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

export const deleteReplyThunk = createAsyncThunk<
  { reviewId: number; replyId: number },
  { reviewId: number; replyId: number },
  { rejectValue: string }
>('reviews/deleteReply', async ({ reviewId, replyId }, { rejectWithValue }) => {
  try {
    await userReviewsService.deleteReply(reviewId, replyId);

    return { reviewId, replyId };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to delete reply',
    );
  }
});

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCafeReviewsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCafeReviewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reviews = action.payload;
      })
      .addCase(fetchCafeReviewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      })
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
      })
      .addCase(deleteReplyThunk.fulfilled, (state, action) => {
        state.error = null;
        const { reviewId, replyId } = action.payload;
        const review = state.reviews.find(r => r.id === reviewId);

        if (review?.replies) {
          review.replies = review.replies.filter(r => r.id !== replyId);
        }
      })
      .addCase(deleteReplyThunk.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete reply';
      })
      .addCase(updateUserReviewThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reviews = state.reviews.map(r =>
          r.id === action.payload.id ? action.payload : r,
        );
      })
      .addCase(updateUserReviewThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      });
  },
});
