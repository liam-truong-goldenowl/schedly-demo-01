'use client';

import { IconCalendarEvent } from '@tabler/icons-react';

import { Heading } from '@/shared/components/layout/Heading';
import { Description } from '@/shared/components/layout/Description';

import { useActiveSchedule } from '../hooks/useActiveSchedule';

import { AddDateOverrideButton } from './AddDateOverrideButton';

export function DateOverridesBlock() {
  const { activeScheduleId } = useActiveSchedule();

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
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </section>
  );
}
