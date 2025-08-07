'use client';

import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';

import { useUser } from '@/modules/auth/contexts/UserContext';

export function VisitLandingPageLink() {
  const user = useUser();

  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={`/sharing/${user.publicSlug}`}
      className="text-primary text-copy-14 group flex items-center gap-2 font-semibold"
    >
      <ExternalLinkIcon size={18} />
      <span className="group-hover:underline">Visit Landing Page</span>
    </Link>
  );
}
