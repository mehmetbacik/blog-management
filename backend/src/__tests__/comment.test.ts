import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { User } from '../models/User';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import jwt from 'jsonwebtoken';

describe('Comment Tests', () => {
  let token: string;
  let userId: string;
  let postId: string;
  let commentId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Create test user
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    
    userId = user._id.toString();
    token = jwt.sign(
      { userId: user._id, role: 'author' },
      process.env.JWT_SECRET!
    );

    // Create test post
    const post = await Post.create({
      title: 'Test Post',
      content: 'Test content',
      author: userId,
      status: 'published'
    });

    postId = post._id.toString();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Comment.deleteMany({});
  });

  describe('POST /api/posts/:postId/comments', () => {
    it('should create a new comment', async () => {
      const res = await request(app)
        .post(`/api/posts/${postId}/comments`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Test comment'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('content', 'Test comment');
      expect(res.body).toHaveProperty('author.username', 'testuser');
      
      commentId = res.body._id;
    });

    it('should not create comment without authentication', async () => {
      const res = await request(app)
        .post(`/api/posts/${postId}/comments`)
        .send({
          content: 'Test comment'
        });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/posts/:postId/comments', () => {
    it('should get comments with pagination', async () => {
      // Create multiple comments
      await Comment.create([
        {
          content: 'Comment 1',
          author: userId,
          post: postId
        },
        {
          content: 'Comment 2',
          author: userId,
          post: postId
        }
      ]);

      const res = await request(app)
        .get(`/api/posts/${postId}/comments`)
        .query({ page: 1, limit: 1 });

      expect(res.status).toBe(200);
      expect(res.body.comments).toHaveLength(1);
      expect(res.body.pagination.totalPages).toBe(2);
    });
  });

  describe('DELETE /api/posts/:postId/comments/:commentId', () => {
    it('should delete own comment', async () => {
      const comment = await Comment.create({
        content: 'Test comment',
        author: userId,
        post: postId
      });

      const res = await request(app)
        .delete(`/api/posts/${postId}/comments/${comment._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      
      const deletedComment = await Comment.findById(comment._id);
      expect(deletedComment).toBeNull();
    });

    it('should not delete comment without authentication', async () => {
      const comment = await Comment.create({
        content: 'Test comment',
        author: userId,
        post: postId
      });

      const res = await request(app)
        .delete(`/api/posts/${postId}/comments/${comment._id}`);

      expect(res.status).toBe(401);
    });
  });
}); 