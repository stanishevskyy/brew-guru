import { reviewsService } from './reviewsService';
import { UserReview } from '../shared/types/user/user-review.type';

export const userReviewsService = {
  getUserReviews: async (userId: number): Promise<UserReview[]> => {
    try {
      const reviews = await reviewsService.getReviews();

      return reviews.filter(r => r.user.id === userId);
    } catch {
      throw new Error('Failed to load user reviews');
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
  deleteReview: async (reviewId: number, replyId?: number): Promise<void> => {
    try {
      const reviews = await reviewsService.getReviews();
      const reviewIndex = reviews.findIndex(r => r.id === reviewId);

      if (reviewIndex === -1) {
        throw new Error('Review not found');
      }

      if (replyId) {
        reviews[reviewIndex].replies = reviews[reviewIndex].replies?.filter(
          reply => reply.id !== replyId,
        );
      } else {
        reviews.splice(reviewIndex, 1);
      }

      localStorage.setItem('reviews', JSON.stringify(reviews));
    } catch {
      throw new Error('Failed to delete review');
    }
  },
};
