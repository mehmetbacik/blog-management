import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { AuthRequest } from '../middleware/auth';

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

  // Get all published posts
  getAllPublished: async (req: Request, res: Response) => {
    try {
      const posts = await Post.find({ status: 'published' })
        .populate('author', 'username')
        .sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  },

  // Get post by ID
  getById: async (req: Request, res: Response) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate('author', 'username');
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
  }
}; 