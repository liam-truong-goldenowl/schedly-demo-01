import { format } from 'date-fns';
import { parseAsString, useQueryState } from 'nuqs';

const formatMonth = (date: Date) => format(date, 'yyyy-MM');

export function useMonthQueryState() {
  const today = new Date();
  const thisMonth = formatMonth(today);

  const [month, setMonth] = useQueryState(
    'month',
    parseAsString.withDefault(thisMonth).withOptions({ clearOnDefault: false }),
  );

  const setMonthFromDate = (date: Date) => {
    const newMonth = formatMonth(date);
    setMonth(newMonth);
  };

  return { month, setMonthFromDate };
}
