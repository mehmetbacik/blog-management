'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Comment } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { commentService } from '@/services/api';
import { showToast } from '@/utils/toast';

interface CommentItemProps {
  comment: Comment;
  postId: string;
  onDelete: () => void;
}

export const CommentItem = ({ comment, postId, onDelete }: CommentItemProps) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await commentService.deleteComment(postId, comment._id);
      showToast.success('Comment deleted successfully');
      onDelete();
    } catch (error) {
      showToast.error('Failed to delete comment');
      setIsDeleting(false);
    }
  };

  const canDelete = user && (user._id === comment.author._id || user.role === 'admin');

  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <Link href={`/profile/${comment.author._id}`} className="comment-item__author">
          {comment.author.username}
        </Link>
        <span className="comment-item__date">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="comment-item__content">{comment.content}</p>
      {canDelete && (
        <button
          onClick={handleDelete}
          className="comment-item__delete"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
    </div>
  );
}; 