'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { AdminStats } from '@/types';
import { adminService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { showToast } from '@/utils/toast';
import { StatCard } from '@/components/admin/StatCard';

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
    return <LoadingSpinner />;
  }

  return (
    <div className="admin">
      <header className="admin__header">
        <h1 className="admin__title">Dashboard</h1>
      </header>

      {stats && (
        <div className="admin__stats">
          <div className="admin__stat-group">
            <h2 className="admin__stat-title">User Statistics</h2>
            <div className="admin__stat-cards">
              <StatCard value={stats.users.total} label="Total Users" />
              <StatCard value={stats.users.admins} label="Admins" />
              <StatCard value={stats.users.authors} label="Authors" />
              <StatCard value={stats.users.visitors} label="Visitors" />
            </div>
          </div>

          <div className="admin__stat-group">
            <h2 className="admin__stat-title">Post Statistics</h2>
            <div className="admin__stat-cards">
              <StatCard value={stats.posts.total} label="Total Posts" />
              <StatCard value={stats.posts.published} label="Published" />
              <StatCard value={stats.posts.pending} label="Pending" />
              <StatCard value={stats.posts.draft} label="Draft" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 