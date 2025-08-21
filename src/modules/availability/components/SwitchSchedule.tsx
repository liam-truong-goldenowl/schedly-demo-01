'use client';

import { MapItem } from '@/shared/components/MapItem';

import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useAvailability } from '../contexts/AvailabilityContext';

export function SwitchSchedule() {
  const { schedules } = useAvailability();
  const { activeScheduleId, setActiveScheduleId } = useActiveSchedule();

  return (
    <div>
      <fieldset className="bg-border flex w-fit gap-(--divider-size) pe-(--divider-size) [--divider-size:1px]">
        <legend className="sr-only">select schedule</legend>
        <MapItem
          items={schedules}
          itemKey={({ item }) => item.id}
          render={({ item, key }) => (
            <div key={key} className="flex">
              <input
                type="radio"
                id={key.toString()}
                name="schedule"
                value={item.id}
                defaultChecked={item.id === activeScheduleId}
                className="peer sr-only"
                onChange={() => setActiveScheduleId(item.id)}
              />
              <label
                htmlFor={key.toString()}
                className="peer-checked:bg-accent peer-checked:border-b-border bg-background active:bg-accent text-copy-14 grow cursor-pointer border-x border-y-4 border-transparent px-6 py-4 hover:bg-gray-50"
              >
                {item.name} {item.isDefault && '(default)'}
              </label>
            </div>
          )}
        />
      </fieldset>
    </div>
  );
}
