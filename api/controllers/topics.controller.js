
import topics from '../models/topics.model.js';
import questions from '../models/questions.model.js';
import mongoose from 'mongoose';

export const getTopicWithQuestion = async (req, res) => {
  try {
    const { topicName, questionId } = req.params;
    console.log('Params:', req.params);

    const result = await topics.findOne({
      topicName,
      'questions._id': questionId,
    }).lean(); 
    const allTopics = await topics.findOne();
    const allques = await questions.find();
    console.log('All Topics:', allTopics);
    console.log('questions: ', allques );
    console.log('Result:', result);
    if (!allTopics) {
      return res.status(404).json({ message: 'Topic or question not found' });
    }

    res.json(allTopics);
  } catch (error) {
    console.error('Error fetching topic with question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};