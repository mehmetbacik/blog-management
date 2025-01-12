'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/types';
import { postService } from '@/services/api';

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, router]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard">
        <header className="dashboard__header">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={() => router.push('/posts/new')}
            className="button button--primary"
          >
            Create New Post
          </button>
        </header>

        <div className="dashboard__content">
          {posts.length === 0 ? (
            <p className="text-gray-600">No posts found.</p>
          ) : (
            <div className="grid">
              {posts.map((post) => (
                <div key={post._id} className="post-card">
                  <h2 className="post-card__title">{post.title}</h2>
                  <p className="post-card__status">Status: {post.status}</p>
                  <div className="post-card__actions">
                    <button
                      onClick={() => router.push(`/posts/${post._id}/edit`)}
                      className="button button--secondary"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 