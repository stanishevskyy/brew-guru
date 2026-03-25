export type ReservationStatus =
  | 'pending'
  | 'checking_availability'
  | 'assigning_table'
  | 'payment_processing'
  | 'confirmed'
  | 'cancelled'
  | 'rejected'
  | 'completed'
  | 'no_show';
