'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [tags, setTags] = useState(searchParams.get('tags') || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append('query', searchTerm.trim());
    if (tags.trim()) params.append('tags', tags.trim());
    
    // Reset page number
    params.set('page', '1');
    
    // Update URL and navigate
    router.push(`/search?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchTerm('');
    setTags('');
    router.push('/search');
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-form__inputs">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="search-form__input"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="search-form__input"
        />
      </div>
      <div className="search-form__actions">
        <button type="submit" className="button">Search</button>
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
    </form>
  );
}; 