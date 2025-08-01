import z from 'zod';

import { apiWithAuth } from '@/shared/lib/server-api';

import { ScheduleSchema } from '../../schemas';

export async function getSchedules() {
  return apiWithAuth('@get/schedules', {
    output: z.array(ScheduleSchema),
  });
}
