import { CirclePlusIcon } from 'lucide-react';

import { Weekday } from '@/shared/schemas';
import { toTitleCase } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

interface AddDayIntervalButtonProps {
  day: Weekday;
}

export function AddDayIntervalButton({ day }: AddDayIntervalButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost" className="size-9">
          <CirclePlusIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>New interval for {toTitleCase(day)}</span>
      </TooltipContent>
    </Tooltip>
  );
}
