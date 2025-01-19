'use client';

import { useState } from 'react';
import { commentService } from '@/services/api';
import { showToast } from '@/utils/toast';

interface CommentFormProps {
  postId: string;
  onCommentCreated: () => void;
}

export const CommentForm = ({ postId, onCommentCreated }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await commentService.createComment({
        postId,
        content: content.trim()
      });
      setContent('');
      onCommentCreated();
      showToast.success('Comment added successfully');
    } catch (error) {
      showToast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="comment-form__input"
        rows={3}
        required
      />
      <button
        type="submit"
        className="button"
        disabled={isSubmitting || !content.trim()}
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}; 