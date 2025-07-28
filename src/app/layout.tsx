import { getLocale } from 'next-intl/server';

import type { Metadata } from 'next';

import { fontClasses } from '@/styles/fonts';

import { Providers } from './providers';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Schedly - A Scheduling App',
  description: 'A simple scheduling app to manage your time effectively',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={fontClasses}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
