import { useQueryState, parseAsString, parseAsStringEnum } from 'nuqs';

import { Period } from '../enums';

export function useMeetingsQueryState() {
  const [period, setPeriod] = useQueryState(
    'period',
    parseAsStringEnum(Object.values(Period))
      .withDefault(Period.UPCOMING)
      .withOptions({ clearOnDefault: false }),
  );
  const [eventType, setEventType] = useQueryState('event', parseAsString);

  return {
    period,
    setPeriod,
    eventType,
    setEventType,
  };
}
