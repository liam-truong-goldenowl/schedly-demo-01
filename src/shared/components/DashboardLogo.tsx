'use client';

import Link from 'next/link';
import { IconInnerShadowTop } from '@tabler/icons-react';

import { useSidebar } from './ui/sidebar';

export function DashboardLogo() {
  const { state } = useSidebar();

  const backHomeLink = '/events';

  if (state === 'collapsed') {
    return (
      <Link
        href={backHomeLink}
        className="text-primary"
        aria-label="Schedly Inc."
      >
        <IconInnerShadowTop className="mx-auto !size-7" />
      </Link>
    );
  }

  return (
    <Link
      href={backHomeLink}
      className="text-heading-24 from-primary to-primary/30 bg-gradient-to-br bg-clip-text px-2 font-bold text-nowrap text-transparent"
    >
      Schedly Inc.
      <span className=""></span>
    </Link>
  );
}
