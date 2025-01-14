'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { SearchBar } from '@/components/search/SearchBar';
import { PostList } from '@/components/posts/PostList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Pagination } from '@/components/ui/Pagination';

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
  const [searchState, setSearchState] = useState<SearchState>({
    posts: [],
    pagination: {
      total: 0,
      page: 1,
      limit: POSTS_PER_PAGE,
      totalPages: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const queryParam = searchParams.get('query');
        const tagsParam = searchParams.get('tags');
        const pageParam = searchParams.get('page');
        
        const searchResults = await postService.searchPosts({
          query: queryParam || undefined,
          tags: tagsParam || undefined,
          page: pageParam ? parseInt(pageParam) : 1,
          limit: POSTS_PER_PAGE
        });

        setSearchState(searchResults);
        setError(null);
      } catch (err) {
        setError('Failed to fetch search results');
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

  const getResultsText = () => {
    const { total } = searchState.pagination;
    if (total === 0) return 'No results found';
    return `${total} ${total === 1 ? 'Result' : 'Results'} Found`;
  };

  return (
    <div className="container">
      <div className="search-page">
        <SearchBar />
        
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="search-page__results">
            <h2 className="search-page__title">
              {getResultsText()}
            </h2>
            {searchState.posts.length > 0 && (
              <>
                <PostList posts={searchState.posts} />
                <Pagination
                  currentPage={searchState.pagination.page}
                  totalPages={searchState.pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 