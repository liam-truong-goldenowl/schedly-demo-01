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

export function getTimeRangeBounds(
  intervals: TimeInterval[],
): { earliest: string; latest: string } | null {
  if (intervals.length === 0) return null;

  const FORMAT = 'HH:mm:ss';

  let earliest = DateTime.fromFormat(intervals[0].startTime, FORMAT);
  let latest = DateTime.fromFormat(intervals[0].endTime, FORMAT);

  for (const { startTime, endTime } of intervals) {
    const start = DateTime.fromFormat(startTime, FORMAT);
    const end = DateTime.fromFormat(endTime, FORMAT);

    if (start < earliest) earliest = start;
    if (end > latest) latest = end;
  }

  return {
    earliest: earliest.toFormat(FORMAT),
    latest: latest.toFormat(FORMAT),
  };
}

const availableSlots = findAvailableSlots([
  { startTime: '09:00', endTime: '10:00' },
  { startTime: '10:30', endTime: '11:30' },
]);
