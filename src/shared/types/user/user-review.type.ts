import { Reply } from './user-replies.type';

export interface UserReview {
  id: number;
  cafeId: number;
  user: {
    id: number;
    img: string;
    firstName: string;
    lastName: string;
  };
  rating?: number;
  createdAt: string;
  comment: string;
  like: number | null;
  dislike: number | null;
  replies?: Reply[];
}
