import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

export const postController = {
  // Create a new post
  create: async (req: AuthRequest, res: Response) => {
    try {
      const { title, content, tags } = req.body;
      const post = new Post({
        title,
        content,
        author: req.user.userId,
        tags
      });

      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error creating post' });
    }
  },

  // Get all published posts with pagination
  getAllPublished: async (req: Request, res: Response) => {
    try {
      const { page = '1', limit = '9' } = req.query;
      const pageNumber = parseInt(page as string);
      const limitNumber = parseInt(limit as string);
      const skip = (pageNumber - 1) * limitNumber;

      const [posts, total] = await Promise.all([
        Post.find({ status: 'published' })
          .populate('author', 'username')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNumber),
        Post.countDocuments({ status: 'published' })
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

  // Get post by ID
  getById: async (req: Request, res: Response) => {
    try {
      const post = await Post.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id),
        status: 'published'
      }).populate('author', 'username');

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching post' });
    }
  },

  // Update post
  update: async (req: AuthRequest, res: Response) => {
    try {
      const { title, content, status, tags } = req.body;
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized' });
      }

      post.title = title || post.title;
      post.content = content || post.content;
      post.status = status || post.status;
      post.tags = tags || post.tags;
      post.updatedAt = new Date();

      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error updating post' });
    }
  },

  // Delete post
  delete: async (req: AuthRequest, res: Response) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized' });
      }

      await post.deleteOne();
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting post' });
    }
  },

  // Get user's posts with pagination
  getUserPosts: async (req: AuthRequest, res: Response) => {
    try {
      const { page = '1', limit = '6', status } = req.query;
      const pageNumber = parseInt(page as string);
      const limitNumber = parseInt(limit as string);
      const skip = (pageNumber - 1) * limitNumber;

      const query: any = { author: req.user.userId };
      if (status) {
        query.status = status;
      }

      const [posts, total] = await Promise.all([
        Post.find(query)
          .populate('author', 'username')
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
      res.status(500).json({ error: 'Error fetching user posts' });
    }
  },

  // Search posts with pagination
  search: async (req: AuthRequest, res: Response) => {
    try {
      const { query, tags, status, page = '1', limit = '9' } = req.query;
      
      const searchQuery: any = { status: 'published' };

      if (query) {
        searchQuery.$or = [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } }
        ];
      }

      if (tags) {
        const tagArray = (tags as string).split(',').map(tag => tag.trim());
        searchQuery.tags = { $in: tagArray };
      }

      if (status && req.user?.role === 'admin') {
        searchQuery.status = status;
      }

      const pageNumber = parseInt(page as string);
      const limitNumber = parseInt(limit as string);
      const skip = (pageNumber - 1) * limitNumber;

      const [posts, total] = await Promise.all([
        Post.find(searchQuery)
          .populate('author', 'username')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNumber),
        Post.countDocuments(searchQuery)
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
      res.status(500).json({ error: 'Error searching posts' });
    }
  },

  // Get all unique tags from published posts
  getAllTags: async (_req: Request, res: Response) => {
    try {
      const posts = await Post.find({ status: 'published' });
      
      // Collect tags from all posts
      const allTags = posts.reduce((tags: string[], post) => {
        if (post.tags && Array.isArray(post.tags)) {
          return [...tags, ...post.tags];
        }
        return tags;
      }, []);

      // Find unique tags and sort alphabetically
      const uniqueTags = [...new Set(allTags)].sort();

      res.json(uniqueTags);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tags' });
    }
  },
}; 