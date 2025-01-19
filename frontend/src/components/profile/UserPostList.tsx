'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Pagination } from '@/components/ui/Pagination';
import { showToast } from '@/utils/toast';

interface UserPostListProps {
  userId: string;
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

export const UserPostList = ({ userId }: UserPostListProps) => {
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
        const page = searchParams.get('page') || '1';
        const response = await postService.getUserPosts({
          userId,
          page: parseInt(page),
          limit: POSTS_PER_PAGE
        });
        setPostsState(response);
      } catch (error) {
        showToast.error('Failed to fetch user posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId, searchParams]);

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
        This user hasn't published any posts yet.
      </div>
    );
  }

  return (
    <div className="profile__posts">
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