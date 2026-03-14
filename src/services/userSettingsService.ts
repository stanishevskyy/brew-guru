import { settingsService } from './settingsService';

import { UserSettings } from '../shared/types/user/user-settings.type';

const STORAGE_KEY = 'settings';

export const userSettingsService = {
  createUserSettings: (userId: number) => {
    try {
      const newSetting: UserSettings = {
        id: Date.now(),
        userId,
        emailNotifications: true,
        pushNotifications: false,
        nearestReservationReminder: true,
        commentReplyNotification: true,
        savedPaymentMethods: true,
        allowAnalytics: false,
      };

      const existingSettings: UserSettings[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]',
      );

      existingSettings.push(newSetting);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingSettings));

      return newSetting;
    } catch {
      throw new Error('Failed to create user settings');
    }
  },

  getUserSettings: async (userId: number): Promise<UserSettings | null> => {
    try {
      const settings = await settingsService.getSettings();

      return settings.find(s => s.userId === userId) || null;
    } catch {
      throw new Error('Failed load users settings');
    }
  },

  updateSettings: async (
    updatedSettings: UserSettings,
  ): Promise<UserSettings> => {
    try {
      const settings = await settingsService.getSettings();

      const updated = settings.map(s =>
        s.userId === updatedSettings.userId ? updatedSettings : s,
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return updatedSettings;
    } catch {
      throw new Error('Failed update users settings');
    }
  },
};
