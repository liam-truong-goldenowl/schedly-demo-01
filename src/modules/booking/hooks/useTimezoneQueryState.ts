import { parseAsString, useQueryState } from 'nuqs';

export function useTimezoneQueryState(defaultTz: string) {
  const [timezone, setTimezone] = useQueryState(
    'timezone',
    parseAsString.withDefault(defaultTz).withOptions({ clearOnDefault: false }),
  );

  return { timezone, setTimezone };
}
