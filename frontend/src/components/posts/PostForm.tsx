'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/hooks/useForm';
import { postSchema } from '@/validations/schemas';
import { postService } from '@/services/api';
import { showToast } from '@/utils/toast';
import { Post } from '@/types';

interface PostFormData {
  title: string;
  content: string;
  tags: string[];
  status: Post['status'];
}

interface PostFormProps {
  initialData?: Partial<PostFormData>;
  isEditing?: boolean;
  postId?: string;
}

export const PostForm = ({ initialData, isEditing, postId }: PostFormProps) => {
  const router = useRouter();
  const [tagInput, setTagInput] = useState(initialData?.tags?.join(', ') || '');

  const { handleSubmit, validateField, formState } = useForm<PostFormData>({
    schema: postSchema,
    onSubmit: async (data) => {
      try {
        if (isEditing && postId) {
          await postService.updatePost(postId, data);
          showToast.success('Post updated successfully!');
        } else {
          await postService.createPost(data);
          showToast.success('Post created successfully!');
        }
        router.push('/dashboard');
      } catch (error) {
        showToast.error(isEditing ? 'Failed to update post' : 'Failed to create post');
      }
    }
  });

  const handleTagChange = (value: string) => {
    setTagInput(value);
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    validateField('tags', tags);
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form__group">
        <label htmlFor="title" className="form__label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={initialData?.title}
          className="form__input"
          onBlur={(e) => validateField('title', e.target.value)}
        />
        {formState.errors.title && (
          <span className="form__error">{formState.errors.title}</span>
        )}
      </div>

      <div className="form__group">
        <label htmlFor="content" className="form__label">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={initialData?.content}
          className="form__input form__input--textarea"
          rows={10}
          onBlur={(e) => validateField('content', e.target.value)}
        />
        {formState.errors.content && (
          <span className="form__error">{formState.errors.content}</span>
        )}
      </div>

      <div className="form__group">
        <label htmlFor="tags" className="form__label">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tagInput}
          onChange={(e) => handleTagChange(e.target.value)}
          className="form__input"
          placeholder="technology, programming, web"
        />
        {formState.errors.tags && (
          <span className="form__error">{formState.errors.tags}</span>
        )}
      </div>

      <div className="form__group">
        <label htmlFor="status" className="form__label">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={initialData?.status || 'draft'}
          className="form__input"
          onBlur={(e) => validateField('status', e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="pending">Submit for Review</option>
          <option value="published">Publish</option>
        </select>
      </div>

      <div className="form__actions">
        <button
          type="button"
          onClick={() => router.back()}
          className="button button--outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="button"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting
            ? isEditing ? 'Updating...' : 'Creating...'
            : isEditing ? 'Update Post' : 'Create Post'
          }
        </button>
      </div>
    </form>
  );
}; 