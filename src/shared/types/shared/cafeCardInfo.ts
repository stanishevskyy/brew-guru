/* eslint-disable @typescript-eslint/indent */
import { Cafe } from './cafe';

export type CafeCardInfo = Omit<
  Cafe,
  'status' | 'amenities' | 'workspaces' | 'menuFoodOptions'
>;
