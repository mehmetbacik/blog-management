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
router.get('/search', postController.search);

/**
 * @swagger
 * /posts/user:
 *   get:
 *     summary: Get user's posts with pagination
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of posts per page
 *     responses:
 *       200:
 *         description: List of user's posts with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Server error
 */

export default router; 