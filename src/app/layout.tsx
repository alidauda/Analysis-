import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/provider/tanquery';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Fmeanalytics',

  description:
    'Your one-stop solution for beautiful and interactive data visualizations.',
  openGraph: {
    images: '/og.png',
  },
  icons: {
    icon: '/graph-analysis.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
