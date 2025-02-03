'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { PostList } from '@/components/posts/PostList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Pagination } from '@/components/ui/Pagination';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPublished({
          page: currentPage.toString(),
          limit: '9'
        });
        setPosts(response.posts);
        setTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <section className="posts-page">
        <h1 className="posts-page__title">Blog Posts</h1>
        {posts.length > 0 ? (
          <>
            <PostList posts={posts} />
            {totalPages > 1 && (
              <div className="posts-page__pagination">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <p className="posts-page__empty">No posts found.</p>
        )}
      </section>
    </div>
  );
} 