"use client";

import { useState, useEffect } from "react";
import { postService } from "@/services/api";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { showToast } from "@/utils/toast";
import { TagsHeader } from "./TagsHeader";
import { TagsList } from "./TagsList";
import { TagsEmptyState } from "./TagsEmptyState";

const Tags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await postService.getAllTags();
        setTags(data);
      } catch (error) {
        showToast.error("Failed to fetch tags");
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="tags">
      <TagsHeader 
        title="Popular Tags" 
        description="Explore topics that matter to you and find articles based on your interests."
      />

            {loading ? (
              <LoadingSpinner />
            ) : tags.length > 0 ? (
              <TagsList tags={tags} />
            ) : (
              <TagsEmptyState message="No posts found" />
            )}
    </div>
  );
};

export default Tags;
