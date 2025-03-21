import { Metadata } from 'next';
import Link from 'next/link';
import { FeaturedPosts } from '@/components/home/FeaturedPosts/components/FeaturedPosts';
import HeroCarouselSection from '@/components/home/HeroCarousel/HeroCarouselSection';
import NewsSection from '@/components/home/News//NewsSection';
import TagsSection from '@/components/home/Tags/TagsSection';

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
          <NewsSection />
          <FeaturedPosts />
          <TagsSection />
        </div>
      </section>
    </div>
  );
} 