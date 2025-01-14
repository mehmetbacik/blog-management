import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { Post } from '../models/Post';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

describe('Post Tests', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Create a test user
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
  });

  afterAll(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Post',
          content: 'Test Content',
          tags: ['test', 'example']
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('title', 'Test Post');
      expect(res.body).toHaveProperty('author', userId);
      expect(res.body.tags).toEqual(['test', 'example']);
    });

    it('should not create post without authentication', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({
          title: 'Test Post',
          content: 'Test Content'
        });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/posts', () => {
    beforeEach(async () => {
      await Post.create([
        {
          title: 'Published Post 1',
          content: 'Content 1',
          author: userId,
          status: 'published'
        },
        {
          title: 'Published Post 2',
          content: 'Content 2',
          author: userId,
          status: 'published'
        },
        {
          title: 'Draft Post',
          content: 'Draft Content',
          author: userId,
          status: 'draft'
        }
      ]);
    });

    it('should get only published posts', async () => {
      const res = await request(app).get('/api/posts');

      expect(res.status).toBe(200);
      expect(res.body.posts).toHaveLength(2);
      expect(res.body.pagination.total).toBe(2);
      expect(res.body.posts.every((post: any) => post.status === 'published')).toBe(true);
    });

    it('should paginate results', async () => {
      const res = await request(app)
        .get('/api/posts')
        .query({ page: 1, limit: 1 });

      expect(res.status).toBe(200);
      expect(res.body.posts).toHaveLength(1);
      expect(res.body.pagination.totalPages).toBe(2);
    });
  });
}); 