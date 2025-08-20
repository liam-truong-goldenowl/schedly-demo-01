import { parseAsString, useQueryState } from 'nuqs';

export function useEventSearchQueryState() {
  const [eventSearch, setEventSearch] = useQueryState('search', parseAsString);
  return { eventSearch, setEventSearch };
}
