'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';
import { adminService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { showToast } from '@/utils/toast';
import { UserFilter } from '@/components/admin/UserFilter';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<User['role'] | ''>('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {

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

  const handleFilter = ({ search, role }: { search?: string; role?: User['role'] }) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (role) params.set('role', role);
    router.push(`/admin/users?${params.toString()}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin">
      <header className="admin__header">
        <h1 className="admin__title">User Management</h1>
      </header>

      <UserFilter onFilter={handleFilter} />

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
                  <td>
                    <span className={`admin__role admin__role--${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user._id, e.target.value as User['role'])}
                      className="admin__select"
                      disabled={user.role === 'admin' && users.filter(u => u.role === 'admin').length === 1}
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
        {users.length === 0 && (
          <p className="admin__empty">No users found matching your criteria.</p>
        )}
      </section>
    </div>
  );
} 