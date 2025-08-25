import z from 'zod';

import { api } from '@/shared/lib/api';
import { Weekday } from '@/shared/enums';

import {
  ScheduleSchema,
  WeeklyHourSchema,
  DateOverrideSchema,
} from '../../schemas';

export async function createSchedule(body: { name: string; timezone: string }) {
  return api('@post/schedules', {
    body,
    output: ScheduleSchema,
    throw: true,
  });
}

export async function getSchedules() {
  return api('@get/schedules', {
    output: z.array(ScheduleSchema),
    throw: true,
  });
}

export async function deleteSchedule(scheduleId: number) {
  return api(`@delete/schedules/${scheduleId}`, {
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
  return api(`@patch/schedules/${scheduleId}`, {
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
  return api(`@delete/schedules/${scheduleId}/weekly-hours/${weeklyHourId}`, {
    throw: true,
  });
}

export function createWeeklyHour({
  scheduleId,
  body,
}: {
  scheduleId: number;
  body: { weekday: Weekday; startTime: string; endTime: string };
}) {
  return api(`@post/schedules/${scheduleId}/weekly-hours`, {
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
  return api(`@patch/schedules/${scheduleId}/weekly-hours/${weeklyHourId}`, {
    body,
    output: WeeklyHourSchema,
    throw: true,
  });
}

export function createDateOverride({
  scheduleId,
  body,
}: {
  scheduleId: number;
  body: {
    intervals: { startTime: string; endTime: string }[];
    dates: string[];
  };
}) {
  return api(`@post/schedules/${scheduleId}/date-overrides`, {
    body,
    output: z.array(DateOverrideSchema),
    throw: true,
  });
}

export function deleteDateOverride({
  scheduleId,
  dateOverrideId,
}: {
  scheduleId: number;
  dateOverrideId: number;
}) {
  return api(
    `@delete/schedules/${scheduleId}/date-overrides/${dateOverrideId}`,
    { throw: true },
  );
}
