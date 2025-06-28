import { NextIntlClientProvider } from 'next-intl';
import ClientProviders from './client-providers';

export default async function Providers({ children }) {
  return (
    <NextIntlClientProvider>
      <ClientProviders>
        {children}
      </ClientProviders>
    </NextIntlClientProvider>
  );
}