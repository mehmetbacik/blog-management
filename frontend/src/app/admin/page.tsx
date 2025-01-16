'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { AdminStats } from '@/types';
import { adminService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { showToast } from '@/utils/toast';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (error) {
        showToast.error('Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, router]);

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
          <h1 className="admin__title">Dashboard</h1>
        </header>

        {stats && (
          <div className="admin__stats">
            <div className="admin__stat-group">
              <h2 className="admin__stat-title">User Statistics</h2>
              <div className="admin__stat-cards">
                <div className="admin__stat-card">
                  <span className="admin__stat-value">{stats.users.total}</span>
                  <span className="admin__stat-label">Total Users</span>
                </div>
                <div className="admin__stat-card">
                  <span className="admin__stat-value">{stats.users.admins}</span>
                  <span className="admin__stat-label">Admins</span>
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
              <h2 className="admin__stat-title">Post Statistics</h2>
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
        )}
      </div>
    </div>
  );
} 