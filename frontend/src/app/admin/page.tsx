'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { User, Post } from '@/types';
import { adminService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { showToast } from '@/utils/toast';

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await adminService.getAllUsers();
        setUsers(data);
      } catch (error) {
        showToast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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