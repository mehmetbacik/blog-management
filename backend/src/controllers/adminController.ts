import { Request, Response } from 'express';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { ValidationError, NotFoundError } from '../utils/errors';
import { Post } from '../models/Post';

export const adminController = {
  // Get all users
  getAllUsers: async (_req: Request, res: Response) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  },

  // Update user role
  updateUserRole: async (req: AuthRequest, res: Response) => {
    try {
      const { role } = req.body;
      const { id } = req.params;

      if (!['admin', 'author', 'visitor'].includes(role)) {
        throw new ValidationError('Invalid role');
      }

      const user = await User.findById(id);
      if (!user) {
        throw new NotFoundError('User');
      }

      // Prevent removing the last admin
      if (user.role === 'admin' && role !== 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
          throw new ValidationError('Cannot remove the last admin');
        }
      }

      user.role = role;
      await user.save();

      const userResponse = user.toObject();
      delete userResponse.password;

      res.json(userResponse);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error updating user role' });
      }
    }
  },

  // Get system stats
  getStats: async (_req: Request, res: Response) => {
    try {
      const [
        totalUsers,
        totalPosts,
        publishedPosts,
        pendingPosts,
        totalAuthors
      ] = await Promise.all([
        User.countDocuments(),
        Post.countDocuments(),
        Post.countDocuments({ status: 'published' }),
        Post.countDocuments({ status: 'pending' }),
        User.countDocuments({ role: 'author' })
      ]);

      const stats = {
        users: {
          total: totalUsers,
          authors: totalAuthors,
          visitors: totalUsers - totalAuthors
        },
        posts: {
          total: totalPosts,
          published: publishedPosts,
          pending: pendingPosts,
          draft: totalPosts - publishedPosts - pendingPosts
        }
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching stats' });
    }
  },

  // Get all posts with filters
  getAllPosts: async (req: Request, res: Response) => {
    try {
      const { status, page = '1', limit = '10' } = req.query;
      const pageNumber = parseInt(page as string);
      const limitNumber = parseInt(limit as string);
      const skip = (pageNumber - 1) * limitNumber;

      const query: any = {};
      if (status) {
        query.status = status;
      }

      const [posts, total] = await Promise.all([
        Post.find(query)
          .populate('author', 'username email')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNumber),
        Post.countDocuments(query)
      ]);

      res.json({
        posts,
        pagination: {
          total,
          page: pageNumber,
          limit: limitNumber,
          totalPages: Math.ceil(total / limitNumber)
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  },

  // Update post status
  updatePostStatus: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['draft', 'pending', 'published'].includes(status)) {
        throw new ValidationError('Invalid status');
      }

      const post = await Post.findById(id);
      if (!post) {
        throw new NotFoundError('Post');
      }

      post.status = status;
      await post.save();

      res.json(post);
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error updating post status' });
      }
    }
  }
}; 