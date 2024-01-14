import express from 'express';
import questions from '../models/questions.model.js';
///import {getQuestions} from '../controllers/questions.controller.js';

const router = express.Router();

//router.get('/', getQuestions);
//router.post('/submit', submitQuiz);
//router.get('/', getQuestions);
//router.get('/topics/:topicName/:questionId', getQuestions);
router.get('/getAllQuestions', async (req, res) => {
    try {
      const getAllQuestions = await questions.find()
      if(!getAllQuestions){
        return res.status(404).json({ message: 'No questions found' });
      }
      res.status(200).json(getAllQuestions);
    } catch (error) {
      console.error('Error fetching lesson data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
export default router;