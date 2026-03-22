export interface Dish {
  id: number;
  name: string;
  price: number;
  discount?: number;
  portion: string;
  imageUrl: string;
  description: string;

  category: string;
  type: string;
}
