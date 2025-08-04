'use client';

import { IconCalendarEvent } from '@tabler/icons-react';

import { Heading } from '@/shared/components/layout/Heading';
import { Description } from '@/shared/components/layout/Description';

import { useActiveSchedule } from '../hooks/useActiveSchedule';

import { OverriddenDateList } from './OverriddenDateList';
import { AddDateOverrideButton } from './AddDateOverrideButton';

export function DateOverridesBlock() {
  const { activeScheduleId, activeSchedule } = useActiveSchedule();

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <Heading
            level={'h3'}
            className="text-copy-14 mb-0 inline-flex items-center gap-1.5"
          >
            <IconCalendarEvent size={18} />
            Date-specific Hours
          </Heading>
          <Description>Adjust hours for specific days</Description>
        </div>
        <AddDateOverrideButton key={activeScheduleId} />
      </header>
      <OverriddenDateList overriddenDates={activeSchedule.dateOverrides} />
    </section>
  );
}
