import { reviewsService } from './reviewsService';

import { UserReview } from '../shared/types/user/user-review.type';
import { Reply } from '../shared/types/user/user-replies.type';

export const userReviewsService = {
  getUserReviews: async (userId: number): Promise<UserReview[]> => {
    try {
      const reviews = await reviewsService.getReviews();

      return reviews.filter(r => r.user.id === userId);
    } catch {
      throw new Error('Failed to load user reviews');
    }
  },
  addUserReply: async (newUserReply: Reply): Promise<Reply> => {
    try {
      const reviews = await reviewsService.getReviews();

      const parentReviewIndex = reviews.findIndex(
        r => r.id === newUserReply.reviewId,
      );

      if (parentReviewIndex === -1) {
        throw new Error('Parent review not found');
      }

      if (!reviews[parentReviewIndex].replies) {
        reviews[parentReviewIndex].replies = [];
      }

      reviews[parentReviewIndex].replies.push(newUserReply);

      localStorage.setItem('reviews', JSON.stringify(reviews));

      return newUserReply;
    } catch {
      throw new Error('Failed to add reply');
    }
  },
  updateUserReview: async (updatedReview: UserReview): Promise<UserReview> => {
    try {
      const reviews = await reviewsService.getReviews();

      const updatedReviews = reviews.map(r => {
        if (r.id === updatedReview.id) {
          return updatedReview;
        }

        if (r.replies) {
          return {
            ...r,
            replies: r.replies.map(reply =>
              reply.id === updatedReview.id ? updatedReview : reply,
            ),
          };
        }

        return r;
      });

      localStorage.setItem('reviews', JSON.stringify(updatedReviews));

      return updatedReview;
    } catch {
      throw new Error('Failed to update user review');
    }
  },
  deleteReview: async (reviewId: number): Promise<void> => {
    try {
      const reviews = await reviewsService.getReviews();
      const reviewIndex = reviews.findIndex(r => r.id === reviewId);

      if (reviewIndex === -1) {
        throw new Error('Review not found');
      }

      reviews.splice(reviewIndex, 1);

      localStorage.setItem('reviews', JSON.stringify(reviews));
    } catch {
      throw new Error('Failed to delete review');
    }
  },

  deleteReply: async (reviewId: number, replyId: number): Promise<void> => {
    try {
      const reviews = await reviewsService.getReviews();
      const reviewIndex = reviews.findIndex(r => r.id === reviewId);

      if (reviewIndex === -1) {
        throw new Error('Parent review not found');
      }

      reviews[reviewIndex].replies = reviews[reviewIndex].replies?.filter(
        reply => reply.id !== replyId,
      );

      localStorage.setItem('reviews', JSON.stringify(reviews));
    } catch {
      throw new Error('Failed to delete reply');
    }
  },
};
