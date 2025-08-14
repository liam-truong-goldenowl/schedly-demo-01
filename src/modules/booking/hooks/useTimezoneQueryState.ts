import { parseAsString, useQueryState } from 'nuqs';

export function useTimezoneQueryState() {
  const defaultTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timezone, setTimezone] = useQueryState(
    'timezone',
    parseAsString.withDefault(defaultTz).withOptions({ clearOnDefault: false }),
  );

  return { timezone, setTimezone };
}
