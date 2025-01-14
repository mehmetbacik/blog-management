import express from 'express';
import { postController } from '../controllers/postController';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, postController.create);
router.get('/', postController.getAllPublished);
router.get('/user', auth, postController.getUserPosts);
router.get('/:id', postController.getById);
router.put('/:id', auth, postController.update);
router.delete('/:id', auth, postController.delete);

/**
 * @swagger
 * /posts/user:
 *   get:
 *     summary: Get user's posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's posts
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */

export default router; 