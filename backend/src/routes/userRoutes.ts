import express from 'express';
import { userController } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.getProfile);

export default router; 