'use client';

import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { ChevronDownIcon } from 'lucide-react';
import { useId, useState, useEffect } from 'react';

import { cn } from '@/shared/lib/utils';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';

import { Period } from '../enums';
import { useMeetingsQueryState } from '../hooks/useMeetingsQueryState';

export function FilterByDateRange() {
  const { setPeriod, period } = useMeetingsQueryState();
  const id = useId();
  const [date, setDate] = useState<DateRange | undefined>();

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    const isInitialInput = !date && selectedDate;

    if (isInitialInput) {
      setDate({ from: selectedDate.from });
    } else {
      setDate(selectedDate);
      setPeriod(Period.FIXED, {
        from: selectedDate!.from!.toISOString().slice(0, 10),
        to: selectedDate!.to!.toISOString().slice(0, 10),
      });
    }
  };

  useEffect(() => {
    if (period != Period.FIXED) {
      setDate(undefined);
    }
  }, [period]);

  return (
    <div>
      <Label htmlFor={id} className="sr-only">
        Date range picker
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              'bg-background hover:bg-background group w-full cursor-pointer justify-between border px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]',
              period == Period.FIXED && 'bg-accent',
            )}
          >
            <span className={cn('truncate')}>
              {date ? (
                <>
                  {date.from && format(date.from, 'LLL dd, y')}
                  {date.to && ' - '}
                  {date.to && format(date.to, 'LLL dd, y')}
                </>
              ) : (
                'Date range'
              )}
            </span>
            <ChevronDownIcon
              size={16}
              className="group-data-[state=open]:rotate-180"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleDateChange}
            timeZone="utc"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
