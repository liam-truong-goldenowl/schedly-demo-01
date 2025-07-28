import { Page } from '@/shared/components/layout/Page';
import { Footer } from '@/shared/components/layout/Footer';
import { Header } from '@/shared/components/layout/Header';
import { Section } from '@/shared/components/layout/Section';

import { SignUpForm } from '../../../modules/auth/components/SignUpForm';

export default function SignUpPage() {
  return (
    <Page>
      <Header />
      <Section>
        <SignUpForm />
      </Section>
      <Footer />
    </Page>
  );
}
