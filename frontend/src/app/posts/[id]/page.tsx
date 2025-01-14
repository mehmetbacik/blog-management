'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/utils/toast';

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      const loadingToast = showToast.loading('Loading post...');
      try {
        const data = await postService.getPost(params.id);
        setPost(data);
        showToast.dismiss(loadingToast);
      } catch (err) {
        showToast.dismiss(loadingToast);
        showToast.error('Failed to fetch post');
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    const loadingToast = showToast.loading('Deleting post...');

    try {
      await postService.deletePost(params.id);
      showToast.dismiss(loadingToast);
      showToast.success('Post deleted successfully!');
      router.push('/dashboard');
    } catch (err) {
      showToast.dismiss(loadingToast);
      showToast.error('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container">
        <div className="error">{error || 'Post not found'}</div>
      </div>
    );
  }

  const canEdit = user && (user._id === post.author._id || user.role === 'admin');

  return (
    <div className="container">
      <article className="post">
        <header className="post__header">
          <h1 className="post__title">{post.title}</h1>
          <div className="post__meta">
            <span>By {post.author.username}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span className="post__status">Status: {post.status}</span>
          </div>
        </header>

        <div className="post__content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {post.tags.length > 0 && (
          <div className="post__tags">
            {post.tags.map(tag => (
              <span key={tag} className="post__tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {canEdit && (
          <div className="post__actions">
            <button
              onClick={() => router.push(`/posts/${post._id}/edit`)}
              className="button button--secondary"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="button button--danger"
            >
              Delete
            </button>
          </div>
        )}
      </article>
    </div>
  );
} 