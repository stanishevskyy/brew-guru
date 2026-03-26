import { ReservationStatus } from './reservationStatus';

export interface Reservation {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  guestsCount: number;
  tableNumber: number;
  status: ReservationStatus;
  notes?: string;
}
