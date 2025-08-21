'use client';

import { useRef, useState } from 'react';
import { SearchIcon, CircleXIcon } from 'lucide-react';

import { Input } from '@/shared/components/ui/input';

import { useEventSearchQueryState } from '../hooks/useEventSearchQueryState';

export function SearchEventInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const { setEventSearch } = useEventSearchQueryState();

  const setValue = (value: string) => {
    setInputValue(value);
    setEventSearch(value.length > 0 ? value : null);
  };

  const handleClearInput = () => {
    setValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return (
    <div className="bg-background relative max-w-[36ch]">
      <SearchIcon
        size={16}
        className="text-muted-foreground/80 absolute start-2 h-full"
      />
      <Input
        ref={inputRef}
        className="px-9"
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue && (
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
          onClick={handleClearInput}
        >
          <CircleXIcon size={16} />
        </button>
      )}
    </div>
  );
}
