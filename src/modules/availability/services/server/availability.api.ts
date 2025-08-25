import z from 'zod';

import { api } from '@/shared/server/api';

import { ScheduleSchema } from '../../schemas';

export async function getSchedules() {
  return api('@get/schedules', {
    output: z.array(ScheduleSchema),
    throw: true,
  });
}
