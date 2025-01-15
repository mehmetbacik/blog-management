import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

describe('Profile Tests', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  beforeEach(async () => {
    await User.deleteMany({});
    
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10)
    });
    
    userId = user._id.toString();
    token = jwt.sign(
      { userId: user._id, role: 'author' },
      process.env.JWT_SECRET!
    );
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/users/profile', () => {
    it('should get user profile', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('username', 'testuser');
      expect(res.body).toHaveProperty('email', 'test@example.com');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should not get profile without authentication', async () => {
      const res = await request(app)
        .get('/api/users/profile');

      expect(res.status).toBe(401);
    });
  });

  describe('PUT /api/users/profile', () => {
    it('should update username and email', async () => {
      const res = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'newusername',
          email: 'newemail@example.com'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('username', 'newusername');
      expect(res.body).toHaveProperty('email', 'newemail@example.com');
    });

    it('should update password', async () => {
      const res = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'password123',
          newPassword: 'newpassword123'
        });

      expect(res.status).toBe(200);

      // Verify new password works
      const loginRes = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'newpassword123'
        });

      expect(loginRes.status).toBe(200);
    });

    it('should not update with incorrect current password', async () => {
      const res = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'wrongpassword',
          newPassword: 'newpassword123'
        });

      expect(res.status).toBe(400);
    });

    it('should not update with invalid email format', async () => {
      const res = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'invalid-email'
        });

      expect(res.status).toBe(400);
    });
  });
}); 