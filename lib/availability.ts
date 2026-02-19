// Availability configuration and helper functions for MOT booking

export interface TimeSlot {
  time: string;
  available: boolean;
  label: string;
}

export interface DayAvailability {
  date: Date;
  isAvailable: boolean;
  slots: TimeSlot[];
}

// Business hours configuration
export const BUSINESS_HOURS = {
  weekday: {
    start: "08:00",
    end: "18:00",
    lunchStart: "12:15",
    lunchEnd: "12:40",
  },
  saturday: {
    start: "09:00",
    end: "17:00",
    lunchStart: "12:15",
    lunchEnd: "12:40",
  },
  sunday: {
    closed: true,
  },
};

// Time slots for weekdays
export const WEEKDAY_SLOTS: TimeSlot[] = [
  { time: "08:00", available: true, label: "08:00 AM" },
  { time: "09:00", available: true, label: "09:00 AM" },
  { time: "10:00", available: true, label: "10:00 AM" },
  { time: "11:00", available: true, label: "11:00 AM" },
  { time: "13:00", available: true, label: "01:00 PM" },
  { time: "14:00", available: true, label: "02:00 PM" },
  { time: "15:00", available: true, label: "03:00 PM" },
  { time: "16:00", available: true, label: "04:00 PM" },
  { time: "17:00", available: true, label: "05:00 PM" },
];

// Time slots for Saturday
export const SATURDAY_SLOTS: TimeSlot[] = [
  { time: "09:00", available: true, label: "09:00 AM" },
  { time: "10:00", available: true, label: "10:00 AM" },
  { time: "11:00", available: true, label: "11:00 AM" },
  { time: "13:00", available: true, label: "01:00 PM" },
  { time: "14:00", available: true, label: "02:00 PM" },
  { time: "15:00", available: true, label: "03:00 PM" },
  { time: "16:00", available: true, label: "04:00 PM" },
];

// Check if a date is a weekend
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0; // Sunday
}

// Check if a date is Saturday
export function isSaturday(date: Date): boolean {
  return date.getDay() === 6;
}

// Check if a date is in the past
export function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
}

// Get available slots for a specific date
export function getAvailableSlots(date: Date): TimeSlot[] {
  if (isWeekend(date)) {
    return []; // Closed on Sunday
  }
  
  if (isSaturday(date)) {
    return SATURDAY_SLOTS;
  }
  
  return WEEKDAY_SLOTS;
}

// Check if a date has available slots
export function hasAvailableSlots(date: Date): boolean {
  if (isPastDate(date) || isWeekend(date)) {
    return false;
  }
  
  const slots = getAvailableSlots(date);
  return slots.some(slot => slot.available);
}

// Get count of available slots for a date
export function getAvailableSlotCount(date: Date): number {
  const slots = getAvailableSlots(date);
  return slots.filter(slot => slot.available).length;
}

// Format date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get month name
export function getMonthName(date: Date): string {
  return date.toLocaleDateString("en-GB", { month: "long" });
}

// Get year
export function getYear(date: Date): number {
  return date.getFullYear();
}

// Get days in month
export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

// Get first day of month (0 = Sunday, 1 = Monday, etc.)
export function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

// Navigate to next month
export function getNextMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

// Navigate to previous month
export function getPreviousMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}
