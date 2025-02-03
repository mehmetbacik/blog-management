'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const FeaturedPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPublished({ page: '1', limit: '4' });
        setPosts(response.posts);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="featured-posts">
      {posts.map(post => (
        <article key={post._id} className="featured-post">
          <h3 className="featured-post__title">
            <Link href={`/posts/${post._id}`}>{post.title}</Link>
          </h3>
          <div className="featured-post__meta">
            <span>{post.author.username}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            {post.category && (
              <>
                <span>•</span>
                <span className="featured-post__category">{post.category}</span>
              </>
            )}
          </div>
          <p className="featured-post__excerpt">
            {post.content.slice(0, 150)}...
          </p>
        </article>
      ))}
    </div>
  );
}; 