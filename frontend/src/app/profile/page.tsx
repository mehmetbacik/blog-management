'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Pagination } from '@/components/ui/Pagination';

interface UserPostsState {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const POSTS_PER_PAGE = 6;

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [postsState, setPostsState] = useState<UserPostsState>({
    posts: [],
    pagination: {
      total: 0,
      page: 1,
      limit: POSTS_PER_PAGE,
      totalPages: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchUserPosts = async () => {
      try {
        const pageParam = searchParams.get('page');
        const page = pageParam ? parseInt(pageParam) : 1;
        
        const response = await postService.getUserPosts({
          page,
          limit: POSTS_PER_PAGE
        });
        
        setPostsState(response);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user, router, searchParams]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/profile?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="profile">
        <header className="profile__header">
          <div className="profile__info">
            <h1 className="profile__name">{user?.username}</h1>
            <p className="profile__role">{user?.role}</p>
            <p className="profile__email">{user?.email}</p>
          </div>
          <button
            onClick={() => router.push('/posts/new')}
            className="button button--primary"
          >
            Create New Post
          </button>
        </header>

        <section className="profile__content">
          <h2 className="profile__title">Your Posts ({postsState.pagination.total})</h2>
          {postsState.posts.length === 0 ? (
            <p className="profile__empty">You haven't created any posts yet.</p>
          ) : (
            <>
              <div className="post-grid">
                {postsState.posts.map((post) => (
                  <article key={post._id} className="post-card">
                    <h3 className="post-card__title">
                      <a href={`/posts/${post._id}`}>{post.title}</a>
                    </h3>
                    <div className="post-card__meta">
                      <span>Status: {post.status}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="post-card__actions">
                      <button
                        onClick={() => router.push(`/posts/${post._id}/edit`)}
                        className="button button--secondary"
                      >
                        Edit
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              {postsState.pagination.totalPages > 1 && (
                <Pagination
                  currentPage={postsState.pagination.page}
                  totalPages={postsState.pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
} 