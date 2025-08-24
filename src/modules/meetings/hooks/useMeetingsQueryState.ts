import { parseAsString, useQueryState, parseAsStringEnum } from 'nuqs';

import { Period } from '../enums';

export function useMeetingsQueryState() {
  const [period, setPeriod] = useQueryState(
    'period',
    parseAsStringEnum(Object.values(Period))
      .withDefault(Period.UPCOMING)
      .withOptions({ clearOnDefault: false }),
  );
  const [eventType, setEventType] = useQueryState('event', parseAsString);
  const [from, setFrom] = useQueryState('from', parseAsString);
  const [to, setTo] = useQueryState('to', parseAsString);

  const setPeriodNew = (
    period: Period,
    dateRange?: { from: string; to: string },
  ) => {
    setPeriod(period);

    if (period == Period.FIXED && dateRange) {
      setFrom(dateRange.from);
      setTo(dateRange.to);
    } else {
      setFrom(null);
      setTo(null);
    }
  };

  return {
    period,
    setPeriod: setPeriodNew,
    eventType,
    setEventType,
    from,
    setFrom,
    to,
    setTo,
  };
}
