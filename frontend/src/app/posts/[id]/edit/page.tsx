'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';
import { postService } from '@/services/api';
import { PostForm } from '@/components/posts/PostForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { showToast } from '@/utils/toast';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(params.id);
        setPost(data);
      } catch (error) {
        showToast.error('Failed to fetch post');
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="container">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="container">
      <div className="post-page">
        <h1 className="post-page__title">Edit Post</h1>
        <PostForm
          initialData={{
            title: post.title,
            content: post.content,
            tags: post.tags,
            status: post.status
          }}
          isEditing
          postId={post._id}
        />
      </div>
    </div>
  );
} 