import z from 'zod';
import { DateTime } from 'luxon';

import { WEEKDAYS } from './constants';

export const WeekdaySchema = z.enum(WEEKDAYS);

export const makeCursorPaginationSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    items: z.array(schema),
    nextCursor: z.string().nullable(),
    hasNextPage: z.boolean(),
    totalCount: z.number(),
  });

export const IdSchema = z.number().positive();
export const DateStringSchema = z
  .string()
  .refine(
    (date) => DateTime.fromISO(date).isValid,
    'Date must be in YYYY-MM-DD format',
  );

export const TimeStringSchema = z
  .string()
  .refine(
    (time) =>
      ['HH:mm', 'HH:mm:ss'].some(
        (format) => DateTime.fromFormat(time, format).isValid,
      ),
    'Time must be in HH:MM format',
  )
  .transform((time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return DateTime.fromObject({ hour: hours, minute: minutes }).toFormat(
      'HH:mm',
    )!;
  });
