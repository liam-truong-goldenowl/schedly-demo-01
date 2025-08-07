'use client';

import { use, createContext } from 'react';

import { Host } from '../schema/host';

const HostContext = createContext<Host>(null!);

export function HostProvider({
  host,
  children,
}: {
  host: Host;
  children: React.ReactNode;
}) {
  return <HostContext.Provider value={host}>{children}</HostContext.Provider>;
}

export function useHost() {
  const context = use(HostContext);
  if (!context) {
    throw new Error('useHost must be used within a HostProvider');
  }
  return context;
}
