'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { postService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { showToast } from '@/utils/toast';

const Tags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await postService.getAllTags();
        setTags(data);
      } catch (error) {
        showToast.error('Failed to fetch tags');
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="tags">
      <h2 className="tags__title">Explore Topics (Tags)</h2>
      <div className="tags__list">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Link
              key={tag}
              href={`/search?tags=${tag}`}
              className="tags__item"
            >
              {tag}
            </Link>
          ))
        ) : (
          <p className="tags__empty">No tags found</p>
        )}
      </div>
    </section>
  );
};

export default Tags; 