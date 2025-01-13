import { Metadata } from 'next';
import { PostList } from '@/components/posts/PostList';
import { postService } from '@/services/api';

export const metadata: Metadata = {
  title: 'Home | Blog Management System',
  description: 'Discover the latest blog posts from our community',
};

async function getPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero__title">
          Welcome to Blog Management System
        </h1>
        <p className="hero__subtitle">
          Discover interesting articles and share your thoughts
        </p>
      </section>

      <section className="content">
        <h2 className="content__title">Latest Posts</h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
} 