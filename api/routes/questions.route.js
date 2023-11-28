import express from 'express';
import {getQuestions, submitQuiz} from '../controllers/questions.controller.js';
const router = express.Router();

router.get('/', getQuestions);
router.post('/submit', submitQuiz);


export default router;