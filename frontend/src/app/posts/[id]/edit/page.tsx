'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { postService } from '@/services/api';
import { showToast } from '@/utils/toast';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Post } from '@/types';

interface PostFormData {
  title: string;
  content: string;
  tags: string[];
  status: 'draft' | 'pending' | 'published';
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    tags: [],
    status: 'draft'
  });

  useEffect(() => {
    const fetchPost = async () => {
      const loadingToast = showToast.loading('Loading post...');
      try {
        const post = await postService.getPost(params.id);
        setFormData({
          title: post.title,
          content: post.content,
          tags: post.tags,
          status: post.status
        });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = showToast.loading('Updating post...');

    try {
      await postService.updatePost(params.id, formData);
      showToast.dismiss(loadingToast);
      showToast.success('Post updated successfully!');
      router.push('/dashboard');
    } catch (err) {
      showToast.dismiss(loadingToast);
      showToast.error('Failed to update post');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Edit Post</h1>
        {error && <div className="form__error">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <div className="form__group">
            <label htmlFor="title" className="form__label">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="form__input"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="content" className="form__label">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="form__input form__input--textarea"
              rows={10}
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="status" className="form__label">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                status: e.target.value as Post['status']
              }))}
              className="form__input"
            >
              <option value="draft">Draft</option>
              <option value="pending">Pending Review</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="form__group">
            <label htmlFor="tags" className="form__label">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                tags: e.target.value.split(',').map(tag => tag.trim())
              }))}
              className="form__input"
              placeholder="technology, programming, web"
            />
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
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 