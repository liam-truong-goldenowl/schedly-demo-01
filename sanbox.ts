import { DateTime, Duration } from 'luxon';

type TimeInterval = {
  startTime: string; // e.g., '09:00:00'
  endTime: string;
};

function findAvailableSlotsWithBuffer(
  intervals: TimeInterval[],
  dayStart: string = '00:00:00',
  dayEnd: string = '23:59:59',
  bufferMinutes: number = 15,
): TimeInterval[] {
  const buffer = Duration.fromObject({ minutes: bufferMinutes });

  const TIME_FORMAT = 'HH:mm:ss';

  const parseTime = (time: string) => DateTime.fromFormat(time, TIME_FORMAT);

  const formatTime = (dt: DateTime) => dt.toFormat('HH:mm:ss');

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

  // Optional: remove slots shorter than 1 minute
  return available.filter(
    (slot) =>
      parseTime(slot.endTime).diff(parseTime(slot.startTime), 'minutes')
        .minutes >= 1,
  );
}

const intervals: TimeInterval[] = [
  { startTime: '09:00:00', endTime: '17:00:00' },
  // { startTime: '17:20', endTime: '18:00' },
];

const available = findAvailableSlotsWithBuffer(intervals);

console.log(available);
/*
[
  { startTime: '08:00', endTime: '08:45' },
  { startTime: '18:15', endTime: '20:00' }
]
*/
