import { Metadata } from 'next';
import Link from 'next/link';
import { FeaturedPosts } from '@/components/home/FeaturedPosts/components/FeaturedPosts';
import HeroCarousel from '@/components/home/HeroCarousel/HeroCarousel';

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
          <h1 className="hero__title">
            Welcome to BlogHub
          </h1>
          <p className="hero__subtitle">
            Discover amazing stories and share your knowledge with the world
          </p>
          <div className="hero__actions">
            <Link href="/posts" className="button">
              Explore Posts
            </Link>
            <Link href="/register" className="button button--outline">
              Start Writing
            </Link>
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <h2 className="section__title">Latest Posts</h2>
          <FeaturedPosts />
        </div>
      </section>
    </div>
  );
} 