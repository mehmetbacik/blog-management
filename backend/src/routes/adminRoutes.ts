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
 *     summary: Get system statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System statistics
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

export default router; 