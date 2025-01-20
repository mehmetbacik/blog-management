import { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { Post } from '../models/Post';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError } from '../utils/errors';

export const commentController = {
  // Get comments for a post
  getComments: async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const { page = '1', limit = '10' } = req.query;
      const pageNumber = parseInt(page as string);
      const limitNumber = parseInt(limit as string);
      const skip = (pageNumber - 1) * limitNumber;

      const [comments, total] = await Promise.all([
        Comment.find({ post: postId })
          .populate('author', 'username')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNumber),
        Comment.countDocuments({ post: postId })
      ]);

      res.json({
        comments,
        pagination: {
          total,
          page: pageNumber,
          limit: limitNumber,
          totalPages: Math.ceil(total / limitNumber)
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching comments' });
    }
  },

  // Create a new comment
  createComment: async (req: AuthRequest, res: Response) => {
    try {
      const { postId } = req.params;
      const { content } = req.body;

      const post = await Post.findById(postId);
      if (!post) {
        throw new NotFoundError('Post');
      }

      const comment = new Comment({
        content,
        author: req.user.userId,
        post: postId
      });

      await comment.save();
      
      const populatedComment = await Comment.findById(comment._id)
        .populate('author', 'username');

      res.status(201).json(populatedComment);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error creating comment' });
      }
    }
  },

  // Delete a comment
  deleteComment: async (req: AuthRequest, res: Response) => {
    try {
      const { postId, commentId } = req.params;

      const comment = await Comment.findOne({
        _id: commentId,
        post: postId
      });

      if (!comment) {
        throw new NotFoundError('Comment');
      }

      // Only comment author or admin can delete
      if (comment.author.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized for this action' });
      }

      await comment.deleteOne();
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error deleting comment' });
      }
    }
  }
}; 