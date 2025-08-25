import { DateTime, Duration } from 'luxon';

type TimeInterval = {
  startTime: string; // 'HH:mm'
  endTime: string;
};

export function findAvailableSlots(
  intervals: TimeInterval[],
  dayStart: string = '00:00:00',
  dayEnd: string = '23:59:59',
  bufferMinutes: number = 15,
): TimeInterval[] {
  const buffer = Duration.fromObject({ minutes: bufferMinutes });

  const INPUT_FORMAT = 'HH:mm:ss';
  const OUTPUT_FORMAT = 'HH:mm';

  const parseTime = (time: string) => DateTime.fromFormat(time, INPUT_FORMAT);

  const formatTime = (dt: DateTime) => dt.toFormat(OUTPUT_FORMAT);

  const sorted = [...intervals].sort(
    (a, b) =>
      parseTime(a.startTime).toMillis() - parseTime(b.startTime).toMillis(),
  );

  const available: TimeInterval[] = [];
  let prevEnd = parseTime(dayStart);

  for (const interval of sorted) {
    const start = parseTime(interval.startTime).minus(buffer);
    const end = parseTime(interval.endTime).plus(buffer);

    if (prevEnd < start) {
      available.push({
        startTime: formatTime(prevEnd),
        endTime: formatTime(start),
      });
    }

    if (end > prevEnd) {
      prevEnd = end;
    }
  }

  const endOfDay = parseTime(dayEnd);
  if (prevEnd < endOfDay) {
    available.push({
      startTime: formatTime(prevEnd),
      endTime: formatTime(endOfDay),
    });
  }

  // Filter out slots shorter than 1 minute
  return available.filter(
    (slot) =>
      parseTime(`${slot.endTime}:00`).diff(
        parseTime(`${slot.startTime}:00`),
        'minutes',
      ).minutes >= 1,
  );
}

export function isOverlapping(
  interval1: TimeInterval,
  interval2: TimeInterval,
): boolean {
  return (
    interval1.startTime < interval2.endTime &&
    interval2.startTime < interval1.endTime
  );
}

export function isBefore(time1: string, time2: string): boolean {
  return time1 < time2;
}

export function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

export function convertTimezone({
  srcTz,
  dstTz,
  date,
  time,
}: {
  srcTz: string;
  dstTz: string;
  date: string;
  time: string;
}) {
  const dt = DateTime.fromISO(`${date}T${time}`, { zone: srcTz });
  const otherDt = dt.setZone(dstTz);
  if (!otherDt.isValid) {
    throw new Error('Invalid time');
  }
  return {
    date: otherDt.toISODate(),
    time: otherDt.toFormat('HH:mm'),
  };
}

export function normalizeTimeFormat(time: string): DateTime {
  let dt = null as null | DateTime;

  ['HH:mm', 'HH:mm:ss'].forEach((format) => {
    const parsed = DateTime.fromFormat(time, format);
    if (parsed.isValid) {
      dt = parsed;
    }
  });

  if (!dt) {
    throw new Error('Invalid time format');
  }

  return dt;
}

export function addMinutes(time: string, minutes: number): string {
  const dt = normalizeTimeFormat(time);
  const newDt = dt.plus({ minutes });
  return newDt.toFormat('HH:mm a');
}
