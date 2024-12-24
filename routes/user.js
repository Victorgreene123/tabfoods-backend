// Import Router from express
import { Router } from 'express';
import { createUser, getUser, updateUser } from '../controllers/User.js';
import { verifyToken } from '../middleware/authMiddleware.js';




const router = Router();


router.route('/').post(createUser)


router.route('/:id').get(verifyToken,getUser).patch(verifyToken, updateUser)


export default router;
