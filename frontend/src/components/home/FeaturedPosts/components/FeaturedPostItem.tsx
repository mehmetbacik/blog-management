import Link from "next/link";
import { Post } from "@/types";
import { useCharacterLimit } from "@/hooks/useCharacterLimit";

interface FeaturedPostItemProps {
  post: Post;
}

const truncateText = (text: string, limit: number) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

export function FeaturedPostItem({ post }: FeaturedPostItemProps) {
  const charLimit = useCharacterLimit();

  return (
    <article className="featured-posts__postList--content">
      <h3 className="featured-posts__postList--title">
        <Link href={`/posts/${post._id}`}>{truncateText(post.title, charLimit.title)}</Link>
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
