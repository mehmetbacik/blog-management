'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export default function DashboardPage() {
  const [postsState, setPostsState] = useState<PostsState>({
    posts: [],
    loading: true,
    error: null
  });
  
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getUserPosts({
          page: '1',
          limit: '10',
          status: 'all'
        });
        
        setPostsState({
          posts: response.posts,
          loading: false,
          error: null
        });
      } catch (error) {
        setPostsState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch posts'
        }));
      }
    };

    fetchPosts();
  }, []);

  if (postsState.loading) {
    return <LoadingSpinner />;
  }

  if (postsState.error) {
    return <ErrorMessage message={postsState.error} />;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard__header">
          <h1 className="dashboard__title">My Dashboard</h1>
          <button
            onClick={() => router.push('/posts/new')}
            className="button"
          >
            Create New Post
          </button>
        </div>

        <div className="dashboard__content">
          {postsState.posts.length > 0 ? (
            <div className="post-grid">
              {postsState.posts.map((post) => (
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
          ) : (
            <p className="dashboard__empty">No posts yet. Create your first post!</p>
          )}
        </div>
      </div>
    </div>
  );
} 