import { PreorderItem } from './preorderItem';

export interface Preorder {
  items: PreorderItem[];
  totalAmount: number;
  currency: string;
}
