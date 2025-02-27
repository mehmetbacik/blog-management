import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const userController = {
  // Register a new user
  register: async (req: Request, res: Response) => {
    try {
      const { username, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = new User({
        username,
        email,
        password,
        role: role || 'visitor'
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  },

  // Login user
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  },

  // Get user profile
  getProfile: async (req: AuthRequest, res: Response) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching profile' });
    }
  },

  // Update user profile
  updateProfile: async (req: AuthRequest, res: Response) => {
    try {
      const { username, email, currentPassword, newPassword } = req.body;
      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (username) user.username = username;
      if (email) user.email = email;

      if (currentPassword && newPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }
        user.password = newPassword;
      }

      await user.save();

      // Create a safe user object without password
      const userResponse = user.toObject();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userWithoutPassword = (({ password, ...rest }) => rest)(userResponse);

      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: 'Error updating profile' });
    }
  }
}; 