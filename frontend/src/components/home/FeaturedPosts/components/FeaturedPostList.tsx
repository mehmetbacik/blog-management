import { Post } from "@/types";
import { FeaturedPostItem } from "./FeaturedPostItem";

interface FeaturedPostListProps {
  posts: Post[];
}

export function FeaturedPostList({ posts }: FeaturedPostListProps) {
  return (
    <div className="featured-posts__postList--wrapper">
      {posts.map((post) => (
        <FeaturedPostItem key={post._id} post={post} />
      ))}
    </div>
  );
}
