import { render, fireEvent, waitFor } from '@testing-library/react';
import { CommentForm } from '@/components/comments/CommentForm';
import { commentService } from '@/services/api';
import { showToast } from '@/utils/toast';

jest.mock('@/services/api');
jest.mock('@/utils/toast');

describe('CommentForm', () => {
  const mockOnCommentCreated = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('submits comment successfully', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <CommentForm postId="123" onCommentCreated={mockOnCommentCreated} />
    );

    fireEvent.change(getByPlaceholderText('Write a comment...'), {
      target: { value: 'Test comment' }
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(commentService.createComment).toHaveBeenCalledWith({
        postId: '123',
        content: 'Test comment'
      });
      expect(showToast.success).toHaveBeenCalled();
      expect(mockOnCommentCreated).toHaveBeenCalled();
    });
  });

  // Add more tests...
}); 