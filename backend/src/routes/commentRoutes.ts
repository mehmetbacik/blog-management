import express from 'express';
import { commentController } from '../controllers/commentController';
import { auth } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.get('/', commentController.getComments);
router.post('/', auth, commentController.createComment);
router.delete('/:commentId', auth, commentController.deleteComment);

export default router; 