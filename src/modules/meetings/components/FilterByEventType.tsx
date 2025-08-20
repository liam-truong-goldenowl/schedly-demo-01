'use client';

import { useQuery } from '@tanstack/react-query';

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/shared/components/ui/select';

import { eventSelectQuery } from '../queries/event-select-query';
import { useMeetingsQueryState } from '../hooks/useMeetingsQueryState';

export function FilterByEventType() {
  const allEventType = '__all__';
  const { isLoading, data: eventTypes } = useQuery(eventSelectQuery);
  const { setEventType } = useMeetingsQueryState();

  function handleSelectChange(value: string) {
    setEventType(value === allEventType ? null : value);
  }

  return (
    <Select onValueChange={handleSelectChange} defaultValue={allEventType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Event Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={allEventType}>All event types</SelectItem>
        {isLoading && (
          <SelectItem value="loading" disabled>
            Loading...
          </SelectItem>
        )}
        {eventTypes &&
          eventTypes.map((eventType) => (
            <SelectItem key={eventType.id} value={eventType.slug}>
              {eventType.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
