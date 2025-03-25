import Link from "next/link";
import { Post } from "@/types";

interface FeaturedPostItemProps {
  post: Post;
}

export function FeaturedPostItem({ post }: FeaturedPostItemProps) {
  return (
    <article className="featured-posts__postList--content">
      <h3 className="featured-posts__postList--title">
        <Link href={`/posts/${post._id}`}>{post.title}</Link>
      </h3>
      <div className="featured-posts__postList--info">
        <span>{post.author?.username || "Anonymous"}</span>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="featured-posts__postList--excerpt">
        {post.content.slice(0, 150)}...
      </p>
      <Link
        href={`/posts/${post._id}`}
        className="featured-posts__postList--button"
      >
        Read More
      </Link>
    </article>
  );
}
