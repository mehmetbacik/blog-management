import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { User } from '../models/User';
import { Post } from '../models/Post';
import jwt from 'jsonwebtoken';

describe('Admin Tests', () => {
  let adminToken: string;
  let userToken: string;
  let testPost: any;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    
    // Create regular user
    const user = await User.create({
      username: 'user',
      email: 'user@example.com',
      password: 'password123',
      role: 'author'
    });

    adminToken = jwt.sign(
      { userId: admin._id, role: 'admin' },
      process.env.JWT_SECRET!
    );

    userToken = jwt.sign(
      { userId: user._id, role: 'author' },
      process.env.JWT_SECRET!
    );

    // Create test post
    testPost = await Post.create({
      title: 'Test Post',
      content: 'Test Content',
      author: user._id,
      status: 'pending'
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST Management', () => {
    it('should allow admin to update post status', async () => {
      const res = await request(app)
        .put(`/api/posts/${testPost._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: 'published'
        });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('published');
    });

    it('should not allow regular user to update other users posts', async () => {
      const res = await request(app)
        .put(`/api/posts/${testPost._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          status: 'published'
        });

      expect(res.status).toBe(403);
    });
  });

  describe('User Management', () => {
    it('should allow admin to get all users', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should not allow regular user to get all users', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });

    it('should allow admin to update user roles', async () => {
      const user = await User.findOne({ email: 'user@example.com' });
      
      const res = await request(app)
        .put(`/api/users/${user?._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          role: 'visitor'
        });

      expect(res.status).toBe(200);
      expect(res.body.role).toBe('visitor');
    });

    it('should not allow regular user to update roles', async () => {
      const user = await User.findOne({ email: 'user@example.com' });
      
      const res = await request(app)
        .put(`/api/users/${user?._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          role: 'admin'
        });

      expect(res.status).toBe(403);
    });
  });
}); 