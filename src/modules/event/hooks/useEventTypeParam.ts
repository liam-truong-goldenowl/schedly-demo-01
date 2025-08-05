import { useQueryState, parseAsStringEnum } from 'nuqs';

import { EventType } from '@/shared/constants/event';

export function useEventTypeParam() {
  const [eventType] = useQueryState(
    'type',
    parseAsStringEnum<EventType>(Object.values(EventType)).withDefault(
      EventType.ONE_ON_ONE,
    ),
  );

  return {
    eventType,
  };
}
