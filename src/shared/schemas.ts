import z from 'zod';

import { WEEKDAYS } from './constants/day';

export const WeekdaySchema = z.enum(WEEKDAYS);

export type Weekday = z.infer<typeof WeekdaySchema>;

export const makeCursorPaginationSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    items: z.array(schema),
    nextCursor: z.string().nullable(),
    hasNextPage: z.boolean(),
    totalCount: z.number(),
  });
