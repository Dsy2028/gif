import express from 'express';
import {getTopicWithQuestion } from '../controllers/topics.controller.js';
import { getHarderQuestion } from '../controllers/topics.controller.js';
const router = express.Router();
//router.get('/:topic/questions/:questionId', getTopicWithQuestion);
router.get('/:topicId/questions/:questionId', getTopicWithQuestion);
router.get('/:topicId/harderQuestions/:harderQuestionsId', getHarderQuestion );


export default router;