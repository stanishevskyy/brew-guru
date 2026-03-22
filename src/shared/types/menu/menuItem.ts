export interface Dish {
  id: number;
  name: string;
  price: number;
  portion: string;
  imageUrl: string;
  menuId: number;
}

export interface MenuItem {
  id: number;
  name: string;
  cafeId: number;
  imageUrl: string;
  cafe: { id: number; name: string };
  items: Dish[];
}
