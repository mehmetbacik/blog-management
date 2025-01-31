'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Pagination } from '@/components/ui/Pagination';
import { showToast } from '@/utils/toast';

interface UserPostsProps {
  status: 'published' | 'draft';
}

interface PostsState {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const POSTS_PER_PAGE = 6;

export const UserPosts = ({ status }: UserPostsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [postsState, setPostsState] = useState<PostsState>({
    posts: [],
    pagination: {
      total: 0,
      page: 1,
      limit: POSTS_PER_PAGE,
      totalPages: 0
    }
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postService.getUserPosts({
          page: searchParams.get('page') || '1',
          limit: String(POSTS_PER_PAGE),
          status
        });
        
        setPostsState({
          posts: data.posts,
          pagination: data.pagination
        });
      } catch (error) {
        showToast.error('Failed to fetch posts');
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams, status]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (postsState.posts.length === 0) {
    return (
      <div className="profile__empty">
        {status === 'published' 
          ? "You haven't published any posts yet."
          : "You don't have any drafts."}
      </div>
    );
  }

  return (
    <div className="profile__content">
      <div className="post-grid">
        {postsState.posts.map((post) => (
          <article key={post._id} className="post-card">
            <h3 className="post-card__title">
              <Link href={`/posts/${post._id}`}>
                {post.title}
              </Link>
            </h3>
            <div className="post-card__meta">
              <span className={`post-card__status post-card__status--${post.status}`}>
                {post.status}
              </span>
              <span>•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="post-card__excerpt">
              {post.content.slice(0, 120)}...
            </p>
            <div className="post-card__actions">
              <Link 
                href={`/posts/${post._id}/edit`}
                className="button button--outline"
              >
                Edit
              </Link>
            </div>
          </article>
        ))}
      </div>

      {postsState.pagination.totalPages > 1 && (
        <div className="profile__pagination">
          <Pagination
            currentPage={postsState.pagination.page}
            totalPages={postsState.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}; 