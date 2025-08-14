import { DateTime } from 'luxon';
import { parseAsString, useQueryState } from 'nuqs';

import { formatTime } from '@/shared/lib/utils';

export function useSlotQueryState() {
  const [slot, setSlot] = useQueryState(
    'slot',
    parseAsString.withOptions({ clearOnDefault: false }),
  );

  const getStartTime = () => {
    return slot ? formatTime(slot) : null;
  };

  const getEndTime = (duration: number) => {
    if (!slot) {
      return null;
    }
    const format = slot.length == 8 ? 'HH:mm:ss' : 'HH:mm';
    const time = DateTime.fromFormat(slot, format)
      .plus({ minutes: duration })
      .toFormat(format);
    return formatTime(time);
  };

  return { slot, setSlot, getStartTime, getEndTime };
}
