import express from 'express';
import {getTopicWithQuestion } from '../controllers/topics.controller.js';
const router = express.Router();
//router.get('/:topic/questions/:questionId', getTopicWithQuestion);
router.get('/:topic/question/:question', getTopicWithQuestion);


export default router;