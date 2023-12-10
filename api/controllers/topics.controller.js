
import topics from '../models/topics.model.js';
import questions from '../models/questions.model.js';
import mongoose from 'mongoose';

export const getTopicWithQuestion = async (req, res) => {
  try {
    const { topicId, questionId } = req.params;

    const result = await topics.findOne({
      _id: topicId,
      'questions._id': questionId,
    }).lean();

    if (!result) {
      return res.status(404).json({ message: 'Topic or question not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error fetching topic with question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
