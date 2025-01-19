'use client';

import { useState } from 'react';
import { postService } from '@/services/api';
import { showToast } from '@/utils/toast';

interface DeletePostButtonProps {
  postId: string;
  onDelete: () => void;
}

export const DeletePostButton = ({ postId, onDelete }: DeletePostButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await postService.deletePost(postId);
      showToast.success('Post deleted successfully');
      onDelete();
    } catch (error) {
      showToast.error('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="button button--danger"
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting...' : 'Delete Post'}
    </button>
  );
}; 