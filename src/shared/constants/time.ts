import { IANAZone } from 'luxon';
import timezones from 'timezones.json';

export const TIME_ZONES = timezones.map((tz) => ({
  id: crypto.randomUUID(),
  utc: tz.utc.filter((tz) => IANAZone.isValidZone(tz)),
  group: tz.value,
  offset: tz.offset,
}));
