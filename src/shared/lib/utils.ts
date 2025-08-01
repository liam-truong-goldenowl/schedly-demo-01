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
