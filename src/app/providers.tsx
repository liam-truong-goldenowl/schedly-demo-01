import { NextIntlClientProvider } from 'next-intl';

import { ThemeProvider } from '@/shared/components/ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </ThemeProvider>
  );
}
