'use client';

import { PostForm } from '@/components/posts/PostForm';

export default function NewPostPage() {
  return (
    <div className="container">
      <div className="post-page">
        <h1 className="post-page__title">Create New Post</h1>
        <PostForm />
      </div>
    </div>
  );
} 