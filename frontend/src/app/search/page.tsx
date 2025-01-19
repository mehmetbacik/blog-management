'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { SearchForm } from '@/components/search/SearchForm';
import { PostList } from '@/components/posts/PostList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Pagination } from '@/components/ui/Pagination';
import { showToast } from '@/utils/toast';

interface SearchState {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const POSTS_PER_PAGE = 9;

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchState, setSearchState] = useState<SearchState>({
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
        const query = searchParams.get('query');
        const tags = searchParams.get('tags');
        const page = searchParams.get('page') || '1';

        const response = await postService.searchPosts({
          query: query || undefined,
          tags: tags || undefined,
          page: parseInt(page),
          limit: POSTS_PER_PAGE
        });

        setSearchState(response);
      } catch (error) {
        showToast.error('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="container">
      <div className="search-page">
        <h1 className="search-page__title">Search Posts</h1>
        <SearchForm />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="search-page__results">
            <h2 className="search-page__subtitle">
              {searchState.pagination.total} Results Found
            </h2>
            {searchState.posts.length > 0 ? (
              <>
                <PostList posts={searchState.posts} />
                {searchState.pagination.totalPages > 1 && (
                  <Pagination
                    currentPage={searchState.pagination.page}
                    totalPages={searchState.pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <p className="search-page__empty">No posts found matching your criteria.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 