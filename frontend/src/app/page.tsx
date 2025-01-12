import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Blog Management System',
};

export default async function HomePage() {
  return (
    <div className="container">
      <section className="section">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Blog Management System
        </h1>
        <p className="text-lg text-gray-600">
          A modern platform for creating and managing blog content
        </p>
      </section>
    </div>
  );
} 