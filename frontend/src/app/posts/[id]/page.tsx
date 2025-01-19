'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Post } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { postService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { DeletePostButton } from '@/components/posts/DeletePostButton';
import { CommentForm } from '@/components/comments/CommentForm';
import { CommentList } from '@/components/comments/CommentList';
import { showToast } from '@/utils/toast';

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshComments, setRefreshComments] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(params.id);
        setPost(data);
      } catch (error) {
        showToast.error('Failed to fetch post');
        router.push('/');
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

  const canEdit = user && (user._id === post.author._id || user.role === 'admin');

  return (
    <div className="container">
      <article className="post-detail">
        <header className="post-detail__header">
          <h1 className="post-detail__title">{post.title}</h1>
          <div className="post-detail__meta">
            <Link href={`/profile/${post.author._id}`} className="post-detail__author">
              By {post.author.username}
            </Link>
            <span className="post-detail__date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className={`post-detail__status post-detail__status--${post.status}`}>
              {post.status}
            </span>
          </div>
          {post.tags.length > 0 && (
            <div className="post-detail__tags">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/search?tags=${tag}`}
                  className="post-detail__tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className="post-detail__content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {canEdit && (
          <div className="post-detail__actions">
            <Link
              href={`/posts/${post._id}/edit`}
              className="button button--outline"
            >
              Edit Post
            </Link>
            <DeletePostButton
              postId={post._id}
              onDelete={() => router.push('/dashboard')}
            />
          </div>
        )}

        <div className="post-detail__comments">
          {user ? (
            <CommentForm
              postId={post._id}
              onCommentCreated={() => setRefreshComments(prev => prev + 1)}
            />
          ) : (
            <p className="post-detail__login-prompt">
              Please <Link href="/login">login</Link> to comment.
            </p>
          )}
          <CommentList postId={post._id} refreshTrigger={refreshComments} />
        </div>
      </article>
    </div>
  );
} 