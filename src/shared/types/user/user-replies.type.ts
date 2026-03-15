export interface Reply {
  id: number;
  reviewId: number;
  user: {
    id: number;
    img: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  comment: string;
  like: number[];
  dislike: number[];
}
