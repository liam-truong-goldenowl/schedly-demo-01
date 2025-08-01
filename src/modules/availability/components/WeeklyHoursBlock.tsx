import { RepeatIcon } from 'lucide-react';

import { Heading } from '@/shared/components/layout/Heading';
import { Description } from '@/shared/components/layout/Description';

export function WeeklyHoursBlock() {
  return (
    <section>
      <Heading level={'h3'} className="mb-0 inline-flex items-center gap-1.5">
        <RepeatIcon size={18} />
        Weekly Hours
      </Heading>
      <Description>
        Set when you are typically available for meetings
      </Description>
    </section>
  );
}
