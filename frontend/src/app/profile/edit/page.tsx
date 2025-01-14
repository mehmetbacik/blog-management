'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/api';
import { showToast } from '@/utils/toast';

interface ProfileFormData {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [formData, setFormData] = useState<ProfileFormData>({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      showToast.error('New passwords do not match');
      return;
    }

    const loadingToast = showToast.loading('Updating profile...');

    try {
      const updateData = {
        username: formData.username,
        email: formData.email,
        ...(formData.newPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      };

      const updatedUser = await authService.updateProfile(updateData);
      showToast.dismiss(loadingToast);
      showToast.success('Profile updated successfully!');
      router.push('/profile');
    } catch (err) {
      showToast.dismiss(loadingToast);
      showToast.error('Failed to update profile');
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__group">
            <label htmlFor="username" className="form__label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form__input"
              required
            />
          </div>
          
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form__input"
              required
            />
          </div>

          <div className="form__section">
            <h2 className="form__section-title">Change Password</h2>
            <p className="form__section-desc">Leave blank to keep current password</p>
            
            <div className="form__group">
              <label htmlFor="currentPassword" className="form__label">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="form__input"
              />
            </div>

            <div className="form__group">
              <label htmlFor="newPassword" className="form__label">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="form__input"
              />
            </div>

            <div className="form__group">
              <label htmlFor="confirmPassword" className="form__label">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form__input"
              />
            </div>
          </div>

          <div className="form__actions">
            <button
              type="button"
              onClick={() => router.back()}
              className="button button--outline"
            >
              Cancel
            </button>
            <button type="submit" className="button">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 