'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/types';
import { adminService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Pagination } from '@/components/ui/Pagination';
import { showToast } from '@/utils/toast';
import Link from 'next/link';
import { SearchFilter } from '@/components/admin/SearchFilter';

const POSTS_PER_PAGE = 10;

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<Post['status'] | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0
  });
  
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    const status = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';
    setSelectedStatus(status as Post['status'] | '');
    setSearchTerm(search);

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await adminService.getAllPosts({
          status: status as Post['status'],
          search,
          page,
          limit: POSTS_PER_PAGE
        });
        setPosts(data.posts);
        setPagination({
          total: data.pagination.total,
          page: data.pagination.page,
          totalPages: data.pagination.totalPages
        });
      } catch (error) {
        showToast.error('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, router, searchParams]);

  const handleStatusChange = async (postId: string, newStatus: Post['status']) => {
    try {
      await adminService.updatePostStatus(postId, newStatus);
      setPosts(posts.map(post => 
        post._id === postId ? { ...post, status: newStatus } : post
      ));
      showToast.success('Post status updated successfully');
    } catch (error) {
      showToast.error('Failed to update post status');
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/admin/posts?${params.toString()}`);
  };

  const handleFilterChange = (status: Post['status'] | '') => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    params.set('page', '1');
    router.push(`/admin/posts?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedStatus) params.set('status', selectedStatus);
    params.set('page', '1');
    router.push(`/admin/posts?${params.toString()}`);
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await adminService.deletePost(postId);
      setPosts(posts.filter(post => post._id !== postId));
      showToast.success('Post deleted successfully');
    } catch (error) {
      showToast.error('Failed to delete post');
    }
  };

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending' },
    { value: 'published', label: 'Published' }
  ];

  if (loading) {
    return (
      <div className="container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="admin">
        <header className="admin__header">
          <h1 className="admin__title">Post Management</h1>
        </header>

        <SearchFilter
          statusOptions={statusOptions}
          placeholder="Search posts..."
          onSearch={({ search, status }) => {
            const params = new URLSearchParams();
            if (search) params.set('search', search);
            if (status) params.set('status', status);
            params.set('page', '1');
            router.push(`/admin/posts?${params.toString()}`);
          }}
        />

        <section className="admin__section">
          <div className="admin__table-wrapper">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td>
                      <Link 
                        href={`/posts/${post._id}`}
                        className="admin__link"
                        target="_blank"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td>{post.author?.username || 'Unknown'}</td>
                    <td>
                      <span className={`admin__status admin__status--${post.status}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="admin__actions">
                        <select
                          value={post.status}
                          onChange={(e) => handleStatusChange(post._id, e.target.value as Post['status'])}
                          className="admin__select"
                        >
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="button button--danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="admin__pagination">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
} 