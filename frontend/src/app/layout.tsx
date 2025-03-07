import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { TopBar } from '@/components/layout/Topbar/Topbar';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/scss/main.scss';
import { Providers } from './providers';

const roboto = Roboto ({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'Blog Management System',
  description: 'A modern blog management system built with Next.js 14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <TopBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
} 