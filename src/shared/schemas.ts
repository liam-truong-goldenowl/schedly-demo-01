import z from 'zod';

import { WEEKDAYS } from './constants/day';

export const WeekdaySchema = z.enum(WEEKDAYS);

export type Weekday = z.infer<typeof WeekdaySchema>;
