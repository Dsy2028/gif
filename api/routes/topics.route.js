import express from 'express';
import { getAllTopicsWithQuestions,getTopicWithQuestion } from '../controllers/topics.controller.js';
const router = express.Router();
router.get('/:topic/questions/:questionId', getTopicWithQuestion);

export default router;