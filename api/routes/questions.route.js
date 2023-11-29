import express from 'express';
import {getQuestions} from '../controllers/questions.controller.js';

const router = express.Router();

//router.get('/', getQuestions);
//router.post('/submit', submitQuiz);
router.get('/', getQuestions);
export default router;