import {
  useQueryState,
  parseAsIsoDate,
  useQueryStates,
  parseAsStringEnum,
} from 'nuqs';

import { formatDate } from '@/shared/lib/time';

import { Period } from '../enums';

export function useMeetingsQueryState() {
  const [period, setPeriod] = useQueryState(
    'period',
    parseAsStringEnum(Object.values(Period))
      .withDefault(Period.UPCOMING)
      .withOptions({ clearOnDefault: false }),
  );
  const [{ startDate, endDate }, setDateRange] = useQueryStates({
    startDate: parseAsIsoDate,
    endDate: parseAsIsoDate,
  });

  function setToPast() {
    setPeriod(Period.PAST);
  }

  function setToUpcoming() {
    setPeriod(Period.UPCOMING);
  }

  function setToFixed({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) {
    setPeriod(Period.FIXED);
    setDateRange({ startDate, endDate });
  }

  // function setPeriod(
  //   data: { period: typeof Period.PAST | typeof Period.UPCOMING },
  //   // | { period: typeof Period.FIXED; startDate: Date; endDate: Date },
  // ) {
  //   // if (data.period === Period.FIXED) {
  //   //   _setPeriod(Period.FIXED);
  //   //   setDateRange({ startDate: data.startDate, endDate: data.endDate });
  //   // } else {
  //   _setPeriod(data.period);
  //   // }
  // }

  if (period == Period.FIXED) {
    return {
      period,
      startDate: formatDate(startDate!),
      endDate: formatDate(endDate!),
      setToUpcoming,
      setToPast,
      setPeriod,
    };
  }

  return {
    period,
    startDate: undefined,
    endDate: undefined,
    setToUpcoming,
    setPeriod,
    setToPast,
    setToFixed,
  };
}
