'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { SearchBar } from '@/components/search/SearchBar';
import { PostList } from '@/components/posts/PostList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const queryParam = searchParams.get('query');
        const tagsParam = searchParams.get('tags');
        
        // Convert null values to undefined for the API call
        const searchQuery = queryParam || undefined;
        const searchTags = tagsParam || undefined;
        
        const searchResults = await postService.searchPosts({ 
          query: searchQuery, 
          tags: searchTags 
        });
        setPosts(searchResults);
        setError(null);
      } catch (err) {
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams]);

  const getResultsText = () => {
    const count = posts.length;
    if (count === 0) return 'No results found';
    return `${count} ${count === 1 ? 'Result' : 'Results'} Found`;
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
            {posts.length > 0 && <PostList posts={posts} />}
          </div>
        )}
      </div>
    </div>
  );
} 