export interface UserSettings {
  id: number;
  userId: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  nearestReservationReminder: boolean;
  commentReplyNotification: boolean;
  savedPaymentMethods: boolean;
  allowAnalytics: boolean;
}
