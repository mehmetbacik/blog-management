"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types";
import { postService } from "@/services/api";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { FeaturedPostList } from "./FeaturedPostList";
import { FeaturedEmptyState } from "./FeaturedEmptyState";
import { FeaturedHeader } from "./FeaturedHeader";

export function FeaturedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPublished({
          page: "1",
          limit: "4",
        });
        setPosts(response.posts);
      } catch (error) {
        console.error("Error fetching featured posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="featured-posts">
      <FeaturedHeader
        title="Featured Posts"
        description="Discover the latest insights and stay updated with our handpicked articles."
      />

      {loading ? (
        <LoadingSpinner />
      ) : posts.length > 0 ? (
        <FeaturedPostList posts={posts} />
      ) : (
        <FeaturedEmptyState message="No posts found" />
      )}
    </div>
  );
}
