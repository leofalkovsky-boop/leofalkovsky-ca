import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://leofalkovsky.ca'),
  title: {
    default: 'Mortgage Broker Barrie | Leo Falkovsky | 8Twelve Mortgage',
    template: '%s | Leo Falkovsky · Barrie Mortgage Broker',
  },
  description: 'Leo Falkovsky is Barrie\'s trusted mortgage broker at 8Twelve Mortgage, specializing in Manulife One, Smith Manoeuvre, and mortgage acceleration. FSRA #M09000003.',
  alternates: { canonical: 'https://leofalkovsky.ca' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        {children}
        <script src="/js/main.js" defer />
      </body>
    </html>
  );
}
