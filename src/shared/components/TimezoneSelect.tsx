'use client';

import { useId, useMemo, useState } from 'react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

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

interface TimezoneSelectProps {
  defaultTz?: string;
  onChange?: (timezone: string) => void;
}

export function TimezoneSelect({ defaultTz, onChange }: TimezoneSelectProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(() => {
    const defaultBrowserTimezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    return defaultTz || defaultBrowserTimezone;
  });

  const timezones = Intl.supportedValuesOf('timeZone');

  const formattedTimezones = useMemo(() => {
    return timezones
      .map((timezone) => {
        const formatter = new Intl.DateTimeFormat('en', {
          timeZone: timezone,
          timeZoneName: 'shortOffset',
        });
        const parts = formatter.formatToParts(new Date());
        const offset =
          parts.find((part) => part.type === 'timeZoneName')?.value || '';
        const modifiedOffset = offset === 'GMT' ? 'GMT+0' : offset;

        return {
          value: timezone,
          label: `(${modifiedOffset}) ${timezone.replace(/_/g, ' ')}`,
          numericOffset: parseInt(
            offset.replace('GMT', '').replace('+', '') || '0',
          ),
        };
      })
      .sort((a, b) => a.numericOffset - b.numericOffset);
  }, [timezones]);

  function handleTimezoneChange(timezone: string) {
    setValue(timezone);
    setOpen(false);

    if (onChange) {
      onChange(timezone);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={id}
          className="text-copy-14 text-primary group inline-flex cursor-pointer items-center gap-2 px-0.5 font-medium"
        >
          <span className={cn('truncate', !value && 'text-muted-foreground')}>
            {value ? value : 'Select timezone'}
          </span>
          <ChevronDownIcon
            size={16}
            className="shrink-0 group-aria-expanded:rotate-180"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command
          filter={(value, search) => {
            const normalizedValue = value.toLowerCase();
            const normalizedSearch = search.toLowerCase().replace(/\s+/g, '');
            return normalizedValue.includes(normalizedSearch) ? 1 : 0;
          }}
        >
          <CommandInput placeholder="Search timezone..." />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {formattedTimezones.map(({ value: itemValue, label }) => (
                <CommandItem
                  key={itemValue}
                  value={itemValue}
                  onSelect={handleTimezoneChange}
                >
                  {label}
                  {value === itemValue && (
                    <CheckIcon size={16} className="ml-auto" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
