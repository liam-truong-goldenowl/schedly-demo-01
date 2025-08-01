import timezones from 'timezones.json';

export const TIME_ZONES = timezones.map((tz) => ({
  id: crypto.randomUUID(),
  utc: tz.utc,
  group: tz.value,
  offset: tz.offset,
}));
