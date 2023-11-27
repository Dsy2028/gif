import express from 'express';
import {test, updateUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verify.js';
//import UserResult from '../models/user.model.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
/*router.post('/api/user-results', async (req, res) => {
  try {
    const { userId, quizId, score } = req.body;
    const userResult = new UserResult({ userId, quizId, score });
    await userResult.save();
    res.status(201).json(userResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve user results
router.get('/api/user-results/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userResults = await UserResult.find({ userId }).populate('quizId');
    res.json(userResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/
export default router;