import { Metadata } from 'next';
import Link from 'next/link';
import { FeaturedPosts } from '@/components/home/FeaturedPosts/components/FeaturedPosts';
import HeroCarouselSection from '@/components/home/HeroCarousel/HeroCarouselSection';
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
          <HeroCarouselSection />
          <News />
          <Tags />
          <FeaturedPosts />
        </div>
      </section>
    </div>
  );
} 