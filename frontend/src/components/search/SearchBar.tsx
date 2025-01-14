'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [tags, setTags] = useState(searchParams.get('tags') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm) params.append('query', searchTerm);
    if (tags) params.append('tags', tags);
    
    router.push(`/search?${params.toString()}`);
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
        <button type="submit" className="button">
          Search
        </button>
      </div>
    </form>
  );
}; 