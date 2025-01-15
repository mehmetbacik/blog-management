import { Request, Response } from 'express';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { ValidationError, NotFoundError } from '../utils/errors';

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
  }
}; 