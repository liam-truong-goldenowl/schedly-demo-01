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
        <div className="flex size-9 items-center">
          <div className="bg-primary text-primary-foreground text-copy-13 grid size-6 place-content-center overflow-clip rounded-full font-bold">
            <span>{day.charAt(0).toUpperCase()}</span>
            <span className="sr-only">{day}</span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="left">{toTitleCase(day)}</TooltipContent>
    </Tooltip>
  );
}
