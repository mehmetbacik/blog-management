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
        const query = searchParams.get('query');
        const tags = searchParams.get('tags');
        
        const searchResults = await postService.searchPosts({ query, tags });
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
              {posts.length} Results Found
            </h2>
            <PostList posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
} 