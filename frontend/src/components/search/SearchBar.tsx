'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    setSearchTerm(searchParams.get('query') || '');
    setTags(searchParams.get('tags') || '');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append('query', searchTerm.trim());
    if (tags.trim()) params.append('tags', tags.trim());
    params.set('page', '1'); // Reset to first page on new search
    
    const searchPath = params.toString() ? `?${params.toString()}` : '';
    router.push(`/search${searchPath}`);
  };

  const handleClear = () => {
    setSearchTerm('');
    setTags('');
    router.push('/search');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-bar__group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="search-bar__input"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="search-bar__input"
        />
        <div className="search-bar__actions">
          <button type="submit" className="button">
            Search
          </button>
          {(searchTerm || tags) && (
            <button 
              type="button" 
              onClick={handleClear}
              className="button button--outline"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </form>
  );
}; 