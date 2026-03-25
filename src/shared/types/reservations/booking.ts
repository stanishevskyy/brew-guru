import { CafeReservation } from './cafeReservation';
import { Customer } from './customer';
import { Preorder } from './preorder';
import { Reservation } from './reservation';

export interface Booking {
  id: string;
  reservation: Reservation;
  customer: Customer;
  cafe: CafeReservation;
  preorder?: Preorder;
}
