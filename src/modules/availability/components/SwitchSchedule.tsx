'use client';

import { cn } from '@/shared/lib/utils';
import { MapItem } from '@/shared/components/MapItem';

import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useAvailability } from '../contexts/AvailabilityContext';

export function SwitchSchedule() {
  const { schedules } = useAvailability();
  const { activeScheduleId, setActiveScheduleId } = useActiveSchedule();

  return (
    <div className="bg-border flex w-fit flex-wrap gap-(--divider-size) pe-(--divider-size) [--divider-size:1px]">
      <MapItem
        items={schedules}
        itemKey={({ item }) => item.id}
        render={({ item, key }) => (
          <button
            key={key}
            className={cn(
              'bg-background active:bg-accent text-copy-14 grow cursor-pointer border-x border-y-4 border-transparent px-6 py-4 hover:bg-gray-50',
              item.id == activeScheduleId && 'bg-accent border-b-border',
            )}
            onClick={() => setActiveScheduleId(item.id)}
          >
            {item.name} {item.isDefault && '(default)'}
          </button>
        )}
      />
    </div>
  );
}
