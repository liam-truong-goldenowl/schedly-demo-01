import { Weekday } from '@/shared/schemas';
import { toTitleCase } from '@/shared/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

interface DayIndicatorProps {
  day: Weekday;
}

export function DayIndicator({ day }: DayIndicatorProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex h-9 items-center gap-2">
          <div className="bg-primary text-primary-foreground grid size-6 place-content-center rounded-full">
            <span aria-hidden={true}>{day.charAt(0).toUpperCase()}</span>
            <span className="sr-only">{day}</span>
          </div>
          <span className="md:hidden">{toTitleCase(day)}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="left">{toTitleCase(day)}</TooltipContent>
    </Tooltip>
  );
}
