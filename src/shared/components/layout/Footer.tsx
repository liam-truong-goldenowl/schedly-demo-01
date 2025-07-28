import { LanguageSwitch } from '../LanguageSwitch';

import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container className="flex items-center justify-between border-t py-6">
        <LanguageSwitch />
        <p className="text-copy-14">Copyright Schedly {currentYear}</p>
      </Container>
    </footer>
  );
}
