import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the default timezone of the user's environment.
 *
 * @remarks
 * This function currently retrieves the timezone from the user's system settings
 * using the `Intl.DateTimeFormat().resolvedOptions().timeZone` API.
 * It can be expanded in the future to determine the default timezone based on
 * user-specific settings or application preferences.
 *
 * @returns {string} The IANA timezone string (e.g., "America/New_York").
 */
export function getDefaultTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Converts a string to title case, capitalizing the first letter of each word and making the rest lowercase.
 *
 * @param str - The input string to convert.
 * @returns The converted string in title case.
 */
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
