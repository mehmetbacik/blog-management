import express from 'express';
import { postController } from '../controllers/postController';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, postController.create);
router.get('/', postController.getAllPublished);
router.get('/:id', postController.getById);
router.put('/:id', auth, postController.update);
router.delete('/:id', auth, postController.delete);

export default router; 