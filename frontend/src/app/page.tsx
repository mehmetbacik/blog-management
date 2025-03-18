import { Metadata } from 'next';
import Link from 'next/link';
import { FeaturedPosts } from '@/components/home/FeaturedPosts/components/FeaturedPosts';
import HeroCarousel from '@/components/home/HeroCarousel/HeroCarousel';
import News from '@/components/home/News/News';
import Tags from '@/components/home/Tags/Tags';

export const metadata: Metadata = {
  title: 'Welcome to BlogHub - Your Modern Blogging Platform',
  description: 'Discover and share amazing stories with our community',
};

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <HeroCarousel />
          <News />
          <Tags />
          <FeaturedPosts />
        </div>
      </section>
    </div>
  );
} 