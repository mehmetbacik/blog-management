'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { User, Post } from '@/types';
import { adminService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { showToast } from '@/utils/toast';

interface Stats {
  users: {
    total: number;
    authors: number;
    visitors: number;
  };
  posts: {
    total: number;
    published: number;
    pending: number;
    draft: number;
  };
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [usersData, statsData] = await Promise.all([
          adminService.getAllUsers(),
          adminService.getStats()
        ]);
        setUsers(usersData);
        setStats(statsData);
      } catch (error) {
        showToast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, router]);

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      setUsers(users.map(u => 
        u._id === userId ? { ...u, role: newRole as User['role'] } : u
      ));
      showToast.success('User role updated successfully');
    } catch (error) {
      showToast.error('Failed to update user role');
    }
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
        <h1 className="admin__title">Admin Dashboard</h1>
        
        {stats && (
          <section className="admin__section">
            <h2 className="admin__subtitle">System Statistics</h2>
            <div className="admin__stats">
              <div className="admin__stat-group">
                <h3 className="admin__stat-title">Users</h3>
                <div className="admin__stat-cards">
                  <div className="admin__stat-card">
                    <span className="admin__stat-value">{stats.users.total}</span>
                    <span className="admin__stat-label">Total Users</span>
                  </div>
                  <div className="admin__stat-card">
                    <span className="admin__stat-value">{stats.users.authors}</span>
                    <span className="admin__stat-label">Authors</span>
                  </div>
                  <div className="admin__stat-card">
                    <span className="admin__stat-value">{stats.users.visitors}</span>
                    <span className="admin__stat-label">Visitors</span>
                  </div>
                </div>
              </div>

              <div className="admin__stat-group">
                <h3 className="admin__stat-title">Posts</h3>
                <div className="admin__stat-cards">
                  <div className="admin__stat-card">
                    <span className="admin__stat-value">{stats.posts.total}</span>
                    <span className="admin__stat-label">Total Posts</span>
                  </div>
                  <div className="admin__stat-card">
                    <span className="admin__stat-value">{stats.posts.published}</span>
                    <span className="admin__stat-label">Published</span>
                  </div>
                  <div className="admin__stat-card">
                    <span className="admin__stat-value">{stats.posts.pending}</span>
                    <span className="admin__stat-label">Pending</span>
                  </div>
                  <div className="admin__stat-card">
                    <span className="admin__stat-value">{stats.posts.draft}</span>
                    <span className="admin__stat-label">Draft</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="admin__section">
          <h2 className="admin__subtitle">User Management</h2>
          <div className="admin__table-wrapper">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                        className="admin__select"
                      >
                        <option value="admin">Admin</option>
                        <option value="author">Author</option>
                        <option value="visitor">Visitor</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
} 