import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDefaultTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function toTitleCase(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function formatTime(timeString: string): string {
  const format = timeString.length === 8 ? 'HH:mm:ss' : 'HH:mm';
  return DateTime.fromFormat(timeString, format).toFormat('HH:mm a');
}
