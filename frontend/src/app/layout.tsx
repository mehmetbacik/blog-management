import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import '@/styles/scss/main.scss';

export const metadata = {
  title: 'Blog Management System',
  description: 'A modern blog management system built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
} 