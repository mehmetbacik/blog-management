import { FeaturedPosts } from "./components/FeaturedPosts";

export function FeaturedPostsSection() {
  return (
    <section className="featured">
      <div className="container">
        <h2 className="section__title">Latest Posts</h2>
        <FeaturedPosts />
      </div>
    </section>
  );
} 