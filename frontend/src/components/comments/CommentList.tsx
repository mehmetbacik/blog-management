'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Comment } from '@/types';
import { commentService } from '@/services/api';
import { CommentItem } from './CommentItem';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Pagination } from '@/components/ui/Pagination';
import { showToast } from '@/utils/toast';
import { VirtualList } from '@/components/ui/VirtualList';

interface CommentListProps {
  postId: string;
  refreshTrigger?: number;
}

const COMMENTS_PER_PAGE = 10;

export const CommentList = ({ postId, refreshTrigger }: CommentListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: COMMENTS_PER_PAGE,
    totalPages: 0
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const page = searchParams.get('commentPage') || '1';
        const data = await commentService.getComments(postId, parseInt(page));
        setComments(data.comments);
        setPagination(data.pagination);
      } catch (error) {
        showToast.error('Failed to load comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, searchParams, refreshTrigger]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('commentPage', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="comment-list">
      <h3 className="comment-list__title">
        Comments ({pagination.total})
      </h3>

      {comments.length > 0 ? (
        <>
          <div className="comment-list__items">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={postId}
                onDelete={() => {
                  const currentPage = pagination.page;
                  handlePageChange(
                    comments.length === 1 && currentPage > 1
                      ? currentPage - 1
                      : currentPage
                  );
                }}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <p className="comment-list__empty">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}; 