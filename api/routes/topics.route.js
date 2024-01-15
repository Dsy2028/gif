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
      }).select('course quiz topicName harderQuestions questions').lean();
  
  
      
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

  router.get('/getAllTopics', async (req, res) => {
    try {
      const getAllTopics = await topics.find().populate({
        path: 'quiz.quizQuestions',
        model: 'questions', 
        select: 'questionText options correctOption',
      }).select('course quiz topicName questions harderQuestions').lean();
      if(!getAllTopics){
        return res.status(404).json({ message: 'No topics found' });
      }
      res.status(200).json(getAllTopics);
    } catch (error) {
      console.error('Error fetching lesson data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })

  router.post('/topics/add', async (req, res) => {
    try {
      const { topicName, questions, course, harderQuestions, quiz } = req.body;
      const addTopics = await topics.create({ topicName: topicName , questions: questions ,course: course, harderQuestions: harderQuestions, quiz: quiz });
      res.status(200).json(addTopics)
    } catch (error) {
      console.error('error creating courses', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  })
  
  router.post('/topics/edit', async (req, res) => {
    try {
      const { topicId,topicName, questions, course, harderQuestions, quiz } = req.body;
      const editTopic = await unit.updateOne(
        { _id: topicId }, 
        { 
          $set: { topicName: topicName},
          $set: { course: course},
          $push: { questions: questions },
          $push: { harderQuestions: harderQuestions },
          $push: { quiz: quiz }
        }
      );
     
      res.status(200).json(editTopic)
    } catch (error) {
      console.error('error editing courses', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  })
  
  router.delete('/topics/delete', async (req, res) => {
    try {
      const {topicId, questions, harderQuestions, quiz} = req.body;
  
      const deleteUnit = await otherTest.updateOne({ _id: topicId }, { $pull: { questions: questions } },{ $pull: { harderQuestions: harderQuestions } }, { $pull: { quiz: quiz } });
      res.status(200).json(deleteUnit);
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  
  }
  )
  router.delete('/delete', async (req, res) => {
    try {
      const { topicId} = req.body;
    
  
      const deleteUnit = await unit.deleteOne({ _id: topicId })

      res.status(200).json(deleteUnit);
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  
  }
  )

export default router;