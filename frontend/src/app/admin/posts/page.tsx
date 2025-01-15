'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Post, AdminPostsResponse } from '@/types';
import { adminService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Pagination } from '@/components/ui/Pagination';
import { showToast } from '@/utils/toast';

interface PostsState extends AdminPostsResponse {}

const POSTS_PER_PAGE = 10;

export default function AdminPostsPage() {
  const [postsState, setPostsState] = useState<PostsState>({
    posts: [],
    pagination: {
      total: 0,
      page: 1,
      limit: POSTS_PER_PAGE,
      totalPages: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<Post['status'] | ''>('');
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchPosts = async () => {
      try {
        const pageParam = searchParams.get('page');
        const statusParam = searchParams.get('status');
        
        const response = await adminService.getAllPosts({
          status: statusParam || undefined,
          page: pageParam ? parseInt(pageParam) : 1,
          limit: POSTS_PER_PAGE
        });
        
        setPostsState(response);
        setSelectedStatus(statusParam || '');
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
      const updatedPost = await adminService.updatePostStatus(postId, newStatus);
      setPostsState(prev => ({
        ...prev,
        posts: prev.posts.map(post =>
          post._id === postId ? updatedPost : post
        )
      }));
      showToast.success('Post status updated successfully');
    } catch (error) {
      showToast.error('Failed to update post status');
    }
  };

  const handleFilterChange = (status: Post['status'] | '') => {
    const params = new URLSearchParams(searchParams.toString());
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    params.set('page', '1');
    router.push(`/admin/posts?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/admin/posts?${params.toString()}`);
  };

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
          <div className="admin__filters">
            <select
              value={selectedStatus}
              onChange={(e) => handleFilterChange(e.target.value as Post['status'] | '')}
              className="admin__select"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="published">Published</option>
            </select>
          </div>
        </header>

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
                {postsState.posts.map((post) => (
                  <tr key={post._id}>
                    <td>{post.title}</td>
                    <td>{post.author.username}</td>
                    <td>{post.status}</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={post.status}
                        onChange={(e) => handleStatusChange(post._id, e.target.value as Post['status'])}
                        className="admin__select"
                      >
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="published">Published</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {postsState.pagination.totalPages > 1 && (
            <div className="admin__pagination">
              <Pagination
                currentPage={postsState.pagination.page}
                totalPages={postsState.pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
} 