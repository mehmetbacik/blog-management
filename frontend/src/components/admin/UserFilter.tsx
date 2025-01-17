'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User } from '@/types';

interface UserFilterProps {
  onFilter: (params: { search?: string; role?: User['role'] }) => void;
}

export const UserFilter = ({ onFilter }: UserFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [role, setRole] = useState<User['role'] | ''>(searchParams.get('role') as User['role'] || '');

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setRole(searchParams.get('role') as User['role'] || '');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      search: searchTerm || undefined,
      role: role || undefined
    });
  };

  const handleClear = () => {
    setSearchTerm('');
    setRole('');
    onFilter({});
  };

  return (
    <form onSubmit={handleSubmit} className="admin__filters">
      <div className="admin__search-form">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin__search"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as User['role'] | '')}
          className="admin__select"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="author">Author</option>
          <option value="visitor">Visitor</option>
        </select>
      </div>
      <div className="admin__filter-actions">
        <button type="submit" className="button">
          Search
        </button>
        {(searchTerm || role) && (
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