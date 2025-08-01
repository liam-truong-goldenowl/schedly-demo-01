import { NextIntlClientProvider } from 'next-intl';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/shared/components/ui/sonner';
import AuthProvider from '@/shared/components/providers/AuthProvider';
import { ThemeProvider } from '@/shared/components/providers/ThemeProvider';
import { QueryProvider } from '@/shared/components/providers/QueryProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider>
        <AuthProvider>
          <NuqsAdapter>
            <QueryProvider>{children}</QueryProvider>
          </NuqsAdapter>
        </AuthProvider>
      </NextIntlClientProvider>
      <Toaster position="top-center" closeButton richColors />
    </ThemeProvider>
  );
}
