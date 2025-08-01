'use client';

import { VList } from 'virtua';
import { useState } from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/shared/components/ui/command';

import { TIME_ZONES } from '../constants/time';

interface TimezoneSelectProps {
  defaultTz?: string;
  onChange?: (timezone: string) => void;
}

export function TimezoneSelect({ defaultTz, onChange }: TimezoneSelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedTz, setSelectedTz] = useState(defaultTz ?? 'Select Timezone');

  function handleTimezoneChange(timezone: string) {
    setSelectedTz(timezone);
    setOpen(false);

    if (onChange) {
      onChange(timezone);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="text-copy-14 text-primary group flex items-center gap-2 font-medium">
        {selectedTz}
        <ChevronsUpDownIcon className="ml-2 size-4 shrink-0" />
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList className="max-h-[unset]">
            <CommandEmpty>No timezones found.</CommandEmpty>
            <VList style={{ height: '17.5rem' }}>
              {TIME_ZONES.map((tzGroup) => (
                <CommandGroup key={tzGroup.id} heading={tzGroup.group}>
                  {tzGroup.utc!.map((tz) => (
                    <CommandItem
                      key={tz}
                      value={tz}
                      onSelect={handleTimezoneChange}
                    >
                      <CheckIcon
                        className={cn(
                          'text-primary mr-2 size-4',
                          selectedTz === tz ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {tz}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </VList>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
