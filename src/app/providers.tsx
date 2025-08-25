import { NextIntlClientProvider } from 'next-intl';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/shared/components/ui/sonner';
import { QueryProvider } from '@/shared/components/providers/QueryProvider';
import { ThemeProvider } from '@/shared/components/providers/ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider>
        <NuqsAdapter>
          <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
      </NextIntlClientProvider>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
