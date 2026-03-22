export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface Table {
  id: number;
  name: string;
  seats: number;
  availableSlots: TimeSlot[];
}

export interface AvailableTablesByDate {
  date: string;
  tables: Table[];
}
