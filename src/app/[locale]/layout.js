import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import Providers from './providers/providers';
import Header from '../components/layout/Header';

// to-do: localy host "Space Grotesk" font instead of using Google Fonts API
// Tutorial link: https://www.youtube.com/watch?v=zK-yy6C2Nck
import { Space_Grotesk } from "next/font/google";
import "@/src/app/globals.css";
import { getThemeFromCookie } from '@/src/libs/theme';

const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Blog - Yamine Daroueche",
  description: "",
};

export default async function RootLayout({
  children,
  params
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const theme = await getThemeFromCookie();
 
  return (
    <html
      lang={locale}
      className="scroll-smooth"
      suppressHydrationWarning
      data-theme={theme}
    >
      <body className={SpaceGrotesk.className}>
        <Providers>
          <div className="flex flex-col min-h-full">
            <Header/>
            <div className="flex-1">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}