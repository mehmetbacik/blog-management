'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';
import { adminService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { showToast } from '@/utils/toast';

export default function AdminUsersPage() {
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

  const handleRoleUpdate = async (userId: string, newRole: User['role']) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      setUsers(users.map(u => 
        u._id === userId ? { ...u, role: newRole } : u
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
        <header className="admin__header">
          <h1 className="admin__title">User Management</h1>
        </header>

        <section className="admin__section">
          <div className="admin__table-wrapper">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user._id, e.target.value as User['role'])}
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