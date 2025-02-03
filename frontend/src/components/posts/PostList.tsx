"use client";

import React from "react";
import Link from "next/link";
import { Post } from "@/types";

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <article key={post._id} className="post-card">
          <h2 className="post-card__title">
            <Link href={`/posts/${post._id}`}>{post.title}</Link>
          </h2>
          <div className="post-card__meta">
            <span>{post.author?.username || 'Anonymous'}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="post-card__excerpt">
            {post.content.slice(0, 150)}...
          </p>
          {post.tags && post.tags.length > 0 && (
            <div className="post-card__tags">
              {post.tags.map((tag) => (
                <span key={tag} className="post-card__tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
};
