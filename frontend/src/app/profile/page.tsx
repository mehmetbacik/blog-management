'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/types';
import { postService } from '@/services/api';

export default function ProfilePage() {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchUserPosts = async () => {
      try {
        const posts = await postService.getUserPosts();
        setUserPosts(posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user, router]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="profile">
        <header className="profile__header">
          <div className="profile__info">
            <h1 className="profile__name">{user?.username}</h1>
            <p className="profile__role">{user?.role}</p>
            <p className="profile__email">{user?.email}</p>
          </div>
          <button
            onClick={() => router.push('/posts/new')}
            className="button button--primary"
          >
            Create New Post
          </button>
        </header>

        <section className="profile__content">
          <h2 className="profile__title">Your Posts</h2>
          {userPosts.length === 0 ? (
            <p className="profile__empty">You haven't created any posts yet.</p>
          ) : (
            <div className="post-list">
              {userPosts.map((post) => (
                <article key={post._id} className="post-card">
                  <h3 className="post-card__title">
                    <a href={`/posts/${post._id}`}>{post.title}</a>
                  </h3>
                  <div className="post-card__meta">
                    <span>Status: {post.status}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="post-card__actions">
                    <button
                      onClick={() => router.push(`/posts/${post._id}/edit`)}
                      className="button button--secondary"
                    >
                      Edit
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
} 