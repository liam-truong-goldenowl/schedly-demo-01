import z from 'zod';

import { Weekday } from '@/shared/schemas';
import { clientApiWithAuth } from '@/shared/lib/client-api';

import {
  ScheduleSchema,
  WeeklyHourSchema,
  DateOverrideSchema,
} from '../../schemas';

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

export function deleteWeeklyHour({
  scheduleId,
  weeklyHourId,
}: {
  scheduleId: number;
  weeklyHourId: number;
}) {
  return clientApiWithAuth(
    `@delete/schedules/${scheduleId}/weekly-hours/${weeklyHourId}`,
    { throw: true },
  );
}

export function createWeeklyHour({
  scheduleId,
  body,
}: {
  scheduleId: number;
  body: { weekday: Weekday; startTime: string; endTime: string };
}) {
  return clientApiWithAuth(`@post/schedules/${scheduleId}/weekly-hours`, {
    body,
    output: WeeklyHourSchema,
    throw: true,
  });
}

export function updateWeeklyHour({
  scheduleId,
  weeklyHourId,
  body,
}: {
  scheduleId: number;
  weeklyHourId: number;
  body: { startTime: string; endTime: string };
}) {
  return clientApiWithAuth(
    `@patch/schedules/${scheduleId}/weekly-hours/${weeklyHourId}`,
    {
      body,
      output: WeeklyHourSchema,
      throw: true,
    },
  );
}

export function createDateOverride({
  scheduleId,
  body,
}: {
  scheduleId: number;
  body: {
    intervals: { startTime: string; endTime: string }[];
    dates: Date[];
  };
}) {
  return clientApiWithAuth(`@post/schedules/${scheduleId}/date-overrides`, {
    body,
    output: z.array(DateOverrideSchema),
    throw: true,
  });
}
