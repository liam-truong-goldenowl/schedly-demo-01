import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { useSuspenseQuery } from '@tanstack/react-query';

import { convertTimezone } from '@/shared/lib/time';

import { timeSlotsQuery } from '../queries/time-slots-query';

import { useMonthQueryState } from './useMonthQueryState';
import { useTimezoneQueryState } from './useTimezoneQueryState';

export function useTimeSlotsQuery(
  eventId: number,
  srcTz: string,
  duration: number,
) {
  const { month } = useMonthQueryState();
  const { timezone: dstTz } = useTimezoneQueryState();
  const { data: srcTimeSlots } = useSuspenseQuery(
    timeSlotsQuery({ month, eventId }),
  );

  const timeSlots = useMemo(() => {
    const timeSlotsMap = new Map<
      string,
      {
        srcSlot: string;
        dstSlot: string;
        srcDate: string;
        dstDate: string;
        remaining: number;
      }[]
    >(srcTimeSlots.map((slot) => [slot.date, []]));
    srcTimeSlots.forEach(({ date, slots }) => {
      slots.forEach(({ slot: time, remaining }) => {
        const { date: dstDate, time: dstTime } = convertTimezone({
          srcTz,
          dstTz,
          date,
          time,
        });
        timeSlotsMap.get(dstDate)?.push({
          srcSlot: time,
          dstSlot: dstTime,
          srcDate: date,
          dstDate: dstDate,
          remaining,
        });
      });
    });

    const now = DateTime.now().setZone(srcTz).toISODate()!;
    const endTime = DateTime.now()
      .setZone(dstTz)
      .plus({ minutes: duration })
      .toFormat('HH:mm');
    const todaySlots = timeSlotsMap.get(now);
    if (todaySlots) {
      timeSlotsMap.set(
        now,
        todaySlots.filter((slot) => slot.dstSlot > endTime),
      );
    }
    return Array.from(timeSlotsMap.entries()).map(([date, slots]) => ({
      date,
      slots,
    }));
  }, [srcTimeSlots, dstTz, srcTz, duration]);

  const unavailableDates = useMemo(() => {
    return timeSlots
      .filter(({ slots }) => slots.length === 0)
      .map(({ date }) => new Date(date));
  }, [timeSlots]);

  return { timeSlots, unavailableDates };
}
