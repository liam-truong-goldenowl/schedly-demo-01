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

export async function deleteSchedule(scheduleId: number) {
  return clientApiWithAuth(`@delete/schedules/${scheduleId}`, {
    throw: true,
  });
}

export function updateTimezone({
  timezone,
  scheduleId,
}: {
  timezone: string;
  scheduleId: number;
}) {
  return clientApiWithAuth(`@patch/schedules/${scheduleId}`, {
    body: { timezone },
    throw: true,
  });
}
