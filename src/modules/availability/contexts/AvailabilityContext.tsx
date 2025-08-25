'use client';

import { use, createContext } from 'react';

import { Schedule } from '../types';
import { useSchedulesQuery } from '../hooks/useSchedulesQuery';

const AvailabilityContext = createContext({
  schedules: [] as Schedule[],
  loading: false,
  error: null as Error | null,
});

export function AvailabilityProvider({
  children,
  initialSchedules = [],
}: {
  children: React.ReactNode;
  initialSchedules?: Schedule[];
}) {
  const {
    data: schedules,
    isLoading: loading,
    error,
  } = useSchedulesQuery(initialSchedules);
  return (
    <AvailabilityContext.Provider value={{ schedules, loading, error }}>
      {children}
    </AvailabilityContext.Provider>
  );
}

export function useAvailability() {
  const context = use(AvailabilityContext);
  if (!context) {
    throw new Error(
      'useAvailability must be used within an AvailabilityProvider',
    );
  }
  return context;
}
