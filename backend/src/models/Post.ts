import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated post ID
 *         title:
 *           type: string
 *           description: Post title
 *         content:
 *           type: string
 *           description: Post content
 *         author:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             username:
 *               type: string
 *           description: Post author information
 *         status:
 *           type: string
 *           enum: [draft, pending, published]
 *           description: Post status
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Post tags
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Post creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Post last update date
 *         category:
 *           type: string
 *           enum: [Technology, Science, Business, Lifestyle]
 *           description: Post category
 */
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'published'],
    default: 'draft',
  },
  tags: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: ['Technology', 'Science', 'Business', 'Lifestyle'],
    default: 'Technology'
  },
});

export const Post = mongoose.model('Post', postSchema); 