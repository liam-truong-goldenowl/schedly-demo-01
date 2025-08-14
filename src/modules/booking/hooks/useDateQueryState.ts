import { useQueryState, parseAsIsoDate } from 'nuqs';

export function useDateQueryState() {
  const [date, setDate] = useQueryState(
    'date',
    parseAsIsoDate.withOptions({ clearOnDefault: false }),
  );

  return { date, setDate };
}
