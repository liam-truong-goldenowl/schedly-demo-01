import { NextIntlClientProvider } from 'next-intl';

import { Toaster } from '@/shared/components/ui/sonner';
import AuthProvider from '@/shared/components/AuthProvider';
import { ThemeProvider } from '@/shared/components/ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider>
        <AuthProvider>{children}</AuthProvider>
      </NextIntlClientProvider>
      <Toaster position="top-center" closeButton richColors />
    </ThemeProvider>
  );
}
