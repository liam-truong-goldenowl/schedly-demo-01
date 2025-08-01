import z from 'zod';

export const WeekdaySchema = z.enum([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]);

export type Weekday = z.infer<typeof WeekdaySchema>;
