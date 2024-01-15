
import topics from '../models/topics.model.js';
import questions from '../models/questions.model.js';
import mongoose from 'mongoose';

export const getTopicWithQuestion = async (req, res) => {
  try {
    const { topicId} = req.params;
    console.log('bang',topicId)

    const result = await topics.findOne({
      _id: topicId,
    }).populate({
      path: 'questions',
      model: 'questions', 
      select: 'questionText options correctOption',
    }).select('course quiz topicName harderQuestions questions').lean();
    console.log(result)

    if (!result) {
      return res.status(404).json({ message: 'question not found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching harder question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getHarderQuestion = async (req, res) => {
  try {
    const { topicId, harderQuestionsId } = req.params;
    console.log(topicId)

    const result = await topics.findOne({
      _id: topicId,
    }).populate('harderQuestions', 'questionText options correctOption')
    console.log(result)

    if (!result) {
      return res.status(404).json({ message: 'Harder question not found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching harder question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addTopic = async (req, res) => {
  try {
    const { topicName, questions , course, harderQuestions, quiz } = req.body;
    const topic = await topics.create({ topicName, questions, course, harderQuestions, quiz });
  } catch (error) {
    console.error('error creating topic', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}