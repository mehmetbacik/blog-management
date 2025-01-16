'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SearchFilterProps {
  statusOptions?: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  onSearch?: (params: { search?: string; status?: string }) => void;
}

export const SearchFilter = ({ 
  statusOptions = [], 
  placeholder = "Search...",
  onSearch 
}: SearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setStatus(searchParams.get('status') || '');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (status) params.set('status', status);
    params.set('page', '1');

    if (onSearch) {
      onSearch({ search: searchTerm, status });
    } else {
      router.push(`?${params.toString()}`);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setStatus('');
    if (onSearch) {
      onSearch({});
    } else {
      router.push('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin__filters">
      <div className="admin__search-form">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin__search"
        />
        {statusOptions.length > 0 && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="admin__select"
          >
            <option value="">All Status</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="admin__filter-actions">
        <button type="submit" className="button">
          Search
        </button>
        {(searchTerm || status) && (
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