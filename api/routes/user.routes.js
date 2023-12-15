import express from 'express';
import {test, updateUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verify.js';
import { updateQuizResults } from '../controllers/user.controller.js';
//import UserResult from '../models/user.model.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:_id', verifyToken, updateUser);
router.post('/updateQuizResults', verifyToken, updateQuizResults);

export default router;