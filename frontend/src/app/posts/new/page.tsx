'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postService } from '@/services/api';
import { showToast } from '@/utils/toast';

interface PostFormData {
  title: string;
  content: string;
  tags: string[];
}

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    tags: []
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = showToast.loading('Creating post...');

    try {
      await postService.createPost(formData);
      showToast.dismiss(loadingToast);
      showToast.success('Post created successfully!');
      router.push('/dashboard');
    } catch (err) {
      showToast.dismiss(loadingToast);
      showToast.error('Failed to create post. Please try again.');
    }
  };

  const handleTagInput = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1>Create New Post</h1>
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
            <label htmlFor="tags" className="form__label">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags.join(', ')}
              onChange={(e) => handleTagInput(e.target.value)}
              className="form__input"
              placeholder="technology, programming, web"
            />
          </div>
          <div className="form__actions">
            <button type="button" onClick={() => router.back()} className="button button--outline">
              Cancel
            </button>
            <button type="submit" className="button">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 