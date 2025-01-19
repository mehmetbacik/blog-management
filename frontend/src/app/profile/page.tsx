'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { UserPosts } from '@/components/profile/UserPosts';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'drafts'>('posts');

  if (!user) return null;

  return (
    <div className="container">
      <div className="profile">
        <header className="profile__header">
          <div className="profile__info">
            <h1 className="profile__name">{user.username}</h1>
            <span className="profile__role">{user.role}</span>
            <p className="profile__email">{user.email}</p>
          </div>
          <div className="profile__actions">
            <Link href="/profile/edit" className="button button--outline">
              Edit Profile
            </Link>
            <Link href="/posts/new" className="button">
              Create Post
            </Link>
          </div>
        </header>

        <div className="profile__tabs">
          <button
            className={`profile__tab ${activeTab === 'posts' ? 'profile__tab--active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Published Posts
          </button>
          <button
            className={`profile__tab ${activeTab === 'drafts' ? 'profile__tab--active' : ''}`}
            onClick={() => setActiveTab('drafts')}
          >
            Drafts
          </button>
        </div>

        <UserPosts status={activeTab === 'posts' ? 'published' : 'draft'} />
      </div>
    </div>
  );
} 