import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { Post } from '../models/Post';
import { User } from '../models/User';

describe('Search Tests', () => {
  let userId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    
    userId = user._id.toString();
  });

  afterAll(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Post.deleteMany({});
    
    // Create test posts
    await Post.create([
      {
        title: 'JavaScript Basics',
        content: 'Learn JavaScript fundamentals',
        author: userId,
        status: 'published',
        tags: ['javascript', 'programming']
      },
      {
        title: 'Advanced TypeScript',
        content: 'Deep dive into TypeScript',
        author: userId,
        status: 'published',
        tags: ['typescript', 'programming']
      },
      {
        title: 'React Hooks Guide',
        content: 'Understanding React Hooks',
        author: userId,
        status: 'published',
        tags: ['react', 'javascript']
      },
      {
        title: 'Draft Post',
        content: 'This is a draft',
        author: userId,
        status: 'draft',
        tags: ['draft']
      }
    ]);
  });

  describe('GET /api/posts/search', () => {
    it('should search posts by query', async () => {
      const res = await request(app)
        .get('/api/posts/search')
        .query({ query: 'typescript' });

      expect(res.status).toBe(200);
      expect(res.body.posts).toHaveLength(1);
      expect(res.body.posts[0].title).toBe('Advanced TypeScript');
    });

    it('should search posts by tags', async () => {
      const res = await request(app)
        .get('/api/posts/search')
        .query({ tags: 'javascript' });

      expect(res.status).toBe(200);
      expect(res.body.posts).toHaveLength(2);
      expect(res.body.posts.every((post: any) => 
        post.tags.includes('javascript')
      )).toBe(true);
    });

    it('should only return published posts', async () => {
      const res = await request(app)
        .get('/api/posts/search')
        .query({ query: 'draft' });

      expect(res.status).toBe(200);
      expect(res.body.posts).toHaveLength(0);
    });

    it('should paginate search results', async () => {
      const res = await request(app)
        .get('/api/posts/search')
        .query({ 
          tags: 'programming',
          page: 1,
          limit: 1 
        });

      expect(res.status).toBe(200);
      expect(res.body.posts).toHaveLength(1);
      expect(res.body.pagination.totalPages).toBe(2);
      expect(res.body.pagination.total).toBe(2);
    });
  });
}); 