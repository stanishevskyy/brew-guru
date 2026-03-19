export interface OpeningHour {
  id: number;
  weekday: number;
  cafeId: number;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}
