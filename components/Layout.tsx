import Head from 'next/head';
import Script from 'next/script';
import Header from './Header';
import Footer from './Footer';
import AdSlot from './AdSlot';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title = 'Futebol', description = 'Portal de estatísticas e acompanhamento de futebol brasileiro em tempo real' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        crossOrigin="anonymous"
      />
      <div className="min-h-screen flex flex-col bg-gray-50 font-['Inter']">
        <Header />
        <AdSlot slot="header" />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}