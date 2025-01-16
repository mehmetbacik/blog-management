import express from 'express';
import { adminController } from '../controllers/adminController';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management endpoints
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Not authorized
 */
router.get('/users', auth, adminAuth, adminController.getAllUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   put:
 *     summary: Update user role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, author, visitor]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */
router.put('/users/:id', auth, adminAuth, adminController.updateUserRole);

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get admin statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     admins:
 *                       type: number
 *                     authors:
 *                       type: number
 *                     visitors:
 *                       type: number
 *                 posts:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     published:
 *                       type: number
 *                     pending:
 *                       type: number
 *                     draft:
 *                       type: number
 *       403:
 *         description: Not authorized
 */
router.get('/stats', auth, adminAuth, adminController.getStats);

/**
 * @swagger
 * /admin/posts:
 *   get:
 *     summary: Get all posts with filters
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, pending, published]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of posts with pagination
 *       403:
 *         description: Not authorized
 */
router.get('/posts', auth, adminAuth, adminController.getAllPosts);

/**
 * @swagger
 * /admin/posts/{id}/status:
 *   put:
 *     summary: Update post status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [draft, pending, published]
 *     responses:
 *       200:
 *         description: Post status updated successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 */
router.put('/posts/:id/status', auth, adminAuth, adminController.updatePostStatus);

/**
 * @swagger
 * /admin/posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post details
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 *   delete:
 *     summary: Delete post
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 */
router.get('/posts/:id', auth, adminAuth, adminController.getPostById);
router.delete('/posts/:id', auth, adminAuth, adminController.deletePost);

export default router; 