import { Page } from '@/shared/components/layout/Page';
import { Header } from '@/shared/components/layout/Header';
import { Footer } from '@/shared/components/layout/Footer';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Page>
      <Header />
      {children}
      <Footer />
    </Page>
  );
}
