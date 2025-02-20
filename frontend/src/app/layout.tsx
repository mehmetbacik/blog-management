import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TopBar } from '@/components/layout/Topbar';
import { Navbar } from '@/components/layout/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/scss/main.scss';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <Providers>
          <TopBar />
          <Navbar />
          <main>{children}</main>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
} 