import z from 'zod';

import { serverApiWithAuth } from '@/shared/lib/server-api';

import { ScheduleSchema } from '../../schemas';

export async function getSchedules() {
  return serverApiWithAuth('@get/schedules', {
    output: z.array(ScheduleSchema),
    throw: true,
  });
}
