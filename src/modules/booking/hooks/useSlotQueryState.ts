import { parseAsString, useQueryState } from 'nuqs';

export function useSlotQueryState() {
  const [slot, setSlot] = useQueryState(
    'slot',
    parseAsString.withOptions({ clearOnDefault: false }),
  );

  return { slot, setSlot };
}
