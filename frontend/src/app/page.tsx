import { Metadata } from "next";
import Link from "next/link";
import FeaturedPostsSection from "@/components/home/FeaturedPosts/FeaturedPostsSection";
import HeroCarouselSection from "@/components/home/HeroCarousel/HeroCarouselSection";
import NewsSection from "@/components/home/News//NewsSection";
import TagsSection from "@/components/home/Tags/TagsSection";

export const metadata: Metadata = {
  title: "Welcome to BlogHub - Your Modern Blogging Platform",
  description: "Discover and share amazing stories with our community",
};

export default function HomePage() {
  return (
    <div className="home">
      <div className="container">
        <div className="home__wrapper">
          <HeroCarouselSection />
          <NewsSection />
          <FeaturedPostsSection />
          <TagsSection />
        </div>
      </div>
    </div>
  );
}
