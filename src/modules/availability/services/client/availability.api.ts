import z from 'zod';

import { clientApiWithAuth } from '@/shared/lib/client-api';

import { ScheduleSchema } from '../../schemas';

export async function createSchedule(body: { name: string; timezone: string }) {
  return clientApiWithAuth('@post/schedules', {
    body,
    output: ScheduleSchema,
    throw: true,
  });
}

export async function getSchedules() {
  return clientApiWithAuth('@get/schedules', {
    output: z.array(ScheduleSchema),
  });
}
