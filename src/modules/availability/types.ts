import z from '../../../node_modules/zod/v4/classic/external.cjs';

import {
  ScheduleSchema,
  WeeklyHourSchema,
  DateOverrideSchema,
} from './schemas';

export type Schedule = z.infer<typeof ScheduleSchema>;
export type WeeklyHour = z.infer<typeof WeeklyHourSchema>;
export type DateOverride = z.infer<typeof DateOverrideSchema>;
