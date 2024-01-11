import express from 'express';
import {getTopicWithQuestion } from '../controllers/topics.controller.js';
import { getHarderQuestion } from '../controllers/topics.controller.js';
import topics from '../models/topics.model.js';
const router = express.Router();
//router.get('/:topic/questions/:questionId', getTopicWithQuestion);
router.get('/:topicId/questions/:questionId', getTopicWithQuestion);
router.get('/:topicId/harderQuestions/:harderQuestionsId', getHarderQuestion );
router.get('/:topicId/quiz', async (req, res) => {
    try {
      const { topicId } = req.params;
  
      const topic = await topics.findOne({ _id: topicId }).populate({
        path: 'quiz.quizQuestions',
        model: 'questions', 
        select: 'questionText options correctOption',
      }).select('course quiz topicName').lean();
  
  
      
      if (!topic) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
 // console.log(topic)
 res.status(200).json({ quiz: topic.quiz , course: topic.course , topic: topic.topicName});
    } catch (error) {
      console.error('Error getting quiz:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('')

export default router;