import { FilterByPeriod } from './FilterByPeriod';
import { FilterByEventType } from './FilterByEventType';

export function MeetingFilters() {
  return (
    <div className="flex items-center justify-between gap-4">
      <FilterByPeriod />
      <FilterByEventType />
    </div>
  );
}
