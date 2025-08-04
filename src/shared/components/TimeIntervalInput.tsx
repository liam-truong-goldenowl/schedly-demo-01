'use client';

import { useRef, useState } from 'react';
import { XIcon, MinusIcon, CheckIcon, RotateCcwIcon } from 'lucide-react';

import { cn } from '../lib/utils';

import { Input } from './ui/input';
import { Button } from './ui/button';

interface TimeIntervalInputProps {
  isInvalid?: boolean;
  defaultEndTime?: string;
  defaultStartTime?: string;
  onReset?: () => void;
  onRemove?: () => void;
  onEndTimeChange?: (endTime: string) => void;
  onStartTimeChange?: (startTime: string) => void;
  onSave?: (startTime: string, endTime: string) => void;
}

export function TimeIntervalInput({
  defaultEndTime,
  defaultStartTime,
  isInvalid = false,
  onSave = () => {},
  onReset = () => {},
  onRemove = () => {},
  onEndTimeChange = () => {},
  onStartTimeChange = () => {},
}: TimeIntervalInputProps) {
  const defaultTimeRef = useRef({
    startTime: defaultStartTime || '09:00',
    endTime: defaultEndTime || '17:00',
  });

  const [interval, setInterval] = useState({
    startTime: defaultTimeRef.current.startTime,
    endTime: defaultTimeRef.current.endTime,
  });

  const isDirty =
    interval.startTime !== defaultTimeRef.current.startTime ||
    interval.endTime !== defaultTimeRef.current.endTime;

  const isSaveDisabled = isInvalid;

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterval((prev) => ({ ...prev, startTime: e.target.value }));

    onStartTimeChange(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterval((prev) => ({ ...prev, endTime: e.target.value }));

    onEndTimeChange(e.target.value);
  };

  const handleRemove = () => {
    onRemove();
  };

  const handleSave = () => {
    defaultTimeRef.current = interval;
    setInterval({ ...interval });

    onSave(interval.startTime, interval.endTime);
  };

  const handleReset = () => {
    setInterval({ ...defaultTimeRef.current });

    onReset();
    onEndTimeChange(defaultTimeRef.current.endTime);
    onStartTimeChange(defaultTimeRef.current.startTime);
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1.5">
        <Input
          type="time"
          className={cn('pe-0', isInvalid && 'border-red-500')}
          value={interval.startTime}
          onChange={handleStartTimeChange}
        />
        <MinusIcon />
        <Input
          type="time"
          className={cn('pe-0', isInvalid && 'border-red-500')}
          value={interval.endTime}
          onChange={handleEndTimeChange}
        />
      </div>
      {isDirty ? (
        <>
          <Button
            size="icon"
            variant="ghost"
            disabled={isSaveDisabled}
            aria-label="Remove time interval"
            onClick={handleSave}
          >
            <CheckIcon />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Save time interval"
            onClick={handleReset}
          >
            <RotateCcwIcon />
          </Button>
        </>
      ) : (
        <Button
          size="icon"
          variant="ghost"
          aria-label="Reset to default times"
          onClick={handleRemove}
        >
          <XIcon />
        </Button>
      )}
    </div>
  );
}
