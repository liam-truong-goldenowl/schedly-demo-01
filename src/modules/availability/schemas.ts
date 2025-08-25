import z from 'zod';

import { WeekdaySchema } from '@/shared/schemas';

export const DateOverrideSchema = z.object({
  id: z.number(),
  date: z.string(),
  startTime: z.string().optional().nullable(),
  endTime: z.string().optional().nullable(),
});

export const WeeklyHourSchema = z.object({
  id: z.number(),
  weekday: WeekdaySchema,
  startTime: z.string(),
  endTime: z.string(),
});

export const ScheduleSchema = z.object({
  id: z.number(),
  name: z.string(),
  timezone: z.string(),
  isDefault: z.boolean(),
  weeklyHours: z.array(WeeklyHourSchema),
  dateOverrides: z.array(DateOverrideSchema),
});
